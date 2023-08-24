import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    // Seed Token，影响范围大
    colorPrimary: '#00b96b',
    colorBgLayout: '#f5f5f5',
    borderRadius: 4,
    // 派生变量，影响范围小
    // colorBgContainer: '#f6ffed',
  },
  components: {
    Button: { size: 12 },
  },
};
