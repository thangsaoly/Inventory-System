import express from "express"
import { validateProductInput, validateUpdateProductInput } from "../middleware/validator.middleware.js"
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controllers.js"

const router = express.Router()

router.get("/", getProducts)
router.get("/:id", getProductById)
router.post("/", validateProductInput, createProduct)
router.put("/:id", validateUpdateProductInput, updateProduct)
router.delete("/:id", deleteProduct)

export default router
