// core
import { useEffect, useState } from 'react';
// router
import { Link, useNavigate, useLocation } from 'react-router-dom'
// style
import styled from 'styled-components'
import Button from 'assets/style/Button'
// img
import { ReactComponent as Logo } from "assets/image/common/logo.svg";

const GNB = styled.nav` // M_GNB로 상속됨
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
  a{
    padding: 0.5rem;
    transition: var(--transition-fast);
    :hover{
      color: var(--primary-color);
    }
  }
`
const M_GNB = styled(GNB)`  // GNB 상속
  z-index: 11;  // M_ToggleBtn 보단 낮아야함
  position:fixed;
  top:0;
  left:0;
  transform: translateX(-105%); // -100%으로 맞추면 그림자 삐져나옴
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: clamp(23rem, 30vw, 30rem);
  height:100vh;
  padding: var(--header-height) 1rem var(--space-mid);
  background-color: #fff;
  box-shadow: var(--box-shadow01);
  transition: all var(--transition-slow);
  &.on{
    transform: translateX(0);
  }
`
const M_ToggleBtn = styled.div`
    z-index:100;  // M_GNB 보단 높아야함
    position: relative;
    width:2.5rem;
    height:calc(1.5rem + 6px);
    cursor: pointer;
    div{
      position:absolute;
      width:100%;
      height:2px;
      background-color: currentColor;
      transition-duration: var(--transition-slow);
    }
    .mid{
      top: calc(0.75rem + 2px);
    }
    .bottom{
      top: calc(1.5rem + 4px);
    }
    &.on .top{
      top: calc(0.75rem + 2px);
      transform: rotate(135deg);
      transition-duration: 0.3s;
    }
    &.on .bottom{
      top: calc(0.75rem + 2px);
      transform: rotate(225deg);
      transition-duration: var(--transition-slow);
    }
    &.on .mid{
      opacity: 0;
    }
`
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
        transition: var(--transition-default);
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
  }
  @media screen and (min-width: 769px) {
    .m_toggle_btn{
      display: none;
    }
    .m_gnb{
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    .c_inner{
      .ci{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .gnb{
        display: none;
      }
    }
  }
`

function Header() {
  const navigate = useNavigate(); // for programmatic routing
  const location = useLocation(); // for route change detect

  // mobile 메뉴 열렸는지
  const [isMOpen, setMToggle] = useState(false);

  useEffect(() => {
    mobileMenuToggle('remove');
  }, [location]);

  // mobile 메뉴 열고 닫는 함수
  function mobileMenuToggle(action='toggle'){
    if(action == 'remove'){
      setMToggle(false);
    } else if(action == 'toggle'){
      setMToggle(!isMOpen);
    } else {
      setMToggle(true);
    }
  }
  
  return (
    <HeaderContainer>
      <div className="c_inner">
        <div className="ci">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <GNB className="gnb">
          <Link to="/trend">최신트렌드</Link>
          <Link to="/search">찾아보기</Link>
          <Link to="/recommend">맞춤 추천</Link>
          <Link to="/myplace">나만의 장소</Link>
          <Button primary onClick={()=>navigate("/login")}>로그인</Button>
          {/* <Link to="/login">로그인</Link> */}
        </GNB>

        <M_ToggleBtn className={`m_toggle_btn ${isMOpen ? 'on' : ''}`}
          onClick={()=>mobileMenuToggle()}
        >
          <div className="top"></div>
          <div className="mid"></div>
          <div className="bottom"></div>
        </M_ToggleBtn>

        <M_GNB className={`m_gnb ${isMOpen ? 'on' : ''}`}>
          <Link to="/trend">최신트렌드</Link>
          <Link to="/search">찾아보기</Link>
          <Link to="/recommend">맞춤 추천</Link>
          <Link to="/myplace">나만의 장소</Link>
          <Link to="/login">로그인</Link>
          {/* <Link to="/login">로그인</Link> */}
        </M_GNB>

      </div>
    </HeaderContainer>
  );
}

export default Header;
