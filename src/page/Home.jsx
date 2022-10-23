// style
import styled from 'styled-components'

const HomeContainer = styled.section`
  .c_inner{

  }
`

function Home() {
  return (
    <HomeContainer className='c_main_section'>
      <div className="c_section">
        <div className="c_inner">
          home
        </div>
      </div>
    </HomeContainer>
  );
}

export default Home