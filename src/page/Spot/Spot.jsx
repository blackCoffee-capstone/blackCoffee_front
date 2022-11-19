// core
import { useState, useEffect } from 'react';
// router
import { useParams, redirect } from 'react-router-dom'
// style
import styled from 'styled-components'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper';
// kakao map
import { Map, MapMarker } from 'react-kakao-maps-sdk'
// sample data
import ListData from 'store/data/ListData.js'
// svg
import Loaction from 'assets/image/common/icon/loaction.svg'
import { ReactComponent as InstagramColor } from "assets/image/common/ci/instagram-color.svg";

const PageContainer = styled.section`
  .place_img{
    margin-top: 0;
    .img_swiper{
      height: 35rem;
      @media screen and (max-width: 600px) {
        height: clamp(30rem, 35vh, 60rem);
      }
      .swiper-pagination-bullet{
        border-radius: 0;
        width: 3rem;
        height: 3px;
      }
      .swiper-pagination-bullet-active{
        background-color: var(--primary-color);
        opacity: 0.8;
      }
      .swiper-slide{
        position: relative;
        overflow: hidden;
        img{
          position: absolute;
          top: 0;
          height: 100%;
          &:first-child{
            width: 100%;
            object-fit: cover;
            background-color: var(--loading-color);
            transform: scale(1.02);
          }
          &:last-child{
            width: auto;
            left: 50%;
            transform: translateX(-50%);
          }
          @media screen and (max-width: 600px) {
            &:first-child{
              display: none;
            }
            &:last-child{
              width: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
  .information{
    .c_title{
      margin-bottom: 2rem;
    }
    .c_inner{
      >div{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem 1rem;
        font-size: var(--font-size-large);
        margin-bottom: 1rem;
        h3{
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-weight: var(--font-w-bold);
        }
      }
      .loaction{
        flex-wrap: wrap;
        @media screen and (max-width: 600px) {
          font-size: var(--font-size-mid);
        }
        h3 {
          color: var(--primary-color);
          img{
            width: 2em;
            height: 2em;
          }
        }
      }
      .map{
        margin-bottom: var(--space-small);
      }
      .sns{
        flex-direction: column;
        h3{
          svg{
            width: 1.5em;
            height: 1.5em;
            margin-right: 1rem;
          }
        }
      }
    }
  }
`

function Spot(){
  const { spotId } = useParams();
  const [ spotData, setSpotData ] = useState([]);

  useEffect(()=>{
    // fetch data 들어갈곳
    setSpotData(ListData.find((el)=>el.id == spotId) ?? []);
  }, [])

  if(spotData.length==0) {
    return (
      <PageContainer className='c_main_section'>
        <section className='c_section'>
          <div className="c_inner">
            <h2 className='c_title'>데이터가 없습니다</h2>
          </div>
        </section>
      </PageContainer>
    )
  }

  return(
    <PageContainer className='c_main_section'>
      <section className="c_section place_img">
        { // 이미지 하나만 있을때
          spotData.images.length==1 &&
          <div className='img_swiper'>
            <div className='swiper-slide'>
              <img src={spotData.images[0]} alt={`${spotData.name} 이미지 1 배경`} style={{
                filter: "blur(5px)"
              }}/>
              <img src={spotData.images[0]} alt={`${spotData.name} 이미지 1`} />
            </div>
          </div>
        }
        { // 이미지 여러개면 swiper로
          spotData.images.length>1 &&
          <Swiper className='img_swiper'
            modules={[ Pagination, EffectFade ]}
            effect={"fade"}
            pagination={{ clickable: true }}
            loop
          >
            {
              spotData.images.map((el, i) => {
                return(
                  <SwiperSlide key={i}>
                    <img src={el} alt={`${spotData.name} 이미지 ${i+1} 배경`} style={{
                      filter: "blur(5px)"
                    }}/>
                    <img src={el} alt={`${spotData.name} 이미지 ${i}`} />
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        }
      </section>
      <section className='c_section information'>
        <div className="c_inner">
          <h2 className='c_title'>{spotData.name}</h2>
          <div className='loaction'>
            <h3><img src={Loaction} />위치</h3>
            <p>{spotData.location}</p>
          </div>
          <div className='map'>
            {
              <Map
                center={{ lat: spotData.lat, lng: spotData.lng }}
                level={4}
                style={{
                  width: "clamp(20rem, 100%, 80rem)",
                  height: "35rem",
                  margin: "0 auto",
                  borderRadius: "var(--border-radius-mid)"
                }}
              >
                <MapMarker position={{ lat: spotData.lat, lng: spotData.lng }}>
                  {/* <div style={{
                    padding: "5px",
                    textAlign: "center"
                  }}
                  >{spotData.name}</div> */}
                </MapMarker>
              </Map>
            }
          </div>
          <div className='sns'>
            <h3><InstagramColor />관련 SNS 포스팅</h3>
            <p>{spotData.detailSnsPost}</p>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}

export default Spot;