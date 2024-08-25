import { Response,Request } from "express";
import { CreateUserInput, VerifyUserInput } from "../schema/user.schema";
import { createUser, findUserById } from "../service/user.service";
import sendEmail from "../utils/mailer";



export async function createUserHandler(req:Request<{},{},CreateUserInput>,res:Response) {

    const body = req.body;

    try {
        const user = await createUser(body);

        await sendEmail({
            from:"usman@alghani.com",
            to:user.email,
            subject:'Your verification code is ',
            text:`verification code is ${user.verificationCode} Id:${user._id}`

        })

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

export  function forgotPassowrdHandler(req:Request,res:Response) {
    
}