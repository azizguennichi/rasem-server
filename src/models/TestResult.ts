import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const testResult = new Schema({
  productMode: { type: String,required:true},
  serialNumber:{type:String,required:true,default:"Not Added"},
  tests:[
    {
        _id:false,
        testId:{type:mongoose.Types.ObjectId,ref:"Test",required:true},
        result:{type:String,required:true, enum:["pass","fail"]}
    }
  ]
});
type TestResult = InferSchemaType<typeof testResult>;
export default model <TestResult> ("TestResult", testResult);
