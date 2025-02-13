import mongoose from "mongoose";
import { DATABASE } from "../config/index.js";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(DATABASE);
    console.log("DB Connected to host:", conn.connection.host);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
