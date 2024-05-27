// UpdateProfile.tsx
import React, { useState } from "react";
import { useUpdateUserMutation } from "@/redux/features/authApiSlice";
import { Spinner } from "../common";
import { Button } from "@/components/ui/button";

const UpdateProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    image: null, // Initialize image state to null
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleChange = (e) => {
    // Update image state when a file is selected
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0], // Store the selected file
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.first_name);
      formDataToSend.append("last_name", formData.last_name);
      formDataToSend.append("image", formData.image); // Append image data to FormData

      await updateUser(formDataToSend);
    } catch (error) {
      console.error("Error updating profile:", error);
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
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
