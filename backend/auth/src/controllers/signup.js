import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUser,createUser } from '../Database/DBoperations.js'

export const signup = async(req,res)=>{
    const secret = process.env.jwt_secret;
    const salt_rounds = process.env.salt_rounds;
    try {
        const { userName, password } = req.body;
        const user = await getUser(userName);

        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, salt_rounds);
        await createUser(userName, hash);

        const token = jwt.sign({ userName }, secret, { expiresIn: 300 });
        return res.status(200).json({ success: true, token, message: "User created and token generated" });
    } catch (err) {
        console.error('Error in signup route:', err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}