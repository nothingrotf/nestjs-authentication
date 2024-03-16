# NestJS Project Study

This project is a study case for implementing authentication and database integration using NestJS. It includes features such as JWT authentication, refresh tokens, and integration with a PostgreSQL database using TypeORM. Additionally, it is containerized with Docker.

## 🛠️ Setup

Minimum requirements:

- Node.js 20.x
- Docker


```shell
# Install dependencies.
npm install

# Set up environment variables.
cp .env.default .env

# Run docker up.
npm run docker:up

# Run database migrations.
npm run db:migrate

# Run project.
npm run start:dev
```
