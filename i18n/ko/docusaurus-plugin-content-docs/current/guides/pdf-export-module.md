---
title: "PDF 내보내기 모듈"
sidebar_label: "PDF 내보내기 모듈"
---

# PDF 내보내기 모듈

이 내보내기 모듈을 사용하면 데이터를 PDF, PNG, Excel, iCal 형식으로 내보낼 수 있습니다. Node.js 앱으로 또는 Docker 이미지를 통해 모든 플랫폼에서 설정할 수 있습니다.

참고: MS Project 및 Primavera 파일에 대한 가져오기/내보내기는 지원하지 않습니다. 해당 파일의 경우 [전용 내보내기 모듈](guides/msp-export-module.md) 또는 온라인 서비스를 사용해야 합니다.

## 설치 가이드

시작하려면, [공식 웹사이트](https://nodejs.org/en/)의 안내에 따라 Node.js를 다운로드하고 설치하세요.

내보내기 모듈은 Client's Area의 Downloads 탭에서 찾을 수 있습니다. 예시는 다음과 같습니다:

![PDF export module download](/img/pdf_export_module_download.png)

다운로드가 완료되면, 원하는 위치에 파일의 압축을 푸세요. 그런 다음 명령 프롬프트를 열고 내보내기 모듈 폴더로 이동합니다. 예를 들어:

~~~
cd C:export_module
~~~

다음으로, 필요한 애플리케이션 모듈을 설치합니다:

~~~
npm install
~~~

[그래픽 인터페이스가 없는 머신에 컴포넌트를 설치](#usingserverwithoutgraphicalinterface)하려면 아래의 관련 섹션을 참고하세요.

그래픽 인터페이스가 있는 서버에서 내보내기 모듈을 실행하려면 다음 명령어로 시작하세요:

~~~
npm start
~~~

정상적으로 작동하는지 확인하려면 다음 URL을 엽니다: [http://localhost:3200/test](http://localhost:3200/test)

또는, 메인 페이지 [http://localhost:3200](http://localhost:3200)에서 Test 링크를 클릭해도 됩니다.

## 그래픽 인터페이스 없이 서버 사용하기

헤드리스 서버에서 내보내기 모듈을 실행하려면 추가 컴포넌트가 필요합니다. Debian 기반 배포판에서는 다음 명령어를 사용하세요:

~~~
apt-get install -y xvfb libgtk2.0-0 libgtk-3-0 libgbm-dev 
libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth
~~~

RPM 기반 배포판에서는 다음을 실행하세요:

~~~
yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel 
libnotify-devel GConf2 nss libXScrnSaver alsa-lib
~~~

그 후, 아래 명령어 중 하나로 모듈을 실행합니다:

~~~
npm run start:docker
~~~

또는

~~~
xvfb-run node index.js
~~~

## 문제 해결

### 오래된 Node.js 버전

내보내기 모듈은 Node.js 12.03 이상에서 동작합니다. 이전 버전을 사용 중이라면, 이전 Electron 버전을 설치하세요:

~~~
npm install electron@6.1
~~~

### PDF 내보내기가 끝나지 않음

Windows 시스템에서 사용자 지정 DPI 설정이나 폰트를 사용하는 경우, 알려진 Electron 버그가 있습니다. 이 경우, 이전 Electron 버전을 설치하여 해결할 수 있습니다:

~~~
npm install electron@6.1
~~~

### Mac M1에서 PDF/PNG 내보내기가 동작하지 않음

현재 사용 중인 Electron 버전은 Darwin-ARM64 빌드를 지원하지 않습니다. 해결 방법으로 Electron 11을 설치해보세요:

~~~
npm install electron@11
~~~

기본 내보내기 기능은 동작해야 하나, 모든 기능이 이 버전에서 테스트된 것은 아닙니다.

### PDF 내보내기가 동작하지 않음

여러 가지 원인이 있을 수 있으니, 오류 메시지를 꼼꼼히 확인하세요.

다음과 같은 오류가 나타난다면:

• Failed to get crash dump id

• Electron crashed!

이 경우, 내보내기 모듈이 헤드리스 서버에서 실행 중일 가능성이 높습니다.  
[PDF 및 PNG 내보내기에 필요한 컴포넌트 설치](#usingserverwithoutgraphicalinterface) 또는 Docker 이미지를 사용해야 합니다.

### Docker 이미지 사용하기

다음 명령어로 Docker 이미지를 생성하세요:

~~~
docker build -t dhtmlx/scheduler-gantt-export ./
~~~

Docker 컨테이너를 시작하려면:

~~~
docker run -d -p 3200:80 dhtmlx/scheduler-gantt-export
~~~

여기서 3200은 Docker 서비스에 접근할 수 있는 포트입니다.
