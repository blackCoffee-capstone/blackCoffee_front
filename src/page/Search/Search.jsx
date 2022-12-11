// core
import { useState, useEffect } from 'react'
// style
import styled from 'styled-components'
// router
import { useSearchParams } from 'react-router-dom'
// api
import useAuthFetch from 'api/useAuthFetch'
import usePost from 'api/usePost'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
// component
import Filter from 'component/common/Filter'
import ShowList from 'component/common/ShowList'
import Pagination from 'component/common/Pagination'
// img
import { ReactComponent as  SearchSvg } from 'assets/image/common/icon/search.svg'

const PageContainer = styled.section`
  .option{
    margin-bottom: 1rem;
    .search_bar{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 50rem;
      height: 6rem;
      margin: 0 auto 1.5rem;
      border: 2.5px solid var(--primary-color);
      border-radius: var(--border-radius-small);
      overflow: hidden;
      input{
        display: block;
        border: none;
        height: 100%;
        flex-grow: 1;
      }
      button{
        flex-shrink: 0;
        border: none;
        height: 100%;
        width: 5.6rem;
        background: var(--primary-color);
        color: var(--primary-color-contrast);
        padding: 1.5rem;
        svg{
          margin-top: -2px;
          margin-right: -2px;
        }
      }
    }
    .sorting{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
      li{
        cursor: pointer;
        transition: var(--transition-fast);
        &.on{
          color: var(--primary-color);
          font-weight: var(--font-w-bold);
        }
        :hover{ /* .on 보다 밑에 선언되야 잘 동작 */
          color: var(--primary-color-effect);
        }
      }
    }
  }
  .show{
    .ads{
      height: 15rem;
      width: 100%;
      margin-bottom: 1rem;
      a{
        display: block;
        width: 100%;
        height: 100%;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
  }
`

function Search() {
  const initParams = {
    page: "1",
    sorter: 'View',
    word: '',
    themeIds: '',
    locationIds: ''
  }

  const [ searchParams, setSearchParams ] = useSearchParams(initParams);
  const [ currentParams, setCurrentParams ] = useState(initParams);
  const [ word, setWord ] = useState('');
  const [ adThrottle, setAdThrottle ] = useState(false);
  
  useEffect(()=>{   // searchParams 변경시 currentParams와 연동
    const params = Object.fromEntries([...searchParams]);
    setCurrentParams(params);
    setWord(params.word);
  }, [searchParams])
  
  
  const { mutate: adClickApi, isLoading: isAdClickLoading } = usePost({ url: 'ads/click' });
  const { data: listData, isLoading: isListLoading } = useAuthFetch({
    url: 'spots',
    key: ['spotlist', `${JSON.stringify(currentParams)}`],
    params: currentParams,
  });
  const { data: adsData, isLoading: isAdsDataLoading } = useAuthFetch({
    url: 'ads',
    key: ['ads', `${currentParams.locationIds}`],
    params: {
      locationIds: currentParams.locationIds,
    },
  });

  function searching(){
    setSearchParams({...currentParams, page: 1, word: word});
  }
  function onAdClick(id){
    if(adThrottle) return;
    if(isAdClickLoading) return;  // 광고 클릭 보내는 중엔 중단

    setAdThrottle(true);
    setTimeout(() => {  // 5초간 광고 클릭수 증가 중단
      setAdThrottle(false);
    }, 5000);
    adClickApi({
      adId: id
    });
  }


  return (
    <PageContainer className='c_main_section'>
      <section className="c_section c_top_banner">
        <h2>여행지 찾기</h2>
        <img src={ require("assets/image/Search/banner.jpg") }
          style={{ objectPosition: "50% 65%" }}
          alt="검색 페이지 배너"
        />
      </section>
      <section className='c_section'>
        <h2 className='c_title'>여행지 검색</h2>
      </section>
      <div className="c_section result">
        <div className="c_inner">
          <div className="option">
            <div className='search_bar'>
              <input type="text" placeholder='여행지 이름으로 검색하기'
                value={word}
                onKeyUp={(e) => (e.key == 'Enter') && searching() }
                onChange={(e) => setWord(e.currentTarget.value) }
              />
              <button className='btn_search'
                onClick={()=>searching()}
              ><SearchSvg /></button>
            </div>
            <Filter
              initLocations={currentParams.locationIds=='' ? [] : currentParams.locationIds.split(',').map(el=>Number(el))}
              initThemes={currentParams.themeIds=='' ? [] : currentParams.themeIds.split(',').map(el=>Number(el))}
              updateBoth={(locations, themes)=>{ 
                setSearchParams({
                  ...currentParams,
                  locationIds: locations.toString(),
                  themeIds: themes.toString()
                })
              }}
            />
            <ul className='sorting'>
              <li className={currentParams.sorter=='View' ? 'on': ''}
                onClick={()=>{setSearchParams({...currentParams, sorter: 'View'})}}
              >조회순</li>
              <li className={currentParams.sorter=='Wish' ? 'on': ''}
                onClick={()=>{setSearchParams({...currentParams, sorter: 'Wish'})}}
              >찜순</li>
              <li className={currentParams.sorter=='Rank' ? 'on': ''}
                onClick={()=>{setSearchParams({...currentParams, sorter: 'Rank'})}}
              >랭킹순</li>
            </ul>
          </div>
          <div className='show'>
            {
              adsData && adsData.length>0 &&
              <Swiper className='ads'
                modules={[ Autoplay ]}
                loop
                speed={500}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                { 
                  adsData.map((el,i)=>{
                    return(
                      <SwiperSlide key={i}>
                        <a href={el.pageUrl} target="_blank" rel="noopener noreferrer"
                          onClick={()=>onAdClick(el.id)}
                        >
                          <img src={el.photoUrl} alt={`광고${i}`} />
                        </a>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            }
            <ShowList listData={listData.spots}/>
            <Pagination page={currentParams.page} setPage={(num)=>setSearchParams({...currentParams, page: num})} totalPage={listData.totalPage} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Search