# SE_05

"I have created an API as a demonstration of my proficiency in SE_05 Relational Databases. The API is specifically designed to facilitate the management of Clubs' Events and Members through various endpoints."


# ClubWind Node.js TypeScript API

This project is a Node.js API built with Express, Sequelize, MySQL and TypeScript.

## Prerequisites

Before you proceed, ensure you have the following installed on your machine:

- Node.js (version 14.0.0 or higher)
- npm (version 6.0.0 or higher)
- MySQL Server

## Setup

Follow these steps to set up the development environment:

1. Clone the repository
```
git clone https://github.com/yourusername/clubwind-node-ts-be.git
```

2. Install the dependencies
```
cd clubwind-node-ts-be
npm install
```

3. Set up environment variables

Create a `.env` file in the root folder of the project and add the following variables:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=clubWindDB
```

Replace `your_password` with your actual MySQL root password.

4. Set up the database

Create a new database named `clubWindDB` in your MySQL Server, using a tool like MySQL Workbench or the MySQL command-line interface.

5. Compile TypeScript to JavaScript
```
npm run build
```

6. Start the development server
```
npm run dev
```

The development server will now be running, and you can access it at `http://localhost:3000`.

## Running Tests

To run tests, use the following command:

```
npm test
```

## Building for Production

To build the project for production, run the following command:

```
npm run build
```

This will generate the JavaScript files in the `build` directory. You can then deploy the `build` folder to your production server.

## Additional Information

This project uses the following main dependencies:

- Express: Web framework for building APIs
- Sequelize: ORM for MySQL
- TypeScript: Provides static types for JavaScript
- MySQL: Database

Please refer to the `package.json` and `tsconfig.json` files for more details on the project configuration.
```
