// core
import { useState, useEffect } from 'react'
// style
import styled from 'styled-components'
// recoil
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, messageBundle } from 'store/index'
// router
import { Navigate, useNavigate } from 'react-router-dom';
// api
import useAuthFetch from 'api/useAuthFetch'
// component
import SlideSwitch from 'component/common/SlideSwitch'
import ShowList from 'component/common/ShowList'
import ShowMap from 'component/common/ShowMap'

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
  const setAlert = useSetRecoilState(messageBundle.alert)
  const navigate = useNavigate();
  const { data: userData } = useAuthFetch({ 
    url: 'users', key: ['user', 'recommend'],
    cacheTime: 0,
  });
  const { data: listData, isLoading: isListLoading } = useAuthFetch({ 
    url: 'recommendations/list', key: ['recommend-list'],
    enabled: !userData.isNewUser  // 유저가 취향 선택 완료한 경우만
  });
  const { data: mapData, isLoading: isMapLoading } = useAuthFetch({
    url: 'recommendations/map',  key: ['recommend-map'],
    enabled: !userData.isNewUser  // 유저가 취향 선택 완료한 경우만
  });
  useEffect(()=>{ // 취향 선택 안했을 때 취향선택으로 던짐
    if(userData.isNewUser){
      setAlert('서비스 이용전 취향 선택을 먼저 해주세요');
      navigate('/chooseTheme');
    }
  }, [userData])

  const [ showMap, setShowMap ] = useState(false);
  
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
            { !showMap && <ShowList listData={listData}/> }
            { showMap && <ShowMap mapData={mapData}/> }
          </div>
        </div>
      </section>
    </PageContainer>
  )
}

export default Recommend;