import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    // Seed Token，影响范围大
    wireframe: false,
    colorPrimary: '#13C2C2',
    colorInfo: '#13C2C2',
    colorTextBase: '#1c3a3b',
    // colorTextBase: '#0a0a0a',
    borderRadius: 6,
    colorLink: '#1797ff',
    padding: 20,
    // 派生变量，影响范围小
    colorBgContainer: '#ffffff',
  },
  components: {},
};
