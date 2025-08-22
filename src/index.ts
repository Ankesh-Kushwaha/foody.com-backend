import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose'
import myUserRoute from './routes/myUserRoute.js'
import { v2 as cloudinary } from 'cloudinary'
import myRestaurantRoute from './routes/myRestaurantRoute.js'

mongoose.connect(process.env.DATABASE_URL as string).then(() => {
  console.log("connected to database");
})

//cloudinary connection
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req: Request, res: Response) => {
  res.json({ message: "server is running" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);



app.listen(3000, () => {
  console.log("server is running on the localhost:3000");
})