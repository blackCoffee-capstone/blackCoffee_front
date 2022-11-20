// core
import { useState } from 'react'
// style
import styled from 'styled-components'
// api
import getSpotListApi from 'api/getSpotListApi'
import getFilterApi from 'api/getFilterApi'
// component
import ShowList from 'component/common/ShowList'
import Pagination from './Pagination'
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
      >div{
        margin: 1rem 0;
        h4{
          width: 5rem;
          margin-bottom: 0.5rem;
          font-weight: var(--font-w-bold);
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
    }
    .sorting{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      vertical-align: middle;
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
  const [ sorter, setSorter ] = useState('Name');
  const [ themes, setThemes ] = useState([]);
  const [ locations, setLocations ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ totalPage, setTotalPage ] = useState(1);
  const [ searchWord, setSearchWord ] = useState();
  const [ themeId, setThemeId ] = useState();
  const [ locationId, setLocationId ] = useState();
  const [ listData, setListData ] = useState([]);
  useEffect(()=>{
    getFilterApi((data)=>{
      setLocations(data.locations);
      setThemes(data.themes);
    })
  }, [])
  useEffect(()=>{
    search()
  }, [page, themeId, locationId, sorter])

  // 검색 함수
  function search(){
    getSpotListApi({
      page: page,
      sorter: sorter,
      word: searchWord,
      themeId: themeId,
      locationId: locationId,
      // take: 20
    }, (data)=>{
      setListData(data)
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
                  onKeyUp={(e) => (e.key == 'Enter') && search() }
                  onChange={(e) => setSearchWord(e.currentTarget.value) }
                />
                <button className='btn_search'
                  onClick={()=>search()}
                ><SearchSvg /></button>
            </div>
            <div className='filter'>
              <div className='place'>
                <h4>장소</h4>
                <ul>
                  { locations.length>0 &&
                    locations.map((el, i)=>{
                      return (
                        <li key={'place'+i}>{el}</li>
                      )
                    })
                  }
                  {
                    locations.length==0 &&
                    <li>장소 샘플</li>
                  }
                </ul>
              </div>
              <div className="theme">
                <h4>테마</h4>
                <ul>
                  {
                    themes.length>0 &&
                    themes.map((el, i)=>{
                      return(
                        <li key={'theme'+i}
                          // onClick={()=>{setThemeId()}}
                        >{el}</li>
                      ) 
                    })
                  }
                  {
                    themes.length==0 &&
                    <li>테마 샘플</li>
                  }
                </ul>
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
            <ShowList spots={ListData}/>
          </div>
          <Pagination page={page} setPage={setPage} totalPage={totalPage} />
        </div>
      </div>
    </PageContainer>
  );
}

export default Search