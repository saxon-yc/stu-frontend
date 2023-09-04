import React, { useEffect, useState } from 'react';
import { Form, Modal, Input } from 'antd';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface Props {
  title: string;
  visible: boolean;
  editorRow: { [key: string]: any };
  onSubmit: (params: { [key: string]: any }) => void;
  handleCancel: () => void;
}

export default function CreateUpdateModal({
  title,
  visible,
  editorRow,
  onSubmit,
  handleCancel,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(visible ? editorRow : {});
  }, [visible, editorRow]);

  const onReset = () => {
    form.resetFields();
    handleCancel();
  };
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values, editorRow);
      onSubmit({ ...editorRow, ...values });
      onReset();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <Modal title={title} open={visible} onOk={onCheck} onCancel={onReset}>
      <Form {...layout} form={form} name='control-hooks' style={{ maxWidth: 600 }}>
        <Form.Item name='label' label='标签名' rules={[{ required: true, max: 32 }]}>
          <Input />
        </Form.Item>
        <Form.Item name='content' label='标签描述' rules={[{ required: true, max: 500 }]}>
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
