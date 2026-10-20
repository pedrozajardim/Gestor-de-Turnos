import { createServer } from "node:http";
import { Server } from "socket.io";
import app from "./app.js";
import envConfig from "./config/env.config.js"
import { connectDB } from "./config/database.config.js";

connectDB()

const httpServer =  createServer(app);
const io = new Server(httpServer)

app.set("io", io);

io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);
});


httpServer.listen(envConfig.port, () => {
    console.log(`Servidor Corriendo en puerto ${envConfig.port}`);
})