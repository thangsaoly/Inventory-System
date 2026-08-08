import dotenv from "dotenv"
import express from "express"
import cors from "cors"

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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})