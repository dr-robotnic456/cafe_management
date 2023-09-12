import mongoose, { Schema } from "mongoose";

const PcSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    }
})

export default mongoose.models.Pc || mongoose.model("Pc", PcSchema)