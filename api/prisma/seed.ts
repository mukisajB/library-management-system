import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seeding...");

  // Create four genres
  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { name: "Fiction" },
      update: {},
      create: {
        name: "Fiction",
        description: "Imaginative stories and novels.",
      },
    }),
    prisma.genre.upsert({
      where: { name: "Science" },
      update: {},
      create: {
        name: "Science",
        description: "Scientific discoveries and knowledge.",
      },
    }),
    prisma.genre.upsert({
      where: { name: "History" },
      update: {},
      create: {
        name: "History",
        description: "Historical events and biographies.",
      },
    }),
    prisma.genre.upsert({
      where: { name: "Technology" },
      update: {},
      create: {
        name: "Technology",
        description: "Computers, innovation and technology.",
      },
    }),
  ]);

  const [fiction, science, history, technology] = genres;

  // Create sixteen books distributed across the genres
  const books = [
    { title: "The Great Adventure", author: "John Smith", isbn: "9780000000001", publishedYear: 2020, genreId: fiction.id },
    { title: "Beyond the Horizon", author: "Mary Johnson", isbn: "9780000000002", publishedYear: 2019, genreId: fiction.id },
    { title: "The Lost Kingdom", author: "David Brown", isbn: "9780000000003", publishedYear: 2021, genreId: fiction.id },
    { title: "Whispers of Tomorrow", author: "Sarah Wilson", isbn: "9780000000004", publishedYear: 2022, genreId: fiction.id },

    { title: "Introduction to Physics", author: "James Walker", isbn: "9780000000005", publishedYear: 2018, genreId: science.id },
    { title: "The Human Body", author: "Linda Green", isbn: "9780000000006", publishedYear: 2020, genreId: science.id },
    { title: "Exploring Space", author: "Robert Hall", isbn: "9780000000007", publishedYear: 2023, genreId: science.id },
    { title: "Discovering Biology", author: "Grace Lewis", isbn: "9780000000008", publishedYear: 2021, genreId: science.id },

    { title: "Ancient Civilizations", author: "Michael Clark", isbn: "9780000000009", publishedYear: 2017, genreId: history.id },
    { title: "History of Africa", author: "Peter Adams", isbn: "9780000000010", publishedYear: 2022, genreId: history.id },
    { title: "The Roman Empire", author: "Helen White", isbn: "9780000000011", publishedYear: 2019, genreId: history.id },
    { title: "World War History", author: "Thomas Young", isbn: "9780000000012", publishedYear: 2020, genreId: history.id },

    { title: "Learning JavaScript", author: "Daniel Scott", isbn: "9780000000013", publishedYear: 2023, genreId: technology.id },
    { title: "Introduction to Computing", author: "Elizabeth King", isbn: "9780000000014", publishedYear: 2021, genreId: technology.id },
    { title: "Artificial Intelligence", author: "William Moore", isbn: "9780000000015", publishedYear: 2024, genreId: technology.id },
    { title: "Database Management", author: "Patricia Evans", isbn: "9780000000016", publishedYear: 2022, genreId: technology.id },
  ];

  const result = await prisma.book.createMany({
    data: books,
    skipDuplicates: true,
  });

  console.log(`Genres available: ${genres.length}`);
  console.log(`New books inserted: ${result.count}`);
  console.log("Database seeding completed successfully!");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });