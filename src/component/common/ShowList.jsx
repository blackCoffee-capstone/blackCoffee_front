// style
import styled from 'styled-components'
// router
import { useNavigate } from 'react-router-dom';
// utils
import { numberFormat } from 'utils/formatting/numberFormat'
// img
import NoPhoto from 'assets/image/common/no_photo.png'
import Wish from 'assets/image/common/icon/wish.svg'
import WishOn from 'assets/image/common/icon/wish_on.svg'

const ListContainer = styled.ul`
  width: 100%;
  >li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0 0.5rem;
    border-bottom: 1px solid var(--border-color-light);
    text-align: center;
    height: 11rem;
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
    >div{
      padding: 0.2rem 0.6rem;
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
        flex-shrink: 0;
        width: 13rem;
        height: 9rem;
        object-fit: cover;
        border-radius: var(--border-radius-mid);
        background-color: var(--loading-color);
        transition: var(--transition-default);
        border: none;
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
    .views,
    .variance{
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      align-items: center;
      gap: 0 0.5rem;
      width: 8rem;
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
    .wishView{
      display: flex;
      align-items: center;
      flex-shrink: 0;
      gap: 1rem;
    }
    .variance{
      width: 6rem;
    }
    .wishes{
      width: 2rem;
      height: 2rem;
      padding: 0;
      margin-top: 0.2rem;
      img{
        height: 100%;
        width: 100%;
      }
    }
    @media screen and (max-width: 600px) {
      &{
        flex-wrap: wrap;
        height: auto;
      }
      .ranking{
        display: none;
      }
      .views,
      .volume,
      .variance{
        flex-direction: row;
        width: auto;
      }
    }
  }
  >p{
    text-align: center;
  }
`

function ShowList(props){
  const listData = props?.listData ?? [];
  const navigate = useNavigate();

  return (
    <ListContainer>
      { listData?.length>0 &&
        listData?.map((el, i) => {
          return(
            <li key={el.id}
              onClick={()=>navigate(`/spot/${el.id}`)}
            >
              <div className='ranking'>
                { el.rank ?? el.order ??i+1 }
              </div>
              <div className='spot'>
                <img src={el.photoUrl ?? NoPhoto}
                  style={{
                    background: `url(${NoPhoto}) no-repeat center center / 100%`
                  }}
                />
                <div className="textbox">
                  <h3>{el.name}</h3>
                  <p>{el.address}</p>
                </div>
              </div>
              { el.variance !== undefined &&
                <div className='variance'>
                  <h4>변동</h4>
                  <p className={`${
                    el.variance===null ? 'new' :
                    el.variance>0 ? 'up' : ''
                  }`}>
                    { 
                      el.variance==0 ? '-' : 
                      el.variance ? (el.variance<0?"":"+") + el.variance
                      : 'new'
                    }
                  </p>
                </div>
              }
              <div className='wishView'>
                { el.views!==undefined &&
                  <div className='views'>
                    <h4>조회수</h4>
                    <p>{numberFormat(el.views)}</p>
                  </div>
                }
                { el.wishes !== undefined &&
                  <div className='wishes'>
                    { 
                      el.wishes==0 ? <img src={Wish} /> 
                      : <img src={WishOn} />
                    }
                  </div>
                }
              </div>
            </li>
          )
        })
      }
      {
        listData.length==0 && (
          <p>데이터가 없습니다</p>
        )
      }
    </ListContainer>
  )
}

export default ShowList;