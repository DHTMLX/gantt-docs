---
title: React Gantt 개요
sidebar_label: 개요
description: "공식 React 래퍼의 개요: 기능, props, 테마, 이벤트 및 기본 Gantt API에 접근"

---

# React Gantt 개요

:::note
React Gantt는 [Commercial, Enterprise 및 Ultimate 라이선스](https://dhtmlx.com/docs/products/licenses.shtml) 하에서 이용 가능합니다.  
Gantt의 Individual 또는 GPL 에디션을 사용하는 경우 React에 대한 [시작 방법](integrations/react/js-gantt-react.md) 문서를 참조해 주십시오.
:::

## 개요

DHTMLX Gantt는 모든 브라우저 환경에서 작동할 수 있는 순수 JS 컴포넌트입니다. Gantt의 상용 및 그 이상 에디션에는 DHTMLX Gantt를 래핑하는 **React Gantt** 컴포넌트가 포함되어 있어 React에서 네이티브하게 사용할 수 있습니다.

래퍼를 사용하면 React 애플리케이션에서 친숙한 props/상태 모델을 이용해 완전한 기능의 Gantt 차트를 만들 수 있습니다. 내부적으로 표준 DHTMLX Gantt 인스턴스를 관리하면서, React의 props(예: tasks, config 등)를 해당 Gantt 초기화 및 데이터 구조에 대응되도록 변환합니다.

**주요 특징**

- 선언적 데이터 처리: 작업, 연결, 자원 등 배열을 props로 전달
- 구성 가능: React props를 기본 gант.config, gantt.templates, gantt.plugins 등에 매핑
- 전체 Gantt API 접근: ref를 사용해 [getTask](api/method/gettask.md), [updateTask](api/method/updatetask.md), [addTaskLayer](api/method/addtasklayer.md) 와 같은 메서드를 호출
- 손쉬운 커스터마이징: 템플릿, 라이트박스 양식, 인라인 편집기에 React 컴포넌트 사용

DHTMLX Gantt에 익숙하지 않은 경우, [DHTMLX Gantt 문서](guides.md)에서 [Work Time Calculation](guides/working-time.md), [Auto Scheduling](guides/auto-scheduling.md), [Resource Management](guides/resource-management.md) 등을 포함한 기능 개요를 확인하십시오.

:::tip AI-assisted development
AI 코딩 보조 도구를 사용하는 경우, [DHTMLX React Gantt 에이전트 스킬](integrations/ai-tools/agent-skills.md#available-skills)이 올바른 통합 패턴을 따르고 일반적인 실수를 피하는 데 도움이 될 수 있습니다. 실시간 API 참조를 원하면 [DHTMLX MCP 서버](integrations/ai-tools/mcp-server.md)에 연결하십시오.
:::

## 설치 및 NPM 접근

평가판과 Professional 빌드 모두의 최신 설치 지침 및 npm 레지스트리 구성, 오프라인 예제를 포함한 내용은 [Installation Guide](integrations/react/installation.md)를 참조하십시오.

패키지를 설치한 후, 아래와 같이 React 코드에서 래퍼를 임포트할 수 있습니다:

~~~ts
// Evaluation build (public npm)
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

// Professional build (private npm)
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
~~~

## 버전 요건

- React v18.0.0 이상

## 기본 사용법

다음은 Gantt 차트를 임포트하고 렌더링하는 최소한의 예제입니다:

~~~jsx
import { useState } from 'react';
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
import { demoData } from './DemoData'

export default function BasicGantt() {
  const [theme, setTheme] = useState("terrace");
  const [tasks, setTasks] = useState(demoData.tasks);
  const [links, setLinks] = useState(demoData.links);

  return (
    <div style={ { height: '500px' }}>
      <ReactGantt
        tasks={tasks}
        links={links}
        theme={theme}
      />
    </div>
  );
}
~~~

참고로 위 예제는 상업용 Gantt 버전을 포함하는 방법을 보여줍니다. 트라이얼 소스 코드를 사용하려면 아래와 같이 패키지를 포함하십시오:

~~~js
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
~~~

여기서 **demoData**는 다음 [형식](guides/loading.md)을 가지고 있습니다:

~~~js
export const demoData = {
  tasks: [
    { id: 1, text: "Product Launch", type: "project", open: true, parent: 0},
    { id: 2, text: "Planning Phase", type: "project", open: true, parent: 1},
   	{ id: 3, text: "Requirement Gathering", type: "task", progress: 0.2, 
      start_date: "01-06-2025", duration: 3, parent: 2},
    { id: 4, text: "Technical Feasibility", type: "task", progress: 0.4, 
      start_date: "04-06-2025", duration: 2, parent: 2},
    { id: 5, text: "Implementation Phase", type: "project", progress: 0.1, 
      open: true, start_date: "08-06-2025", duration: 10, parent: 1},
    { id: 6, text: "Prototype Development", type: "task", progress: 0.0, 
     start_date: "08-06-2025", duration: 4, parent: 5},
    { id: 7, text: "Feature Testing", type: "task", progress: 0.0, 
     start_date: "12-06-2025", duration: 4, parent: 5},
    { id: 8, text: "Go-Live Milestone", type: "milestone", progress: 0, 
     start_date: "18-06-2025", duration: 0, parent: 1}
  ],
  links: [
    { id: 1, source: 3, target: 4, type: "0" },
    { id: 2, source: 4, target: 5, type: "0" },
    { id: 3, source: 6, target: 7, type: "0" },
    { id: 4, source: 7, target: 8, type: "0" }
  ]
};
export {demoData};
~~~

## 바인딩 데이터 {#bindingdata}

**React Gantt** 래퍼는 데이터를 로드하고 저장하는 다양한 방법을 제공합니다. 개념적으로, Gantt 데이터 변경을 관리하는 두 가지 기본 접근 방식이 있습니다:

- React(또는 상태 관리 도구)를 진실의 원천으로 사용
- Gantt 자체를 진실의 원천으로 사용

어느 쪽이든 유효하지만, 예기치 않은 동작을 피하려면 하나의 방식으로 일관되게 선택해야 합니다.

:::info 깊이 있는 설명이 필요하신가요?

이 섹션은 두 바인딩 모델에 대한 고수준 개요를 제공합니다.
더 자세한 가이드와 전체 예제는 [](integrations/react/state/state-management-basics.md)를 참조하십시오.
:::

### React(또는 상태 관리자)를 진실의 원천으로
이 패턴에서 **ReactGantt**는 모든 task/link 데이터를 props에서 받습니다(`useState`, Redux, Zustand 등에서 가져옴). 차트에서 사용자가 작업이나 링크를 수정하면 Gantt가 `data.save` 콜백을 호출합니다. 이 콜백에서 애플리케이션 상태를 업데이트합니다. 상태가 변화하면 React가 **ReactGantt**를 다시 렌더링하고, Gantt 인스턴스는 최신 데이터와 동기화됩니다.

~~~tsx
import { useMemo, useState } from 'react';
import ReactGantt, { type Task, type Link } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

export function MyGanttApp({ initialTasks, initialLinks }: {
  initialTasks: Task[];
  initialLinks: Link[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const data = useMemo(
    () => ({
      save: (entity: string, action: string, item: any, id: string | number) => {
        if (entity === 'task') {
          setTasks((prev) => {
            if (action === 'create') return [...prev, item as Task];
            if (action === 'update') return prev.map((task) =>
              task.id === id ? (item as Task) : task
            );
            if (action === 'delete') return prev.filter((task) => task.id !== id);
            return prev;
          });
        }

        if (entity === 'link') {
          setLinks((prev) => {
            if (action === 'create') return [...prev, item as Link];
            if (action === 'update') return prev.map((link) =>
              link.id === id ? (item as Link) : link
            );
            if (action === 'delete') return prev.filter((link) => link.id !== id);
            return prev;
          });
        }
      },
    }),
    []
  );

  return (
    <ReactGantt
      tasks={tasks}
      links={links}
      data={data}
    />
  );
}
~~~

이 접근 방식은 React(또는 전역) 상태를 단일 진실의 원천으로 만듭니다. Redux Toolkit, Zustand, MobX, Jotai, XState, Valtio 등의 상태 관리 도구와 자연스럽게 작동합니다. 단지 `useState`를 저장소 훅/셀렉터로 교체하고 업데이트 로직을 저장소로 옮기면 됩니다.

더 많은 예제(특정 관리 도구와의 통합 포함)는 [React 상태를 진실의 원천으로](integrations/react/state/state-management-basics.md#reactstateasthesourceoftruth)를 참고하십시오.

### Gantt를 진실의 원천으로
이 접근 방식에서 **Gantt 자체**가 데이터의 권위 있는 사본을 보유합니다. 여전히 prop나 URL을 통해 작업과 연결을 초기화하거나 로드하지만, 차트가 실행 중일 때 변경 사항은 내부적으로 처리되어 백엔드나 커스텀 핸들러로 업데이트가 전달되며 매 편집마다 React 상태를 거치지 않습니다.

~~~tsx
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

export function GanttTransportExample() {
  return (
    <ReactGantt
      data={{
        load: '/api/gantt/data',  // Gantt가 이 엔드포인트에서 작업/연결을 로드
        save: '/api/gantt/data',  // Gantt가 변경사항을 이곳으로 보냄
      }}
    />
  );
}
~~~

이 모드에서는:

- 로컬 Gantt 인스턴스가 현재 데이터의 기본 보유자입니다
- React는 모든 작업/연결 변경 시마다 재렌더링하지 않습니다
- Auto Scheduling과 같은 대량 작업은 React 업데이트를 반복적으로 트리거하지 않으므로 비용이 더 저렴합니다

만약 React 상태에 작업/연결의 표현을 여전히 남겨두고 있다면, Gantt의 내부 상태를 오래된 데이터로 덮어쓰지 않도록 주의하십시오.

자세한 내용은 [Gantt를 진실의 원천으로](integrations/react/state/state-management-basics.md#ganttasthesourceoftruth)를 참조하십시오.

## 구성 및 속성

React 래퍼는 `config` 속성(gantt.config에 매핑)과 `templates` 속성(gantt.templates에 매핑)을 받습니다.

~~~js
<ReactGantt
  tasks={tasks}
  links={links}
  config= {{
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
        template: (task) => <AlertButton task={task} onClick={handleButtonClick} />,
        resize: true,
      },
      { name: "add", width: 44 },
    ],
  }}
  templates= {{
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
    task_class: (start, end, task) => {
      return task.priority === 'high' ? 'highlight-task' : '';
    },
  }}
/>
~~~

### React 컴포넌트를 템플릿에서 사용하기

prop에서 템플릿을 지정할 때 템플릿 함수로부터 React 요소를 반환할 수 있습니다:

~~~js
function PriorityBadge({ priority }) {
  return <span style={{color: 'red' }}>{priority}</span>;
}

<ReactGantt
  templates={{
    task_text: (start, end, task) => {
      return <PriorityBadge priority={task.priority} />;
    }
  }}
/>
~~~

:::note
내부적으로 DHTMLX Gantt는 DOM을 비-React 방식으로 조작합니다. 템플릿에서 React 컴포넌트를 반환하면 포털을 통해 Gantt의 HTML에 삽입됩니다. 다량의 데이터셋에서 복잡한 React 컴포넌트를 렌더링하면 성능에 영향을 줄 수 있다는 점을 염두에 두십시오.
:::

템플릿을 통해 많은 측면을 재정의할 수 있습니다:

- [task_text](api/template/task_text.md), [task_class](api/template/task_class.md)로 막대를 제어
- 타임스케일 형식 지정은 타임라인 헤더의 날짜 형식을 위한 것(가이드: dateformat)
- 왼쪽 그리드 셀에 대한 열 템플릿도 가능
- 그 외 다양한 가이드를 참조하십시오: guides

React Gantt에서 지원하는 전체 속성 목록은 아래 기사에서 확인할 수 있습니다: [](integrations/react/configuration-props.md)

## 테마 및 스타일링

Gantt는 여러 내장 테마를 제공하며, `theme` 속성으로 활성화하고 동적으로 변경할 수 있습니다:

~~~jsx
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
    <div style={{height: '600px'}}>
      <div>
        <button onClick={switchTheme}>Switch Theme</button>
      </div>
      <ReactGantt
        tasks={tasks}
        links={links}
        theme={theme}  /*!*/
      />
    </div>
  );
}
~~~

기존 테마에 대한 자세한 설명은 [이 문서](guides/skins.md)를 참조하십시오.

또한 사용자 정의 스타일과 CSS 변수 재정의를 통해 테마를 추가로 커스터마이즈할 수 있습니다:

~~~css
:root {
    --dhx-gantt-task-background: #d96c49;
    --dhx-gantt-task-color: #fff;
    --dhx-gantt-task-border-radius: 8px;
}
~~~

추가 구성은 [Skins Customization](guides/custom-skins.md) 가이드를 확인하십시오.

## 라이트박스 교체

DHTMLX Gantt는 구성 가능한 기본 내장 작업 편집기인 [Lightbox](guides/default-edit-form.md)를 제공합니다.

필요한 경우 React 기반 모달 또는 다른 컴포넌트로 교체할 수 있으며 아래 중 하나의 방법으로 구현할 수 있습니다:

### `customLightbox` 속성으로 커스텀 컴포넌트 제공

다음과 같이 **customLightbox** 속성에 컴포넌트를 전달합니다:

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
      <div style={modalStyles.overlay} onClick={onCancel} />
      <div style={modalStyles.content}>
        <h3>Edit Task</h3>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{width: '100%', padding: '8px', marginTop: '10px' }}
          />
        </div>
        <div style={modalStyles.buttonGroup}>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CustomLightbox;
~~~

그 후 아래와 같이 추가 컴포넌트를 사용합니다:

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
      ref={ganttRef}
      tasks={tasks}
      links={links}
      customLightbox={<CustomLightbox />} />
  );
}
~~~

