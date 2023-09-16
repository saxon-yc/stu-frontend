import React, { useEffect, useRef } from 'react';
import AMap from 'utils/amap';

interface Props {
  width?: string | number;
  height?: string | number;
  address: string;
}

export default function MapComponent({ width = 400, height = 300, address }: Props): JSX.Element {
  const amap = useRef<any>(null);
  useEffect(() => {
    const Amap = new AMap();
    amap.current = Amap;
  }, []);
  useEffect(() => {
    amap.current && amap.current.setAddress(address);
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
