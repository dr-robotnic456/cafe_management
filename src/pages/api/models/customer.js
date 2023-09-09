import mongoose, { Schema } from "mongoose";

const CustomerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    pc:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"Pc"
    }
})

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema)