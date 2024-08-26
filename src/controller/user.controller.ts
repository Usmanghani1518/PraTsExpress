import { Response,Request } from "express";
import { CreateUserInput, ForgotPasswordInput, ResetPasswordInput, VerifyUserInput } from "../schema/user.schema";
import { createUser, findUserById,findUserByEmail } from "../service/user.service";
import sendEmail from "../../mailer";
import log from "../utils/logger";
import {v4 as uuid} from "uuid"
import { MailOptions } from "nodemailer/lib/json-transport";


export async function createUserHandler(req:Request<{},{},CreateUserInput>,res:Response) {

    const body = req.body;

    try {
        
        const user = await createUser(body);

        // {
            // from:"usman@alghani.com",
            // to:user.email,
            // subject:'Your verification code is ',
            // text:`verification code is ${user.verificationCode} Id:${user._id}`,
    
        // }
        const mail:MailOptions={
             to:user.email,
             subject:"Verify your email in Al-Ghani"
        }
        const context= {
            name:user.firstName +" "+user.lastName,
            id:user._id.toString(),
            Code:user.verificationCode
        }


        await sendEmail(mail,context,"Mail")

        return res.status(201).send("User Created Successfully")
    } catch (e:any) {
        if (e.code === 11000) {
            return res.status(409).send("User already Exist")
        }
        return res.status(500).send(e)
    }
    
}

export async function VerifyUserHandler(req:Request<VerifyUserInput>,res:Response) {
    try {
        const id = req.params.id;
        const verificationCode = req.params.verificationCode;
    
        const user = await findUserById(id);
    
        if (!user) {
            return res.status(404).send("There is no user exist")
        }
        if (user.verified) {
            return res.status(409).send("User already verified")
        }
        if (user.verificationCode !== verificationCode) {
            return res.status(401).send("Invalid verification code ")
        }
        if(user.verificationCode === verificationCode)
            user.verified = true;
            await user.save()
            return res.status(200).send("User Verified Successfully")
    } catch (error) {
        return res.status(500).send("There is an error user could not verified")
    }

}

export  async function forgotPassowrdHandler(req:Request<{},{},ForgotPasswordInput>,res:Response) {
    
    const {email} = req.body;
   try {
     const user = await findUserByEmail(email);
     if (!user) {
         return res.status(404).send("There is no user regarding this eamil")
     }
     if (!user.verified) {
         log.debug(`this eamil ${email} is not verified`)
         return res.status(403).send("User is not verified first verify the user")
     }
     const passwordResetCode = uuid();
     user.passwordResetCode = passwordResetCode;
     
     const mail:MailOptions={
         to:user.email,
         subject:"Verify your email in Al-Ghani"
        }
        const context= {
            name:user.firstName +" "+user.lastName,
            id:user._id.toString(),
            Code:user.passwordResetCode
        }
        
        await sendEmail(mail,context,'Mail')
        
        await user.save();
     return res.status(200).send(`Email is send on you eamil successfully `)

   } catch (error) {
    throw new  Error("Unexpected error while sending forgot email is  " +error)
   }

}

export async function resetPasswordHandler  (req:Request<ResetPasswordInput["params"],{},ResetPasswordInput["body"]>,res:Response){

    const {id,passwordResetCode} = req.params;
    const {password} = req.body
    try {
        const user = await findUserById(id)
    
        if (!user || !user.passwordResetCode || user.passwordResetCode!== passwordResetCode) {
            return res.status(401).send(" Could not reset your password ")
        }
    
        user.passwordResetCode = null;
        user.password = password;
    
        await user.save();
        return res.status(200).send("Updated password successfully")
    } catch (error) {
        throw new Error("Ther is some unexpected error happen in ResetPassword ")
    }

}

