import mongoose, { Schema } from "mongoose";

const companySchema = new mongoose.Schema({
    companyname: {
        type: String,
        lowercase: true,
        required: true,
        minlength: [3, 'Company name must be 3 letters long'],
        // companyname: { type: String, required: true },
    },
    // originalname:{
    //     type: String,
    //     required:true
    // },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: String
})

export default mongoose.model("company",companySchema);