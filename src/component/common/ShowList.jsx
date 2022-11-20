// style
import styled from 'styled-components'
// router
import { useNavigate } from 'react-router-dom';

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
    .variance{
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
        &.new{
          color: red;
          margin-top: -2px;
        }
        &.up{
          color: orangered;
        }
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
      .variance{
        flex-direction: row;
        width: auto;
      }
    }
  }
`

const sampleImage = [
  "https://lh5.googleusercontent.com/p/AF1QipPe9z6ajG6Zq1WFp6CuVb3VXdgMNI1sWJeuB0Ni=w408-h306-k-no", "https://images.unsplash.com/photo-1503932860988-56df256a6c5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://lh5.googleusercontent.com/p/AF1QipPNxflItffH0d_R7QaGqV5rLkQIfPMn4s_-tPwh=w408-h272-k-no"
]

function ShowList(props){
  const spots = props.spots ?? [];
  const navigate = useNavigate();

  return (
    <ListContainer>
      {
        spots.map((el, i) => {
          return(
            <li key={el.id}
              onClick={()=>navigate(`/spot/${el.id}`)}
            >
              <div className='ranking'>{i+1}</div>
              <div className='spot'>
                <img src={sampleImage[i%3]} alt={el.name} />
                <div className="textbox">
                  <h3>{el.name}</h3>
                  <p>{el.location.localName ?? el.location.metroName}</p>
                </div>
              </div>
              {
                el.volume && 
                <div className='volume'>
                  <h4>검색량</h4>
                  <p>{el.volume}</p>
                </div>
              }
                <div className='variance'>
                  <h4>변동</h4>
                  <p className={`${
                    el.variance===null ? 'new' :
                    el.variance>0 ? 'up' : ''
                  }`}>
                    {el.variance==0 ? '-' : el.variance ?? 'new'}
                  </p>
                </div>
            </li>
          )
        })
      }
      {
        spots.length==0 && (
          <p>데이터가 없습니다</p>
        )
      }
    </ListContainer>
  )
}

export default ShowList;