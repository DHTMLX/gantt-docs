---
title: "dhtmlxGantt 설치 방법"
sidebar_label: "설치"
---

# dhtmlxGantt 설치 방법

dhtmlxGantt는 [NuGet](https://www.nuget.org/), [Bower](https://bower.io/), [npm](https://www.npmjs.com/)과 같은 패키지 관리자를 통해 프로젝트에 추가할 수 있습니다.

또는, 필요한 JS 및 CSS 파일을 CDN을 통해 직접 포함할 수도 있습니다.

## npm - 평가판 및 PRO 버전 {#npmevaluationandproversions}

**Professional 평가판 버전**

[체험판 Gantt 패키지](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml)를 다운로드한 후, README 파일의 안내를 따라 설치할 수 있습니다. 체험판은 30일 동안만 사용 가능합니다.

**Professional 버전**

DHTMLX의 프라이빗 npm 레지스트리 접근은 [Client's Area](https://dhtmlx.com/clients/)에서 npm 로그인 및 비밀번호를 생성하여 이용할 수 있습니다. 자세한 설치 가이드도 해당 페이지에서 확인할 수 있습니다. 프라이빗 npm 접근은 Gantt 라이선스가 활성 상태일 때만 제공됩니다.

## npm - 표준 무료 버전 {#npmstandardfreeversion}

표준 버전 dhtmlxGantt는 [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt)에서 다음 명령어로 설치할 수 있습니다:

~~~html
npm install dhtmlx-gantt
~~~

:::note
Gantt의 표준 버전만 [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt)에서 제공됩니다.
:::

## NuGet {#nuget}

[NuGet](https://www.nuget.org/)을 사용하여 dhtmlxGantt를 추가하려면, 다음 명령어를 실행하세요:

~~~html
nuget install DHTMLX.Gantt
~~~

Microsoft Visual Studio를 사용 중이라면, 패키지 관리자 콘솔에서 아래와 같이 설치할 수 있습니다:

~~~html
install-package DHTMLX.Gantt
~~~

## Bower {#bower}

[Bower](https://bower.io/)를 통해 dhtmlxGantt를 설치하려면 다음을 실행하세요:

~~~html
bower install gantt
~~~

## CDN {#cdn}

CDN을 통해 dhtmlxGantt를 포함하려면 **dhtmlxgantt.js**와 **dhtmlxgantt.css** 파일을 직접 링크하면 됩니다:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
~~~

dhtmlxGantt 버전에 따라 다양한 CDN 링크 전체 목록은 [별도의 문서](guides/cdn-links-list.md)를 참고하세요.

## 패키지 다운로드 {#downloadthepackage}

### GPL 버전

[여기](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml)에서 dhtmlxGantt의 GPL 버전을 다운로드할 수 있습니다.

### PRO 버전

PRO 버전 라이선스를 보유하고 있다면, [Client Area](https://dhtmlx.com/clients/)에서 PRO 패키지를 다운로드하세요.

다운로드 후, 패키지를 프로젝트 내 폴더에 압축 해제한 뒤, **dhtmlxgantt.js**와 **dhtmlxgantt.css** 파일을 페이지에 포함시키고, 경로가 올바른지 확인하세요:

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~

## PRO 에디션 프로젝트에 추가하기 {#addingproeditionintoproject}

### **Pro 버전 설치하기**

:::note
이전에 평가판을 설치했다면, Pro 버전을 설치하기 전에 [제거](#uninstalltrialversion)하는 것이 좋습니다.
:::

공개 소스(CDN, NuGet, Bower, npm)에서는 GPL 라이선스의 dhtmlxGantt 표준 에디션만 제공합니다.

Professional 및 Evaluation 에디션의 경우, [프라이빗 npm 레지스트리](#npmevaluationandproversions)를 사용할 수 있습니다.

이 방법이 맞지 않는 경우, 다음 두 가지 대안이 있습니다:

- Pro 버전을 수동으로 프로젝트에 추가
- 로컬 디렉터리에서 npm을 통해 Pro 버전 설치

### 로컬 폴더에서 패키지 설치하기 (#installfromlocalfolder)

**npm**을 사용할 경우, Pro 패키지는 [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) 또는 [`npm link`](https://docs.npmjs.com/cli/link/) 명령어로 로컬 폴더에서 설치할 수 있습니다. 아래는 두 가지 방법에 대한 안내입니다:

### npm install

1. Gantt 패키지를 로컬 디렉터리에 복사합니다.
2. 프로젝트 디렉터리로 이동합니다.
3. `npm install ../gantt-local-package-path` 명령어를 실행합니다.

### npm link

1. Gantt 패키지를 로컬 디렉터리에 복사합니다.
2. 패키지 폴더에서 `npm link`를 실행합니다.
3. 프로젝트 디렉터리로 이동합니다.
4. `npm link dhtmlx-gantt`를 실행합니다.

dhtmlxGantt의 표준 버전과 PRO 버전 비교는 관련 문서 [Standard vs PRO 라이브러리 버전](guides/editions-comparison.md)를 참고하세요.

### **평가판 제거하기** (#uninstalltrialversion)

Pro 버전 설치 전에는 평가판 패키지를 제거하는 것이 좋습니다:

~~~js
npm uninstall dhtmlx-gantt
~~~

애플리케이션에 *dhtmlxgantt.js* 파일이 남아있지 않은지 확인하세요.

**Linux 및 MacOS**에서는 다음 명령어로 검색할 수 있습니다:

~~~js
grep -rin "dhtmlxGantt v"
grep -rin evaluation
~~~

**Windows**에서는 명령 프롬프트에서 아래 명령어를 사용하세요:

~~~js
findstr /mis "dhtmlxGantt v" path_to_your_app*
findstr /mis "evaluation" path_to_your_app*
~~~

제거가 완료되었음을 확인한 후, 위에서 안내한 대로 Pro 버전을 설치하시면 됩니다.
