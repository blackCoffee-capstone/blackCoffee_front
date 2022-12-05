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
import useFetch from 'api/useFetch'

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
  const [ showMap, setShowMap ] = useState(false);
  const [ currentWeek, setCurrentWeek ] = useState(getCurrentWeek());

  function getCurrentWeek(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();

    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDate.getDay() ? firstDate.getDay() : 7;
    const lastDayOfWeek = lastDate.getDay();
    const lastDay = lastDate.getDate();

    const firstWeekCheck = firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7 ? true : false;
    const lastWeekCheck = lastDayOfWeek === 1 || lastDayOfWeek === 2 || lastDayOfWeek === 3 ? true : false;

    const lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);

    let weekNo = Math.ceil((firstDayOfWeek - 1 + date) / 7);
    if (weekNo === 1 && firstWeekCheck) weekNo = -1;
    else if (weekNo === lastWeekNo && lastWeekCheck) weekNo = -2;
    else if (firstWeekCheck) weekNo = weekNo - 1;
    return `${year}${(month+1).toString().padStart(2, 0)}${weekNo}`;
  }

  const { data: listData, isLoading: isListLoading } = useFetch({
    url: 'ranks/list',
    params: { date: currentWeek },
    key: ['rank', 'list', currentWeek]
  })
  const { data: mapData, isLoading: isMapLoading } = useFetch({
    url: 'ranks/map',
    params: { date: currentWeek },
    key: ['rank', 'map', currentWeek]
  })

  function next(next){
    setCurrentWeek(String(next));
  }
  function prev(prev){
    setCurrentWeek(String(prev))
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
                disabled={!listData.prev && !mapData.prev}
                onClick={()=> prev(listData.prev)}
              ><Left /> 이전</button>
              <h3>{`${currentWeek.slice(0,4)}년 ${currentWeek.slice(4,6)}월 ${currentWeek.slice(-1,)}째주`}</h3>
              <button
                disabled={!listData.next && !mapData.next}
                onClick={()=> next(listData.next)}
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
            { !showMap && <ShowList listData={listData.ranking}/> }
            { showMap && <ShowMap mapData={mapData.ranking}/> }
          </div>
        </div>
      </section>
    </PageContainer>
  )
}

export default Trend;