const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        console.log('Connecting to MongoDB')
    }catch(err){
        console.log(err.message)
        //exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB;