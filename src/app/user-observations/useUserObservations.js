import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const useUserObservations = (userId) => {
  const [user, setUser] = useState([]);
  const [observations, setObservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return {
    fetchUsers,
    user,
    observations,
    fetchObservations,
    isLoading,
    setIsLoading,
  };
};
