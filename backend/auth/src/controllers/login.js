import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUser } from '../Database/DBoperations.js'

export async function login(req,res){    
    const secret = process.env.jwt_secret;
    const jwt_expiry_time = process.env.jwt_expiry_time;
    if(!secret){
        return res.status(500).json({success:false,message:"JWT secret not configured"});
    }
    try{
        const {userName,password} = req.body;
        const user = await getUser(userName);
        if(user && await bcrypt.compare(password,user.password)){
         const token = jwt.sign({ userName }, secret, { expiresIn: jwt_expiry_time });
        return res.status(200).json({ success: true, token, message: "Token generated for login" });
        }
        else{
            return res.status(400).json({success:false,message:"Invalid Credentials"})
        }
    }
    catch(err){
        console.error('Error in login route:', err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}