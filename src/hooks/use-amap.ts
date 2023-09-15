import React, { useEffect, useRef } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

export default function useAMap() {
  const amap = useRef<Iobject>();
  const initMap = async () => {
    const AMap = await AMapLoader.load({
      key: '6fd1734a7f0688acd45b31df1eec077f', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        version: '1.1',
        plugins: [],
      },
    });

    const containter = new AMap.Map('map-container', {
      // 设置地图容器id
      resizeEnable: true,
      viewMode: '3D', // 是否为3D地图模式
      center: [104.063452, 30.568792], // 初始化地图中心点位置
    });
    amap.current = AMap;
    return AMap;
  };

  useEffect(() => {
    initMap();
  }, []);
  return {
    amap: amap.current || initMap(),
  };
}
