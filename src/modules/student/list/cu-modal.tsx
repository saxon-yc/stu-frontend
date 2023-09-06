import React, { useEffect, useState } from 'react';
import { Form, Modal, Input, Select, InputNumber } from 'antd';
import { GENDER } from 'constants/index';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface Props {
  title: string;
  visible: boolean;
  editorRow: { [key: string]: any };
  tags: Iobject[];
  onSubmit: (params: { [key: string]: any }) => void;
  handleCancel: () => void;
}

export default function CreateUpdateModal({
  title,
  visible,
  editorRow,
  tags,
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
        <Form.Item name='name' label='姓名' rules={[{ required: true, max: 32 }]}>
          <Input placeholder={'请输入姓名'} />
        </Form.Item>
        <Form.Item name='age' label='年龄' rules={[{ required: true }]}>
          <InputNumber
            placeholder={'年龄'}
            min={3}
            max={100}
            value={form.getFieldValue('age') || 3}
            onChange={(age) => {
              form.setFieldsValue({ age });
            }}
          />
        </Form.Item>
        <Form.Item name='gender' label='性别' rules={[{ required: true }]}>
          <Select
            style={{ minWidth: '120px' }}
            allowClear
            options={GENDER}
            value={form.getFieldValue('gender')}
            placeholder={'请选择性别'}
            onChange={(gender) => {
              form.setFieldsValue({ gender });
            }}
          />
        </Form.Item>
        <Form.Item name='tags' label='标签' rules={[{ required: true }]}>
          <Select
            style={{ minWidth: '120px' }}
            mode='multiple'
            allowClear
            options={tags}
            value={form.getFieldValue('tags')}
            placeholder={'请选择标签'}
            onChange={(tags, options) => {
              form.setFieldsValue({
                tags,
              });
            }}
          />
        </Form.Item>
        <Form.Item name='address' label='地址' rules={[{ required: true }]}>
          <Input placeholder={'请输入家庭地址'} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
