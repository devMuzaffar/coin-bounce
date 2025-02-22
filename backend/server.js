import express from "express";
import connectDb from "./database/index.js";
import { BACKEND_SERVER_PATH, PORT } from "./config/index.js";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
connectDb();

app.use('/storage', express.static('storage'));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ msg: "Home Page" });
});

app.listen(PORT, () => console.log("Server Initialized at", PORT));
