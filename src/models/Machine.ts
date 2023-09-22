import mongoose, { InferSchemaType, model } from "mongoose";

const machineSchema = new mongoose.Schema({
    productMode:{type:String,require:false},
    serialNumber:{type:String,required:false},
    macAdress:{type:String,required:false},
    productModel:{type:String,required:false},
    probelength:{type:String,required:false},
    potdiam:{type:String,required:false},
    potlength:{type:String,required:false},
    potwidth:{type:String,required:false},
    sprinkleduration:{type:String,required:false},
    sprinklefreq:{type:String,required:false},
    sprinkletargettimestamp:{type:String,required:false},
    sprinklemode:{type:String,required:false},
    thresholdmin:{type:String,required:false},
    thresholdmax:{type:String,required:false},
    probecurrent:{type:String,required:false},
    batterycurrent:{type:String,required:false},
    // testStatus:[{type:mongoose.Types.ObjectId,ref:"Test"}],
    operateurId:{type:mongoose.Types.ObjectId,ref:"User"},
    testGlobale:{type:String,required:false,enum:["pass","fail","pending"],default:"pending"}
},
{timestamps:false}
)
type Machine = InferSchemaType<typeof machineSchema>;
export default model <Machine> ("Machine",machineSchema);