import AMapLoader from '@amap/amap-jsapi-loader';
import { AMapConfig, AMapContainer } from 'constants/amap';
import { crypto } from './crypto';

window._AMapSecurityConfig = {
  securityJsCode: crypto.decrypt(
    '8ee0568544d445584f25cecef1052087a14e37e9fa0219df37307c047bc6ac8f505a87c0440ea9d14960d6c4fce2df08',
  ),
};
export default class AMap {
  constructor() {
    this.AMap = null;
    this.map = null;
    this.onLoadMap();
  }

  async onLoadMap() {
    this.AMap = await AMapLoader.load(AMapConfig);
    this.map = new this.AMap.Map('map-container', AMapContainer);
  }

  setAddress(address) {
    const AMap = this.AMap;

    if (address && AMap) {
      const marker = new AMap.Marker();

      AMap.plugin('AMap.Geocoder', () => {
        const geocoder = new AMap.Geocoder({ city: '成都' });
        geocoder.getLocation(address, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            const lnglat = result.geocodes[0].location;
            marker.setPosition(lnglat);
            this.map.add(marker);
            this.map.setFitView(marker);
          } else {
            console.error('根据地址查询位置失败');
          }
        });
      });
    }
  }
}
