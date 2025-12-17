---
title: "React Gantt"
sidebar_label: "개요"
---

React Gantt
==================

:::note
React Gantt는 [Commercial, Enterprise, Ultimate 라이선스](https://dhtmlx.com/docs/products/licenses.shtml)에서 제공됩니다.
Individual 또는 GPL 에디션 Gantt 사용자는 React용 [How to Start](integrations/react/quick-start.md) 가이드를 참고해 주세요.
:::

개요
--------------------

DHTMLX Gantt는 모든 브라우저 환경에서 호환되는 순수 JavaScript 컴포넌트입니다. Commercial 및 그 이상 에디션에는 DHTMLX Gantt를 감싸는 **React Gantt** 컴포넌트가 포함되어 있어 React 애플리케이션에 쉽게 통합할 수 있습니다.

이 래퍼는 React의 익숙한 props와 state 모델을 활용하여 완전한 기능의 Gantt 차트를 구현할 수 있게 해줍니다. 내부적으로는 표준 DHTMLX Gantt 인스턴스를 관리하며, React props(예: tasks, config 등)를 Gantt 초기화 및 데이터 구조로 변환합니다.

**주요 특징**

- 선언적 데이터 관리: tasks, links, resources 등 배열을 props로 전달
- 구성 가능: React props를 *gantt.config*, *gantt.templates*, *gantt.plugins* 등에 매핑
- 전체 Gantt API 접근: ref를 통해 [getTask](api/method/gettask.md), [updateTask](api/method/updatetask.md), [addTaskLayer](api/method/addtasklayer.md) 등 메서드 호출 가능
- 간단한 커스터마이징: 템플릿, lightbox 폼, 인라인 에디터를 위한 React 컴포넌트 구현 가능

DHTMLX Gantt가 처음이라면 [DHTMLX Gantt 문서](guides.md)에서 [작업 시간 계산](guides/working-time.md), [자동 스케줄링](guides/auto-scheduling.md), [리소스 관리](guides/resource-management.md) 등 다양한 기능을 확인할 수 있습니다.

설치 및 NPM 접근
-------------------

**React Gantt 컴포넌트 평가판 설치**

:::note
React Gantt 평가판을 사용하려면 [여기](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml)에서 DHTMLX Gantt 평가판 패키지를 다운로드한 후, README 파일의 지침을 따르세요. 패키지에는 React Gantt 샘플도 포함되어 있습니다.
평가판은 30일간만 유효합니다.
:::

**React Gantt PRO 버전 설치**

:::note
DHTMLX 프라이빗 npm 접근은 [Client's Area](https://dhtmlx.com/clients/)에서 npm 로그인 및 비밀번호를 생성해 이용할 수 있습니다. 자세한 설치 가이드도 제공되며, 프라이빗 npm 접근은 유효한 상용 Gantt 라이선스가 필요합니다.
:::

버전 요구사항
--------------------

- React `v18.0.0` 이상

기본 사용법
-------------------

아래는 Gantt 차트를 import 및 렌더링하는 간단한 예시입니다:

~~~js
import { useState } from 'react';
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
import { demoData } from './DemoData'

export default function BasicGantt() {
  const [theme, setTheme] = useState("terrace");
  const [tasks, setTasks] = useState(demoData.tasks);
  const [links, setLinks] = useState(demoData.links);

  return (
    <div style={{height: '500px' }}>
      <ReactGantt
        tasks="{tasks}"
        links="{links}"
        theme="{theme}"
      />
    </div>
  );
}
~~~

**demoData** 객체는 이 [포맷](guides/loading.md)을 따릅니다:

~~~
const demoData = {
  tasks: [
    { id: 1, text: "Product Launch", type: "project", open: true, parent: 0},
    { id: 2, text: "Planning Phase", type: "project", open: true, parent: 1},
    { id: 3, text: "Requirement Gathering", type: "task", progress: 0.2, 
      start_date: "2025-06-01", duration: 3, parent: 2},
    { id: 4, text: "Technical Feasibility", type: "task", progress: 0.4, 
      start_date: "2025-06-04", duration: 2, parent: 2},
    { id: 5, text: "Implementation Phase", type: "project", progress: 0.1, 
      open: true, start_date: "2025-06-08", duration: 10, parent: 1},
    { id: 6, text: "Prototype Development", type: "task", progress: 0.0, 
     start_date: "2025-06-08", duration: 4, parent: 5},
    { id: 7, text: "Feature Testing", type: "task", progress: 0.0, 
     start_date: "2025-06-12", duration: 4, parent: 5},
    { id: 8, text: "Go-Live Milestone", type: "milestone", progress: 0, 
     start_date: "2025-06-18", duration: 0, parent: 1}
  ],
  links: [
    { id: 1, source: 3, target: 4, type: "0" },
    { id: 2, source: 4, target: 5, type: "0" },
    { id: 3, source: 6, target: 7, type: "0" },
    { id: 4, source: 7, target: 8, type: "0" }
  ]
};
export demoData;
~~~

데이터 바인딩
--------------------

**ReactGantt** 래퍼는 데이터 로딩 및 저장을 위한 유연한 옵션을 제공합니다. Gantt 데이터 변경을 처리하는 주요 방법은 두 가지입니다:

1. React state를 주 데이터 소스로 사용
2. Gantt를 주 데이터 소스로 사용

두 방법 모두 잘 동작하지만, 예기치 않은 문제를 피하려면 한 가지 방식을 선택해 일관되게 사용하는 것이 좋습니다.

### React state를 데이터 소스로 사용

이 방식에서는 **ReactGantt**가 모든 task 및 link 데이터를 React state에서 읽어옵니다. 사용자가 Gantt 내에서 task나 link를 수정할 때(예: task 추가/삭제), 콜백이 발생합니다. 이 콜백에서 React state를 변경하면, state가 업데이트되면서 React가 **ReactGantt**를 다시 렌더링하고 최신 state로 Gantt 데이터를 재로딩합니다.

~~~js
function MyGanttApp() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const data = {
    save: (entity: string, action: string, raw: any, id: string | number) => {
      if (entity === 'task') {
        if (action === 'create') {
          setTasks((prev) => [...prev, item]);
        } ...
      }
      ...
    }
  };

  return (
    <ReactGantt
      tasks="{tasks}"
      links="{links}"
      data="{data}"
      // ...other props
    />
  );
}
~~~

이 예시에서 **ReactGantt**는 task가 생성될 때 **save** 콜백을 호출하고, 이에 따라 React state가 변경됩니다. state가 변경되면 ReactGantt가 Gantt 데이터를 다시 초기화합니다.

이 패턴은 UI 및 서버 업데이트를 위한 단일 소스(React state)를 유지하며, React 또는 Redux 로직과 자연스럽게 어울립니다.

단, 이 방식은 Gantt의 파싱 또는 리렌더링이 더 자주 발생할 수 있습니다.

### Gantt를 데이터 소스로 사용

이 방법에서는 변경이 Gantt 인스턴스 내부에서 직접 발생하며, 반드시 React state와 동기화하지 않아도 됩니다. tasks와 links를 props나 Gantt의 내장 데이터 프로세서를 통해 최초 로드할 수 있지만, 실행 중에는 Gantt가 데이터를 내부적으로 관리합니다. 업데이트 콜백이나 내장 transport를 설정하면 Gantt가 서버나 커스텀 함수로 변경사항을 전송하지만, 변경 후에 React state가 자동으로 업데이트/되돌려지지는 않습니다.

~~~js
<ReactGantt
  data="{" {
    load: "/api/data",     // gantt가 초기 tasks/links를 여기서 로드
    save: "/api/data"      // gantt가 변경사항을 여기로 전송
  } }
