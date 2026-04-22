--- 
title: "Svelte와 함께하는 dhtmlxGantt" 
sidebar_label: "Svelte" 
---

# Svelte와 함께하는 dhtmlxGantt

이 문서를 사용하려면 Svelte의 기본 개념과 패턴에 익숙해야 합니다. 익숙하지 않다면 시작하기 튜토리얼을 위해 [Svelte 문서](https://svelte.dev/)를 참조해 주세요.

DHTMLX Gantt는 Svelte와 호환됩니다. GitHub의 해당 예제를 확인할 수 있습니다: [Svelte와 함께하는 DHTMLX Gantt Demo](https://github.com/DHTMLX/svelte-gantt-demo).

## 프로젝트 생성

새 프로젝트를 생성하기 전에 [Vite](https://vite.dev/)를 설치하고(선택 사항) [Node.js](https://nodejs.org/en/)를 설치하십시오.

Svelte 프로젝트를 만들려면 Vite와 함께 Svelte를 사용하고 아래 명령을 실행합니다:

~~~
npm create vite@latest
~~~

자세한 내용은 [관련 아티클](https://svelte.dev/docs/svelte/overview)을 확인하십시오.

### 의존성 설치

다음으로 앱 디렉토리로 이동해야 합니다. 프로젝트 이름을 **gantt-svelte**로 하고 옵션에 **svelte**를 선택한 뒤 아래 명령을 실행합니다:

~~~
cd gantt-svelte
~~~

그 후 의존성을 설치하고 앱을 실행해야 합니다. 이를 위해 패키지 관리자를 사용해야 합니다:

- 만약 **yarn**을 사용한다면, 아래 명령을 실행합니다:

~~~
yarn install
yarn dev
~~~

- 만약 **npm**을 사용한다면, 아래 명령을 실행합니다:

~~~
npm install
npm run dev
~~~

이제 (http://localhost:5173) 에서 Svelte 프로젝트가 실행 중이어야 합니다.

![Gantt Svelte app running](/img/gantt_svelte_app_run.png)

## Gantt 생성

이제 DHTMLX Gantt 코드를 가져와야 합니다. 먼저 명령줄에서 **Ctrl+C**를 눌러 앱을 중지합니다. 그런 다음 Gantt 패키지를 설치할 수 있습니다.

## 1단계. 패키지 설치

라이브러리의 PRO 버전은 우리의 프라이빗 저장소에서 **npm/yarn** 설치를 통해 이용 가능하므로, 접근 권한을 얻으려면  
[this instruction](guides/installation.md#npmevaluationandproversions) 를 따라주십시오.

Gantt의 Evaluation 버전을 얻은 후 아래 명령으로 설치할 수 있습니다:

- npm의 경우:

~~~
npm install @dhx/trial-gantt
~~~

- yarn의 경우:

~~~
yarn add @dhx/trial-gantt
~~~

또는 라이브러리의 zip 패키지가 **npm** 모듈로 구성되어 있기 때문에 로컬 폴더에서 설치할 수도 있습니다.  
[로컬 폴더에서 설치하기](guides/installation.md#installfromlocalfolder) 를 참조하십시오.

## 2단계. 컴포넌트 생성

이제 애플리케이션에 Gantt를 추가하기 위해 Svelte 컴포넌트를 생성해야 합니다. ***src/*** 디렉터리에 새 파일을 만들고 이름을 ***Gantt.svelte***로 지어 봅시다.

### 소스 파일 가져오기

새로 생성한 ***Gantt.svelte*** 파일을 열고 Gantt 소스 파일을 가져옵니다. 주의할 점은:

- 로컬 폴더에서 Gantt 패키지를 설치한 경우 가져오기 경로가 이와 같게 됩니다:

~~~js title="Gantt.svelte"
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- Trial 버전을 설치했다면 가져오기 경로는 아래와 같이 됩니다:

~~~js title="Gantt.svelte"
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

이 튜토리얼에서는 **trial** 버전의 Gantt를 사용합니다.

### 컨테이너 설정 및 Gantt 추가

페이지에 Gantt를 표시하려면 컴포넌트를 렌더링할 컨테이너를 설정해야 합니다. 아래 코드를 확인하십시오:

~~~html title="Gantt.svelte"
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

Gantt 컨테이너가 본문 전체 공간을 차지하도록 만들려면, ***src/*** 폴더에 위치한 ***app.css*** 파일의 기본 스타일을 제거하고 아래 스타일을 추가해야 합니다:

~~~css title="src/app.css"
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## 3단계. 앱에 Gantt 추가

이제 컴포넌트를 앱에 추가할 시간입니다. ***src/App.svelte***를 열고 기본 콘텐츠 대신 Gantt 컴포넌트를 사용하여 아래 코드를 삽입합니다:

~~~js title="src/App.svelte"
<script>
  import Gantt from "./Gantt.svelte";
</script>

<Gantt/>
~~~

그 후 앱을 시작하면 페이지에 비어 있는 Gantt가 보일 것입니다:

![Gantt Svelte init](/img/gantt_init.png)

## 4단계. 데이터 제공

Gantt에 데이터를 추가하려면 데이터 세트를 제공해야 합니다. ***src/*** 디렉터리에 ***data.js*** 파일을 만들고 데이터를 추가해 봅시다:

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

데이터를 Gantt 컴포넌트에 전달하기 위해 **App.svelte** 파일에서 props(데이터)를 전달해야 합니다:

~~~html title="App.svelte"
<script>
  import Gantt from "./Gantt.svelte";
  import { getData } from "./data.js";
</script>

<Gantt tasks="{getData()}" />
~~~

그리고 Gantt 컴포넌트에서 **gantt.parse()** 메서드에 props를 사용합니다:

~~~html title="Gantt.svelte"
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

이제 앱 페이지를 다시 열면 작업이 있는 Gantt가 보일 것입니다:

![Gantt tasks](/img/gantt_tasks.png)

## 5단계. 데이터 저장

Gantt에서 변경 사항을 포착하려면 서버 측 백엔드와의 통신을 가능하게 하는 [dataProcessor](api/method/dataprocessor.md) 핸들러를 사용할 수 있습니다. 핸들은 함수로 선언되거나 라우터 객체로 선언될 수 있습니다. dhtmlxGantt는 핸들러의 Promise 응답을 허용하므로 작업의 완료를 올바르게 처리합니다.

다음은 API 메서드인 **createDataProcessor()**를 통해 DataProcessor를 생성하고 변경 내용을 캡처하는 예시입니다:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

새 레코드를 만든 후 서비스가 작업 id를 변경하는 경우(대개 그렇습니다), Promise가 데이터베이스 아이디를 포함한 객체를 반환하도록 하여 새 데이터베이스 id를 레코드에 적용할 수 있도록 하십시오. 서버 측에 대한 자세한 내용은 [서버 측 정보](guides/server-side.md)를 확인하십시오.

글쎄요, 이제 Svelte Gantt가 준비되었습니다. GitHub의 전체 데모를 확인해 보려면 [여기를 클릭](https://github.com/DHTMLX/svelte-gantt-demo) 하세요.

## XSS, CSRF 및 SQL 주입 공격

Gantt는 SQL 주입이나 XSS, CSRF 공격과 같은 다양한 위협으로부터 애플리케이션을 방지하는 수단을 제공하지 않는다는 점에 유의하십시오. 애플리케이션의 안전을 유지하는 책임은 백엔드 구현자가 지고 있어야 합니다.

컴포넌트의 취약할 수 있는 지점과 애플리케이션의 안전성을 향상시키기 위해 취할 수 있는 조치를 알아보려면 [Application Security](guides/app-security.md) 기사를 확인하십시오.