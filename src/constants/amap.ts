import { crypto } from 'utils/crypto';

export const AMapConfig = {
  key: crypto.decrypt(
    '51d0381cdca0b1175eda9cc678cc7a146f50faccecbe33f87f503e4c94bca5463d73148c9c84e8fef13c86ce51b42252',
  ),
  version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  AMapUI: {
    version: '1.1',
    plugins: [],
  },
};

export const AMapContainer = {
  // 设置地图容器id
  zoom: 15,
  resizeEnable: true,
  viewMode: '3D', // 是否为3D地图模式
  center: [104.063452, 30.568792], // 初始化地图中心点位置
};