/>
~~~

이 구성에서는 Gantt가 자체적으로 데이터 로딩/저장을 처리하며, 로컬 Gantt 인스턴스가 주 데이터 소스가 됩니다.

이로 인해 Gantt 변경 시 React state 업데이트가 반복적으로 발생하는 오버헤드가 줄어들고, Auto Scheduling 등 배치 작업 시 반복 렌더링 없이 간결하게 처리할 수 있습니다.

반면, Gantt 데이터와 React state 간의 직접적인 동기화를 잃게 됩니다. 만약 React state에 tasks/links를 계속 유지한다면, Gantt 내부 데이터를 실수로 덮어쓰지 않도록 주의해야 합니다.

### 데이터 로딩

코드 내에 데이터가 있다면, state 변수와 적절한 props를 통해 Gantt에 전달할 수 있습니다:

~~~js
export default function GanttTemplatesDemo() {
  const [tasks, setTasks] = useState(projectData.tasks);
  const [links, setLinks] = useState(projectData.links);
  const [resources, setResources] = useState(projectData.resources);
  const [resourceAssignments, setResourceAssignments] = 
      useState(projectData.resourceAssignments);

  return (
    <div style="{" {height: '100vh'} }>
      <ReactGantt
        tasks="{tasks}"
        links="{links}"
        resources="{resources}"
        resourceAssignments="{resourceAssignments}"
      />
    </div>
  );
};
~~~

