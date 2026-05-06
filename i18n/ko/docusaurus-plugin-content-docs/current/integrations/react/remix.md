---
title: Remix와 함께하는 React Gantt
sidebar_label: Remix

---

# Remix와 함께하는 React Gantt

**Remix 빠른 시작**

다음 기본 개념에 익숙해야 합니다. [React](https://react.dev/)와 [Remix](https://remix.run/)를 이미 알고 있다면 좋습니다. 그렇지 않다면 이 가이드를 시작하기 전에 공식 문서를 참조하세요.

이 튜토리얼에서는 간단한 Remix 애플리케이션을 만들고 페이지에 Gantt 차트를 렌더링합니다.

## 프로젝트 생성하기

새 프로젝트를 만들기 전에 [Node.js](https://nodejs.org/)가 설치되어 있는지 확인하세요.

Remix가 이제 **React Router v7의 일부**로 제공되므로, 프로젝트를 구성하는 권장 방법은 다음과 같습니다:

~~~bash
npx create-react-router@latest
~~~

프롬프트가 나타나면 다음을 선택합니다:
- 프로젝트 이름: **react-gantt-remix-quick-start**
- 기본 템플릿 사용 (React, TypeScript, TailwindCSS, SSR)
- **Install dependencies**: 예

그런 다음 프로젝트 폴더로 이동합니다:

~~~bash
cd react-gantt-remix-quick-start
~~~

그리고 개발 서버를 시작합니다:

~~~bash
npm run dev
~~~

당신의 애플리케이션은 `http://localhost:5173`에서 열립니다.

## 1단계. React Gantt 패키지 설치하기

React Gantt 설치 가이드에 따라 React Gantt를 설치합니다: [React Gantt 설치 가이드](integrations/react/installation.md).

이번 튜토리얼에서는 평가 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

또는

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Professional 패키지를 이미 사용 중이라면 명령어와 import에서 `@dhtmlx/trial-react-gantt`를 `@dhx/react-gantt`로 바꿔서 사용하면 됩니다.

설치가 끝나면 데이터와 컴포넌트를 준비할 수 있습니다.

## 2단계. 데모 데이터 준비하기

`app/` 폴더 내부에 새로운 `data/` 디렉토리를 만들고 초기 데이터 세트를 담은 `demoData.ts` 파일을 추가합니다:

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

이 데이터가 Gantt 컴포넌트에 전달됩니다.

### 3단계. Gantt 컴포넌트 만들기

Remix는 표준 React 아키텍처를 통해 클라이언트 사이드 컴포넌트를 사용할 수 있게 해줍니다. 우리는 Gantt 차트를 렌더링하기 위한 전용 컴포넌트를 만들 것입니다.

`app/components/Gantt/` 폴더를 만들고 그 안에 `Gantt.tsx` 파일을 생성합니다. 새로 생성한 파일을 열고 아래 코드를 삽입합니다:

~~~tsx title="app/components/Gantt/Gantt.tsx"
import { useMemo, useRef } from 'react';
import Gantt, { type ReactGanttRef, type Task, type Link, type GanttConfig } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';


export interface GanttProps {
  tasks: Task[];
  links: Link[];
}


export default function GanttChart({ tasks, links }: GanttProps) {
  const ganttRef = useRef<ReactGanttRef>(null);


  const config: GanttConfig = useMemo(
    () => ({
      grid_width: 500,
      scale_height: 90,
      scales: [
        { unit: 'year', step: 1, date: '%Y' },
        { unit: 'month', step: 1, date: '%M' },
        { unit: 'day', step: 1, date: '%d %M' },
      ],
    }),
    []
  );


  return (
    <Gantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
      config={config}
      data={{
        save: (entity: string, action: string, data: Task | Link, id: string | number) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        },
      }}
    />
  );
}
~~~


이 컴포넌트는 Gantt 차트를 초기화하고 구성, 초기 데이터 및 향후 API 호출을 위한 `ref`를 제공합니다. `config` 객체는 레이아웃과 스케일을 정의하고, `tasks`와 `links` props는 차트에 데이터 세트를 공급합니다.

`data` 속성 안의 `save` 함수는 Gantt 내부에서 작업과 링크에 대한 업데이트를 추적하는 데 사용됩니다. 이번 튜토리얼에서는 변경 추적용으로 간단한 플레이스홀더 핸들러를 추가했습니다. 백엔드로 업데이트를 보내거나 React 상태와 바인딩하려면 공식 데이터 바인딩 가이드([integrations/react/overview.md#bindingdata](integrations/react/overview.md#bindingdata))를 따라 할 수 있습니다.



## 4단계. Remix 경로에서 Gantt 렌더링

메인 페이지 경로인 `app/routes/home.tsx`를 엽니다.
다음 내용으로 바꿉니다:

~~~tsx title="app/routes/home.tsx"
import GanttChart from '~/components/Gantt/Gantt';
import type { Route } from './+types/home';
import { tasks, links } from '~/data/demoData';


export function meta({}: Route.MetaArgs) {
  return [
    { title: 'DHTMLX React Gantt | Remix (React Router) Quick Start' },
    { name: 'description', content: 'DHTMLX React Gantt | Remix (React Router) Quick Start' },
  ];
}


export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GanttChart tasks={tasks} links={links} />
    </div>
  );
}
~~~


이제 Gantt 차트가 `/` 경로에 표시됩니다.

## 5단계. 애플리케이션 시작하기

개발 서버를 실행합니다:

~~~bash
npm run dev
~~~

그런 다음 브라우저에서 `http://localhost:5173`를 열어보세요. 샘플 데이터로 작동하는 Gantt 차트를 이제 볼 수 있습니다.

## 요약

DHTMLX React Gantt를 사용한 최소한의 Remix 애플리케이션을 만들고, 데모 데이터를 추가하며, 완전한 상호 작용이 가능한 Gantt 차트를 렌더링했습니다. 이는 시작에 필요한 최소 구성이며, 실제 운영 환경에서 사용하는 구성을 반영합니다.

## GitHub 데모 저장소

이 튜토리얼을 따라 구성된 완전한 작동 예제 프로젝트는 [GitHub에서 제공됩니다](https://github.com/dhtmlx/react-gantt-remix-starter).

여기서부터 더 살펴볼 수 있습니다:

- [리액트 기반 데이터 흐름](integrations/react/overview.md#bindingdata).
- [리액트 Gantt 템플릿 문서](integrations/react/configuration-props.md).