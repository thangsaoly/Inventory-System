import { registerUserService, loginUserService } from "../services/auth.service.js"

export const register = async (req, res) => {
    try {
        const { username, name, email, password } = req.body
        const targetUsername = username || name

        const newUser = await registerUserService(targetUsername, email, password)

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        })
    } catch (error) {
        const statusCode = error.statusCode || 500
        return res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await loginUserService(email, password)

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: user
        })
    } catch (error) {
        const statusCode = error.statusCode || 500
        return res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

