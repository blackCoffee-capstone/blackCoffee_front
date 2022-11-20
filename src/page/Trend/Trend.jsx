// core
import { useState, useEffect } from 'react'
// style
import styled from 'styled-components'
// component
import SlideSwitch from 'component/common/SlideSwitch'
import ShowList from 'component/common/ShowList'
import ShowMap from 'component/common/ShowMap'
// img
import { ReactComponent as  Left } from 'assets/image/common/icon/navigation_left.svg'
import { ReactComponent as  Right } from 'assets/image/common/icon/navigation_right.svg'
// api
import fetchData from 'api/fetchData'

const PageContainer = styled.section`
  .option{
    margin-bottom: 1rem;
    .period{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      vertical-align: middle;
      margin-bottom: 1rem;
      h3{
        font-weight: var(--font-w-bold);
        font-size: var(--font-size-x-large);
        margin-top: -3px;
        @media screen and (max-width: 600px) {
          font-size: var(--font-size-large);
        }
      }
      button{
        transition: var(--transition-fast);
        display: flex;
        align-items: center;
        @media screen and (max-width: 600px) {
          font-size: var(--font-size-small);
        }
        &:hover{
          color: var(--primary-color);
        }
      }
    }
    .show_map{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
    }
  }
`

function Trend(){
  const [ showMap, setShowMap ] = useState(false);
  const [ listData, setListData ] = useState([]);
  useEffect(()=>{
    fetchData({
      url: 'https://cd613352-2a16-45b7-b17d-5bb22ad68e19.mock.pstmn.io/sample',
      callback: setListData
    })
  }, [])

  return(
    <PageContainer className='c_main_section'>
      <section className="c_section c_top_banner">
        <img src={require("assets/image/Trend/banner.jpg")} alt="트렌드 페이지 배너" />
        <h2>최신 트렌드</h2>
      </section>
      <section className='c_section'>
        <h2 className='c_title'>여행지 순위</h2>
      </section>
      <section className='c_section result'>
        <div className="c_inner">
          <div className="option">
            <div className='period'>
              <button><Left /> 이전</button>
              <h3>2022년 11월 3째주</h3>
              <button>다음 <Right /></button>
            </div>
            <div className="show_map">
              지도로 보기
              <SlideSwitch
                checked={showMap}
                onChange={()=>setShowMap(!showMap)}
              />
            </div>
          </div>
          <div className='show'>
            { !showMap && <ShowList spots={listData}/> }
            { showMap && <ShowMap spots={listData}/> }
          </div>
        </div>
      </section>
    </PageContainer>
  )
}

export default Trend;