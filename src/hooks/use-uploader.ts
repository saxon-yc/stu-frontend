import { message } from 'antd';
import { useState } from 'react';
import type { AxiosResponse } from 'axios';

interface UploadOptions {
  uploadAPI: (params: Iobject) => Promise<AxiosResponse<any, any>>;
}
export default function useUploader({ uploadAPI }: UploadOptions) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);

  const uploadFile = async (file: File) => {
    setProgress(0);
    setUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    const res: Iobject = await uploadAPI(formData);
    setUploading(false);

    const result = res.code === 0;
    result ? message.success(res.msg) : message.error(res.msg);
    return result;
  };

  return {
    uploading,
    progress,
    result,
    uploadFile,
  };
}
