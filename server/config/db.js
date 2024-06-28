const mongoose = require('mongoose')

const mongodb_url = async(req,res)=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('mongodb is connected')
    } catch (error) {
        console.log('there is an error')
        console.log(error)
        process.exit(1)
    }
}

module.exports = mongodb_url