import Topics from "@/models/Topics";
import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  const { its, topics } = req.body;
  await dbConnect();

  if (!its || !topics) {
    return res.status(400).json({ message: "ITS number and topic name are required" });
  }

  try {
    const topic = await Topics.findOne({ topic: topics });
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const user = await User.findOne({ its: its });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.topics.includes(topic._id)) {
      user.topics.push(topic._id);
      await user.save();
    }

    const updatedUser = await User.findById(user._id).populate('topics');
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Database write failed:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  
}