### 내장 transport를 이용한 데이터 로딩

Gantt가 데이터를 불러올 URL과 변경사항을 전송할 URL을 지정할 수 있습니다:

~~~js
import React from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: "/api/data"
    }
  }

  return (
    <ReactGantt ...{props} />
  );
}
~~~

내부적으로 **load** URL은 [load](api/method/load.md) 메서드에 전달됩니다. 엔드포인트는 [데이터 로딩](guides/loading.md) 문서에 설명된 포맷으로 데이터를 반환해야 합니다.

### 변경사항 저장

**save** URL은 이 [문서](guides/server-side.md#requestresponsedetails)에" 설명된 포맷으로 업데이트를 받습니다.

또는, **data** 객체의 **save** 속성에 함수를 지정할 수도 있습니다. 이 함수는 Gantt 데이터가 변경될 때마다 호출되며, 내부 [DataProcessor](guides/server-side.md#customrouting)의 라우팅 핸들러로 동작합니다:

~~~js
import React from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: (entity, action, data, id) => {
          console.log(`${entity} - ${action} - ${id}`, data);
      }
    }
  };

  return (
    <ReactGantt ...{props} />
  );
}
~~~

### 배치 저장 모드

기존 방식에서는 React Gantt가 변경된 각 엔티티마다 콜백을 한 번씩 호출했습니다. 이는 기본 Gantt 라이브러리의 동작과 동일합니다. 하지만 Auto Scheduling처럼 한 번에 많은 task가 변경되는 배치 작업에서는 React에서 성능 저하가 발생할 수 있습니다. 각 변경마다 state를 별도로 업데이트하는 것은 효율적이지 않습니다.

이를 개선하기 위해 React Gantt는 대량 업데이트에 적합한 **data.batchSave** 핸들러를 제공합니다.  
Gantt 인스턴스에서 발생한 모든 변경사항을 한 번에 전달받습니다:

~~~

const [tasks, setTasks] = useState(data.tasks);
const [links, setLinks] = useState(data.links);

return <ReactGantt
  ref="{ganttRef}"
  tasks="{tasks}"
  links="{links}"

  data="{" {
    batchSave: (updates) => {
      if (updates.task) {
        setTasks(tasks => updateTasks(tasks, updates.task));
      }
      if (updates.link) {
        setLinks(links => updateLinks(links, updates.link));
      }

    }
  } }
/>
~~~

**batchSave** 콜백에 전달되는 `updates` 객체는 다음과 같습니다:

~~~js
{
  tasks: DataCallbackChange<Task>[],
  links: DataCallbackChange<Link>[],
  resources: DataCallbackChange<Resource>[],
  resourceAssignments: DataCallbackChange<ResourceAssignment>[],
}

interface DataCallbackChange<T> {
  entity: string;
  action: string;
  data: T;
  id: number | string;
}
~~~

설정 & Props
-------------------

React 래퍼는 `config` prop([gantt.config](api/overview/properties-overview.md)로 매핑)과 `templates` prop([gantt.templates](api/overview/templates-overview.md)로 매핑)을 지원합니다.


~~~js
<ReactGantt
  tasks="{tasks}"
  links="{links}"
  config= { {
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "day", step: 1, format: "%d %M" },
    ],
    columns: [
      { name: "text", tree: true, width: "*", resize: true },
      { name: "start_date", align: "center", resize: true },
      { name: "duration", align: "center", resize: true },
      {
        name: "custom",
        align: "center",
        template: (task) => <AlertButton task="{task}" onClick="{handleButtonClick}" />,
        resize: true,
      },
      { name: "add", width: 44 },
    ],
  } }
  templates= { {
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
    task_class: (start, end, task) => {
      return task.priority === 'high' ? 'highlight-task' : '';
    },
  } }
/>
~~~

### 템플릿에서 React 컴포넌트 사용하기

props에서 템플릿을 정의할 때, 템플릿 함수에서 React 엘리먼트를 반환할 수 있습니다:

