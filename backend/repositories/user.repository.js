import db from "../config/db.js"

export const findUserByUsernameOrEmail = async (username, email) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE username = ? OR email = ?", 
        [username, email]
    )
    return rows[0] || null
}

export const createUser = async (user) => {
    const [result] = await db.query(
        "INSERT INTO users (username, email, password_hash, role) VALUES (?,?,?,?)",
        [user.username, user.email, user.passwordHash, "staff"]
    )
    return {
        id: result.insertId,
        username: user.username,
        email: user.email,
        role: "staff"
    }
}