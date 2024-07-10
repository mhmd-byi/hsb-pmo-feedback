import Problems from '@/models/Problems';
import Solutions from '@/models/Solutions';
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
  const { its } = req.query;

  try {
    await dbConnect();
    
    const findProblems = await Problems.find({ its });

    const solutionPromises = findProblems.map((problem) => {
      return Solutions.find({ problemId: problem.id });
    });

    // Wait for all promises to resolve
    const solutions = await Promise.all(solutionPromises);

    const combinedData = {
      problems: findProblems,
      solutions: solutions[0],
    };


    res.status(200).json({ data: combinedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
