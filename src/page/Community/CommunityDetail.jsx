// style
import styled from 'styled-components'
// router
import { useNavigate, useParams } from 'react-router-dom'
// api
import useAuthFetch from 'api/useAuthFetch';

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
        gap: 0.4rem 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid var(--border-color-default);
        p{
          display: flex;
          align-items: center;
          gap: 0.7rem;
          color: var(--font-color-sub);
          font-weight: var(--font-w-regular);
        }
      }
      &.content{
        min-height: 15rem;
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

  // const { data: postData, isLoading: isPostDataLoading } = useAuthFetch({
  //   url: `posts/${postId}`,
  //   key: ['postDetail', postId],
  // })

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
      <div className="c_section detail">
        <div className="c_inner">
          <div className="title">
            <h4>제목제목</h4>
            <p><span>조회수 10</span>|<span>임종용</span>|<span>2022-11-11</span></p>
          </div>
          <div className="content">
            <p>content</p>
          </div>
          <button className='c_btn-primary-reverse'
            onClick={()=>{navigate(-1)}}
          >목록으로</button>
        </div>
      </div>
    </PageContainer>
  );
}

export default CommunityDetail