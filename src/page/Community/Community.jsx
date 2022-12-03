// core
import { useState, useEffect } from 'react';
// style
import styled from 'styled-components'
// api
import useFetch from 'api/useFetch'
// component
import Filter from 'component/common/Filter'
import CommunityList from './component/CommunityList'
import Pagination from 'component/common/Pagination'
// img
import { ReactComponent as  SearchSvg } from 'assets/image/common/icon/search.svg'
// sampleData
import CommunityListData from 'store/data/CommunityListData';

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
  const [ listData, setListData ] = useState([]);

  const [ sorter, setSorter ] = useState('New');
  const [ page, setPage ] = useState(1);
  const [ totalPage, setTotalPage ] = useState(1);
  const [ searchWord, setSearchWord ] = useState('');
  const [ themeId, setThemeIds ] = useState([]);
  const [ locationId, setLocationIds ] = useState([]);

  function reset(){
    setSearchWord('');
    setThemeIds([]);
    setLocationIds([]);
    setSorter('New');
  }

  useEffect(()=>{
    reset();
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
            <Filter setThemeIds={setThemeIds} setLocationIds={setLocationIds}  />
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