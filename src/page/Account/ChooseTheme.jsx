// style
import styled from 'styled-components'

const PageContainer = styled.section`
  .options{
    .c_inner{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-small);
      .option_box{
        position: relative;
        width: 100%;
        height: 30rem;
        border-radius: var(--border-radius-mid);
        box-shadow: var(--box-shadow02);
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        h3{
          position: absolute;
          top: 0;
          width: 100%;
          padding: 1em;
          color: #fff;
          font-size: var(--font-size-large);
          font-weight: var(--font-w-bold);
          background-color: rgba(0,0,0,0.5);
        }
      }
    }
  }
    
`

function ChooseTheme() {
  return (
    <PageContainer className='c_main_section'>
      <section className='c_section'>
        <h2 className='c_title'>원하는 테마 선택</h2>
      </section>
      <div className="c_section options">
        <div className="c_inner">
          <div className='option_box'>
            <img src={require("assets/image/samplePlace/sample_jeju.jpg")} alt="box" />
            <h3>이미지1</h3>
          </div>
          <div className='option_box'>
            <img src={require("assets/image/samplePlace/sample_jeju.jpg")} alt="box" />
            <h3>이미지1</h3>
          </div>
          <div className='option_box'>
            <img src={require("assets/image/samplePlace/sample_jeju.jpg")} alt="box" />
            <h3>이미지1</h3>
          </div>
          <div className='option_box'>
            <img src={require("assets/image/samplePlace/sample_jeju.jpg")} alt="box" />
            <h3>이미지1</h3>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default ChooseTheme