import Event from "../database/models/events";
import {
  findAll,
  find,
  create,
  remove,
  update,
  addMemberToEvent,
  findAndJoin,
  findAndJoin3,
} from "../database/methods";
import { EventBody, FullEventBody } from "../types/interfaces";
import Member from "../database/models/members";
import { sequalize } from "../database/db";
import Address from "../database/models/addresses";
import Image from "../database/models/images";
import Club from "../database/models/clubs";


export const searchAllEventsService = async (query: any) => {
  const events = findAll(Event, query);

  return events;
};

export const getAllEventsService = async () => {
  const events = await findAll(Event, {}, Member, "members");

  console.log(JSON.stringify(events, null, 2));
  return events;
};

export const getEventService = async (_id: string) => {
  const event = findAndJoin3(Event, _id, Address, "address", Image, "image", Club, "club");

  return event;
};

export const getEventMembersService = async (_id: string) => {
  const event = findAndJoin(Event, _id, Member, "members");

  return event;
};


  export const createEventService = async (body: FullEventBody) => {
    const {
      name,
      description,
      is_public,
      start_at,
      end_at,
      entry_fee,
      capacity,
      address,
      image,
      clubId,
      
    } = body

    try {
      const result = await sequalize.transaction(async (transaction) => {
        let eventAddressId: string;

        const existingAddress: any = await Address.findOne({
          where: {
            country: address.country,
            post_code: address.post_code,
            street_name: address.street_name,
            street_number: address.street_number,
            floor: address.floor,
            apartment: address.apartment,      
          }
        });

        if (existingAddress) {
          eventAddressId = existingAddress.id;
        } else {
          const newAddress: any = await Address.create(
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
          eventAddressId = newAddress.id;
        }

        let eventImageId: string | null = null
        if(image){

          const existingImage: any = await Image.findOne({
            attributes: ['id', 'name', 'type', 'url', 'description', 'createdAt', 'updatedAt'],
            where: {
              name: image.name,
              description: image.description,
              type: image.type,
              url: image.url,
            }
          });

        if (existingImage) {
          eventImageId = existingImage.id
        } else {
        const newImage: any = await Image.create(
          {
            name: image.name,
            description: image.description,
            type: image.type,
            url: image.url,
          },
          { transaction }
        );
        eventImageId = newImage.id
      }
    }
        
        const newEvent: any = await Event.create(
          {        
            name,
            description,
            is_public,
            start_at,
            end_at,
            entry_fee,
            capacity,
            addressId: eventAddressId,
            imageId: image ? eventImageId : null,
            clubId
          },
          { transaction }
          );

          return newEvent;

      })

        return result;
        
    } catch(error: any){
      console.error(error);
      throw new Error(`An error occurred while creating the event: ${error.message}`);
    } 
  };


////////////////////////////////////UPDATE
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


export const deleteEventService = async (_id: string) => {
  remove(Event, _id);

  return _id;
};

export const addMemberToEventService = async (
  eventId: string,
  memberId: string
) => {
  try {
    const result = await addMemberToEvent(eventId, memberId);

    return result;
  } catch (error) {

    console.error(error);
    throw new Error("Internal server error");
  }
};