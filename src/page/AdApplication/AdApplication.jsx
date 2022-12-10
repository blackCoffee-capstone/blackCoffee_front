// core
import { useRef, useState, useEffect, useCallback } from 'react';
// style
import styled from 'styled-components'
// 카카오 주소 검색
import { useDaumPostcodePopup } from 'react-daum-postcode'
// recoil
import { messageBundle } from 'store/index'
import { useSetRecoilState } from 'recoil';
// api
import usePost from 'api/usePost'
// utils
import { phoneFormat } from 'utils/formatting/phoneFormat'
import { emailCheck } from 'utils/checking/emailCheck';
// img 
import { ReactComponent as CloseSvg } from 'assets/image/common/icon/close.svg'

const PageContainer = styled.section`
  .fill{
    margin: 0 auto;
    max-width: 45rem;
    &>div{
      margin: 1.2em 0;
      h3{
        margin-bottom: 0.2em;
        font-size: var(--font-size-large);
      }
      input{
        height: 3em;
        &:not(:read-only):focus{
          border-color: var(--primary-color);
        }
        & + input{
          margin-top: 0.5em;
        }
      }
      .textarea_wrapper{
        width: 100%;
        height: 25rem;
        border-radius: var(--border-radius-mid);
        border: 1px solid var(--border-color-default);
        padding: 1em;
        &.focus{
          border-color: var(--primary-color);
        }
        textarea{
          padding: 0;
          width: 100%;
          height: 100%;
          border: none;
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
  const setAlert = useSetRecoilState(messageBundle.alert);

  const [name, setName] = useState(''); // 사업자명
  const [nameError, setNameError] = useState('');
  const [address, setAddress] = useState(''); // 주소
  const [addressError, setAddressError] = useState('');
  const [phone, setPhone] = useState(''); // 전화번호
  const [email, setEmail] = useState(''); // 이메일
  const [emailError, setEmailError] = useState('');
  const [file, setFile] = useState(); // 파일 첨부
  const [fileError, setFileError] = useState('');
  const [requirement, setRequirement] = useState(''); // 요구사항
  const [requirementError, setRequirementError] = useState('');
  
  const inputFileEl = useRef(); // input file element

  const { mutate: adApplyApi } = usePost({ url: 'ad-forms' })

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
    // setAddressCode(data.zonecode);
    setAddress(fullAddress);
  });
  const addrSearchClick = useCallback(() => {
    open({ onComplete: addrSearchComplete });
  });
  const onFileSelected = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {  // 파일이 존재하는지
      if(e.target.files[0].size > 1048576 * 500) {  // 500MB 제한
        setFileError('500MB 이하 파일을 선택해 주세요')
      } else {
        setFile(e.target.files[0])
      }
    }
  });
  const resetError = useCallback(() => {
    setNameError('');
    setAddressError('');
    setEmailError('');
    setFileError('');
    setRequirementError('');
  });
  const resetAll = useCallback(() => {
    resetError();
    setName('');
    setAddress('');
    setPhone('');
    setEmail('');
    setFile();
    setRequirement('');
  });

  function adApply(){
    resetError();

    if(!name || !address || !email || !file || !requirement){ 
      if(!name) setNameError('사업자명을 입력해주세요');
      if(!address) setAddressError('사업장 주소를 입력해주세요');
      if(!emailCheck(email)) setEmailError(!email ? '이메일을 입력해주세요' : '이메일 형식을 확인해주세요');
      if(!file) setFileError('파일을 선택해주세요');
      if(!requirement) setRequirementError('요구사항을 작성해주세요');
      return; // 중단
    }
    const formData = new FormData();
    formData.append("businessName", name);
    formData.append("address", address);
    formData.append("phoneNumber", phone);
    formData.append("email", email);
    formData.append("file", file);
    formData.append("requirement", requirement);

    adApplyApi(formData, {
      onSuccess: ()=>{
        setAlert('광고 요청이 완료되었습니다');
        resetAll();
      },
      onError: ()=>{
        setAlert('광고 요청 중 오류가 발생했습니다');
      }
    })
  }

  return (
    <PageContainer className='c_main_section'>
      <section className='c_section'>
        <div className="c_inner">
          <h2 className="c_title">광고 신청하기</h2>
          <div className="fill">
            <div className="name">
              <h3>사업자명<i className="c_star"></i></h3>
              <input type="text"
                placeholder="사업자명"
                maxLength="13" 
                value={name}
                onChange={(e)=> setName(e.currentTarget.value) }
              />
              { nameError && <p className='c_error_message'>{nameError}</p> }
            </div>
            <div className="cno">
              <h3>사업장 위치<i className="c_star"></i></h3>
              <input type="text" placeholder="사업장 위치"
                value={address}
                onClick={()=> {
                  setAddress('');
                  addrSearchClick();
                }}
                readOnly
              />
              { addressError && <p className='c_error_message'>{addressError}</p> }
            </div>
            <div className="contact">
              <h3>연락처(이메일 필수)<i className="c_star"></i></h3>
              <input type="tel" placeholder="전화번호) 010-1234-5678" maxLength="13"
                value={phone}
                onChange={(e)=> setPhone(phoneFormat(e.currentTarget.value)) }
              />
              <input type="email" placeholder="이메일"
                value={email}
                onChange={(e)=> setEmail(e.currentTarget.value) }
              />
              { emailError && <p className='c_error_message'>{emailError}</p> }
            </div>
            {/* <div className="cno">
              <h3>사업자 번호<i className="c_star"></i></h3>
              <input type="text" placeholder="사업자번호) 123-12-12345" maxLength="12" />
            </div> */}
            
            <div className="registration">
              <h3>사업자등록증 인증 <strong>(최대 500MB)</strong><i className="c_star"></i></h3>
              <button className='c_btn'
                onClick={()=>inputFileEl.current.click()}
              >
                파일선택
              </button>
              <input type="file" ref={inputFileEl}
                style={{ display: "none" }}
                onClick={()=> {
                  setFile();
                  setFileError('');
                }}
                onChange={(e)=> onFileSelected(e) }
              />
              { fileError && <p className='c_error_message'>{fileError}</p> }
              { // 파일 선택됐을 때 선택된 파일 보이게
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
            <div className='requirement'>
              <h3>요구사항<i className="c_star"></i></h3>
              <div className="textarea_wrapper">
                <textarea
                  onFocus={(e)=>{ e.currentTarget.parentElement.classList.add('focus') }}
                  onBlur={(e)=>{ e.currentTarget.parentElement.classList.remove('focus') }}
                  placeholder="광고 요구사항"
                  value={requirement}
                  onChange={(e)=>setRequirement(e.currentTarget.value) }
                ></textarea>
              </div>
              { requirementError && <p className='c_error_message'>{requirementError}</p> }
            </div>
            <button className='c_btn-primary btn_submit'
              onClick={adApply}
            >신청하기</button>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}

export default AdApplication;