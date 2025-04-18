import mongoose from "mongoose";

const { Schema } = mongoose; 

// const eventSchema = new Schema({
//   eventName: { type: String, required: true }, 
//   data: { type: Schema.Types.Mixed },        
//   timestamp: { type: Date, default: Date.now }, 
//   counter: { type: Number, default: 1 },      
// });

const actionSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User", // Reference to the User collection
    //     required: true,
    // },
    // companyID:{
    //     type:String,
    // },
    actionType: {
        type: String, // e.g., "click", "signup", "view", "purchase"
        required: true,
    },
    companyID:{
        type: String, // e.g., "click", "signup", "view", "purchase"
        required: true,
    },
    pageUrl: {
        type: String, // URL of the page where the action occurred
        required: true,
    },
    counter: {
      type: Number,
      default: 1 
    },
    timestamp: {
        type: Date,
        default: Date.now, // Automatically record the time
    },
});

export default mongoose.model("Action", actionSchema);


// eventSchema.index({ eventName: 1, data: 1 }, { unique: true });

// export default mongoose.model("Event", eventSchema);
