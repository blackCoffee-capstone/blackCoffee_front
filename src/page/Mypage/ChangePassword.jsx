// core
import { useState, useEffect } from 'react';
// style
import styled from 'styled-components'
// recoil
import { messageBundle } from 'store/index';
import { useSetRecoilState } from 'recoil';
// api
import useAuthPatch from 'api/useAuthPatch'
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
      margin-top: 1rem;
      color: var(--primary-color);
      &:first-child{
        margin-top: 0;
      }
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

function ChangePassword({ setShowChangePass }) {
  const setConfirm = useSetRecoilState(messageBundle.confirm);
  const setAlert = useSetRecoilState(messageBundle.alert);
  const [ originPw, setOriginPw ] = useState('');
  const [ originPwError, setOriginPwError ] = useState('');
  const [ newPw, setNewPw ] = useState('');
  const [ newPwError, setNewPwError ] = useState('');

  const { mutate: changePassApi } = useAuthPatch({ url: 'users/change-pw' });

  useEffect(()=>{
    if(originPw && !pwCheck(originPw)){
      setOriginPwError('8~15자, 숫자, 영어, 특수문자가 각 1개 이상')
    } else {
      setOriginPwError('');
    }
  }, [originPw])
  useEffect(()=>{
    if(newPw && !pwCheck(newPw)){
      setNewPwError('8~15자, 숫자, 영어, 특수문자가 각 1개 이상')
    } else {
      setNewPwError('');
    }
  }, [newPw])

  function changePass() {
    if(!pwCheck(originPw) || !pwCheck(newPw)) return;
    setOriginPwError('');
    setNewPwError('');
    setConfirm({
      message: '비밀번호를 변경하시겠습니까?',
      callback: ()=> {
        changePassApi(
          { originPw: originPw, newPw : newPw }, 
          { onSuccess: ()=>{
            setShowChangePass(false)  // 비밀번호 변경 창 닫기
            setAlert('비밀번호가 변경되었습니다')
          },
          onError: (error)=>{
            if(error.response.status === 401){
              setAlert('비밀번호가 맞지 않습니다.')
            } else {
              setAlert('비밀번호를 변경하는데 문제가 생겼습니다')
            }
          }
        })
      }
    })
  }

  return (
    <BoxContainer className="c_section box">
      <div className='box_top'>
        <h3 className="c_subtitle">비밀번호 변경</h3>
        <button onClick={()=> setShowChangePass(false) }>
          <img src={require('assets/image/common/icon/close.svg').default} alt="" />
        </button>
      </div>
      <div className='fill'>
        <p className='input_title'>기존 비밀번호를 입력해주세요</p>
        <InputPassword
          value={originPw}
          onChange={(e)=>setOriginPw(e.currentTarget.value)}
          />
        { originPwError && <p className='c_error_message'>{originPwError}</p> }
        <p className='input_title'>새 비밀번호를 입력해주세요</p>
        <InputPassword
          value={newPw}
          onChange={(e)=>setNewPw(e.currentTarget.value)}
        />
        { newPwError && <p className='c_error_message'>{newPwError}</p> }

        <button className={`c_btn${originPw && newPw ? '-primary': ''}`}
          disabled={!originPw || !newPw}
          onClick={()=>changePass()}
        >변경하기</button>
      </div>
    </BoxContainer>
  )
}

export default ChangePassword

