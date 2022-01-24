
import React, { useEffect } from 'react';
import {MapWrapper} from './style'
const Map = () => {
    //const {kakao}=window
    useEffect(()=>{
    //     console.log(kakao)
    // const container = document.querySelector(".kakako-map");

    // const options = {
    //   center: new kakao.maps.LatLng(33.450701, 126.570667),
    //   level: 13,
    // };
    // console.log(container)
    //const map = new kakao.maps.Map(container, options);
    // map.relayout()

    // console.log("loading kakaomap");
    },[])
    return (
        <MapWrapper className='kakao-map'>
            지도
        </MapWrapper>
        // <div className='kakao-map' style={{width:"400px",height:"400px"}}></div>
    );
};

export default Map;