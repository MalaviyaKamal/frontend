import React from "react";
import { Button } from "@/components/ui/button";
import UpdateProfile from "./UpdateProfile";

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    first_name?: string;
    last_name?: string;
    image?: string;
  };
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ isOpen, onClose, user }) => {
  const handleSuccess = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-slate-500 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-900 bg-slate-300 w-6 h-6 hover:text-gray-600 focus:outline-none flex items-center justify-center rounded-full"
        >
          <span className="text-sm">&times;</span>
        </Button>
        <h2 className="text-lg font-medium mb-4  text-grey-900">Update Profile</h2>
        <UpdateProfile user={user} onSuccess={handleSuccess}  />
      </div>
    </div>
  );
};

export default UpdateProfileModal;
