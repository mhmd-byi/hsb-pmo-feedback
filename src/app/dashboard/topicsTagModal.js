import { Modal } from '@/components/Modal';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const TopicsTagModal = ({ open, setOpen, userToEdit }) => {
  const { handleSubmit, reset, control, watch } = useForm({
    defaultValues: {
      its: '',
      topics: '',
    },
  });
  const [options, setOptions] = useState([]);
  const [userDetails, setUserDetails] = useState({ name: '' }); // State to hold fetched user details

  const formReset = () => {
    reset();
    setUserDetails({ name: '' }); // Reset user details state
  };

  const getTopics = async () => {
    const url = '/api/topic-fetch';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setOptions(json.topic);
    } catch (e) {
      console.error(e);
      toast.error('Failed to fetch topics');
    }
  };

  const fetchUserByITS = async (its) => {
    try {
      const response = await fetch(`/api/fetch-user-by-its/${its}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const user = await response.json();
      setUserDetails(user.user); // Set fetched user details
    } catch (e) {
      console.error(e);
      toast.error('Failed to fetch user details');
    }
  };

  useEffect(() => {
    getTopics();
    const subscription = watch((value, { name, type }) => {
      if (name === 'its' && value.its.length === 8) {
        fetchUserByITS(value.its);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    const res = await fetch(`/api/tag-user-to-topic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      handleClose();
      toast.success('User updated');
    } else {
      toast.error('User not updated');
    }
  };

  const handleClose = () => {
    formReset();
    setOpen(false);
  };

  return (
    <Modal title="Topic Tagging" handleClose={handleClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="its"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              ITS Number
            </label>
            <Controller
              render={({ field }) => (
                <TextField {...field} label="ITS Number" variant="outlined" />
              )}
              name="its"
              control={control}
              rules={{ required: true, minLength: 8 }}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Name
            </label>
            <TextField
              value={userDetails.name}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="topics"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Topics
            </label>
            <Controller
              render={({ field }) => (
                <select
                  {...field}
                  className="shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:ring-2 focus:border-theme-color block w-full p-2.5"
                >
                  <option value="">Select Topic</option>
                  {options.map((topic, index) => (
                    <option key={index} value={topic.topic}>
                      {topic.topic}
                    </option>
                  ))}
                </select>
              )}
              name="topics"
              control={control}
              rules={{ required: true }}
              defaultValue=""
            />
          </div>
        </div>
        <div className="flex justify-end mt-10 pt-6 border-t border-gray-200 rounded-b">
          <button
            className="text-white bg-theme-color font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};
