// style
import styled from 'styled-components'
// router
import { useNavigate } from 'react-router-dom';
// kakao map
import { Map, MarkerClusterer, MapMarker } from 'react-kakao-maps-sdk'
import { useState } from 'react';
// img
import marker1 from 'assets/image/common/marker/marker (1).svg';
import marker2 from 'assets/image/common/marker/marker (2).svg';
import marker3 from 'assets/image/common/marker/marker (3).svg';
import marker4 from 'assets/image/common/marker/marker (4).svg';
import marker5 from 'assets/image/common/marker/marker (5).svg';
import marker6 from 'assets/image/common/marker/marker (6).svg';
import marker7 from 'assets/image/common/marker/marker (7).svg';
import marker8 from 'assets/image/common/marker/marker (8).svg';
import marker9 from 'assets/image/common/marker/marker (9).svg';
import marker10 from 'assets/image/common/marker/marker (10).svg';
import marker11 from 'assets/image/common/marker/marker (11).svg';
import marker12 from 'assets/image/common/marker/marker (12).svg';
import marker13 from 'assets/image/common/marker/marker (13).svg';
import marker14 from 'assets/image/common/marker/marker (14).svg';
import marker15 from 'assets/image/common/marker/marker (15).svg';
import marker16 from 'assets/image/common/marker/marker (16).svg';
import marker17 from 'assets/image/common/marker/marker (17).svg';
import marker18 from 'assets/image/common/marker/marker (18).svg';
import marker19 from 'assets/image/common/marker/marker (19).svg';
import marker20 from 'assets/image/common/marker/marker (20).svg';

const markers = [
  marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8, marker9, marker10,
  marker11, marker12,  marker13, marker14, marker15, marker16, marker17, marker18, marker19,
  marker20,
]

const MapContainer = styled.section`
  .sample_map{
    display: block;
    width: clamp(30rem, 100%, 60rem);
    margin: 0 auto;
  }
`

function ShowMap(props){
  const navigate = useNavigate();

  const mapData = props?.mapData ?? [];
  const [ whichInfoShow, setWhichInfoShow ] = useState(-1);

  return (
    <MapContainer>
      {
        mapData?.length==0 &&
        <p style={{ textAlign: 'center' }}>데이터가 없습니다</p>
      }
      {
        mapData?.length>=1 &&
        <Map
          center={{ lat: 35.8, lng: 127.6358 }}
          level={13}
          style={{
            width: "100%",
            height: "600px",
            margin: "0 auto",
            borderRadius: "var(--border-radius-mid)",
            backgroundColor: "var(--loading-color)",
            boxShadow: "var(--box-shadow02)"
          }}
        >
          <MarkerClusterer
            averageCenter={true}
            minLevel={12}
          >
            {
              mapData?.map((spot, i) => (
                <MapMarker
                  key={spot.id}
                  position={{ lat: spot.latitude, lng: spot.longitude }}
                  image={{
                    src: i<20 ? markers[i] : require(`assets/image/common/marker/marker.svg`).default, // 마커이미지
                    size: { width: 30, height: 40 },
                  }}
                  clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록
                  onClick={()=>navigate(`/spot/${spot.id}`)}
                  onMouseOver={() => setWhichInfoShow(i)}
                  onMouseOut={() => setWhichInfoShow(-1)}
                >
                  { i==whichInfoShow &&
                    <div
                      style={{
                        padding: "5px",
                        fontSize: "var(--fontSize-small)" 
                      }}
                    >
                      {spot.name}
                    </div>
                  }
                </MapMarker>
              ))
            }
          </MarkerClusterer>
        </Map>
      }
    </MapContainer>
  )
}

export default ShowMap;