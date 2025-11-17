import mongoose from 'mongoose';

// Define the Profile schema
const employeeSchema = new mongoose.Schema({
    contactNumber: {
        type: Number,
        
    },
    role : {
        type : String,
    } ,
   location:{
    type : String,
   }
});

// Export the Profile model
export default mongoose.model("Employee", employeeSchema);