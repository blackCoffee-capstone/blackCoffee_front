// core
import { useState, useCallback, useEffect } from 'react';
// recoil
import { useSetRecoilState } from 'recoil';
import { messageBundle } from 'store/index'
// router
import { useNavigate } from 'react-router-dom'
// api
import usePost from 'api/usePost'
// utils
import { emailCheck } from 'utils/checking/emailCheck';
import { pwCheck } from 'utils/checking/pwCheck';
// style
import styled from 'styled-components'
// component
import { InputBasic, InputEmail, InputPassword } from 'component/common/InputBundle'

const PageContainer = styled.section`
  .fillup{
    width: 100%;
    max-width: 50rem;
    .c_inner>div{
      margin-bottom: 2rem;
      h4{
        margin-bottom: 1rem;
        color: var(--primary-color);
        font-weight: var(--font-w-mid);
      }
      &.verifyCode>div,
      &.email>div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        >:first-child{
          flex-grow: 1;
        }
        input.checked{
          background-color: var(--base-color-light);
          border-color:var(--border-color-light);
          color: var(--font-color-sub);
          cursor: default;
        }
        button{
          height: 4.5rem;
          flex-shrink: 0;
          border-color:var(--primary-color);
          color: var(--primary-color);
          &.checked{
            background-color: var(--base-color-light);
            border-color:var(--border-color-light);
          }
        }
      }
    }
    .btn-submit{
      height: 4.5rem;
      width: 100%;
      margin-top: 1rem;
    }
  }
`

