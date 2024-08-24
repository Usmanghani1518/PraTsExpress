import mongoose from "mongoose";
import config from "config"
import log from "./logger";

const dbUri = config.get<string>("dbUri")

async function ConnectDb () {
    try {
        await mongoose.connect(dbUri)
        log.info("Connected to the DB")
    } catch (error) {
        process.exit(1)
    }
}


export default ConnectDb;