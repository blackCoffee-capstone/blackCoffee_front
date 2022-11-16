// core
import { useCallback } from 'react';
// style
import styled from 'styled-components'

const InputContainer = styled.div`
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
`

function InputPassword(props) {

  // 비밀번호 보기 토글 함수
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
    <InputContainer>
      <input type="password" placeholder="비밀번호"
        required
        value={props.value}
        onChange={props.onChange}
      />
      <div className='passShow'
        onClick={ togglePassShow }
      >
        <img src={ require("assets/image/common/icon/visibility.svg").default } />
        <img className="on" src={ require("assets/image/common/icon/visibility_off.svg").default } />
      </div>
    </InputContainer>
  )
}

export default InputPassword