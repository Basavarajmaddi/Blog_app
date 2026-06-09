const exprees= require('express')
const app = exprees()
const dotenv = require('dotenv')
dotenv.config()
const connectDb = require('./config/db')
const userRoutes = require('./Routes/user')
const blogRoutes = require('./Routes/blogs')
const cors = require("cors");
app.use(cors());

connectDb()

app.use(exprees.json())
app.use('/api/v1',userRoutes)
app.use('/api/v1',blogRoutes)
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})