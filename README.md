# SE_05

</br>

![Sin título-1 (1)](https://user-images.githubusercontent.com/89356704/235112292-064954fa-d435-4a6f-b04d-826438a062d2.png)

</br>
</br>
</br>

*"An API as a demonstration of my proficiency in SE_05 Relational Databases. The API is specifically designed to facilitate the management of Clubs' Events and Members through various endpoints."*

# Use Cases

But what exactley can ClubWind users do?

Registration 
- In order to register as a **User**, an pre-existing User with admin privileges has to create a **Member** entry with his/her information.
- The new Member can now use his/her email as a username and choose a password. 
- If through the registry the new Member is assigned to a Role as a 'manager', he/she can set his/her account up as an admin as well.

Privileges
- With the admin privileges the user is able to CRUD **Events** and **Members**. 
- Regular **Users** can only read the content. E.g. Consulting upcoming **Events** and the attendence of other **Members**
- Tresaurer will have exclusive access to upcoming financial contents. (In development)

Relationships
- **Members**, **Clubs** & **Events** can be assigned to an **Image** along there other specific data.
- **Mebers** & **Events** can be also linked to an **Address**.
- **Members** can be added to **Events**.


## Database Design

![Clubwind ERM - Página 3 (5)](https://user-images.githubusercontent.com/89356704/235135905-880f4490-85a2-4571-bb1d-05526b85f1c7.png)


I've used Sequelazie DataTypes instead of MySQL DataTypes for the Physical ERD as they allow us to mantain the same format if we decide to change to a different DBMS in the future.

**Constrains**: 

Add constrains

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


## Additional Information

Please refer to the `package.json` and `tsconfig.json` files for more details on the project configuration.



# Brag Corner

## 1. Designing a complex DB and simplifying the it to a point that made sense for an MVP

![Clubwind ERM - Database ER diagram (crow's foot)](https://user-images.githubusercontent.com/89356704/235119977-b0a4086a-3567-4932-a47f-9f4358e2832f.png)

</br>
</br>

## 2. Transaction operations for Creation and Update (get specific)

code snipped

## 3. Learning to Think in Systems
  
Talk about the intuition and the book.

# Next steps

Write about crucial upcoming changes to the database

