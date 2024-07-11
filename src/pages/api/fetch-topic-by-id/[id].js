import Topics from "@/models/Topics";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();
  const topics = await Topics.findById(id);
  if (!topics) {
    res.status(200).json({ exists: false });
    return;
  }
  res.status(200).json({ topic: topics.topic });
}
