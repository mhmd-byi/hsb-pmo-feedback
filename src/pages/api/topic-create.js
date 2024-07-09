import dbConnect from '@/utils/dbConnect';
import Topic from '@/models/Topics';

export default async function handler(req, res) {
  const { topicName } = req.body;

  try {
    await dbConnect();
    
    const topic = await Topic.create({
      topic: topicName,
    });

    if (topic) {
      res.status(200).send({ done: true, topic: topic });
    } else {
      res.status(401).send({ error: 'Invalid details' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
