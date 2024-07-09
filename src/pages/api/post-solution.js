import Solutions from '@/models/Solutions';
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
  const { problemId, its, solution } = req.body;

  try {
    await dbConnect();
    
    const solutionSubmission = await Solutions.create({
      its,
      problemId,
      solution,
    });

    if (solutionSubmission) {
      res.status(200).send({ done: true, data: solutionSubmission });
    } else {
      res.status(401).send({ error: 'Invalid details' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
