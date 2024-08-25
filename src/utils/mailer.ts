import nodemailer, { SendMailOptions } from "nodemailer"
import log from "./logger";
import config from 'config'


// async function CreateTestCreds (){
//     const creds = await nodemailer.createTestAccount();
//     log.info(creds)
// }

// CreateTestCreds()


const smtp = config.get<ISMTP>("smtp")

const transport = nodemailer.createTransport({
    ...smtp,
    auth:{
        user:smtp.user,
        pass:smtp.pass
    }
})
async function  sendEmail(payload:SendMailOptions) {
    transport.sendMail(payload,(err,info)=>{
        if (err) {
            log.error("error sending  eamil ",err)
            return
        }
        
        log.info("Preview email is " + nodemailer.getTestMessageUrl(info))
    })
}
export default sendEmail