~~~js
function PriorityBadge({ priority }) {
  return <span style={{color: 'red' }}>{priority}</span>;
}

<ReactGantt
  templates="{" {
    task_text: (start, end, task) => {
      return <PriorityBadge priority="{task.priority}" />;
    }
  } }
/>
~~~

:::note
내부적으로 DHTMLX Gantt는 React를 직접적으로 사용하지 않고 DOM을 처리합니다. 템플릿에서 React 컴포넌트가 반환되면, 포털을 통해 Gantt의 HTML에 삽입됩니다. 복잡한 React 컴포넌트를 대용량 데이터셋에 많이 렌더링하면 성능에 영향을 줄 수 있으니 유의하세요.
:::

템플릿은 다양한 부분을 커스터마이즈하는 데 사용할 수 있습니다:

- [task_text](api/template/task_text.md), [task_class](api/template/task_class.md): 작업 바(bar)용
- [타임라인 헤더 포맷팅](guides/configuring-time-scale.md#dateformat)
- [컬럼 템플릿](guides/specifying-columns.md#datamappingandtemplates): 좌측 그리드 셀
- 그 외에도 여러 부분. 자세한 내용은 [가이드 모음](guides.md) 참고

React Gantt에서 지원하는 모든 props 목록은 [](integrations/react/configuration-props.md) 에서 확인할 수 있습니다.

테마 & 스타일링
-----------------

Gantt에는 **theme** prop을 사용하여 설정하고 동적으로 전환할 수 있는 여러 내장 테마가 포함되어 있습니다:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {
  const [theme, setTheme] = useState("terrace"); 
  const tasks = [...];
  const links = [...];

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "terrace" ? "dark" : "terrace"));
  };


  return (
    <div style="{" {height: '600px'} }>
      <div>
        <button onClick="{switchTheme}">Switch Theme</button>
      </div>
      <ReactGantt
        tasks="{tasks}"
        links="{links}"
        theme="{theme}"  /*!*/
      />
    </div>
  );
};
~~~

사용 가능한 테마에 대한 자세한 설명은 [이 문서](guides/skins.md)에서 확인할 수 있습니다.

테마는 커스텀 스타일을 적용하거나 CSS 변수 오버라이드로 더 세밀하게 조정할 수도 있습니다:

~~~css
:root {
    --dhx-gantt-task-background: #d96c49;
    --dhx-gantt-task-color: #fff;
    --dhx-gantt-task-border-radius: 8px;
}
~~~

더 많은 구성 옵션은 [스킨 커스터마이제이션](guides/custom-skins.md) 가이드에서 확인하세요.

Lightbox 교체하기
------------------

DHTMLX Gantt에는 [Lightbox](guides/default-edit-form.md)라는 내장형 작업 에디터가 제공됩니다.

원한다면, React 모달 또는 다른 컴포넌트로 다음과 같은 방법으로 교체할 수 있습니다:

### `customLightbox` prop으로 커스텀 컴포넌트 전달

**customLightbox** prop을 통해 컴포넌트를 전달할 수 있습니다:

~~~js
import React, { useState } from 'react';

