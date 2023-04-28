import { NextFunction, Request, Response } from 'express'
import {
    createClubService,
    deleteClubService,
    getAllClubsService,
    getClubService,
    searchAllClubsService,
    updateClubService,
    
} from '../services/clubsServices'

export const searchAllClubsController = async (
    rq: Request,
    re: Response,
  ) => {
    try {
    
      const query = rq.query
  
      const results = await searchAllClubsService(query)
  
      return re.status(200).json(results)
    } catch (error) {
      re.status(500)
    }
  }

export const getAllClubsController = async (
    rq: Request,
    re: Response,
) => {
    try {
        const results = await getAllClubsService()

        console.log(`${rq.method} ${rq.url}`)

        return re.status(200).json(results)
    } catch (error) {
        re.status(500)
    }
}

export const getClubController = async (
    rq: Request,
    re: Response,
    ) => {
    try{
        const result = await getClubService(rq.params.id)

        return re.status(201).json(result)
    } catch (error) {
        re.status(500)
    }
}

export const createClubController = async (
    rq: Request,
    re: Response,
) => {
    try {
        const _id = await createClubService(rq.body)

        return re.status(201).json({ msg: 'Club was created', _id })
    } catch (error) {
        re.status(500)
    }
}

export const deleteClubController = async (
    rq: Request,
    re: Response,
) => {
    try {
        const _id = deleteClubService(rq.params.id)

        return re.status(201).json({ msg: 'Club was deleted', _id })
    } catch (error) {
        re.status(500)
    }
}

export const updateClubController = async (
    rq: Request,
    re: Response,
) => {
    try {
        const _id = updateClubService(rq.params.id, rq.body)

        return re.status(201).json({ msg: 'Club was updated', _id })
    } catch (error) {
        re.status(500)
    }
}

