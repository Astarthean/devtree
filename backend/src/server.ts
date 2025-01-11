// const express = require('express'); //CJS CommonJS
import express from 'express'; //ES6
import 'dotenv/config';
import router from './router';
import { connectDB } from './config/db';

const app = express();
app.use(express.json()); // Middleware para que express pueda entender JSON

connectDB()

app.use('/', router)

export default app; // Exportamos la app para poder importarla en otros archivos