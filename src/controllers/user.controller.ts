import type { Response,Request } from "express";
import User from "../models/user.js";

export const createCurrentUser = async(req:Request, res:Response) => {
  //1.check if the user exists
  //2.create the user if it does not exist
  //3.return the user object to the calling client
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).json({success:true,message:"user already exist"});
    }

    const newUser = new User(req.body);
    await newUser.save()
    res.status(201).json(newUser.toObject());
  }
  catch (err) {
    console.log("error while creating image:", err);
    res.status(500).json({
      success: false,
      message:"something went wrong"
    })
  }
}


export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { name:userName, mobileNo, addressLine1, city, country } = req.body;
    if (!userName || !mobileNo || !addressLine1 || !city || !country) {
      return res.status(401).json({
        success: false,
         message:"all fields required",
       })
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "user does not exist" });
    
    //update the user here 
    user.userName = userName;
    user.mobileNo = mobileNo;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;
    await user.save();

    res.status(200).json({
      success: true,
      message: "profile updated",
      user
    });
  }
  catch (err) {
    throw new Error("Error in updateUser controller: " + (err instanceof Error ? err.message : String(err)));
    res.status(500).json({
      success: false,
      message:"something went wrong"
    })
  }
}

export const getCurrentUserProfile =async (req:Request,res:Response) => {
  const userId = req.userId; //get current user
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "user does not exist" });
      return res.status(200).json({
        _id: user._id,
        email: user.email,
        name: user.userName,
        addressLine1: user.addressLine1,
        city: user.city,
        country: user.country,
        mobileNo: user.mobileNo
      });
  }
  catch (err) {
    throw new Error("Error in updateUser controller: " + (err instanceof Error ? err.message : String(err)));
    res.status(500).json({
      success: false,
      message:"something went wrong"
    })
  }
}
