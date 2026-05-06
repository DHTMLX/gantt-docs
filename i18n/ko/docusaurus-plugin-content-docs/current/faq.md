---
title: "자주 묻는 질문"
sidebar_label: "자주 묻는 질문"
---

# 자주 묻는 질문

## 샘플 열기 방법

컴포넌트의 배포판에는 로컬에서 샘플을 실행하는 데 사용할 수 있는 데모 백엔드 앱이 포함되어 있습니다. 이 앱은 [Node.js](https://nodejs.org/en/)가 필요하며 데모용으로 인메모리 스토리지를 사용합니다. 백엔드에서 데이터를 저장하도록 되어 있으므로 데이터베이스 설정이 필요하지 않습니다.

### 예제를 실행하기 위해 할 수 있는 일

1) 데모 Node.js 기반 백엔드 앱 사용: 

- 패키지를 특정 폴더에 추출합니다.
- 터미널(또는 cmd, PowerShell)을 엽니다.
- `npm install`을 실행합니다.
- `npm run start`를 실행합니다.
- 브라우저에서 `http://localhost:9200`를 엽니다.
- 온라인 샘플과 동일한 인덱스 페이지가 표시되어야 합니다 **https://docs.dhtmlx.com/gantt/samples/**

2) Apache 웹 서버 사용

- Apache 웹 서버를 설치합니다. 방법이 확실하지 않다면 [XAMPP](https://www.apachefriends.org/index.html)를 사용하는 것을 권장합니다.
- Gantt 샘플을 Apache 문서 루트 디렉터리(*xampp/htdocs*, XAMPP를 설치한 경우)에 넣습니다.
- Apache 웹 서버를 실행하면 예제에 접근할 때 **http://localhost/yourfolder** URL을 사용할 수 있습니다.

3) IDE에 내장된 개발 웹 서버 사용

일부 IDE는 내장 개발 웹 서버를 제공합니다. 예를 들면: 
[https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html](https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html).

사용 중인 IDE가 기본 제공되거나 플러그인을 통해 이와 비슷한 기능을 지원하는지 확인할 수 있습니다.

### 왜 필요할 수 있나요

패키지의 일부 예제는 AJAX(xhr)를 사용하여 JSON 파일에서 데이터를 로드합니다. 작동하려면 웹 서버에서 예제를 열어야 합니다.

예제를 더블 클릭으로 열면 브라우저가 파일로 열게 됩니다. 이 모드에서는 브라우저가 AJAX 호출을 차단하고 컴포넌트가 데이터 파일을 로드할 수 없게 됩니다. 화면의 오른쪽 상단에 *Invalid data* 팝업이 표시됩니다.

설명된 동작이 귀하의 경우에 해당하는지 확인하려면 브라우저의 탐색 패널에서 URL을 확인할 수 있습니다. URL에 *file:///* 형식이 사용되면 예시는 다음과 같습니다. 


**file:///D:/www/gantt-eval/samples/11_resources/09_resource_histogram.html** 


그 경우임을 확신할 수 있습니다. 파일에서 데이터를 로드하는 샘플은 이 모드에서 작동하지 않습니다.

