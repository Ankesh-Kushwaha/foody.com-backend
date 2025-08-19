import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose'
import myUserRoute from './routes/myUserRoute.js'

mongoose.connect(process.env.DATABASE_URL as string).then(() => {
  console.log("connected to database");
})

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req: Request, res: Response) => {
  res.json({ message: "server is running" });
});

app.use("/api/my/user", myUserRoute);



app.listen(3000, () => {
  console.log("server is running on the localhost:3000");
})