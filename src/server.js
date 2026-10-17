import app from "./app.js"
import envConfig from "./config/env.config.js"
import { connectDB } from "./config/database.config.js";

connectDB()


app.listen(envConfig.port, () => {
    console.log(`Servidor Corriendo en puerto ${envConfig.port}`);
})