import { NextFunction, Request, Response } from 'express'
import {
  createMemberService,
  deleteMemberService,
  getAllMemberService,
  getMemberEventsService,
  getMemberService,
  searchAllMemberService as searchAllMembersService,
  updateMemberService,
} from '../services/membersServices'

export const getAllMembersController = async (
  rq: Request,
  re: Response,
) => {
  try {
    
    if(rq.query){
    const query = rq.query

    const results = await searchAllMembersService(query)

    return re.status(200).json(results)
  } else {
    const results = await getAllMemberService()

    return re.status(200).json(results)
  }
  } catch (error) {
    re.status(500)
  }
};


export const getMemberController = async (
  rq: Request,
  re: Response,
) => {
  try {
    const result = await getMemberService(rq.params.id)

    return re.status(201).json(result)
  } catch (error) {
    re.status(500)
  }
};

export const getMemberEventsController = async (
  rq: Request,
  re: Response,
) => {
  try {
    const result = await getMemberEventsService(rq.params.id)

    return re.status(201).json(result)
  } catch (error) {
    re.status(500)
  }
};


export const createMemberController = async (
  rq: Request,
  re: Response,
) => {
  
  try {
    const member = await createMemberService(rq.body)

    return re.status(201).json({ msg: 'Member was created', member })
  } catch (error) {
    console.error(error)
    return re.status(500).json({ msg: 'Internal Server Error' })
  }
};


export const deleteMemberController = async (
  rq: Request,
  re: Response,
) => {
  try {
    const _id = await deleteMemberService(rq.params.id)

    return re.status(201).json({ msg: 'Member was deleted', _id })
  } catch (error) {
    re.status(500)
  }
}


export const updateMemberController = async (
  rq: Request,
  re: Response,
) => {
  try {
    const _id = await updateMemberService(rq.params.id, rq.body)

    return re.status(201).json({ msg: 'Member was updated', _id })
  } catch (error) {
    re.status(500)
  }
}