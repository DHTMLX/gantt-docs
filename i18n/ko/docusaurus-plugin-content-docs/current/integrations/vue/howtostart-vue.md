---
title: "Vue.js와 함께하는 dhtmlxGantt"
sidebar_label: "Vue.js"
---

# Vue.js와 함께하는 dhtmlxGantt

이 문서를 사용하려면 [Vue](https://vuejs.org/)의 기본 개념과 패턴에 익숙해야 합니다. 익숙하지 않은 경우 시작 가이드가 포함된 [Vue 3 문서](https://vuejs.org/guide/introduction.html) 를 참고하세요.

DHTMLX Gantt는 Vue와 호환됩니다. GitHub에서 해당 예제를 확인할 수 있습니다: [DHTMLX Gantt with Vue Demo](https://github.com/DHTMLX/vue-gantt-demo).

## 프로젝트 생성

새로운 프로젝트를 시작하기 전에 먼저 [Node.js](https://nodejs.org/en/)를 설치하세요.

Vue 프로젝트를 만들려면 아래 명령을 실행합니다:

~~~
npm create vue@latest
~~~

이 명령은 공식 Vue 프로젝트 스캐폴딩 도구인 **create-vue**를 설치하고 실행합니다. 자세한 내용은 [Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)을 확인하세요.

### 의존성 설치

다음으로 앱 디렉터리로 이동합니다. 우리의 프로젝트 이름을 **gantt-vue**로 정하고 실행해 봅시다:

~~~
cd gantt-vue
~~~

그 후 의존성을 설치하고 개발 서버를 시작해야 합니다. 이를 위해 패키지 관리자를 사용해야 합니다:

- 만약 **yarn**을 사용한다면 아래 명령을 실행합니다:

~~~
yarn install
yarn dev
~~~

- 만약 **npm**을 사용한다면 아래 명령을 실행합니다:

~~~
npm install
npm run dev
~~~

이제 Vue 프로젝트가 (http://localhost:5173) 에서 실행 중이어야 합니다.

![Gantt Vue app running](/img/gantt_vue_app_run.png)

## Gantt 생성

이제 DHTMLX Gantt 코드를 가져와야 합니다. 우선 명령줄에서 Ctrl+C를 눌러 앱을 중지한 다음 Gantt 패키지 설치를 진행할 수 있습니다.

## 1단계. 패키지 설치

라이브러리의 PRO 버전은 개인 저장소에서 npm/yarn 설치로 이용 가능하며, 이를 얻으려면 [이 지침](guides/installation.md#npmevaluationandproversions)을 따라 접근 권한을 얻으십시오.  

Gantt의 Evaluation 버전을 얻은 후, 아래 명령으로 설치할 수 있습니다:

- npm의 경우:

~~~
npm install @dhx/trial-gantt
~~~

- yarn의 경우:

~~~
yarn add @dhx/trial-gantt
~~~

또는 ZIP 패키지가 **npm** 모듈로 구성되어 있으므로 로컬 폴더에서 설치할 수 있습니다. [로컬 폴더에서 설치하기](guides/installation.md#installfromlocalfolder) 참조.

## 2단계. 컴포넌트 생성

이제 애플리케이션에 Gantt를 추가하기 위한 Vue 컴포넌트를 생성해야 합니다. ***src/components/*** 디렉터리에 새 파일을 만들고 이름을 ***Gantt.vue***로 합시다.

### 소스 파일 가져오기

새로 생성한 ***Gantt.vue*** 파일을 열고 Gantt 소스 파일을 가져옵니다. 주의 사항은 다음과 같습니다:

- 로컬 폴더에서 Gantt 패키지를 설치한 경우 import 경로는 다음과 같습니다:

~~~js title="Gantt.vue"
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- 트라이얼(trial) 버전을 설치했다면 import 경로는 아래와 같습니다:

~~~js title="Gantt.vue"
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

이 튜토리얼에서는 **trial** 버전의 Gantt를 사용합니다.

### 컨테이너 설정 및 Gantt 추가

페이지에 Gantt를 표시하려면 컴포넌트를 렌더링할 컨테이너를 설정해야 합니다. 아래 코드를 확인하세요:

~~~js title="Gantt.vue"
<script>
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default {
  mounted() {
    let gantt = Gantt.getGanttInstance();
    gantt.init(this.$refs.cont);

    this.gantt = gantt;
  },
  unmounted() {
    this.gantt.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont" style="width: 100%; height: 100%"></div>
</template>
~~~

Gantt 컨테이너가 본문(body)의 전체 공간을 차지하도록 만들려면, ***src/assets*** 폴더에 있는 main.css의 기본 스타일을 제거하고 아래 스타일을 추가해야 합니다:

~~~js title="src/assets/main.css"
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## 3단계. 앱에 Gantt 추가

이제 컴포넌트를 앱에 추가할 시간입니다. ***src/App.vue***를 열고 기본 콘텐츠 대신 아래 코드를 삽입하여 Gantt 컴포넌트를 사용하세요:

~~~js title="Gantt.vue"
<script>
import Gantt from "./components/Gantt.vue";

export default {
  components: { Gantt }
};
</script>

<template>
  <Gantt/>
</template>
~~~

그 후 앱을 시작하면 페이지에 빈 Gantt가 표시되어야 합니다:

![Gantt Vue init](/img/gantt_init.png)

## 4단계. 데이터 제공

Gantt에 데이터를 추가하려면 데이터 세트를 제공해야 합니다. ***src/*** 디렉터리에 data.js 파일을 생성하고 여기에 데이터를 추가합시다:

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

App.vue 파일에서 Gantt 컴포넌트에 props(데이터)를 전달해야 합니다:

~~~html title="Gantt.vue"
<script>
import Gantt from "./components/Gantt.vue";
import { getData } from "./data";

export default {
  components: { Gantt },
  data() {
    return {
      tasks: getData(),
    };
  },
};
</script>

<template>
  <Gantt :tasks="tasks" />
</template>
~~~

그리고 Gantt 컴포넌트의 **gantt.parse()** 메서드에서 props를 사용합니다:

~~~html title="Gantt.vue"
<script>
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default {
  props: ["tasks"],

  mounted() {
    let gantt = Gantt.getGanttInstance();
    gantt.init(this.$refs.cont);
    gantt.parse(this.tasks);

    this.gantt = gantt;
  },
  unmounted() {
    this.gantt.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont" style="width: 100%; height: 100%"></div>
</template>
~~~

이제 애플리케이션 페이지를 다시 열면 작업이 있는 Gantt가 표시됩니다:

![Gantt tasks](/img/gantt_tasks.png)

## 5단계. 데이터 저장

Gantt에서 변경 사항을 반영하려면 서버 측 백엔드와의 "통신"을 가능하게 하는 [dataProcessor](api/method/dataprocessor.md) 핸들러를 사용할 수 있습니다. 핸들러는 함수나 라우터 객체로 선언할 수 있습니다. dhtmlxGantt는 핸들러의 Promise 응답을 받으므로 작업의 완료를 올바르게 처리합니다.

다음과 같은 API 메서드인 createDataProcessor()를 통해 DataProcessor를 생성하고 변경 사항을 캡처할 수 있습니다:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

새 레코드를 만든 후 서비스가 작업 id를 변경한다면(대개 그렇듯이), Promise가 (id: databaseId) 또는 (tid: databaseId) 형식의 객체를 반환하도록 하여 Gantt가 새 데이터베이스 id를 레코드에 적용하도록 하세요. 서버 측에 대한 자세한 정보는 [서버 측](guides/server-side.md)을 참조하세요.

음, 이제 Vue Gantt가 준비되었습니다. GitHub의 전체 데모를 확인해 보시려면 [여기를 확인하세요](https://github.com/DHTMLX/vue-gantt-demo).

## XSS, CSRF 및 SQL Injection 공격

Gantt는 SQL 주입, XSS 및 CSRF 공격과 같은 다양한 위협으로부터 애플리케이션을 보호하는 수단을 제공하지 않는다는 점에 주의하십시오. 안전한 애플리케이션을 유지하는 책임은 백엔드를 구현하는 개발자에게 있습니다.

가장 취약한 지점과 애플리케이션 안전성을 향상시키기 위한 조치를 알아보려면 [Application Security](guides/app-security.md) 문서를 확인하세요.