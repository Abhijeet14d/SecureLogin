import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndsetCookie } from "../utils/generateTokenAndsetCookie.js";
import { sendverificationEmail, sendWelcomeEmail, sendResetPasswordEmail } from "../mail/email.js";

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
            verificationTokenExpiresAt: Date.now() + 10*24*60*60*1000
        });

        await user.save();

        // jwt auth
        generateTokenAndsetCookie(res, user._id);

        // email verification
        sendverificationEmail(user.email, user.verificationToken);
        
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

export const verifyEmail = async (req,res) =>{
    const {code} = req.body;
    try{
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });
        if(!user){
            return res.status(400).json({success:false, message: "Invalid or expired verification code"});
        }
        
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({success:true, message: "Email verified"});
    }catch(error){
        console.log("Error ", error.message);
        res.status(400).json({success:false, message: error.message});
    }
};
export const login = async (req,res) =>{
    const { email, password } = req.body;
    try{
        const user = await User.findOne({
            email
        });
        if(!user){
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error("Invalid email or password");
        }
        generateTokenAndsetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success:true,
            message: "Logged in",
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    }catch(err){
        console.log("Error ", err.message);
        res.status(400).json({success:false, message: err.message});
    }
};
export const logout = async (req,res) =>{
    res.clearCookie("token");
    res.status(200).json({success:true, message: "logged out"});
};

export const forgotPassword = async (req,res) =>{
    const { email } = req.body;
    try{
        const user = await User.findOne({
            email
        });
        if(!user){
            throw new Error("User not found");
        }
        // create a reset password token
        const resetPasswordToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1*60*60*1000; // 1 hours
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
        await user.save();
        await sendResetPasswordEmail(user.email,`${process.env.CLIENT_URL}/resetpassword/${resetPasswordToken}`);
    }catch(err){
        console.log("Error ", err.message);
        res.status(400).json({success:false, message: err.message});
    } 
};