export interface CustomLightboxProps {
  data: any;
  onSave: (task: any) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const CustomLightbox: React.FC<CustomLightboxProps> = ({
  data,
  onSave,
  onCancel,
  onDelete
}) => {
  const [description, setDescription] = useState<string>(data.text || '');

  const handleSaveClick = () => {
    onSave({ ...data, text: description });
  };

  const modalStyles = {
   ...
  };

  return (
    <div>
      <div style="{modalStyles.overlay}" onClick="{onCancel}" />
      <div style="{modalStyles.content}">
        <h3>Edit Task</h3>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value="{description}"
            onChange="{(e)" => setDescription(e.target.value)}
            style={{width: '100%', padding: '8px', marginTop: '10px' } }
          />
        </div>
        <div style="{modalStyles.buttonGroup}">
          <button onClick="{handleSaveClick}">Save</button>
          <button onClick="{onCancel}">Cancel</button>
          <button onClick="{onDelete}">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CustomLightbox;
~~~

이제 아래와 같이 사용할 수 있습니다:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
import CustomLightbox from "./EditorModal";

export default function BasicInitDemo() {
  const ganttRef = useRef(null);

  const tasks = [...];
  const links = [...];

  useEffect(() => {
    //const gantt = ganttRef.current?.instance;
    
  }, []);

  return (
    <ReactGantt 
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
      customLightbox="{<CustomLightbox" />} />
  );
}
~~~

### onBeforeLightbox 이벤트 prop 사용

더 고급 케이스에서는 [onBeforeLightbox](api/event/onbeforelightbox.md) 이벤트(라이트박스가 열릴 때 발생)를 수신하여 기본 동작을 오버라이드할 수 있습니다:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
import { useNavigate } from 'react-router-dom';


export default function BasicInitDemo() {
  const ganttRef = useRef<any>(null);

  const tasks = [...];
  const links = [...];
  const navigate = useNavigate();

  const handleTaskEdit = (id: any) => {
    const ganttInstance = ganttRef.current?.instance;
    navigate(`/editor/${id}`, { state: { task: ganttInstance.getTask(id) } });
  };

  return (
    <ReactGantt 
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
      onBeforeLightbox="{handleTaskEdit}" />
  );
}
~~~

### JS Gantt API 사용

내장 Lightbox를 오버라이드하거나 확장하는 방법에 대한 자세한 내용은 [Custom Lightbox](guides/custom-edit-form.md)를 참고하세요.

내장 모달 교체하기
------------------

기본 UI에는 두 개의 모달 다이얼로그가 포함되어 있습니다:

- 작업 삭제 전 확인 다이얼로그
- 링크 삭제 전 확인 다이얼로그

둘 다 ReactGantt의 `modals` prop을 사용해 커스터마이즈할 수 있습니다:

~~~js
<ReactGantt
  ...
  modals="{" {
    onBeforeTaskDelete: ({
      task,
      callback,
      ganttInstance,
    }: {
      task: Task;
      callback: () => void;
      ganttInstance: GanttStatic;
    }) => void,
    onBeforeLinkDelete: ({
      link,
      callback,
      ganttInstance,
    }: {
      link: Link;
      callback: () => void;
      ganttInstance: GanttStatic;
    }) => void,
  } }
  ...
/>

~~~

이 props를 사용하면 Gantt에서 확인을 요청할 때마다 직접 만든 모달을 표시할 수 있습니다.  
제공된 `callback()`을 호출하면 작업 또는 링크 삭제가 완료됩니다. 취소하려면 콜백을 호출하지 않고 모달을 닫으면 됩니다.

그리드에서 React 컴포넌트 사용하기
-------------------

### 헤더에서

그리드 컬럼의 **label** 속성은 `string` 또는 `ReactElement`가 될 수 있습니다. 이를 통해 컬럼 헤더에 React 기반 필터, 버튼, 기타 UI 요소를 직접 삽입할 수 있습니다:

~~~js
const config: GanttConfig = {
  columns: [
    { name: "text", label: "Name", tree: true, width: 180, 
        resize: true },
    // React element 직접 삽입
    { name: "start_date", label: <DateFilter />, width: 150, 
        align: "center", resize: true },
    // 또는 함수로 React element 반환
    { name: "end_date", label: () => <DateFilter />, width: 150, 
        align: "center", resize: true },
    ...
  ],
  row_height: 40,
  grid_width: 550,
};
~~~

래퍼가 label이나 다른 템플릿 속성에서 React element를 찾으면, React Portal을 사용해 그리드 헤더 셀 내부에 렌더링합니다.

### 셀에서

그리드 셀은 컬럼의 **template** 속성으로 제어합니다. 이 함수는 task 객체를 받아서 일반 `string` 또는 `ReactElement`를 반환해야 합니다:

~~~
import { useRef } from 'react';

function AlertButton({ task, onClick }) {
  return <button onClick="{onClick}">{`Task ID: ${task.id}`}</button>;
}

export default function GanttWithGridCells({ handleButtonClick, ganttRef }) {
  const config = {
    columns: [
      { name: "text", tree: true, width: 180, resize: true },
      { name: "start_date", width: 150, align: "center", resize: true },
      { name: "duration", width: 80, align: "center", resize: true },
      {
        name: "custom",
        align: "center",
        label: <span>My Column</span>,
        width: 140,
        // React element 반환
        template: (task) => (
          <AlertButton
            task="{task}"
            onClick="{()" => {
              handleButtonClick(task);
              // 필요하다면 작업을 다시 렌더링
              ganttRef.current?.instance.updateTask(task.id);
            }}
          />
        ),
        resize: true,
      },
      { name: "add", width: 44 },
    ],
    row_height: 40,
    grid_width: 550,
  };

  return <ReactGantt ref="{ganttRef}" config="{config}" /* ...other props */ />;
}
~~~

