import { findAll, find, remove, update, create } from '../database/methods'
import { ClubBody } from '../types/interfaces'
import { Club } from '../database/models/clubs'
import { Image } from '../database/models/images'
import { sequalize } from '../database/db'


export const searchAllClubsService = async (query: object) => {
  const clubs = findAll(Club, query)

  return clubs
}

export const getAllClubsService = async () => {
  const clubs = findAll(Club, {})

  return clubs
}

export const getClubService = async (_id: string) => {
  const club = find(Club, _id)

  return club

}
/*
export const createClubService = async (body: ClubBody) => {
  const newClub = create(Club, body)
  
  return newClub
}
*/

export const createClubService = async (body: ClubBody) => {
  const {
    id,
    name,
    description,
    image 
  } = body
  try {
    const result = await sequalize.transaction(async (transaction) => {
    let clubImageId: string | null = null
  if(image){
  const newImage: any = await Image.create(
    
    {
      attributes: [ 'name', 'description', 'type', 'url'],
      name: image.name,
      description: image.description,
      type: image.type,
      url: image.url,
    },
    { transaction }
  );
    clubImageId = newImage.id
  }
  
  const newClub: any = Club.create(   
    {id,
    name,
    description,
    imageId: clubImageId}
    );
    return newClub
});

} catch(error: any){
  throw new Error(`An error occurred while creating the club: ${error.message}`);
  }
}

export const deleteClubService = async (_id: string) => {
  remove(Club, _id)

  return _id
};
/*
export const updateClubService = async ( _id: string, body: ClubBody) => {
  const club = update(Club, _id, body)

  return club
};
*/

////////////////////////////////////////////////////////UPDATE

export const updateClubService = async ( clubId: string, body: ClubBody ) => {
  const {
    name,
    description,
    image 
  } = body
  try {    
    const result = await sequalize.transaction(async (transaction) => {
    
      const clubToUpdate: any = await Club.findByPk(clubId)
      let clubImageId: string = clubToUpdate.imageId

  if(image){  
    
    const previousImage: any = await Image.findByPk(clubImageId)

    await previousImage.update(
    
    {
      attributes: [ 'name', 'description', 'type', 'url'],
      
      name: image.name,
      description: image.description,
      type: image.type,
      url: image.url,
    },
    { transaction }
  );
  };
  
  if (clubToUpdate){
    const updateParams: any = {
      imageId: clubImageId
      
    };

    if (name) updateParams.name = name;
    if (description) updateParams.description = description;

    await clubToUpdate.update(updateParams, { transaction });

  }
});
  return result

} catch(error: any){
  throw new Error(`An error occurred while creating the club: ${error.message}`);
  }
  
}

