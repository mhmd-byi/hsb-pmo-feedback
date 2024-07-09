'use client';

import { useEffect } from 'react';
import { useUserSolutions } from './useUserSolutions';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Toaster } from 'react-hot-toast';

export default function UserSolutions() {
  const userId = localStorage.getItem('userId');
  const { fetchUsers, user, onSubmit, control, handleSubmit, fetchUserProblems, userProblems, } = useUserSolutions(userId);
  useEffect(() => {
    fetchUsers();
  }, [userId]);

  useEffect(() => {
    fetchUserProblems();
  }, [user]);



  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold bg-[#EFF3FA] rounded-lg text-theme-color">
        User dashboard
      </h1>

      <span className="text-lg font-medium">
        Name: {user?.user?.name || 'user'}
      </span>

      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="problems"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Your reported problems, please select on which you are giving feedback
            </label>
            <Controller
              render={({ field }) => (
                <select
                  {...field}
                  className="shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:ring-2 focus:border-theme-color block w-1/2 p-2.5 mb-6"
                >
                  <option value="">Select Feedback Topic</option>
                  {userProblems?.problems?.map((prob, index) => (
                    <option key={index} value={prob._id}>
                      {prob.problem}
                    </option>
                  ))}
                </select>
              )}
              name="problemId"
              control={control}
              rules={{ required: true }}
              defaultValue=""
            />
          </div>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="solution"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Provide a solutions/suggestion
            </label>
            <Controller
              render={({ field }) => (
                <TextField {...field} rows={10} multiline={true} fullWidth />
              )}
              name="solution"
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
            Submit
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
