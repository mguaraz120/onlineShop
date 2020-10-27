const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const Product = require("../models/productModel")

const getProducts = asyncHandler(async(req, res)=>{
    const products = await Product.find({})
    res.json(products);
})

// @desc     Fetch single product
// @route    GET /api/product/:id
// @access   Public

const getProductById = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id)

    if(product){
      return  res.json(product)
    }else{
      res.status(404)
        throw new Error("Product not found")
    }
})

// @desc     Delete a product
// @route    DELETE /api/product/:id
// @access   Private/Admin

const deleteProduct = asyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.id)

  if(product){
    await product.remove()
    res.json({message: 'Product removed'})
  }else{
    res.status(404)
      throw new Error("Product not found")
  }
})

// @desc     Create a product
// @route    POST /api/products
// @access   Private/Admin

const createProduct = asyncHandler(async(req, res)=>{
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    description: 'sample description',
    countInStock: 0,
    numReview: 0,
    category: 'sample category',
  })

  const createProduct = await product.save()
  res.status(201).json(createProduct)
})

// @desc     Update a product
// @route    PUT /api/products/:id
// @access   Private/Admin

const updateProduct = asyncHandler(async(req, res)=>{
  const { 
    name, 
    price, 
    description, 
    image, 
    brand, 
    category, 
    countInStock
  } = req.body

  const product = await Product.findById(req.params.id)

  if(product)
  {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }

})

module.exports = {getProducts, getProductById, deleteProduct, createProduct, updateProduct}