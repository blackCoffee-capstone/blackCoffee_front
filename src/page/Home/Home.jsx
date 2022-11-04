// hash-link
import { HashLink } from 'react-router-hash-link';
// style
import styled from 'styled-components'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper';

const PageContainer = styled.section`
  margin: 0;
  .c_section{
    margin: 0;
  }
  .main_banner{
    padding: 0;
    .swiper-pagination-bullet{
      border-radius: 0;
      width: 3.6rem;
      height: 4px;
    }
    .swiper-pagination-bullet-active{
      background-color: var(--primary-color);
      opacity: 0.8;
    }
    .banner_swiper{
      height: clamp(35rem, 100vh, 110rem);
      @media screen and ( max-width: 600px ) {
        &{ height: clamp(35rem, 80vh, 80rem); }
      }
      .swiper-slide{
        position: relative;
        height: 100%;
        .text_box{
          z-index: 1;
          position: absolute;
          top: 45%;
          left: max(2rem, calc((100% - var(--inner-width))/2));
          transform: translateY(-50%);
          width: var(--inner-width);
          max-width: 90%;
          color: #fff;
          word-break: keep-all;
          h2{
            font-size: 5.5rem;
            line-height: 1;
            font-family: 'Do Hyeon', sans-serif;
            @media screen and (max-width: 600px) {
              &{ font-size: 4.2rem; }
            }
          }
          p{
            font-size: var(--font-size-x-large);
            line-height: 1.3;
            @media screen and (max-width: 600px) {
              &{ font-size: var(--font-size-large); }
            }
          }
        }
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          background-color: var(--loading-color);
        }
      }
    }
  }
  &>[class*="service-"]{
    padding: var(--space-large) 0;
    &:nth-of-type(2n){
      background-color: var(--base-color-light);
    }
  }
  .zigzag{
    .c_inner{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-small) 2rem;
      @media screen and (max-width: 768px) {
        &{
          flex-direction: column;
          align-items: stretch;
        }
      }
      .textbox{
        word-break: keep-all;
        .service_title{
          margin-bottom: 0.1em;
          font-size: var(--font-size-xxx-large);
          font-weight: var(--font-w-bold);
          @media screen and (max-width: 600px) {
            &{
              font-size: var(--font-size-xx-large);
            }
          }
        }
        p{
          font-size: var(--font-size-large);
          color: var(--font-color-sub);
          @media screen and (max-width: 600px) {
            &{
              font-size: var(--font-size-mid);
            }
          }
        }
      }
    }
    @media screen and (min-width: 769px) {
      &:nth-of-type(2n){
        .c_inner{
          flex-direction: row-reverse;
          .textbox{
            text-align: right;
          }
        }
      }
    }
    .img_wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        max-width: 30rem;
      }
    }
  }
  .service-intro{
    .c_inner{
      height: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      @media screen and (max-width: 768px) {
        &{
          grid-template-columns: repeat(2, 1fr);
          gap: 1.6rem;
        }
      }
      .intro_box{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 100%;
        padding: 2.5rem;
        background-color: #fff;
        color: var(--primary-color-effect);
        font-size: var(--font-size-large);
        word-break: keep-all;
        border-radius: var(--border-radius-large);
        cursor: pointer;
        transition: var(--transition-default);
        aspect-ratio: 1.3/1;
        &:hover{
          box-shadow: var(--box-shadow01);
          transform: translateY(-3px);
        }
        @media screen and (max-width: 768px) {
          &{
            aspect-ratio: 1.6/1;
            font-size: var(--font-size-mid);
          }
        }
        img{
          width: clamp(3rem, 30%, 5rem);
          opacity: 0.9;
        }
      }
    }
  }
  
`

