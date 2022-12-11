// core
import { useState, useEffect } from 'react';
// recoil
import { useSetRecoilState } from 'recoil'
import { messageBundle } from 'store/index'
// router
import { useNavigate, useParams } from 'react-router-dom';
// style
import styled from 'styled-components'
// api
import useAuthPost from 'api/useAuthPost'
import useAuthFetch from 'api/useAuthFetch'
// component
import Pagination from 'component/common/Pagination'
// img
import NoPhoto from 'assets/image/common/no_photo.png'
import { ReactComponent as WishOn }  from "assets/image/common/icon/wish_on.svg";
import { ReactComponent as Wish }  from "assets/image/common/icon/wish.svg";

const PageContainer = styled.section`
  .box{
    position: relative;
    box-shadow: var(--box-shadow03);
    border-radius: var(--border-radius-mid);
    padding: 1.5rem;
    ul>li{
      display: flex;
      align-items: center;
      gap: 0 1rem;
      padding: 0.4rem 0;
      margin: 0.2rem 0;
      cursor: pointer;
      transition: var(--transition-default);
      &:hover{
        background-color: var(--effect-color);
      }
      img{
        width: 10rem;
        height: 7rem;
        border-radius: var(--border-radius-small);
        overflow: hidden;
        object-fit: cover;
        flex-shrink: 0;
      }
      .text_box{
        flex-grow: 1;
        overflow: hidden;
        h4{
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: var(--font-size-mid);
          font-weight: var(--font-w-mid);
        }
        p{
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: var(--font-size-small);
          color: var(--font-color-sub);
        }
      }
      .heart{
        width: 2.5rem;
        height: 2.5rem;
        flex-shrink: 0;
        svg{
          width: 100%;
          height: 100%;
        }
        @media screen and (max-width: 600px) {
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }
`

function Mypage() {
  const { which: whichList } = useParams();
  const navigate = useNavigate();
  const setAlert = useSetRecoilState(messageBundle.alert);

  const [page, setPage] = useState(1)

  const { data: wishes, isLoading: isWishesLoading, refetch: wishesRefetch } = useAuthFetch({
    url: 'wishes',
    key: ['wishes'] ,
    enabled: whichList=='wishes'
  });
  const { data: likes, isLoading: isLikesLoading, refetch: likesRefetch } = useAuthFetch({
    url: 'likes',
    key: ['likes'],
    enabled: whichList=='likes'
  });

  const { mutate: wishApi } = useAuthPost({ url: 'wishes' })
  const { mutate: likeApi } = useAuthPost({ url: 'likes' })

  useEffect(()=>{
    if(whichList!=='wishes' && whichList!=='likes'){
      setAlert('잘못된 접근입니다');
      navigate('/');
      return;
    }
  }, [])

  function onHeartClick(e, i, el){
    e.stopPropagation()
    if(whichList=='wishes'){
      wishApi({
        spotId: el.id,
        isWish: !el.isWish
      }, {
        onError: ()=>{
          setAlert('찜하는 도중 문제가 발생하였습니다.')
        },
        onSuccess: ()=>{
          wishes.wishSpots[i].isWish = !el.isWish
        }
      })
    } else {
      likeApi({
        postId: el.id,
        isLike: !el.isLike
      }, {
        onError: ()=>{
          setAlert('좋아요하는 도중 문제가 발생하였습니다.')
        },
        onSuccess: ()=>{
          likes.likePosts[i].isLike = !el.isLike
        }
      })
    }
  }

  return (
    <PageContainer className='c_main_section'>
      <div className="c_inner">
        <section className="c_section">
          <h2 className='c_title'>내 {whichList=='wishes' ? '찜목록' : '좋아요 목록'}</h2>
        </section>
        <section className="c_section box">
          {
            whichList=='wishes' &&
            <ul>
              {
                wishes?.wishSpots.length==0 &&
                <li style={{ justifyContent: 'center' }}>찜한 여행지가 없습니다</li>
              }
              {
                wishes?.wishSpots.length>0 &&
                wishes?.wishSpots.map((el, i)=>{
                  return(
                    <li key={`wish${i}`}
                      onClick={()=>navigate(`/spot/${el.id}`)}
                    >
                      <img src={el.photoUrl ?? NoPhoto} alt="" 
                        style={{
                          background: `url(${NoPhoto}) no-repeat center center / 100%`
                        }}
                      />
                      <div className="text_box">
                        <h4>{el.name}</h4>
                        <p>{el.address}</p>
                      </div>
                      <div className='heart'
                        onClick={(e)=> onHeartClick(e, i, el)}
                      >
                        { !el.isWish ? <Wish /> : <WishOn /> }
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          }
          {
            whichList=='likes' &&
            <ul>
              {
                likes?.likePosts.length==0 &&
                <li style={{ justifyContent: 'center' }}>좋아요한 게시글이 없습니다</li>
              }
              {
                likes?.likePosts.length>0 &&
                likes?.likePosts.map((el, i)=>{
                  return(
                    <li key={`wish${i}`}
                      onClick={()=>navigate(`/community/${el.id}`)}
                    >
                      <img src={el.photoUrls.length>0 ? el.photoUrls[0] : NoPhoto } alt="" 
                        style={{
                          background: `url(${NoPhoto}) no-repeat center center / 100%`
                        }}
                      />
                      <div className="text_box">
                        <h4>{el.title}</h4>
                        <p>{el.address}</p>
                      </div>
                      <div className='heart'
                        onClick={(e)=> onHeartClick(e, i, el)}
                      >
                        { !el.isLike ? <Wish /> : <WishOn /> }
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          }
          <Pagination page={page} setPage={setPage} totalPage={ whichList=='wishes' ? wishes.totalPage : likes.totalPage} />
        </section>
      </div>
    </PageContainer>
  );
}

export default Mypage