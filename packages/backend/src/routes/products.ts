import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticate, authorize } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();
const prisma = new PrismaClient();

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string(),
  price: z.number().positive(),
  category: z.enum(['COFFEE', 'TEA', 'SWEETS']),
  imageUrl: z.string().url(),
  stock: z.number().int().min(0).default(0)
});

// Get all products (public)
router.get('/', async (req, res, next) => {
  try {
    const { category, search, limit = '20', offset = '0' } = req.query;

    const where: any = {};
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        take: Number(limit),
        skip: Number(offset),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
    ]);

    res.json({ products, total, limit: Number(limit), offset: Number(offset) });
  } catch (error) {
    next(error);
  }
});

// Get single product (public)
router.get('/:id', async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    });

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Create product (admin only)
router.post('/', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const data = productSchema.parse(req.body);

    const product = await prisma.product.create({ data });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

// Update product (admin only)
router.put('/:id', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const data = productSchema.partial().parse(req.body);

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Delete product (admin only)
router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
