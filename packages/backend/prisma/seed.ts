import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sunleaf.com' },
    update: {},
    create: {
      email: 'admin@sunleaf.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN'
    }
  });
  console.log('✅ Admin user created:', admin.email);

  // Create sample products
  const products = [
    {
      name: 'Ethiopian Arabica',
      description: 'Premium single-origin coffee beans with fruity notes',
      price: 15.99,
      category: 'COFFEE',
      imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
      stock: 50
    },
    {
      name: 'Colombian Dark Roast',
      description: 'Rich and bold dark roast coffee',
      price: 12.99,
      category: 'COFFEE',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
      stock: 40
    },
    {
      name: 'Green Tea Sencha',
      description: 'Traditional Japanese green tea',
      price: 8.99,
      category: 'TEA',
      imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
      stock: 60
    },
    {
      name: 'Earl Grey Classic',
      description: 'Black tea with bergamot flavor',
      price: 7.49,
      category: 'TEA',
      imageUrl: 'https://images.unsplash.com/photo-1597318128159-f6803674e6c6?w=400',
      stock: 55
    },
    {
      name: 'Belgian Chocolate Truffles',
      description: 'Handcrafted dark chocolate truffles',
      price: 18.99,
      category: 'SWEETS',
      imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400',
      stock: 30
    },
    {
      name: 'Honey Almond Cookies',
      description: 'Crunchy cookies with honey and almonds',
      price: 6.99,
      category: 'SWEETS',
      imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
      stock: 45
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: product as any
    });
  }
  console.log(`✅ ${products.length} products created`);

  // Create sample promo codes
  const promoCodes = [
    {
      code: 'WELCOME10',
      discount: 10,
      type: 'PERCENTAGE',
      minPurchase: 0,
      maxUses: 0,
      isActive: true
    },
    {
      code: 'SUMMER50',
      discount: 50,
      type: 'FIXED',
      minPurchase: 500,
      maxUses: 100,
      isActive: true,
      expiresAt: new Date('2025-12-31')
    },
    {
      code: 'FREESHIP',
      discount: 50,
      type: 'FIXED',
      minPurchase: 300,
      maxUses: 0,
      isActive: true
    }
  ];

  for (const promo of promoCodes) {
    await prisma.promoCode.upsert({
      where: { code: promo.code },
      update: {},
      create: promo as any
    });
  }
  console.log(`✅ ${promoCodes.length} promo codes created`);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