### `onBeforeLightbox` 이벤트 속성으로 제어하기

더 복잡한 시나리오의 경우, [onBeforeLightbox](api/event/onbeforelightbox.md) 이벤트가 호출될 때 기본 동작을 오버라이드할 수 있습니다:

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
      ref={ganttRef}
      tasks={tasks}
      links={links}
      onBeforeLightbox={handleTaskEdit} />
  );
}
~~~

### JS Gantt API 사용

빌트인 Lightbox를 재정의하거나 확장하는 방법에 대한 자세한 내용은 [Custom Lightbox](guides/custom-edit-form.md) 문서를 참조하십시오.

## 내장 모달 대체

기본 UI에는 두 개의 모달 팝업이 포함되어 있습니다.

- 작업 삭제 전 표시되는 확인 대화상자
- 연결 삭제 전 표시되는 확인 대화상자

두 모달은 ReactGantt의 `modals` 속성으로 대체할 수 있습니다:

~~~js
<ReactGantt
  ...
  modals={{
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
  }}
  ...
/>
~~~

이 속성들을 사용하여 Gantt가 확인 대화 상자를 호출할 때마다 커스텀 모달을 활성화할 수 있습니다. 인수로 제공된 `callback()`을 호출하면 해당 작업이나 연결의 삭제를 확정합니다. 삭제를 취소하려면 모달을 닫고 콜백을 호출하지 마십시오.

