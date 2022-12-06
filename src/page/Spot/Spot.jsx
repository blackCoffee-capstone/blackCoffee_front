// core
import { useState, useEffect } from 'react';
// router
import { useParams } from 'react-router-dom'
// style
import styled from 'styled-components'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper';
// utils
import { numberFormat } from 'utils/formatting/numberFormat'
// kakao map
import { Map, MapMarker } from 'react-kakao-maps-sdk'
// api
import useAuthFetch from 'api/useAuthFetch'
// img
import Banner from 'assets/image/Spots/SpotBanner.jpg'
import Loaction from 'assets/image/common/icon/loaction.svg'
import NoPhoto from 'assets/image/common/no_photo.png'
import WishOn from 'assets/image/common/icon/wish_on.svg'
import Nearby from 'assets/image/common/icon/nearby.png'
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
        flex-direction: column;
        gap: 0.5rem 1rem;
        font-size: var(--font-size-large);
        margin-bottom: var(--space-small);
        h3{
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-weight: var(--font-w-bold);
        }
      }
      .loaction{
        flex-wrap: wrap;
        flex-direction: row;
        margin-bottom: 1rem;
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
      }
      .sns{
        h3{
          svg{
            width: 1.5em;
            height: 1.5em;
            margin-right: 1rem;
          }
        }
        .posts{
          padding: 1rem 0.5rem;
          .post{
            max-width: 33rem;
            padding: 1rem;
            border-radius: var(--border-radius-mid);
            box-shadow: var(--box-shadow03);
            a{
              display: block;
              .post_photo{
                width: 100%;
                height: 25rem;
                object-fit: cover;
  
                @media screen and (max-width: 600px){
                  height: 21rem;
                }
              }
              p{
                margin-top: 0.5rem;
                &.content_top{
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  span{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                  }
                  .date{
                    color: var(--font-color-sub);
                  }
                  img{
                    width: 2rem;
                    height: 2rem;
                  }
                }
                &.content{
                  font-size: var(--font-size-small);
                }
              }
            }
          }
        }
      }
      .nearby{
        h3{
          img{
            width: 2em;
            height: 2em;
            margin-right: 1rem;
          }
        }
        .facility{
          width: 100%;
          padding: 1rem 0.5rem;
          .facility_box{
            width: 20rem;
            min-height: 18rem;
            padding: 1.5rem;
            border-radius: var(--border-radius-mid);
            box-shadow: var(--box-shadow03);
            cursor: pointer;
            user-select: none;
            a{
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
              width: 100%;
              height: 100%;
              p{
                font-size: var(--font-size-small);
                color: var(--font-color-sub);
                &.category{
                  color: var(--primary-color-effect);
                }
                &.goto{
                  color: var(--font-color-default);
                }
              }
            }
          }
        }
      }
    }
  }
`

function Spot(){
  const { spotId } = useParams();

  const {
    data: spotData, 
    isLoading: isFilterLoading
  } = useAuthFetch({ url: `spots/${spotId}`, key: ['spot', spotId] });

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
        <Swiper className='img_swiper'
          modules={[ Pagination, EffectFade ]}
          effect={"fade"}
          pagination={{ clickable: true }}
          loop
        >
          { spotData?.detailSnsPost.length>=1 &&
            spotData?.detailSnsPost.map((el, i) => {
              return(
                <SwiperSlide key={el.id}>
                  <img src={el.photoUrl} alt={`${spotData.name} 이미지 ${i+1} 배경`} style={{
                    filter: "blur(5px)"
                  }}/>
                  <img src={el.photoUrl} alt={`${spotData.name} 이미지 ${i}`} />
                </SwiperSlide>
              )
            })
          }
          { (!spotData?.detailSnsPost || spotData.detailSnsPost.length==0) &&
            <SwiperSlide>
              <img src={Banner} alt='기본 배너 배경' style={{
                filter: "blur(5px)"
              }}/>
              <img src={Banner} alt='기본 배너 이미지' />
            </SwiperSlide>
          }
        </Swiper>
      </section>
      <section className='c_section information'>
        <div className="c_inner">
          <h2 className='c_title'>{spotData.name}</h2>
          <div className='loaction'>
            <h3><img src={Loaction} />위치</h3>
            <p>{spotData.address}</p>
          </div>
          <div className='map'>
            {
              <Map
                center={{ lat: spotData.latitude, lng: spotData.longitude }}
                level={5}
                style={{
                  width: "clamp(20rem, 100%, 80rem)",
                  height: "35rem",
                  margin: "0 auto",
                  borderRadius: "var(--border-radius-mid)"
                }}
              >
                <MapMarker position={{ lat: spotData.latitude, lng: spotData.longitude }}>
                </MapMarker>
              </Map>
            }
          </div>
          <div className='sns'>
            <h3><InstagramColor />관련 SNS 포스팅</h3>
            <Swiper className='posts'
              slidesPerView={"auto"}
              spaceBetween={spotData.detailSnsPost?.length==1 ? 0 : 10}
            >
              { spotData.detailSnsPost?.length>=1 &&
                spotData.detailSnsPost?.map((el, i) => {
                  return(
                    <SwiperSlide key={el.snsPostUrl} className='post'>
                      <a href={el.snsPostUrl} target="_blank" rel="noopener noreferrer">
                        <img className='post_photo' src={el.photoUrl} alt="" style={{
                          background: `url(${NoPhoto}) no-repeat center center / 100%`
                        }} />
                        <p className='content_top'>
                          <span className='date'>{el.date?.slice(0,10)}</span> <span><img src={WishOn} /> {numberFormat(el.likeNumber)}</span>
                        </p>
                        <p className='content'>{`${el.content.slice(0, 150)}${el.content.length>150 ? '...' : ''}`}</p>
                      </a>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </div>
          <div className="nearby">
            <h3><img src={Nearby} />근처 시설</h3>
            <Swiper className='facility'
              slidesPerView={"auto"}
              spaceBetween={10}
            >
              { 
                spotData.neaybyFacility?.map((el, i) => {
                  return(
                    <SwiperSlide key={i} className='facility_box'>
                      <a href={el.placeUrl} target="_blank" rel="noopener noreferrer">
                        <h4>{el.name}</h4>
                        <p>{el.address}</p>
                        <p className='category'>{el.category}</p>
                        <p className='goto'>자세히보기</p>
                      </a>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}

export default Spot;