import { sendEmail } from "./mail.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailtemplate.js";

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