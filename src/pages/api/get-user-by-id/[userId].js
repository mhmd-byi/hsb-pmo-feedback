import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  const { userId } = req.query;
  await dbConnect();
  const user = await User.findById(userId);
  if (!user) {
    res.status(200).json({ exists: false });
    return;
  }
  res.status(200).json({ user: user });
}
