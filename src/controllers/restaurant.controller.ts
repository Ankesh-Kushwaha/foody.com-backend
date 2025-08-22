import { error } from "console"
import { Request,Response } from "express"
import Restaurant from "../models/restaurant.js";
import cloudinary from 'cloudinary'
import mongoose from "mongoose";

export const createMyRestaurant = async (req: Request,res:Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({user:req.userId});

    if (existingRestaurant) {
      return res.status(409).json({ success: false, message: "user restaurant already exist" })
    }

    //this req.file is added by multer which make us access the image in req;
    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(201).send(restaurant);
  }
  catch (err) {
    console.log("error in createMyRestaurant:", err);
    res.status(500).json({
      success: false,
      message:"Something went wrong"
    })
  }
}


