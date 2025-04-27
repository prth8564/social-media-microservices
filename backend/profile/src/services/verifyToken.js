import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    const secret = process.env.jwt_secret;

    if (!token) {
        return res.status(401).json({ success: false, message: "Access token is missing" });
    }

    try {
        const decoded = jwt.verify(token, secret); 
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}