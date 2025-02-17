import express from "express";
import connectDb from "./database/index.js";
import { PORT } from "./config/index.js";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express();
connectDb();

app.use('/storage', express.static('storage'));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ msg: "Home Page" });
});

app.listen(PORT, () => console.log("Server Initialized at", PORT));
