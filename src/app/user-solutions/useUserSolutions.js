import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const useUserSolutions = (userId) => {
  const [user, setUser] = useState([]);
  const [userProblems, setUserProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control, reset } = useForm();
  const [topic, setTopic] = useState('');

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/get-user-by-id/${userId}`);
    const data = await response.json();
    setUser(data);
    setIsLoading(false);
  };
  const its = user?.user?.its;

  const fetchUserProblems = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/fetch-user-problems/${its}`);
    const data = await response.json();
    setUserProblems(data);
    setIsLoading(false);
  }

  const onSubmit = async (data) => {

    const res = await fetch(`/api/post-solution`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problemId: data.problemId, its: user?.user?.its, solution: data.solution }),
    });
    if (res.status === 200) {
      toast.success('Solution posted');
      reset();
    } else {
      toast.error('Solution not posted');
    }
  }

  const fetchTopic = async (id) => {
    setIsLoading(true);
    const response = await fetch(`/api/fetch-topic-by-id/${id}`);
    const data = await response.json();
    console.log(data?.topic);
    setTopic(data?.topic);
    setIsLoading(false);
  };

  return {
    fetchUsers,
    user,
    isLoading,
    setIsLoading,
    onSubmit,
    control,
    handleSubmit,
    fetchUserProblems,
    userProblems,
    setUserProblems,
    fetchTopic,
    topic,
  };
};
