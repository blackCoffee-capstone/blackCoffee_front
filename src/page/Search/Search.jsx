// core
import { useState, useEffect } from 'react'
// style
import styled from 'styled-components'
// api
import getSpotListApi from 'api/getSpotListApi'
import getFilterApi from 'api/getFilterApi'
// component
import ShowList from 'component/common/ShowList'
import Pagination from 'component/common/Pagination'
// img
import { ReactComponent as  SearchSvg } from 'assets/image/common/icon/search.svg'
import { ReactComponent as FilterSvg }  from "assets/image/common/icon/filter.svg";
import { ReactComponent as ExpandSvg }  from "assets/image/common/icon/expand_more.svg";

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
      margin: 0 auto;
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
    .filter{
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      .filter_toggle{
        align-self: center;
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
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
          font-weight: var(--font-w-bold);
        }
        :hover{ /* .on 보다 밑에 선언되야 잘 동작 */
          color: var(--primary-color-effect);
        }
      }
    }
  }
`

function Search() {
  const [ showFilter, setShowFilter ] = useState(false);
  const [ listData, setListData ] = useState([]);

  const [ sorter, setSorter ] = useState('Name');
  const [ themes, setThemes ] = useState([]);
  const [ locations, setLocations ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ totalPage, setTotalPage ] = useState(1);
  const [ searchWord, setSearchWord ] = useState('');
  const [ themeId, setThemeId ] = useState([]);
  const [ locationId, setLocationId ] = useState([]);
  
  function reset(){
    setSearchWord('')
    setThemeId([])
    setLocationId([])
    setSorter('Name')
  }

  useEffect(()=>{
    reset();
    getFilterApi((data)=>{
      setLocations(data.locations);
      setThemes(data.themes);
    })
  }, [])
  useEffect(()=>{
    searching()
  }, [page, sorter])

  // 검색 함수
  function searching(){
    getSpotListApi({
      page: page,
      sorter: sorter,
      word: searchWord,
      themeId: themeId[0],
      locationId: locationId[0],
    }, (data)=>{
      setTotalPage(data.totalPage);
      setListData(data.spots);
    });
  }

  function onLocationClick(e, id){
    e.currentTarget.classList.toggle('on');
    const tempLocationId = locationId.slice();
    const idx = tempLocationId.findIndex((chosen)=>chosen==id)
    if(idx >= 0){
      tempLocationId.splice(idx, 1);
    } else{
      tempLocationId.push(id)
    }
    console.log('위치', tempLocationId)
    setLocationId(tempLocationId);
  }
  function onThemeClick(e, id){
    e.currentTarget.classList.toggle('on');
    const tempThemeId = themeId.slice();
    const idx = tempThemeId.findIndex((chosen)=>chosen==id)
    if(idx >= 0){
      tempThemeId.splice(idx, 1);
    } else{
      tempThemeId.push(id)
    }
    console.log('테마', tempThemeId)
    setThemeId(tempThemeId);
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
                onKeyUp={(e) => (e.key == 'Enter') && searching() }
                onChange={(e) => setSearchWord(e.currentTarget.value) }
              />
              <button className='btn_search'
                onClick={()=>searching()}
              ><SearchSvg /></button>
            </div>
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
                  onClick={()=>{searching()}}
                >
                  필터 적용
                </button>
              </div>
            </div>
            <ul className='sorting'>
              <li className={sorter=='Name' ? 'on': ''}
                onClick={()=>{setSorter('Name')}}
              >이름순</li>
              <li className={sorter=='Rank' ? 'on': ''}
                onClick={()=>{setSorter('Rank')}}
              >랭킹순</li>
            </ul>
          </div>
          <div className='show'>
            <ShowList spots={listData}/>
            <Pagination page={page} setPage={setPage} totalPage={totalPage} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Search