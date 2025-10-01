 const mongoose = require('mongoose');


 function connectDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then( () => {
      console.log("MongoDb Connected");
      
    })
    .catch((err) => {
        console.log("MOngoDb connection erorr:", err);
        
    })
 }

 module.exports = connectDB;