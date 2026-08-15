const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return typeof email === 'string' && emailRegex.test(email.trim())
}

export const validateRegisterInput = (req, res, next) => {
  const { username, name, email, password, role } = req.body
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

  if (role !== undefined && role !== null) {
    const validRoles = ['admin', 'manager', 'staff']
    if (!validRoles.includes(role)) {
      errors.push("Role must be one of 'admin', 'manager', or 'staff'")
    }
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

export const validateProductInput = (req, res, next) => {
  const { name, sku, price, quantity, description, category, min_stock_level } = req.body
  const errors = []

  // Required: name
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required')
  } else if (name.trim().length > 100) {
    errors.push('Name must not exceed 100 characters')
  }

  // Required: sku
  if (!sku || typeof sku !== 'string' || sku.trim().length === 0) {
    errors.push('SKU is required')
  } else if (sku.trim().length > 50) {
    errors.push('SKU must not exceed 50 characters')
  }

  // Required: price
  if (price === undefined || price === null || typeof price !== 'number' || Number.isNaN(price) || price <= 0) {
    errors.push('Price must be a positive number')
  }

  // Required: quantity
  if (quantity === undefined || quantity === null || typeof quantity !== 'number' || Number.isNaN(quantity) || quantity < 0 || !Number.isInteger(quantity)) {
    errors.push('Quantity must be a non-negative integer')
  }

  // Optional: description
  if (description !== undefined && description !== null && typeof description !== 'string') {
    errors.push('Description must be a string')
  }

  // Optional: category
  if (category !== undefined && category !== null) {
    if (typeof category !== 'string' || category.trim().length === 0) {
      errors.push('Category must be a non-empty string')
    } else if (category.trim().length > 50) {
      errors.push('Category must not exceed 50 characters')
    }
  }

  // Optional: min_stock_level
  if (min_stock_level !== undefined && min_stock_level !== null) {
    if (typeof min_stock_level !== 'number' || Number.isNaN(min_stock_level) || min_stock_level < 0 || !Number.isInteger(min_stock_level)) {
      errors.push('Min stock level must be a non-negative integer')
    }
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

export const validateUpdateProductInput = (req, res, next) => {
  const { name, sku, price, quantity, description, category, min_stock_level } = req.body
  const errors = []

  const providedKeys = Object.keys(req.body || {})
  if (providedKeys.length === 0) {
    errors.push('At least one field must be provided for update')
  }

  if (name !== undefined) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      errors.push('Name must be a non-empty string')
    } else if (name.trim().length > 100) {
      errors.push('Name must not exceed 100 characters')
    }
  }

  if (sku !== undefined) {
    if (!sku || typeof sku !== 'string' || sku.trim().length === 0) {
      errors.push('SKU must be a non-empty string')
    } else if (sku.trim().length > 50) {
      errors.push('SKU must not exceed 50 characters')
    }
  }

  if (price !== undefined) {
    if (typeof price !== 'number' || Number.isNaN(price) || price <= 0) {
      errors.push('Price must be a positive number')
    }
  }

  if (quantity !== undefined) {
    if (typeof quantity !== 'number' || Number.isNaN(quantity) || quantity < 0 || !Number.isInteger(quantity)) {
      errors.push('Quantity must be a non-negative integer')
    }
  }

  if (description !== undefined && description !== null && typeof description !== 'string') {
    errors.push('Description must be a string')
  }

  if (category !== undefined && category !== null) {
    if (typeof category !== 'string' || category.trim().length === 0) {
      errors.push('Category must be a non-empty string')
    } else if (category.trim().length > 50) {
      errors.push('Category must not exceed 50 characters')
    }
  }

  if (min_stock_level !== undefined && min_stock_level !== null) {
    if (typeof min_stock_level !== 'number' || Number.isNaN(min_stock_level) || min_stock_level < 0 || !Number.isInteger(min_stock_level)) {
      errors.push('Min stock level must be a non-negative integer')
    }
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