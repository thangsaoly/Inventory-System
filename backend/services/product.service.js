import {
  findProducts,
  findProductById,
  findProductBySku,
  findProductBySkuAndNotId,
  createProduct,
  updateProduct,
  deleteProduct
} from "../repositories/product.repository.js"

export const getProductsService = async (queryParams) => {
  return await findProducts(queryParams)
}

export const getProductByIdService = async (id) => {
  const numericId = Number(id)
  if (!numericId || !Number.isInteger(numericId) || numericId <= 0) {
    const error = new Error("Invalid product ID")
    error.statusCode = 400
    throw error
  }

  const product = await findProductById(numericId)
  if (!product) {
    const error = new Error("Product not found")
    error.statusCode = 404
    throw error
  }

  return product
}

export const createProductService = async (productData) => {
  const { name, sku, price, quantity, description, category, min_stock_level } = productData

  const existingProduct = await findProductBySku(sku)
  if (existingProduct) {
    const error = new Error("Product with this SKU already exists")
    error.statusCode = 409
    throw error
  }

  const newProduct = await createProduct({
    sku: sku.trim(),
    name: name.trim(),
    description: description ? description.trim() : null,
    category: category ? category.trim() : "General",
    price: Number(price),
    quantity: Number(quantity),
    min_stock_level: min_stock_level !== undefined ? Number(min_stock_level) : 5
  })

  return newProduct
}

export const updateProductService = async (id, updateData) => {
  const numericId = Number(id)
  if (!numericId || !Number.isInteger(numericId) || numericId <= 0) {
    const error = new Error("Invalid product ID")
    error.statusCode = 400
    throw error
  }

  const existingProduct = await findProductById(numericId)
  if (!existingProduct) {
    const error = new Error("Product not found")
    error.statusCode = 404
    throw error
  }

  if (updateData.sku) {
    const duplicateSku = await findProductBySkuAndNotId(updateData.sku.trim(), numericId)
    if (duplicateSku) {
      const error = new Error("Product with this SKU already exists")
      error.statusCode = 409
      throw error
    }
  }

  const updatedProduct = await updateProduct(numericId, updateData)
  return updatedProduct
}

export const deleteProductService = async (id) => {
  const numericId = Number(id)
  if (!numericId || !Number.isInteger(numericId) || numericId <= 0) {
    const error = new Error("Invalid product ID")
    error.statusCode = 400
    throw error
  }

  const existingProduct = await findProductById(numericId)
  if (!existingProduct) {
    const error = new Error("Product not found")
    error.statusCode = 404
    throw error
  }

  await deleteProduct(numericId)
  return true
}