## 그리드에서의 React 컴포넌트 사용

### 헤더에서

그리드 열의 **label** 속성은 문자열(string) 또는 ReactElement일 수 있습니다. 이를 통해 열 머리에 React 기반의 필터, 버튼 또는 기타 UI를 직접 삽입할 수 있습니다:

~~~js
const config: GanttConfig = {
  columns: [
    { name: "text", label: "Name", tree: true, width: 180, 
        resize: true },
    // React 요소를 직접 삽입
    { name: "start_date", label: <DateFilter />, width: 150, 
        align: "center", resize: true },
    // 또는 React 요소를 반환하는 함수 사용
    { name: "end_date", label: () => <DateFilter />, width: 150, 
        align: "center", resize: true },
    ...
  ],
  row_height: 40,
  grid_width: 550,
};
~~~

래퍼가 레이블이나 템플릿 속성에서 React 요소를 감지하면, 이 요소를 React Portal을 사용해 그리드 헤더 셀에 렌더링합니다.

### 셀에서

그리드 셀은 열의 **template** 속성으로 정의됩니다. 이 템플릿 함수는 작업 객체를 받아 문자열 또는 ReactElement를 반환해야 합니다:

~~~jsx
import { useRef } from 'react';

function AlertButton({ task, onClick }) {
  return <button onClick={onClick}>{`Task ID: ${task.id}`}</button>;
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
        // React 요소 반환
        template: (task) => (
          <AlertButton
            task={task}
            onClick={() => {
              handleButtonClick(task);
              // 필요시 task 재렌더링 강제
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

  return <ReactGantt ref={ganttRef} config={config} /* ...other props */ />;
}
~~~

열 템플릿에서 React 요소를 반환하면 각 셀에 완전히 상호 작용 가능한 콘텐츠(버튼, 드롭다운, 배지 등)를 만들 수 있습니다. 내부적으로 래퍼는 이 요소들을 Gantt가 관리하는 DOM 노드에 포털로 삽입합니다.

### 인라인 편집기에서

DHTMLX Gantt는 그리드 셀에 대한 [인라인 편집](guides/inline-editing.md)을 지원합니다. 이 React 래퍼에서는 `inlineEditors` 속성으로 매핑된 편집기 이름에 대응하는 커스텀 React 편집기를 제공할 수 있습니다. 아래 예제를 참고하십시오.

다음과 같이 React 기반의 인라인 편집기 컴포넌트를 정의합니다:

~~~jsx
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
                value={value}
                onChange={e => setValue(e.target.value)}
                autoFocus
            />
        );
    }
);

