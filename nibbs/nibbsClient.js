import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const nibssClient = axios.create({
  baseURL: process.env.NIBSS_URL,
  headers: {
    Authorization: `Bearer ${process.env.NIBSS_API_KEY}`,
    'Api-Secret': process.env.NIBSS_API_SECRET,
    "Content-Type": "application/json",
  },
  timeout: 10000,
});