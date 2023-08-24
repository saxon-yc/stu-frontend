import React, { ReactNode } from 'react';
import { Card, DatePicker, Input, Select, Space } from 'antd';

const { Search } = Input;
const { RangePicker } = DatePicker;

interface Props {
  params: QueryParams;
  children: ReactNode | JSX.Element;
  placeholder: string;
  showSelector?: boolean;
  showDatePicker?: boolean;
  onChangeQuery: (params?: {}) => void;
}

export default function QueryForm({
  params,
  children,
  placeholder,
  showSelector = false,
  showDatePicker = true,
  onChangeQuery,
}: Props): JSX.Element {
  return (
    <Card
      style={{
        marginBottom: '24px',
      }}
      bodyStyle={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <Space size={[24, 24]} wrap>
          <Search
            style={{ width: 240 }}
            allowClear
            placeholder={placeholder}
            onSearch={(val: string) => onChangeQuery({ search_word: val })}
          />
          {showSelector && <Select />}
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
      <div style={{ marginLeft: 'auto' }}>{children}</div>
    </Card>
  );
}
