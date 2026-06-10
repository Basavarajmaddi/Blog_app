const express= require("express")
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const connectDb = require('./config/db')
const userRoutes = require('./Routes/user')
const blogRoutes = require('./Routes/blogs')

const cors = require("cors");
app.use(cors());
const path = require("path");


connectDb()

app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/v1',userRoutes)
app.use('/api/v1',blogRoutes)
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})