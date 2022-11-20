// style
import styled from "styled-components"
// recoil
import { useRecoilState } from 'recoil';
import { messageBundle } from 'store/index'

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
  const [ alert, setAlert ] = useRecoilState(messageBundle.alert);
  const [ confirm, setConfirm ] = useRecoilState(messageBundle.confirm);
  const [ error, setError ] = useRecoilState(messageBundle.error);

  return(
    <>
      {
        (alert || confirm.message || error) && (
          <div className="c_screen_filter" style={{zIndex: 1000}}></div>
        )
      }
      { // alert 팝업
        alert && (
          <Alert className="alert" 
            // v-show="alertBundle.alertContent"
          >
            <div className="message">
              <p>{alert}</p>
              <button className="btn btn_close"
                onClick={()=>setAlert('')}
              >
                확인
              </button>
            </div>
          </Alert>
        )
      }
      { // confirm 팝업
        confirm.message && (
          <Confirm className="confirm">
            <div className="message">
              <p>{confirm.message}</p>
              <button className="btn btn_continue"
                // @click="alertBundle.confirmContinue"
              >
                확인
              </button>
              <button className="btn btn_close"
                onClick={()=>setConfirm({message: '', callback: null})}
              >
                취소
              </button>
            </div>
          </Confirm>
        )
      }
      { // error 팝업
        error && (
          <Error className="error">
            <div className="message">
              <p>{error}</p>
              <button className="btn btn_close"
                onClick={()=>setError('')}
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