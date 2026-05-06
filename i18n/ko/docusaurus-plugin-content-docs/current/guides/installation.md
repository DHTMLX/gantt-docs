---
title: "dhtmlxGantt 설치 방법" 
sidebar_label: "설치" 
---

# dhtmlxGantt 설치 방법

다음의 [npm](https://www.npmjs.com/), [NuGet](https://www.nuget.org/) 또는 [Bower](https://bower.io/) 패키지 관리자를 사용하여 프로젝트에 dhtmlxGantt 패키지를 설치할 수 있습니다.

필요한 JS/CSS 파일을 CDN에서 포함하는 것도 가능합니다.

## npm - 평가 및 PRO 버전 {#npmevaluationandproversions}

**전문가 평가 버전**

다음의 [trial Gantt 패키지]를 다운로드하고 README 파일에 기재된 절차를 따르십시오.  
참고: 트라이얼 Gantt 버전은 30일간만 사용할 수 있습니다.

**전문 버전**

DHTMLX의 비공개 npm에 [Client's Area]에서 로그인 정보로 직접 접속할 수 있습니다. 거기에 설치 가이드도 자세히 있습니다. 비공개 npm에 대한 접근은 귀하의 독점 Gantt 라이선스가 활성화되어 있을 때에만 가능합니다.

## npm - 표준 무료 버전

다음 명령어를 실행하여 [npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt)에서 dhtmlxGantt의 표준 버전을 설치할 수 있습니다.

~~~html
npm install dhtmlx-gantt
~~~

:::note  
[npmjs.com](https://www.npmjs.com/package/dhtmlx-gantt)에서 이용할 수 있는 것은 표준 버전의 Gantt뿐입니다.  
:::


## NuGet

[NuGet](https://www.nuget.org/)을 통해 dhtmlxGantt를 설치하려면 다음 명령어를 실행하십시오:

~~~html
nuget install DHTMLX.Gantt
~~~

Microsoft Visual Studio를 사용하는 경우 Package Manager Console에서 다음 명령을 실행하십시오:

~~~html
install-package DHTMLX.Gantt
~~~


## Bower

[ Bower](https://bower.io/)를 통해 dhtmlxGantt를 설치하려면 다음 명령어를 실행하십시오:

~~~html
bower install gantt
~~~


## CDN

CDN에서 JS/CSS 파일을 포함하려면 **dhtmlxgantt.js**와 **dhtmlxgantt.css** 파일에 대한 직접 링크를 설정해야 합니다:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
~~~

다음은 dhtmlxGantt의 버전에 따라 CDN에서 포함할 수 있는 전체 링크 목록으로, [separate article](guides/cdn-links-list.md)에서 확인할 수 있습니다.

## 패키지 다운로드

### GPL 버전

[dhtmlxGantt GPL 버전 패키지 다운로드](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml).

### PRO 버전

컴포넌트의 PRO 버전이 있다면 [Client Area](https://dhtmlx.com/clients/)로 이동하여 거기에서 PRO 패키지를 다운로드해야 합니다.

버전에 관계없이 다운로드한 패키지를 프로젝트의 폴더에 압축 해제합니다.  
그 다음 페이지에 **dhtmlxgantt.js**와 **dhtmlxgantt.css** 파일을 포함합니다. 이 파일들에 대한 올바른 상대 경로를 설정했는지 확인하십시오:

~~~html
<script type="text/javascript" src="codebase/dhtmlxgantt.js"></script>  
<link rel="stylesheet" href="codebase/dhtmlxgantt.css">
~~~


## PRO Edition을 프로젝트에 추가

### **PRO 버전 설치**

:::note
Gantt의 PRO 버전을 설치하기 전에 트라이얼 버전 패키지를 제거해야 합니다(설치했다면) [uninstall-trial-version] 섹션을 참조하십시오
:::

공개 소스(CDN, NuGet, Bower 및 npm)에는 모두 GPL 라이선스 하에 배포되는 표준 에디션의 구성요소가 있습니다.

또한 [비공개 npm 레지스트리](#npmevaluationandproversions)를 제공하며, 이를 통해 Professional 및 Evaluation 버전의 구성요소를 설치할 수 있습니다.

위에 설명된 방법 중 어떤 것을 사용할 수 없는 경우 두 가지 대안이 있습니다:

- 수동으로 Pro 버전을 프로젝트에 추가할 수 있습니다
- 로컬 디렉터리에서 npm을 통해 프로젝트에 Pro 버전을 설치할 수 있습니다

### 로컬 폴더에서 패키지 설치 {#installfromlocalfolder}

**npm**의 경우 로컬 폴더에서 Pro 패키지를 설치하려면 [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) 또는 [`npm link`](https://docs.npmjs.com/cli/link/)를 사용합니다. 두 가지 변형에 대한 단계별 지침이 있습니다:

### npm install

1. Gantt 패키지를 로컬 디렉터리에 복사합니다.
2. 프로젝트 디렉터리로 이동합니다.
3. `npm install ../gantt-local-package-path`를 실행합니다.

### npm link

1. Gantt 패키지를 로컬 디렉터리에 복사합니다.
2. 패키지 폴더에서 `npm link`를 실행합니다.
3. 프로젝트 디렉터리로 이동합니다.
4. `npm link dhtmlx-gantt`를 실행합니다.

dhtmlxGantt 라이브러리의 표준 버전과 PRO 버전 간 차이는 관련 문서 [Standard vs PRO Library Versions](guides/editions-comparison.md)를 확인하십시오.

### **Uninstall trial version**

Pro 버전을 올바르게 설치하려면 트라이얼 버전 패키지를 제거하는 것이 좋습니다:

~~~js
npm uninstall dhtmlx-gantt
~~~

그 후 애플리케이션에 *dhtmlxgantt.js* 파일이 전혀 남지 않았는지 철저히 확인하십시오.

**Linux 및 MacOS**에서는 터미널에서 다음 명령을 사용할 수 있습니다:

~~~js
grep -rin "dhtmlxGantt v"
grep -rin evaluation
~~~

**Windows**에서는 명령 프롬프트에서 다음 명령을 사용할 수 있습니다:

~~~js
findstr /mis "dhtmlxGantt v" path_to_your_app*
findstr /mis "evaluation" path_to_your_app*
~~~

그 후 위에서 설명한 대로 Gantt 차트의 Pro 버전을 설치할 수 있습니다.