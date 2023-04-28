import { header, query, body, param } from 'express-validator'
import { Request, Response, NextFunction } from 'express';


export const sanitizeHeadersQuerysAndParams = (req: Request, res: Response, nf: NextFunction) => {
  Object.keys(req.headers).forEach((key) => {
    header(key).trim()
    header(key).escape()
  })

  Object.keys(req.query).forEach((key) => {
    query(key).trim()
    query(key).escape()
  })

  Object.keys(req.params).forEach((key) => {
    param(key).trim()
    param(key).escape()
  })

  nf()
}

export const sanitizeBodys = (req: Request, res: Response, nf: NextFunction) => {
  Object.keys(req.body).forEach((key) => {
    body(key).trim()
    body(key).escape()
  })

  nf()
}