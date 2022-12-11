## 지금, 여기

<br>
<p align="center"><img src="./src/assets/image/common/logo-primary.svg" alt="now_here" width="200px" /></p>
<br>

'지금, 여기'는 SNS 빅데이터를 분석하여 새롭게 떠오르는 여행지를 추천해주고 관련 정보를 제공해주는 서비스입니다.  
아주대학교 캡스톤디자인 수업의 일환으로 04.blackCoffee 팀이 개발하였습니다.  
이 프로젝트는 해당 서비스의 프론트 페이지를 구성합니다.  
주소: https://www.jigeumyeogi.com  

<br>

## 04.blackCoffee 팀
| role | name | part | email | 
| :--: | :--: | :-- | :-- |
| 팀장 | 임종용 | 프론트 개발 | bellmir@ajou.ac.kr |
| 팀원 | 이수민 | 백엔드 개발 | tnals1178@ajou.ac.kr |
| 팀원 | 이동훈 | 빅데이터 분석 모델 개발 | oss002@ajou.ac.kr |
| 팀원 | 정예은 | 백엔드 개발 및 SNS 데이터 크롤링 | skqhs7276@ajou.ac.kr |
| 팀원 | 공민경 | 백엔드 및 개발자 페이지 개발 | alsrud991026@ajou.ac.kr |

<br>

## 사용 라이브러리 및 개발 환경
> `코어`  
> React(^18.2.0)
> react-router-dom(^6.4.1)  
> recoil(^0.7.5), recoil-persist(^4.2.0)  

> `서브`  
> styled-components(^5.3.5)  
> axios(^0.27.2)  
> @tanstack/react-query(^4.16.1) - 리엑트 쿼리  
> react-router-hash-link(^2.4.3) - 앵커 기능  
> react-daum-postcode(^3.1.1) - 주소검색  
> react-kakao-maps-sdk(^1.1.5) - 카카오 맵  

> `UI 라이브러리`  
> lottie-react(^2.3.1) - 로딩  
> swiper(^8.4.4) - 슬라이드  
> tippyjs/react(^4.2.6) - dropdown, tooltip  

> `개발 환경`  
> node -v : v16.13.0  
> npm -v : 8.1.0  
  
## 시작하기
> `npm install`  
> `npm start`  
  
<br>

## 프로젝트 설명
### 프로젝트 구조
* _'src/style'_ 폴더 안의 `reset.js`와 `common.js`는 전체 스타일 적용하는 css 느낌으로 사용중이다.
* 루트 컴포넌트 `App`에선 주요 컴포넌트 들의 layout만 구성한다.
* `recoil` 파일들은 _'src/store'_ 폴더에 들어있고, 주요 기능 별로 _'store/modules'_안에 모듈화 해둔다. 모듈화한 파일들은 `index.js`에서 합쳐서 `export` 된다.
* 네트워크를 통하는 함수들은 `api`폴더에 모여있다.
    * 인증이 필요한 요청의 경우 `authAxios`를 사용한다. authAxios안의 `AuthAxiosInterceptor`라는 커스텀 훅을 App에서 import하여 interceptor를 적용시켰다.

### z-index 목록
1. MessageBundle: 1000
1. Header: 200
1. .c_loading: 100
1. .c_screen_filter: 99

### Product Backlog & Sprint
https://docs.google.com/spreadsheets/d/1VS8c7LPu0KjqmS6thqXz_PvC9CyN5DXcX691Xyhasjk/edit#gid=211076120
