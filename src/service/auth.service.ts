import { DocumentType } from "@typegoose/typegoose";
import { User } from "../models/user.model";
import { signJwt } from "../utils/jwt";
import sessionModel from "../models/sessionn.model";


export async function signAccessToken(user:DocumentType<User>){

    const payload  = user.toJSON()
    const accessToken =  await signJwt(payload,"accessTokenPrivateKey")

    return accessToken;
}

export async function signInRefreshToken({userId}:{userId:string}){
    const session = await createSession({userId});
    const refreshToken = signJwt({session:session._id},"refreshTokenPrivateKey")
    return refreshToken;
}

export async function createSession({userId}:{userId:string}){
    return sessionModel.create({user:userId})
}