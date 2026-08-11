
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return typeof email === 'string' && emailRegex.test(email.trim())
}

export const validateRegisterInput = (req, res, next) => {
  const { username, name, email, password } = req.body
  const targetUsername = username || name
  const errors = []

  if (!targetUsername || typeof targetUsername !== 'string' || targetUsername.trim().length === 0) {
    errors.push('Username is required')
  }

  if (!email || !isValidEmail(email)) {
    errors.push('A valid email address is required')
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (errors.length > 0) {
    return res.status(400).json({
        success: false,
        error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input data",
            details: errors
        }
    })
  }

  next()
}

export const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body
  const errors = []

  if (!email || !isValidEmail(email)) {
    errors.push('A valid email address is required')
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (errors.length > 0) {
    return res.status(400).json({
        success: false,
        error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input data",
            details: errors
        }
    })
  }

  next()
}
