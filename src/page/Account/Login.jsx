// core
import { useState } from 'react';
// router
import { Link } from 'react-router-dom'
// style
import styled from 'styled-components'

const PageContainer = styled.section`
  .fillup{
    .signin{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: var(--space-small) 5%;
      @media screen and ( max-width:600px ){
        flex-direction: column;
      }
      .left{
        width: 100%;
        padding: 2rem 0;
        @media screen and ( max-width:600px ){
          padding-bottom: 0;
        }
        >div{
          margin-bottom: 2rem;
          @media screen and ( max-width:600px ){
            margin-bottom: 1rem;
          }
          p{
            margin-bottom: 1rem;
            color: var(--primary-color);
            font-size: var(--font-tiny);
            font-weight: var(--font-w-mid);
          }
          input{
            height: 4.5rem;
            border: 1px solid var(--primary-color);
          }
          .input_wrap{
            position: relative;
            .passShow{
              z-index: 1;
              position: absolute;
              top: 50%;
              right: 0;
              transform: translate(-50%, -50%);
              cursor: pointer;
              img{
                display: none;
                width: 2rem;
                height: 2rem;
                &.on{
                  display: block;
                }
              }
            }
          }
        }
        .find_pass{
          display: inline-block;
          margin-bottom: 2rem;
          color: var(--font-color-sub);
          transition: var(--transition-fast);
          &:hover{
            color: var(--font-color-default);
          }
          @media screen and ( max-width:600px ){
            margin-bottom: 1rem;
          }
        }
        button{
          height: 4.5rem;
          width: 100%;
        }
      }
      .line {
        width: 1px;
        min-height: 100%;
        background-color: var(--border-color-light);
        @media screen and ( max-width:600px ){
          width: 100%;
          min-height: 1px;
        }
      }
      .right{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2rem;
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          height: 5rem;
          border: 1px solid var(--border-color-light);
          &:hover{
            background-color: var(--base-color-light);
          }
          img {
            width: 2.5rem;
            height: 2.5rem;
            margin-right: Var(--margin-inner-short);
          }
        }
      }
    }
    .signup{
      text-align: center;
      margin-top: var(--space-small);
      a{
        color: var(--primary-color);
        transition: var(--transition-fast);
        &:hover{
          color: var(--primary-color-effect);
          text-decoration: underline;
        }
      }
    }
  }
`

function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  // 로그인 로직
  function login(){
    console.log(email, password)
  }

  // 비밀번호 보이기 토글
  function togglePassShow(e) {
    const target = e.currentTarget;
    if (target.previousElementSibling.type == "text") {
      target.previousElementSibling.type = "password";
    } else {
      target.previousElementSibling.type = "text";
    }
    target.children[0].classList.toggle("on");
    target.children[1].classList.toggle("on");
  }

  return (
    <PageContainer className='c_main_section'>
      <section className="c_section">
        <h2 className='c_title'>로그인</h2>
      </section>
      <section className="c_section fillup">
        <div className="c_inner">
          <div className="signin">
            <div className="left">
              <div className="email">
                <p>이메일</p>
                <input type="email" placeholder="이메일 주소"
                  value={email}
                  onChange={(e)=> setEmail(e.currentTarget.value) }
                />
              </div>
              <div className="password">
                <p>비밀번호</p>
                <div className="input_wrap">
                  <input type="password" placeholder="비밀번호"
                    required
                    value={password}
                    onChange={(e)=> setPassword(e.currentTarget.value) }
                  />
                  <div className="passShow"
                    onClick={ togglePassShow }
                  >
                    <img src={ require("assets/image/common/icon/visibility.svg").default } />
                    <img className="on" src={ require("assets/image/common/icon/visibility_off.svg").default } />
                  </div>
                </div>
              </div>
              <Link to="/findpass" className="find_pass">비밀번호 찾기</Link>
              <button className='c_btn-primary'
                onClick={ login }
              >로그인</button>
            </div>
            <div className="line"></div>
            <div className="right">
              <button
                type="button"
                className="c_btn-google"
                onClick={() => location.href='https://manager.meta-buysell.com/google/signin'}
              >
                <img src={ require("assets/image/common/ci/facebook_color.png")} alt="facebook" />
                <p>Facebook으로 로그인</p>
              </button>
              <button
                type="button"
                className="c_btn-kakao"
                onClick={() => location.href='https://manager.meta-buysell.com/kakao/signin'}
              >
                <img src={ require("assets/image/common/ci/kakao.svg").default }  alt="kakao" />
                <p>카카오로 로그인</p>
              </button>
            </div>
          </div>
          <div className="signup">
            <p>아직 계정이 없으신가요? <Link to="/signup">회원가입</Link></p>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Login