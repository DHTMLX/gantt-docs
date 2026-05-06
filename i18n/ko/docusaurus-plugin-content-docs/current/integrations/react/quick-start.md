--- 
title: React Gantt 빠른 시작
sidebar_label: 빠른 시작
description: "React Gantt 컴포넌트 사용 방법에 대한 단계별 가이드"
---

# React Gantt 빠른 시작

:::note
이 튜토리얼은 DHTMLX Gantt의 **Commercial, Enterprise, 및 Ultimate** 에디션에 포함된 React 래퍼를 다룹니다. 
만약 **Individual** 또는 **GPL** 에디션을 사용 중이라면 대체 가이드를 따르세요: 
[리액트 시작하기](integrations/react/js-gantt-react.md).
:::

**React Gantt** 컴포넌트는 **DHTMLX Gantt**의 공식 래퍼입니다. 이 가이드는 평가 패키지를 사용해 작은 React 애플리케이션을 만들고 기본 Gantt 차트를 렌더링하는 과정을 안내합니다.

React가 처음이라면 공식 [React 문서](https://react.dev/learn)부터 시작하세요. 이 튜토리얼을 따라가며 작동하는 전체 프로젝트를 [GitHub에서 확인해 보세요](https://github.com/dhtmlx/react-gantt-quick-start).

## 버전 요구사항

- React **18 이상**

## 새 React 프로젝트 만들기

React 프로젝트를 만들고 프로젝트 디렉터리로 이동하려면 아래 명령을 실행하세요:

~~~bash
npm create vite@latest react-gantt-quick-start -- --template react-ts
cd react-gantt-quick-start
~~~

### React Gantt 설치

React Gantt를 설치하려면 [React Gantt 설치 가이드](integrations/react/installation.md)에 따라 설치합니다.

이 튜토리얼에서는 평가 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

또는

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

이미 Professional 패키지를 사용 중이라면 명령과 import에서 `@dhtmlx/trial-react-gantt`를 `@dhx/react-gantt`로 교체하십시오.

## 데모 데이터 추가

이 예제에서는 정적 데이터를 사용할 것입니다. `src/demoData.ts` 파일을 만드세요:

~~~ts
import type { Task, Link } from '@dhtmlx/trial-react-gantt';

export const tasks: Task[] = [
  { id: 1, text: "Office itinerancy", type: "project", start_date: new Date(2025, 3, 2), duration: 17, progress: 0.4, parent: 0, open: true },
  ...
];

export const links: Link[] = [
  { id: 2, source: 2, target: 3, type: "0" },
  ...
];
~~~


## Gantt 컴포넌트 생성하기

Gantt 컴포넌트를 추가하려면 아래 내용을 가진 `src/components/Gantt/Gantt.tsx` 파일을 만드세요:

~~~tsx
import Gantt, {
  ReactGanttRef,
  Task,
  Link,
  GanttConfig
} from '@dhtmlx/trial-react-gantt';

import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
import { useRef } from 'react';

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


## 앱에서 Gantt 렌더링하기

Gantt를 표시하려면 `src/App.tsx`의 코드를 아래와 같이 교체합니다:

~~~tsx
import GanttChart from './components/Gantt/Gantt';
import { tasks, links } from './demoData';

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <GanttChart tasks={tasks} links={links} />
    </div>
  );
}
~~~

그 후 아래 명령으로 앱을 실행합니다:

~~~bash
npm run dev
~~~

이 시점에 **완전히 작동하는 React + DHTMLX Gantt 애플리케이션**이 준비됩니다.

이 설정은 Gantt 차트를 렌더링하고, 작업과 링크를 표시하며, 기본 스케일 구성을 적용하고, React 형식의 ref를 통해 Gantt 인스턴스를 연결하고, `data.save` 콜백을 통해 이벤트를 수신하기 위한 **최소 구성**을 나타냅니다.

또한 이는 [GitHub 데모 프로젝트](https://github.com/dhtmlx/react-gantt-quick-start)에서 사용된 동일한 최소 예제입니다.

여기서부터는 더 고급 기능을 추가하며 продолж할 수 있습니다:

- React 상태와 데이터 동기화
- 백엔드에서 데이터 로드/저장
- 템플릿 및 사용자 정의 렌더러 추가
- 플러그인 활성화(자동 일정화, 중요 경로)
- 자원, 캘린더, 또는 그룹화 추가

다음 섹션에서는 이러한 기능들을 하나씩 차례대로 소개합니다.


## React 상태를 진실의 원천으로 사용하기
_(대부분의 React 앱에 권장됨)_

실제 애플리케이션에서 작업과 링크는 보통 React 상태에서 가져옵니다. 아래는 Gantt이 `data.save` 콜백을 통해 변경 내용을 React로 다시 보내는 완전한 예시입니다.

~~~tsx
import { useState } from "react";
import Gantt from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";
import { tasks as initialTasks, links as initialLinks } from "./demoData";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [links, setLinks] = useState(initialLinks);

  return (
    <div style={{ height: "100vh" }}>
      <Gantt
        tasks={tasks}
        links={links}
        data={{
          save: (entity, action, item, id) => {
            if (entity === "task") {
              if (action === "create") setTasks(tasks => [...tasks, item]);
              if (action === "update") setTasks(tasks => tasks.map(x => x.id === id ? item : x));
              if (action === "delete") setTasks(tasks => tasks.filter(x => x.id !== id));
            }
            if (entity === "link") {
              if (action === "create") setLinks(links => [...links, item]);
              if (action === "update") setLinks(links => links.map(x => x.id === id ? item : x));
              if (action === "delete") setLinks(links => links.filter(x => x.id !== id));
            }
          }
        }}
      />
    </div>
  );
}
~~~


### 이 모드를 선택하는 이유

- React는 항상 Gantt UI와 동일한 데이터를 봅니다  
- Redux / Zustand / Jotai / MobX와 함께 완벽하게 작동  
- 백엔드 API와의 동기화가 쉽습니다


## 대체 모드: Gantt를 진실의 원천으로 사용하기
_(매우 큰 데이터 세트나 강한 자동 일정화에 유용합니다)_

이 모드에서는 React가 tasks/links를 소유하지 않습니다.

~~~tsx
<Gantt
  data={{
    load: "/api/gantt-data",
    save: "/api/gantt-data"
  }}
/>
~~~

### 이 모드를 선호하는 경우

- 수만 개의 작업  
- 다수의 자동 일정 업데이트  
- React 렌더링 오버헤드를 최소화하려는 경우  


## Using Templates 
_(템플릿 함수에서 React 요소를 반환)_

템플릿은 차트의 거의 모든 부분을 사용자 정의할 수 있게 해줍니다.

~~~tsx
const templates = {
  task_text: (start, end, task) => (
    <span style={{ color: "red" }}>#{task.id}: {task.text}</span>
  )
};

<Gantt templates={templates} />
~~~

### 자세한 내용

전체 섹션은 여기에서 확인할 수 있습니다: [React Gantt Templates Documentation](integrations/react/configuration-props.md).


## GitHub 데모 저장소

이 튜토리얼을 따라가는 완전한 작동 프로젝트는 [GitHub에서 제공됩니다](https://github.com/dhtmlx/react-gantt-quick-start).

## 다음 단계

- 사용 가능한 [React Gantt 속성](integrations/react/configuration-props.md) 모두 изуч하기
- [가이드](guides.md)에서 고급 Gantt 기능 탐색하기