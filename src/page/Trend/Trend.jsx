// style
import styled from 'styled-components'

const PageContainer = styled.section`
  .c_inner{

  }
`

function Trend() {
  return (
    <PageContainer className='c_main_section'>
      <div className="c_section">
        <div className="c_inner">
          Trend
        </div>
      </div>
    </PageContainer>
  );
}

export default Trend