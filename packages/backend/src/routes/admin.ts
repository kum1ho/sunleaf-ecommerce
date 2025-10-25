import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all orders (admin only)
router.get('/orders', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        },
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

// Get stats (admin only)
router.get('/stats', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const [totalProducts, totalOrders, totalUsers, orders] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count(),
      prisma.order.findMany({
        select: { total: true }
      })
    ]);

    const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      totalUsers
    });
  } catch (error) {
    next(error);
  }
});

export default router;
