// core
import { lazy, Suspense } from 'react';
// router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// swiper
import 'swiper/css/bundle'; // swiper style 한번에 적용
// component - layout
import Header from './component/layout/Header'  // 헤더
import Footer from './component/layout/Footer'  // 푸터
// component - common
import Loading from './component/common/Loading'  // 로딩
import ErrorBoundary from './component/common/ErrorBoundary'  // 에러
// page
import Home from './page/Home/Home' // 홈
import Trend from './page/Trend/Trend'  // 최신트렌드
import Recommend from './page/Recommend/Recommend'  // 맞춤 추천
import Search from './page/Search/Search' // 찾아보기
import Community from './page/Community/Community'  // 나만의 장소
import Login from './page/Account/Login'  // 로그인
import Mypage from './page/Mypage/Mypage' // 마이페이지 
const Customer = lazy(() => import('./page/Customer/Customer'));  // 고객센터
const PrivacyPolicy = lazy(() => import('./page/Customer/PrivacyPolicy'));  // 개인정보처리방침
const Terms = lazy(() => import('./page/Customer/Terms'));  // 이용약관
const EmailDenial = lazy(() => import('./page/Customer/EmailDenial'));  // 이메일무단수집거부
import NotFound from './page/NotFound'  // 404 NotFound

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trend" element={<Trend />} />       
              <Route path="/recommend" element={<Recommend />} />       
              <Route path="/search" element={<Search />} />     
              <Route path="/community" element={<Community />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mypage" element={<Mypage />} /> 
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