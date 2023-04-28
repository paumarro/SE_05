# SE_05

</br>

![Sin título-1 (1)](https://user-images.githubusercontent.com/89356704/235112292-064954fa-d435-4a6f-b04d-826438a062d2.png)

</br>
</br>
</br>

*"An API as a demonstration of my proficiency in SE_05 Relational Databases. The API is specifically designed to facilitate the management of Clubs' Events and Members through various endpoints."*

# Use Cases

But what exactley can ClubWind users do?

- In order to register as a User, an pre-existing User with admin privileges has to create a Member entry with his/her information.
- It is precisely 



## Database Design

![Clubwind ERM - Página 3 (2)](https://user-images.githubusercontent.com/89356704/235117901-865e703d-5c9e-4f7c-95e8-5f8386994686.png)


I've used Sequelazie DataTypes instead of MySQL DataTypes for the Physical ERD as they allow us to mantain the same format if we decide to change to a different DBMS in the future.

## Tech Stack
This project uses the following main dependencies:

- **Express**: *Web framework for building APIs*
- **Sequelize**: *ORM for MySQL*
- **TypeScript**: *Provides static types for JavaScript*
- **MySQL**: *Database*

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



## Additional Information

Please refer to the `package.json` and `tsconfig.json` files for more details on the project configuration.



## Brag Corner

- Designing a complex DB and simplifying the it to a point that made sense for an MVP

![Clubwind ERM - Database ER diagram (crow's foot)](https://user-images.githubusercontent.com/89356704/235119977-b0a4086a-3567-4932-a47f-9f4358e2832f.png)

</br>
</br>
- Learning to Think in Systems




- Transaction operations for Creation and Update (get specific)
  