export default MyInlineEditor;
~~~

커스텀 편집기를 Gantt 구성에 사용합니다:

~~~jsx
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
      config={config}
      inlineEditors={{
        customInputEditor: MyInlineEditor  /*!*/
      } }
      tasks={[/*...*/]}
      links={[/*...*/]}
    />
  );
}
~~~

사용자가 열 열을 더블클릭하면, Gantt가 제자리에 편집기를 표시합니다. 래퍼의 내부 코드는 `useImperativeHandle(ref, ...)`로 노출한 메서드들(getValue, setValue 등)을 호출하여 편집기 변경 사항과 Gantt 인스턴스가 동기화되도록 보장합니다.

편집기 객체의 `type` 값은 `inlineEditors`의 키와 일치해야 합니다. 

또한 편집기의 `map_to` 속성은 편집기가 값을 읽고 쓸 Task 객체의 속성을 지정합니다. 인라인 편집에 대해 자세한 내용은 [인라인 편집](guides/inline-editing.md)을 참조하십시오.

Task의 속성에 값을 쓰는 것보다 더 복잡한 편집기를 구현하는 경우에는, 저장 로직을 구현하고 입력의 `map_to` 옵션을 `"auto"`로 지정해야 합니다. 이 경우 Gantt는 작업 객체를 직접 수정하지 않고, 편집기에서 변경 사항을 적용할 때만 저장 함수를 호출합니다. 편집기의 `initialValue`는 `null`로 전달됩니다.

