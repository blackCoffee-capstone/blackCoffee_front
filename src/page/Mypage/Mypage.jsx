// style
import styled from 'styled-components'
// api
import useAuthFetch from 'api/useAuthFetch'

const PageContainer = styled.section`
  .c_inner{

  }
`

function Mypage() {
  const { data: userData, isLoading: isUserLoading } = useAuthFetch({ url: 'users', key: ['user'] });

  return (
    <PageContainer className='c_main_section'>
      <div className="c_section">
        <div className="c_inner">
          Mypage
        </div>
      </div>
    </PageContainer>
  );
}

export default Mypage