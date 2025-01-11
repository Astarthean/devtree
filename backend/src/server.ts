import express from 'express'; //ES6
import cors from 'cors';
import 'dotenv/config';
import router from './router';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

connectDB()
const app = express();

// Cors
app.use(cors(corsConfig));

app.use(express.json()); // Middleware para que express pueda entender JSON

app.use('/', router)

export default app; // Exportamos la app para poder importarla en otros archivos