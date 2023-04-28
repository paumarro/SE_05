# SE_05


</br>

![Sin título-1 (1)](https://user-images.githubusercontent.com/89356704/235112292-064954fa-d435-4a6f-b04d-826438a062d2.png)

</br>

###### *"An API as a demonstration of my proficiency in SE_05 Relational Databases. The API is specifically designed to facilitate the management of Clubs' Events and Members through various endpoints."*

# Use Cases

But what exactley can ClubWind users do?

Registration 
- In order to register as a **User**, an pre-existing User with admin privileges has to create a **Member** entry with his/her information.
- The new Member can now use his/her email as a username and choose a password. 
- If through the registry the new Member is assigned to a **Role** as a 'manager', he/she can set his/her account up as an admin as well.

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


##### I've used Sequelazie DataTypes instead of MySQL DataTypes for the Physical ERD as they allow us to mantain the same format if we decide to change to a different DBMS in the future.

### Constrains: 

*Unique*:

  Member.email , User.username , Role.name

*Not Nullable*:

  Most values for Address (except 'floor' & 'apartment') , Club.name & Club.description , Image.url , Member.first_name, Member.last_name, Member.email, Member.roleId,   Member.clubId , Role.name , User.Username , User.password

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
DB_NAME=ClubWindDB
```

Replace `your_password` with your actual MySQL root password.

4. Set up the database

Create a new database named `ClubWindDB` in your MySQL Server, using a tool like MySQL Workbench or the MySQL command-line interface.

5. Compile TypeScript to JavaScript
```
npm run build
```

6. Start the development server
```
npm run dev
```

The development server will now be running, and you can access it at `http://localhost:3000`.

7. Use a tool like [Postman](https://www.postman.com/) to call the endoints defined in the routes.

A Member with a 'manager' role has been set up automatically when running the software. 

 
   Through the endpoint (post) `http://localhost:3000/users/register`
   
   Register with the following JSON body:
     

    {
    "username":"testman@example.com",
    "password":"SuperSecret123@", //or whatever you choose
    "isAdmin": true
    }

    
   Now you can interact with the database as you wish!
   
   I suggest to start by creating Members & Events.
   
   (post) `http://localhost:3000/members/`
   
   (post) `http://localhost:3000/events/`
   
   Here I leave some boilerplate JSON bodies:
   
   ##### Member:
   
      {
        "first_name": "Jimi",
        "last_name": "Hendrix",
        "date_of_entry": "2022-02-15",
        "email": "VoodooChild@example.com",
        "gender": "M",
        "phone": "1235551212",
        "birthday": "1995-05-29",
        "address": {
          "post_code": "90210",
          "country": "USA",
          "street_name": "Beverly Hills",
          "street_number": 123,
          "floor": "3rd",
          "apartment": "305"
        },
        "image": {
          "name": "Jimi's Profile Picture",
          "description": "A photo of Jimi at Westwood.",
          "url": "https://example.com/images/jane-doe.jpg",
          "type": "jpg"
        },
        "roleId": 3,
        "clubId": 4
      }

   ##### Event:
   
     {
    "name": "Chess Match",
    "description": "International Championchip",
    "is_public": true,
    "start_at": "2023-05-15",
    "end_at": "2023-05-15",
    "entry_fee": 25,
    "capacity": 500,
    "address": {
      "post_code": "12345",
      "country": "United States",
      "street_name": "Main St",
      "street_number": 123,
      "floor": "2nd",
      "apartment": "Apt 4B"
    },
    "image": {
      "name": "Chess Match",
      "description": "A crowd of people enjoying live music in the sunshine",
      "url": "https://example.com/chess-match.jpg",
      "type": "image/jpeg"
    },
    "clubId": 1
  }


## Additional Information

Please refer to the `package.json` and `tsconfig.json` files for more details on the project configuration.

</br>

# Next steps

###### Some features that have not been implemented due to time constraints

+ As teased in the beginnig of the document, my next efforst will be focused in developing financial managment features.

+ A method to allow users to choose a username distict from their email address to reduce redundancy.

+ Development to grant users exclusively access to Data concerning their own Club is a priority. As well as JOINing Clubs and Events.  


# Brag Corner

## 1. Designing a complex DB and simplifying it to a point that made sense for an MVP

In our team we have been focusing on our end product from the start. That same approach was taken when thinking about our data base, resulting in a very intricate design from which I reversed enginnered to figure out what the core necessities for ClubWind are.

The following is the original diagram color coded by privilege categories.

![Clubwind ERM - Database ER diagram (crow's foot) (1)](https://user-images.githubusercontent.com/89356704/235145368-59939656-094f-471b-9f42-11bbd9be2aea.png)


</br>
</br>

## 2. Transaction operations for Creation, Update & Delete

I would consider my first milestone to be JOINing tables to have a complete view of a particular member or event (to directly see the location for instance). As sequelize proved not to be as intuitive and straight foward in practice as presented in the official documentation.

Nevertheless, the achievment I am most proud of is handeling multiple tables in one unit of work (through transactions). Not only for the technical aspect of it, but also for the logical thinking that it requires. 

##### The following is an example of one of such operations:

```

export const updateEventService = async (
  eventId: string,
  body: FullEventBody
) => {
  const {
    name,
    description,
    is_public,
    start_at,
    end_at,
    entry_fee,
    capacity,
    address,
    image
  } = body;

  try {

  const updatedEvent = await sequalize.transaction(async (transaction) => {
    
     const eventToUpdate: any = await Event.findByPk(eventId);
     let eventAddressId: string = eventToUpdate.addressId;

    if (address) {
      const existingAddress: any = await Address.findOne({
        where: {
          country: address.country,
          post_code: address.post_code,
          street_name: address.street_name,
          street_number: address.street_number,
        }
      });
      console.log(address);

      if (existingAddress) {
        eventAddressId = existingAddress.id;

      } else {

        const newAddress: any = await Address.findOne({
          where: {
           id: eventAddressId
          }
        })
          
      await newAddress.update(
            {
  
              country: address.country,
              post_code: address.post_code,
              street_name: address.street_name,
              street_number: address.street_number,
              floor: address.floor,
              apartment: address.apartment,
            },
            { transaction }
          );
      }
    }

    let eventImageId: number = eventToUpdate.imageId || null; 
    if (image) {
      let existingImage: any = await Image.findOne({
        where: { 
          name: image.name,
          description: image.description,
          type: image.type,
          url: image.url,
        }
      });

    if (existingImage) {
      eventImageId = existingImage.id

    }else{
        const newImage: any = await Image.findOne({
          where: {
            id: eventImageId
          }
        })
        
        await newImage.update(
          {
            name: image.name,
            description: image.description,
            type: image.type, 
            url: image.url,
          },
          { transaction }
        );
      }
    }

    if (eventToUpdate) {
      const updateParams: any = {
        imageId: eventImageId,
        addressId: eventAddressId,
        
      };

      if (name) updateParams.name = name;
      if (description) updateParams.description = description;
      if (is_public) updateParams.is_public = is_public;
      if (start_at) updateParams.start_at = start_at;
      if (end_at) updateParams.end_at = end_at;
      if (capacity) updateParams.capacity = capacity;
      if (entry_fee) updateParams.entry_fee = entry_fee;

      await eventToUpdate.update(updateParams, { transaction });
    } else {
      throw new Error(`Event with id ${eventId} not found.`);
    }

    return eventToUpdate;
  });

  
  return updatedEvent;
} catch(error: any) {
  console.error(error);
      throw new Error(`An error occurred while updating event with id ${eventId}: ${error.message}`);
    } 
  
};

```

## 3. Learning to Think in Systems
  
Designing and developing a relational database has significantly enhanced my ability to think in systems. By engaging with the interconnected nature of data and its organization, I have gained a deeper understanding some of the principles outlined in Meadows' *Thinking in Systems* which has ultimately enriched my problem-solving capabilities and decision-making processes across various aspects of my life.


