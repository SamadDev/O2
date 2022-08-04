const express = require('express');
const dotenv = require('dotenv');
const morgan = require("morgan");
 require('colors');
const connectDB = require('./config/db');
const errorHandler=require('./Midlware/Error')



// Load env vars
dotenv.config({ path: './config/config' });

// Connect to database
connectDB();

// Route files
const product = require('./Router/ProductsRouter');
const auth =require('./Router/AuthRouter');


const app = express();

// Body parser
app.use(express.json());
// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use('/api/v1/products', product);
app.use('/api/v1/auth', auth);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

});
