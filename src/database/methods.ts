//Defining Sequalize Methods for the Services to use.
//The idea is to abstract the Methods in such a way that they can be implemented for any model.

import { sequalize } from "./db";
import { MemberEvent } from "./models/bridge_models/members_event";
import Member from "./models/members";
import Event from "./models/events";
import Address from "./models/addresses";
import Image from "./models/images";
import { User } from "./models/users";

export const findAll = async (
  model: any,
  query: object,
  join?: any,
  alias?: string
) => {
  try {
    const options: any = {
      where: query,
    };

    const results = await model.findAll(options);

    return results;
  } catch (error) {
    console.error("Error finding the models", error);
  }
};

export const findAndJoin3 = async (
  model: any,
  id: string,
  join: any,
  alias: string,
  join2: any,
  alias2: string,
  join3: any,
  alias3: string,

) => {
  try {
    const result = await model.findByPk(id, {
      include: [
        { model: join, as: alias },
        { model: join2, as: alias2},
        { model: join3, as: alias3 },
      ],
    });
    
    return result;
  } catch (error) {
    console.error("Error finding the models", error);
  }
};


export const findAndJoin= async (
  model: any,
  id: string,
  join: any,
  alias?: string
) => {
  try {
    const result = await model.findByPk(id, {
      include: [
        {
          model: join,
          as: alias,
          through: { attributes: [] },
        },
      ],
    });

    return result;
  } catch (error) {
    console.error("Error finding the models", error);
  }
};

export const find = async (model: any, id: string) => {
  try {
    const results = await model.findOne({
      where: {
        id,
      },
    });

    return results;
  } catch (error) {
    console.error("Error finding the model", error);
  }
};

export const create = async (model: any, data: object) => {
  try {
    const result = await model.create(data);

    return result;
  } catch (error) {
    console.error("Error creating the entity", error);
  }
};

export const remove2 = async (model: any, id: string) => {
  try {
    await model.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting the entity", error);
  }
};

export const remove = async (model: any, id: string) => {
  try {
    
    const targetedModel = await model.findOne({where:{ id}});
    const addressId = targetedModel.addressId
    console.log(addressId)
    const imageId = targetedModel.imageId
    console.log(imageId)
    const userEmail = targetedModel.email
    await model.destroy({where:{ id }})
    if(addressId){
    const entryWithSameAddress = await model.findOne({
      where: {
        addressId,
      },
    });
    if (!entryWithSameAddress){
      await Address.destroy({where:{id: addressId}})
    }
}
if(imageId){
    const entryWithSameImage = await model.findOne({
      where: {
        imageId,
      },
    });
    if (!entryWithSameImage){
      await Image.destroy({where:{id: imageId}})
    }
  }
    
    if(userEmail) {
      User.destroy({where:{username: userEmail}})
    }


  } catch (error) {
    console.error("Error deleting the entity", error);
  }
};


export const update = async (model: any, id: string, data: any) => {
  try {
    const results = await model.update(data, {
      where: {
        id,
      },
    });

    return results;
  } catch (error) {
    console.error("Error updating the entity", error);
  }
};


export const addMemberToEvent = async (eventId: string, memberId: string) => {
  try {
    console.log(eventId)
    console.log(memberId)
    const event = await Event.findByPk(eventId);
    const member = await Member.findByPk(memberId);

    console.log(event)
    console.log(member)

    if (!event || !member) {  
      throw new Error("Event or member not found");
    }

    await MemberEvent.create({ memberId, eventId });

    return { message: "Member added to event" };
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

sequalize.sync();