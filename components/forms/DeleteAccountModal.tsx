// components/DeleteAccountModal.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/common/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Confirm Account Deletion</h2>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} className="bg-gray-300 text-gray-900">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-red-600 text-white">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
