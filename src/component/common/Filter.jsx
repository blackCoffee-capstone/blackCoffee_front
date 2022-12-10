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
  display: flex;
  flex-direction: column;
  .filter_toggle{
    align-self: center;
    display: flex;
    align-items: center;
    gap: 1rem;
    svg{
      transition: var(--transition-fast);
      width: 1em;
      height: 1em;
    }
  }
  .hide{
    height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: hidden;
    box-shadow: none !important;
  }
  .filter_list{
    border-radius: var(--border-radius-mid);
    box-shadow: var(--box-shadow02);
    padding: 1rem 1.2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    .chooseArea{
      overflow: scroll;
      max-height: 40rem;
      border-bottom: 1px solid var(--border-color-light);
      >div{
        margin-bottom: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color-light);
        &:first-child{
          padding-top: 0;
          border-top: none;
        }
        h4{
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 0;
          font-weight: var(--font-w-bold);
          color: var(--primary-color);
          cursor: pointer;
          transition: var(--transition-fast);
          &:hover{
            color: var(--primary-color-effect);
          }
          svg{
            width: 1em;
            height: 1em;
          }
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
            margin-top: 0.5rem;
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
      .theme{
        ul{
          margin-top: 0.5rem;
        }
      }
    }
    .submit{
      display: block;
      margin: 1rem auto 0;
    }
  }
`

function Filter({ setLocationIds, setThemeIds, filterLocation=true, filterTheme=true, buttonStyle={}, ...props }){
  const [ showFilter, setShowFilter ] = useState(false);
  const [ showThemes, setShowThemes ] = useState(true);
  const [ showLocations, setShowLocations ] = useState(false);
  const [ chosenThemes, setChosenThemes ] = useState([]);
  const [ chosenLocations, setChosenLocations ] = useState([]);

  function onLocationClick(id){
    const tempLocationId = chosenLocations.slice();
    const idx = tempLocationId.findIndex((chosen)=>chosen==id)
    if(idx >= 0){
      tempLocationId.splice(idx, 1);
    } else{
      tempLocationId.push(id)
    }
    setChosenLocations(tempLocationId);
  }
  function onThemeClick(id){
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
        style={buttonStyle}
      >
        <FilterSvg />
        필터
        <ExpandSvg style={{
          transition: "var(--transition-default)",
          transform: `rotate(${showFilter ? '180deg' : '0'})`
        }} />
      </button>
      <div className={`filter_list ${showFilter ? '': 'hide'}`}>
        {
          isFilterLoading && <div style={{textAlign: 'center'}}>필터 불러오는중...</div>
        }
        {
          !isFilterLoading &&
          <>
            {/* <div className='chosen'>
              {
                chosenLocations.map(el => {
                  const findEl = filterData.locations.find(el.id == el);
                  return <li key={findEl}>{names}</li>
                })
              }
            </div> */}
            <div className='chooseArea'>
              { filterLocation &&
                <div className='place'>
                  <h4 onClick={()=> setShowLocations(!showLocations)}>
                    장소 
                    <ExpandSvg style={{
                      transition: "var(--transition-default)",
                      transform: `rotate(${showLocations ? '180deg' : '0'})`
                    }} />
                  </h4>
                  <ul className={`level1 ${showLocations ? '' : 'hide'}`}>
                    {
                      filterData.locations.length>0 &&
                      filterData.locations.map((metro)=>{
                        return (
                          <div key={metro.id}>
                            <p>{metro.metroName}</p>
                            <ul className='level2'>
                              <li
                                className={`${chosenLocations.includes(metro.id) ? 'on' : ''}`}
                                onClick={()=>{ onLocationClick(metro.id) }}
                              >{metro.metroName} 전체</li>
                              {
                                metro.localNames.length>0 &&
                                metro.localNames.map((local)=>{
                                  return(
                                    <li key={local.id}
                                      className={`${chosenLocations.includes(local.id) ? 'on' : ''}`}
                                      onClick={()=>{ onLocationClick(local.id)}}
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
              }
              {
                filterTheme && 
                <div className="theme">
                  <h4 onClick={()=> setShowThemes(!showThemes)}>
                    테마
                    <ExpandSvg style={{
                      transition: "var(--transition-default)",
                      transform: `rotate(${showThemes ? '180deg' : '0'})`
                    }} />
                  </h4>
                  <ul className={`${showThemes ? '' : 'hide'}`}>
                    {
                      filterData.themes.length>0 &&
                      filterData.themes.map((el)=>{
                        return(
                          <li key={'theme'+el.id}
                            className={`${chosenThemes.includes(el.id) ? 'on' : ''}`}
                            onClick={()=>{onThemeClick(el.id)}}
                          >{el.name}</li>
                        ) 
                      })
                    }
                  </ul>
                </div>
              }
            </div>
            <button className='c_btn-primary submit'
              onClick={()=>{
                if(filterLocation){
                  setLocationIds(chosenLocations);
                }
                if(filterTheme){
                  setThemeIds(chosenThemes);
                }
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