:::note
참고로 비-React 인라인 편집기를 구성하려면 **config**의 `editor_types` 속성을 사용할 수 있습니다.
:::

#### 편집기 컴포넌트 속성

- <span class="subproperty">**initialValue**</span> - (*any*) - 편집기의 초기 값
- <span class="subproperty">**task**</span> - (*Task*) - 편집 중인 작업
- <span class="subproperty">**save**</span> - (*function*) - 편집기를 저장하고 닫도록 Gantt에 알림
- <span class="subproperty">**cancel**</span> - (*function*) - 저장 없이 편집기를 닫도록 Gantt에 알림
- <span class="subproperty">**ganttInstance**</span> - (*GanttStatic*) - 기본 Gantt 객체의 현재 인스턴스

## 필터링

작업 목록에서 표시할 필터를 지정하려면 `filter` 속성을 사용합니다:

~~~jsx
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
    filter={filter}
    ...
  />
);

~~~
리소스를 [Resource Panel](guides/resource-management.md)에서 필터링하려면 `resourceFilter` 속성을 사용하십시오:

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
    ref={ganttRef}
    tasks={tasks}
    links={links}
    resources={resources}
    resourceFilter={resourceFilter}
    config={config}
    templates={templates}
    plugins={{auto_scheduling: true }}
  />
);

