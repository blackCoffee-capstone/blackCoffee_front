// style
import styled from 'styled-components'

const PageContainer = styled.section`
  .c_inner{

  }
`

function Signin() {
  return (
    <PageContainer className='c_main_section'>
      <div className="c_section">
        <div className="c_inner">
          Signin
        </div>
      </div>
    </PageContainer>
  );
}

export default Signin