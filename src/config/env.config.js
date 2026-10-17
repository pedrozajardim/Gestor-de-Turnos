import dotenv from "dotenv"

dotenv.config();

const envConfig = {
    port: process.env.PORT || 3000,
    apiName: process.env.API_NAME ,
    appEnv : process.env.NODEJ_ENV,
    mongoUri:process.env.MONGO_URI
}

export default envConfig