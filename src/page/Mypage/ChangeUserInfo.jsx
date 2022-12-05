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
import { nicknameCheck } from 'utils/checking/nicknameCheck'
import { nameCheck } from 'utils/checking/nameCheck'
// component
import { InputBasic } from 'component/common/InputBundle'

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

function ChangeUserInfo({ setShowChangeUserInfo, userData, userRefetch }) {
  const setConfirm = useSetRecoilState(messageBundle.confirm);
  const setAlert = useSetRecoilState(messageBundle.alert);
  const [ name, setName ] = useState(userData.name);
  const [ nameError, setNameError ] = useState('');
  const [ nickname, setNickname ] = useState(userData.nickname);
  const [ nicknameError, setNicknameError ] = useState('');

  const { mutate: changeUserApi } = useAuthPatch({ url: 'users' });

  useEffect(()=>{
    if(name && !nameCheck(name)){
      setNameError('한글 2~8자 영어 2~16자')
    } else {
      setNameError('');
    }
  }, [name])
  useEffect(()=>{
    if(nickname && !nicknameCheck(nickname)){
      setNicknameError('영어 4자 혹은 한글 2자 이상')
    } else {
      setNicknameError('');
    }
  }, [nickname])


  function changeInfo() {
    if(!nameCheck(name) || !nicknameCheck(nickname)) return;
    if(name==userData.name && nickname == userData.nickname) {
      setAlert('변경사항이 없습니다.')
      return;
    }
    setNameError('');
    setNicknameError('');
    const payload = {
      name: name
    }
    if(nickname!==userData.nickname){
      payload.nickname=nickname
    }
    setConfirm({
      message: '유저 정보를 변경하시겠습니까?',
      callback: ()=> {
        changeUserApi(
          payload, 
          { onSuccess: ()=>{
            userRefetch();
            setShowChangeUserInfo(false)  // 유저정보 변경 창 닫기
            setAlert('유저 정보가 변경되었습니다')
          },
          onError: (error)=>{
            if(error.response.data.message=='Nickname is already exist'){
              setAlert('닉네임이 이미 존재합니다')
            } else {
              setAlert('유저 정보를 변경하는데 문제가 생겼습니다')
            }
          }
        })
      }
    })
  }

  return (
    <BoxContainer className="c_section box">
      <div className='box_top'>
        <h3 className="c_subtitle">유저 정보 변경</h3>
        <button onClick={()=> setShowChangeUserInfo(false) }>
          <img src={require('assets/image/common/icon/close.svg').default} alt="" />
        </button>
      </div>
      <div className='fill'>
        <p className='input_title'>변경할 이름을 입력해주세요</p>
        <InputBasic
          value={name}
          onChange={(e)=>setName(e.currentTarget.value)}
        />
        { nameError && <p className='c_error_message'>{nameError}</p> }
        <p className='input_title'>변경할 닉네임을 입력해주세요</p>
        <InputBasic
          value={nickname}
          onChange={(e)=>setNickname(e.currentTarget.value)}
        />
        { nicknameError && <p className='c_error_message'>{nicknameError}</p> }

        <button className={`c_btn${name && nickname && !(name==userData.name && nickname == userData.nickname) ? '-primary': ''}`}
          disabled={!name || !nickname
            || (name==userData.name && nickname == userData.nickname)
          }
          onClick={()=>changeInfo()}
        >변경하기</button>
      </div>
    </BoxContainer>
  )
}

export default ChangeUserInfo

