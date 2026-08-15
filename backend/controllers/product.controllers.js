import {
  getProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService
} from "../services/product.service.js"

export const getProducts = async (req, res) => {
  try {
    const { page, limit, search, category } = req.query
    const result = await getProductsService({ page, limit, search, category })

    return res.status(200).json({
      success: true,
      data: result.products,
      meta: result.meta
    })
  } catch (error) {
    const statusCode = error.statusCode || 500
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error"
    })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await getProductByIdService(id)

    return res.status(200).json({
      success: true,
      data: product
    })
  } catch (error) {
    const statusCode = error.statusCode || 500
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error"
    })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, sku, price, quantity, description, category, min_stock_level } = req.body

    const newProduct = await createProductService({
      name,
      sku,
      price,
      quantity,
      description,
      category,
      min_stock_level
    })

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    })
  } catch (error) {
    const statusCode = error.statusCode || 500
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error"
    })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updatedProduct = await updateProductService(id, req.body)

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    })
  } catch (error) {
    const statusCode = error.statusCode || 500
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error"
    })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    await deleteProductService(id)

    return res.status(204).send()
  } catch (error) {
    const statusCode = error.statusCode || 500
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error"
    })
  }
}
