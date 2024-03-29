## 지금, 여기

<br>
<p align="center"><img src="./src/assets/image/common/logo-primary.svg" alt="now_here" width="200px" /></p>
<br>

'지금, 여기'는 새롭게 떠오르는 여행지를 추천해주고 관련 정보를 제공해주는 서비스입니다.  
‘지금, 여기’는 크게 세가지 기능을 제공합니다.  
1) SNS 빅데이터 분석을 통한 최신 트랜드 여행지 랭킹 서비스  
2) 사용자별 사용 패턴 분석을 통한 맞춤 여행지 추천 서비스  
3) 나만의 장소 공유 커뮤니티 서비스  

이 프로젝트는 5인으로 구성된 blackCoffee팀이 개발하였으며, 캡스톤디자인 과목의 일환으로 2022년 9월부터 12월까지 진행하였습니다.  
이 저장소는 '지금, 여기'의 프론트 부분입니다. 전체 프로젝트 저장소는 https://github.com/blackCoffee-capstone 를 확인해주세요.  

서비스 URL: https://www.jigeumyeogi.com (지금은 비용 때문에 서버를 내렸습니다.)  
시연 영상: https://drive.google.com/file/d/1os0kQTzZ57b0KtX4utsMXBXj7kymZGXK/view  

<br>

## 04.blackCoffee 팀
| role | name | part | email | 
| :--: | :--: | :-- | :-- |
| 팀장 | 임종용 | 프론트 개발, 프론트 서버 배포 | bellmir@ajou.ac.kr |
| 팀원 | 이수민 | 백엔드 개발, 백엔드 서버 배포 | tnals1178@ajou.ac.kr |
| 팀원 | 이동훈 | 빅데이터 분석, 자연어처리, 추천 모델 개발 | oss002@ajou.ac.kr |
| 팀원 | 정예은 | 백엔드 개발, SNS 데이터 크롤링 | skqhs7276@ajou.ac.kr |
| 팀원 | 공민경 | 관리자 페이지 개발, QA | alsrud991026@ajou.ac.kr |

<br>

## 사용 기술 스택

### 프론트 서버
> `서버`  
> NCloud(ubuntu-18), Nginix  
> `SSL`  
> Let's Encrypt

### 라이브러리 및 개발 환경
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
> window11 / vscode  
> node -v : v16.13.0  
> npm -v : 8.1.0  
  
### 로컬 서버 시작하기
> `npm install`  
> `npm start`  
  
<br>

## 프로젝트 설명
Agile 방법론을 사용하였고, iteration은 2주 간격으로 scrum은 매주 월, 목에 진행하였습니다.  
로그인은 JWT 기반으로 구현하였습니다.  

### Product Backlog & Sprint
https://docs.google.com/spreadsheets/d/1pGzQYAeh8ajpWxbkBeFNP68OmQ1KIVgjEAH6xar93XE/edit?usp=sharing  

### 프로젝트 구조
* `jsconfig.json`에서 'baseUrl'을 'src'로 설정하여 import 절대경로를 _'src'_ 폴더로 수정하였습니다.  
* 루트 컴포넌트 `App`에서 주요 컴포넌트 들의 layout을 구성합니다.  
* _'src/assets'_ 는 이미지나 전체 스타일 css 등을 모아놓은 폴더입니다.  
    * _'src/assets/style'_ 폴더 안의 `reset.css`와 `common.css`는 전체 스타일을 설정합니다.  
* _'src/page'_ 는 라우팅될 각 페이지들을 모아놓은 폴더입니다.
* _'src/component'_ 는 여러곳에서 공용으로 사용되는 컴포넌트들을 모아놓은 폴더입니다.
* _'src/component'_ 는 여러곳에서 공용으로 사용되는 컴포넌트들을 모아놓은 폴더입니다.
* _'src/utils'_ 는 여러곳에서 공용으로 사용되는 함수들을(이메일 여부 체크, 전화번호 형식 변환 등) 모아놓은 폴더입니다.  
* _'src/store'_ 는 `recoil` 파일들을 모아놓은 폴더입니다. 각 `recoil atom`은 주요 기능 별로 _'src/store/modules'_ 안에 모듈화 되어있고, `index.js`에서 합쳐저서 `export` 됩니다.  
    * _'src/store/data'_ 는 목업용 데이터를 모아놓은 곳입니다.  
* _'src/api'_ 는 API 함수들을 모아놓은 폴더입니다.  
    * 인증이 필요한 요청의 경우 `authAxios`를 사용합니다. authAxios안의 `AuthAxiosInterceptor`라는 커스텀 훅을 App에서 import하여 interceptor를 적용시켰습니다.  

### 전체 프로젝트 구조  

![판넬_SW캡스톤디자인_blackCoffee](https://user-images.githubusercontent.com/114354852/229087481-a7c99097-c3d5-4938-b735-92a1dad67846.jpg)


### z-index 목록
1. MessageBundle: 1000
1. Header: 200
1. .c_loading: 100
1. .c_screen_filter: 99
