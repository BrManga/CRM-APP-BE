const mongoose = require("mongoose");
const db =
  "mongodb+srv://admin:3vfxMVFJaY05muyl@cluster0-linf1.mongodb.net/test?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("Mongo Atlas is ready");
  } catch (error) {
      console.log(error.message);
      process.exit(1);
  }
};
module.exports=connectDB