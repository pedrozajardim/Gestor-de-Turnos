import express from "express"
import serviceRouter from "./routes/services.router.js"
import bookingRouter from "./routes/bookings.router.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";

const app = express()

app.use(express.json());
app.use(express.static("./src/public"));
app.use("/api/services",serviceRouter);
app.use("/api/bookings", bookingRouter);

app.engine("handlebars",engine());
app.set("view engine","handlebars");
app.set("views","./src/views")
app.use("/views", viewsRouter);

export default app
