// style
import styled from 'styled-components'
// component
import ShowList from 'component/common/ShowList'
import ShowMap from 'component/common/ShowMap'
// sample data
import ListData from 'store/data/ListData.js'

const PageContainer = styled.section`
  .recommend_banner{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    height: 18rem;
    background-color: #eee;
  }
  .option{
    .c_inner{
      display: flex;
      justify-content: center;
    }
  }
`

function Recommend(){
  return(
    <PageContainer className='c_main_section'>
      <section className="c_section recommend_banner">
        배너 영역
      </section>
      <section className='c_section option'>
        <div className="c_inner">
          <h2 className='c_section_title'>맞춤 추천</h2>
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

export default Recommend;