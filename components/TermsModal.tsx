import React from "react";
import { Button } from "@/components/ui/button";

type TermsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
};

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-md p-6 w-1/2">
        <h2 className="text-xl text-gray-700 font-bold mb-4">Terms and Conditions</h2>
        <p className="mb-4 text-gray-700">
          Please read and accept our terms and conditions to proceed with the upgrade:
        </p>
        <ul className="list-disc list-inside mb-4 items-start text-gray-700">
          <li><strong>Unlimited Generations:</strong> Access to generate unlimited courses without any restrictions.</li>
          <li><strong>Chat with PDF:</strong> Ability to interact with and extract information from PDF documents.</li>
          <li><strong>24/7 Support:</strong> Round-the-clock customer support to assist you with any issues or inquiries.</li>
          <li><strong>Billing and Payment:</strong> Your subscription will be billed monthly. Ensure your payment information is up-to-date.</li>
          <li><strong>Cancellation Policy:</strong> You can cancel your subscription at any time. No refunds will be provided for the current billing period.</li>
          <li><strong>Usage Policy:</strong> The services provided are for your personal and educational use only. Misuse may result in termination of your subscription.</li>
          <li><strong>Privacy Policy:</strong> Your data will be handled in accordance with our privacy policy. We are committed to protecting your personal information.</li>
        </ul>
        <div className="flex justify-end">
          <Button onClick={onClose} className="mr-2">Cancel</Button>
          <Button onClick={onAccept} className="bg-blue-500 text-white">Accept</Button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
