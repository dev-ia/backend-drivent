import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      Rooms: {
        select: {
          name: true,
          capacity: true,
          _count: true
        }
      }
    }
  });
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    select: {
      id: true,
      Rooms: {
        select: {
          id: true,
          name: true,
          capacity: true,
          Booking: {
            select: {
              id: true,
            },
          },
          _count: true
        },
      }
    }
  });
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
};

export default hotelRepository;
