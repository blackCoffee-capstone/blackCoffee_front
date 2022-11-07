// style
import styled from 'styled-components'
// component
import ShowList from 'component/common/ShowList'
import ShowMap from 'component/common/ShowMap'
// sample data
import ListData from 'store/data/ListData.js'

const PageContainer = styled.section`
  .trend_banner{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    height: 30rem;
    background-color: #eee;
  }
  .option{
    .c_inner{
      display: flex;
      justify-content: center;
    }
  }
`

function Trend(){
  return(
    <PageContainer className='c_main_section'>
      <section className="c_section trend_banner">
        <img src={require("assets/image/Trend/banner.jpg")} alt="트렌드 페이지 배너" />
      </section>
      <section className='c_section option'>
        <div className="c_inner">
          <h2 className='c_section_title'>최신 트렌드</h2>
        </div>
      </section>
      <section className='c_section places'>
        <div className="c_inner">
          <ShowList data={ListData}/>
          <ShowMap data={ListData}/>
        </div>
      </section>
    </PageContainer>
  )
}

export default Trend;