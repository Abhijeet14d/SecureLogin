import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndsetCookie } from "../utils/generateTokenAndsetCookie.js";

export const signup = async (req,res) =>{
    const { email, password, name } = req.body;
    
    try{
        // all fields filled
        if(!email || !password || !name){
            throw new Error("All fields required");
        }

        // if user exists
        const userExists = await User.findOne({ email });
        if(userExists){
            throw new Error("user already exists");
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a verification code
        const verificationToken = Math.floor(100000 + Math.random()*900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24*60*60*1000
        })

        await user.save();

        // jwt auth
        generateTokenAndsetCookie(res, user._id);
        
        res.status(201).json({
            success: true,
            message: "user created",
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    }catch(err){
        console.log("Error ", err.message);
        
        res.status(400).json({ success: false, message: err.message});
        
    }
};
export const login = async (req,res) =>{
    res.send("login");
};
export const logout = async (req,res) =>{
    res.send("logout");
};