function Home() {
  return (
    <PageContainer className="c_main_section">
      <section className="c_section main_banner">
        <Swiper className="banner_swiper"
          modules={[ Pagination, Autoplay, EffectFade ]}
          effect={"fade"}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop
          speed={500}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <div className="text_box">
              <h2>요즘 뜨는 여행지?</h2>
              <p>지금 여기에서 한눈에 확인!</p>
            </div>
            <picture>
              <source media="(min-width: 600px)" srcSet={require('assets/image/main/banner/banner01.jpg')} />
              <img src={require('assets/image/main/banner/banner01_min.jpg')} alt="banner01" style={{
                objectPosition: "50% 65%",
                filter: "saturate(1.1)"
              }} />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text_box">
              <h2>나만의 힐링 스팟</h2>
              <p>지금 여기에서 찾아보세요</p>
            </div>
            <picture>
              <source media="(min-width: 600px)" srcSet={require('assets/image/main/banner/banner02.jpg')} />
              <img src={require('assets/image/main/banner/banner02_min.jpg')} alt="banner02" style={{
                filter: "brightness(90%) saturate(1.2)"
              }}/>
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text_box">
              <h2>취향 저격 여행지 추천!</h2>
              <p>내 취향에 딱 맞는 여행지는 어디?</p>
            </div>
            <picture>
              <img src={require('assets/image/main/banner/banner03.jpg')} alt="banner03" style={{
                objectPosition: "50% 65%",
                filter: "saturate(1.1)"
              }}/>
            </picture>
          </SwiperSlide>
        </Swiper>
        <div className="c_inner">
        </div>
      </section>
      <section className="c_section service-intro">
        <div className="c_inner">
          <HashLink smooth to="/#trend">
            <div className="intro_box">
              <img src={require('assets/image/main/trend.png')} alt="trend" />
              최신 트렌드
            </div>
          </HashLink>
          <HashLink smooth to="/#search">
            <div className="intro_box">
              <img src={require('assets/image/main/search.png')} alt="search" />
              여행지 찾기
            </div>
          </HashLink>
          <HashLink smooth to="/#recommend">
            <div className="intro_box">
              <img src={require('assets/image/main/recommend.png')} alt="recommend" />
              맞춤 추천
            </div>
          </HashLink>
          <HashLink smooth to="/#community">
            <div className="intro_box">
              <img src={require('assets/image/main/community.png')} alt="community" />
              나만의 장소
            </div>
          </HashLink>
        </div>
      </section>
      <section id='trend'
        className="c_section service-trend zigzag"
      >
        <div className="c_inner">
          <div className="textbox">
            <h2 className="service_title">최신 트렌드</h2>
            <p>
              SNS 빅데이터 분석을 통해<br />
              최근 떠오르고 있는 트렌디한 여행지를 추천해드립니다.
            </p>
          </div>
          <div className="img_wrapper">
            <img src={require('assets/image/main/sample_instagram.jpg')} alt="trend" />
          </div>
        </div>
      </section>
      <section id='search'
        className="c_section service-search zigzag"
      >
        <div className="c_inner">
          <div className="textbox">
            <h2 className="service_title">여행지 찾기</h2>
            <p>
              테마, 지역, 검색량 등 다양한 필터 검색으로<br />
              내가 원하는 여행지를 찾아보세요!
            </p>
          </div>
          <div className="img_wrapper">
            <img src={require('assets/image/main/sample_instagram.jpg')} alt="search" />
          </div>
        </div>
      </section>
      <section id='recommend'
        className="c_section service-recommend zigzag"
      >
        <div className="c_inner">
          <div className="textbox">
            <h2 className="service_title">맞춤 추천</h2>
            <p>
              여행 취향 데이터를 기반으로<br />
              AI가 분석한 나에게 딱 맞는 여행지를 추천 받아보세요
            </p>
          </div>
          <div className="img_wrapper">
            <img src={require('assets/image/main/sample_instagram.jpg')} alt="recommend" />
          </div>
        </div>
      </section>
      <section id='community'
        className="c_section service-community zigzag"
      >
        <div className="c_inner">
          <div className="textbox">
            <h2 className="service_title">나만의 장소</h2>
            <p>
              여행지 정보 공유 커뮤니티, &apos;나만의 장소&apos;에서<br />
              숨은 여행지 정보를 교환해볼까요?
            </p>
          </div>
          <div className="img_wrapper">
            <img src={require('assets/image/main/sample_instagram.jpg')} alt="community" />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Home