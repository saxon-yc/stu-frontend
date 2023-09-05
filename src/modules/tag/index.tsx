import React, { useEffect, useState } from 'react';
import { Button, Card, Popconfirm, Table, Tooltip, message } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import dayjs from 'dayjs';

import { QUERY_PARAMS } from 'constants/index';
import { TAGS } from 'constants/columns';

import { QueryForm } from 'components/index';
import CreateUpdateModal from './cu-modal';
import { addTag, deleteTag, getTags, updateTag } from 'apis/index';
import { theme } from 'constants/theme';

export default function TagManagement(): JSX.Element {
  const [queryParams, setQueryParams] = useState<QueryParams>(QUERY_PARAMS);
  const onChangeQueryParams = (params = {}) => {
    console.log(params);
    setQueryParams({
      ...queryParams,
      ...params,
    });
    fetchTags(params);
  };
  const fetchTags = async (params = {}) => {
    const res: Iobject = await getTags({ ...queryParams, ...params });
    if (res.code === 0) {
      const { list, total_count } = res.data;
      setTags(list);
      setTotalCount(total_count);
    }
  };
  const [totalCount, setTotalCount] = useState(0);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    fetchTags();
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
  const onSumbit = async (params: Iobject) => {
    const res: Iobject =
      type === 'add'
        ? await addTag(params)
        : await updateTag({ id: params.id, content: params.content });
    console.log(res);

    if (res.code === 0) {
      fetchTags(QUERY_PARAMS);
      message.success(res.msg);
    } else {
      message.error(res.msg);
    }
    handleCancel();
  };
  const onDelete = async (id = '') => {
    const res: Iobject = await deleteTag({ id });
    if (res.code === 0) {
      fetchTags(QUERY_PARAMS);
      message.success(res.msg);
    } else {
      message.error(res.msg);
    }
  };

  const columns = TAGS.map((item) => {
    switch (item.key) {
      case 'content':
        item.render = (filed) => <Tooltip title={filed}>{filed}</Tooltip>;
        break;
      case 'create_time':
        item.render = (filed) => dayjs(filed).format('YYYY-MM-DD HH:mm:ss');
        break;
      case 'operator':
        item.render = (filed, row) => {
          return (
            <>
              <Button type='text' size='small' onClick={() => handleShowModal('edtior', row)}>
                <EditOutlined style={{ color: theme.token?.colorPrimary }} />
              </Button>
              <Popconfirm
                title='删除标签'
                description={`是否要删除「${row.label}」`}
                okType='danger'
                okText='删除'
                cancelText='取消'
                onConfirm={() => onDelete(row.id)}
              >
                <Button type='text' danger size='small'>
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
      <QueryForm placeholder='请输入标签名' onChangeQuery={debounce(onChangeQueryParams, 100)}>
        <Button type='primary' onClick={() => handleShowModal('add')}>
          <PlusOutlined />
          新增标签
        </Button>
      </QueryForm>
      <Card>
        <Table
          key={'id'}
          dataSource={tags}
          columns={columns}
          pagination={{
            total: totalCount,
            showSizeChanger: totalCount > 10,
            current: Math.floor(queryParams.offset / queryParams.limit + 1),
            pageSize: queryParams.limit,
            showTotal: (total) => `总计：${total} 个`,
            onChange: (page, pageSize) =>
              fetchTags({ offset: (page - 1) * pageSize, limit: pageSize }),
            onShowSizeChange: (_, size) => fetchTags({ offset: 0, limit: size }),
          }}
        />
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
