import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const catTestSchema = new Schema({
  productMode: { type: String},
  tests:[{type:mongoose.Types.ObjectId,ref:"Test"}],
  modeTest:{type:String,enum:["full","custom"],required:true,default:"full"},
  timeTest:{type:Number,required:true,default:10}
});
type CatTest = InferSchemaType<typeof catTestSchema>;
export default model <CatTest> ("CatTest", catTestSchema);