function Signup() {
  const setAlert = useSetRecoilState(messageBundle.alert);
  const navigate = useNavigate();

  const [ email, setEmail ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ emailChecked, setEmailCheck ] = useState(false);  // 이메일 인증 여부
  const [ isEmailChecking, setIsEmailChecking ] = useState(false);  // 이메일 체크 중인지
  const [ emailCheckCount, setEmailCheckCount ] = useState(0);  // 인증코드 유효시간
  const [ verifyCode, setVerifyCode ] = useState('');  // 인증코드
  const [ verifyCodeError, setVerifyCodeError ] = useState('');  // 인증코드 에러
  const [ name, setName ] = useState('');
  const [ nameError, setNameError ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ nicknameError, setNicknameError ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [ repass, setRepass ] = useState('');
  const [ repassError, setRepassError ] = useState('');

  const { mutate: signupApi, isLoading: isFindPassLoading } = usePost({ url: 'auth/signup' });
  const { mutate: emailVerify, isLoading: isEmailVerifyLoading } = usePost({ url: 'auth-codes/signup' });
  const { mutate: codeVerify, isLoading: isCodeVerifyLoading } = usePost({ url: 'auth-codes/signup/verify' });

  const resetError = useCallback(()=>{
    setEmailError('');
    setNameError('');
    setVerifyCodeError('');
    setNicknameError('');
    setPasswordError('');
    setRepassError('');
  })
  // const resetAll = useCallback(()=>{
  //   setEmail('');
  //   setName('');
  //   setNickname('');
  //   setPassword('');
  //   setRepass('');
  //   resetError();
  // })

  
  useEffect(()=>{ // 이메일 인증 시간 업데이트
    let timeID;
    if(isEmailChecking){
      timeID= setInterval(() => {
        if(emailCheckCount<=0 || isEmailChecking==false){
          clearInterval(timeID)
          setIsEmailChecking(false)
          setEmailCheckCount(0)
        } else {
          setEmailCheckCount(emailCheckCount-1)
        }
      }, 1000);
    }
    return ()=>clearInterval(timeID);
  }, [isEmailChecking, emailCheckCount])
  
  useEffect(()=>{ // 비밀번호 형식 확인
    if(password && !pwCheck(password)){
      setPasswordError('8~15자, 숫자, 영어, 특수문자가 각 1개 이상')
    } else{
      setPasswordError('')
    }
  }, [password])
  useEffect(()=>{ // 이메일 형식 확인
    if(email && !emailCheck(email)){
      setEmailError('이메일 형식으로 입력해주세요')
    } else {
      setEmailError('')
    }
  }, [email])

  // 이메일 인증하기
  function checkEmail(){
    if(isEmailVerifyLoading) return; // 이미 인증 중이면 중단
    if(!email) {
      setEmailError('이메일을 입력해주세요.');
      return;
    }
    if(isEmailChecking) return;
    setEmailError('');
    emailVerify(
      { email: email },
      {
        onSuccess: ()=>{
          setIsEmailChecking(true)
          setEmailCheckCount(180)
        },
        onError: (error)=>{
          if(error.response.data.message=='Email is already verified'){
            setAlert('이미 인증된 이메일입니다.')
            setIsEmailChecking(false)
            setEmailCheck(true)
          } else if(error.response.data.message=='Email is already exist'){
            setAlert('이미 가입된 회원입니다.')
            navigate('/login')
          } else {
            setAlert('이메일 코드를 보내는데 실패했습니다.')
          }
        }
      }
    )
  }
  // 코드 확인하기
  function checkCode(){
    if(isCodeVerifyLoading) return; // 이미 코드 확인 중이면 중단

    if(!verifyCode) {
      setVerifyCodeError('코드를 입력해주세요.');
      return;
    }
    setVerifyCodeError('')
    codeVerify(
      { email: email, code: verifyCode },
      {
        onSuccess: ()=>{
          setIsEmailChecking(false);
          setEmailCheckCount(0);
          setEmailCheck(true);
          setAlert('이메일 인증 완료')
        },
        onError: ()=>{
          setVerifyCodeError('인증 실패')
        }
      }
    )
  }
  // 회원가입 로직
  function signup(){
    if(isFindPassLoading) return; // 이미 회원가입중이면 중단
    resetError();
    if( !email || !emailChecked || !nickname || !name || !password ){
      if(!email) setEmailError('이메일을 입력해주세요');
      if(!emailChecked) setEmailError('이메일을 인증해주세요');
      if(!nickname) setNicknameError('닉네임을 입력해주세요');
      if(!name) setNameError('이름을 입력해주세요');
      if(!password) setPasswordError('비밀번호를 입력해주세요');
      return;
    } else if( password != repass ){
      setRepassError('비밀번호가 일치하지 않습니다');
    } else if(!pwCheck(password) || !emailCheck(email)){
      setEmailError('이메일 형식으로 입력해주세요')
      setPasswordError('8~15자, 숫자, 영어, 특수문자가 각 1개 이상')
      setAlert('이메일과 비밀번호 형식을 다시 확인해주세요');
      return;
    } else{
      signupApi({
        email,
        nickname,
        password,
        name,
      }, {
        onSuccess: ()=>{
          setAlert('회원가입이 완료되었습니다.');
          navigate('/login')
        },
        onError: (error)=>{
          if(error.response.data.message=='Email is already exist'){
            setAlert('이미 가입된 회원입니다.')
          }
          setAlert('회원가입에 실패했습니다.')
        }
      });
    }
  }

  return (
    <PageContainer className='c_main_section'>
      <section className="c_section">
        <h2 className='c_title'>회원가입</h2>
      </section>
      <section className="c_section fillup">
        <div className="c_inner">
          <div className="email">
            <h4>이메일</h4>
            <div>
              <InputEmail
                value={email}
                onChange={(e)=> setEmail(e.currentTarget.value) }
                readOnly={emailChecked || isEmailChecking}
                className={`${emailChecked || isEmailChecking ? 'checked' : ''}`}
              />
              <button className={`c_btn ${emailChecked || isEmailChecking ? 'checked' : ''}`}
                disabled={emailChecked || isEmailChecking}
                onClick={()=> {
                  if(!emailChecked) { checkEmail() }
                }}
              >인증하기</button>
            </div>
            { emailError && <p className='c_error_message'>{emailError}</p> }
          </div>
          { emailCheckCount>0 && isEmailChecking &&
            <div className="verifyCode">
              <div>
                <InputBasic placeholder="인증코드 입력"
                  value={verifyCode}
                  onChange={(e)=> setVerifyCode(e.currentTarget.value) }
                />
                <p>{`${Math.floor(emailCheckCount/60)}:${(emailCheckCount%60).toString().padStart(2, 0)}`}</p>
                <button className='c_btn'
                  onClick={()=> { checkCode() }}
                >코드확인</button>
              </div>
              { verifyCodeError && <p className='c_error_message'>{verifyCodeError}</p> }
            </div>
          }
          <div className="nickname">
            <h4>닉네임</h4>
            <InputBasic placeholder="닉네임 입력"
              value={nickname}
              onChange={(e)=> setNickname(e.currentTarget.value) }
            />
            { nicknameError && <p className='c_error_message'>{nicknameError}</p> }
          </div>
          <div className="name">
            <h4>이름</h4>
            <InputBasic placeholder="이름 입력"
              value={name}
              onChange={(e)=> setName(e.currentTarget.value) }
            />
            { nameError && <p className='c_error_message'>{nameError}</p> }
          </div>
          <div className="password">
            <h4>비밀번호</h4>
            <InputPassword
              value={password}
              onChange={(e)=>setPassword(e.currentTarget.value)}
            />
            { passwordError && <p className='c_error_message'>{passwordError}</p> }
          </div>
          <div className="repass">
            <h4>비밀번호 재입력</h4>
            <InputPassword placeholder="비밀번호 재입력"
              value={repass}
              onChange={(e)=>setRepass(e.currentTarget.value)}
            />
            { repassError && <p className='c_error_message'>{repassError}</p> }
          </div>
          <button className='c_btn-primary btn-submit'
            onClick={ signup }
          >회원가입</button>
        </div>
      </section>
    </PageContainer>
  );
}

export default Signup