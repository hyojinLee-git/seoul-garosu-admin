
import React, { useEffect } from 'react';
import {MapWrapper} from './style'
const Map = () => {
    const {kakao}=window
    useEffect(()=>{
    const container = document.querySelector(".kakao-map");

    const options = {
      center: new kakao.maps.LatLng(37.5445871268336, 127.03536045538364),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition= new kakao.maps.LatLng(37.5445871268336, 127.03536045538364); 
    const marker = new kakao.maps.Marker({
        position: markerPosition
        });
    marker.setMap(map);

    },[kakao.maps.LatLng, kakao.maps.Map, kakao.maps.Marker])
    return (
        <MapWrapper className='kakao-map'>
            지도
        </MapWrapper>
    );
};

export default Map;