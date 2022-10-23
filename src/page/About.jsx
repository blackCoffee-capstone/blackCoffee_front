// style
import styled from 'styled-components'

const AboutContainer = styled.section`
  .c_inner{

  }
`

function About() {
  return (
    <AboutContainer className='c_main_section'>
      <div className="c_section">
        <div className="c_inner">
        About
        </div>
      </div>
    </AboutContainer>
  );
}

export default About