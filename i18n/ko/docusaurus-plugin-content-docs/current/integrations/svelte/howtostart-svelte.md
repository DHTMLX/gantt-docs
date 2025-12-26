---
title: "dhtmlxGantt와 Svelte 연동"
sidebar_label: "Svelte"
---

# dhtmlxGantt와 Svelte 연동

이 가이드는 Svelte의 기본 개념과 패턴에 대한 이해를 전제로 합니다. 아직 익숙하지 않다면 [Svelte 공식 문서](https://svelte.dev/)에서 시작 가이드를 참고하세요.

DHTMLX Gantt는 Svelte와 잘 호환됩니다. 동작하는 예제는 GitHub에서 확인할 수 있습니다: [DHTMLX Gantt with Svelte Demo](https://github.com/DHTMLX/svelte-gantt-demo).

## 프로젝트 생성

새 프로젝트를 시작하기 전에 [Vite](https://vite.dev/) (선택 사항)와 [Node.js](https://nodejs.org/en/)가 설치되어 있는지 확인하세요.

Svelte 프로젝트를 설정하려면 Vite를 사용합니다. 아래 명령어를 실행하세요:

~~~
npm create vite@latest
~~~

자세한 내용은 [관련 문서](https://svelte.dev/docs/introduction#start-a-new-project-alternatives-to-sveltekit)를 참고하세요.

### 의존성 설치

다음으로, 앱 디렉토리로 이동합니다. 프로젝트 이름을 **gantt-svelte**로 하고, **svelte** 옵션을 선택하세요. 그런 다음 아래 명령어를 실행합니다:

~~~
cd gantt-svelte
~~~

이제 원하는 패키지 매니저를 사용해 의존성을 설치하고 앱을 실행합니다:

- **yarn**을 사용하는 경우:

~~~
yarn install
yarn dev
~~~

- **npm**을 사용하는 경우:

~~~
npm install
npm run dev
~~~

Svelte 프로젝트가 이제 [http://localhost:5173](http://localhost:5173)에서 실행됩니다.

![Gantt Svelte app running](/img/gantt_svelte_app_run.png)

## Gantt 추가하기

DHTMLX Gantt를 추가하려면, 먼저 터미널에서 **Ctrl+C**를 눌러 앱을 중지하세요. 이후 Gantt 패키지를 설치합니다.

## 1단계. 패키지 설치

라이브러리의 PRO 버전은 사설 저장소를 통해 **npm/yarn**으로 제공됩니다. 접근 권한을 얻으려면 
[이 안내](guides/installation.md#npmevaluationandproversions)를 따라주세요.

평가판을 받았다면 다음과 같이 설치합니다:

- npm 사용 시:

~~~
npm install @dhx/trial-gantt
~~~

- yarn 사용 시:

~~~
yarn add @dhx/trial-gantt
~~~

또는, 라이브러리 zip 패키지는 **npm** 모듈 구조이므로 
[로컬 폴더에서 설치](guides/installation.md#installfromlocalfolder)할 수도 있습니다.

## 2단계. 컴포넌트 생성

이제 Svelte 컴포넌트를 만들어 앱에 Gantt를 포함시킵니다. ***src/*** 폴더에 ***Gantt.svelte*** 파일을 새로 만드세요.

### 소스 파일 임포트

***Gantt.svelte*** 파일을 열고 Gantt 소스 파일을 임포트합니다. 참고:

- Gantt 패키지를 로컬 폴더에서 설치했다면, 임포트는 아래와 같습니다:

**Gantt.svelte**
~~~
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- 평가판을 설치했다면, 아래와 같이 임포트하세요:

**Gantt.svelte**
~~~
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

이 가이드에서는 **trial** 버전을 사용합니다.

### 컨테이너 설정 및 Gantt 추가

페이지에 Gantt를 표시하려면, 컴포넌트가 렌더링될 컨테이너를 정의하세요. 예시는 다음과 같습니다:

**Gantt.svelte**
~~~html
<script>
    import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
    import { onMount } from "svelte";
    import { Gantt } from "@dhx/trial-gantt";
      
    let container;
    onMount(() => {
        let gantt = Gantt.getGanttInstance();
        gantt.init(container);

        return () => {
            gantt.destructor();
        };
    });
</script>

<div bind:this="{container}" style="width: 100%; height: 100%;"></div>
~~~

Gantt 컨테이너가 전체 body를 채우도록 하려면, ***src/*** 폴더 내 ***app.css***에서 기본 스타일을 제거하고 아래를 추가하세요:

**src/app.css**
~~~
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## 3단계. 앱에 Gantt 추가

이제 Gantt 컴포넌트를 앱에 포함시킵니다. ***src/App.svelte***를 열고 기본 내용을 아래로 교체하세요:

**src/App.svelte**
~~~
<script>
  import Gantt from "./Gantt.svelte";
</script>

<Gantt/>
~~~

이제 앱을 실행하면 빈 Gantt 차트가 표시됩니다:

![Gantt Svelte init](/img/gantt_init.png)

## 4단계. 데이터 제공

Gantt에 데이터를 표시하려면, 데이터를 전달해야 합니다. ***src/***에 ***data.js*** 파일을 만들고 아래와 같이 작성하세요:

**src/data.js**
~~~js
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

이 데이터를 **App.svelte**에서 Gantt 컴포넌트의 props로 전달하세요:

**App.svelte**
~~~html
<script>
  import Gantt from "./Gantt.svelte";
  import { getData } from "./data.js";
</script>

<Gantt tasks="{getData()}" />
~~~

그리고 Gantt 컴포넌트 내부에서 **gantt.parse()**를 사용해 props를 적용하세요:

**Gantt.svelte**
~~~html
<script>
    import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
    import { onMount } from "svelte";
    import { Gantt } from "@dhx/trial-gantt";
    
    export let tasks;
    
    let container;
    onMount(() => {
        let gantt = Gantt.getGanttInstance();
        gantt.init(container);
        gantt.parse(tasks);

        return () => {
            gantt.destructor();
        };
    });
</script>

<div bind:this="{container}" style="width: 100%; height: 100%;"></div>
~~~

앱을 새로고침하면 작업이 채워진 Gantt 차트를 볼 수 있습니다:

![Gantt tasks](/img/gantt_tasks.png)

## 5단계. 데이터 저장

Gantt에서 변경 사항을 추적하려면 [dataProcessor](api/method/dataprocessor.md) 핸들러를 사용할 수 있습니다. 이 핸들러는 백엔드와의 통신을 돕고, 함수 또는 라우터 객체로 정의할 수 있습니다. dhtmlxGantt는 Promise 응답을 지원하여 작업이 올바르게 처리됩니다.

**createDataProcessor()**를 사용해 **DataProcessor**를 생성하여 변경 사항을 감지할 수 있습니다:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

백엔드에서 새 레코드 생성 후 task ID를 변경하는 경우, Promise가 **(id: databaseId)** 또는 **(tid: databaseId)** 객체를 반환해야 Gantt가 해당 레코드를 올바르게 갱신할 수 있습니다. 서버 사이드 연동에 대한 자세한 내용은 [여기](guides/server-side.md)에서 확인하세요.

이제 Svelte Gantt 설정이 완료되었습니다. 전체 데모는 GitHub에서 확인할 수 있습니다: [https://github.com/DHTMLX/svelte-gantt-demo](https://github.com/DHTMLX/svelte-gantt-demo).

## XSS, CSRF, SQL Injection 공격

Gantt는 SQL 인젝션, XSS, CSRF 공격과 같은 위협에 대한 내장 보호 기능을 제공하지 않습니다. 이러한 위험으로부터 애플리케이션을 보호하는 것은 백엔드 개발자의 책임입니다.

잠재적 취약점과 권장 보안 관행에 대한 자세한 내용은 [Application Security](guides/app-security.md) 문서를 참고하세요.
