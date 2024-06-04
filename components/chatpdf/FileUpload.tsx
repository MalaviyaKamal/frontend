
"use client";
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Inbox } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useUploadPdfMutation} from '@/redux/features/chatpdfApiSlice';
import { Spinner } from '../common';

interface Chat {
  file_key: string;
  pdf_name: string;
  pdf_url: string;
}

const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadpdf, { isLoading: isUploading }] = useUploadPdfMutation();
  // const [createChat, { isLoading: isCreatingChat }] = useCreateChatMutation();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) { // 10Mb limit
        toast.error('File too large');
        return;
      }

      try {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        const data = await uploadpdf({ formData }).unwrap();
        console.log(data?.error)
        // if (!data?.id) {
        //   toast.error('Error not found');
        //   return;
        // }
        if(data?.error){
          toast.error(data.error);
          return;
        }
        console.log("bhdcjwbc",data)
        toast.success(data.message);
        router.push(`/chat/${data.id}`);

      } catch (error) {
        toast.error('Error uploading file',);
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
          className: 'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col',
        })}
      >
        <input {...getInputProps()} />
        {uploading || isUploading ?(
          <>
            <div className="flex justify-center my-8 text-blue-500">
             <Spinner lg />
           </div>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
