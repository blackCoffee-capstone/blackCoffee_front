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
> react-router-dom(^6.4.1), Recoil(^0.7.5)  
> recoil-persist(^4.2.0)  

> `서브`  
> styled-components(^5.3.5), axios(^0.27.2)  
> react-router-hash-link(^2.4.3) - 앵커 기능  
> react-daum-postcode(^3.1.1) - 주소검색  

> `UI 라이브러리`  
> lottie-react(^2.3.1), swiper(^8.4.4)  

> `개발 환경`  
> node -v : v16.13.0  
> npm -v : 8.1.0  
  
## 시작하기
> `npm install`  
> `npm start`  
  
<br>

## 프로젝트 설명
### 프로젝트 관리
- 생명주기모델: 점증적모델(Incremental Model) + 진화모델(Evolutionary Model)
  - 프로토타입을 만들때까진 중심기능부터 점증적으로 구현하고, 이후에 버전을 높혀가며 성능 개선, 버그 수정, 기능 추가를 실시한다.
- 개발방법론: Agile - Scrum
  - 스프린트는 2주 간격으로 진행하고, 각 스프린트 별 '스트린트 백로그'와 '번다운차트'를 남길 것.
- git branch는 Trunk-Based Developoment 사용.
  - merge전 refactoring 진행할 것.
  
### 프로젝트 구조
* _'src/style'_ 폴더 안의 `reset.js`와 `common.js`는 전체 스타일 적용하는 css 느낌으로 사용중이다.
* 루트 컴포넌트 `App`에선 주요 컴포넌트 들의 layout만 구성한다.
* `recoil` 파일들은 _'src/store'_ 폴더에 들어있고, 주요 기능 별로 _'store/modules'_안에 모듈화 해둔다. 모듈화한 파일들은 `index.js`에서 합쳐서 `export` 된다.

### z-index 목록
1. Header: 100
  
<br>

## Product Backlog & Sprint
https://docs.google.com/spreadsheets/d/1VS8c7LPu0KjqmS6thqXz_PvC9CyN5DXcX691Xyhasjk/edit#gid=211076120
