import jwt from "jsonwebtoken"
import config from "config"
import { throttle } from "lodash";

export async function signJwt(object:Object,keyName:'accessTokenPrivateKey' | 'refreshTokenPrivateKey' ,options?:jwt.SignOptions | undefined) {
    

    try {
        const signingKey = Buffer.from(config.get<string>(keyName),"base64").toString("ascii");
    
        return  jwt.sign(object,signingKey,{
            ...(options && options),
            algorithm:"RS512"
        })
    } catch (error) {
        throw new Error("unexpected behaviour in the while sign In the token")
    }
}

export  function verifyJwt<T>(token:string,keyName:"accessTokenPrivateKey"|"refreshTokenPrivateKey"):T | null {
    const publicKey = Buffer.from(config.get<string>(keyName),"base64").toString("ascii");
    try {
        const decode = jwt.verify(token,publicKey) as T
        return decode;
    } catch (error) {
        return null
    }
}
