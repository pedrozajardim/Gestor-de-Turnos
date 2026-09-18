import app from "./app.js"
import envConfig from "./config/env.config.js"


app.listen(envConfig.PORT, () => {
    console.log(`Servidor Corriendo en puerto ${envConfig.PORT}`);
})