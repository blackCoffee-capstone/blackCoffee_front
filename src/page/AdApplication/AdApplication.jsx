// core
import { useState } from 'react';
// style
import styled from 'styled-components'

const PageContainer = styled.section`

`

function AdApplication(){
  return (
    <PageContainer className='c_main_section'>
      <section>
        <div className="fill">
          <div className="fill_partner_wrap" id="profile_box">
            <h1 className="fill_box_title">프로필 정보입력</h1>
            <div className="fill_text fill_name">
                <h1>닉네임 <span className="star">*</span></h1>
                <input type="text"
                    placeholder="최대 15자 입력 가능 (초성 불가)"
                    id="nick"
                />
                <div className="check">
                    <img src="@/assets/images/register/icon_check.svg" alt="체크" />
                    <img src="@/assets/images/common/close_w.svg" alt="체크" />
                </div>
            </div>
            <div className="fill_text">
                <h1>핸드폰번호 <span className="star">*</span></h1>
                <input type="text" id="contact" placeholder="ex) 010-1234-5678" maxLength="13" />
            </div>
          </div>

          <div className="fill_double">
              <div className="fill_business" id="business_box">
                  <h1 className="fill_box_title">사업자 정보 입력</h1>
                  <div className="fill_text fill_cno">
                      <h1>사업자 번호<span className="star">*</span></h1>
                      <input type="text" id="cno" placeholder="123-12-12345" maxLength="12" />
                  </div>

                  <h1 className="fill_box_title">사업자등록증 인증 <strong>(최대 500MB)</strong></h1>
                  <div className="fill_file">
                      <button
                      // @click="$refs.fileInput.click()"
                      >파일선택</button>
                      <input
                        type="file"
                        style="display: none"
                        // @change="onFileSelected"
                        // @click="
                        //     () => {
                        //         this.$refs.fileInput.value = '';
                        //     }
                        // "
                      />
                      <div 
                        // v-if="this.file.name" 
                        className="fill_file_list"
                      >
                        <p>{ this.file.name }</p>
                        <button
                          type="button"
                          className="btn_delete"
                          // @click="
                          //     () => {
                          //         this.file = '';
                          //     }
                          // "
                        >
                          <img src="@/assets/images/common/close_w.svg" />
                        </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}

export default AdApplication;