// core
import { useState, useEffect } from 'react'
// recoil
import { useRecoilState, useSetRecoilState } from 'recoil'
import { token, messageBundle, userState } from 'store/index'
// router
import { Link, useNavigate } from 'react-router-dom'
// style
import styled from 'styled-components'
// api
import usePost from 'api/usePost'
// component
import { InputEmail, InputPassword } from './component/InputBundle'

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
          h4{
            margin-bottom: 1rem;
            color: var(--primary-color);
            font-size: var(--font-tiny);
            font-weight: var(--font-w-mid);
            @media screen and ( max-width:600px ){
              margin-bottom: 0.5rem;
            }
          }
          .error_message{
            padding-top: 0.2rem;
            padding-left: 0.2rem;
            font-size: var(--font-size-x-small);
            color: var(--danger-color);
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
  const [ accessToken, setAccessToken ] = useRecoilState(token.accessToken);
  const setAlert = useSetRecoilState(messageBundle.alert);
  const setRefreshToken = useSetRecoilState(token.refreshToken);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const [ email, setEmail ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');

  useEffect(()=>{
    if(accessToken){
      setAlert('이미 로그인 하셨습니다.')
      navigate('/')
    }
  }, [])

  const { mutate: loginApi } = usePost({ url: 'auth/login' });

  // 로그인 로직
  function login(){
    setEmailError('');
    setPasswordError('');
    if( !email || !password ){
      if(!email) setEmailError('이메일을 입력해주세요');
      if(!password) setPasswordError('비밀번호를 입력해주세요');
    } else{
      loginApi({
          email: email,
          password: password,
        }, {
        onSuccess: (data)=>{
          setUser(data.data.user);
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);
          if(data.data.user.isNewUser){
            setAlert('맞춤 서비스를 위해 원하는 여행 테마를 선택해 주세요')
            navigate('/choosetheme');
          } else {
            navigate('/');
            setAlert('환영합니다')
          }
        },
        onError: ()=>{
          setAlert('올바른 아이디 혹은 비밀번호를 입력해주세요')
        }
      });
    }
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
                <h4>이메일</h4>
                <InputEmail
                  value={email}
                  onChange={(e)=> setEmail(e.currentTarget.value) }
                />
                { emailError && <p className='error_message'>{emailError}</p> }
              </div>
              <div className="password">
                <h4>비밀번호</h4>
                <div className="input_wrap">
                  <InputPassword
                    value={password}
                    onChange={(e)=>setPassword(e.currentTarget.value)}
                  />
                  { passwordError && <p className='error_message'>{passwordError}</p> }
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
                onClick={() => {
                  location.href='javascript:void(0)'; setAlert('구현중입니다.');
                }}
              >
                <img src={ require("assets/image/common/ci/facebook_color.png")} alt="facebook" />
                <p>Facebook으로 로그인</p>
              </button>
              <button
                type="button"
                className="c_btn-kakao"
                onClick={() => { location.href='javascript:void(0)'; setAlert('구현중입니다.'); }}
                // onClick={() => location.href='https://manager.meta-buysell.com/kakao/signin'}
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