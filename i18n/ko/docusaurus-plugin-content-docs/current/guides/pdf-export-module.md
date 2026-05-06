---
title: "PDF용 내보내기 모듈"
sidebar_label: "PDF용 내보내기 모듈"
---

# PDF용 내보내기 모듈

이 내보내기 모듈은 데이터를 PDF, PNG, Excel 및 iCal 파일로 내보낼 수 있습니다. Node.js 애플리케이션 또는 Docker 이미지로 어떤 플랫폼에서도 설치할 수 있습니다.

MS Project 및 Primavera 파일에 대한 가져오기/내보내기 기능은 포함되어 있지 않습니다. 이러한 기능이 필요하면 [해당 내보내기 모듈](guides/msp-export-module.md)이나 온라인 서버를 사용해야 합니다.

## 설치 가이드

먼저 Node.js를 다운로드하고 설치해야 합니다. 설치 방법은 [웹사이트에서](https://nodejs.org/en/) 확인할 수 있습니다.

다운로드 탭의 클라이언트 영역에서 내보내기 모듈을 다운로드할 수 있습니다. 아래 이미지를 참고하세요:

![PDF 내보내기 모듈 다운로드](/img/pdf_export_module_download.png)

해당 파일을 다운로드한 후 어느 곳에 풀고, 명령줄을 열어 내보내기 모듈이 있는 폴더로 이동합니다. 예를 들면:

~~~
cd C:export_module
~~~

그런 다음 애플리케이션용 모듈을 설치해야 합니다:

~~~
npm install
~~~

[그래픽 인터페이스 없이 컴퓨터에 구성 요소를 설치할 수 있습니다](#using-server-without-graphical-interface).

그래픽 인터페이스가 있는 서버에서 실행하려면 다음 명령으로 내보내기 모듈을 시작할 수 있습니다:

~~~
npm start
~~~

작동을 테스트하려면 다음 URL을 열 수 있습니다: **http://localhost:3200/test**.

또는 메인 페이지를 열고 Test 링크를 클릭하세요: **http://localhost:3200**.

## 그래픽 인터페이스 없이 서버 사용

헤드리스(headless) 서버에서 내보내기 모듈을 사용하려면 추가 구성 요소를 설치해야 합니다. Deb 기반 배포판의 명령은 다음과 같습니다:

~~~
apt-get install -y xvfb libgtk2.0-0 libgtk-3-0 libgbm-dev 
libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth
~~~

RPM 기반 배포판의 명령은 다음과 같습니다:

~~~
yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel 
libnotify-devel GConf2 nss libXScrnSaver alsa-lib
~~~

그런 다음 다른 명령으로 실행해야 합니다:

~~~
npm run start:docker
~~~

또는

~~~
xvfb-run node index.js
~~~

## 문제 해결

### 구버전 Node.js

내보내기 모듈은 Node.js 버전 12.03 이상과 호환됩니다. 더 오래된 버전이 있다면 Electron의 더 이른 버전을 설치해야 합니다:

~~~
npm install electron@6.1
~~~

### PDF로 내보내기가 끝나지 않음

 Windows에서 사용자 정의 DPI 설정이나 글꼴을 사용하는 경우 Electron 구성 요소에 버그가 있습니다. 작동하도록 하려면 더 이른 버전을 설치해야 합니다:

~~~
npm install electron@6.1
~~~

### Mac M1에서 PDF/PNG 내보내기가 작동하지 않음

현재 사용 중인 Electron 버전은 Darwin-ARM64 아키텍처용 빌드를 제공하지 않습니다. 해결 방법으로 Electron 11을 설치해 보십시오.

~~~
npm install electron@11
~~~

기본 내보내기 기능은 작동해야 하지만 해당 버전에서 모든 기능이 올바르게 작동하는지 확인하지 않았습니다:

### PDF 내보내기가 작동하지 않음

원인에는 여러 가지가 있을 수 있습니다. 오류 메시지를 확인해야 합니다.

다음 오류 중 하나가 발생하면:

* crash dump id를 가져올 수 없음

* Electron이 충돌했습니다!

대부분의 경우 내보내기 모듈이 헤드리스 서버에서 작동하고 있음을 의미합니다. PDF 및 PNG 내보내기를 사용하려면 필요한 구성 요소를 설치해야 합니다. 또는 Docker 이미지를 빌드할 수 있습니다.

### Docker 이미지를 사용하는 방법

다음 명령으로 Docker 이미지를 빌드합니다:

~~~
docker build -t dhtmlx/scheduler-gantt-export ./
~~~

다음 명령으로 Docker 이미지를 실행합니다:

~~~
docker run -d -p 3200:80 dhtmlx/scheduler-gantt-export
~~~

3200은 Docker 서비스가 작동하는 포트입니다.