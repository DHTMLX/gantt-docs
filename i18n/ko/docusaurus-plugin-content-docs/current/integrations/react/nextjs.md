--- 
title: Next.js와 함께하는 React Gantt
sidebar_label: Next.js

---

# Next.js와 함께하는 React Gantt

**Next.js 빠른 시작**

다음의 기본 개념에 대해 익숙해야 합니다. [React](https://react.dev/)와 [Next.js](https://nextjs.org/docs). 그렇지 않다면 이 가이드를 시작하기 전에 공식 문서를 참고하십시오.

DHTMLX React Gantt는 Next.js와 완전히 호환됩니다. 이 튜토리얼에서는 간단한 Next.js 애플리케이션을 만들고 페이지에 Gantt 차트를 렌더링합니다.

## 프로젝트 만들기

새 프로젝트를 만들기 전에 [Node.js](https://nodejs.org/)를 설치하십시오.

Next.js 애플리케이션을 스캐폴딩하려면 다음을 실행하십시오:

~~~bash
npx create-next-app@latest
~~~

프롬프트가 표시되면 다음을 선택합니다:
- Project name: **react-gantt-nextjs-quick-start**
- Use the default template (TypeScript, ESLint, Tailwind CSS, App Router, Turbopack)

Next.js가 프로젝트 구조를 생성하고 기본 의존성을 설치합니다.

설치가 끝나면 프로젝트 디렉터리로 이동합니다:

~~~bash
cd react-gantt-nextjs-quick-start
~~~

## Step 1. Installing the React Gantt package

React Gantt를 [React Gantt 설치 가이드](integrations/react/installation.md)에 설명된 대로 설치합니다.

이번 튜토리얼에서는 평가 패키지(trial)를 사용합니다:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

또는

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

이미 Professional 패키지를 사용하는 경우 명령과 import에서 `@dhtmlx/trial-react-gantt`를 `@dhx/react-gantt`로 바꾸십시오. (코드 블록 내의 토큰은 변경하지 마십시오.)

설치가 끝나면 데이터 설정과 Gantt 컴포넌트 생성을 진행할 수 있습니다.

## Step 2. Preparing demo data

프로젝트 루트에 `data/` 폴더를 만들고 그 안에 초기 작업(Task)과 연결(Link)을 포함하는 `demoData.ts` 파일을 추가합니다:

~~~ts title="data/demoData.ts"
import type { Task, Link } from '@dhtmlx/trial-react-gantt';

export const tasks: Task[] = [
  { id: 1, text: "Office itinerancy", type: "project", start_date: new Date(2025, 3, 2), duration: 17, progress: 0.4, parent: 0, open: true },
  { id: 2, text: "Office facing", type: "project", start_date: new Date(2025, 3, 2), duration: 8, progress: 0.6, parent: 1, open: true },
  { id: 3, text: "Furniture installation", type: "project", start_date: new Date(2025, 3, 11), duration: 8, progress: 0.6, parent: 1, open: true },
  // ...
];

export const links: Link[] = [
  { id: 2, source: 2, target: 3, type: "0" },
  { id: 3, source: 3, target: 4, type: "0" },
  // ...
];
~~~

### Step 3. Creating the Gantt component

Next.js는 기본적으로 서버 컴포넌트를 사용하지만, React Gantt는 대부분의 실제 사용 사례에서 Client Component 안에서 렌더링되어야 합니다.

다음과 같은 경우에 필요합니다:

- `ref`를 사용하여 Gantt 인스턴스에 접근할 때
- 콜백(이벤트, 템플릿, 데이터 핸들러)을 전달할 때
- ReactGantt `hooks`를 사용할 때
- 동적 구성 또는 React 요소를 제공할 때

따라서 우리의 Gantt 컴포넌트는 "use client"로 시작합니다.

새 파일을 `components/Gantt/Gantt.tsx`에 생성합니다

~~~tsx title="components/Gantt/Gantt.tsx"
"use client";

import { useRef } from "react";
import Gantt, { ReactGanttRef, Task, Link, GanttConfig } from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

export interface GanttProps {
  tasks: Task[];
  links: Link[];
}

export default function GanttChart({ tasks, links }: GanttProps) {
  const ganttRef = useRef<ReactGanttRef>(null);

  const config: GanttConfig = {
    grid_width: 500,
    scale_height: 90,
    scales: [
      { unit: "year", step: 1, date: "%Y" },
      { unit: "month", step: 1, date: "%M" },
      { unit: "day", step: 1, date: "%d %M" }
    ]
  };

  return (
    <Gantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
      config={config}
      data={{
        save: (entity, action, data, id) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        }
      }}
    />
  );
}
~~~

이 컴포넌트는 Gantt 차트를 초기화하고 구성(config), 초기 데이터, 향후 API 호출을 위한 `ref`를 제공합니다. `config` 객체는 레이아웃과 눈금을 정의하고, `tasks`와 `links` 프롭은 차트에 데이터 셋을 제공합니다.

`data` 프로퍼티 내의 `save` 함수는 Gantt 내부에서 작업 및 연결에 대한 업데이트를 추적하는 데 사용됩니다. 이 튜토리얼에서는 변경 사항을 추적하기 위한 간단한 플레이스홀더 핸들러를 추가합니다. 백엔드로 업데이트를 전송하거나 React 상태에 바인딩하려면 공식 데이터 바인딩 [가이드](integrations/react/overview.md#bindingdata)를 따르면 됩니다.

## Step 4. Adding Gantt to the page

`app/page.tsx`를 열고 메인 페이지에 Gantt 차트를 렌더링합니다:

~~~tsx title="app/page.tsx"
import Gantt from "../components/Gantt/Gantt";
import { tasks, links } from "../data/demoData";

export default function HomePage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Gantt tasks={tasks} links={links} />
    </div>
  );
}
~~~

이제 페이지에 전체 화면 Gantt 차트가 표시됩니다.

## Step 5. Starting the application

개발 서버를 실행합니다:

~~~bash
npm run dev
~~~

그런 다음 브라우저에서 `http://localhost:3000`를 열면 Next.js 애플리케이션 안에서 React Gantt를 사용해 렌더링된 작동하는 Gantt 차트를 볼 수 있습니다.

## 요약

DHTMLX React Gantt를 포함한 최소한의 Next.js 프로젝트를 만들고, 데모 데이터를 추가하고, 완전히 대화형인 Gantt 차트를 렌더링했습니다. 이는 시작하는 데 필요한 최소한의 설정이며, 운영 환경에서 사용할 구성과 일치합니다.

## GitHub 데모 저장소

이 튜토리얼을 따른 완전한 작동 프로젝트는 [GitHub에서 제공됩니다](https://github.com/dhtmlx/react-gantt-nextjs-starter).

다음 단계로 살펴볼 수 있습니다:

- [리액트 기반 데이터 흐름](integrations/react/overview.md#bindingdata).
- [React Gantt 템플릿 문서](integrations/react/configuration-props.md).