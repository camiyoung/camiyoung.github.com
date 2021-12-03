---
title: '네이버 로그인 구현하기 (네이버 로그인 api 사용/javascript 예시)'
date: 2021-11-3 21:30:52
category: etc
thumbnail: { thumbnailSrc }
draft: false
emoji: ✅
---

네이버 로그인 api를 이용하면 간단하게 네이버 아이디 연동 가입,로그인이 가능합니다. 모든 정보를 새롭게 입력하지 않아도 되므로 신규 유저의 손쉬운 가입을 유도할 수 있습니다. 네이버 api를 사용하여 웹페이지에서 로그인 연동 방법을 알아보겠습니다.

네이버 API 문서의 튜토리얼은 API version 1.0.3을 사용하는데요, 이 글에선 가장 최근 업데이트된 2.0.2 버전을 사용합니다.

전체 코드는 하단에 있습니다.

## Naver Developers 애플리케이션 등록

네이버 디벨로퍼 홈페이지 - Application - 애플리케이션 등록 으로 이동합니다.
![](https://images.velog.io/images/anji00/post/3729b224-8765-46c9-ac30-12a97f0bab87/image.png)
애플리케이션 이름을 작성해 주고 사용 API는 네아로를 선택합니다.
![](https://images.velog.io/images/anji00/post/86c91d0a-e6f8-494d-ae79-61f2dbe20d45/image.png)
가입시에 회원에게 받을 정보들을 선택합니다.
![](https://images.velog.io/images/anji00/post/cf117d0c-3a4b-4863-b271-bc72c3b7715c/image.png)
로그인 오픈 API 서비스 환경
환경을 PC웹으로 설정해줍니다.
서비스 URL은 본인이 테스트 할 주소를 작성해주면 됩니다. 저는 로컬호스트 5500번 포트에서 테스트 할 것이므로 입력해주었습니다.
Callback URL은 로그인을 완료하면 이동할 페이지의 주소를 작성해 주면 됩니다. 저는 한 페이지에서 로그인을 하고 완료되면 다시 그 페이지로 돌아오도록 할것이므로 서비스 URL과 똑같이 설정했습니다.
![](https://images.velog.io/images/anji00/post/1c07f8f6-0bc8-4531-84f6-45704e7aa9a0/image.png)

생성된 애플리케이션 정보에서 Client ID를 확인 가능합니다.
![](https://images.velog.io/images/anji00/post/4680230d-7b67-40f4-ad0a-1689909684ae/image.png)

## 📝 UI 구성

간단하게 로그인 화면을 구성합니다.
로그인을 완료하면 유저의 정보를 보여줍니다.
![](https://images.velog.io/images/anji00/post/7bfd3ecb-cd65-479f-ba65-0cfaee8c2465/image.png)
![](https://images.velog.io/images/anji00/post/0b39cbb7-64a2-4725-a037-42a3f091dea2/image.png)

### html코드

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>네이버 로그인</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <div class="container">
      <h1>Naver Login API 사용하기</h1>
      <div class="login-area">
        <div id="message">
          로그인 버튼을 눌러 로그인 해주세요.
        </div>
        <div id="button_area">
          <div id="naverIdLogin"></div>
        </div>
      </div>
    </div>
    ...
  </body>
</html>
```

### 주의할 점 - 로그인 버튼 생성

로그인 버튼은 `<div id="naverIdLogin"></div>` 이렇게 작성합니다. 스크립트가 이 태그를 불러와서 버튼 이미지를 넣습니다.

## 📍 API 등록 및 사용

### 라이브러리 삽입

라이브러리를 스크립트로 삽입합니다.
`<script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" charset="utf-8"></script>`

### 로그인 기능 초기 설정

api설정을 진행합니다. 앞서 생성해둔 앱의 클라이언트 id와 콜백url을 이용합니다.

```javascript
const naverLogin = new naver.LoginWithNaverId({
  clientId: 'YOUR_CLIENT_ID',
  callbackUrl: 'YOUR_CALLBACK_URL',
  loginButton: { color: 'green', type: 2, height: 40 },
})
naverLogin.init() // 로그인 설정
```

이렇게 설정을 마치고 나면 html에 만들어둔 로그인 버튼 자리에 로그인 버튼이 생성됩니다.

### 필수 제공 정보 체크 확인

필수 제공으로 설정했던 정보들을 유저가 체크했는지 검증합니다. 해당 항목을 체크하지 않았다면 다시 제공 창으로 돌아가도록 합니다.
![](https://images.velog.io/images/anji00/post/ce6039f8-9364-4aae-b7f9-0155b1038194/image.png)
![](https://images.velog.io/images/anji00/post/2988318c-3a59-4aa7-96bd-c58427dae220/image.png)

![](https://images.velog.io/images/anji00/post/f1be3dc6-d630-42db-90b0-c6be797badef/image.png)

```javascript
naverLogin.getLoginStatus(function(status) {
  if (status) {
    const nickName = naverLogin.user.getNickName()
    const age = naverLogin.user.getAge()
    const birthday = naverLogin.user.getBirthday()

    //닉네임을 선택하지 않으면 선택창으로 돌아갑니다.
    if (nickName === null || nickName === undefined) {
      alert('별명이 필요합니다. 정보제공을 동의해주세요.')
      naverLogin.reprompt()
      return
    } else {
      setLoginStatus() //모든 필수 정보 제공 동의하면 실행하는 함수
    }
  }
})
```

모든 정보를 처리해주기 귀찮아서 닉네임만 했는데요, 실수로 다른 정보를 체크하지 않고 넘어가면 정상적으로 로그인으로 넘어가버립니다. 그럴땐 내정보-보안설정-네이버와 연결된 서비스 관리에서 철회하기를 누르면 연동이 해제됩니다. 새롭게 로그인을 하면 다시 정보 제공 동의창이 보여집니다.
![](https://images.velog.io/images/anji00/post/3c660fe9-6b0b-440b-81e5-5f5a8bc6a261/image.png)

### 로그인 완료 후 유저 정보 사용

로그인을 정상적으로 성공했다면 유저의 프로필 정보를 불러올 수 있습니다.
`naverLogin`객체의 user안에 프로필 정보가 담겨있는 것을 볼 수 있습니다.
![](https://images.velog.io/images/anji00/post/bca7b67b-6ea7-478d-8487-f469dca93b27/image.png)

```javascript
const message_area = document.getElementById('message')
message_area.innerHTML = `
      <h3> Login 성공 </h3>
      <div>user Nickname : ${naverLogin.user.nickname}</div>
      <div>user Age(범위) : ${naverLogin.user.age}</div>
      <div>user Birthday : ${naverLogin.user.birthday}</div>
      `
```

### ✨ 로그아웃 구현

로그인한 상태면 로그인 버튼을 로그아웃 버튼으로 바꾸어 나타냅니다.
로그아웃 버튼은 따로 지정된 규칙이 없으므로 자유롭게 id 혹은 class를 지정해주면 됩니다.

**로그아웃**
![](https://images.velog.io/images/anji00/post/af1a8aed-12f5-42cf-a22f-108cdb4f3169/image.png)
공식 문서에는 별도로 로그아웃 API가 없다고 나와있으나 SDK안에는 구현되어 있으므로 간편하게 로그아웃 기능을 추가할 수 있습니다. 로그아웃을 완료하면 서비스의 메인 페이지로 이동합니다.

```javascript
function setLoginStatus() {
  //...
  const button_area = document.getElementById('button_area')
  button_area.innerHTML = "<button id='btn_logout'>로그아웃</button>"

  const logout = document.getElementById('btn_logout')
  logout.addEventListener('click', e => {
    naverLogin.logout()
    location.replace('YOUR_SERVICE_URL')
  })
}
```

## ✅ 최종 코드

### index.html

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>네이버 로그인</title>
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <div class="container">
    <h1>Naver Login API 사용하기</h1>
    <div class="login-area">
      <div id="message">
        로그인 버튼을 눌러 로그인 해주세요.
      </div>
      <div id="button_area">
        <div id="naverIdLogin"></div>
      </div>
    </div>
  </div>
  <script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" charset="utf-8"></script>
  <script type="text/javascript">

  const naverLogin = new naver.LoginWithNaverId(
   {
    clientId: "NfuiqEV4HltgQ4mfdiO6",
    callbackUrl: "http://127.0.0.1:5500",
    loginButton: {color: "green", type: 2, height: 40}
    }
   );


    naverLogin.init();
    naverLogin.getLoginStatus(function (status) {
      if (status) {
          const nickName=naverLogin.user.getNickName();
          const age=naverLogin.user.getAge();
          const birthday=naverLogin.user.getBirthday();

          if(nickName===null||nickName===undefined ){
            alert("별명이 필요합니다. 정보제공을 동의해주세요.");
            naverLogin.reprompt();
            return ;
         }else{
          setLoginStatus();
         }
	}
    });
    console.log(naverLogin);

    function setLoginStatus(){

      const message_area=document.getElementById('message');
      message_area.innerHTML=`
      <h3> Login 성공 </h3>
      <div>user Nickname : ${naverLogin.user.nickname}</div>
      <div>user Age(범위) : ${naverLogin.user.age}</div>
      <div>user Birthday : ${naverLogin.user.birthday}</div>
      `;

      const button_area=document.getElementById('button_area');
      button_area.innerHTML="<button id='btn_logout'>로그아웃</button>";

      const logout=document.getElementById('btn_logout');
      logout.addEventListener('click',(e)=>{
        naverLogin.logout();
	location.replace("http://127.0.0.1:5500");
      })
    }


  </script>
</html>

```

### style.css

```css
* {
  box-sizing: border-box;
}

body {
  background-color: #c6cdd3;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 100vh;
}
h3 {
  margin: 5px;
}

.container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 450px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.login-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  width: 400px;
  height: 100%;
  padding: 20px;
}

#message {
  background-color: rgb(222, 233, 238);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  margin-bottom: 15px;
  width: 95%;
}

#button_area {
  background-color: rgb(222, 233, 238);
  border-radius: 10px;
  padding: 10px;
  width: 95%;
  display: flex;
  justify-content: center;
}
```

## 💬 문의사항

궁금한점이나 보완할 부분이 있다면 댓글로 알려주세요.
감사합니다.
