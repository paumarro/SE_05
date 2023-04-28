import Member from "../database/models/members";
import {
  findAll,
  find,
  create,
  remove,
  update,
  findAndJoin,
  findAndJoin3,
} from "../database/methods";
import {
  FullMemberBody,
  MemberBody,
  UpdateMemberBody,
} from "../types/interfaces";
import Event from "../database/models/events";
import Address from "../database/models/addresses";
import Image from "../database/models/images";
import { sequalize } from "../database/db";
import { Role } from "../database/models/roles";

export const getAllMemberService = async () => {
  const members = findAll(Member, {});

  return members;
};

export const searchAllMemberService = async (query: any) => {
  const members = findAll(Member, query);

  return members;
};

export const getMemberEventsService = async (_id: string) => {
  const member = findAndJoin(Member, _id, Event, "events");

  return member;
};

export const getMemberService = async (_id: string) => {
  const member = findAndJoin3(Member, _id, Address, "address", Image, "image", Role, "role");

  return member;
};
////////////////////////////////////CREATE
export const createMemberService = async (
  body: FullMemberBody) => {
  const {
    first_name,
    last_name,
    date_of_entry,
    email,
    phone,
    gender,
    birthday,
    address,
    image,
    roleId,
    clubId,
  } = body;

  try {



  const result = await sequalize.transaction(async (transaction) => {
    let memberAddressId: string;

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
      memberAddressId = existingAddress.id;
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
      memberAddressId = newAddress.id;
    }

    const memberImage: any = await Image.create(
      {
        name: image.name,
        description: image.description,
        type: image.type,
        url: image.url,
      },
      { transaction }
    ); 
  
  const registeredEmail: any = await Member.findOne({where:{ email }})

  if (registeredEmail) {
    throw new Error(`Email already registered`);
  } else {
    const newMember: any = await Member.create(
      {
        first_name,
        last_name,
        date_of_entry,
        email,
        phone,
        gender,
        birthday,
        imageId: memberImage.id,
        addressId: memberAddressId,
        roleId,
        clubId,
      },
      { transaction }
    );
  

    return newMember; 
  }
  });

  return result;

}catch(error){
  throw new Error(`Member could not be created.`);
  }
};

export const deleteMemberService = async (_id: string) => {
  remove(Member, _id);

  return _id;
};

////////////////////////////////////UPDATE
export const updateMemberService = async (
  memberId: string,
  body: FullMemberBody
) => {
  const {
    first_name,
    last_name,
    date_of_entry,
    email,
    phone,
    gender,
    birthday,
    address,
    image,
    roleId
  } = body;

  try {

  const updatedMember = await sequalize.transaction(async (transaction) => {
    
     const memberToUpdate: any = await Member.findByPk(memberId);
     let memberAddressId: number = memberToUpdate.addressId;

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
        memberAddressId = existingAddress.id;

      } else {

        const newAddress: any = await Address.findOne({
          where: {
           id: memberAddressId
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

    let memberImageId: number = memberToUpdate.imageId || null; 
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
      memberImageId = existingImage.id

    }else{
        const newImage: any = await Image.findOne({
          where: {
            id: memberImageId
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

    if (memberToUpdate) {
      const updateParams: any = {
        imageId: memberImageId,
        addressId: memberAddressId,
        roleId,
      };

      if (first_name) updateParams.first_name = first_name;
      if (last_name) updateParams.last_name = last_name;
      if (date_of_entry) updateParams.date_of_entry = date_of_entry;
      if (email) updateParams.email = email;
      if (phone) updateParams.phone = phone;
      if (gender) updateParams.gender = gender;
      if (birthday) updateParams.birthday = birthday;

      await memberToUpdate.update(updateParams, { transaction });
    } else {
      throw new Error(`Member with id ${memberId} not found.`);
    }

    return memberToUpdate;
  });

  return updatedMember;
} catch(error: any) {
  console.error(error);
      throw new Error(`An error occurred while updating member with id ${memberId}: ${error.message}`);
    } 
  
};