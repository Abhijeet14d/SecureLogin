import { connectDB } from "./db/connectdb.js"; 
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello Abhijeet");
});

app.use("/api/auth",authRoutes);


app.listen(PORT, ()=>{
    connectDB();
    console.log(`server is running on ${PORT}`);
    
})