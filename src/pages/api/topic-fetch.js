import dbConnect from '@/utils/dbConnect';
import Topic from '@/models/Topics';

export default async function handler(req, res) {
  await dbConnect();

  const topics = await Topic.find({});

  if (topics) {
    res.status(200).json({ topic: topics });
  } else {
    res.status(401).send({ error: 'Invalid details' });
  }
}
