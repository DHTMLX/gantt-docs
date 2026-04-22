---
title: React Gantt에서의 데이터 바인딩 및 관리 기본
sidebar_label: 기본
description: "Redux, Zustand, MobX, Jotai, XState, 또는 Valtio를 통합하기 전에 소스의 진실로 사용할 React 상태의 기본 패턴과 React Gantt의 두 가지 데이터 바인딩 모델에 대한 개요."
---

# React Gantt의 데이터 바인딩 및 상태 관리

React Gantt는 **두 가지 데이터 바인딩 패턴**을 지원합니다:

1. **진실의 원천으로서의 React 상태** - _대부분의 React 앱에 권장됩니다_.
2. **Gantt를 진실의 원천으로 삼기** - _특수한 경우에 유용합니다_.

두 가지 접근 방식 모두 유효하지만, 예기치 않은 동작을 피하기 위해 하나를 선택하고 일관되게 따라야 합니다.

이 문서는 두 모드를 설명하고 각 모드의 기본 예제를 제공합니다.

아직 기본 차트를 렌더링하지 않았다면 [빠른 시작](integrations/react/quick-start.md)에서 시작하세요.

## 데이터 모델

### 진실의 원천으로서의 React 상태 (권장)

이 모델에서:

- `tasks`, `links`, `resources`, `resourceAssignments`를 React 상태나 상태 관리 라이브러리에 보관합니다
- 이를 `<Gantt>`에 props로 전달합니다
- 사용자가 무언가를 변경하면 ReactGantt가 Ваш `data.save` 또는 `data.batchSave` 콜백을 호출합니다
- React 상태를 업데이트 -> React가 재렌더링 -> ReactGantt가 새 props를 다시 읽습니다

페이지에 Gantt와 동일한 데이터를 보아야 하는 다른 React UI가 있거나, 애플리케이션이 동일한 데이터를 사용하는 추가 컴포넌트나 상태 관리자를 사용하는 경우에 적합합니다.

다만 Gantt의 재해석(re-parsing)이나 재렌더링이 더 잦아질 수 있습니다.

### Gantt를 진실의 원천으로 삼기

이 접근 방식에서 ReactGantt와 백엔드를 데이터의 주 소유자로 다룹니다:

- ReactGantt는 초기 데이터 집합을 `data.load`를 통해, props를 통해, 또는 명령형 API 호출을 통해 로드합니다
- ReactGantt는 사용자 변경을 내부적으로 적용하거나 서버로 전송합니다
- 당신은 모든 작업/링크의 미러 복사본을 React 상태에 상시로 유지하지 않습니다(프로프스에 계속 피드백되는 방식이 아닙니다)

주된 차이점은 전체 루프의 부재입니다 - 사용자 변경이 React 상태를 업데이트하지 않으며 매 변경 후 업데이트된 props를 재적용하지 않습니다.

이 모델은 데이터 집합이 매우 클 때 유용합니다. Gantt 데이터가 변경될 때 React 상태를 지속적으로 업데이트하는 오버헤드를 줄이고, 대량 배치 작업(예: 자동 일정 수립)을 반복적인 재렌더링 없이 단순화합니다.

다른 한편으로는 Gantt 데이터와 React 상태 간의 직접적 동기화가 끊깁니다. 그리고 React 상태에 작업/링크를 저장하는 경우 Gantt의 내부 상태를 의도치 않게 덮어쓰지 않도록 주의해야 합니다.

## React 상태를 진실의 원천으로

이 패턴에서는 모든 핵심 컬렉션을 상태로 보유하고 이를 props(`tasks`, `links`, `resources`, `resourceAssignments`)로 전달합니다. 사용자가 Gantt 내에서 작업이나 링크를 수정하면(예: 작업을 생성하거나 삭제하는 경우), Gantt는 콜백을 트리거합니다. 이 콜백에서 새로운 데이터로 React 상태를 업데이트합니다. 상태가 업데이트되면 React가 **ReactGantt** 컴포넌트를 재렌더링하고, 이 컴포넌트가 최신 상태의 props를 다시 읽습니다.

