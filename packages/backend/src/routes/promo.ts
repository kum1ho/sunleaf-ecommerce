import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Validate and apply promo code
router.post('/validate', async (req, res) => {
  try {
    const { code, totalAmount } = req.body;

    const promoCode = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!promoCode) {
      return res.status(404).json({ error: 'Промокод не знайдено' });
    }

    if (!promoCode.isActive) {
      return res.status(400).json({ error: 'Промокод не активний' });
    }

    if (promoCode.expiresAt && new Date(promoCode.expiresAt) < new Date()) {
      return res.status(400).json({ error: 'Промокод прострочений' });
    }

    if (promoCode.maxUses > 0 && promoCode.usedCount >= promoCode.maxUses) {
      return res.status(400).json({ error: 'Ліміт використань промокоду вичерпано' });
    }

    if (totalAmount < promoCode.minPurchase) {
      return res.status(400).json({ 
        error: `Мінімальна сума замовлення ${promoCode.minPurchase} ₴` 
      });
    }

    let discountAmount = 0;
    if (promoCode.type === 'PERCENTAGE') {
      discountAmount = (totalAmount * promoCode.discount) / 100;
    } else {
      discountAmount = promoCode.discount;
    }

    res.json({
      valid: true,
      code: promoCode.code,
      discount: promoCode.discount,
      type: promoCode.type,
      discountAmount: Math.round(discountAmount * 100) / 100
    });
  } catch (error) {
    console.error('Promo code validation error:', error);
    res.status(500).json({ error: 'Помилка перевірки промокоду' });
  }
});

// Apply promo code (increment usage)
router.post('/apply', async (req, res) => {
  try {
    const { code } = req.body;

    await prisma.promoCode.update({
      where: { code: code.toUpperCase() },
      data: { usedCount: { increment: 1 } }
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Promo code apply error:', error);
    res.status(500).json({ error: 'Помилка застосування промокоду' });
  }
});

// Admin: Get all promo codes
router.get('/admin', authenticate, async (req, res) => {
  try {
    const userRole = (req as any).user.role;
    if (userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Доступ заборонено' });
    }

    const promoCodes = await prisma.promoCode.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json(promoCodes);
  } catch (error) {
    res.status(500).json({ error: 'Помилка завантаження промокодів' });
  }
});

// Admin: Create promo code
router.post('/admin', authenticate, async (req, res) => {
  try {
    const userRole = (req as any).user.role;
    if (userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Доступ заборонено' });
    }

    const { code, discount, type, minPurchase, maxUses, expiresAt } = req.body;

    const promoCode = await prisma.promoCode.create({
      data: {
        code: code.toUpperCase(),
        discount: parseFloat(discount),
        type,
        minPurchase: parseFloat(minPurchase) || 0,
        maxUses: parseInt(maxUses) || 0,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      }
    });

    res.status(201).json(promoCode);
  } catch (error) {
    console.error('Promo code creation error:', error);
    res.status(500).json({ error: 'Помилка створення промокоду' });
  }
});

// Admin: Delete promo code
router.delete('/admin/:id', authenticate, async (req, res) => {
  try {
    const userRole = (req as any).user.role;
    if (userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Доступ заборонено' });
    }

    await prisma.promoCode.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Промокод видалено' });
  } catch (error) {
    res.status(500).json({ error: 'Помилка видалення промокоду' });
  }
});

// Admin: Toggle active status
router.patch('/admin/:id/toggle', authenticate, async (req, res) => {
  try {
    const userRole = (req as any).user.role;
    if (userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Доступ заборонено' });
    }

    const promoCode = await prisma.promoCode.findUnique({
      where: { id: req.params.id }
    });

    if (!promoCode) {
      return res.status(404).json({ error: 'Промокод не знайдено' });
    }

    const updated = await prisma.promoCode.update({
      where: { id: req.params.id },
      data: { isActive: !promoCode.isActive }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Помилка оновлення промокоду' });
  }
});

export default router;
