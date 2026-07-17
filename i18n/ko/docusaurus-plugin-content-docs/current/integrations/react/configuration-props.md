---
title: ReactGantt에서 DHTMLX Gantt 속성 사용
sidebar_label: 구성
description: "Gantt 구성, 템플릿, 이벤트 및 데이터 저장소에 매핑된 래퍼 props의 전체 참조"
---

# ReactGantt에서 DHTMLX Gantt 속성 사용하기

이 페이지는 React Gantt가 수용하는 props와 그것들이 DHTMLX Gantt 기능에 어떻게 매핑되는지 설명합니다.

## 사용 가능한 속성

<table>
  <thead>
  <tr>
  <th>속성</th>
  <th>유형</th>
  <th>설명</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>tasks</td>
  <td>Task[]</td>
  <td>작업 객체의 배열([작업 객체](guides/supported-data-formats.md)).</td>
  </tr>
  <tr>
  <td>links</td>
  <td>Link[]</td>
  <td>링크 객체의 배열([링크 객체](guides/supported-data-formats.md)).</td>
  </tr>
  <tr>
  <td>templates</td>
  <td>GanttTemplates</td>
  <td>Overrides [gantt.templates](api/other/templates.md), 예: [task_text](api/template/task_text.md), [task_class](api/template/task_class.md), [scale_cell_class](api/template/scale_cell_class.md).</td>
  </tr>
  <tr>
  <td>config</td>
  <td>GanttConfig</td>
  <td>Merged into [gantt.config](api/overview/properties-overview.md), 예: [scales_config](api/config/scales.md), [columns_config](api/config/columns.md), [autosize_config](api/config/autosize.md).</td>
  </tr>
  <tr>
  <td>calendars</td>
  <td>Calendar[]</td>
  <td>작업 캘린더 배열. 예: [Working Calendars](integrations/react/overview.md#working-calendars).</td>
  </tr>
  <tr>
  <td>resources</td>
  <td>Resource[]</td>
  <td>[resource 객체](/guides/resource-management#manual-creation-of-data-store)의 배열.</td>
  </tr>
  <tr>
  <td>baselines</td>
  <td>Baseline[]</td>
  <td>[baseline 객체](/guides/inbuilt-baselines#loading-baselines-with-tasks)의 배열.</td>
  </tr>
  <tr>
  <td>markers</td>
  <td>Marker[]</td>
  <td>[타임라인 마커](/guides/markers)을 위한 마커 객체 배열.</td>
  </tr>
  <tr>
  <td>plugins</td>
  <td>GanttPlugins</td>
  <td>활성화가 필요한 [Gantt 확장](/guides/extensions-list/): 예: [critical_path](/guides/critical-path/), [auto_scheduling](/guides/auto-scheduling/).</td>
  </tr>
  <tr>
  <td>data</td>
  <td>( load?: string, save?: string|RouterFunction, batchSave?: BatchChanges)</td>
  <td>내장된 Gantt 전송을 통해 데이터를 로드하고 Gantt 데이터 변경에 대한 콜백을 제공합니다.</td>
  </tr>
  <tr>
  <td>locale</td>
  <td>string</td>
  <td>[gantt.i18n.setLocale(locale)](/guides/localization/)를 설정합니다. 기본값은 "en".</td>
  </tr>
  <tr>
  <td>theme</td>
  <td>string</td>
  <td>[gantt.setSkin(theme)](/guides/skins/)를 적용합니다. 기본값은 "terrace".</td>
  </tr>
  <tr>
  <td>customLightbox</td>
  <td>ReactElement | null</td>
  <td>내장 Lightbox를 대체하는 React 컴포넌트(참조: [Custom Lightbox](/guides/custom-edit-form/)).</td>
  </tr>
  <tr>
  <td>inlineEditors</td>
  <td>( [editorType: string]: React.ComponentType )</td>
  <td>DHTMLX의 인라인 에디터 인터페이스에 React 기반 인라인 에디터를 매핑할 수 있게 합니다.</td>
  </tr>
  <tr>
  <td>groupTasks</td>
  <td>GroupConfig | boolean | null</td>
  <td>그룹화 구성 객체 또는 그룹화를 비활성화하려면 false/null(참조: [Grouping Tasks ](api/method/groupby.md)).</td>
  </tr>
  <tr>
  <td>filter</td>
  <td>((task: Task) =&gt; boolean) | null</td>
  <td>Gantt 작업을 필터링하는 데 사용되는 함수.</td>
  </tr>
  <tr>
  <td>resourceFilter</td>
  <td>((resource: Resource) =&gt; boolean) | null</td>
  <td>자원 패널을 위한 자원을 필터링하는 데 사용되는 함수.</td>
  </tr>
  <tr>
  <td>modals</td>
  <td>GanttModals</td>
  <td><code>onBeforeTaskDelete</code> 및 <code>onBeforeLinkDelete</code> 모달을 커스텀 컴포넌트로 교체할 수 있습니다.</td>
  </tr>
  <tr>
  <td>htmlTemplatePolicy</td>
  <td>HtmlTemplatePolicy</td>
  <td>템플릿 함수에서 반환된 문자열 값을 렌더링하는 방식을 제어합니다. <code>"basic-sanitize"</code> (기본값)은 화이트리스트에 따라 반환된 HTML을 정화합니다: 안전한 포맷, 클래스, 제한된 인라인 스타일, <code>data-*</code> 속성 및 <code>img</code>가 유지되며 스크립트, 이벤트 핸들러 및 위험한 URL은 제거됩니다. <code>"escape"</code>는 문자열을 텍스트로 렌더링하고, <code>"unsafe-html"</code>은 원시 문자열로 렌더링합니다(버전 10 이전 동작); <code>mode: "sanitize"</code>와 <code>sanitize(html)</code> 함수를 갖는 사용자 정의 정화 객체를 통해 DOMPurify와 같은 라이브러리를 연결할 수 있습니다. 템플릿별 제어는 개별 템플릿 함수를 내보낸 <code>allowRawHTML()</code> 도우미로 래핑하여 사용합니다. [Migration notes](/migration#91---100).를 참조하세요.</td>
  </tr>
  <tr>
  <td>(Event Props)</td>
  <td>Function</td>
  <td>DHTMLX Gantt 이벤트에 대응하는 이벤트 핸들러 prop 전달도 래퍼에서 지원합니다. 예: onTaskClick, onAfterTaskAdd 등. prop 이름이 이벤트 이름과 일치하면 자동으로 연결됩니다.</td>
  </tr>
  </tbody>
</table>

## 타입 내보내기

`@dhx/react-gantt` 패키지는 응용 프로그램 코드를 주석화하는 데 사용할 수 있는 여러 TypeScript 타입을 재_EXPORT합니다:

| 내보낸 이름 | 설명 |
|--------|------------|
| `Task` | 내부 Gantt 작업 객체. 날짜는 `Date` 객체이며, `$` 접두사의 시스템 속성을 포함합니다. 이벤트 핸들러 내에서 또는 Gantt가 소유한 데이터 작업 시 사용합니다. |
| `Link` | 내부 Gantt 링크 객체. 이벤트 핸들러 내에서 및 Gantt가 소유한 데이터를 다룰 때 사용합니다. |
| `SerializedTask` | 스토어 상태, 초기 데이터 및 저장 콜백 페이로드에 대한 사용자용 작업 형태. 날짜 속성은 `Date | string`을 허용합니다. |
| `SerializedLink` | 스토어 상태, 초기 데이터 및 저장 콜백 페이로드에 대한 사용자용 링크 형태. |

**언제 `SerializedTask` / `SerializedLink`를 vs `Task` / `Link`를 사용할지:**  

- **`SerializedTask` / `SerializedLink`** - 사용자가 소유한 데이터: 스토어 상태, API 응답, 초기 데이터 리터럴. 날짜 필드는 문자열(예: ISO 날짜)을 허용합니다.  
- **`Task` / `Link`** - Gantt가 소유하는 데이터: 이벤트 핸들러 내에서, Gantt가 데이터를 파싱한 이후의 형태. 날짜 필드는 `Date` 객체입니다. `Task`에는 `$` 접두사의 내부 속성이 포함됩니다.

## 예시 사용법

~~~jsx
<ReactGantt
  tasks={tasks}
  links={links}
  theme="material"
  locale="en"
  config={{
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%M" }
    ],
    columns: [
      { name: "text", tree: true, width: '*' },
      { name: "start_date", align: "center" },
      { name: "duration", align: "center" },
      { name: "add" }
    ],
    // 원하는 다른 gantt.config 설정
  }}
  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}
  templates={{
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
  }}
/>
~~~

## 이벤트 속성 사용하기

다음과 같이 DHTMLX Gantt 이벤트에 해당하는 이벤트 핸들러를 prop으로 전달할 수 있습니다. 예를 들면:

~~~js
<ReactGantt

  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}

/>
~~~
내부적으로 래퍼는 prop 이름이 `onBeforeTaskAdd`인 경우 [gantt.attachEvent("onBeforeTaskAdd", handler)](api/method/attachevent.md)를 호출합니다. 전체 이벤트 목록은 [DHTMLX Gantt API](api/overview/events-overview.md)를 참조하세요.

## Props와 DHTMLX API의 결합

`@dhx/react-gantt` 라이브러리는 일상 사용을 위해 가능한 한 선언적(declarative)으로 설계되었습니다. 대부분의 사용 사례는 표준 props(예: tasks, links, resources, templates 등)로 해결될 수 있습니다. 그러나 Gantt 엔진에 더 깊게 접속해야 하는 시나리오가 있을 수 있습니다. 예를 들어:

- 작업 시간 계산(worktime Calculations)
- 자동 스케줄링(auto scheduling) 로직 또는 자원 계산과 같은 고급 기능
- Gantt API의 특정 메서드 호출

이러한 경우 underlying DHTMLX Gantt 기능에 접근하기 위해 두 가지 추가 접근 방식을 사용할 수 있습니다:

- wrapper가 특별히 제공하는 **[React hooks](integrations/react/hooks.md)** 를 이용해 Gantt의 데이터 저장소와 스케줄링 로직을 연결
- 내장 훅이 모든 요구를 커버하지 않는 경우, ref를 통한 Gantt 인스턴스에 대한 직접 접근

### 내장 훅 사용

`@dhx/react-gantt` 라이브러리는 이벤트 구독, 자원 관리, 데이터스토어 접근, 실행 취소/다시 실행, 확대/축소, 선택, 작업 시간 계산 등에 대한 훅을 제공합니다.

완전한 참조는 전용 페이지 **[Hooks](integrations/react/hooks.md)** 를 참조하세요. 예를 들면:

- [useGanttEvent](integrations/react/hooks.md#useganttevent) - 생명주기 관리가 포함된 이벤트 구독
- [useResourceAssignments](integrations/react/hooks.md#useresourceassignments) - 자원 할당 조회 및 변경
- [useGanttDatastore](integrations/react/hooks.md#useganttdatastore) - 읽기 전용 데이터스토어 접근
- [useUndoRedo](integrations/react/hooks.md#useundoredo) - 실행 취소/다시 실행 상태 및 동작
- [useZoom](integrations/react/hooks.md#usezoom) - 확대/축소 컨트롤 및 상태
- [useSelection](integrations/react/hooks.md#useselection) - 작업 선택 추적
- [useWorkTime](integrations/react/hooks.md#useworktime) - 작업 시간 계산

### ref를 통한 Gantt 인스턴스에 직접 접근

훅이 대부분의 고급 요구를 다루지만, 전체 Gantt 인스턴스에 대한 직접 접근이 필요할 수 있습니다. 이 경우 여전히 ref 방식을 사용할 수 있습니다:

~~~tsx
import { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;
    gantt.showDate(new Date());
  }, []);

  return <ReactGantt ref={ganttRef} tasks={tasks} links={links} />;
}
~~~

:::note
직접 Gantt 인스턴스를 사용해 작업이나 링크를 수정하고, 동시에 React props로 다시 제공하는 경우에는 동기화를 유지하세요. 그렇지 않으면 다음 React 렌더링에서 수동 변경 사항이 덮어씌워질 수 있습니다.
:::

자세한 내용은 [Accessing the Underlying Gantt API](integrations/react/overview.md#accessingtheunderlyingganttapi)를 참고하세요.