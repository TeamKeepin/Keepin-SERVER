# 🎁 Keepin - 감사한 순간을 더 잘 기억하는 방법 🎁

<img style="border: 1px solid black !important; border-radius:20px;" src="https://user-images.githubusercontent.com/37949197/124622652-46e8ad00-deb6-11eb-8cca-f9367559c2b6.png" width="250px" />


![node_badge](https://img.shields.io/badge/node-%3E%3D%2012.13.0-green)
<br>


* <b> SOPT 28th APPJAM
    
* 프로젝트 기간: 2021.06.26 ~ 07.17

* [API 명세서](keepin-alb-1248062252.ap-northeast-2.elb.amazonaws.com/apidoc)</b>

<br>


## :information_desk_person: 프로젝트 설명

<b>감사한 순간을 더 잘 기억하는 방법, Keepin 입니다. 🎁</b> 
<br />
잊어버리기 쉬운 감사한 순간들! 이제는 Keepin해 보세요. <br>
주고받은 선물들을 간직하고, 챙겨야 할 이벤트들을 리마인드하도록 도와드려요.


<br>

## :bookmark_tabs: 기능 명세서

* <b>[기능 명세서 노션 링크](https://www.notion.so/3a87d177950c4cd9a499a06e266ac535) </b>

<br>

## :earth_americas: Team Role 


#### 🏋 류영우

- DB 설계 및 구축
- 프로필 기능 구현
- 친구 모아보기, 조회, 메모 구현
- 키워드 별 검색 구현

#### 🏋 박윤경

- DB 설계 및 구축
- 로그인, 회원가입 기능 구현
- 키핀하기 구현
- 타이틀(카테고리), 친구 검색 구현

#### 🏋 김민지

- DB 설계 및 구축
- 토큰 미들웨어 구현
- 리마인더 생성/조회/삭제 구현
- 테스팅 자동화 환경 구축, 배포


<br>

## :blue_book: Package (dependencies module)
사용 패키지(모듈)은 다음과 같습니다.

- **apidoc** - 간단한 주석을 통해 자동으로 api 문서를 생성해주는 모듈
- **jsonwebtoken** - JWT(Json Web Token) 생성 및 인증
- **mongoose** - 몽고DB ODM 문서를 DB에서 조회할 때 자바스크립트 객체로 바꿔주는 역할
- **aws-sdk** - AWS에 API를 제공
- **multer** - 이미지 업로드
- **multer-s3** - 이미지 S3에 업로드
- **moment** - 날짜 포맷
- **connect** - RESTful Web Services를 쉽게 사용

```json
"dependencies": {
    "apidoc": "^0.28.1",
    "bcryptjs": "^2.4.3",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-validator": "^6.10.0",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.29.1",
    "mongoose": "^5.12.12",
    "request": "^2.88.2"
  },
  ```

<br>

## :green_book: Cloud Architecture
![keepin 아키텍처](https://user-images.githubusercontent.com/37949197/124375005-970b1800-dcda-11eb-9385-e4a12d1beabc.jpg)

<br>


## ☑️ Coding Convention
- 변수명: 카멜케이스 `inputBox`
- 상수명: 대문자 `INPUT_BOX`
- 폴더명, 파일명: 소문자 `inputbox`
- 클래스명: 첫글자 대문자 `InputBox`
- `var` 사용 지양하고, `let` 이나 `const` 사용
- 비동기는 promise의 `then` 보다 `async/await` 사용
- 모듈 필요시, `import mongoose from "mongoose";` ← 해당 형식 사용하기
- 코드 끝에는 ;(세미콜론) 사용

<br>

## 🦖 branch, commit 전략

### branch
- local - yeoungwoo / minji / yunkyeong 에서 작업
- 각자 이름 브랜치에 push
- PR전, 카톡방에 PR해도 되냐고 물어보기!
- 각자 이름 브랜치에서 develop으로 PR
- 코드 리뷰 후, confirm 받고 develop에 Merge
- develop에 Merge 될 때마다 모든 팀원 pull 받아서, 최신 상태 유지하기!

### commit 메세지 규약
- [update] : 기능 수정 시
- [release] : 첫 세팅 시
- [feat] : 기능 추가 시
- [fix] : 버그 해결 시
- [refactor]: 코드 리팩토링
- 설명은 한글로!

<br>

## :bulb: 배포
* AWS EC2 - 클라우드 컴퓨팅 시스템
* AWS S3 - 클라우드 데이터 저장소
* AWS ELB - 클라우드 부하분산 서비스
* Atlas - MongoDB 클라우드 호스팅 서비스

<br>

## :computer: 개발자
<img style="border: 1px solid black !important; border-radius:20px;" src="https://user-images.githubusercontent.com/37949197/124622445-1739a500-deb6-11eb-82ce-fa84c1359f04.png" width="300px" />

* [유영우](https://github.com/Yboyu0u)
> Keepin에 영원히 Keepin되고 싶다 <br />
> 돈워리비해피 :)

* [박윤경](https://github.com/expresshighway)
> 키핀에서 폭풍 성장할게요 <br />
> 나는 키핀의 빌런이다 :)

* [김민지](https://github.com/milkyKim)
> Keepin이라는 팀에서 개발할 수 있어 <br />
> 행복하다 :)🌈