컬럼 템플릿에서 React element를 반환하면, 각 Gantt 그리드 셀 안에 버튼, 드롭다운, 배지 등 완전히 인터랙티브한 콘텐츠를 만들 수 있습니다. 래퍼는 이러한 요소를 포털을 통해 Gantt가 관리하는 DOM 노드에 삽입합니다.

### 인라인 에디터에서

DHTMLX Gantt는 [그리드 셀의 인라인 편집](guides/inline-editing.md)을 지원합니다. 이 React 래퍼에서는 **column** 설정에서 에디터 객체를 정의하고, `inlineEditors` prop을 통해 에디터 이름을 React 컴포넌트에 연결하여 커스텀 React 에디터를 추가할 수 있습니다. 아래 예제는 이러한 구성을 보여줍니다.

React 기반 인라인 에디터 컴포넌트를 정의합니다:

~~~js
import React, {
    useState,
    forwardRef,
    useImperativeHandle
} from 'react';
import { InlineEditorMethods, InlineEditorProps } from '@dhx/react-gantt';


const MyInlineEditor = forwardRef<InlineEditorMethods, InlineEditorProps>(
    ({ initialValue, task, save, cancel, ganttInstance }, ref) => {
        const [value, setValue] = useState(initialValue || "");

        useImperativeHandle(ref, (): InlineEditorMethods => ({
            getValue: () => value,
            setValue: (val: any) => setValue(val),
            isValid: () => true, 
            focus: () => {

            },
            isChanged: (originalValue: any) => {
                return originalValue !== value;
            },

            save: () => {  }
        }));

        return (
            <input
                type="text"
                value="{value}"
                onChange="{e" => setValue(e.target.value)}
                autoFocus
            />
        );
    }
);

export default MyInlineEditor;
~~~

Gantt 설정에서 커스텀 에디터를 사용합니다:

~~~js
import ReactGantt from "@dhx/react-gantt";
import MyInlineEditor from "./CustomInlineEditor";

function Demo() {
  const config = {
    columns: [
      { name: "text", tree: true, width: 180, resize: true },
      {
        name: "duration",
        width: 80,
        align: "center",
        editor: { type: "customInputEditor", map_to: "text" }, /*!*/
        resize: true
      },
      { name: "start_date", width: 150 },
      { name: "add", width: 44 }
    ]
  };

  return (
    <ReactGantt
      config="{config}"
      inlineEditors="{" {
        customInputEditor: MyInlineEditor  /*!*/
      } }
      tasks="{[/*...*/]}"
      links="{[/*...*/]}"
    />
  );
}
~~~

사용자가 컬럼 셀을 더블 클릭하면 Gantt 차트는 해당 셀을 에디터 컴포넌트로 교체합니다. 래퍼는 내부적으로 `useImperativeHandle(ref, ...)`을 통해 제공된 메서드(getValue, setValue 등)를 호출하여, Gantt 인스턴스와 컴포넌트의 변경 사항을 동기화합니다.

에디터 객체의 `type` 값은 `inlineEditors`의 키와 일치해야 합니다.

`map_to` 속성은 에디터가 읽고 쓸 Task 객체의 속성을 지정합니다. 자세한 내용은 [인라인 편집](guides/inline-editing.md) 문서를 참고하세요.

에디터가 단순히 태스크 속성만 업데이트하는 것보다 더 복잡한 작업을 수행한다면, **save** 함수 내에 필요한 로직을 구현하고 `map_to` 옵션을 **"auto"** 로 설정하세요. 이 모드에서는 Gantt 차트가 태스크 객체를 자동으로 업데이트하지 않고, 변경 사항을 적용할 시점에 **save** 함수를 호출합니다. 이때 에디터는 `initialValue`로 `null`을 받게 됩니다.

