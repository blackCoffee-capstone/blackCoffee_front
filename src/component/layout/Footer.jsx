// router
import { Link } from 'react-router-dom';
// style
import styled from 'styled-components'
// img
import { ReactComponent as Twitter } from "assets/image/common/ci/twiter.svg";
import { ReactComponent as Facebook } from "assets/image/common/ci/facebook.svg";
import { ReactComponent as Youtube } from "assets/image/common/ci/youtube.svg";
import { ReactComponent as InstagramColor } from "assets/image/common/ci/instagram-color.svg";

const FooterContainer = styled.footer`
  border-top: .1rem solid var(--border-color-light);
  padding-bottom: var(--space-small);
  /* color: var(--font-color-sub); */
  .footer_menu{
    .c_inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 5%;
      padding: 1.5rem 0;
    }
    a {
      line-height: 1.8;
    }
  }
  .footer_info{
    border-top: .1rem solid var(--border-color-light);
    .info_detail{
      padding-top: var(--space-small);
      .company_info{
        display: flex;
        flex-wrap: wrap;
        gap: 3%;
        margin-bottom: 2.5rem;
        li{
          line-height: 2rem;
        }
      }
      .sns{
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin-bottom: 2.5rem;
        li{
          width: 2rem;
          height: 2rem;
          svg{
            height: 100%;
            width: 100%;
          }
          :nth-of-type(1):hover{
            color: #1DA1F2;
          }
          :nth-of-type(2):hover{
            color: #4267B2;
          }
          :nth-of-type(3):hover{
            color: #FF0000;
          }
          :nth-of-type(4):not(:hover) svg{
            fill: currentColor
          }
        }
      }
    }
    .copyright{
      color: var(--font-color-sub);
    }
  }
`

function Footer() {
  return (
    <FooterContainer>
      <nav className="footer_menu">
        <div className="c_inner">
          <li><Link to="privacypolicy">개인정보처리방침</Link></li>
          <li><Link to="terms">이용약관</Link></li>
          <li><Link to="emaildenial">이메일무단수집거부</Link></li>
        </div>
      </nav>

      <section className="footer_info">
        <div className="c_inner">
          <div className="info_detail">
            <ul className="company_info">
              <li>blackCoffee팀</li>
              <li>팀장: 임종용</li>
              <li>경기도 수원시 영통구 월드컵로 206(아주대)</li>
              <li>e-mail: bellmir@ajou.ac.kr</li>
              {/* <li>사업자 등록번호 123-12-12345</li> */}
            </ul>
            {/* <ul className="sns">
              <li><a href=""><Twitter /></a></li>
              <li><a href=""><Facebook /></a></li>
              <li><a href=""><Youtube /></a></li>
              <li><a href=""><InstagramColor /></a></li>
            </ul> */}
            <p className="copyright">Copyright ⓒblackCoffee. All Rights Reserved.</p>
          </div>	
        </div>
      </section>
    </FooterContainer>
  );
}

export default Footer;
