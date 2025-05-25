import { updateRow } from "../database/dbOperations.js";
import jwt from 'jsonwebtoken';
import { authError } from "../errorHandling/authError.js";
export async function editProfile(req,res){
    try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        throw new authError("Token not found");
    }
    const username = jwt.verify(token,process.env.JWT_SECRET).userName;
    const {age,gender,instruments,country,city} = req.body;
    await updateRow(age,gender,instruments,country,city,username);
    return res.status(200).json({success:true,message:"Profile Updated"});
}
catch(error){
    if(error.name == 'TokenExpiredError'){
        return res.status(400).json({success:true,message:"Your session has expired, please login again"})
    }
    if(error.name == 'authError'){
        return res.status(400).json({success:true,message:error.message});
    }
    console.log(error);
    return res.status(500).json({success:false,message:"Error while updating profile"});
}
}