import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  await prisma.bucketListEvent.deleteMany({})

  const bucketListEvents = [
    {
      name: "Walk El camino de santiago",
      country: "Spain",
      dateMonth: 6,
      dateYear: 2025,
      category: "Nature"
    },
    {
      name: "Visit every state in the US",
      country: "United States"
    },
    {
      name: "Go to France Olympics",
      state: "Paris",
      country: "France",
      dateMonth: 7,
      dateYear: 2024,
      notes: "Watch live ping pong"
    },
    {
      name: "Win office trivia contest",
      state: "Scranton",
      country: "United States",
      notes: "preferably in Scranton, PA"
    }
  ]

  for (const event of bucketListEvents) {
    await prisma.bucketListEvent.create({
      data: event,
    });
  }
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
