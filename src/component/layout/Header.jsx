// core
import { useEffect, useState, useCallback } from 'react';
// recoil
import { useRecoilState, useSetRecoilState } from 'recoil';
import { token, messageBundle } from 'store/index'
// router
import { Link, useLocation, useNavigate } from 'react-router-dom'
// style
import styled from 'styled-components'
// img
import { ReactComponent as LogoSvg } from "assets/image/common/logo.svg";
import { ReactComponent as LogoutSvg }  from "assets/image/common/icon/logout.svg";
import { ReactComponent as MypageSvg }  from "assets/image/common/icon/mypage.svg";
import { ReactComponent as MenuSvg }  from "assets/image/common/icon/menu.svg";
import { ReactComponent as CloseSvg }  from "assets/image/common/icon/close.svg";

const HeaderContainer = styled.header`
  position: fixed; /* fixed 아니고 absolute */
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  color: var(--font-color-default);
  svg {
    fill: currentColor; /* 글자색 따라감 */
    stroke: currentColor;
    width: 2rem;
    height: 2rem;
  }
  /* gnb_top 시작 */
  .gnb_top{
    height: var(--header-height);
    padding: 1rem 0;
    font-size: var(--font-size-small);
    transition: background-color var(--transition-slow) ease-out, color var(--transition-faster);
    background: rgba(255, 255, 255, 0.95);
    &:not(.bg_off) { /* 배경있는 헤더 */
      box-shadow: var(--box-shadow01);
      color: var(--font-color-default);
    }
    &.bg_off {  /* 배경없는 헤더 */
      color: #fff;
      background-color: transparent;
    }
    @media screen and (max-width: 600px) {
      &{
        background: #fff;
      }
    }
    .c_inner{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4rem;
      height: 100%;
      .ci{
        width: 10rem;
        height: 100%;
        flex-shrink: 0;
        svg{
          width: 100%;
          height: 100%;
        }
      }
      .nav_menu{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.2rem;
        svg{
        }
        .menu_btn {
          svg {
            width: 2.2rem;
            &:last-child {
              display: none;
              margin-bottom: 3px;
            }
          }
          &.open{
            svg:first-child {
              display: none;
            }
            svg:last-child {
              display: block;
            }
          }
        }
      }
    }
  }
  .gnb_menu{
    position: fixed;
    top: var(--header-height);
    right: -30rem;
    display: flex;
    flex-direction: column;
    width: 30rem;
    height: calc(100vh - var(--header-height));
    padding-bottom: 3rem;
    font-size: var(--font-size-mid);
    color: var(--font-color-default);
    background-color: rgba(255, 255, 255, 0.95);
    transition: var(--transition-default);
    overflow-y: scroll;
    &.open{
      right: 0;
      box-shadow: var(--box-shadow01);
    }
    @media screen and (max-width: 600px) {
      &{
        right: -100%;
        width: 100%;
      }
      &.open{
        background: #fff;
      }
    }
    a{
      display: flex;
      align-items: center;
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: var(--transition-faster);
    }
    a:hover {
      background-color: var(--effect-color);
    }
    .logout svg{
      stroke: none;
      width: 24px;
      height: 24px;
    }
  }
`

function Header() {
  const location = useLocation(); // for route change detect
  const navigate = useNavigate();
  const [ accessToken, setAccessToken ] = useRecoilState(token.accessToken);
  const setRefreshToken = useSetRecoilState(token.refreshToken);
  const setAlert = useSetRecoilState(messageBundle.alert);

  // 메뉴 열렸는지
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuBG, setMenuBG] = useState(location.pathname=="/");

  useEffect(() => {
    window.addEventListener('scroll', headerScroll);
    return () => {
      window.removeEventListener('scroll', headerScroll); //clean up
    };
  }, []);
    
  // 홈에서 스크롤되면 헤더에 배경 넣는 함수
  function headerScroll() {
    if(window.location.pathname != "/") return;
  
    if(window.scrollY >= 10) {
      setMenuBG(true);
    }else {
      setMenuBG(false);
    }
  }

  const logout = useCallback(()=>{
    navigate('/');
    setAccessToken('');
    setRefreshToken('');
    setAlert('로그아웃 되셨습니다')
  })

  // 라우트 바뀔때
  useEffect(() => {
    setIsMenuOpen(false); // 메뉴 닫기
    setMenuBG(location.pathname!="/") // 홈이면 메뉴에 배경 뺌
  }, [location]);

  return (
    <HeaderContainer>
      <div className={`gnb_top ${(!isMenuOpen && !isMenuBG) ? 'bg_off' : ''}`}>
        <div className="c_inner">
          <div className="ci">
            <Link to="/">
              <LogoSvg />
            </Link>
          </div>

          <nav className="nav_menu">
            {/* <Link to="/mypage">
              <MypageSvg />
            </Link> */}
            <button className={`menu_btn ${isMenuOpen ? 'open' : ''}`}
              onClick={()=>setIsMenuOpen(!isMenuOpen)} 
            >
              <MenuSvg />
              <CloseSvg />
            </button>
          </nav>
        </div>
      </div>

      <nav className={`gnb_menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/trend">최신 트렌드</Link>
        <Link to="/recommend">맞춤 추천</Link>
        <Link to="/search">여행지 찾기</Link>
        <Link to="/community">나만의 장소</Link>
        <Link to="/mypage"><MypageSvg />마이페이지</Link>
        {
          !accessToken &&
          <Link to="/login">로그인/회원가입</Link>
        }
        {
          accessToken &&
          <a className='logout' onClick={()=>logout()}><LogoutSvg />로그아웃</a>
        }
      </nav>
    </HeaderContainer>
  );
}

export default Header