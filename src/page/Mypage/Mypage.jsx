// style
import styled from 'styled-components'
// api
import useAuthFetch from 'api/useAuthFetch'
// img


const PageContainer = styled.section`
  .profile{
    position: relative;
    box-shadow: var(--box-shadow03);
    border-radius: var(--border-radius-mid);
    padding: var(--space-small);
    @media screen and (max-width: 600px){
      padding: 2rem;
    }
    .profile_top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btn_edit{
      }
    }
    .user_info{
      padding: 1rem;
      p{
        padding: 0.3rem 0;
        display: flex;
        align-items: center;
        >:first-child{
          width: 5em;
          flex-shrink: 0;
          color: var(--primary-color);
        }
      }
      .login_type{
        >:last-child{
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: var(--font-size-small);
          &.now_here{
            color: var(--primary-color);
          }
          &.kakao{
            color: #ffe812;
          }
          &.facebook{
            color: #4267B2;
          }
          img{
            width: 2rem;
            height: 2rem;
          }
        }
      }
    }
  }
`

function Mypage() {
  const { data: userData, isLoading: isUserLoading } = useAuthFetch({ url: 'users', key: ['user'] });

  return (
    <PageContainer className='c_main_section'>
      <div className="c_inner">
        <section className="c_section">
          <h2 className='c_title'>마이페이지</h2>
        </section>
        <section className="c_section profile">
          <div className='profile_top'>
            <h3 className="c_subtitle">프로필</h3>
            <button className='btn_edit'>
              내정보
            </button>
          </div>
          <div className='user_info'>
            <p>
              <span>이름</span>
              <span>{userData.name}</span>
            </p>
            <p>
              <span>이메일</span>
              <span>{userData.email}</span>
            </p>
            <p>
              <span>닉네임</span>
              <span>{userData.nickname}</span>
            </p>
            <p className='login_type'>
              <span>가입경로</span>
              {
                userData.type=='Normal' ? <span className='now_here'><img src={ require("assets/image/common/icon.svg").default} alt="지금여기" />지금여기</span>
                : userData.type=='kakao' ? <span className='kakao'><img src={ require("assets/image/common/ci/kakao.svg").default} alt="카카오" />카카오</span>
                : <span className='facebook'><img src={ require("assets/image/common/ci/facebook_color.png")} alt="페이스북" />페이스북</span>
              }
            </p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

export default Mypage