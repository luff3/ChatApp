import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import authRoutes from "./Routes/authRoute.js"
import messageRoutes from "./Routes/messageRoutes.js"
import userRoutes from "./Routes/userRoute.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const __dirname = path.resolve();


const PORT = process.env.PORT || 5000;

// const app = express();
app.use(cors());
// app.use(cors({
//     origin: 'https://localhost:3000', // URL вашого фронтенду
//     credentials: true, // Дозволити кукі в запитах
// }));
app.use(express.json()); 
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


server.listen(PORT, () => {
    connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});