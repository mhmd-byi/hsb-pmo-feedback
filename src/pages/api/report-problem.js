import Problems from '@/models/Problems';
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
  const { problem, its } = req.body;

  try {
    await dbConnect();
    
    const problemReport = await Problems.create({
      its,
      problem
    });

    if (problemReport) {
      res.status(200).send({ done: true, problem: problemReport });
    } else {
      res.status(401).send({ error: 'Invalid details' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
