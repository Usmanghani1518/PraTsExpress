import dotenv from "dotenv";
import express from "express"
import config from "config"
import ConnectDb from "./utils/connect.db";
import log from "./utils/logger";
import router from "./routes/index"


const app = express()
const port = config.get("port")

app.use(router)

dotenv.config({
path:"./.env"
})

app.listen(port,()=>{
    log.info(`app is listening on http://localhost:${port}`)
    ConnectDb()
})