:::note
참고, 비-React 인라인 에디터는 **config**의 [editor_types](guides/inline-editing.md#custominlineeditor) 속성을 사용해 정의할 수도 있습니다.
:::

#### 에디터 컴포넌트 속성

- <span class="subproperty">**initialValue**</span> - (*any*) - 에디터의 초기값
- <span class="subproperty">**task**</span> - (*Task*) - 현재 편집 중인 태스크
- <span class="subproperty">**save**</span> - (*function*) - gantt가 에디터를 저장 및 닫도록 트리거
- <span class="subproperty">**cancel**</span> - (*function*) - 저장하지 않고 에디터를 닫음
- <span class="subproperty">**ganttInstance**</span> - (*GanttStatic*) - 현재 Gantt 인스턴스


필터링
-----------------

`filter` prop을 사용하면 어떤 태스크가 표시될지 제어하는 함수를 지정할 수 있습니다:

~~~js
const [filter, setFilter] = useState<((task: Task) => boolean) | null>(null);

function showCompleted() {
  setFilter(() => (task: Task) => task.progress === 1);
}
function resetFilter() {
  setFilter(null);
}

return (
  <ReactGantt
    ...
    filter="{filter}"
    ...
  />
);

~~~

[리소스 패널](guides/resource-management.md)에서 리소스를 필터링하려면 `resourceFilter` prop을 사용하세요:

~~~js
function handleResourceSelectChange(resourceId: string | null) {
  setSelectedResource(resourceId);
  if (resourceId === null) {
    setResourceFilter(null);
  } else {
    setResourceFilter(
      () => (resource: ResourceItem) => String(resource.id) === String(resourceId)
    );
  }
}

return (
  <ReactGantt
    ref="{ganttRef}"
    tasks="{tasks}"
    links="{links}"
    resources="{resources}"
    resourceFilter="{resourceFilter}"
    config="{config}"
    templates="{templates}"
    plugins={{auto_scheduling: true } }
  />
);

~~~

작업 캘린더
------------------

**ReactGantt**에서 작업 시간 계산을 활성화하려면 설정에서 work time 기능을 켜세요:

~~~js
  const config: GanttConfig = {
    ...
    work_time: true
  };
~~~

작업 캘린더는 `calendars` prop을 통해 **ReactGantt**로 전달할 수 있습니다:

~~~js
const calendars: Calendar[] = [
  {
    id: "global",
    hours: ["8:00-12:00", "13:00-17:00"], // 평일의 전역 근무 시간
    days: {
      weekdays: {
        0: false, // 0 = 일요일, 6 = 토요일
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: false
      },
      dates: {
        "2025-04-06": true,  // 특정 날짜의 근무 시간 재정의
        "2025-04-08": false
      }
    }
  }
];

return (
  <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
    <ReactGantt
      ...
      calendars="{calendars}"
      ...
    />
  </div>
);

~~~

Gantt 타임라인에서 근무 시간을 강조 표시하거나 작업 시간 계산을 수행하려면, 제공된 `useWorkTime` 훅을 사용할 수 있습니다:

~~~js
import ReactGantt, { useWorkTime, Calendar } from "@dhx/react-gantt";

export default function GanttTemplatesDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);

  const { isWorkTime } = useWorkTime(ganttRef);
  const templates: GanttTemplates = {
    timeline_cell_class: (task: Task, date: Date) => {
      return isWorkTime({ date, task }) ? "" : "weekend";
    }
  };

  const calendars: Calendar[] = [
    {
      id: "global",
      hours: ["8:00-12:00", "13:00-17:00"], // 평일의 전역 근무 시간
      days: {
        weekdays: {
          0: false, // 0 = 일요일, 6 = 토요일
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: false
        },
        dates: {
          "2025-04-06": true,  // 특정 날짜의 근무 시간 재정의
          "2025-04-08": false
        }
      }
    }
  ];

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGantt
        ...
        calendars="{calendars}"
        templates="{templates}"
        config="{config}"
        ref="{ganttRef}"
      />
    </div>
  );
};

~~~

