import mongoose, { InferSchemaType, model } from "mongoose";

const testSchema = new mongoose.Schema({
  machineId: { type: mongoose.Types.ObjectId, ref: "Machine" },
  name: { type: String, required: [true, "please provide the name"] },
  description: { type: String, required: [true, "please provide description"] },
  etat: {
    type: String,
    required: [true, "please provide etat"],
    enum: ["pass", "fail", "pending"],
    default: "pending",
  },
  souTests:[{type:mongoose.Types.ObjectId,ref:"Test"}]
});
type Test = InferSchemaType<typeof testSchema>;
export default model<Test>("Test", testSchema);
