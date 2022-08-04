const Product = require('../Modul/Productl');
const ErrorResponse=require("../Uitils/ErrorResponse")

// @desc      Get all products
// @route     GET /api/v1/products
// @access    Public
exports.getProducts = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };
  
    // remove that words you write in there
    const removeFields = ["sort"];
  
    // Loop over removeFields and delete them from reqQuery(url)
    removeFields.forEach((param) => delete reqQuery[param]);
  
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
  
    // to select more than one items
    let queryObj = JSON.parse(queryStr);
  
    const types = ["title", "type","country","category","reward"];
   console.log(queryObj)
   
    for (const type of types) {
      if(queryObj[type]){
      queryObj[type].trim().length < 1
        ? delete queryObj[type]
        : (queryObj[type] = queryObj[type].trim().split(","));
       
    }}
  
    if (queryObj.careers && queryObj.careers["$in"]) {
      queryObj.careers["$in"] = queryObj.careers["$in"].split(",");
    }
  
    //find Product linked with
    query = Product.find(queryObj).populate();
    query = Product.find(queryObj);

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-date");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments();
  
    query = query.skip(startIndex).limit(limit);
  
    // Executing query
    const product = await query;
  
    // Pagination result
    const pagination = {};
  
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
  
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
  
    res.status(200).json({
      success: true,
      count: product.length,
      pagination,
      data: product,
    });
  } catch (err) {
    next(err)
  }
};

// @desc      Get single product
// @route     GET /api/v1/products/:id
// @access    Public
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
  console.log(product)
    if (!product) {
      return next(
        new ErrorResponse(`resourse not found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err)
  }
};

// @desc      Create new product
// @route     POST /api/v1/products
// @access    Private
exports.createProduct = async (req, res, next) => {
  try {
    //to find owner
    req.body.user = req.user.id;
  
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (err) {
    console.log(err)
    // next(err)
  }
};

// @desc      Update product
// @route     PUT /api/v1/products/:id
// @access    Private
exports.updateProduct = async (req, res, next) => {
  try {

    let product = await Product.findById(req.params.id)

    if (!product) {
      return next(
        new ErrorResponse(`items not found with id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure user is bootcamp owner
    if (product.user.toString() !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this bootcamp`,
          401
        )
      );
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err)
  }
};

// @desc      Delete product
// @route     DELETE /api/v1/products/:id
// @access    Private
exports.deleteProduct = async (req, res, next) => {
  try { 
    
    let product = await( Product.findById(req.params.id));

    if (!product) {
      return next(
        new ErrorResponse(`items not found with id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure user is bootcamp owner
    if (product.auth !== req.user.id) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this bootcamp`,
          401
        )
      );
    }

     product = await Product.findByIdAndDelete(req.params.id);

   

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err)
  }
};