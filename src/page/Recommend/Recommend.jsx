// core
import { useState, useEffect } from 'react'
// style
import styled from 'styled-components'
// component
import SlideSwitch from 'component/common/SlideSwitch'
import ShowList from 'component/common/ShowList'
import ShowMap from 'component/common/ShowMap'
// api
import fetchData from 'api/fetchData'

const PageContainer = styled.section`
  .option{
    margin-bottom: 1rem;
    .show_map{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
    }
  }
`

function Recommend(){
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
        <img src={require("assets/image/Recommend/banner.jpg")} alt="추천페이지 배너" />
        <h2>맞춤 추천</h2>
      </section>
      <section className='c_section'>
        <h2 className='c_title'>추천 여행지</h2>
      </section>
      <section className='c_section result'>
        <div className="c_inner">
          <div className="option">
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

export default Recommend;