~~~

## 근무 시간 달력

ReactGantt에서 작업 시간 계산을 활성화하려면 [work_time](api/config/work_time.md)을 활성화하십시오:

~~~js
  const config: GanttConfig = {
    ...
    work_time: true
  };
~~~

근무 시간 달력은 `calendars` 속성을 통해 ReactGantt에 전달될 수 있습니다:

~~~jsx
const calendars: Calendar[] = [
  {
    id: "global",
    hours: ["8:00-12:00", "13:00-17:00"], // 평일의 글로벌 근무 시간
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
      calendars={calendars}
      ...
    />
  </div>
);

~~~

작업 시간 하이라이트 또는 작업 시간 계산을 수행하려면 제공된 `useWorkTime` 훅을 사용할 수 있습니다:

~~~jsx
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
      hours: ["8:00-12:00", "13:00-17:00"], // 평일의 글로벌 근무 시간
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
        calendars={calendars}
        templates={templates}
        config={config}
        ref={ganttRef}
      />
    </div>
  );
};

~~~

또는 [내부 Gantt 객체](#accessingtheunderlyingganttapi)에 접근하고 직접 [작업 시간](guides/working-time.md) 메서드를 사용할 수 있습니다.

## 작업 그룹화 {#groupingtasks}

작업을 어떤 속성으로든 그룹화하려면 `groupTasks` 속성을 사용합니다:

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
    ref={ganttRef}
    tasks={tasks}
    links={links}
    groupTasks={grouping}
  />
);
~~~

그룹화를 비활성화하려면 `groupTasks`를 `false`로 설정합니다:

~~~js
setGrouping(false);
~~~

## 타임라인 영역의 수직 마커

[Vertical markers](guides/markers.md)는 `markers` 속성을 통해 ReactGantt에 추가될 수 있습니다:

~~~jsx
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
        markers={markers}
        ...
      />
    </div>
  );
~~~

:::note
Marker 객체의 **text** 속성은 HTML 문자열 또는 React 엘리먼트 둘 다를 허용합니다.
:::

## 기본 Gantt API에 접근 {#accessingtheunderlyingganttapi}

대부분의 경우 ReactGantt의 props만으로 차트를 구성하기에 충분합니다. 하지만 고급 작업(예: 작업 시간 계산, gantt.showDate, gantt.unselectTask, 커스텀 줌 등)을 위해 DHTMLX Gantt API에 직접 접근해야 할 때가 있습니다.

### 내장 훅 사용

