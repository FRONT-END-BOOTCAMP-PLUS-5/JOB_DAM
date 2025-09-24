# JOB_DAM

## 멘토와 멘티가 함께 성장하는 커리어 플랫폼

<img width="843" height="411" alt="스크린샷 2025-09-24 21 06 36" src="https://github.com/user-attachments/assets/b0ac2a34-7838-4aa7-92ca-f954547773d9" />


## 실행 방법


### 1. 프로젝트 clone
```bash
git clone https://github.com/FRONT-END-BOOTCAMP-PLUS-5/JOB_DAM.git
cd JOB_DAM
```

### 2. 프로젝트 의존성 설치
```bash
# bun 이용시
bun install

# npm 이용시
npm install
```

### 3. 환경 변수 설정
- 환경 변수는 개별 문의 부탁드립니다.

### 4. 실행
```bash
# 개발 서버 실행
# bun 이용시
bun run dev

# npm 이용시
npm run dev

# 빌드 및 시작

# bun 이용시
bun run build
bun start

# npm 이용시
npm run build
npm start
```

## 💁‍♂️ 프로젝트 팀원
| Frontend | Frontend | Frontend | Frontend |
|:---:|:---:|:---:|:---:|
| ![](https://github.com/young0162.png?size=200) | ![](https://github.com/devdongwoo.png?size=200) | ![](https://github.com/chohyundon.png?size=200) | ![](https://github.com/printseungjoo.png?size=200) |
| [장도영](https://github.com/yewon-Noh) | [감동우](https://github.com/SeongHo-C) | [조현돈](https://github.com/your-designer) | [함승주](https://github.com/your-planner) |
| 실시간 채팅 시스템<br/>채팅방 리뷰<br/>멘토 신청서 작성<br/> 실시간 알람<br/> 베포자동화 | 게시판 작성, 상세페이지<br/>Skeleton Ui 작업<br/> | 회원가입, 로그인 <br/>비밀번호 찾기 구현<br/> 프로젝트 발표 | 메인 페이지 20%

## 프로젝트 개요 
### 질문이 어려운 취준생을 위한 대화형 멘토링 커뮤니티. 
<img width="900" height="500" alt="스크린샷 2025-09-24 21 47 10" src="https://github.com/user-attachments/assets/239a594a-c0c0-4cf9-8296-baaabbf04c23" />
<br/>

## 가술 스택
<img width="900" height="500" alt="스크린샷 2025-09-24 21 58 03" src="https://github.com/user-attachments/assets/51cacdb1-fd84-4e31-99c6-3df47feabb79" />


## 기능 소개

### 메인 시스템 소개
<img width="900" height="500" alt="스크린샷 2025-09-24 22 09 54" src="https://github.com/user-attachments/assets/50e183f3-63a1-4125-8f6c-f780ae564b6d" />
<br/>
<br/>

### 회원가입 / 로그인 
<img width="900" height="500" alt="스크린샷 2025-09-24 23 29 29" src="https://github.com/user-attachments/assets/7a49f896-be16-4e08-bea5-b2047f53b5ae" />
<img width="900" height="500" alt="스크린샷 2025-09-24 23 30 04" src="https://github.com/user-attachments/assets/58759f4d-8640-4ba2-9626-990a8782fd69" />
<br/>
회원가입은 React Hook form을 사용하였고, Supabase에 유저 데이터를 저장합니다. - 비밀번호는 crypto-js를 사용해 해싱하여 저장합니다
<br/>
비밀번호 찾기는 nodemailer 라이브러리를 통해 구글로 회원가입한 유저만 비밀번호 찾기가 가능하도록 구현했습니다. 
<br/>
<br/>

### 커뮤니티 
<img width="900" height="500" alt="스크린샷 2025-09-24 23 35 11" src="https://github.com/user-attachments/assets/c5824751-71e8-4d5b-a3c0-9f36e7a63e43" />
<br/>
사용자들이 궁금한 점을 게시글을 작성하고 이를 통해 서로 정보를 공유하도록 유도했습니다. 
<br/>
<br/>

### 실시간 채팅
<img width="900" height="500" alt="스크린샷 2025-09-24 23 43 04" src="https://github.com/user-attachments/assets/6a14785d-93c2-4138-b1e0-a1c7c6192983" />
멘토 계정으로 로그인 시 채팅방 생성 되었다는 알림 창이 추가, 채팅방 생성하기 가능, 채팅방 생성 후 멘티와 자유롭게 실시간 대화 가능하도록 구현했습니다.
<br/>
<br/>

### 트러블 슈팅
<img width="900" height="500" alt="스크린샷 2025-09-24 23 45 17" src="https://github.com/user-attachments/assets/26fb32bf-cfd4-49b1-b85a-f4046b53e6cd" />
<br/>
<br/>
<img width="900" height="500" alt="스크린샷 2025-09-24 23 45 51" src="https://github.com/user-attachments/assets/3319fab0-7924-4cdb-a016-d3d16634bc66" />
<br/>
<br/>
<img width="900" height="500" alt="스크린샷 2025-09-24 23 46 27" src="https://github.com/user-attachments/assets/1da784ff-5021-46c4-a870-e1d7a5fd436b" />

### 프로젝트 아키텍쳐 (클린 아키텍쳐)
- **레이어 역할**
  - Domain (`backend/*/domain/`)
    - `entities/`: 핵심 비즈니스 모델
    - `repositories/`: 포트 인터페이스(계약), 외부 구현과 분리
  - Application (`backend/*/application/`)
    - `usecases/`: 시나리오(입력 → 검증 → 도메인 호출 → 출력)
    - `dtos/`: 입·출력 모델(프레젠테이션과 도메인 사이 완충)
  - Infrastructure (`backend/*/repositories/`)
    - `Sb*Repository.ts`: Supabase 등 실제 구현(어댑터)
  - Presentation (`app/api/**`)
    - Next.js Route Handlers → 유스케이스 호출 → DTO 반환
