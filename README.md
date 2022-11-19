## 지금, 여기

<br>
<p align="center"><img src="./src/assets/image/common/logo-primary.svg" alt="now_here" width="200px" /></p>
<br>

'지금, 여기'는 SNS 빅데이터를 분석하여 새롭게 떠오르는 여행지를 추천해주고 관련 정보를 제공해주는 서비스입니다.  
아주대학교 캡스톤디자인 수업의 일환으로 04.blackCoffee 팀이 개발하였습니다.
이 프로젝트는 해당 서비스의 프론트 페이지를 구성합니다.

<br>

## 04.blackCoffee 팀
| role | name | part | email | 
| :--: | :--: | :-- | :-- |
| 팀장 | 임종용 | 프론트 개발 | bellmir@ajou.ac.kr |
| 팀원 | 이수민 | 백엔드 개발 | tnals1178@ajou.ac.kr |
| 팀원 | 이동훈 | 빅데이터 분석 모델 개발 | oss002@ajou.ac.kr |
| 팀원 | 정예은 | SNS 데이터 크롤링 | skqhs7276@ajou.ac.kr |
| 팀원 | 공민경 | 백엔드 및 개발자 페이지 개발 | alsrud991026@ajou.ac.kr |

<br>

## 사용 라이브러리 및 개발 환경
> `코어`  
> React(^18.2.0)  
> react-router-dom(^6.4.1)  
> redux(^4.2.0), react-redux(^8.0.5), @reduxjs/toolkit(^1.9.0)  

> `서브`  
> styled-components(^5.3.5)  
> axios(^0.27.2)  
> redux-persist(^6.0.0)  
> react-router-hash-link(^2.4.3) - 앵커 기능  
> react-daum-postcode(^3.1.1) - 주소 검색  
> react-kakao-maps-sdk(^1.1.5) - 카카오 맵

> `UI 라이브러리`  
> lottie-react(^2.3.1) - 애니메이션  
> swiper(^8.4.4) - 슬라이드  

> `개발 환경`  
> node -v : v18.12.1  
> npm -v : 8.19.2  
  
## 시작하기
> `npm install`  
> `npm start`  
  
<br>

## 프로젝트 설명
### 프로젝트 구조
* _'src/assests/style'_ 폴더 안의 `reset.js`와 `common.js`는 전체에 적용될 기본 css 스타일 지정.
* 루트 컴포넌트 `App`에서 주요 컴포넌트 들의 layout 구성
* `redux` 파일들은 _'src/store_ 폴더에 들어있고, 주요 기능 별로 _'src/store/modules'_안에 `slice`들로 나눈다. 모듈화한 redux slice들은 `store.js`에서 합쳐진다.

### z-index 목록
1. MessageBundle: 1000
1. Header: 200
1. .c_loading: 100
1. .c_screen_filter: 99
  
<br>

## Product Backlog & Sprint
https://docs.google.com/spreadsheets/d/1VS8c7LPu0KjqmS6thqXz_PvC9CyN5DXcX691Xyhasjk/edit#gid=211076120
