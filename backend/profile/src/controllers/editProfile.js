import { updateRow } from "../database/dbOperations.js";
import jwt from 'jsonwebtoken';

export async function editProfile(req,res){
    try{
    const decodedToken = jwt.verify(req.body.token,process.env.jwt_secret);
    const username = decodedToken.userName;
    const {age,gender,instruments,country,city} = req.body;
    await updateRow(age,gender,instruments,country,city,username);
    return res.status(200).json({success:true,message:"Profile Updated"});
}
catch(error){
    if(error.name == 'TokenExpiredError'){
        return res.status(400).json({success:true,message:"Your session has expired, please login again"})
    }
    console.log(error);
    return res.status(500).json({success:false,message:"Error while updating profile"});
}
}