// core
import { useState } from 'react'
// style
import styled from 'styled-components'
// component
import ShowList from 'component/common/ShowList'
import ShowMap from 'component/common/ShowMap'
// img
import { ReactComponent as  Left } from 'assets/image/common/icon/navigation_left.svg'
import { ReactComponent as  Right } from 'assets/image/common/icon/navigation_right.svg'
// sample data
import ListData from 'store/data/ListData.js'

const SlideSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  input {
    display: none;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: var(--transition-default);
    border-radius: 34px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: var(--transition-default);
    border-radius: 50%;
  }
  input:checked + .slider {
    background-color: var(--primary-color);
  }
  input:focus + .slider {
    box-shadow: 0 0 1px var(--primary-color);
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`
const PageContainer = styled.section`
  .option{
    margin-bottom: 1rem;
    .period{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      vertical-align: middle;
      h3{
        font-weight: var(--font-w-bold);
        font-size: var(--font-size-x-large);
      }
      button{
        transition: var(--transition-fast);
        display: flex;
        align-items: center;
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

  return(
    <PageContainer className='c_main_section'>
      <section className="c_section c_top_banner">
        <img src={require("assets/image/Trend/banner.jpg")} alt="트렌드 페이지 배너" />
      </section>
      <section className='c_section'>
        <h2 className='c_title'>최신 트렌드</h2>
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
              <SlideSwitch>
                <input type="checkbox" checked={showMap}
                  onChange={()=>setShowMap(!showMap)}
                />
                <span className="slider"></span>
              </SlideSwitch>
            </div>
          </div>
          <div className='show'>
            { !showMap && <ShowList data={ListData}/> }
            { showMap && <ShowMap data={ListData}/> }
          </div>
        </div>
      </section>
    </PageContainer>
  )
}

export default Trend;