import React, { useEffect, useState } from 'react';
import { Button, Card, Popconfirm, Table } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import type { ColumnsType } from 'antd/es/table';

import { QUERY_PARAMS } from 'constants/index';
import { TAGS } from 'constants/columns';

import { QueryForm } from 'components/index';
import CreateUpdateModal from './cu-modal';
import { addNotice, deleteNotice, getNotices } from 'apis/index';
import { theme } from 'constants/theme';

export default function NoticeManagement(): JSX.Element {
  const [queryParams, setQueryParams] = useState<QueryParams>(QUERY_PARAMS);
  const onChangeQueryParams = (params = {}) => {
    console.log(params);
    setQueryParams({
      ...queryParams,
      ...params,
    });
    fetchNotices(params);
  };
  const fetchNotices = async (params = {}) => {
    const res: Iobject = await getNotices({ ...queryParams, ...params });
    if (res.code === 0) {
      setNotices(res.data);
    }
  };
  const [notices, setNotices] = useState([
    {
      id: '1',
      tag_name: '龋齿',
      tag_description: '牙齿有问题',
      bind_number: 32,
      create_time: Date.now(),
    },
    {
      id: '2',
      tag_name: '龋齿',
      tag_description: '牙齿有问题',
      bind_number: 32,
      create_time: Date.now(),
    },
  ]);
  useEffect(() => {
    fetchNotices();
  }, []);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [type, setType] = useState('add');
  const [editorRow, setEditorRow] = useState({});
  const handleShowModal = (type: 'add' | 'edtior', row = {}) => {
    setType(type);
    setIsVisibleModal(true);
    setEditorRow(row);
  };
  const handleCancel = () => {
    setEditorRow({});
    setIsVisibleModal(false);
  };
  const onSumbit = async (params = {}) => {
    const res: Iobject = await addNotice(params);

    if (res.code === 0) {
      fetchNotices(QUERY_PARAMS);
    }
    handleCancel();
  };
  const onDelete = async (id = '') => {
    const res: Iobject = await deleteNotice({ id });
    if (res.code === 0) {
      fetchNotices(QUERY_PARAMS);
    }
  };

  const columns = TAGS.map((item) => {
    switch (item.key) {
      case 'operator':
        item.render = (filed, row) => {
          return (
            <>
              <Button type='text' size='small' onClick={() => handleShowModal('edtior', row)}>
                <EditOutlined style={{ color: theme.token?.colorPrimary }} />
              </Button>
              <Button type='text' size='small' onClick={() => handleShowModal('edtior', row)}>
                复制
              </Button>
              <Popconfirm
                title='删除标签'
                description={`是否要删除「${row.tag_name}」`}
                okType='danger'
                okText='删除'
                cancelText='取消'
                onConfirm={() => onDelete(row.id)}
              >
                <Button type='text' danger size='small' onClick={() => {}}>
                  删除
                </Button>
              </Popconfirm>
            </>
          );
        };
        break;

      default:
        break;
    }
    return item;
  });

  return (
    <>
      <QueryForm placeholder='请输入标签名/id' onChangeQuery={debounce(onChangeQueryParams, 100)}>
        <Button type='primary' onClick={() => handleShowModal('add')}>
          <PlusOutlined />
          新建通知
        </Button>
      </QueryForm>
      <Card>
        <Table dataSource={notices} columns={columns} />
      </Card>
      <CreateUpdateModal
        title={type === 'add' ? '新增标签' : '编辑标签'}
        visible={isVisibleModal}
        editorRow={editorRow}
        onSubmit={onSumbit}
        handleCancel={handleCancel}
      />
    </>
  );
}
