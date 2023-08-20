import React, { ReactNode } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

interface Props {
  panels: Iobject[];
  activeKey: string;
  children: ReactNode | JSX.Element;
  onChange: (key: string) => void;
}

function MyTabs({ panels, activeKey, children, onChange }: Props): JSX.Element {
  return (
    <Tabs defaultActiveKey={activeKey} onChange={onChange}>
      {panels.map((panel: Iobject) => (
        <TabPane tab={panel.name} key={panel.key}>
          {children}
        </TabPane>
      ))}
    </Tabs>
  );
}

export default MyTabs;
