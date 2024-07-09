"use client";

import { Modal } from "@/components/Modal";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const UserModal = ({ open, setOpen, userToEdit }) => {
  const { handleSubmit, reset, control } = useForm();

  const formReset = () => {
    reset({
      its: "",
      name: "",
      role: "",
    });
  };
  useEffect(() => {
    if (userToEdit) {
      reset(userToEdit);
    } else {
      formReset();
    }
  }, [userToEdit]);

  const onSubmit = async (data) => {
    if (userToEdit) {
      // Update user
      const res = await fetch(`/api/update-user/${userToEdit.its}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        handleClose();
        toast.success("User updated");
      } else {
        toast.error("User not updated");
      }
    } else {
      // Create user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        handleClose();
        toast.success("Member added");
      } else {
        toast.error("Member not added");
      }
    }
  };

  const handleClose = () => {
    formReset();
    setOpen(false);
  };

  return (
    <Modal title={userToEdit ? "Edit Member" : "Add Member"} handleClose={handleClose} open={open}>
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
              render={({ field }) => <TextField {...field} />}
              name="its"
              control={control}
              rules={{ required: true }}
              defaultValue=""
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Name
            </label>
            <Controller
              render={({ field }) => <TextField {...field} />}
              name="name"
              control={control}
              rules={{ required: true }}
              defaultValue=""
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="role"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Role
            </label>
            <Controller
              render={({ field }) => (
                <select
                  {...field}
                  className="shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-theme-color focus:ring-2 focus:border-theme-color block w-full p-2.5"
                >
                  <option value="0">Select Options</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              )}
              name="role"
              control={control}
              rules={{ required: true }}
              defaultValue=""
            />
          </div>
        </div>
        <div className="flex justify-end mt-10 pt-6 border-t border-gray-200 rounded-b">
          <button
            className="text-white bg-theme-color font-medium  rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            {userToEdit ? "Update" : "Register"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
