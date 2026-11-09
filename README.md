# Library Management System

## Project Overview

A Library Management System backend built with NestJS, Prisma ORM and PostgreSQL. It provides a structured database for managing library users, books and genres.

## Technology Stack

- Node.js
- NestJS
- TypeScript
- Prisma ORM 7
- PostgreSQL
- Neon PostgreSQL hosting

## Database Models

### User
Stores library user information, including name, email and role.

### Role
Defines two user roles:
- PATRON
- LIBRARIAN

### Genre
Stores book categories, including their names and descriptions.

### Book
Stores book information, including title, author, ISBN, publication year and genre relationship.

## Schema Decisions

The Book model references Genre through a foreign key called `genreId` instead of embedding the genre name directly inside each book record.

This relational design provides several advantages:

1. **Data consistency:** Genre information is maintained in one place.
2. **Reduced duplication:** Multiple books can reference the same genre without repeatedly storing its name and description.
3. **Referential integrity:** The foreign key ensures that each book references an existing genre.
4. **Maintainability:** Updating a genre name does not require updating every associated book.

The relationship between Genre and Book is one-to-many: one genre can contain multiple books, while each book belongs to one genre.

## Database Setup

1. Clone the repository.
2. Navigate into the API directory:

   `cd api`

3. Install dependencies:

   `npm install`

4. Create a `.env` file using `.env.example` as a template.
5. Add your PostgreSQL connection string to `DATABASE_URL`.
6. Apply database migrations:

   `npx prisma migrate dev`
   
7. Generate Prisma Client:

   `npx prisma generate`

8. Seed the database:

   `npx prisma db seed`

9. Start the development server:

   `npm run start:dev`

## Seed Data

The seed script creates:

- 4 book genres.
- 16 sample books distributed across the genres.

## Database Hosting

PostgreSQL is hosted using Neon.

## Security

Never commit the `.env` file or expose database credentials. Use `.env.example` to document required environment variables.