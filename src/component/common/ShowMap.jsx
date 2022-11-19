// style
import styled from 'styled-components'
// router
import { useNavigate } from 'react-router-dom';
// kakao map
import { Map, MarkerClusterer, MapMarker } from 'react-kakao-maps-sdk'
import { useState } from 'react';

const MapContainer = styled.section`
  .sample_map{
    display: block;
    width: clamp(30rem, 100%, 60rem);
    margin: 0 auto;
  }
`

function ShowMap(props){
  const navigate = useNavigate();

  const spots = props.spots ?? [];
  const [ whichInfoShow, setWhichInfoShow ] = useState(-1);

  return (
    <MapContainer>
      {
        spots.length==0 &&
        <p>데이터가 없습니다</p>
      }
      {
        spots.length>=1 &&
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
              spots.map((spot, i) => (
                <MapMarker
                  key={spot.id}
                  position={{ lat: spot.lat, lng: spot.lng }}
                  image={{
                    src: i<20 ? require(`assets/image/common/marker/marker (${i+1}).svg`) : require(`assets/image/common/marker/marker.svg`), // 마커이미지
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