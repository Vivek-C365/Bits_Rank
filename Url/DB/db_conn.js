const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/TestDB"
const connectDb =  async()=>{
    try {
        await mongoose.connect(URI);
        console.log("Db Connected")
    } catch (error) {
        console.error("database connect fail")
        process.exit(0)
    }
}

module.exports = connectDb