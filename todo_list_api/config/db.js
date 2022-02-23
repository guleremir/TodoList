const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            //desteklenmediği için kaldırıldı. Error : option usecreateindex is not supported
            //useCreateIndex: true
        })
        console.log(`MongoDB connected from : ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error : ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectDB