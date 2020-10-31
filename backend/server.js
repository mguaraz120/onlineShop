const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;


const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

dotenv.config();

connectDB()



if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

app.get('/api/config/paypal', (req, res)=> 
  res.send(process.env.PAYPAL_CLIENT_ID)
)

var __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"))

  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API running...')
  })
}

app.use(notFound)

app.use(errorHandler)

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

