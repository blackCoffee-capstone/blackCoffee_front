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
// style
import styled from 'styled-components'
// component
import { InputBasic, InputEmail } from 'component/common/InputBundle'

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
      &:not(.c_btn-primary){
        background-color: var(--base-color-light);
        border-color: var(--border-color-light);
      }
    }
  }
`

function FindPassword() {
  const setAlert = useSetRecoilState(messageBundle.alert);
  const navigate = useNavigate();

  const [ email, setEmail ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ emailChecked, setEmailCheck ] = useState(false);  // 이메일 인증 여부
  const [ isEmailChecking, setIsEmailChecking ] = useState(false);  // 이메일 체크 중인지
  const [ emailCheckCount, setEmailCheckCount ] = useState(0);  // 인증코드 유효시간
  const [ verifyCode, setVerifyCode ] = useState('');  // 인증코드
  const [ verifyCodeError, setVerifyCodeError ] = useState('');  // 인증코드 에러

  const { mutate: findPassApi, isLoading: isFindPassLoading } = usePost({ url: 'auth/find-pw' });
  const { mutate: emailVerify, isLoading: isEmailVerifyLoading } = usePost({ url: 'auth-codes/find-pw' });
  const { mutate: codeVerify, isLoading: isCodeverifyLoading } = usePost({ url: 'auth-codes/find-pw/verify' });

  const resetError = useCallback(()=>{
    setEmailError('');
    setVerifyCodeError('');
  })
  
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
  
  useEffect(()=>{ // 이메일 형식 확인
    if(email && !emailCheck(email)){
      setEmailError('이메일 형식으로 입력해주세요')
    } else {
      setEmailError('')
    }
  }, [email])

  // 비밀번호 변경하기
  function findPass(){
    if(isFindPassLoading) return; // 이미 비밀번호 변경중이면 중단
    
    resetError();
    if( !email || !emailChecked){
      if(!email) setEmailError('이메일을 입력해주세요');
      if(!emailChecked) setEmailError('이메일을 인증해주세요');
      return;
    } else if(!emailCheck(email)){
      setEmailError('이메일 형식으로 입력해주세요')
      return;
    } else{
      findPassApi({
        email,
      }, {
        onSuccess: ()=>{
          setAlert('임시 비밀번호가 발급되었습니다. 이메일을 확인해주세요');
          navigate('/login')
        },
        onError: (error)=>{
          setAlert('임시 비밀번호 발급에 실패하였습니다.')
        }
      });
    }
  }
  // 이메일 인증하기
  function checkEmail(){
    if(isEmailVerifyLoading) return;  // 이미 인증 진행중이면 중단
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
          setAlert('이메일 코드를 보내는데 실패했습니다.')
        }
      }
    )
  }
  // 코드 확인하기
  function checkCode(){
    if(isCodeverifyLoading) return;  // 이미 코드 확인 진행중이면 중단
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

  return (
    <PageContainer className='c_main_section'>
      <section className="c_section">
        <h2 className='c_title'>비밀번호 찾기</h2>
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
          <button className={`c_btn${emailChecked ? '-primary' : ''} btn-submit`}
            disabled={!emailChecked}
            onClick={ findPass }
          >비밀번호 재발급</button>
        </div>
      </section>
    </PageContainer>
  );
}

export default FindPassword