import React, { ReactNode } from 'react';
import { Card, DatePicker, Input, Space } from 'antd';

const { Search } = Input;
const { RangePicker } = DatePicker;

interface Props {
  queryParams: Iobject;
  children: ReactNode | JSX.Element;
  placeholder: string;
  showDatePicker?: boolean;
  selector?: ReactNode | JSX.Element;
  onChangeQuery: (params?: {}) => void;
}

export default function QueryForm({
  queryParams,
  children,
  placeholder,
  showDatePicker = true,
  selector,
  onChangeQuery,
}: Props): JSX.Element {
  return (
    <Card
      style={{
        marginBottom: '20px',
      }}
      bodyStyle={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <Space size={[20, 20]} wrap>
          <Search
            style={{ width: 240 }}
            allowClear
            placeholder={placeholder}
            onSearch={(search_word) => {
              console.error('test');
              onChangeQuery({ search_word });
            }}
          />
          {selector && selector}
          {showDatePicker &&
            React.createElement(RangePicker, {
              showTime: true,
              format: 'YYYY-MM-DD HH:mm:ss',
              placeholder: ['开始时间', '结束时间'],
              onChange: (dates, dateStrins) => {
                onChangeQuery({
                  start_time: dateStrins[0],
                  end_time: dateStrins[1],
                });
              },
            })}
        </Space>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <Space size={[20, 20]} wrap>
          {children}
        </Space>
      </div>
    </Card>
  );
}
