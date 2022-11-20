// core
import { lazy, Suspense } from 'react';
// router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from 'component/utility/ScrollToTop'
// recoil
import { useRecoilValue } from 'recoil';
import { token } from 'store/index'
// component - utility
import ErrorBoundary from './component/utility/ErrorBoundary'  // 에러
import LoadingPage from './component/utility/LoadingPage'  // 로딩
import MessageBundle from './component/utility/MessageBundle'  // 팝업 메세지
// component - layout
import Header from './component/layout/Header'  // 헤더
import Footer from './component/layout/Footer'  // 푸터
// page
import Home from './page/Home/Home' // 홈
import Trend from './page/Trend/Trend'  // 최신트렌드
import Recommend from './page/Recommend/Recommend'  // 맞춤 추천
import Search from './page/Search/Search' // 찾아보기
import Community from './page/Community/Community'  // 나만의 장소
const Spot = lazy(() => import('./page/Spot/Spot')); // 여행지 상세페이지
import Login from './page/Account/Login'  // 로그인
const Signup = lazy(() => import('./page/Account/Signup')); // 회원가입
const ChooseTheme = lazy(() => import('./page/Account/ChooseTheme')); // 취향 선택
const FindPassword = lazy(() => import('./page/Account/FindPassword')); // 비밀번호 찾기
import Mypage from './page/Mypage/Mypage' // 마이페이지 
const AdApplication = lazy(() => import('./page/AdApplication/AdApplication'));  // 광고 신청 페이지
const Customer = lazy(() => import('./page/Customer/Customer'));  // 고객센터
const PrivacyPolicy = lazy(() => import('./page/Customer/PrivacyPolicy'));  // 개인정보처리방침
const Terms = lazy(() => import('./page/Customer/Terms'));  // 이용약관
const EmailDenial = lazy(() => import('./page/Customer/EmailDenial'));  // 이메일무단수집거부
import NotFound from './page/NotFound'  // 404 NotFound

function App() {
  const accessToken = useRecoilValue(token.accessToken);

  return (
    <div className="App">
      <MessageBundle />
      <Router>
        <Header />
        <ScrollToTop />
        <ErrorBoundary>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trend" element={<Trend />} />
              <Route path="/recommend" element={
                accessToken ? <Recommend /> : <Navigate to="/login" replace={true} />
              } />
              <Route path="/search" element={<Search />} />
              <Route path="/community" element={<Community />} />
              <Route path="/spot/:spotId" element={<Spot />} />
              <Route path="/login" element={
                !accessToken ? <Login /> : <Navigate to="/" replace={true} />
              } />
              <Route path="/signup" element={<Signup />} />
              <Route path="/choosetheme" element={<ChooseTheme />} />
              <Route path="/findpass" element={<FindPassword />} />
              <Route path="/mypage" element={<Mypage />} /> 
              <Route path="/adapplication" element={<AdApplication />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/emaildenial" element={<EmailDenial />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </Router>
    </div>
  );
}

export default App;