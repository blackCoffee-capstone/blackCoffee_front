// core
import { useEffect } from 'react';
// router
import { useSearchParams, useNavigate } from 'react-router-dom'
// api
import usePost from 'api/usePost'
// recoil
// recoil
import { useSetRecoilState } from 'recoil'
import { messageBundle, token, userState } from 'store/index'

function SocialKakao() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAlert = useSetRecoilState(messageBundle.alert);
  const setUser = useSetRecoilState(userState);
  const setAccessToken = useSetRecoilState(token.accessToken);
  const setRefreshToken = useSetRecoilState(token.refreshToken);
  
  const { mutate: kakaoLoginApi } = usePost({ url: 'auth/kakao-login' })

  useEffect(()=>{
    const code = searchParams.get('code');
    if(!code){
      setAlert('잘못된 접근입니다.')
      navigate('/', { replace: true });
      return;
    }
    kakaoLoginApi({ accessCode: code }, {
      onSuccess: (data)=>{
        setUser(data.data.user);
        setAccessToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken);
        if(data.data.user.isNewUser){
          setAlert('맞춤 서비스를 위해 원하는 여행 테마를 선택해 주세요')
          navigate('/choosetheme', { replace: true });
        } else {
          navigate('/', { replace: true });
          setAlert('환영합니다')
        }
      },
      onError: ()=>{
        setAlert('소셜 로그인에 실패했습니다.')
        navigate('/login', { replace: true });
      }
    });
  }, [])

  return (
    <section className='c_main_section'>
      <section className="c_section" style={{ textAlign: 'center' }}>
        소셜로그인 하는중...
      </section>
    </section>
  )
}

export default SocialKakao;