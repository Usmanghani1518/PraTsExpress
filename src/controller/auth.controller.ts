import e, { Request,Response } from "express";
import { CreateSessionInput } from "../schema/auth.schema";
import { findUserByEmail } from "../service/user.service";
import { signAccessToken, signInRefreshToken } from "../service/auth.service";


export async function   createSessionHandler(req:Request<{},{},CreateSessionInput>,res:Response) {
    
    const { email,password } = req.body

    try {
        const user = await findUserByEmail(email)
        if (!user) {
            return res.status(401).send("Invalid email or password")
        }
        if(!user.verified){
            return res.status(403).send("Plz verify the user ");
        }
        const isValid = await user.validatePassword(password);
        if (!isValid) {
            return res.status(403).send("password is not valid ");
        }
    
        const accessToken = signAccessToken(user);
    
        const refreshToken = await signInRefreshToken({userId:user._id.toString()});
    
        return res.status(200).send({
            accessToken,
            refreshToken
        })
    } catch (error) {
        throw new Error("There is unexpected error while creating accessToken and refreshToken")
    }


}