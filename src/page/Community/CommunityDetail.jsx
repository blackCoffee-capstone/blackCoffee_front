// core
import { useState, useMemo } from 'react';
// style
import styled from 'styled-components'
// router
import { useNavigate, useParams } from 'react-router-dom'
// recoil
import { useSetRecoilState } from 'recoil';
import { messageBundle } from 'store/index';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// api
import useAuthFetch from 'api/useAuthFetch';
import useAuthPost from 'api/useAuthPost';
import useAuthDelete from 'api/useAuthDelete';
// img
import { ReactComponent as WishOn }  from "assets/image/common/icon/wish_on.svg";
import { ReactComponent as Wish }  from "assets/image/common/icon/wish.svg";

const PageContainer = styled.section`
  .detail .c_inner{
    >div{
      margin: 1rem 0;
      &:first-child{
        margin-top: 0;
      }
      >h4{
        font-size: var(--font-size-x-large);
        font-weight: var(--font-w-mid);
      }
      &.title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.2rem 1rem;
        margin: 0;
        .post_info{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.7rem;
          color: var(--font-color-sub);
          font-weight: var(--font-w-regular);
        }
      }
      &.post_action{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 0;
        padding: 0.2rem 0 1rem;
        border-bottom: 1px solid var(--border-color-default);
        .like{
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: var(--font-size-small);
          cursor: pointer;
          transition: var(--transition-fast);
          &:hover{
            color: red;
            svg{
              stroke: currentColor;
            }
          }
          svg{
            width: 2.2rem;
            height: 2.2rem;
          }
        }
        .change_action{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.2rem;
          button{
            padding: 0.5rem;
            &.modify_post{
              color: green;
            }
            &.delete_post{
              color: var(--danger-color);
            }
            &:hover{
              text-decoration: underline
            }
          }
        }
        .report{
          font-size: var(--font-size-small);
          color: var(--font-color-sub);
          transition: var(--transition-fast);
          &:hover{
            color: var(--font-color-default);
            text-decoration: underline;
          }
        }
      }
      &.content{
        min-height: 15rem;
        padding-bottom: var(--space-small);
        border-bottom: 1px solid var(--border-color-light);

        .img_swiper{
          margin-bottom: 1rem;
          width: 100%;
          .img_slide{
            width: 100%;
            height: auto;
            max-width: 40rem;
            max-height: 60rem;
            img{
              height: 100%;
              width: 100%;
              object-fit: scale-down;
            }
          }
        }
        pre{
          white-space: pre-wrap; 
        }
      }
      &.comment{
        display: flex;
        flex-direction: column;
        margin-top: var(--space-small);
        padding: 1rem;
        background-color: var(--base-color-light);
        .textarea_wrapper{
          height: 4em;
          border: 1px solid var(--border-color-light);
          width: 100%;
          padding: 0.5em 0.8em;
          margin-bottom: 0.5rem;
          background-color: #fff;
          textarea{
            width: 100%;
            height: 100%;
            padding: 0;
            border: none;
          }
        }
        .comment_submit{
          font-size: var(--font-size-small);
          align-self: flex-end;
          margin-bottom: 1rem;
        }
        .comment_list{
          .total_num{
            margin-bottom: 0.5rem;
          }
          .more{
            text-align: center;
            color: var(--font-color-sub);
            span{
              padding: 0.5rem;
              cursor: pointer;
              transition: var(--transition-fast);
              &:hover{
                color: var(--primary-color);
              }
            }
          }
          >li{
            border-top: 1px solid var(--border-color-light);
            padding: 1.5rem 0.5rem;
            p{
              display: flex;
              align-items: center;
              justify-content: space-between;
              .time{
                color: var(--font-color-sub);
              }
              .delete_comment{
                color: var(--danger-color);
              }
            }
            pre{
              margin-top: 0.5rem;
              white-space: pre-wrap; 
            }
          }
        }
        
      }
    }
    >button{
      display: block;
      margin: 1.5rem auto 0;
    }
  }
`

function CommunityDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const setAlert = useSetRecoilState(messageBundle.alert);
  const setPrompt = useSetRecoilState(messageBundle.prompt);
  const setConfirm = useSetRecoilState(messageBundle.confirm);
  const [comment, setComment] = useState('');
  const [showAllComment, setShowAllComment] = useState(false);
  const [commentId, setCommentId] = useState();

  const { mutate: commentPostApi } = useAuthPost({ url: `posts/${postId}/comments` });
  const { mutate: commentDeleteApi } = useAuthDelete({ url: `posts/${postId}/comments/${commentId}` });
  const { mutate: postDeleteApi } = useAuthDelete({ url: `posts/${postId}` });
  const { mutate: wishApi } = useAuthPost({ url: 'likes' })
  const { mutate: reportApi } = useAuthPost({ url: `posts/${postId}/reports` })
  const { data: postDetail, isLoading: isPostDetailLoading } = useAuthFetch({
    url: `posts/${postId}`,
    key: ['postDetail', postId],
  })
  const { data: commentsData, isLoading: isCommentsDataLoading, refetch: refetchComments } = useAuthFetch({
    url: `posts/${postId}/comments`,
    key: ['postComments', postId],
  })

  const slicedComments = useMemo(()=>{  // ?????? ???????????? ??????, ?????? ????????? ??????
    return showAllComment ? commentsData : commentsData.slice(0, 10);
  }, [commentsData, showAllComment])

  function onCommentSubmit(){ // ?????? ??????
    commentPostApi({
      content: comment
    }, {
      onSuccess: ()=>{
        refetchComments();
        setComment('')
      },
      onError: ()=>{
        setAlert('????????? ????????? ??????????????????');
      }
    })
  }
  function onCommentDelete(el){ // ?????? ??????
    setCommentId(el.id);
    setConfirm({
      message: '????????? ?????????????????????????',
      callback: ()=>{
        commentDeleteApi({},{
          onSuccess: ()=>{
            setAlert('????????? ?????????????????????');
            refetchComments();
          },
          onError: ()=>{
            setAlert('?????? ????????? ??????????????????');
          }
        });
      }
    })
  }
  function onPostDeleteClick(){ // ????????? ??????
    setConfirm({
      message: '???????????? ?????????????????????????',
      callback: ()=>{
        postDeleteApi({},{
          onSuccess: ()=>{
            setAlert('???????????? ?????????????????????');
            navigate('/community');
          },
          onError: ()=>{
            setAlert('????????? ????????? ??????????????????');
          }
        });
      }
    })
  }
  function onPostModifyClick(){ // ????????? ??????
    setConfirm({
      message: '???????????? ?????????????????????????',
      callback: ()=>{
        navigate(`/community/write/${postId}`);
      }
    })
  }
  function onLikeClick(){ // ????????? ?????????
    wishApi({
      postId: Number(postId),
      isLike: !postDetail.isLike
    }, {
      onError: ()=>{
        setAlert('??????????????? ?????? ????????? ?????????????????????.')
      },
      onSuccess: ()=>{
        postDetail.isLike = !postDetail.isLike
      }
    })
  }
  function onReportClick(){
    setPrompt({
      message: '?????? ????????? ???????????????',
      callback: (inputText)=>{
        reportApi({
          reason: inputText
        }, {
          onSuccess: ()=>{
            setAlert('????????? ?????????????????????');
          },
          onError: (error)=>{
            if(error.response?.data?.message=='User already reports post'){
              setAlert('?????? ?????????????????????');
            } else {
              setAlert('???????????? ?????? ????????? ??????????????????');
            }
          }
        })
      }
    })
  }

  return (
    <PageContainer className='c_main_section'>
      <section className="c_section c_top_banner">
        <picture>
          <source media="(min-width: 600px)" srcSet={require('assets/image/Community/banner.jpg')} />
          <img src={require("assets/image/Community/banner_min.jpg")} alt="???????????? ????????? ??????" 
            style={{
              objectPosition: "50% 40%",
              filter: "brightness(0.7)"
            }}
          />
        </picture>
        <h2>????????? ??????</h2>
      </section>
      <section className="c_section detail">
        <div className="c_inner">
          <div className="title">
            <h4>{postDetail.title}</h4>
            <div className='post_info'>
              <span>????????? {postDetail.views}</span>|<span>{postDetail.user.nickname}</span>|<span>{postDetail.createdAt?.slice(0,10)}</span>
            </div>
          </div>
          <div className='post_action'>
            {
              !postDetail.isWriter && 
              <button className='report'
                onClick={()=>{ onReportClick()}}
              >????????????</button>
            }
            {
              postDetail.isWriter && 
              <div className='change_action'>
                <button className='modify_post'
                  onClick={()=>{onPostModifyClick()}}
                >??????</button>
                <button className='delete_post'
                  onClick={()=>{onPostDeleteClick()}}
                >??????</button>
              </div>
            }
            <div className='like'
              onClick={()=>onLikeClick()}
            >
              <span>?????????</span>
              {
                postDetail.isLike ? <WishOn /> : <Wish />
              }
            </div>
          </div>
          <div className="content">
            {
              postDetail.photoUrls && postDetail.photoUrls.length >0 &&
              <Swiper className="img_swiper"
                slidesPerView={"auto"}
                spaceBetween={postDetail.photoUrls?.length==1 ? 0 : 10}
              >
                {
                  postDetail.photoUrls.map((el, i)=>{
                    return(
                      <SwiperSlide key={i} className="img_slide">
                        <img src={el} alt={`${i}?????? ?????????`} />
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            }
            <pre>{postDetail.content}</pre>
          </div>
          <div className='comment'>
            <div className="textarea_wrapper">
              <textarea placeholder='?????? ??????'
                value={comment}
                onChange={e=>setComment(e.currentTarget.value)}
              ></textarea>
            </div>
            <button className='c_btn comment_submit'
              onClick={onCommentSubmit}
            >
              ????????????
            </button>
            <ul className='comment_list'>
              <p className='total_num'>{commentsData.length}?????? ??????</p>
              {
                slicedComments?.length>0 && 
                slicedComments.map((el,i)=>{
                  return(
                    <li key={i}>
                      <p>
                        <span>{el.user.nickname} <span className='time'>| {el.createdAt.slice(0,10)}</span></span>
                        {
                          el.isWriter &&
                          <button className='delete_comment'
                            onClick={()=>onCommentDelete(el)}
                          >??????</button>
                        }
                      </p>
                      <pre>{el.content}</pre>
                    </li>
                  )
                })
              }
              {
                commentsData.length>10 &&
                <p className='more'>
                  <span
                    onClick={()=>setShowAllComment(!showAllComment)}
                  >{`${showAllComment ? '?????? ??????' : '?????? ?????????'}`}</span>
                </p>
              }
              {
                commentsData?.length==0 && 
                <li>????????? ????????????.</li>
              }
            </ul>
          </div>
          <button className='c_btn-primary-reverse'
            onClick={()=>{navigate(-1)}}
          >????????????</button>
        </div>
      </section>
    </PageContainer>
  );
}

export default CommunityDetail