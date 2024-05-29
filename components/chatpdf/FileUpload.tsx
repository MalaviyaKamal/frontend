"use client";
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Inbox } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useUploadpdfMutation } from '@/redux/features/chatpdfApiSlice';
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';

const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadpdf] = useUploadpdfMutation();

//   const { mutate, isLoading } = useMutation({
//     mutationFn: async ({ file_key, file_name }) => {
//       const response = await axios.post("/api/create-chat", {
//         file_key,
//         file_name,
//       });
//       return response.data;
//     },
//   });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) { // 10Mb above not upload file
        toast.error("File too large");
        return;
      }

      try {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        const data = await uploadpdf({ formData }).unwrap();
        console.log("api data resp",data)
        if (!data?.file_key || !data.file_name) {
          toast.error("File too large");
          return;
        }
        // mutate(data, {
        //   onSuccess: ({ chat) => {
        //     toast.success("Chat created!");
        //     router.push(`/chat/${chat_id}`);
        //   },
        //   onError: (err) => {
        //     toast.error("Error creating chat");
        //     console.error(err);
        //   },
        // });
      } catch (error) {
        toast.error("Error uploading file");
        console.error(error);
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className: "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-10 h-10 text-blue-500" />
          <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
        </>
      </div>
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default FileUpload;
