// core
import { useState } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// style
import styled from 'styled-components'
// api
import useAuthFetch from 'api/useAuthFetch'
// component
import Resign from './Resign';
import ChangePassword from './ChangePassword';
import ChangeUserInfo from './ChangeUserInfo';
// tippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/themes/light.css'; // optional
// utils
import { numberFormat } from 'utils/formatting/numberFormat';
// img
import NoPhoto from 'assets/image/common/no_photo.png'

const PageContainer = styled.section`
  .c_inner{
    max-width: 1000px;
  }
  .box{
    position: relative;
    box-shadow: var(--box-shadow03);
    border-radius: var(--border-radius-mid);
    padding: var(--space-small);
    margin: var(--space-small) auto;
    @media screen and (max-width: 600px){
      padding: 2rem;
    }
    .box_top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      img{
        width: 1em;
        height: 1em;
      }
      span{
        margin-left: 0.5rem;
        font-size: var(--font-size-mid);
        font-weight: var(--font-w-regular);
        color: var(--font-color-sub);
      }
    }
  }
  .profile{
    .box_top{
      .btn_edit{
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        margin-right: -0.5rem;
        
      }
      .edit_menu{
        li{
          padding: 0.6rem 1rem;
          cursor: pointer;
          &:hover{
            background-color: var(--effect-color);
          }
        }
      }
    }
    .user_info{
      p{
        padding: 0.3rem 0;
        display: flex;
        align-items: center;
        >:first-child{
          width: 5em;
          flex-shrink: 0;
          color: var(--primary-color);
        }
      }
      .login_type{
        >:last-child{
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: var(--font-size-small);
          &.now_here{
            color: var(--primary-color);
          }
          &.facebook{
            color: #4267B2;
          }
          img{
            width: 2rem;
            height: 2rem;
          }
        }
      }
    }
  }
  .likes,
  .wishes{
    .more{
      &:hover{
        text-decoration: underline;
      }
    }
    ul>li{
      display: flex;
      align-items: center;
      gap: 0 1rem;
      padding: 0.4rem 0;
      margin: 0.2rem 0;
      cursor: pointer;
      transition: var(--transition-default);
      &:hover{
        background-color: var(--effect-color);
      }
      img{
        width: 10rem;
        height: 7rem;
        border-radius: var(--border-radius-small);
        overflow: hidden;
        object-fit: cover;
        flex-shrink: 0;
      }
      .text_box{
        h4{
          font-size: var(--font-size-mid);
          font-weight: var(--font-w-mid);
        }
        p{
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: var(--font-size-small);
          color: var(--font-color-sub);
        }
      }
    }
  }
`

function Mypage() {
  const navigate = useNavigate();
  const [ showResign, setShowResign ] = useState(false);
  const [ showChangePass, setShowChangePass ] = useState(false);
  const [ showChangeUserInfo, setShowChangeUserInfo ] = useState(false);
  const { data: userData, isLoading: isUserLoading, refetch: userRefetch } = useAuthFetch({ url: 'users', key: ['user'] });
  const { data: wishes, isLoading: isWishesLoading } = useAuthFetch({ url: 'wishes', key: ['wishes'] });
  const { data: likes, isLoading: isLikesLoading } = useAuthFetch({ url: 'likes', key: ['likes'] });

  return (
    <PageContainer className='c_main_section'>
      <div className="c_inner">
        <section className="c_section">
          <h2 className='c_title'>마이페이지</h2>
        </section>
        { !showResign && !showChangePass && !showChangeUserInfo &&
          <>
            <section className="c_section box profile">
              <div className='box_top'>
                <h3 className="c_subtitle">프로필</h3>
                <Tippy
                  interactive={true}
                  theme='light'
                  content={
                    <ul className='edit_menu'>
                      <li onClick={()=>setShowChangeUserInfo(true)}>유저 정보 변경</li>
                      <li onClick={()=>setShowChangePass(true)}>비밀번호 변경</li>
                      <li onClick={()=>setShowResign(true)}>회원탈퇴</li>
                    </ul>
                  }
                >
                  <button className='btn_edit'>
                    <img src={require('assets/image/common/icon/setting.png')} alt="" />
                    내정보
                  </button>
                </Tippy>
              </div>
              <div className='user_info'>
                <p>
                  <span>이름</span>
                  <span>{userData.name}</span>
                </p>
                <p>
                  <span>이메일</span>
                  <span>{userData.email}</span>
                </p>
                <p>
                  <span>닉네임</span>
                  <span>{userData.nickname}</span>
                </p>
                <p className='login_type'>
                  <span>가입경로</span>
                  {
                    userData.type=='Normal' ? <span className='now_here'><img src={ require("assets/image/common/icon.svg").default} alt="지금여기" />지금여기</span>
                    : userData.type=='Kakao' ? <span className='kakao'><img src={ require("assets/image/common/ci/kakao.svg").default} alt="카카오" />카카오</span>
                    : <span className='facebook'><img src={ require("assets/image/common/ci/facebook_color.png")} alt="페이스북" />페이스북</span>
                  }
                </p>
              </div>
            </section>
            <section className='c_section box wishes'>
              <div className='box_top'>
                <h3 className="c_subtitle">
                  찜목록
                  <span>(총 {numberFormat(wishes.totalWishSpots ?? 0)}개)</span>
                </h3>
                <button className='more'
                  onClick={()=>navigate('/mypage/wishes')}
                >
                  더보기
                </button>
              </div>
              <ul>
                {
                  wishes.wishSpots.length==0 &&
                  <li>찜한 여행지가 없습니다</li>
                }
                {
                  wishes.wishSpots.length>0 &&
                  wishes.wishSpots.slice(0,5).map((el, i)=>{
                    return(
                      <li key={`wish${i}`}>
                        <img src={el.photoUrl ?? NoPhoto} alt="" 
                          style={{
                            background: `url(${NoPhoto}) no-repeat center center / 100%`
                          }}
                        />
                        <div className="text_box">
                          <h4>{el.name}</h4>
                          <p>{el.address}</p>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </section>
            <section className='c_section box likes'>
              <div className='box_top'>
                <h3 className="c_subtitle">
                  좋아요한 게시글
                  <span>(총 {numberFormat(likes.totalLikePosts ?? 0)}개)</span>
                </h3>
                <button className='more'
                  onClick={()=>navigate('/mypage/likes')}
                >
                  더보기
                </button>
              </div>
              <ul>
                {
                  likes.likePosts.length==0 &&
                  <li>찜한 여행지가 없습니다</li>
                }
                {
                  likes.likePosts.length>0 &&
                  likes.likePosts.slice(0,5).map((el, i)=>{
                    return(
                      <li key={`wish${i}`}>
                        <img src={el.photoUrls.length>0 ? el.photoUrls[0] : NoPhoto } alt="" 
                          style={{
                            background: `url(${NoPhoto}) no-repeat center center / 100%`
                          }}
                        />
                        <div className="text_box">
                          <h4>{el.title}</h4>
                          <p>{el.address}</p>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </section>
          </>
        }
        {
          showResign &&
          <Resign setShowResign={setShowResign} />
        }
        {
          showChangePass &&
          <ChangePassword setShowChangePass={setShowChangePass}/>
        }
        {
          showChangeUserInfo &&
          <ChangeUserInfo setShowChangeUserInfo={setShowChangeUserInfo} userData={userData} userRefetch={userRefetch} />
        }
      </div>
    </PageContainer>
  );
}

export default Mypage