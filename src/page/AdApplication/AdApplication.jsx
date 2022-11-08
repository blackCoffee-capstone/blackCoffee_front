// core
import { useRef, useState, useCallback } from 'react';
// style
import styled from 'styled-components'
// 카카오 주소 검색
import { useDaumPostcodePopup } from 'react-daum-postcode';

// img 
import { ReactComponent as CloseSvg } from 'assets/image/common/icon/close.svg'


const PageContainer = styled.section`
  .fill{
    margin: 0 auto;
    max-width: 40rem;
    &>div{
      margin: 1.5em 0;
      h3{
        margin-bottom: 0.5em;
        font-size: var(--font-size-large);
      }
      input{
        height: 3em;
        & + input{
          margin-top: 1em;
        }
      }
      .file_list{
        display: flex;
        align-items: center;
        gap: 0.4em;
        margin-top: 1rem;
        .btn_delete{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 0.9em;
          color: red;
          border: none;
        }
      }
    }
    .btn_submit{
      width: 100%;
      height: 3em;
    }
  }
`

function AdApplication(){
  const [ file, setFile ] = useState(''); // 파일 첨부
  const inputFileEl = useRef(); // input file element
  const [address, setAddress] = useState(''); // 주소
  const [addressCode, setAddressCode] = useState(''); // 주소 코드

  const open = useDaumPostcodePopup();
  const addrSearchComplete  = useCallback((data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if(data.addressType === 'R') {
      if(data.bname !== '') {
        extraAddress += data.bname;
      }
      if(data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddressCode(data.zonecode);
    setAddress(fullAddress);
  });
  const addrSearchClick = useCallback(() => {
    open({ onComplete: addrSearchComplete });
  })

  return (
    <PageContainer className='c_main_section'>
      <section className='c_section'>
        <div className="c_inner">
          <h2 className="c_section_title">광고 신청하기</h2>
          <div className="fill">
            <div className="name">
              <h3>사업자명<i className="c_star"></i></h3>
              <input type="text" placeholder="사업자명" maxLength="13" />
            </div>
            <div className="cno">
              <h3>사업장 위치<i className="c_star"></i></h3>
              <input type="text" placeholder="사업장 위치"
                value={address ?? ''}
                onClick={()=> {
                  setAddress('');
                  addrSearchClick();
                }}
                readOnly
              />
            </div>
            <div className="contact">
              <h3>연락처<i className="c_star"></i></h3>
              <input type="tel" placeholder="전화번호) 010-1234-5678" maxLength="13" />
              <input type="email" placeholder="이메일" />
            </div>
            {/* <div className="cno">
              <h3>사업자 번호<i className="c_star"></i></h3>
              <input type="text" placeholder="사업자번호) 123-12-12345" maxLength="12" />
            </div> */}
            
            <div className="registration">
              <h3>사업자등록증 인증 <strong>(최대 500MB)</strong></h3>
              <button className='c_btn'
                onClick={()=>inputFileEl.current.click()}
              >
                파일선택
              </button>
              <input type="file" ref={inputFileEl}
                style={{ display: "none" }}
                onClick={()=> setFile('')}
                onChange={(e)=> setFile(e.target.files[0]) }
              />
              { // 파일 선택됐을 때 보이기
                file?.name && (
                  <div className="file_list">
                    <p>{ file.name }</p>
                    <button className="btn_delete" onClick={()=> setFile('')}>
                      <CloseSvg />
                    </button>
                  </div>
                )
              }
              
            </div>
            <button className='c_btn-primary btn_submit'>신청하기</button>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}

export default AdApplication;