ReactGantt는 Gantt API의 몇 가지 메서드를 노출하는 사용 가능한 훅을 제공합니다. 관련 문서는 [](integrations/react/configuration-props.md)를 확인하십시오.

### Ref 사용

선언형 props와 내장 훅만으로 충분하지 않은 경우, 래퍼를 통해 내부 Gantt 인스턴스에 접근할 수 있습니다(`ref` 사용):

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // 여기에 임의의 Gantt API 메서드를 호출할 수 있습니다
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
    />
  );
}
~~~

전체 메서드 목록은 DHTMLX Gantt [API Reference](api/overview/methods-overview.md)를 참조하십시오.

#### React 속성과의 충돌 피하기

- 코드에서 `gantt.parse({ tasks, links })`를 수동으로 호출하거나 `gantt.addTask()`를 호출하는 경우, React props를 동기화해 두어야 할 필요가 있습니다. 그렇지 않으면 React가 다음 렌더링 시 수동 변경 사항을 덮어쓸 수 있습니다.
- 권장 접근 방식은 태스크/링크에 대해 래퍼의 props를 의존하거나 React 상태에서 관리한 다음, 래퍼가 다시 구문 분석하도록 하는 것입니다.

## SSR 프레임워크 호환성(Next.js, Remix)

:::note
ReactGantt v9.0.12부터 래퍼가 SSR-ready합니다. Next.js나 Remix에서 SSR을 끄지 않고도 임포트하여 사용할 수 있습니다. 이전 버전을 사용하는 경우, ReactGantt를 사용하는 경로 또는 컴포넌트에 대해 서버 사이드 렌더링을 비활성화하거나 지연해야 합니다.
:::

:::note
서버 렌더링 중에는 컴포넌트가 단순한 자리 표시자 `<div>`만 출력하고, 실제 Gantt 마크업은 브라우저 측 하이드레이션 단계에서 생성됩니다.
:::

#### Next.js

ReactGantt는 SSR-호환이지만, 실제 상황에서는 대부분의 경우 사용할 컴포넌트가 클라이언트 컴포넌트여야 합니다.

Gantt 인스턴스에 접근하기 위해 `ref`를 사용하거나 이벤트 핸들러/콜백을 전달하거나 템플릿에서 React 요소를 반환하는 경우 상단에 `\"use client\"`를 추가해야 합니다.

일반적인 구성 예:

~~~jsx
'use client';

import "@dhx/react-gantt/dist/react-gantt.css";
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <ReactGantt tasks={/* ... */} links={/* ... */} />
    </div>
  );
}
~~~

레거시 버전(v9.0.11 이하)을 사용하는 경우 SSR을 비활성화한 상태로 ReactGantt 컴포넌트를 동적으로 가져와야 합니다:

~~~jsx
import dynamic from 'next/dynamic';

const GanttDemo = dynamic(() => import('../components/GanttDemo'), {
  ssr: false
});

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <GanttDemo />
    </div>
  );
}
~~~


#### Remix

v9.0.12부터는 `<ClientOnly>` 래퍼가 필요하지 않습니다:

~~~js

import "@dhx/react-gantt/dist/react-gantt.css";
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <ReactGantt tasks={/* ... */} links={/* ... */} />
    </div>
  );
}
~~~


레거시 버전(v9.0.11 이하)을 사용하는 경우 클라이언트에서만 Gantt 컴포넌트를 렌더링하도록 조건부로 처리해야 합니다:

~~~jsx
import { ClientOnly } from 'remix-utils/client-only';
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {

  return (
    <div style={{height: '100vh' }}>
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => <ReactGantt
          tasks={/* ... */}
          links={/* ... */}
        />}
      </ClientOnly>
    </div>
  );
}
~~~

## 다음 단계

- ReactGantt 구성에 대한 추가 정보는 [이 문서](integrations/react/configuration-props.md)를 참조하십시오
- 고급 사용은 [DHTMLX Gantt 문서](guides.md)를 참조하십시오