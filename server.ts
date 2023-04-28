import { NextFunction, Request, Response } from 'express'
import { Server } from 'http'
import app from './app'
import { validationResult } from 'express-validator'

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json('Not Found.')
})

app.use(
  async (
    err: { message: Promise<string>; status: number | PromiseLike<number> },
    req: Request,
    res: Response,
  ) => {
    res.locals.message = await err.message 

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.status((await err.status) || 500).json('Something went wrong.')
  }
)

let port: string | number = '3000'

const server: Server = app.listen(process.env.PORT || port, async () => {
  console.log(`\n  ------ Server started :${port} ------`)
})

export default server
