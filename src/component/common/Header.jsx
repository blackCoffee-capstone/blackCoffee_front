// router
import { Link } from 'react-router-dom';
// style
import styled from 'styled-components'


const HeaderContainer = styled.header`
  .c_inner{
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .gnb{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
  }

`
function Header() {
  return (
    <HeaderContainer>
      <div className="c_inner">
        <div className="ci">
          <Link to="/">logo</Link>
        </div>

        <div className="gnb">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/customer">Customer</Link>
        </div>
      </div>
    </HeaderContainer>
  );
}

export default Header;
