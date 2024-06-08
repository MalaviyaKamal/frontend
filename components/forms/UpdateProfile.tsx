'use client'
import React, { useState } from "react";
import { useUpdateUserMutation } from "@/redux/features/authApiSlice";
import { Spinner } from "../common";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface UpdateProfileProps {
  user: any;
  onSuccess: () => void;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({ user, onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    image: user?.image || null,
  });

  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

// console.log("update rrsp err", error)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, files } = e.target;
  const newValue = e.target.type === "file" ? files?.[0] : value;
  setFormData({
    ...formData,
    [name]: newValue,
  });
};



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (formData.first_name) {
        // console.log("appendeing first namew")
        formDataToSend.append("first_name", formData.first_name);
      }
      if (formData.last_name) {
        formDataToSend.append("last_name", formData.last_name);
      }
      if (formData.image != null && typeof formData.image !== 'string') {
        formDataToSend.append("image", formData.image);
      }
  
      const response = await updateUser(formDataToSend);
      if ('error' in response) {
        // console.error("Error updating profile:", response.error);
        toast.error("Failed to update profile. Please try again.");
      } else {
        toast.success("Profile updated successfully");
        onSuccess();
      }
    } catch (error) {
      // console.error("Error updating profile:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="mt-1 block w-full py-1.5  px-2 rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="mt-1 block w-full py-1.5 px-2 pr-2 rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Image</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <Button type="submit" disabled={isLoading} className="mt-4 w-full">
        {isLoading ? <Spinner sm /> : "Update Profile"}
      </Button>
    </form>
  );
};

export default UpdateProfile;
