// core
import { useState } from 'react';
// style
import styled from 'styled-components'

const ListContainer = styled.ul`
  width: 100%;
  li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color-light);
    text-align: center;
    height: 14rem;
    padding: 0.5rem 0;
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition-fast);
    &:hover{
      background-color: var(--effect-color);
      img{
        filter: brightness(1.05) saturate(1.1);
      }
    }
    &:first-child{
      border-top: 1px solid var(--border-color-default);
    }
    &>div{
      padding: 0.5rem 0.6rem;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .ranking{
      width: 6rem;
      font-weight: var(--font-w-bold);
      font-size: var(--font-size-large);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .spot{
      display: flex;
      align-items: center;
      gap: 2rem;
      width: 100%;
      flex-grow: 1;
      img{
        width: 15rem;
        height: 12rem;
        object-fit: cover;
        border-radius: var(--border-radius-mid);
        background-color: var(--loading-color);
        transition: var(--transition-default);
      }
      .textbox{
        text-align: start;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        h3{
          font-size: var(--font-size-large);
          font-weight: var(--font-w-mid);
        }
        p{
          color: var(--font-color-sub);
        }
      }
    }
    .volume,
    .updown{
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      align-items: center;
      gap: 0 1rem;
      width: 9rem;
      white-space: nowrap;
      p{
        font-weight: var(--font-w-bold);
        font-size: var(--font-size-large);
      }
    }
    .volume{
      width: 12rem;
    }
    @media screen and (max-width: 768px) {
      &{
        flex-wrap: wrap;
        height: auto;
      }
      .ranking{
        display: none;
      }
      .volume,
      .updown{
        flex-direction: row;
      }
    }
  }
  
`

function ShowList(props){
  const data = props.data ?? [];

  return (
    <ListContainer>
      {
        data.map((el, i) => {
          return(
            <li key={el.id}>
              <div className='ranking'>{i+1}</div>
              <div className='spot'>
                <img src={el.image} alt={el.name} />
                <div className="textbox">
                  <h3>{el.name}</h3>
                  <p>{el.location}</p>
                </div>
              </div>
              <div className='volume'>
                <h4>검색량</h4>
                <p>{el.volume}</p>
              </div>
              <div className='updown'>
                <h4>변동</h4>
                <p>{el.updown}</p>
              </div>
            </li>
          )
        })
      }
      {
        data.length==0 && (
          <p>데이터가 없습니다</p>
        )

      }
    </ListContainer>
  )
}

export default ShowList;