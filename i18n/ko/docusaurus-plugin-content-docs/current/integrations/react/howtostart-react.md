---
title: "dhtmlxGantt와 React 연동하기"
sidebar_label: "로우레벨 통합"
---

# dhtmlxGantt와 React 연동하기

:::note
이 튜토리얼은 JS DHTMLX Gantt를 React 애플리케이션 내에서 사용하는 방법을 안내합니다. 공식 React Gantt 컴포넌트에 대해서는 [React Gantt](integrations/react.md) 문서를 참고하세요.
:::

이 가이드를 따라하기 전에 [React](https://react.dev/)의 기본 개념과 패턴을 이해하고 있으면 도움이 됩니다. React가 처음이라면 [React documentation](https://reactjs.org/docs/getting-started.html)을 먼저 참고해보세요.

DHTMLX Gantt는 React와 잘 호환됩니다. 관련 예제는 GitHub에서 확인할 수 있습니다: [DHTMLX Gantt with React Demo](https://github.com/DHTMLX/react-gantt-demo).

## 프로젝트 생성

새 프로젝트를 생성하기 전에 [Node.js](https://nodejs.org/en/)가 설치되어 있는지 확인하세요.

기본 React 프로젝트를 빠르게 생성하려면 다음 명령어를 실행하세요:

~~~
npx create-vite my-react-gantt-app --template react
~~~

### 의존성 설치

이제 프로젝트 폴더로 이동합니다. 프로젝트 이름이 **my-react-gantt-app**이라면 다음을 실행하세요:

~~~
cd my-react-gantt-app
~~~

이후, 의존성을 설치하고 개발 서버를 시작합니다. 사용하는 패키지 매니저에 따라 아래 명령어를 사용하세요:

- **yarn** 사용 시:

~~~
yarn install
yarn dev
~~~

- **npm** 사용 시:

~~~
npm install
npm run dev
~~~

이제 React 앱이 [http://localhost:5173](http://localhost:5173)에서 실행됩니다.

![Gantt React app running](/img/gantt_react_app_run.png)

## Gantt 생성

다음으로, DHTMLX Gantt 코드를 받아봅니다. 먼저, 터미널에서 **Ctrl+C**를 눌러 실행 중인 앱을 중지하세요. 그런 다음 Gantt 패키지를 설치합니다.

## 1단계. 패키지 설치

라이브러리의 PRO 버전은 **npm/yarn**을 통해 당사 프라이빗 저장소에서 제공됩니다. 접근 권한을 얻으려면 
[이 안내](guides/installation.md#npmevaluationandproversions)를 참고하세요.

Evaluation(평가판) 버전을 받았다면 아래 명령어로 설치할 수 있습니다:

- npm 사용 시:

~~~
npm install @dhx/trial-gantt
~~~

- yarn 사용 시:

~~~
yarn add @dhx/trial-gantt
~~~

또는, 라이브러리 zip 패키지가 **npm** 모듈 구조이므로,
[로컬 폴더에서 설치](guides/installation.md#installfromlocalfolder)할 수도 있습니다.

## 2단계. 컴포넌트 생성

이제 React 컴포넌트를 만들어 앱에 Gantt를 통합해보겠습니다. ***src/*** 디렉터리에 ***Gantt.jsx*** 파일을 새로 만듭니다.

### 소스 파일 임포트

***Gantt.jsx***를 열고 Gantt 소스 파일을 임포트합니다. 아래를 참고하세요:

- Gantt 패키지를 로컬 폴더에서 설치했다면 임포트는 다음과 같습니다:

**Gantt.jsx**
~~~
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- 평가판(trial) 버전을 설치했다면 아래와 같이 임포트하세요:

**Gantt.jsx**
~~~
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

이 가이드에서는 **trial** 버전을 사용합니다.

### 컨테이너 설정 및 Gantt 추가

Gantt를 페이지에 렌더링하려면 컨테이너 요소가 필요합니다. ***Gantt.jsx*** 파일은 다음과 같이 작성합니다:

**Gantt.jsx**
~~~
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

## 3단계. Gantt를 앱에 추가

이제 앱에 Gantt 컴포넌트를 포함시킵니다. ***src/app.jsx***를 열고 기본 내용을 아래로 교체하세요:

**src/app.jsx**
~~~
import Gantt from "./Gantt";

function App() {
  return <Gantt/>;
}

export default App;
~~~

Gantt 컨테이너가 전체 화면을 채우도록 하려면 ***src/***의 ***index.css***에서 기본 스타일을 제거하고 아래 스타일을 추가하세요:

**src/index.css**
~~~
html,
body,
#root {
  height: 100%;
  padding: 0;
  margin: 0;
}
~~~

앱을 다시 시작하면 빈 Gantt 차트가 표시됩니다:

![Gantt React init](/img/gantt_init.png)

## 4단계. 데이터 제공

Gantt에 작업을 표시하려면 데이터셋을 제공해야 합니다. ***src/***에 ***data.js*** 파일을 만들고 아래 내용을 추가하세요:

**src/data.js**
~~~
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

이 데이터를 ***App.jsx***에서 Gantt 컴포넌트의 props로 전달합니다:

**App.jsx**
~~~
import Gantt from "./Gantt";
import { getData } from "./data.js";

function App() {
  return <Gantt tasks="{getData()}" />;
}

export default App;
~~~

그리고 Gantt 컴포넌트 내에서 **gantt.parse()** 메소드에 props를 전달하세요:

**Gantt.jsx**
~~~
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

앱을 새로고침하면 작업이 표시된 Gantt 차트를 볼 수 있습니다:

![Gantt tasks](/img/gantt_tasks.png)

## 5단계. 데이터 저장

Gantt에서 변경된 내용을 처리하려면 [dataProcessor](api/method/dataprocessor.md)를 사용할 수 있습니다. dataProcessor는 백엔드와의 통신을 가능하게 해줍니다. dataProcessor는 함수 또는 라우터 객체로 정의할 수 있습니다. dhtmlxGantt는 handler에서 Promise 응답을 지원하므로, 작업을 적절히 처리할 수 있습니다.

**createDataProcessor()**로 **DataProcessor**를 생성하고 다음과 같이 변경사항을 감지할 수 있습니다:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

백엔드에서 레코드 생성 후 새로운 id를 할당하는 경우(일반적인 동작), Promise는 반드시 **(id: databaseId)** 또는 **(tid: databaseId)** 형태의 객체를 반환해야 Gantt에서 해당 레코드를 올바르게 업데이트할 수 있습니다. 자세한 내용은 [server side integration](guides/server-side.md)을 참고하세요.

이렇게 하면 React Gantt가 준비됩니다. 전체 데모는 GitHub에서 확인할 수 있습니다: [https://github.com/DHTMLX/react-gantt-demo](https://github.com/DHTMLX/react-gantt-demo).

## XSS, CSRF 및 SQL Injection 공격

Gantt 자체는 SQL injection, XSS, CSRF와 같은 보안 위협에 대한 보호 기능을 제공하지 않습니다. 애플리케이션의 보안은 백엔드를 관리하는 개발자의 책임입니다.

일반적인 취약점과 보안 강화를 위한 권장 사항은 [Application Security](guides/app-security.md) 문서를 참고하세요.