### React 상태를 사용한 최소 예제

~~~tsx
import { useState } from 'react';
import Gantt, {
  Task,
  Link
} from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

import { demoData } from "./demoData";

export default function ReactStateGantt() {
  const [tasks, setTasks] = useState<Task[]>(demoData.tasks);
  const [links, setLinks] = useState<Link[]>(demoData.links);


  return (
    <div style={{ height: "100vh" }}>
      <Gantt
        tasks={tasks}
        links={links}
        data={{
          save: (entity, action, item, id) => {
            // 아래 패턴 참조: React 상태를 여기서 업데이트
            console.log("Change:", { entity, action, id, item });
          },
        }}
      />
    </div>
  );
}

~~~

이 예제는 기본 시작점을 제공합니다 - React가 props를 통해 렌더링할 내용을 제어하고, Gantt가 `save` 콜백을 통해 변경사항을 보고하며, React를 데이터의 권위적 소유자로 만듭니다.

다음 섹션에서는 해당 콜백 안에서 구현하는 일반적인 패턴을 보여줍니다.

## `data.save`로 변경 처리 {#handlingchangeswithdatasave}

`data.save`를 제공하면 ReactGantt는 사용자가 변경하는 **모든 변경마다** 이를 호출합니다:

~~~ts
(entity: string, action: string, item: any, id: string|number) => {...}
~~~

다음은 간단하게 React 상태를 직접 업데이트하는 예제입니다:

~~~tsx
function handleSave(entity, action, item, id) {
  if (entity === "task") {
    setTasks((prev) => {
      if (action === "create") return [...prev, item];
      if (action === "update") return prev.map((t) => (t.id === id ? item : t));
      if (action === "delete") return prev.filter((t) => t.id !== id);
      return prev;
    });
  }

  if (entity === "link") {
    setLinks((prev) => {
      if (action === "create") return [...prev, item];
      if (action === "update") return prev.map((l) => (l.id === id ? item : l));
      if (action === "delete") return prev.filter((l) => l.id !== id);
      return prev;
    });
  }

  // 필요하면 resources / assignments에 대한 동일 아이디어를 적용
}
~~~

실제 애플리케이션에서는 이 로직을 거의 인라인으로 유지하지 않습니다:

- Redux Toolkit에서는 이것이 리듀서나 썽크가 됩니다
- Zustand/Jotai/MobX/Valtio에서는 스토어에 저장됩니다
- 서버 통합을 위해 여기서 API를 호출할 수도 있습니다

상태 관리 튜토리얼은 이 패턴에 기반해 구성되며, 이 예제는 시작점을 보여주는 것일 뿐입니다.

## `data.batchSave`를 통한 대량 업데이트

`data.save`가 사용자 변경을 가장 편리하게 캡처하는 진입점이지만 한 가지 단점이 있습니다 - 대규모 프로젝트에서 많은 작업을 드래그로 이동시키는 등 자동 일정 수립과 같은 대량 변경이 수백 또는 수천 건의 변경을 생성할 수 있습니다.

이 경우 애플리케이션에서 그럴 가능성이 있다면 `data.save` 대신 `data.batchSave`를 제공하여 배치 모드로 전환할 수 있습니다. 이 모드에서 ReactGantt는 묶인 변경 사항을 제공합니다:

~~~ts
type GanttBatchChanges = {
  tasks?: Array<DataCallbackChange<Task>>;
  links?: Array<DataCallbackChange<Link>>;
  resources?: Array<DataCallbackChange<Resource>>;
  resourceAssignments?: Array<DataCallbackChange<ResourceAssignment>>;
};

interface DataCallbackChange<T> {
  entity: string;
  action: string;
  data: T;
  id: number | string;
}

~~~

다음은 최소 사용 예제입니다:

