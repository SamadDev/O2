const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );


  // Finding resource
  query = model.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // const types = ["title", "user","type","product_id","startDate","endDate"];
  // for (const type of types) {
  //   if (query[type]) {
  //     query[type] = query[type].trim().split(",");
  //     console.log('if note delte');
  //   }else{
  //     console.log('if delte');
  //     delete query[type];
  //   }
  // }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  res.advancedResults = {
    success: true,
    count: results.length,
    data: results,
  };

  next();
};

module.exports = advancedResults;
