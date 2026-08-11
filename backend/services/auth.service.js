import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { findUserByUsernameOrEmail, createUser } from "../repositories/user.repository.js"

export const registerUserService = async (username, email, password) => {
    const existingUser = await findUserByUsernameOrEmail(username, email)
    if (existingUser) {
        const error = new Error("Username or email is already taken")
        error.statusCode = 409
        throw error
    }

    const passwordHash = await bcrypt.hash(password, 10)
    
    const newUser = await createUser({ username, email, passwordHash })

    return newUser
}

export const loginUserService = async (email, password) => {
    const user = await findUserByUsernameOrEmail(null, email)
    if (!user) {
        const error = new Error("Invalid credentials")
        error.statusCode = 401
        throw error
    }

    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
        const error = new Error("Invalid credentials")
        error.statusCode = 401
        throw error
    }

    const { password_hash, ...userWithoutPassword } = user

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRES_IN 
    })

    return {
        token,
        user: userWithoutPassword
    }
}



        