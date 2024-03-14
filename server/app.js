import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { connectToDB } from './src/db/index.js';
import initAdminJS from './src/adminjs/index.js';
import { handleError } from './src/lib/errors.js';
import routes from './src/routes/index.js';

dotenv.config({});
const app = express();

app.use(cors());

connectToDB();

const admin = await initAdminJS(app);

admin.watch();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);

app.get('/health-check', (req, res) => res.status(200).send('Working'));

app.use(handleError);

app.use('*', (req, res) => res.status(404).send('Invalid route'));

export default app;
