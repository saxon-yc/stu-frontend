import React, { useEffect, useState } from 'react';
import { Form, Modal, Input, Select, InputNumber } from 'antd';
import { useWatch } from 'antd/es/form/Form';

import { GENDER } from 'constants/index';
import MapComponent from 'components/map';
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
  const [initialValues, setInitialValues] = useState<Iobject>({
    address: '',
    age: '',
    gender: '',
    name: '',
    tags: '',
  });
  const [form] = Form.useForm();
  const address = useWatch('address', form);

  useEffect(() => {
    setInitialValues(visible ? editorRow : {});
    // form.setFieldsValue(visible ? editorRow : {});
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
    <Modal width={600} title={title} open={visible} onOk={onCheck} onCancel={onReset}>
      <Form
        {...layout}
        form={form}
        initialValues={initialValues}
        name='control-hooks'
        style={{ maxWidth: 600 }}
      >
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
        <Form.Item name='tags' label='标签'>
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
          <Input allowClear placeholder={'请输入家庭地址'} />
        </Form.Item>
        <Form.Item label=' '>
          <MapComponent width='100%' address={address} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
