// style
import styled from 'styled-components'

const PageContainer = styled.section`
  .c_inner{

  }
`

function Myplace() {
  return (
    <PageContainer className='c_main_section'>
      <section className="c_section c_top_banner">
        <picture>
          <source media="(min-width: 600px)" srcSet={require('assets/image/Community/banner.jpg')} />
          <img src={require("assets/image/Community/banner_min.jpg")} alt="커뮤니티 페이지 배너" 
            style={{
              objectPosition: "50% 40%",
              filter: "brightness(0.7)"
            }}
          />
        </picture>
        <h2>나만의 장소</h2>
      </section>
      <div className="c_section">
        <div className="c_inner">
          나만의 장소 커뮤니티
        </div>
      </div>
    </PageContainer>
  );
}

export default Myplace