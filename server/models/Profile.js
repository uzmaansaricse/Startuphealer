import mongoose from 'mongoose';

// Define the Profile schema
const profileSchema = new mongoose.Schema({
	contactNumber: {
		type: Number,
		
	},
	role : {
		type : String,
	} ,
	coFounderExist: {
		type : Boolean,
	},
	coFoundersFirstName : {
		type : String,
	},
	coFoundersLastName : {
		type : String,
	},
	startUpName : {
		type: String,
	},
	state:{
		type:String,
	},
	city:{
		type:String,
	},
	address:{
		type:String,
	},
	industry:{
		type : String,
	},
	sector:{
		type : String,
	},
	businessDescription:{
		type : String
	},
	image:{
		type : String
	}
});

// Export the Profile model
export default mongoose.model("Profile", profileSchema);