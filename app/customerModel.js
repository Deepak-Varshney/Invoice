import mongoose,{Schema,models} from "mongoose";

const CustomerSchema = new Schema({
    name:{
        type:String,
        required:[true,"Product name is required"]
    },
    phone:{
        type: Number,
        required:[true,"Phone number is required"]
    },
    gender:{
        type: String,
    },

},{timestamps:true})

const CustomerModel = models.customer || mongoose.model("customer",CustomerSchema);

export default CustomerModel;
