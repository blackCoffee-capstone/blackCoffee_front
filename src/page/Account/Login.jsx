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
import { InputEmail, InputPassword } from 'component/common/InputBundle'

const PageContainer = styled.section`
  .fillup{
    .c_inner{
      max-width: 500px;
      .signin{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: var(--space-small) 5%;
        /* @media screen and ( max-width:600px ){ */
          flex-direction: column;
        /* } */
        .left{
          width: 100%;
          padding: 2rem 0;
          /* @media screen and ( max-width:600px ){ */
            padding-bottom: 0;
          /* } */
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
          /* width: 1px;
          min-height: 100%; */
          background-color: var(--border-color-light);
          /* @media screen and ( max-width:600px ){ */
            width: 100%;
            min-height: 1px;
          /* } */
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
      setAlert('?????? ????????? ???????????????.')
      navigate('/')
    }
  }, [])

  const { mutate: loginApi, isLoading: isLoginLoading } = usePost({ url: 'auth/login' });

  // ????????? ??????
  function login(){
    if(isLoginLoading) return;  // ?????? ????????? ????????? ??????

    setEmailError('');
    setPasswordError('');
    if( !email || !password ){
      if(!email) setEmailError('???????????? ??????????????????');
      if(!password) setPasswordError('??????????????? ??????????????????');
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
            setAlert('?????? ???????????? ?????? ????????? ?????? ????????? ????????? ?????????')
            navigate('/choosetheme');
          } else {
            navigate('/');
            setAlert('???????????????')
          }
        },
        onError: ()=>{
          setAlert('????????? ????????? ?????? ??????????????? ??????????????????')
        }
      });
    }
  }

  return (
    <PageContainer className='c_main_section'>
      <section className="c_section">
        <h2 className='c_title'>?????????</h2>
      </section>
      <section className="c_section fillup">
        <div className="c_inner">
          <div className="signin">
            <div className="left">
              <div className="email">
                <h4>?????????</h4>
                <InputEmail
                  value={email}
                  onChange={(e)=> setEmail(e.currentTarget.value) }
                />
                { emailError && <p className='c_error_message'>{emailError}</p> }
              </div>
              <div className="password">
                <h4>????????????</h4>
                <div className="input_wrap">
                  <InputPassword
                    value={password}
                    onChange={(e)=>setPassword(e.currentTarget.value)}
                    onKeyPress={(e)=>{
                      if (e.key === 'Enter' && password) { login() }
                    }}
                  />
                  { passwordError && <p className='c_error_message'>{passwordError}</p> }
                </div>
              </div>
              <Link to="/findpass" className="find_pass">???????????? ??????</Link>
              <button className='c_btn-primary'
                onClick={ login }
              >?????????</button>
            </div>
            <div className="line"></div>
            <div className="right">
              {/* <button
                type="button"
                className="c_btn-google"
                onClick={() => {
                  location.href='javascript:void(0)'; setAlert('??????????????????.');
                }}
              >
                <img src={ require("assets/image/common/ci/facebook_color.png")} alt="facebook" />
                <p>Facebook?????? ?????????</p>
              </button> */}
              <button
                type="button"
                className="c_btn-kakao"
                onClick={() => {
                  window.Kakao.Auth.authorize({
                    redirectUri: 'https://jigeumyeogi.com/social/kakao',
                  });
                }}
              >
                <img src={ require("assets/image/common/ci/kakao.svg").default }  alt="kakao" />
                <p>???????????? ?????????</p>
              </button>
            </div>
          </div>
          <div className="signup">
            <p>?????? ????????? ???????????????? <Link to="/signup">????????????</Link></p>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Login