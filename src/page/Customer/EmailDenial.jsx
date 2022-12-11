// style
import styled from 'styled-components'
// img
import MailDenial from 'assets/image/Customer/icon_mail_denial.svg'

const PageContainer = styled.section`
  .c_inner{
    max-width: 780px;
    img{
      display: block;
      width: 20rem;
      height: 20rem;
      margin: 0 auto var(--space-small);
    }
  }
`

function EmailDenial() {
  return (
    <PageContainer className='c_main_section'>
      <div className="c_section">
        <div className="c_inner">
          <img src={MailDenial} className="icon_mail_denial" alt="이메일 무단수집거부" />

          <p>
            본 웹사이트는 게시된 이메일주소가 전자우편 수집프로그램이나 그 밖의 기술적 장치를 이용하여 무단 수집되는것을 거부합니다. 이를 위반시 정보통신망 이용 및 정보보호 등에 관한 법률 등에 의해 형사 처벌 받을 수 있습니다.
            <br />
            <br />
            정보통신망 이용촉진 및 정보보호 등에 관한법률 제50조의 2 (전자우편주소의 무단 수집행위 등 금지)
          </p>
        </div>
      </div>
    </PageContainer>
  );
}

export default EmailDenial