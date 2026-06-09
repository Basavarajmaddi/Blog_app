const mongoose = require('mongoose')

function connectDb() {
     mongoose.connect(process.env.MONGO_DB).then(()=>{
        console.log('connected to database')
    }).catch((err)=>{
        console.log('error connecting to database',err)
    })
}

module.exports = connectDb      