~~~tsx
<ReactGantt
  // ...tasks/links/resources 등 props
  data={{
    batchSave: (changes) => {
      console.log("Batch changes:", changes);

      if (changes.tasks) {
        setTasks((prev) => applyTaskBatch(prev, changes.tasks));
      }

      if (changes.links) {
        setLinks((prev) => applyLinkBatch(prev, changes.links));
      }

      // 필요시 resources / assignments에 대해서도 동일 처리
    },
  }}
/>

~~~

여기서 `applyTaskBatch`/`applyLinkBatch`는 `{ action, data, id }`를 순회하며 업데이트된 배열을 반환하는 작은 헬퍼들입니다.

일반 원칙으로서,
- 한 번에 많은 변경이 예상되거나 백엔드에 모든 변경을 한 번의 요청으로 보내고 싶을 때는 `batchSave`를 사용
- 대부분의 편집이 단일 작업/링크에 해당하고 가능한 간단한 통합을 원한다면 `save`를 사용

## React 상태로 데이터를 로드하기

React 주도 모델에서 Gantt는 React 상태를 통해 데이터를 받습니다. 그 상태가 어디에서 오는지는 애플리케이션 구조에 달려 있습니다.

개발자가 상태를 채우는 세 가지 일반적인 방법은 다음과 같습니다:

