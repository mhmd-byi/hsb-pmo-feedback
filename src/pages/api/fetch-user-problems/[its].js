import Problems from "@/models/Problems";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  const { its } = req.query;
  await dbConnect();
  const problems = await Problems.find({ its });
  if (!problems) {
    res.status(200).json({ exists: false });
    return;
  }
  res.status(200).json({ problems: problems });
}
