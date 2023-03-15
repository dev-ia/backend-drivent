import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { arrayBuffer } from 'stream/consumers';
const prisma = new PrismaClient();
import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  async function deleteOnCascadeAllTicketTypes() {
    await prisma.payment.deleteMany({});
    await prisma.ticket.deleteMany({});
    await prisma.ticketType.deleteMany({});
    const ticketTypeArray = await prisma.ticketType.createMany({
      data: [
        {
          name: 'online',
          price: 150,
          isRemote: true,
          includesHotel: false,
        },
        {
          name: 'presencial sem hotel',
          price: 250,
          isRemote: false,
          includesHotel: false,
        },
        {
          name: 'presencial com hotel',
          price: 450,
          isRemote: false,
          includesHotel: true,
        },
      ],
    });
    console.log({ ticketTypeArray });
  }

  async function createHotelsWithRoomsAndBookings() {
    await prisma.booking.deleteMany({});
    await prisma.room.deleteMany({});
    await prisma.hotel.deleteMany({});

    for (let i = 0; i < 3; i++) {
      const hotel = await prisma.hotel.create({
        data: {
          name: faker.name.findName(),
          image: faker.image.imageUrl(),
        },
      });

      for (let j = 0; j < 16; j++) {
        const capacity = faker.datatype.number({ min: 1, max: 3 });
        let name = '';

        if (capacity === 1) {
          name = 'single';
        } else if (capacity === 2) {
          name = 'double';
        } else {
          name = 'triple';
        }

        const room = await prisma.room.create({
          data: {
            name,
            capacity,
            hotelId: hotel.id,
          },
        });

        const bookingCout = faker.datatype.number({ min: 0, max: capacity });

        for (let k = 0; k < bookingCout; k++) {
          const password = faker.internet.password();
          const hashedPassword = await bcrypt.hash(password, 10);

          const user = await prisma.user.create({
            data: {
              email: faker.internet.email(),
              password: hashedPassword,
            },
          });

          const booking = await prisma.booking.create({
            data: {
              userId: user.id,
              roomId: room.id,
            },
          });
        }
      }
    }
  }

  //creating datas to activities, local and bookingActivities - SPRINT 3

  const locals = await prisma.local.createMany({
    data: [{ name: 'Auditório Principal' }, { name: 'Auditório Lateral' }, { name: 'Sala de Workshop' }],
  });

  const seed = async () => {
    const dates = [new Date('2022-04-01'), new Date('2022-04-02'), new Date('2022-04-03')];

    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      await prisma.activities.create({
        data: {
          name: `Activity ${i + 1}`,
          data: date,
          hour_of_activity: new Date('2022-03-16T12:00:00Z'),
          local: {
            connect: { id: 1 },
          },
        },
      });
    }

    //await prisma.$disconnect();
  };
  seed();

  // const activities = await prisma.activities.createMany({
  //   data: [
  //     {
  //       name: 'Yoga Class',
  //       data: new Date('2022-04-01'),
  //       hour_of_activity: new Date('2023-03-16T10:00:00Z'),
  //       local_id: 1,
  //     },
  //     {
  //       name: 'Basketball Game',
  //       data: new Date(),
  //       hour_of_activity: new Date('2023-03-18T14:00:00Z'),
  //       local_id: 2,
  //     },
  //     {
  //       name: 'Dance Party',
  //       data: new Date(),
  //       hour_of_activity: new Date('2023-03-20T20:00:00Z'),
  //       local_id: 3,
  //     },
  //   ],
  // });

  const bookingActivities = await prisma.bookingActivity.createMany({
    data: [
      { user_id: 1, activity_id: 1 },
      { user_id: 1, activity_id: 2 },
      { user_id: 1, activity_id: 3 },
    ],
  });

  deleteOnCascadeAllTicketTypes();
  createHotelsWithRoomsAndBookings();
  console.log({ event, locals, bookingActivities });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
