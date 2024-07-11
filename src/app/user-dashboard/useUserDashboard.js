import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const useUserDashboard = (userId) => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const { handleSubmit, control, reset } = useForm();

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/get-user-by-id/${userId}`);
    const data = await response.json();
    setUser(data);
    setIsLoading(false);
  };

  const onSubmit = async (data) => {
    const res = await fetch(`/api/report-problem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problem: data.problem, its: user?.user?.its }),
    });
    if (res.status === 200) {
      toast.success('Report posted');
      reset();
    } else {
      toast.error('Report not posted');
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
    fetchTopic,
    topic,
  };
};
