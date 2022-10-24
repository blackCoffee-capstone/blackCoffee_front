// style
import styled from 'styled-components'

const PageContainer = styled.section`
  .c_inner{

  }
`

function Recommend() {
  return (
    <PageContainer className='c_main_section'>
      <div className="c_section">
        <div className="c_inner">
          Recommend
        </div>
      </div>
    </PageContainer>
  );
}

export default Recommend