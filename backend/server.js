import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import db from "./config/db.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

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