import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoute.js"
import messageRoutes from "./Routes/messageRoutes.js"
import userRoutes from "./Routes/userRoute.js"
import connectToMongoDB from "./db/connectToMongoDB.js";


dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); 

app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});