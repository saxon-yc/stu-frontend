import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

interface Props extends UploadProps {
  name?: string;
  placeholder: string;
  uploading: boolean;
  onCustomRequest: (info: Iobject) => void;
}
export default function UploadFile({
  name = 'file',
  placeholder = '上传文件',
  uploading,
  onCustomRequest,
}: Props) {
  const onChange = (info: Iobject) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <Upload name={name} onChange={onChange} customRequest={onCustomRequest} showUploadList={false}>
      <Button loading={uploading} icon={<UploadOutlined />}>
        {placeholder}
      </Button>
    </Upload>
  );
}
