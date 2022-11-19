// core
import { useState, useCallback } from 'react';
// recoil
import { useSetRecoilState } from 'recoil';
import { messageBundle } from 'store/index'
// style
import styled from 'styled-components'
// component
import { InputBasic, InputEmail, InputPassword } from './component/InputBundle'

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
      .error_message{
        padding-top: 0.2rem;
        padding-left: 0.2rem;
        font-size: var(--font-size-x-small);
        color: var(--danger-color);
      }
    }
    button{
      height: 4.5rem;
      width: 100%;
      margin-top: 1rem;
    }
  }
`

function Signup() {
  const setAlert = useSetRecoilState(messageBundle.alert);

  const [ email, setEmail ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ nicknameError, setNicknameError ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [ repass, setRepass ] = useState('');
  const [ repassError, setRepassError ] = useState('');

  const resetError = useCallback(()=>{
    setEmailError('');
    setNicknameError('');
    setPasswordError('');
    setRepassError('');
  })
  const resetAll = useCallback(()=>{
    setEmail('');
    setPassword('');
    setRepass('');
    resetError();
  })

  // 회원가입 로직
  function signup(){
    resetError();
    if( !email || !password || !nickname ){
      if(!email) setEmailError('이메일을 입력해주세요');
      if(!nickname) setNicknameError('닉네임을 입력해주세요');
      if(!password) setPasswordError('비밀번호를 입력해주세요');
    } else if( password != repass ){
      setRepassError('비밀번호가 일치하지 않습니다');
    } else{
      // axios.get('https://jsonplaceholder.typicode.com/posts')
      // .then(res=> console.log(res));

      setAlert('샘플. 회원가입이 완료되었습니다');
      resetAll();
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
            <InputEmail
              value={email}
              onChange={(e)=> setEmail(e.currentTarget.value) }
            />
            { emailError && <p className='error_message'>{emailError}</p> }
          </div>
          <div className="nickname">
            <h4>닉네임</h4>
            <InputBasic placeholder="닉네임 입력"
              value={nickname}
              onChange={(e)=> setNickname(e.currentTarget.value) }
            />
            { nicknameError && <p className='error_message'>{nicknameError}</p> }
          </div>
          <div className="password">
            <h4>비밀번호</h4>
            <InputPassword
              value={password}
              onChange={(e)=>setPassword(e.currentTarget.value)}
            />
            { passwordError && <p className='error_message'>{passwordError}</p> }
          </div>
          <div className="repass">
            <h4>비밀번호 재입력</h4>
            <InputPassword placeholder="비밀번호 재입력"
              value={repass}
              onChange={(e)=>setRepass(e.currentTarget.value)}
            />
            { repassError && <p className='error_message'>{repassError}</p> }
          </div>
          <button className='c_btn-primary'
            onClick={ signup }
          >회원가입</button>
        </div>
      </section>
    </PageContainer>
  );
}

export default Signup