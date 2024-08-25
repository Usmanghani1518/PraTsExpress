import { Response,Request } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
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