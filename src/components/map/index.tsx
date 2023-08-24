import React, { useEffect, useRef } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

interface Props {
  width?: string | number;
  height?: string | number;
}

export default function MapComponent({ width = 400, height = 300 }: Props): JSX.Element {
  const map = useRef(null);
  useEffect(() => {
    AMapLoader.load({
      key: '6fd1734a7f0688acd45b31df1eec077f', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map.current = new AMap.Map('map-container', {
          // 设置地图容器id
          viewMode: '3D', // 是否为3D地图模式
          zoom: 5, // 初始化地图级别
          center: [105.602725, 37.076636], // 初始化地图中心点位置
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div
      id='map-container'
      className='map'
      style={{ width: `${width}px`, height: `${height}px` }}
    ></div>
  );
}
