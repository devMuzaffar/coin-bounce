import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const DATABASE = process.env.DATABASE;
export const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;