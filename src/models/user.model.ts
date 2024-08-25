import { DocumentType, getModelForClass, modelOptions, pre, prop, Severity } from "@typegoose/typegoose";
import  argon  from "argon2";
import log from "../utils/logger";
import {v4 as uuidv4} from "uuid"



@pre<User>("save",async function(){
    if(!this.isModified("password")){
        return
    }

    const hash = await argon.hash(this.password);
    this.password = hash;
    return
})

@modelOptions({
    schemaOptions:{
        timestamps:true
    },
    options:{
        allowMixed:Severity.ALLOW
    }
})


export class User{
    @prop({lowercase:true,unique:true, required:true})
    username:string;

    @prop({required:true})
    firstName:string;

    @prop({required:true})
    lastName:string;

    @prop({required:true})
    password:string;

    @prop({required:true,unique:true})
    email:string;

    @prop({required:true,default:()=>uuidv4()})
    verificationCode:string;

    @prop()
    passwordResetCode:string;

    @prop({default:false})
    verified:boolean
    
    async validatePassword(this:DocumentType<User>,canidatePassword:string){
        try {
            return await argon.verify(this.password,canidatePassword)
        } catch (error) {
            log.error(error,"Error using validate the password")
        }
    }
}

const UserModel = getModelForClass(User)

export default UserModel;