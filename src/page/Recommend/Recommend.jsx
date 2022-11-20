// core
import { useState, useEffect } from 'react'
// style
import styled from 'styled-components'
// recoil
import { useRecoilState, useSetRecoilState } from 'recoil';
import { token, userState, messageBundle } from 'store/index'
// router
import { useNavigate } from 'react-router-dom';
// api
import getUserApi from 'api/getUserApi'
import getRecommendListApi from 'api/getRecommendListApi'
import getRecommendMapApi from 'api/getRecommendMapApi'
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
  const [ accessToken, setAccessToken ] = useRecoilState(token.accessToken)
  const [ user, setUser ] = useRecoilState(userState)
  const setAlert = useSetRecoilState(messageBundle.alert)

  const [ showMap, setShowMap ] = useState(false);
  const [ listData, setListData ] = useState([]);
  const [ mapData, setMapData ] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    console.log('fetch')
    getUserApi(accessToken, (data)=>{
      setUser(data);
      if(data.isNewUser){
        setAlert('맞춤 서비스를 위해 원하는 여행 테마를 선택해 주세요')
        navigate('/choosetheme');
      } else {
        getRecommendListApi(accessToken, (data)=>{
          setListData(data);
        })
        getRecommendMapApi(accessToken, (data)=>{
          setMapData(data);
        })
      }
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
            { showMap && <ShowMap spots={mapData}/> }
          </div>
        </div>
      </section>
    </PageContainer>
  )
}

export default Recommend;