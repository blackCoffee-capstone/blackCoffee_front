// core
import { useState } from 'react';
// style
import styled from 'styled-components'
// api
import useFetch from 'api/useFetch'
// img
import { ReactComponent as FilterSvg }  from "assets/image/common/icon/filter.svg";
import { ReactComponent as ExpandSvg }  from "assets/image/common/icon/expand_more.svg";


const FilterContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  .filter_toggle{
    align-self: center;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    svg{
      transition: var(--transition-fast);
      width: 1em;
      height: 1em;
    }
  }
  .filter_list{
    background-color: var(--base-color-light);
    border-radius: var(--border-radius-mid);
    padding: 1.5rem;
    
    &.hide{
      height: 0;
      padding: 0;
      overflow: hidden;
    }
    >div{
      margin-bottom: 2rem;
      h4{
        margin-bottom: 0.5rem;
        font-weight: var(--font-w-bold);
        color: var(--primary-color);
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
    .place{
      >ul{
        >div{
          margin-top: 1rem;
          width: 100%;
          p{
            margin-bottom: 0.5rem;
            font-weight: var(--font-w-bold);
          }
          .level2{
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem 0.8rem;
          }
        }
      }
    }
    .submit{
      padding: 0.2em 0.6em;
    }
  }
`

function Filter({ setLocationIds, setThemeIds, ...props }){
  const [ showFilter, setShowFilter ] = useState(false);
  const [ chosenThemes, setChosenThemes ] = useState([]);
  const [ chosenLocations, setChosenLocations ] = useState([]);

  function onLocationClick(e, id){
    e.currentTarget.classList.toggle('on');
    const tempLocationId = chosenLocations.slice();
    const idx = tempLocationId.findIndex((chosen)=>chosen==id)
    if(idx >= 0){
      tempLocationId.splice(idx, 1);
    } else{
      tempLocationId.push(id)
    }
    setChosenLocations(tempLocationId);
  }
  function onThemeClick(e, id){
    e.currentTarget.classList.toggle('on');
    const tempThemeId = chosenThemes.slice();
    const idx = tempThemeId.findIndex((chosen)=>chosen==id)
    if(idx >= 0){
      tempThemeId.splice(idx, 1);
    } else{
      tempThemeId.push(id)
    }
    setChosenThemes(tempThemeId);
  }

  const {
    data: filterData, 
    isLoading: isFilterLoading
  } = useFetch({ url: 'filters', key: ['filter'] });

  return(
    <FilterContainer>
      <button className='c_btn-primary-reverse filter_toggle'
        onClick={()=>{setShowFilter(!showFilter)}}
      >
        <FilterSvg />
        필터
        <ExpandSvg style={{
          transition: "var(--transition-default)",
          transform: `rotate(${showFilter ? '180deg' : '0'})`
        }} />
      </button>
      {/* <div>
        {
          chosenThemes.map(el => {
            const names = filterData.locations.filter(el.id == el);
            return <li key={el}>{names}</li>
          })
        }
      </div> */}
      <div className={`filter_list ${showFilter ? '': 'hide'}`}>
        {
          isFilterLoading && <div style={{textAlign: 'center'}}>필터 불러오는중...</div>
        }
        {
          !isFilterLoading &&
          <>
            <div className='place'>
              <h4>장소</h4>
              <ul className='level1'>
                {
                  filterData.locations.length>0 &&
                  filterData.locations.map((metro)=>{
                    return (
                      <div key={metro.id}>
                        <p>{metro.metroName}</p>
                        <ul className='level2'>
                          <li
                            onClick={(e)=>{
                              onLocationClick(e, metro.id);
                            }}
                          >{metro.metroName} 전체</li>
                          {
                            metro.localNames.length>0 &&
                            metro.localNames.map((local)=>{
                              return(
                                <li key={local.id}
                                  onClick={(e)=>{
                                    onLocationClick(e, local.id);
                                  }}
                                >{local.localName}</li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    )
                  })
                }
              </ul>
            </div>
            <div className="theme">
              <h4>테마</h4>
              <ul>
                {
                  filterData.themes.length>0 &&
                  filterData.themes.map((el)=>{
                    return(
                      <li key={'theme'+el.id}
                        onClick={(e)=>{onThemeClick(e, el.id)}}
                      >{el.name}</li>
                    ) 
                  })
                }
              </ul>
            </div>
            <button className='c_btn-primary submit'
              onClick={()=>{
                setThemeIds(chosenThemes);
                setLocationIds(chosenLocations);
                setShowFilter(false)
              }}
            >
              필터 적용
            </button>
          </>
        }
      </div>
    </FilterContainer>
  )
}

export default Filter;