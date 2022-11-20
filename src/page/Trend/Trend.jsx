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
import getRankListApi from 'api/getRankListApi'
import getRankMapApi from 'api/getRankMapApi'

const PageContainer = styled.section`
  .option{
    margin-bottom: 1rem;
    .period{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      vertical-align: middle;
      margin-bottom: 2rem;
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
  const [ listData, setListData ] = useState([]);
  const [ mapData, setMapData ] = useState([]);
  const [ showMap, setShowMap ] = useState(false);
  const [ year, setYear ] = useState(2022);
  const [ month, setMonth ] = useState(new Date().getMonth() + 1);
  const [ week, setWeek ] = useState(getCurrentWeek());

  function getCurrentWeek(){
    const currentDate = new Date();
    const cudate = currentDate.getDate();
    const start = new Date(currentDate.setDate(1));
    const day = start.getDay();
    const week = parseInt(`${(day - 1 + cudate) / 7 + 1}`);
    return week;
  }

  useEffect(()=>{
    getRankListApi({
      date: parseInt(`${year}${month}${week}`)
    }, (data)=>setListData(data));
    getRankMapApi({
      date: parseInt(`${year}${month}${week}`)
    }, (data)=>setMapData(data));
  }, [year, month, week])

  function next(){
    const currentDate = new Date();
    // 가장 최근 주차일 경우 막음
    if(year >= currentDate.getFullYear() && month >= currentDate.getMonth() + 1 && week >= getCurrentWeek() ){
      return;
    }
    // 나중에 고쳐야함!
    if(week <= getCurrentWeek()){
      setWeek(week+1);
    }
  }
  function prev(){
    const currentDate = new Date();
    // 나중에 고쳐야함!
    if(week <= 1){
      return;
    }
    setWeek(week-1);
  }

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
              <button
                onClick={()=> prev()}
              ><Left /> 이전</button>
              <h3>{`${year}년 ${month}월 ${week}째주`}</h3>
              <button
                onClick={()=> next()}
              >다음 <Right /></button>
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
            { showMap && <ShowMap spots={mapData}/> }
          </div>
        </div>
      </section>
    </PageContainer>
  )
}

export default Trend;