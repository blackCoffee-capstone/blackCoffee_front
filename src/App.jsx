// core
import { lazy, Suspense } from 'react';
// recoil
import { RecoilRoot } from 'recoil';
// router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// style
import './assets/style/reset.css'
import './assets/style/common.css'
import 'swiper/css/bundle'; // swiper style 한번에 적용
// component - layout
import Header from './component/layout/Header'  // 헤더
import Footer from './component/layout/Footer'  // 푸터
// component - utility
import LoadingPage from './component/utility/LoadingPage'  // 로딩
import ErrorBoundary from './component/utility/ErrorBoundary'  // 에러
import MessageBundle from './component/utility/MessageBundle'  // 팝업 메세지
// page
import Home from './page/Home/Home' // 홈
import Trend from './page/Trend/Trend'  // 최신트렌드
import Recommend from './page/Recommend/Recommend'  // 맞춤 추천
import Search from './page/Search/Search' // 찾아보기
import Community from './page/Community/Community'  // 나만의 장소
import Login from './page/Account/Login'  // 로그인
const Signup = lazy(() => import('./page/Account/Signup')); // 회원가입
const FindPassword = lazy(() => import('./page/Account/FindPassword')); // 비밀번호 찾기
import Mypage from './page/Mypage/Mypage' // 마이페이지 
const AdApplication = lazy(() => import('./page/AdApplication/AdApplication'));  // 광고 신청 페이지
const Customer = lazy(() => import('./page/Customer/Customer'));  // 고객센터
const PrivacyPolicy = lazy(() => import('./page/Customer/PrivacyPolicy'));  // 개인정보처리방침
const Terms = lazy(() => import('./page/Customer/Terms'));  // 이용약관
const EmailDenial = lazy(() => import('./page/Customer/EmailDenial'));  // 이메일무단수집거부
import NotFound from './page/NotFound'  // 404 NotFound

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Router>
          <MessageBundle />
          <Header />
          <ErrorBoundary>
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trend" element={<Trend />} />       
                <Route path="/recommend" element={<Recommend />} />       
                <Route path="/search" element={<Search />} />     
                <Route path="/community" element={<Community />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
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
      </RecoilRoot>
    </div>
  );
}

export default App;