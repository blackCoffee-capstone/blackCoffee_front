// core
import { useState, useEffect } from 'react';
// style
import styled from 'styled-components'
// api
import useAuthPost from 'api/useAuthPost'
// router
import { useNavigate } from 'react-router-dom';
// recoil
import { messageBundle, token } from 'store/index';
import { useSetRecoilState } from 'recoil';
// utils
import { pwCheck } from 'utils/checking/pwCheck'
// component
import { InputPassword } from 'component/common/InputBundle'

const BoxContainer = styled.div`
  .fill{
    margin-top: 1rem;
    max-width: 40rem;
    .input_title{
      margin-bottom: 0.8rem;
      color: var(--primary-color)
    }
    button{
      margin-top: 1.5rem;
      &.c_btn{
        background-color: var(--base-color-light);
        border-color: var(--border-color-light);
      }
    }
  }
`

function Resign({ setShowResign }) {
  const setConfirm = useSetRecoilState(messageBundle.confirm);
  const setAlert = useSetRecoilState(messageBundle.alert);
  const setAccessToken = useSetRecoilState(token.accessToken);
  const setRefreshToken = useSetRecoilState(token.refreshToken);
  const navigate = useNavigate();
  const [ password, setPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');

  const { mutate: resignApi } = useAuthPost({ url: 'auth/resign' });

  useEffect(()=>{
    if(password && !pwCheck(password)){
      setPasswordError('8~15자, 숫자, 영어, 특수문자가 각 1개 이상')
    } else {
      setPasswordError('');
    }
  }, [password])

  function resign() {
    if(!pwCheck(password)) return;
    setConfirm({
      message: '정말 탈퇴하시겠습니까?',
      callback: ()=> {
        resignApi(
          { password: password }, 
          { onSuccess: ()=>{
              navigate('/')
              setAlert('탈퇴되셨습니다')
              setTimeout(() => {
                setAccessToken('')
                setRefreshToken('')
              }, 1);
          },
          onError: (error)=>{
            if(error.response.status === 401){
              setAlert('비밀번호가 맞지 않습니다.')
            } else {
              setAlert('탈퇴하는데 문제가 생겼습니다.')
            }
          }
        })
      }
    })
  }

  return (
    <BoxContainer className="c_section box resign">
      <div className='box_top'>
        <h3 className="c_subtitle">탈퇴하기</h3>
        <button onClick={()=> setShowResign(false) }>
          <img src={require('assets/image/common/icon/close.svg').default} alt="" />
        </button>
      </div>
      <div className='fill'>
        <p className='input_title'>본인 확인을 위해 비밀번호를 입력해주세요</p>
        <InputPassword
          value={password}
          onChange={(e)=>setPassword(e.currentTarget.value)}
        />
        { passwordError && <p className='c_error_message'>{passwordError}</p> }

        <button className={`c_btn${password ? '-primary': ''}`}
          disabled={!password}
          onClick={()=>resign()}
        >탈퇴하기</button>
      </div>
    </BoxContainer>
  )
}

export default Resign