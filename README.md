# Food Delivery Backend 🍔

A scalable and robust server-side application for a Food Delivery platform built using [NestJS](https://nestjs.com/), TypeScript, and TypeORM with a MySQL database.

## 🚀 Features

- **User Management**: Creating and managing user accounts.
- **Authentication**: Secure user login and authorization (`AuthModule`).
- **Mail Service**: Integrated mailing feature (`MailModule`).
- **Modular Architecture**: Built with highly cohesive NestJS modules.
- **Database Integration**: Built-in TypeORM configuration for a MySQL database.

---

## 📁 Project Structure

This project follows a standard NestJS feature-based module architecture.

```text
food_delivery_backend/
├── src/
│   ├── auth/                   # Authentication module (login, signup logic, etc.)
│   ├── mail/                   # Mailing service module (integrations for emails)
│   ├── user/                   # User management module (entities, controllers, services)
│   ├── app.controller.spec.ts  # Root controller tests
│   ├── app.controller.ts       # Root controller
│   ├── app.module.ts           # Main application module integrating all features
│   ├── app.service.ts          # Root business logic
│   └── main.ts                 # Application entry point
├── test/                       # e2e testing configurations
├── .env                        # Environment variables (to be created)
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js**: v16.x or newer
- **npm** (or yarn)
- **MySQL**: A running MySQL database instance

---

## ⚙️ Configuration

1. **Environment Variables**: Create a `.env` file in the root directory. You must supply your database credentials for TypeORM to connect successfully. Here is an example of what your `.env` should look like:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=food_delivery_db
   
   # Note: Include any other required environment variables, like JWT_SECRET, here.
   ```

---

## 📦 Installation

Clone the repository and install the necessary dependencies:

```bash
# 1. Navigate to the project directory
$ cd food_delivery_backend

# 2. Install dependencies
$ npm install
```

---

## ▶️ Running the Application

Once dependencies are installed and the `.env` file is set up, you can start the application:

```bash
# development mode
$ npm run start

# watch mode (recommended for local development)
$ npm run start:dev

# production mode
$ npm run start:prod
```

> **Note**: This application is currently configured with `synchronize: true` in its TypeORM settings (in `AppModule`). This means TypeORM will automatically sync your database schema with the application's entities on startup. In production, be sure to switch to migrations instead.

---

## 🧪 Testing

The project includes standard Jest setups for unit and end-to-end testing:

```bash
# run unit tests
$ npm run test

# run e2e tests
$ npm run test:e2e

# generate test coverage report
$ npm run test:cov
```