- [로컬 컴포넌트 상태](#localstate)
- [상태 관리 도구(Redux Toolkit, Zustand, MobX, Jotai, XState, Valtio)](#statemanagers)
- [API에서 데이터 로드](#loadingfromapi)

### 로컬 컴포넌트 상태 {#localstate}

빠른 데모, 프로토타입 또는 소규모 애플리케이션에 유용합니다.

데이터는 종종 로컬 시더 파일에서 가져오지만, 계산되거나 파생될 수도 있습니다.

~~~ jsx
export default function GanttTemplatesDemo() {
  const [tasks, setTasks] = useState(projectData.tasks);
  const [links, setLinks] = useState(projectData.links);
  const [resources, setResources] = useState(projectData.resources);
  const [resourceAssignments, setResourceAssignments] = 
      useState(projectData.resourceAssignments);

  return (
    <div style={{height: '100vh'}}>
      <ReactGantt
        tasks={tasks}
        links={links}
        resources={resources}
        resourceAssignments={resourceAssignments}
      />
    </div>
  );
};
~~~

이 패턴은 상태 관리자를 사용하는 것과 매우 유사합니다 - 유일한 차이점은 상태가 어디에 있는지 입니다.

### 상태 관리 도구(Redux Toolkit, Zustand, MobX, Jotai, XState, Valtio) {#statemanagers}

많은 프로덕션 애플리케이션에서 Gantt 데이터는 컴포넌트 내부가 아닌 전역 저장소에 저장됩니다.

ReactGantt는 이들 라이브러리와 자연스럽게 통합됩니다. 값을 전달하려면 셀럭터나 저장소 훅을 통해 저장소의 데이터를 읽고, 이를 props로 `<Gantt>`에 전달합니다. 로컬 상태에서 하는 것과 똑같이 작동합니다.

다음은 일반적으로 어떻게 보이는지의 예시들입니다.

**Redux Toolkit**

~~~ts
const { tasks, links } = useSelector((state: RootState) => state.gantt);
~~~

**Zustand**

~~~ts
const tasks = useGanttStore((state) => state.tasks);
~~~

**MobX**

~~~tsx
<Gantt tasks={store.tasks} links={store.links} />
~~~

각 라이브러리는 고유 API를 가지지만 통합 패턴은 동일합니다 - `tasks`, `links`, `resources` 등을 props로 제공하고, 사용자 업데이트는 `data.save` 또는 `data.batchSave`를 통해 처리하며, 유일한 차이점은 데이터가 어디서 originates하는지입니다.

상태 관리 도구의 튜토리얼은 각 라이브러리에서 동일한 패턴을 구현하는 방법을 보여줍니다:

- [Redux Toolkit으로 React Gantt 사용하기](integrations/react/state/redux-toolkit.md)
- [Zustand로 React Gantt 사용하기](integrations/react/state/zustand.md)
- [MobX로 React Gantt 사용하기](integrations/react/state/mobx.md)
- [XState로 React Gantt 사용하기](integrations/react/state/xstate.md)
- [Jotai로 React Gantt 사용하기](integrations/react/state/jotai.md)
- [Valtio로 React Gantt 사용하기](integrations/react/state/valtio.md)

### API에서 데이터 로드 {#loadingfromapi}

현실적인 애플리케이션에서는 보통 백엔드에서 데이터를 로드하고 이를 React 상태(로컬 또는 글로벌)에 배치합니다.

다음은 일반적인 사용 방식을 반영한 보다 완전한 예제입니다:

~~~tsx
import { useEffect, useState } from "react";
import Gantt, {
  Task,
  Link,
  Resource,
  ResourceAssignment,
  Calendar,
} from "@dhtmlx/trial-react-gantt";

interface GanttData {
  tasks: Task[];
  links: Link[];
  resources: Resource[];
  resourceAssignments: ResourceAssignment[];
}

export default function GanttWithApi() {
  const [data, setData] = useState<GanttData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/gantt-data");
        const raw = await response.json();

        const nextData: GanttData = {
          tasks: raw.tasks,
          links: raw.links,
          resources: raw.resources ?? [],
          resourceAssignments: raw.resourceAssignments ?? []
        };

        setData(nextData);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  if (isLoading || !data) {
    return <div>Loading Gantt...</div>;
  }

  return (
    <ReactGantt
      tasks={data.tasks}
      links={data.links}
      resources={data.resources}
      resourceAssignments={data.resourceAssignments}
      data={{
        save: (entity, action, item, id) => {
          // 백엔드와 동기화하고 상태를 업데이트
        },
      }}
    />
  );
}
~~~

이 접근 방식은 상태 관리 도구와 clean하게 통합됩니다:

- 효과(t thunk)에서 데이터를 로드하고,
- Redux/Zustand/MobX 등 저장소에 저장하고,
- props를 통해 `\<Gantt\>`에 전달하고,
- `save`/`batchSave`를 통해 업데이트를 처리합니다.

## React 앱에서의 Gantt를 진실의 원천으로 {#ganttasthesourceoftruth}

두 번째 바인딩 모드는 **Gantt를 진실의 원천으로 삼는 방식**으로 Gantt(및 필요 시 백엔드)가 기본 데이터 보유자로 취급됩니다.

React는 컴포넌트를 렌더링하지만, 업데이트마다 Prop으로 흐르는 canonical한 상태로서의 tasks/links/resources를 유지하지 않습니다.

이 모델은 React 상태 - Gantt 루프를 완전히 제거합니다.

### 이 모델이 의미가 있을 때

다음과 같은 경우에 **Gantt를 진실의 원천으로 삼는 방식**을 사용합니다.

- 데이터셋이 매우 큰 경우(수천 개의 작업)
- 자동 일정 수립이나 대량 업데이트가 자주 발생하는 경우
- React가 모든 업데이트를 실시간으로 반응할 필요가 없을 때
- 페이지가 주로 "Gantt 중심"일 때

React는 레이아웃, 라우팅 및 주변 UI를 담당하고, Gantt가 데이터의 생명주기를 소유합니다.

### 초기 데이터 제공

이 모델에서도 Gantt에 초기 데이터 세트를 제공할 수 있습니다. 중요한 차이는 변경을 지속적으로 React 상태로 반영하지 않는다는 점입니다.

다음과 같이 데이터를 로드하는 다양한 접근 방식으로 Gantt를 초기화할 수 있습니다: URL로 데이터 로딩, 커스텀 함수로 데이터 로딩, props를 통한 초기 스냅샷 전달. 아래의 세부 정보를 확인하세요.

#### URL로 데이터 로딩

Gantt는 REST 엔드포인트를 사용해 백엔드에서 모든 것을 직접 로드할 수 있습니다:


~~~tsx
<Gantt
  data={{
    load: "/api/gantt/load",
    save: "/api/gantt/save",
  }}
/>
~~~

- `data.load`는 초기화 시 한 번 호출됩니다
- 사용자가 작업/링크를 수정할 때마다 `data.save`가 트리거됩니다.

#### 커스텀 함수로 데이터 로딩

URL 대신 비동기 함수를 제공할 수 있습니다:

~~~tsx
<Gantt
  data={{
    load: async () => {
      const res = await fetch("/api/gantt/load");
      return res.json();
    },
    save: async (entity, action, item, id) => {
      // 아래 예제를 참조
    },
  }}
/>
~~~

#### props로 초기 스냅샷 전달(단방향)

여전히 초기 데이터를 props로 제공할 수 있습니다:

~~~tsx
<Gantt tasks={initialTasks} links={initialLinks} />
~~~

이 경우 props는 시작점일 뿐입니다. 초기화 후 Gantt는 자체 내부 저장소를 유지하고 거기서 계속 작동합니다. 매 편집 후에 props에 새로운 배열을 다시 피드하는 것이 아니라는 점은 이 모델에서 React가 데이터의 정식 소유주로 간주되지 않기 때문입니다.

### 업데이트가 작동하는 방식

사용자가 데이터를 생성, 편집 또는 삭제할 때마다 Gantt는 `save`(또는 `batchSave`) 콜백을 트리거합니다.

Gantt는 생성된 레코드에 임시 ID를 처음으로 할당합니다. 백엔드는 이를 실제 데이터베이스 ID로 교체해야 합니다.

이 로직은 JS Gantt의 DataProcessor 모듈이 작동하는 방식(JS Docs의 [Server-Side Integration](guides/server-side.md) 참조)과 일치합니다.

새로운 작업, 링크, 리소스 또는 어사인먼트가 생성되면 `save` 호출은 다음 형식의 Promise를 반환해야 합니다:

~~~json
{ "id": "<database id>"}
~~~


예:

~~~ts
data.save = async (entity, action, item, id) => {
  if (action === "create") {
    const response = await fetch(`/api/${entity}`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json(); 
    // 결과에는 { id: newDatabaseId }가 포함되어야 합니다
    return { id: result.id };
  }

  if (action === "update") {
    await fetch(`/api/${entity}/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" }
    });
    return {};
  }

  if (action === "delete") {
    await fetch(`/api/${entity}/${id}`, { method: "DELETE" });
    return {};
  }
};
~~~

임시 ID를 영구 ID로 교체하도록 `{id: newId}`를 반환하는 것은 이후 업데이트/삭제 작업이 데이터베이스의 올바른 레코드를 대상으로 하도록 보장합니다.

#### `batchSave` 사용

`batchSave`는 여러 변경을 하나의 콜백으로 묶습니다. 여러 새로운 레코드가 함께 나타날 수 있으므로 Gantt는 `batchSave`가 아무 것도 반환하길 기대하지 않습니다.

`batchSave`를 사용할 때는 백엔드에서 새 레코드를 생성하고 그들의 영구 ID를 얻은 뒤, 임시 ID를 대체하기 위해 명령형 API 호출로 Gantt를 업데이트해야 합니다:

~~~ts
gantt.changeTaskId(tempId, realId);
gantt.changeLinkId(tempId, realId);
~~~

## 다음 단계

두 데이터 모델에 대해 명확히 이해했다면 특정 튜토리얼로 이동하면 됩니다.

상태 관리 도구:

- [Redux Toolkit으로 React Gantt 사용하기](integrations/react/state/redux-toolkit.md)
- [Zustand로 React Gantt 사용하기](integrations/react/state/zustand.md)
- [MobX로 React Gantt 사용하기](integrations/react/state/mobx.md)
- [XState로 React Gantt 사용하기](integrations/react/state/xstate.md)
- [Jotai로 React Gantt 사용하기](integrations/react/state/jotai.md)
- [Valtio로 React Gantt 사용하기](integrations/react/state/valtio.md)

또한 명령형 API와 서버 측 통신 사용에 대해 더 알아보기:

- [React Gantt Configuration](integrations/react/configuration-props.md)
- [Server-Side Integration](guides/server-side.md)