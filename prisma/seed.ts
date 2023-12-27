import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRoles() {
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      externalId: '12345678',
    },
  });

  await prisma.role.create({
    data: {
      name: 'Superuser',
      global: true,
      permissions: { create: [{ permission: 'global.superuser' }] },
      userRoles: { create: [{ userId: adminUser.id }] },
    },
  });
}

seedRoles().then(() => {
  console.log('Roles seeded');
  process.exit(0);
});
