import { sendEmail } from "./mail.js";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailtemplate.js";

export const sendverificationEmail = async (email, verificationToken) => {
    
    try{
        const response =await sendEmail(
            email,
            "Email verification",
            `Your verification code is ${verificationToken}`,
            VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        )
        console.log("verification email sent ", response);
        
    }catch(err){
        console.log("Error sending email ", err.message);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    try{
        const response = await sendEmail(
            email,
            "Welcome to our app",
            `Hello, ${name}. Welcome to our app!`,
            WELCOME_EMAIL_TEMPLATE.replace("{name}", name)
        )
        console.log("Welcome email sent ", response);
        
    }catch(err){
        console.log("Error sending email ", err.message);
    }
};