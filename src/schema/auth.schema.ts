import {object , string, TypeOf } from "zod"


export const CreateSessionSchema = object({
    body:object({
        email:string({required_error:"Email is required"}).email({message:"email is invalid"}),
        password:string({
            required_error:"password is required"
        }).min(6,"Password at least 6 chars")
    })
})

export  type CreateSessionInput = TypeOf<typeof CreateSessionSchema>["body"]