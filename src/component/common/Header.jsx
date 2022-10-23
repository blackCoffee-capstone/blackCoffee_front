// router
import { Link } from 'react-router-dom';
// style
import styled from 'styled-components'
// img
import { ReactComponent as Logo } from "assets/image/common/logo.svg";

const HeaderContainer = styled.header`
  z-index: 100;
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--header-height);
  background-color: #fff;
  box-shadow: var(--box-shadow01);
  font-weight: var(--font-w-mid);

  .c_inner{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .ci{
      width: 10rem;
      a{
        color: var(--primary-color);
        transition: var(--transition-fast);
        :hover{
          color: var(--primary-color-effect);
        }
        svg{
          color: inherit;
          width: 100%;
          height: auto;
        }
      }
    }
    .gnb{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      a{
        transition: var(--transition-fast);
        :hover{
          color: var(--primary-color);
        }
      }
    }
  }
`

function Header() {
  return (
    <HeaderContainer>
      <div className="c_inner">
        {/* <button className="ham">
        </button> */}

        <div className="ci">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="gnb">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/customer">고객센터</Link>
        </div>
      </div>
    </HeaderContainer>
  );
}

export default Header;
