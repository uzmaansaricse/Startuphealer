import mongoose from 'mongoose';

// Define the Profile schema
const pitchDeckSchema = new mongoose.Schema({
    startUpName: {
        type: String,
        
    },
    logo : {
        type : String,
    } ,
    Tagline: {
        type : String,
    },
    sector : {
        type : String,
    },
    business : {
        type : String,
    },
    location : {
        type: String,
    },
    state:{
        type:String,
    },
    website:{
        type:String,
    },
    linkedIn:{
        type:String,
    },
    instagram:{
        type : String,
    },
    name:{
        type : String,
    },
    designation:{
        type : String
    },
    teamName:{
        type : String
    },
    tramDesignation:{
        type:String
    }
});

// Export the Profile model
export default mongoose.model("PitchDeck", pitchDeckSchema);