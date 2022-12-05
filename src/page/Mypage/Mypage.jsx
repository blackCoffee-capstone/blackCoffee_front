// core
import { useState } from 'react';
// style
import styled from 'styled-components'
// api
import useAuthFetch from 'api/useAuthFetch'
// component
import Resign from './Resign';
import ChangePassword from './ChangePassword';
import ChangeUserInfo from './ChangeUserInfo';
// tippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/themes/light.css'; // optional

const PageContainer = styled.section`
  .box{
    position: relative;
    box-shadow: var(--box-shadow03);
    border-radius: var(--border-radius-mid);
    padding: var(--space-small);
    @media screen and (max-width: 600px){
      padding: 2rem;
    }
    .box_top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      img{
        width: 1em;
        height: 1em;
      }
      .btn_edit{
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        margin-right: -0.5rem;
        
      }
      .edit_menu{
        li{
          padding: 0.6rem 1rem;
          cursor: pointer;
          &:hover{
            background-color: var(--effect-color);
          }
        }
      }
    }
    .user_info{
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
  const { data: userData, isLoading: isUserLoading, refetch: userRefetch } = useAuthFetch({ url: 'users', key: ['user'] });

  const [ showResign, setShowResign ] = useState(false);
  const [ showChangePass, setShowChangePass ] = useState(false);
  const [ showChangeUserInfo, setShowChangeUserInfo ] = useState(false);

  return (
    <PageContainer className='c_main_section'>
      <div className="c_inner">
        <section className="c_section">
          <h2 className='c_title'>마이페이지</h2>
        </section>
        { !showResign && !showChangePass && !showChangeUserInfo &&
          <section className="c_section box">
            <div className='box_top'>
              <h3 className="c_subtitle">프로필</h3>
              <Tippy
                interactive={true}
                theme='light'
                content={
                  <ul className='edit_menu'>
                    <li onClick={()=>setShowChangeUserInfo(true)}>유저 정보 변경</li>
                    <li onClick={()=>setShowChangePass(true)}>비밀번호 변경</li>
                    <li onClick={()=>setShowResign(true)}>회원탈퇴</li>
                  </ul>
                }
              >
                <button className='btn_edit'>
                  <img src={require('assets/image/common/icon/setting.png')} alt="" />
                  내정보
                </button>
              </Tippy>
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
                  : userData.type=='Kakao' ? <span className='kakao'><img src={ require("assets/image/common/ci/kakao.svg").default} alt="카카오" />카카오</span>
                  : <span className='facebook'><img src={ require("assets/image/common/ci/facebook_color.png")} alt="페이스북" />페이스북</span>
                }
              </p>
            </div>
          </section>
        }
        {
          showResign &&
          <Resign setShowResign={setShowResign} />
        }
        {
          showChangePass &&
          <ChangePassword setShowChangePass={setShowChangePass}/>
        }
        {
          showChangeUserInfo &&
          <ChangeUserInfo setShowChangeUserInfo={setShowChangeUserInfo} userData={userData} userRefetch={userRefetch} />
        }
      </div>
    </PageContainer>
  );
}

export default Mypage