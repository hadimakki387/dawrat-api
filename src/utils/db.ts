

// db.js
async function MongoConnection() {
  const mongoose = require("mongoose");
  try {
    const environment:string = 'production'
    const URI = environment==='local'?process.env.MONGO_URI_LOCAL:process.env.MONGO_URI

    await mongoose.connect(URI);  

    console.log(`Connected successfully!`);
    console.log(URI);
  } catch (error) {


    console.log(`MongoDB connection error: ${error}`);
  }
}

export default MongoConnection;
