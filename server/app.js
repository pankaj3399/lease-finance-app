import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import xss from 'xss-clean';

import { connectToDB } from './src/db/index.js';
import initAdminJS from './src/adminjs/index.js';
import { handleError } from './src/lib/errors.js';
import routes from './src/routes/index.js';

dotenv.config({});
const app = express();

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'data:'],
    },
  })
);

app.use(cookieParser());
app.use(cors());

connectToDB();

const admin = await initAdminJS(app);

if (process.env.NODE_ENV === 'production') {
  admin.initialize();
} else {
  admin.watch();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use('/api/v1/', routes);

app.get('/health-check', (req, res) => res.status(200).send('Working'));

app.use(handleError);

app.use('*', (req, res) => res.status(404).send('Invalid route'));

export default app;
