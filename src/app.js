import express from "express"
import serviceRouter from "./routes/services.router.js"

const app = express()

app.use(express.json());
app.use("/api/services",serviceRouter);

export default app