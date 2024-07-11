import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const useUserObservations = (userId) => {
  const [user, setUser] = useState([]);
  const [observations, setObservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('');

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/get-user-by-id/${userId}`);
    const data = await response.json();
    setUser(data);
    setIsLoading(false);
  };

  const its = user?.user?.its;

  const fetchObservations = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/find-problems-solutions/${its}`);
    const data = await response.json();
    setObservations(data);
    setIsLoading(false);
  };

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
    observations,
    fetchObservations,
    isLoading,
    setIsLoading,
    fetchTopic,
    topic,
  };
};
