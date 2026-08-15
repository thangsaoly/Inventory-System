import express from "express"
import { validateRegisterInput, validateLoginInput } from "../middleware/validator.middleware.js"
import { register, login } from "../controllers/auth.controllers.js"

const router = express.Router()

router.post("/register", validateRegisterInput, register)

router.post("/login", validateLoginInput, login)

export default router

