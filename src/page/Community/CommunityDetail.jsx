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
        gap: 1rem;
        margin: 0;
        .post_action{
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
      }
      &.post_info{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.7rem;
        color: var(--font-color-sub);
        font-weight: var(--font-w-regular);
        padding: 0.5rem 0 1rem;
        margin-top: 0;
        border-bottom: 1px solid var(--border-color-default);
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
            max-height: 50rem;
            img{
              height: 100%;
              width: 100%;
              object-fit: contain;
              background-color: var(--loading-color);
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
  const setConfirm = useSetRecoilState(messageBundle.confirm);
  const [comment, setComment] = useState('');
  const [showAllComment, setShowAllComment] = useState(false);
  const [commentId, setCommentId] = useState();

  const { mutate: commentPostApi } = useAuthPost({ url: `/posts/${postId}/comments` });
  const { mutate: commentDeleteApi } = useAuthDelete({ url: `/posts/${postId}/comments/${commentId}` });
  const { mutate: postDeleteApi } = useAuthDelete({ url: `/posts/${postId}` });

  const { data: postDetail, isLoading: isPostDetailLoading } = useAuthFetch({
    url: `posts/${postId}`,
    key: ['postDetail', postId],
  })
  const { data: commentsData, isLoading: isCommentsDataLoading, refetch: refetchComments } = useAuthFetch({
    url: `posts/${postId}/comments`,
    key: ['postComments', postId],
  })

  const slicedComments = useMemo(()=>{  // 댓글 더보기를 위한, 자린 코멘트 목록
    return showAllComment ? commentsData : commentsData.slice(0, 10);
  }, [commentsData, showAllComment])

  function onCommentSubmit(){ // 댓글 달기
    commentPostApi({
      content: comment
    }, {
      onSuccess: ()=>{
        refetchComments();
        setComment('')
      },
      onError: ()=>{
        setAlert('댓글을 다는데 실패했습니다');
      }
    })
  }
  function onCommentDelete(el){ // 댓글 삭제
    setCommentId(el.id);
    setConfirm({
      message: '댓글을 삭제하시겠습니까?',
      callback: ()=>{
        commentDeleteApi({},{
          onSuccess: ()=>{
            setAlert('댓글을 삭제하였습니다');
            refetchComments();
          },
          onError: ()=>{
            setAlert('댓글 삭제에 실패했습니다');
          }
        });
      }
    })
  }
  function onPostDeleteClick(){ // 포스트 삭제
    setConfirm({
      message: '게시글을 삭제하시겠습니까?',
      callback: ()=>{
        postDeleteApi({},{
          onSuccess: ()=>{
            setAlert('게시글을 삭제하였습니다');
            navigate('/community');
          },
          onError: ()=>{
            setAlert('게시글 삭제에 실패했습니다');
          }
        });
      }
    })
  }
  function onPostModifyClick(){ // 포스트 수정
    setConfirm({
      message: '게시글을 수정하시겠습니까?',
      callback: ()=>{
        navigate(`/community/write/${postId}`);
      }
    })
  }

  return (
    <PageContainer className='c_main_section'>
      <section className="c_section c_top_banner">
        <picture>
          <source media="(min-width: 600px)" srcSet={require('assets/image/Community/banner.jpg')} />
          <img src={require("assets/image/Community/banner_min.jpg")} alt="커뮤니티 페이지 배너" 
            style={{
              objectPosition: "50% 40%",
              filter: "brightness(0.7)"
            }}
          />
        </picture>
        <h2>나만의 장소</h2>
      </section>
      <section className="c_section detail">
        <div className="c_inner">
          <div className="title">
            <h4>{postDetail.title}</h4>
            {
              postDetail.isWriter && 
              <div className='post_action'>
                <button className='modify_post'
                  onClick={()=>{onPostModifyClick()}}
                >수정</button>
                <button className='delete_post'
                  onClick={()=>{onPostDeleteClick()}}
                >삭제</button>
              </div>
            }
          </div>
          <div className='post_info'>
            <span>조회수 {postDetail.views}</span>|<span>{postDetail.user.nickname}</span>|<span>{postDetail.createdAt?.slice(0,10)}</span>
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
                        <img src={el} alt={`${i}번째 이미지`} />
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
              <textarea placeholder='댓글 입력'
                value={comment}
                onChange={e=>setComment(e.currentTarget.value)}
              ></textarea>
            </div>
            <button className='c_btn comment_submit'
              onClick={onCommentSubmit}
            >
              댓글달기
            </button>
            <ul className='comment_list'>
              <p className='total_num'>{commentsData.length}개의 댓글</p>
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
                          >삭제</button>
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
                  >{`${showAllComment ? '댓글 접기' : '댓글 더보기'}`}</span>
                </p>
              }
              {
                commentsData?.length==0 && 
                <li>댓글이 없습니다.</li>
              }
            </ul>
          </div>
          <button className='c_btn-primary-reverse'
            onClick={()=>{navigate(-1)}}
          >목록으로</button>
        </div>
      </section>
    </PageContainer>
  );
}

export default CommunityDetail