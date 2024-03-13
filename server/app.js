import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { connectToDB } from './src/db/index.js';
import initAdminJS from './src/adminjs/index.js';

dotenv.config({});
const app = express();

app.use(cors());

connectToDB();

initAdminJS(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (req, res) => res.status(200).send('Working'));

app.use('*', (req, res) => res.status(404).send('Invalid route'));

export default app;
