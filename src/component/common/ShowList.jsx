// style
import styled from 'styled-components'
// router
import { useNavigate } from 'react-router-dom';
// recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { token, messageBundle } from 'store/index'
// api
import useAuthPost from 'api/useAuthPost'
// utils
import { numberFormat } from 'utils/formatting/numberFormat'
// img
import NoPhoto from 'assets/image/common/no_photo.png'
import { ReactComponent as WishOn }  from "assets/image/common/icon/wish_on.svg";
import { ReactComponent as Wish }  from "assets/image/common/icon/wish.svg";

const ListContainer = styled.ul`
  width: 100%;
  >li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color-light);
    text-align: center;
    height: 10rem;
    padding: 0.5rem 0;
    gap: 0.2rem 0.5rem;
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
      text-overflow: ellipsis;
      overflow: hidden;
      &.ranking{
        width: 6rem;
        font-weight: var(--font-w-mid);
        font-size: var(--font-size-mid);
        white-space: nowrap;
        flex-shrink: 0;
      }
      &.spot{
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
      &.variance{
        width: 5rem;
        p{
          font-weight: var(--font-w-bold);
          font-size: var(--font-size-mid);
          &.new{
            color: red;
            margin-top: -2px;
          }
          &.up{
            color: orangered;
          }
        }
      }
      &.wishView{
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
        .views{
          width: 7rem;
        }
        .wishes{
          z-index: 1;
          width: 6rem;
          padding: 0.5rem;
          margin-top: 0.2rem;
          user-select: none;
          svg{
            width: 2rem;
            height: 2rem;
            transition: var(--transition-default);
          }
          &:hover{
            svg{
              stroke: red !important;
            }
          }
        }
      }
    }
    .amount{
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      align-items: center;
      gap: 0 0.5rem;
      white-space: nowrap;
      p{
        font-size: var(--font-size-small);
      }
    }
    @media screen and (max-width: 768px) {
      &{
        flex-wrap: wrap;
        height: auto;
      }
      .ranking{
        display: none;
      }
      .amount{
        flex-direction: row;
        width: auto !important;
      }
      .wishes p{
        margin-top: -2px;
      }
    }
  }
  >p{
    text-align: center;
  }
`

function ShowList(props){
  const accessToken = useRecoilValue(token.accessToken);
  const setAlert = useSetRecoilState(messageBundle.alert)
  const listData = props?.listData ?? [];
  const navigate = useNavigate();

  const { mutate: wishApi } = useAuthPost({ url: 'wishes' })

  function onWishClick(e, i, el){
    e.stopPropagation()
    if(!accessToken){
      setAlert('로그인이 필요합니다');
      return;
    }
    wishApi({
      spotId: el.id,
      isWish: !el.isWish
    }, {
      onError: ()=>{
        setAlert('찜하는 도중 문제가 발생하였습니다.')
      },
      onSuccess: ()=>{
        listData[i].isWish = !el.isWish
        listData[i].wishes = !el.isWish ? listData[i].wishes-1 : listData[i].wishes+1
      }
    })
  }

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
                <div className='variance amount'>
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
                  <div className='views amount'>
                    <h4>조회수</h4>
                    <p>{numberFormat(el.views)}</p>
                  </div>
                }
                { el.wishes !== undefined &&
                  <div className='wishes amount'
                    onClick={(e)=> onWishClick(e, i, el)}
                  >
                    { !el.isWish ? <Wish /> : <WishOn /> }
                    <p>{el.wishes}</p>
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