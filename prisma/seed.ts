import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');
  const usersCount = await prisma.users.count();
  if (usersCount > 0) {
    console.log('Seed skipped: database already contains users.');
    return;
  }


  // ==============================
  // LOCATIONS
  // ==============================

  const locations = await prisma.locations.createMany({
    data: [
      {
        ten_vi_tri: 'Hà Nội',
        tinh_thanh: 'Hà Nội',
        quoc_gia: 'Việt Nam',
        hinh_anh: 'https://images.unsplash.com/photo-1555921015-5532091f6026',
      },

      {
        ten_vi_tri: 'Hồ Chí Minh',
        tinh_thanh: 'TP Hồ Chí Minh',
        quoc_gia: 'Việt Nam',
        hinh_anh:
          'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
      },

      {
        ten_vi_tri: 'Đà Nẵng',
        tinh_thanh: 'Đà Nẵng',
        quoc_gia: 'Việt Nam',
        hinh_anh: 'https://images.unsplash.com/photo-1555921015-5532091f6026',
      },

      {
        ten_vi_tri: 'Nha Trang',
        tinh_thanh: 'Khánh Hòa',
        quoc_gia: 'Việt Nam',
        hinh_anh:
          'https://images.unsplash.com/photo-1594818379496-da1e345b0ded',
      },

      {
        ten_vi_tri: 'Đà Lạt',
        tinh_thanh: 'Lâm Đồng',
        quoc_gia: 'Việt Nam',
        hinh_anh:
          'https://images.unsplash.com/photo-1601961545517-59307b1bcd16',
      },

      {
        ten_vi_tri: 'Phú Quốc',
        tinh_thanh: 'Kiên Giang',
        quoc_gia: 'Việt Nam',
        hinh_anh:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      },

      {
        ten_vi_tri: 'Hội An',
        tinh_thanh: 'Quảng Nam',
        quoc_gia: 'Việt Nam',
        hinh_anh:
          'https://images.unsplash.com/photo-1528127269322-539801943592',
      },

      {
        ten_vi_tri: 'Sa Pa',
        tinh_thanh: 'Lào Cai',
        quoc_gia: 'Việt Nam',
        hinh_anh: 'https://images.unsplash.com/photo-1549880181-56a44cf4a9a5',
      },

      {
        ten_vi_tri: 'Huế',
        tinh_thanh: 'Thừa Thiên Huế',
        quoc_gia: 'Việt Nam',
        hinh_anh: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc',
      },

      {
        ten_vi_tri: 'Cần Thơ',
        tinh_thanh: 'Cần Thơ',
        quoc_gia: 'Việt Nam',
        hinh_anh:
          'https://images.unsplash.com/photo-1591012911207-0db3bcb7b6b8',
      },
    ],
  });

  // ==============================
  // ROOMS
  // ==============================

  const rooms: any[] = [];

  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 3; j++) {
      rooms.push({
        ten_phong: `Phòng ${j} - Location ${i}`,

        khach: 4,

        phong_ngu: 2,

        giuong: 2,

        phong_tam: 1,

        mo_ta: 'Phòng đẹp, gần trung tâm, đầy đủ tiện nghi',

        gia_tien: 120,

        may_giat: true,

        ban_la: true,

        tivi: true,

        dieu_hoa: true,

        wifi: true,

        bep: true,

        do_xe: true,

        ho_boi: j % 2 === 0,

        ban_ui: true,

        location_id: i,

        hinh_anh: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      });
    }
  }

  await prisma.rooms.createMany({
    data: rooms,
  });

  // ==============================
  // USERS
  // ==============================
  await prisma.users.createMany({
    data: [
      {
        name: 'Nguyen Van A',
        email: 'nguyenvana@example.com',
        password: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        phone: '0901234567',
        role: 'USER',
      },
      {
        name: 'Tran Thi B',
        email: 'tranthib@example.com',
        password: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        phone: '0902345678',
        role: 'USER',
      },
      {
        name: 'Le Van C',
        email: 'levanc@example.com',
        password: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
        phone: '0903456789',
        role: 'USER',
      },
    ],
  });
  console.log('✅ Users seeded');

  // ==============================
  // BOOKINGS
  // ==============================
  const bookingsData = [
    {
      room_id: 1,
      user_id: 1,
      start_date: new Date('2025-07-10'),
      end_date: new Date('2025-07-15'),
      so_luong_khach: 2,
    },
    {
      room_id: 2,
      user_id: 2,
      start_date: new Date('2025-07-12'),
      end_date: new Date('2025-07-18'),
      so_luong_khach: 3,
    },
    {
      room_id: 3,
      user_id: 1,
      start_date: new Date('2025-08-01'),
      end_date: new Date('2025-08-05'),
      so_luong_khach: 2,
    },
    {
      room_id: 4,
      user_id: 3,
      start_date: new Date('2025-08-10'),
      end_date: new Date('2025-08-12'),
      so_luong_khach: 4,
    },
  ];

  for (const booking of bookingsData) {
    await prisma.bookings.create({
      data: booking,
    });
  }
  console.log('✅ Bookings seeded');
  // =========================
  // COMMENTS
  // =========================
  const commentsData = [
    {
      room_id: 1,
      user_id: 1,
      ngay_binh_luan: new Date(),
      noi_dung: 'Phòng sạch sẽ, chủ nhà thân thiện.',
      sao: 5,
    },
    {
      room_id: 2,
      user_id: 2,
      ngay_binh_luan: new Date(),
      noi_dung: 'Vị trí rất đẹp, gần trung tâm.',
      sao: 4,
    },
    {
      room_id: 3,
      user_id: 3,
      ngay_binh_luan: new Date(),
      noi_dung: 'Phòng hơi nhỏ nhưng đầy đủ tiện nghi.',
      sao: 4,
    },
    {
      room_id: 4,
      user_id: 1,
      ngay_binh_luan: new Date(),
      noi_dung: 'Rất đáng tiền, sẽ quay lại.',
      sao: 5,
    },
  ];
  for (const comment of commentsData) {
    await prisma.comments.create({
      data: comment,
    });
  }
  console.log('✅ Comments seeded');
  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

