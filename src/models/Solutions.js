const { Schema, default: mongoose } = require("mongoose");

const SolutionSchema = new Schema({
  solution: {
    type: String,
    required: true,
  },
  problemId: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  its: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Solution || mongoose.model("Solution", SolutionSchema);