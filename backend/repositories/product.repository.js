import db from "../config/db.js"

export const findProducts = async ({ page = 1, limit = 10, search, category }) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1)
  const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10))
  const offset = (pageNum - 1) * limitNum

  const conditions = []
  const params = []

  if (search && search.trim()) {
    conditions.push("(name LIKE ? OR sku LIKE ?)")
    const searchWildcard = `%${search.trim()}%`
    params.push(searchWildcard, searchWildcard)
  }

  if (category && category.trim()) {
    conditions.push("category = ?")
    params.push(category.trim())
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""

  const countQuery = `SELECT COUNT(*) AS total FROM products ${whereClause}`
  const [countResult] = await db.query(countQuery, params)
  const totalItems = countResult[0].total

  const dataQuery = `SELECT * FROM products ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`
  const [products] = await db.query(dataQuery, [...params, limitNum, offset])

  const totalPages = Math.ceil(totalItems / limitNum) || 1

  return {
    products: products.map(product => ({
      ...product,
      price: Number(product.price)
    })),
    meta: {
      page: pageNum,
      limit: limitNum,
      total_items: totalItems,
      total_pages: totalPages
    }
  }
}

export const findProductById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM products WHERE id = ?",
    [id]
  )
  if (!rows[0]) return null
  return {
    ...rows[0],
    price: Number(rows[0].price)
  }
}

export const findProductBySku = async (sku) => {
  const [rows] = await db.query(
    "SELECT * FROM products WHERE sku = ?",
    [sku]
  )
  if (!rows[0]) return null
  return {
    ...rows[0],
    price: Number(rows[0].price)
  }
}

export const findProductBySkuAndNotId = async (sku, id) => {
  const [rows] = await db.query(
    "SELECT * FROM products WHERE sku = ? AND id != ?",
    [sku, id]
  )
  if (!rows[0]) return null
  return {
    ...rows[0],
    price: Number(rows[0].price)
  }
}

export const createProduct = async (productData) => {
  const {
    sku,
    name,
    description = null,
    category = "General",
    price,
    quantity = 0,
    min_stock_level = 5
  } = productData

  const [result] = await db.query(
    "INSERT INTO products (sku, name, description, category, price, quantity, min_stock_level) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [sku, name, description, category, price, quantity, min_stock_level]
  )

  return await findProductById(result.insertId)
}

export const updateProduct = async (id, updateData) => {
  const fields = []
  const values = []

  if (updateData.name !== undefined) {
    fields.push("name = ?")
    values.push(updateData.name.trim())
  }
  if (updateData.sku !== undefined) {
    fields.push("sku = ?")
    values.push(updateData.sku.trim())
  }
  if (updateData.description !== undefined) {
    fields.push("description = ?")
    values.push(updateData.description ? updateData.description.trim() : null)
  }
  if (updateData.category !== undefined) {
    fields.push("category = ?")
    values.push(updateData.category ? updateData.category.trim() : "General")
  }
  if (updateData.price !== undefined) {
    fields.push("price = ?")
    values.push(Number(updateData.price))
  }
  if (updateData.quantity !== undefined) {
    fields.push("quantity = ?")
    values.push(Number(updateData.quantity))
  }
  if (updateData.min_stock_level !== undefined) {
    fields.push("min_stock_level = ?")
    values.push(Number(updateData.min_stock_level))
  }

  if (fields.length > 0) {
    values.push(id)
    await db.query(
      `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
      values
    )
  }

  return await findProductById(id)
}

export const deleteProduct = async (id) => {
  const [result] = await db.query(
    "DELETE FROM products WHERE id = ?",
    [id]
  )
  return result.affectedRows > 0
}
