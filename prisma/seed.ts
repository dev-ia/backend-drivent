import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { arrayBuffer } from 'stream/consumers';
const prisma = new PrismaClient();

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
          includesHotel: true,
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

  deleteOnCascadeAllTicketTypes();
  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
