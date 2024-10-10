import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import path from "path";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

app.use(cors({origin: "http://localhost:5173", credentials: true}))

app.use(express.json()); // allow us to parse incoming req from req.body
app.use(cookieParser()); // allow us to parse incoming cookies

// app.get("/", (req, res)=> {
//     res.send("Hello I'm live..")
// })

app.use("/api/auth", authRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    connectDB()
    console.log("Server is running on port: ", PORT);
})
