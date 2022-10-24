// style
import styled from 'styled-components'

const PageContainer = styled.section`
  .c_inner{

  }
`

function Home() {
  return (
    <PageContainer className='c_main_section'>
      <div className="c_section">
        <div className="c_inner">
          home
        </div>
      </div>
    </PageContainer>
  );
}

export default Home