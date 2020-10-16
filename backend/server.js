const express = require("express");
const dotenv = require("dotenv");
const {notFound, errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")

dotenv.config();

connectDB()

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

