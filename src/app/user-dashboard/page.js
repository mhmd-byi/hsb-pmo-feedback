'use client';

import { useEffect } from 'react';
import { useUserDashboard } from './useUserDashboard';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Toaster } from 'react-hot-toast';

export default function UserDashboard() {
  const userId = localStorage.getItem('userId');
  const { fetchUsers, user, onSubmit, control, handleSubmit, fetchTopic, topic } =
    useUserDashboard(userId);
  useEffect(() => {
    fetchUsers();
  }, [userId]);

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

      {user?.user?.topics.length > 0 ? (
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="problem"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Report problem
              </label>
              <Controller
                render={({ field }) => (
                  <TextField {...field} rows={10} multiline={true} fullWidth />
                )}
                name="problem"
                control={control}
                rules={{ required: true }}
                defaultValue=""
              />
            </div>
          </div>
          <div className="flex justify-start mt-10 pt-6 border-t border-gray-200 rounded-b">
            <button
              className="text-white bg-theme-color font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Report
            </button>
          </div>
        </form>
      ) : (
        <div className="text-lg font-medium">No topics assigned yet</div>
      )}
      <Toaster />
    </div>
  );
}
