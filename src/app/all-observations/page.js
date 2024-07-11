'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAllObservations } from './useAllObservations';
import { useRouter } from 'next/navigation';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function AllObservations() {
  const userId = localStorage.getItem('userId');
  const { fetchUsers, user, fetchObservations, observations, fetchAllUsers, allUsers, fetchParticularUser, particularUser, its } = useAllObservations(userId);
  const [problemSolutions, setProblemSolutions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const router = useRouter();
  useEffect(() => {
    fetchUsers();
  }, [userId, selectedUserId]);

  useEffect(() => {
    fetchAllUsers();
  }, [userId, user]);

  useEffect(() => {
    fetchObservations();
  }, [particularUser, its]);

  useEffect(() => {
    if (observations?.data?.problems && observations?.data?.solutions) {
      const mappedData = observations.data.problems.map((problem, index) => ({
        ...problem,
        solutions: observations.data.solutions[index] || []
      }));
      setProblemSolutions(mappedData);
    }
  }, [observations]);

  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
    fetchParticularUser(event.target.value);
  };


  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold bg-[#EFF3FA] rounded-lg text-theme-color">
        User dashboard
      </h1>

      <span className="text-lg font-medium">
        Name: {user?.user?.name || 'user'}
      </span>

      <FormControl fullWidth className="my-4">
        <InputLabel id="user-select-label">Select User</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={selectedUserId}
          label="Select User"
          onChange={handleUserChange}
        >
          {allUsers.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
