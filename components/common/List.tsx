// components/common/List.tsx
"use client"
import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/common";
import { useTheme } from "next-themes";
import { useUpdateUserMutation } from "@/redux/features/authApiSlice";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Config {
  label: string;
  value: string | undefined;
}

interface Props {
  config: Config[];
  user: any; // Add user prop
}

export default function List({ config, user }: Props) {
  const { theme } = useTheme();
  const router = useRouter();
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
	  toast.success("Profile updated successfully"); // Show success toast

    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

//   useEffect(()=>{
// 	if(isLoading){
// 	  toast.success("Profile updated successfully");
// 	//   setFormData.image(updateUser.image)
// 	  router.push("/dashboard");
// 	}
//   },[isLoading]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ul
        role="list"
        className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-100"}`}
      >
        {config.map(({ label, value }) => (
          <li key={label} className="flex justify-between gap-x-6 py-5">
            <div>
              <p
                className={`text-sm font-semibold leading-6 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {label}
              </p>
            </div>
            <div>
              {label === "Image" ? (
                value ? (
                  <div className="ml-100 flex flex-col justify-center">
					<div className="flex flex-row justify-center">
                    <img src={formData.image} alt="Profile" className="flex w-28 aspect-square object-cover rounded-full justify-center " />
					</div>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleChange}
                      className="mt-5 inline-block w-56  rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                ) : (
                  <Spinner sm />
                )
              ) : label === "First Name" ? (
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1 block w-full text-center rounded-md bg-slate-600 border-gray-300 shadow-sm"
                />
              ) : label === "Last Name" ? (
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-1 block w-full text-center rounded-md bg-slate-600 border-gray-300 shadow-sm"
                />
              ) : (
                <p
                  className={`text-sm font-semibold leading-6 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {value || <Spinner sm />}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Button type="submit" disabled={isLoading} className="mt-4 w-full">
        {isLoading ? <Spinner sm /> : "Update Profile"}
      </Button>
    </form>
  );
}
