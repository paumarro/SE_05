import express, { Express, NextFunction, json, Response, Request, urlencoded } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'



import { establishDBConnection } from './src/database/db'
import eventsRoute from './src/routes/eventsRoute'
import membersRoute from './src/routes/membersRoute'
import clubsRoute from './src/routes/clubsRoute'
import { limiter } from './src/middlewares/rateLimiter'
import { sanitizeHeadersQuerysAndParams, sanitizeBodys } from './src/middlewares/sanitisation'
import { userRoute } from './src/routes/userRoute'


const session = require("express-session")

const app: Express = express()


establishDBConnection()

app.use(sanitizeHeadersQuerysAndParams);
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(morgan('dev'));
app.use(json());
app.use(sanitizeBodys);
app.use(
  urlencoded({
    extended: true,
  })
);



declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
};

app.use(session({
  secret:'wsryextrucytivuyobiupnoi',
  resave:false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // secure true only works over HTTPS
}));

app.use('/events', eventsRoute)
app.use('/members', membersRoute)
app.use('/clubs', clubsRoute)
app.use('/users', userRoute)

export default app 