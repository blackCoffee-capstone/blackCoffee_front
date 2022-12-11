// core
import { useState, useEffect } from 'react';
// style
import styled from 'styled-components'
// router
import { useNavigate, useSearchParams } from 'react-router-dom';
// api
import useAuthFetch from 'api/useAuthFetch'
// component
import Filter from 'component/common/Filter'
import CommunityList from './component/CommunityList'
import Pagination from 'component/common/Pagination'
// img
import { ReactComponent as  SearchSvg } from 'assets/image/common/icon/search.svg'

const PageContainer = styled.section`
  .option{
    >div{
      margin-bottom: 1rem;
    }
    .two_side{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem var(--space-small);
      flex-wrap: wrap;
      >div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
      .sorting{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
        li{
          cursor: pointer;
          transition: var(--transition-fast);
          &.on{
            color: var(--primary-color);
          }
          :hover{ /* .on 보다 밑에 선언되야 잘 동작 */
            color: var(--primary-color-effect);
          }
        }
      }
      .right{
        .search_bar{
          position: relative;
          width: 24rem;
          max-width: 30rem;
          height: 4rem;
          input{
            height: 100%;
          }
          svg{
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: auto;
            aspect-ratio: 1;
            padding: 1rem;
            cursor: pointer;
          }
        }
        @media screen and (max-width: 600px) {
          width: 100%;
          .search_bar{
            width: 100%;
          }
        }
        button{
          flex-shrink: 0;
        }
      }
      
    }
  }
`


function Community() {
  const initParams = {
    page: 1,
    sorter: 'CreatedAt',
    word: '',
    themeIds: '',
    locationIds: ''
  }
  const navigate = useNavigate();
  const [ searchParams, setSearchParams ] = useSearchParams(initParams);
  const [ currentParams, setCurrentParams ] = useState(initParams);
  const [ word, setWord ] = useState('');

  useEffect(()=>{   // searchParams 변경시 currentParams와 연동
    const params = Object.fromEntries([...searchParams]);
    setCurrentParams(params);
    setWord(params.word);
  }, [searchParams])
  
  const { data: postsData, } = useAuthFetch({ 
    url: 'posts',
    key: ['posts', `${JSON.stringify(currentParams)}`],
    params: currentParams,
  });
  
  // 검색 함수
  function searching(){
    setSearchParams({...currentParams, page: 1, word: word});
  }

  return (
    <PageContainer className='c_main_section'>
      <section className="c_section c_top_banner">
        <picture>
          <source media="(min-width: 600px)" srcSet={require('assets/image/Community/banner.jpg')} />
          <img src={require("assets/image/Community/banner_min.jpg")} alt="커뮤니티 페이지 배너" 
            style={{
              objectPosition: "50% 40%",
              filter: "brightness(0.7)"
            }}
          />
        </picture>
        <h2>나만의 장소</h2>
      </section>
      <div className="c_section">
        <div className="c_inner">
          <div className='option'>
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
            <div className='two_side'>
              <div className="left">
                <ul className='sorting'>
                  <li className={currentParams.sorter=='CreatedAt' ? 'on': ''}
                    onClick={()=>{setSearchParams({...currentParams, sorter: 'CreatedAt'})}}
                  >최신순</li>
                  <li className={currentParams.sorter=='View' ? 'on': ''}
                    onClick={()=>{setSearchParams({...currentParams, sorter: 'View'})}}
                  >조회순</li>
                  <li className={currentParams.sorter=='Like' ? 'on': ''}
                    onClick={()=>{setSearchParams({...currentParams, sorter: 'Like'})}}
                  >인기순</li>
                </ul>
              </div>
              <div className="right">
                <div className='search_bar'>
                  <input type="text" placeholder='검색'
                    value={word}
                    onKeyUp={(e) => (e.key == 'Enter') && searching() }
                    onChange={(e) => setWord(e.currentTarget.value) }
                  />
                  <SearchSvg onClick={()=> searching() } />
                </div>
                <button className='c_btn-primary'
                  onClick={()=> navigate('/community/write')}
                >글쓰기</button>
              </div>
            </div>
          </div>
          <div className='show'>
            <CommunityList listData={postsData.posts}/>
            <Pagination page={currentParams.page} setPage={(num)=>setSearchParams({...currentParams, page: num})} totalPage={postsData.totalPage} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Community