import React, { useCallback, useEffect, useRef } from 'react';

import useAMap from 'hooks/use-amap';
interface Props {
  width?: string | number;
  height?: string | number;
  address: string;
}

export default function MapComponent({ width = 400, height = 300, address }: Props): JSX.Element {
  const { amap } = useAMap();
  const selectAddress = async (address: string) => {
    const Map = typeof amap === 'function' ? await amap() : amap;
    const marker = Map.Marker();
    console.log(address, Map);

    Map.plugin('AMap.Geocoder', () => {
      var geocoder = new Map.Geocoder({
        city: '成都', // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
      });

      var lnglat = [116.396574, 39.992706];

      geocoder.getAddress(lnglat, (status: string, result: Iobject) => {
        console.log({ address, result });
        if (status === 'complete' && result.geocodes.length) {
          var lnglat = result.geocodes[0].location;
          marker.setPosition(lnglat);
          Map.add(marker);
          Map.setFitView(marker);
        } else {
          console.error('根据地址查询位置失败');
        }
      });
    });
  };

  useEffect(() => {
    selectAddress(address);
  }, [address]);

  return (
    <div
      id='map-container'
      className='map'
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : width,
        boxShadow: '0 2px 10px 0 rgba(14,33,39,.2)',
      }}
    />
  );
}
