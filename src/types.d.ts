import { MailOptions } from "nodemailer/lib/json-transport"

interface ISMTP {
        user: string,
        pass: string,
        host: string,
        port: number,
        secure: boolean
}


interface ISIGNIN{
        accessTokenPrivateKey:string,
        refreshTokenPrivateKey:string,
}

interface ISENDMAIL{
        payload:MailOptions;
        templateName:String;
        context:Record<string,any>;
}