// style
import styled from 'styled-components'

const PageContainer = styled.section`
  .c_inner{

  }
`

function FindPassword() {
  return (
    <PageContainer className='c_main_section'>
      <div className="c_section">
        <div className="c_inner">
          FindPassword
        </div>
      </div>
    </PageContainer>
  );
}

export default FindPassword