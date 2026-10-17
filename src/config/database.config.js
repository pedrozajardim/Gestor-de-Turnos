import mongoose from "mongoose";
import envConfig from "./env.config.js";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
    if(!envConfig.mongoUri){
        throw new Error("Falta configurar MONGO_URI en las variables de entorno")
    }
    
    try{
        await mongoose.connect(envConfig.mongoUri)
        console.log("Conectado a mongodb")
    }catch (error){
        console.error("error al conectar mongodb" ,error.message)
        process.exit(1)
    }

}