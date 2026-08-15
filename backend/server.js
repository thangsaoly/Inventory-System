import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import db from "./config/db.js"
import authRoutes from "./routes/auth.routes.js"
import productRoutes from "./routes/product.routes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Mount API routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/products", productRoutes)


app.get("/health", (req, res) => {
    res.end("My Health is OK!")
})

app.get("/", (req, res) => {
    res.end("Welcome to Inventory System - Backend!")
})

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`)

    //Test Database connection
    try {
        const connection = await db.getConnection()
        console.log("Connected to mysql DB")
        connection.release()
    } catch (error) {
        console.log("Error connecting to mysql DB")
        console.log(error.message) 
    }
})