웹 서버에서 예제를 열면 URL은 다음과 같아 보일 것입니다(*http://*가 생략될 수 있음): 


**http://localhost/gantt-eval/samples/11_resources/09_resource_histogram.html**


## Gantt 차트가 올바르게 렌더링되지 않습니다

페이지에 Gantt 차트가 올바르게 렌더링되지 않았다면 차트 컨테이너의 CSS 스타일을 확인하십시오. 픽셀 단위 또는 퍼센트로 유효한 크기를 가져야 합니다.

- 크기가 퍼센트로 정의된 경우 상위 컨테이너에도 높이가 설정되어 있는지 확인하십시오.
- Gantt 차트가 바디에 직접 배치된 경우, 퍼센트 기반 높이를 올바르게 사용하기 위해 다음 CSS 스타일을 지정하십시오:

~~~js
html, body{
    margin:0px;
    padding:0px;
    height:100%; /*mandatory*/
    overflow:hidden;
}
~~~


## The Gantt 차트가 Internet Explorer에서 올바르게 렌더링되지 않습니다

Internet Explorer 브라우저에서만 페이지가 올바르게 렌더링되지 않는 경우 페이지가 전체 DOCTYPE 선언을 사용하는지 확인하십시오.
dhtmlxGantt는 IE6, IE7 및 IE8의 표준 모드에서 올바르게 작동하지만 IE의 quirks 모드에서는 사용하도록 의도되지 않았습니다.

예를 들면, HTML5 DOCTYPE는 다음과 같습니다:

~~~html
<!DOCTYPE html>
~~~


## 오른쪽 상단 모서리에 오류 경고가 표시됩니다

![error_alert](/img/error_alert.png)

먼저 오류의 원인을 파악해야 합니다. 

메시지는 컴포넌트가 정상적으로 작동하지 않을 때 표시됩니다. 일반적으로 데이터나 애플리케이션 로직의 실제 문제를 나타냅니다. 따라서 이를 숨긴다고 해서 문제를 은폐하게 되며, 앱의 다른 부분에서 다시 나타날 수 있습니다.

다만 애플리케이션을 최종 사용자에게 배포하기 전에 이 메시지를 비활성화하려면 [show_errors](api/config/show_errors.md) 설정을 사용할 수 있습니다:

~~~js
gantt.config.show_errors = false;
~~~


## Gantt가 아무 것도 표시하지 않습니다

가장 명확한 두 가지 시나리오가 있습니다:

1. 백엔드 API를 수동으로 구현하거나 우리의 [tutorials](integrations/howtostart-guides.md)에 따라 구현하려고 하지만 Gantt가 페이지를 열었을 때 작업이나 연결이 표시되지 않습니다.

또는

2. 백엔드에 변경 내용을 저장하는 데 문제가 있습니다.

문제의 원인을 파악하는 방법에 대한 지침은 [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) 문서를 읽어보십시오.

## 작업의 기간에 마지막 날 포함 방법

일자가 시 시간-분 부분 없이 일 단위로 지정되고 시작일과 종료일이 동일하면 작업의 기간은 1일이 아니라 0일로 계산될 수 있습니다. 

다음 예시를 보겠습니다. 시작일과 종료일이 각각 "01-12-2021" 및 "05-12-2021"인 경우를 보면 작업은 12월 1일부터 5일까지 5일간 지속될 것이라고 생각되지만, Gantt는 기간을 4일로 계산합니다.

~~~js
gantt.parse({ tasks: [
    { 
        id: 1,
        text: "Task 1",
        start_date: "01-12-2021",
        end_date: "05-12-2021"
    }
]}, links:[]);

console.log(gantt.getTask(1).end_date);
// 5 December 2021 00:00:00

console.log(gantt.getTask(1).duration);
// 4
~~~

기본적으로 작업의 마지막 날은 기간에서 제외되지만, 기본 동작을 변경하고 마지막 날을 기간에 포함시키는 옵션이 있습니다. 자세한 내용은 [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates) 문서를 확인하십시오.

## 순환 참조 오류

Gantt에 잘못된 데이터를 전달하면 트리 형태의 구조가 순환하게 되어 순환 참조 오류가 발생합니다.

![cyclic_error](/img/cyclic_error.png)

예를 들어 다음과 같은 경우에 이 오류가 발생할 수 있습니다:

- 작업의 상위 ID가 작업의 ID와 동일한 경우:

![equal_ids](/img/equal_ids.png)

작업 #2는 자신을 부모로 삼을 수 없습니다.

- 작업의 자식 중 한 명이 그 작업의 부모가 되는 경우:

![parent_child_error](/img/parent_child_error.png)

"작업 #4"가 "작업 #1"의 부모로 지정되어 있습니다. 하지만 동시에 "작업 #4"는 "작업 #1"의 자식이기도 합니다.

## 평가 기간이 만료되었습니다

정식으로 라이선스가 부여된 PRO 버전의 Gantt 차트를 설치했지만 평가 기간이 만료되었다는 메시지가 여전히 보인다면 애플리케이션 어딘가에 트라이얼 버전이 남아 있다는 뜻입니다. 트라이얼 버전만이 만료된 평가 기간에 대한 팝업 메시지를 표시하는 기능을 제공합니다.

따라서 PRO 버전을 설치하기 전에 Gantt 차트의 트라이얼 패키지 파일을 완전히 제거해야 한다는 점을 기억하십시오. 자세한 내용은 [Adding PRO Edition into Project](guides/installation.md#adding-pro-edition-into-project) 섹션을 참조하십시오.

**팁:** 연결된 파일이 어떤 것인지 확인하려면 웹 콘솔에 *gantt.license*를 입력하면 됩니다.