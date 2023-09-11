import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const catTestSchema = new Schema({
  productMode: { type: String, required: true },
  tests:[{type:mongoose.Types.ObjectId,ref:"Test"}]
});
type CatTest = InferSchemaType<typeof catTestSchema>;
export default model <CatTest> ("CatTest", catTestSchema);