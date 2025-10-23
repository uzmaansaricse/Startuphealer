// Import required modules using ES6 syntax
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const { MONGODB_URL } = process.env;

// Export the connect function
const connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB Connection Success`))
    .catch((err) => {
      console.log(`DB Connection Failed`);
      console.log(err);
      process.exit(1);
    });
};

export default { connect };
