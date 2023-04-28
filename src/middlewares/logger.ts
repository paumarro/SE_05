import { NextFunction, Request, Response } from 'express'

export const logger = (rq: Request, re: Response, nf: NextFunction) => {
  console.log(`${rq.method} ${rq.url}`)
  nf()
}