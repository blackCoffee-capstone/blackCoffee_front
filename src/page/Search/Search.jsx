// core
import { useState, useEffect } from 'react'
// style
import styled from 'styled-components'
// api
import useAuthFetch from 'api/useAuthFetch'
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
  const [ sorter, setSorter ] = useState('View');
  const [ page, setPage ] = useState(1);
  const [ searchWord, setSearchWord ] = useState('');
  const [ themeIds, setThemeIds ] = useState([]);
  const [ locationIds, setLocationIds ] = useState([]);

  const {
    data: listData, 
    isLoading: isListLoading,
    refetch: refetchList
  } = useAuthFetch({
    url: 'spots',
    key: ['spotlist', page, sorter, locationIds, themeIds],
    params: {
      page: page,
      sorter: sorter,
      word: searchWord,
      themeIds: themeIds.join(","),
      locationIds: locationIds.join(","),
    }
  });

  function reset(){
    setPage(1)
    setSearchWord('')
    setThemeIds([])
    setLocationIds([])
    setSorter('View')
  }
  function searching(){
    setPage(1);
    refetchList();
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
            <Filter setThemeIds={setThemeIds} setLocationIds={setLocationIds}  />
            <ul className='sorting'>
              <li className={sorter=='View' ? 'on': ''}
                onClick={()=>{setSorter('View')}}
              >조회순</li>
              <li className={sorter=='Wish' ? 'on': ''}
                onClick={()=>{setSorter('Wish')}}
              >찜순</li>
              <li className={sorter=='Rank' ? 'on': ''}
                onClick={()=>{setSorter('Rank')}}
              >랭킹순</li>
            </ul>
          </div>
          <div className='show'>
            <ShowList listData={listData.spots}/>
            <Pagination page={page} setPage={setPage} totalPage={listData.totalPage} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Search