또는 [내부 Gantt 객체](#accessingtheunderlyingganttapi)에 직접 접근하여 [작업 시간](guides/working-time.md) 메서드를 사용할 수도 있습니다.

태스크 그룹화
-----------------

`groupTasks` prop을 사용하여 태스크를 어떤 속성으로든 그룹화할 수 있습니다:

~~~js
  const [grouping, setGrouping] = useState<GroupConfig | boolean>({
    relation_property: 'status',
    groups:[
      {id: 1, name: "New"},
      {id: 2, name: "In Progress"},
      {id: 3, name: "Done"}
    ],
    group_id: "key",
    group_text: "label"
  });

  return (
  <ReactGantt
    ref="{ganttRef}"
    tasks="{tasks}"
    links="{links}"
    groupTasks="{grouping}"
  />
);
~~~

그룹화를 끄려면 `groupTasks`를 `false`로 설정하세요:

~~~js
setGrouping(false);
~~~


타임라인 영역의 수직 마커
-----------------

수직 마커는 `markers` 속성을 통해 **ReactGantt**에 추가할 수 있습니다:

~~~js
  const projectStartMarker = {
    id: "marker1",
    start_date: new Date(2025, 3, 2),
    text: "Project start!",
    css: "project-start"
  };
  const projectEndMarker = {
    id: "marker2",
    start_date: new Date(2025, 3, 16),
    text: "Project end",
    css: "project-end"
  };

  const [markers, setMarkers] = useState<Marker[]>([
    projectStartMarker,
    projectEndMarker
  ]);

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGantt
        ...
        markers="{markers}"
        ...
      />
    </div>
  );
~~~

:::note
참고, Marker 객체의 **text** 속성은 HTML 문자열 또는 React Element를 모두 지원합니다.
:::

내부 Gantt API 접근
------------------

ReactGantt의 props만으로 대부분의 설정이 가능하지만, 작업 시간 계산, gantt.showDate, gantt.unselectTask, 커스텀 줌 등 고급 기능을 위해 DHTMLX Gantt API에 직접 접근해야 할 때가 있습니다.

### 내장 훅 사용

ReactGantt는 Gantt API의 일부를 노출하는 훅을 제공합니다. 자세한 내용은 관련 문서 [](integrations/react/configuration-props.md) 를 참고하세요.

### Ref 사용

선언적 props와 훅만으로 충분하지 않은 경우, `ref`를 통해 내부 Gantt 인스턴스에 접근할 수 있습니다:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // 여기서 Gantt의 모든 API 메서드를 호출할 수 있습니다
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
    />
  );
}
~~~

모든 메서드 목록은 DHTMLX Gantt [API Reference](api/overview/methods-overview.md)를 참고하세요.

#### React props와의 충돌 방지

- `gantt.parse(( tasks, links ))`나 `gantt.addTask()`를 직접 호출하는 경우, React props와 동기화가 깨질 수 있습니다. 그렇지 않으면 React의 다음 렌더에서 수동 변경 사항이 덮어써질 수 있습니다.
- 태스크와 링크는 래퍼의 props 또는 React state를 통해 관리하고, 재파싱은 래퍼에 맡기는 것이 가장 좋습니다.


SSR 프레임워크(Next.js, Remix)와의 호환성
--------------

:::note
DHTMLX Gantt는 브라우저 전용 위젯으로 DOM과 직접 상호작용하기 때문에 Node/SSR 환경에서는 렌더링할 수 없습니다. 따라서 ReactGantt를 사용하는 라우트나 컴포넌트에서는 서버사이드 렌더링을 비활성화하거나 지연시켜야 합니다.
:::

#### Next.js

Next.js 사용자는 SSR이 비활성화된 상태로 ReactGantt 컴포넌트를 동적으로 import하는 방법이 좋습니다:

~~~js
import dynamic from 'next/dynamic';

const GanttDemo = dynamic(() => import('../components/GanttDemo'), {
  ssr: false
});

export default function GanttPage() {
  return (
    <div style={{height: '100vh' }}>
      <GanttDemo />
    </div>
  );
}
~~~
이렇게 하면 Gantt 차트가 브라우저에서만 로드되어 서버 렌더링 오류를 방지할 수 있습니다.

#### Remix

Remix에서는 클라이언트 측에서 Gantt 컴포넌트를 조건부로 렌더링하는 것이 권장됩니다:

~~~js
import { ClientOnly } from 'remix-utils/client-only';
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {

  return (
    <div style={{height: '100vh' }}>
      <ClientOnly fallback="{<p">Loading...</p>}>
        {() => <ReactGantt
          tasks={{/* ... */]}
          links={{/* ... */]}
        />}
      </ClientOnly>
    </div>
  );
}
~~~

이 패턴은 컴포넌트가 브라우저에서 하이드레이션될 때까지 렌더링을 지연시켜 SSR 문제를 방지합니다.

다음 단계
-------------------

- ReactGantt 구성에 대한 자세한 내용은 [이 문서](integrations/react/configuration-props.md)를 참조하세요.
- 고급 사용법은 [DHTMLX Gantt 문서](guides.md)를 참고하세요.


