import { updateProfile } from "../database/dbOperations.js";
import jwt from 'jsonwebtoken';
export async function editProfile(req,res){
    try{
    //const decodedToken = jwt.verify(req.body.token,process.env.jwt_secret);
    const {age,gender,instruments,country,city,username} = req.body;
    await updateProfile(age,gender,instruments,country,city,username);
    return res.status(200).json({success:true,message:"Profile Updated"});
}
catch(error){
    console.log(error);
    res.status(500).json({success:false,message:"Error while updating profile"});
}
}