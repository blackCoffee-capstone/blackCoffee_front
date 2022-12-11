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
  li{
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
        gap: 1.5rem;
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
          overflow: hidden;
          h3{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 100%;
            font-size: var(--font-size-large);
            font-weight: var(--font-w-mid);
          }
          p{
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--font-color-sub);
          }
        }
      }
      &.nickname{
        color: var(--font-color-sub);
        width: 10rem;
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
    @media screen and (max-width: 600px) {
      .nickname h4{
        display: none;
      }
    }
  }
`

function CommunityList(props){
  const accessToken = useRecoilValue(token.accessToken);
  const setAlert = useSetRecoilState(messageBundle.alert)
  const listData = props.listData ?? [];
  const navigate = useNavigate();

  const { mutate: likeApi } = useAuthPost({ url: 'likes' })

  function onLikeClick(e, i, el){
    e.stopPropagation()
    if(!accessToken){
      setAlert('로그인이 필요합니다');
      return;
    }
    likeApi({
      postId: el.id,
      isLike: !el.isLike
    }, {
      onError: ()=>{
        setAlert('좋아요하는 도중 문제가 발생하였습니다.')
      },
      onSuccess: ()=>{
        listData[i].isLike = !el.isLike
        listData[i].likes = !el.isLike ? listData[i].likes-1 : listData[i].likes+1
      }
    })
  }

  return (
    <ListContainer>
      {
        listData.map((el, i) => {
          return(
            <li key={el.id}
              onClick={()=>navigate(`/community/${el.id}`)}
            >
              <div className='ranking'>{el.order}</div>
              <div className='spot'>
                <img src={el.photoUrls[0] ?? NoPhoto} alt={el.name} />
                <div className="textbox">
                  <h3>{el.title}</h3>
                  <p>{el.address}</p>
                </div>
              </div>
              {
                el.user?.nickname && 
                <div className='nickname amount'>
                  <h4>{el.user.nickname}</h4>
                  <p>{el.createdAt.slice(0,10)}</p>
                </div>
              }
              <div className='wishView'>
                { el.views!==undefined &&
                  <div className='views amount'>
                    <h4>조회수</h4>
                    <p>{numberFormat(el.views)}</p>
                  </div>
                }
                { el.likes !== undefined &&
                  <div className='wishes amount'
                    onClick={(e)=> onLikeClick(e, i, el)}
                  >
                    { !el.isLike ? <Wish /> : <WishOn /> }
                    <p>{el.likes}</p>
                  </div>
                }
              </div>
            </li>
          )
        })
      }
      {
        listData.length==0 && (
          <p style={{ textAlign: 'center' }}>데이터가 없습니다</p>
        )
      }
    </ListContainer>
  )
}

export default CommunityList;