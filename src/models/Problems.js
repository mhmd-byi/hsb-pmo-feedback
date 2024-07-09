const { Schema, default: mongoose } = require("mongoose");

const ProblemSchema = new Schema({
  problem: {
    type: String,
    required: true,
  },
  its: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Problem || mongoose.model("Problem", ProblemSchema);