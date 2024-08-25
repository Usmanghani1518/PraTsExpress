import {object,string,TypeOf} from "zod"


export const createUserSchema = object({
    body:object({
        firstName:string({
            required_error:"First Name is required"
        }),
        lastName:string({
            required_error:"Last Name is required"
        }),
        password:string({
            required_error:"Password is required"
        }).min(6,"To Short must at least 6 chars"),
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


export type CreateUserInput = TypeOf<typeof createUserSchema>['body']