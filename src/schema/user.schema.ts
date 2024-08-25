import { PassThrough } from "nodemailer/lib/xoauth2";
import {object,string,TypeOf} from "zod"


export const CreateUserSchema = object({
    body:object({
        firstName:string({
            required_error:"First Name is required"
        }),
        lastName:string({
            required_error:"Last Name is required"
        }),
        username:string({
        required_error:"username is required"
        }).trim().min(4,"username is to short"),
        password:string({
            required_error:"Password is required"
        }).min(6,"Passwor to Short must at least 6 chars"),
        passwordConfirmation:string({
            required_error:"Password Confirmation is required"
        }),
        email:string({
            required_error:"Email is required"
        }).email("Email is not valid")

    }).refine((data)=>data.password === data.passwordConfirmation,{
        message:'Password do not Match',
        path:["passwordConfirmation"]
    })
});

export const VerifyUserSchema = object({
    params:object({
        id:string(),
        verificationCode :string()
    })
})

export const ForgotPasswordSchema = object({
    body:object({
        email:string({
            required_error:"eamil is required"
        }).email('Not valid email adress ')
    })
})

export const ResetPasswordSchema = object({
    params:object({
        id:string(),
        passwordResetCode:string()
    }),
    body:object({
        password:string({
            required_error:"Password is required"
        }).trim().min(6,"Password at least 6 chars"),
        passwordConfirmation:string({
            required_error:"Password is required"
        }).trim()
    }).refine((data)=>data.password === data.passwordConfirmation,{
        message:"Password do not Match",
        path:["passwordConfirmation"]
    })
})


export type CreateUserInput = TypeOf<typeof CreateUserSchema>['body']
export type VerifyUserInput = TypeOf<typeof VerifyUserSchema>["params"]
export type ForgotPasswordInput = TypeOf <typeof ForgotPasswordSchema>["body"]
export type ResetPasswordInput = TypeOf <typeof ResetPasswordSchema>
