---
title: "서버에서 Gantt 사용하기"
sidebar_label: "서버에서 Gantt 사용하기"
---

# 서버에서 Gantt 사용하기

때로는 dhtmlxGantt의 특화된 로직을 간트 차트 자체와 분리하여 사용해야 할 필요가 있습니다. 예를 들어:

- 다른 소스(모바일 앱 등)에서 작업 업데이트를 받아 자동 스케줄링을 실행하여 관련 작업의 일정을 조정해야 할 때
- 여러 사용자가 동시에 변경을 하여 일정의 동기화 및 검증이 필요한 경우
- 서버 사이드 코드로 일정을 계산 및 분석해야 할 때

이러한 상황을 지원하기 위해, Node.js 환경에서 서버 사이드로 실행되는 dhtmlxGantt의 별도 빌드가 제공됩니다.

DHTMLX Gantt for Node.js는 Commercial/Enterprise/Ultimate 패키지와 동일한 기능을 제공하며, 새로운 간트 인스턴스를 생성할 수 있는 **Gantt.getGanttInstance** 메서드도 사용할 수 있습니다.

## 이용 조건

DHTMLX Gantt의 Node.js 서버 모듈은 클라이언트 버전의 애드온입니다. 어떤 상업용 라이선스([Individual](https://dhtmlx.com/docs/products/dhtmlxGantt/individual/), [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/commercial/), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/enterprise/))로 Gantt를 구매할 때 추가 비용을 지불하여 사용할 수 있습니다. [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/ultimate/) 라이선스에는 이 모듈이 기본 포함되어 있습니다.

이미 메인 dhtmlxGantt 라이브러리를 보유하고 있다면, Node.js 모듈을 [별도로 구매](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=58429)할 수 있으며, 서버 사이드 버전의 다운로드 링크가 제공됩니다.

## 버전 관리

dhtmlxGantt의 Node.js 패키지는 브라우저 패키지와 동일한 버전 넘버링 체계를 따릅니다(예: v7.0.0이 Node.js용 첫 버전입니다).

:::note
클라이언트와 서버 모두에서 동일한 버전의 gantt 라이브러리 사용을 권장합니다.
:::

## 프로젝트에 라이브러리 추가하기

dhtmlxGantt for Node.js 패키지는 로컬에 설치할 수 있습니다:

~~~js
"dependencies": {
    "@dhtmlx/gantt-node": "file:../../gantt_7.0.0_node"
    ...
}
~~~

또는 아래와 같이 코드에서 dhtmlxgantt.node.js를 직접 import할 수 있습니다:

~~~js
import { Gantt } from "@dhtmlx/gantt-node";

const gantt = Gantt.getGanttInstance({
    plugins:{
        auto_scheduling: true,
    },
    config: {
        work_time: true,
        duration_unit: "hour",
        auto_scheduling: true,
        auto_scheduling_strict: true,
        auto_scheduling_initial: false
    },
    data: {
        tasks: [
            { id: 1, text: "Project #1", type: "project", parent: 0 },
            { id: 2, start_date: "05-04-2020 00:00", text: "Task #1", duration: 1, 
            parent: 1, type: "task" },
            { id: 3, start_date: "05-04-2020 00:00", text: "Task #2", duration: 3, 
            parent: 1, type: "task" },
            { id: 4, start_date: "05-04-2020 00:00", text: "Task #3", duration: 3, 
            parent: 1, type: "task" },
            { id: 5, start_date: "05-04-2020 00:00", text: "Task #4", duration: 3, 
            parent: 1, type: "task" },
            { id: 6, start_date: "05-04-2020 00:00", text: "Task #5", duration: 1, 
            parent: 1, type: "task" }
        ], 
        links: [
            { id: 1, source: 1, target: 2, type: "0" },
            { id: 2, source: 2, target: 3, type: "0" },
            { id: 3, source: 3, target: 4, type: "0" },
            { id: 4, source: 4, target: 5, type: "0" },
            { id: 5, source: 5, target: 6, type: "0" }
        ]
    },
    events:{
        onAfterAutoSchedule: function(taskId, updatedTasks) {
            console.log("Following tasks were auto scheduled:");
            console.table(updatedTasks.map((taskId) => {
                return {
                    id: taskId,
                    text: this.getTask(taskId).text
                };
            }));
        },
        onParse: function() {
            console.log("Loaded data:")
            console.table(this.serialize().data);
        },
        onGanttReady: () => {
            console.log("Running dhtmlxGantt on the backend");
        }
    }
});

console.table(gantt.serialize());
~~~

## 제한 사항

dhtmlxGantt의 Node.js 버전은 브라우저 버전과 동일한 핵심 API를 제공합니다.

하지만, 일부 클라이언트 사이드 메서드는 서버 라이브러리에서 사용할 수 없거나 동작하지 않습니다. 예를 들어:

- 서버 사이드 렌더링은 지원되지 않습니다. [gantt.render](api/method/render.md), [gantt.refreshData](api/method/refreshdata.md), [gantt.refreshTask](api/method/refreshtask.md) 등과 같은 메서드는 HTML을 생성하지 않지만, [onBeforeGanttRender](api/event/onbeforeganttrender.md), [onGanttRender](api/event/onganttrender.md)와 같은 관련 API 이벤트는 여전히 트리거됩니다.
- [Popup messages API](guides/message-boxes.md)는 포함되어 있지 않습니다. gantt.message, gantt.alert, gantt.confirm과 같은 메서드는 정의되어 있지 않습니다.
- 내장 ajax 헬퍼는 Node.js로 포팅되지 않았으므로 gantt ajax API, [gantt.load](api/method/load.md), 기본 dataProcessor 라우팅은 동작하지 않습니다. 대신 [gantt.parse](api/method/parse.md)를 사용하고 [dataProcessor를 위한 커스텀 라우팅](guides/server-side.md#customrouting)을 구현해야 합니다.

:::note
dhtmlxGantt for Node.js의 평가판은 최대 75개의 Task 또는 Link 로딩만 지원합니다.
더 많은 데이터가 로드되면 처음 75개 항목만 처리됩니다.
:::

