// core
import { useCallback } from 'react';
// style
import styled, { css } from 'styled-components'

const InputContainer = styled.div`
  position: relative;
  input{
    height: 4.5rem;
    border: 1px solid var(--border-color-default);
    &:focus{
      border-color: var(--primary-color);
    }
    /* password */
    padding-right: ${(props) => props.type=="password" && "4rem"};
  }
`
const PassShow = styled.div`
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
`
// 기본 입력 컴포넌트
function InputBasic({ children, ...props }) {
  return(
    <InputContainer type={props.type} >
      <input
        type={props.type ?? 'text'}
        {...props}
      />
      {children}
    </InputContainer>
  )
}
// 이메일 입력 컴포넌트
function InputEmail(props) {
  return(
    <InputBasic
      type="email"
      placeholder="이메일 주소"
      {...props}
    />
  )
}
// 비밀번호 입력 컴포넌트
function InputPassword(props) {
  // 비밀번호 보기 토글
  const togglePassShow = useCallback((e)=>{
    const target = e.currentTarget;
    if (target.previousElementSibling.type == "text") {
      target.previousElementSibling.type = "password";
    } else {
      target.previousElementSibling.type = "text";
    }
    target.children[0].classList.toggle("on");
    target.children[1].classList.toggle("on");
  })

  return(
    <InputBasic type="password" placeholder={props.placeholder ?? '비밀번호'}
      {...props}
    >
      <PassShow
        onClick={ togglePassShow }
      >
        <img src={ require("assets/image/common/icon/visibility.svg").default } />
        <img className="on" src={ require("assets/image/common/icon/visibility_off.svg").default } />
      </PassShow>
    </InputBasic>
  )
}

export { InputBasic, InputEmail, InputPassword }