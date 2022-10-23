// style
import styled from 'styled-components'

const CustomerContainer = styled.section`
  .c_inner{

  }
`

function Customer() {
  return (
    <CustomerContainer className='c_main_section'>
      <div className="c_section">
        <div className="c_inner">
        Customer
        </div>
      </div>
    </CustomerContainer>
  );
}

export default Customer