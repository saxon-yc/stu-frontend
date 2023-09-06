import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Card, Select, Table, Tag, message } from 'antd';
import { EditOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

import { theme } from 'constants/theme';
import { GENDER, QUERY_PARAMS } from 'constants/index';
import { STUDENTS } from 'constants/columns';
import { addStudent, deleteStudent, getStudents, getTags, updateStudent } from 'apis/index';

import { QueryForm } from 'components/index';
import CreateUpdateModal from './cu-modal';

export default function StudentList(): JSX.Element {
  const history = useHistory();

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
        ? await addStudent(params)
        : await updateStudent({ id: params.id, content: params.content });

    if (res.code === 0) {
      fetchStudents(QUERY_PARAMS);
      message.success(res.msg);
    } else {
      message.error(res.msg);
    }
    handleCancel();
  };
  const onDelete = async (id = '') => {
    const res: Iobject = await deleteStudent({ id });
    if (res.code === 0) {
      fetchTags(QUERY_PARAMS);
      message.success(res.msg);
    } else {
      message.error(res.msg);
    }
  };

  const [selectedTags, setSelectedTags] = useState([]);
  const [queryParams, setQueryParams] = useState({ ...QUERY_PARAMS, tags: [], gender: undefined });
  const onChangeQueryParams = (params = {}) => {
    setQueryParams({
      ...queryParams,
      ...params,
    });
    fetchStudents(params);
  };

  const fetchTags = async (params = {}) => {
    const res: Iobject = await getTags({ ...queryParams, ...params });
    if (res.code === 0) {
      const { list } = res.data;
      setTags(list.map((tag: Iobject) => ({ id: tag.id, value: tag.label })));
    }
  };
  const [tags, setTags] = useState([]);

  const fetchStudents = async (params = {}) => {
    const res: Iobject = await getStudents({ ...queryParams, ...params });
    if (res.code === 0) {
      setStudents(res.data);
    }
  };
  const [students, setStudents] = useState({ list: [], totalCount: 0 });
  useEffect(() => {
    fetchStudents();
    fetchTags();
  }, []);

  const columns = STUDENTS.map((item) => {
    switch (item.key) {
      case 'gender':
        item.render = (filed) => GENDER.find(({ value }) => value === filed)?.label;
        break;
      case 'tags':
        item.render = (filed: [], row) => {
          return filed.map((tag) => <Tag>{tag}</Tag>);
        };
        break;
      case 'operator':
        item.render = (filed, row) => {
          return (
            <>
              <Button type='text' size='small' onClick={() => {}}>
                <EditOutlined style={{ color: theme.token?.colorPrimary }} />
              </Button>
              <Button type='link' size='small' onClick={() => history.push(`/student/${row.id}`)}>
                详情
              </Button>
              {/* <Popconfirm
                title='删除标签'
                description={`是否要删除「${row.student_name}」`}
                okType='danger'
                okText='删除'
                cancelText='取消'
                onConfirm={() => onDelete(row.id)}
              >
                <Button type='text' danger size='small' onClick={() => {}}>
                  删除
                </Button>
              </Popconfirm> */}
            </>
          );
        };
        break;

      default:
        break;
    }
    return item;
  });

  const onExport = () => {};

  return (
    <>
      <QueryForm
        placeholder='请输入学生姓名/学号'
        onChangeQuery={debounce(onChangeQueryParams, 100)}
        showDatePicker={false}
        selector={
          <>
            <Select
              style={{ minWidth: '120px' }}
              allowClear
              options={GENDER}
              value={queryParams.gender}
              placeholder={'请选择性别'}
              onChange={(gender) => {
                onChangeQueryParams({
                  gender,
                });
              }}
            />
            <Select
              style={{ minWidth: '120px' }}
              mode='multiple'
              allowClear
              options={tags}
              value={selectedTags}
              placeholder={'请选择标签'}
              onChange={(val, options: any) => {
                setSelectedTags(val);
                onChangeQueryParams({
                  tags: options.map(({ value }: Iobject) => value).join(','),
                });
              }}
            />
          </>
        }
      >
        <Button type='primary' onClick={() => handleShowModal('add')}>
          <PlusOutlined />
          新增学生
        </Button>
        <Button onClick={() => onExport()}>
          <DownloadOutlined />
          导出学生信息
        </Button>
      </QueryForm>
      <Card>
        <Table
          dataSource={students.list}
          columns={columns}
          pagination={{
            total: students.totalCount,
            showSizeChanger: students.totalCount > 10,
            current: Math.floor(queryParams.offset / queryParams.limit + 1),
            pageSize: queryParams.limit,
            showTotal: (total) => `总计：${total} 个`,
            onChange: (page, pageSize) =>
              fetchStudents({ offset: (page - 1) * pageSize, limit: pageSize }),
          }}
        />
      </Card>
      <CreateUpdateModal
        title={type === 'add' ? '新增学生' : '编辑学生'}
        visible={isVisibleModal}
        editorRow={editorRow}
        tags={tags}
        onSubmit={onSumbit}
        handleCancel={handleCancel}
      />
    </>
  );
}
