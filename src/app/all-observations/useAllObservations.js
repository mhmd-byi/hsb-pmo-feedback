import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const useAllObservations = (userId) => {
  const [user, setUser] = useState([]);
  const [particularUser, setParticularUser] = useState([]);
  const [observations, setObservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [its, setIts] = useState('');
  const [topic, setTopic] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/get-user-by-id/${userId}`);
    const data = await response.json();
    setUser(data);
    setIsLoading(false);
  };

  const fetchParticularUser = async (uId) => {
    setIsLoading(true);
    const response = await fetch(`/api/get-user-by-id/${uId}`);
    const data = await response.json();
    setParticularUser(data);
    setIts(data?.user?.its);
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

  const fetchObservations = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/find-problems-solutions/${its}`);
    const data = await response.json();
    setObservations(data);
    setIsLoading(false);
  };

  const fetchAllUsers = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/users`);
    const data = await response.json();
    setAllUsers(data);
    setIsLoading(false);
  };

  return {
    fetchUsers,
    user,
    observations,
    fetchObservations,
    isLoading,
    setIsLoading,
    allUsers,
    fetchAllUsers,
    setIts,
    its,
    fetchParticularUser,
    particularUser,
    fetchTopic,
    topic,
  };
};
