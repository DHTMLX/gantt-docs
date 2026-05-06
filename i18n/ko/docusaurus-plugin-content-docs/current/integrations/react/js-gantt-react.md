--- 
title: React와 함께하는 dhtmlxGantt
sidebar_label: 저수준 통합
description: "래퍼 없이 React 내에서 Gantt를 사용하는 단계별 가이드"
---

# React와 함께하는 dhtmlxGantt

:::note
이 튜토리얼은 React 앱에서 JS DHTMLX Gantt를 사용하는 방법을 다룹니다. 공식 React Gantt 컴포넌트를 사용하고자 한다면 [React Gantt](integrations/react.md) 기사를 참고하세요.
:::

이 문서를 사용하려면 [React](https://react.dev/)의 기본 개념과 패턴에 익숙해야 합니다. 익숙하지 않다면 시작 가이드용 [React 문서](https://react.dev/learn)를 참조하세요.

DHTMLX Gantt는 React와 호환됩니다. GitHub에서 해당 예제를 확인할 수 있습니다: [DHTMLX Gantt with React Demo](https://github.com/DHTMLX/react-gantt-demo).

## 프로젝트 만들기

새 프로젝트를 시작하기 전에 [Node.js](https://nodejs.org/en/)를 설치하세요.

다음 명령으로 기본 React 프로젝트를 생성할 수 있습니다:

~~~ 
npx create-vite my-react-gantt-app --template react
~~~

### 의존성 설치

다음으로 앱 디렉토리로 이동합니다. 프로젝트를 **my-react-gantt-app**로 부르고 아래를 실행합시다:

~~~ 
cd my-react-gantt-app
~~~

그다음 의존성을 설치하고 개발 서버를 시작해야 합니다. 이를 위해 패키지 관리자를 사용해야 합니다:

- **yarn**을 사용하는 경우 아래 명령을 실행합니다:

~~~ 
yarn install
yarn dev
~~~

- **npm**을 사용하는 경우 아래 명령을 실행합니다:

~~~ 
npm install
npm run dev
~~~

이제 React 프로젝트가 [http://localhost:5173](http://localhost:5173) 에서 실행 중이어야 합니다.

![Gantt React app running](/img/gantt_react_app_run.png)

## Gantt 생성하기

이제 DHTMLX Gantt 코드를 가져와야 합니다. 먼저 명령줄에서 Ctrl+C를 눌러 앱을 중지한 후 Gantt 패키지 설치를 진행합니다.

## 1단계. 패키지 설치

라이브러리의 PRO 버전은 우리 개인 저장소에서의 **npm/yarn** 설치로 제공되며, 접근 권한을 얻으려면 아래 지침을 따라 주세요:

[this instruction](guides/installation.md#npmevaluationandproversions)

Gantt의 Evaluation 버전을 얻은 후 아래 명령으로 설치할 수 있습니다:

- npm용:

~~~ 
npm install @dhx/trial-gantt
~~~

- yarn용:

~~~ 
yarn add @dhx/trial-gantt
~~~

또는 라이브러리의 zip 패키지가 **npm** 모듈처럼 구성되어 있으므로 [로컬 폴더에서 설치하기](guides/installation.md#installfromlocalfolder)로 설치할 수 있습니다.

## 2단계. 컴포넌트 생성

이제 애플리케이션에 Gantt를 추가하기 위한 React 컴포넌트를 만들어야 합니다. ***src/*** 디렉토리에 ***Gantt.jsx*** 파일을 만들어 봅시다.

### 소스 파일 임포트

새로 만든 ***Gantt.jsx*** 파일을 열고 Gantt 소스 파일을 임포트합니다. 주의:

- 로컬 폴더에서 Gantt 패키지를 설치한 경우 임포트 경로는 다음과 같습니다:

~~~js title="Gantt.jsx"
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- 체험(trial) 버전을 설치한 경우 임포트 경로는 아래와 같아야 합니다:

~~~js title="Gantt.jsx"
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

이 튜토리얼에서는 **trial** 버전의 Gantt를 사용합니다.

### 컨테이너 설정 및 Gantt 추가

페이지에 Gantt를 표시하려면 컨테이너를 설정하여 컴포넌트를 내부에 렌더링해야 합니다. ***Gantt.jsx*** 파일에는 아래 코드가 들어 있어야 합니다:

~~~js title="Gantt.jsx"
import { useEffect, useRef } from "react"; /*!*/
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default function GanttView() { /*!*/
  let container = useRef(); /*!*/

  useEffect(() => { /*!*/
    let gantt = Gantt.getGanttInstance(); /*!*/
    gantt.init(container.current); /*!*/

    return () => { /*!*/
      gantt.destructor(); /*!*/
      container.current.innerHTML = ""; /*!*/
    }; /*!*/
  }, []); /*!*/

  return <div ref="{container}" style="{" {width: "100%", height: "100%"} }></div>; /*!*/
} /*!*/
~~~ 

## 3단계. 애플리케이션에 Gantt 추가

이제 컴포넌트를 앱에 추가할 차례입니다. ***src/app.jsx***를 열고 기본 내용 대신 아래 코드를 삽입하여 Gantt 컴포넌트를 사용합니다:

~~~js title="src/app.jsx"
import Gantt from "./Gantt";

function App() {
  return <Gantt/>;
}

export default App;
~~~

Gantt 컨테이너가 본문 전체 공간을 차지하도록 하려면 ***src/*** 폴더에 위치한 ***index.css*** 파일의 기본 스타일을 제거하고 아래 스타일을 추가해야 합니다:

~~~css title="src/index.css"
html,
body,
#root {
  height: 100%;
  padding: 0;
  margin: 0;
}
~~~

그 후 앱을 시작하면 페이지에 빈 Gantt가 보이게 됩니다:

![Gantt React init](/img/gantt_init.png)

## 4단계. 데이터 제공

Gantt에 데이터를 추가하려면 데이터 세트를 제공해야 합니다. ***src/*** 디렉토리에 ***data.js*** 파일을 만들고 아래와 같이 데이터를 추가합시다:

~~~js title="src/data.js"
export function getData() {
  const tasks = {
    data: [
      {
        id: "10",
        text: "Project #1",
        start_date: "01-04-2025",
        duration: 3,
        order: 10,
        progress: 0.4,
        open: true,
      },
      {
        id: "1",
        text: "Task #1",
        start_date: "01-04-2025",
        duration: 1,
        order: 10,
        progress: 0.6,
        parent: "10",
      },
      {
        id: "2",
        text: "Task #2",
        start_date: "02-04-2025",
        duration: 2,
        order: 20,
        progress: 0.6,
        parent: "10",
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
  };
  return tasks;
}
~~~

***App.jsx***에서 Gantt 컴포넌트에 props(데이터)를 전달해야 합니다:

~~~js title="Gantt.jsx"
import Gantt from "./Gantt";
import { getData } from "./data.js";

function App() {
  return <Gantt tasks="{getData()}" />;
}

export default App;
~~~

그리고 Gantt 컴포넌트의 **gantt.parse()** 메서드에서 props를 사용합니다:

~~~js title="Gantt.jsx"
import { useEffect, useRef } from "react";
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default function GanttView(props) {
  let container = useRef();

  useEffect(() => {
    let gantt = Gantt.getGanttInstance();
    gantt.init(container.current);
    gantt.parse(props.tasks); /*!*/

    return () => {
      gantt.destructor();
      container.current.innerHTML = "";
    };
  }, []);

  return <div ref="{container}" style="{" {width: "100%", height: "100%"} }></div>;
}
~~~

이제 페이지를 다시 열면 작업이 있는 Gantt가 보여야 합니다:

![Gantt tasks](/img/gantt_tasks.png)

## 5단계. 데이터 저장

Gantt에서 변경된 내용을 캡처하려면 서버 측 백엔드와의 통신을 가능하게 하는 [dataProcessor](api/method/dataprocessor.md) 핸들러를 사용할 수 있습니다. 핸들러는 함수로 선언하거나 라우터 객체로 선언할 수 있습니다. dhtmlxGantt는 핸들러의 Promise 응답을 받아 작업 완료를 올바르게 처리합니다.

다음과 같이 API 메서드 **createDataProcessor()**를 통해 **DataProcessor**를 생성하고 변경 사항을 캡처할 수 있습니다:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

서비스가 새 레코드를 생성한 후 작업 ID를 변경하는 경우가 일반적이므로, Promise가 결과로 **(id: databaseId)** 또는 **(tid: databaseId)** 객체를 반환하도록 하여 Gantt이 새 데이터베이스 ID를 레코드에 적용할 수 있게 하세요. 서버 측에 대한 자세한 정보는 [서버 측 가이드](guides/server-side.md)를 참조하십시오.

자, React Gantt가 준비되었습니다. GitHub의 전체 데모를 확인해 보세요: [check out the full demo on GitHub](https://github.com/DHTMLX/react-gantt-demo).

## XSS, CSRF 및 SQL Injection 공격

Gantt가 SQL 주입이나 XSS, CSRF 공격과 같은 다양한 위협으로부터 애플리케이션을 보호하는 수단을 제공하지 않는다는 점에 주의하세요. 애플리케이션의 안전성을 유지하는 책임은 백엔드를 구현하는 개발자에게 있습니다.

구성 요소의 가장 취약한 지점과 애플리케이션의 안전성을 향상시키기 위한 조치를 알아보려면 [Application Security](guides/app-security.md) 문서를 확인하세요.