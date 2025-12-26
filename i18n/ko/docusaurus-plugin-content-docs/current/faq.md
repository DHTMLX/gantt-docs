---
title: "FAQ"
sidebar_label: "FAQ"
---

# FAQ

## 샘플을 여는 방법

컴포넌트의 배포본에는 샘플을 로컬에서 실행할 수 있는 데모 백엔드 앱이 포함되어 있습니다. 
이 앱은 [Node.js](https://nodejs.org/en/)가 필요하며, 데모를 위해 백엔드에 데이터를 저장해야 하는 경우 메모리 내 저장소를 사용합니다(즉, 별도의 데이터베이스 설정이 필요하지 않습니다).

### 예제를 실행하기 위해 할 수 있는 방법

1) 데모 Node.js 기반 백엔드 앱 사용: 

- 패키지를 폴더에 압축 해제하세요.
- 터미널(또는 cmd, PowerShell)을 여세요.
- `npm install` 실행
- `npm run start` 실행
- 브라우저에서 `http://localhost:9200` 접속
- 온라인 샘플 페이지 **https://docs.dhtmlx.com/gantt/samples/** 와 동일한 인덱스 페이지가 보입니다.

2) Apache 웹 서버 사용

- Apache 웹 서버를 설치하세요. 설치 방법을 잘 모를 경우 [XAMPP](https://www.apachefriends.org/index.html) 사용을 권장합니다.
- Gantt 샘플을 Apache 문서 루트 디렉터리(*xampp/htdocs*, XAMPP를 설치한 경우)에 넣으세요.
- Apache 웹 서버를 실행하면 **http://localhost/yourfolder** URL을 통해 예제에 접근할 수 있습니다.

3) IDE에 내장된 개발용 웹 서버 사용

일부 IDE는 내장 개발용 웹 서버를 제공합니다. 예: 
[https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html](https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html)


사용 중인 IDE가 이와 유사한 기능을 기본 제공하거나 플러그인으로 지원하는지 확인해보세요.

### 왜 필요할까요?

패키지 내 일부 샘플은 AJAX(xhr)를 사용하여 JSON 파일에서 데이터를 로드합니다. 이를 위해서는 예제를 웹 서버에서 열어야 합니다.

예제를 더블 클릭하여 열면 브라우저가 파일로서 예제를 엽니다. 이 모드에서는 브라우저가 AJAX 호출을 차단하므로 컴포넌트가 데이터 파일을 불러올 수 없습니다. 
화면 우측 상단에 *Invalid data* 팝업이 표시됩니다.

이러한 동작이 실제로 발생하는지 확인하려면 브라우저의 주소 표시줄에서 URL을 확인하세요. URL이 *file:///* 형식이라면, 예를 들어: 


**file:///D:/www/gantt-eval/samples/11_resources/09_resource_histogram.html** 

이 경우에 해당합니다. 파일에서 데이터를 불러오는 샘플은 이 모드에서 동작하지 않습니다.

