'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useUserObservations } from './useUserObservations';

export default function UserObservations() {
  const userId = localStorage.getItem('userId');
  const { fetchUsers, user, fetchObservations, observations, fetchTopic, topic } = useUserObservations(userId);
  const [problemSolutions, setProblemSolutions] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, [userId]);

  useEffect(() => {
    fetchObservations();
  }, [user]);

  useEffect(() => {
    if (observations?.data?.problems && observations?.data?.solutions) {
      const mappedData = observations.data.problems.map((problem, index) => ({
        ...problem,
        solutions: observations.data.solutions[index] || []
      }));
      setProblemSolutions(mappedData);
    }
  }, [observations]);

  useEffect(() => {
    fetchTopic(user?.user?.topics);
  }, [user])


  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold bg-[#EFF3FA] rounded-lg text-theme-color">
        User dashboard
      </h1>

      <span className="text-lg font-medium">
        Name: {user?.user?.name || 'user'}
      </span>
      <br />
      <span className="text-lg font-medium">
        Topic: {topic || 'general'}
      </span>

      <div className='mt-6'>
        {problemSolutions.map((problem, index) => (
          <Accordion key={problem._id} defaultExpanded={index === 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              {problem.problem}
            </AccordionSummary>
            <AccordionDetails>
              {problem.solutions.length > 0 ? (
                problem.solutions.map((solution) => (
                  <p key={solution._id}>{solution.solution}</p>
                ))
              ) : (
                <p>No solution found</p>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <Toaster />
    </div>
  );
}
