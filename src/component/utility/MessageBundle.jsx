// style
import styled from "styled-components"
// redux
import { useSelector, useDispatch } from 'react-redux'
import { alert, error } from 'store/slice/messageBundle';

const BundleCommon = styled.div` // MessageBundle 공통
  z-index: 1000;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 40rem;
  width: 90%;
  min-width: calc(var(--min-width) * 0.9);
  border-radius: 0.8rem;
  background-color: #fff;
  .message {
    height: calc(100% - 10rem);
    padding: 2rem;
    border-radius: 1rem;
    background-color: #fff;
    font-size: var(--font-size-large);
    text-align: center;
    word-break: keep-all;
    font-weight: var(--font-w-mid);
    .btn {
      display: inline-block;
      padding: 0.9rem 2.6rem;
      margin-top: 3rem;
      border: none;
      border-radius: var(--border-radius-small); /* 원래 .8rem */
      color: #fff;
      font-size: 1.6rem;
      cursor: pointer;
    }
    /* @media screen and ( max-width: 768px ) {
      font-size: var(--font-size-large);
    } */
  }
`
const Alert = styled(BundleCommon)`
  .btn_close {
    background-color: var(--primary-color);
    color: var(--primary-color-contrast);
  }
  .btn_close:hover {
    /* filter: brightness(0.93); */
    background-color: var(--primary-color-effect);
  }
`
const Confirm = styled(BundleCommon)`
  .btn_continue {
    margin-right: 10px;
    background-color: var(--secondary-color);
    color: var(--secondary-color-contrast);
    &:hover {
      filter: brightness(0.93);
    }
  }
  .btn_close {
    background-color: var(--primary-color);
    color: var(--primary-color-contrast);
    &:hover {
      /* filter: brightness(0.93); */
      background-color: var(--primary-color-effect);
    }
  }
`
const Error = styled(BundleCommon)`
  border: 1px solid var(--danger-color);
  .btn_close {
    background-color: var(--danger-color);
    &:hover {
      filter: brightness(1.1);
    }
  }
`

function MessageBundle(){
  const messageBundle = useSelector((state) => state.messageBundle);
  const dispatch = useDispatch();

  return(
    <>
      {
        (messageBundle.alert || messageBundle.error) && (
          <div className="c_screen_filter" style={{zIndex: 1000}}></div>
        )
      }
      { // alert 팝업
        messageBundle.alert && (
          <Alert className="alert">
            <div className="message">
              <p>{messageBundle.alert}</p>
              <button className="btn btn_close"
                onClick={()=>dispatch(alert(''))}
              >
                확인
              </button>
            </div>
          </Alert>
        )
      }
      {/* { // confirm 팝업
        messageBundle.confirm && (
          <Confirm className="confirm">
            <div className="message">
              <p>{messageBundle.confirm}</p>
              <button className="btn btn_continue"
                onClick={()=>{
                  messageBundle.confirmCallback();
                  dispatch(confirm(''));
                  dispatch(confirmCallback(null));
                }}
              >
                확인
              </button>
              <button className="btn btn_close"
                onClick={()=>{
                  dispatch(confirm(''));
                  dispatch(confirmCallback(null));
                }}
              >
                취소
              </button>
            </div>
          </Confirm>
        )
      } */}
      { // error 팝업
        messageBundle.error && (
          <Error className="error">
            <div className="message">
              <p>{messageBundle.error}</p>
              <button className="btn btn_close"
                onClick={()=>dispatch(error(''))}
              >
                확인
              </button>
            </div>
          </Error>
        )
      }
    </>
  )
}

export default MessageBundle