import mongoose from "mongoose"
import { env_config } from "./environment";
 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env_config.mongoUrl,
            {
                dbName: env_config.dbName,
            }
        );
        console.log(`MongoDB connected: ${conn.connection.host}`)
        console.log(`Port Connected: ${env_config.port}`)
    } catch (error) {
        console.error("Error connecting database",error)
    }
}
 
export default connectDB;