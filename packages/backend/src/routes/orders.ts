import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();
const prisma = new PrismaClient();

const orderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive()
});

const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  shippingAddress: z.string().min(5),
  shippingCity: z.string().min(2),
  shippingZip: z.string().min(4),
  phone: z.string().min(10)
});

// Create order (authenticated)
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { items, shippingAddress, shippingCity, shippingZip, phone } = 
      createOrderSchema.parse(req.body);

    // Validate products and calculate total
    const productIds = items.map(i => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    if (products.length !== items.length) {
      throw new AppError(400, 'One or more products not found');
    }

    // Check stock
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      if (!product || product.stock < item.quantity) {
        throw new AppError(400, `Insufficient stock for ${product?.name}`);
      }
    }

    const total = items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId)!;
      return sum + product.price * item.quantity;
    }, 0);

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId: req.user!.id,
        total,
        shippingAddress,
        shippingCity,
        shippingZip,
        phone,
        status: 'PENDING',
        items: {
          create: items.map(item => {
            const product = products.find(p => p.id === item.productId)!;
            return {
              productId: item.productId,
              quantity: item.quantity,
              price: product.price
            };
          })
        }
      },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    // Update stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// Get user orders (authenticated)
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Get single order (authenticated)
router.get('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    if (order.userId !== req.user!.id && req.user!.role !== 'ADMIN') {
      throw new AppError(403, 'Access denied');
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

// Update order status (admin only)
router.patch('/:id/status', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const { status } = z.object({
      status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
    }).parse(req.body);

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status }
    });

    res.json(order);
  } catch (error) {
    next(error);
  }
});

export default router;