웹 서버에서 예제를 열면 URL은 다음과 같이 표시됩니다(*http://*는 생략될 수 있습니다): 


**http://localhost/gantt-eval/samples/11_resources/09_resource_histogram.html**

## Gantt 차트가 올바르게 표시되지 않음

Gantt 차트가 페이지에 올바르게 표시되지 않는 경우, 차트 컨테이너의 CSS 스타일을 확인하세요. 컨테이너에는 픽셀 또는 퍼센트 단위의 올바른 크기가 지정되어야 합니다.


- 퍼센트 단위로 크기를 지정한 경우, 부모 컨테이너에도 높이가 지정되어 있는지 확인하세요.
- Gantt 차트를 body에 직접 배치한 경우, 퍼센트 기반 높이를 올바르게 사용하려면 다음 css 스타일을 지정하세요:

~~~js
html, body{
    margin:0px;
    padding:0px;
    height:100%; /*필수*/
    overflow:hidden;
}
~~~

## Internet Explorer에서 Gantt 차트가 올바르게 표시되지 않음

Gantt 차트가 Internet Explorer에서만 올바르게 표시되지 않는 경우, 페이지에 전체 DOCTYPE 선언이 사용되고 있는지 확인하세요. 
dhtmlxGantt는 IE6, IE7, IE8의 표준 모드에서 정상 작동하지만, IE의 쿼크 모드에서는 사용할 수 없습니다.

예를 들어, HTML5 DOCTYPE은 다음과 같습니다:

~~~html
<!DOCTYPE html>
~~~

## 오른쪽 상단에 에러 알림이 표시됨

![error_alert](/img/error_alert.png)

먼저, 오류의 원인을 파악해야 합니다.

이 메시지는 컴포넌트가 정상적으로 동작하지 못할 때 나타납니다. 
대부분 데이터 또는 애플리케이션 로직에 실제 문제가 있음을 의미합니다. 단순히 메시지를 숨기는 것은 문제를 감추는 것일 뿐, 앱의 다른 부분에서 다시 나타날 수 있습니다.

단, 최종 사용자에게 앱을 배포하기 전에 이러한 메시지를 비활성화하고 싶을 수 있습니다. 이 경우 [show_errors](api/config/show_errors.md) 설정을 사용할 수 있습니다:

~~~js
gantt.config.show_errors = false;
~~~

## Gantt가 아무것도 표시하지 않음

가장 일반적인 두 가지 시나리오가 있습니다:

1. 백엔드 API를 직접 구현하거나 [튜토리얼](integrations/howtostart-guides.md)을 따라 구현했지만, 페이지를 열었을 때 Gantt에 작업이나 링크가 표시되지 않습니다.

또는

2. 변경사항을 백엔드에 저장하는 데 문제가 있습니다.

문제의 원인을 파악하는 방법은 [백엔드 통합 문제 해결](guides/troubleshooting.md) 문서를 참고하세요.

## 작업의 마지막 날을 기간에 포함시키는 방법

날짜를 시간-분 없이 "일" 단위로 지정하고 시작일과 종료일이 같을 경우, 작업 기간이 1일이 아니라 0일로 계산되는 것을 볼 수 있습니다.

예를 들어, 시작일과 종료일이 각각 "01-12-2021"과 "05-12-2021"인 경우를 살펴보겠습니다. 
작업이 12월 1일부터 5일까지 5일간 지속된다고 생각할 수 있지만, gantt는 기간을 4일로 계산합니다.

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
// 2021년 12월 5일 00:00:00

console.log(gantt.getTask(1).duration);
// 4
~~~

기본적으로, 작업의 마지막 날은 기간에서 제외됩니다. 하지만 기본 동작을 변경하여 마지막 날을 기간에 포함시킬 수도 있습니다. 자세한 내용은 [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates) 문서를 참고하세요.

## 순환 참조 오류

잘못된 데이터를 Gantt에 전달하면 트리 구조가 순환 구조가 되어 순환 참조 오류가 발생할 수 있습니다.

![cyclic_error](/img/cyclic_error.png)

예를 들어, 다음과 같은 경우에 오류가 발생할 수 있습니다:

- 작업의 부모 ID가 작업의 ID와 동일한 경우:

![equal_ids](/img/equal_ids.png)

작업 #2는 자기 자신을 부모로 가질 수 없습니다.

- 작업의 자식 중 하나가 부모가 된 경우:

![parent_child_error](/img/parent_child_error.png)

"Task #4"가 "Task #1"의 부모로 지정되어 있습니다. 
하지만 동시에 "Task #4"는 "Task #1"의 자식이기도 합니다.

## 평가 기간이 만료됨

Gantt 차트의 라이선스 PRO 버전을 설치했는데도 평가 기간 만료 메시지가 계속 나타난다면, 애플리케이션 어딘가에 Trial 버전이 남아있다는 의미입니다. 
평가 기간 만료 팝업은 Trial 버전에서만 표시됩니다.

따라서 Gantt 차트의 Trial 버전 파일을 완전히 삭제한 후 PRO 버전을 설치해야 합니다. 자세한 내용은 [Adding PRO Edition into Project](guides/installation.md#addingproeditionintoproject) 섹션을 참고하세요.

**팁:** 연결된 파일을 확인하려면 웹 콘솔에서 *gantt.license* 를 입력하세요.

