// core
import { useState, useEffect } from 'react';
// style
import styled from 'styled-components'
// api
import getFilterApi from 'api/getFilterApi'
// component
import CommunityList from './component/CommunityList'
import Pagination from 'component/common/Pagination'
// img
import { ReactComponent as  SearchSvg } from 'assets/image/common/icon/search.svg'
import { ReactComponent as FilterSvg }  from "assets/image/common/icon/filter.svg";
import { ReactComponent as ExpandSvg }  from "assets/image/common/icon/expand_more.svg";
// sampleData
import CommunityListData from 'store/data/CommunityListData';

const PageContainer = styled.section`
  .option{
    >div{
      margin-bottom: 1rem;
    }
    .filter{
      display: flex;
      flex-direction: column;
      .filter_toggle{
        align-self: flex-start;
        display: flex;
        align-items: center;
        gap: 1rem;
        svg{
          transition: var(--transition-fast);
          width: 1em;
          height: 1em;
        }
      }
      .filter_list{
        background-color: var(--base-color-light);
        border-radius: var(--border-radius-mid);
        padding: 1.5rem;
        &.hide{
          height: 0;
          padding: 0;
          overflow: hidden;
        }
        >div{
          margin-bottom: 2rem;
          h4{
            margin-bottom: 0.5rem;
            font-weight: var(--font-w-bold);
            color: var(--primary-color);
          }
          >ul{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem 0.8rem;
            li{
              border-radius: var(--border-radius-full);
              background-color: var(--base-color-grey);
              padding: 0.2em 0.6em;
              cursor: pointer;
              transition: var(--transition-fast);
              &.on{
                background-color: var(--primary-color);
                color: var(--primary-color-contrast);
              }
              :hover{
                filter: brightness(0.96);
              }
            }
          }
        }
        .place{
          >ul{
            >div{
              margin-top: 1rem;
              p{
                margin-bottom: 0.5rem;
                font-weight: var(--font-w-bold);
              }
              .level2{
                margin-top: 0.5rem;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 0.5rem 0.8rem;
              }
            }
          }
        }
        .submit{
          padding: 0.2em 0.6em;
        }
      }
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
      .search_bar{
        position: relative;
        width: 23rem;
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
    }
  }
`

function Myplace() {
  const [ showFilter, setShowFilter ] = useState(false);
  const [ listData, setListData ] = useState([]);

  const [ sorter, setSorter ] = useState('New');
  const [ themes, setThemes ] = useState([]);
  const [ locations, setLocations ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ totalPage, setTotalPage ] = useState(1);
  const [ searchWord, setSearchWord ] = useState('');
  const [ themeId, setThemeId ] = useState([]);
  const [ locationId, setLocationId ] = useState([]);

  function reset(){
    setSearchWord('');
    setThemeId([]);
    setLocationId([]);
    setSorter('New');
  }

  useEffect(()=>{
    reset();
    getFilterApi((data)=>{
      setLocations(data.locations);
      setThemes(data.themes);
    })
    setListData(CommunityListData) // sampleData 넣음
  }, [])

  // 검색 함수
  // function searching(){
  //   getSpotListApi({
  //     page: page,
  //     sorter: sorter,
  //     word: searchWord,
  //     themeId: themeId[0],
  //     locationId: locationId[0],
  //   }, (data)=>{
  //     setTotalPage(data.totalPage);
  //     setListData(data.spots);
  //   });
  // }

  function onLocationClick(e, id){
    e.currentTarget.classList.toggle('on');
    const tempLocationId = locationId.slice();
    const idx = tempLocationId.findIndex((chosen)=>chosen==id)
    if(idx >= 0){
      tempLocationId.splice(idx, 1);
    } else{
      tempLocationId.push(id);
    }
    console.log('위치', tempLocationId)
    setLocationId(tempLocationId);
  }
  function onThemeClick(e, id){
    e.currentTarget.classList.toggle('on');
    const tempThemeId = themeId.slice();
    const idx = tempThemeId.findIndex((chosen)=>chosen==id);
    if(idx >= 0){
      tempThemeId.splice(idx, 1);
    } else{
      tempThemeId.push(id);
    }
    console.log('테마', tempThemeId);
    setThemeId(tempThemeId);
  }

  // useEffect(()=>{
  //   searching()
  // }, [page, sorter])

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
            <div className="filter">
              <button className='c_btn-primary-reverse filter_toggle'
                onClick={()=>{setShowFilter(!showFilter)}}
              >
                <FilterSvg />
                필터
                <ExpandSvg style={{
                  transition: "var(--transition-default)",
                  transform: `rotate(${showFilter ? '180deg' : '0'})`
                }} />
              </button>
              <div className={`filter_list ${showFilter ? '': 'hide'}`}>
                <div className='place'>
                  <h4>장소</h4>
                  <ul className='level1'>
                    { locations.length>0 &&
                      locations.map((metro)=>{
                        return (
                          <div key={metro.id}>
                            <p>{metro.metroName}</p>
                            <ul className='level2'>
                              <li
                                onClick={(e)=>{
                                  onLocationClick(e, metro.id);
                                }}
                              >{metro.metroName} 전체</li>
                              {
                                metro.localNames.length>0 &&
                                metro.localNames.map((local)=>{
                                  return(
                                    <li key={local.id}
                                      onClick={(e)=>{
                                        onLocationClick(e, local.id);
                                      }}
                                    >{local.localName}</li>
                                  )
                                })
                              }
                            </ul>
                          </div>
                        )
                      })
                    }
                  </ul>
                </div>
                <div className="theme">
                  <h4>테마</h4>
                  <ul>
                    {
                      themes.length>0 &&
                      themes.map((el)=>{
                        return(
                          <li key={'theme'+el.id}
                            onClick={(e)=>{onThemeClick(e, el.id)}}
                          >{el.name}</li>
                        ) 
                      })
                    }
                  </ul>
                </div>
                <button className='c_btn-primary submit'
                  // onClick={()=>{searching()}}
                >
                  필터 적용
                </button>
              </div>
            </div>
            <div className='two_side'>
              <div className="left">
                <ul className='sorting'>
                  <li className={sorter=='New' ? 'on': ''}
                    onClick={()=>{setSorter('New')}}
                  >최신순</li>
                  <li className={sorter=='Rank' ? 'on': ''}
                    onClick={()=>{setSorter('Rank')}}
                  >인기순</li>
                </ul>
              </div>
              <div className="right">
                <div className='search_bar'>
                  <input type="text" placeholder='검색'
                    // onKeyUp={(e) => (e.key == 'Enter') && searching() }
                    onChange={(e) => setSearchWord(e.currentTarget.value) }
                  />
                  <SearchSvg />
                </div>
                <button className='c_btn-primary'>글쓰기</button>
              </div>
            </div>
          </div>
          <div className='show'>
            <CommunityList spots={listData}/>
            <Pagination page={page} setPage={setPage} totalPage={totalPage} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Myplace