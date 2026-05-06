---
title: "서버에서 Gantt 사용하기"
sidebar_label: "Node.js Gantt"
---

# 서버에서 Gantt 사용하기

일부 경우에는 gantt 차트와 별도로 dhtmlxGantt의 특수한 로직을 사용해야 할 필요가 있을 수 있습니다. 예를 들면:

- 다른 소스(예: 모바일 앱)에서 작업 업데이트를 받고 관련 작업의 타이밍을 업데이트하기 위해 자동 스케줄링을 실행해야 하는 경우
- 같은 앱을 동시에 변경할 수 있는 여러 사용자가 있을 때 일정을 동기화하고 검증해야 하는 경우
- 서버 코드로 계산을 실행하고 일정을 분석해야 하는 경우

이러한 이유로 Node.js 환경에서 서버 측에서 실행될 수 있는 dhtmlxGantt의 별도 빌드를 제공합니다.

Node.js용 DHTMLX Gantt는 Commercial/Enterprise/Ultimate 패키지와 동일한 기능을 가지므로, **Gantt.getGanttInstance** 메서드가 사용 가능하고 새로운 gantt 인스턴스를 생성할 수 있습니다.

## 사용 약관


DHTMLX Gantt의 Node.js 서버 모듈은 Gantt의 클라이언트 측 버전에 애드온 패키지로 제공됩니다. 따라서 Gantt를 어떤 상용 라이선스([Individual](https://dhtmlx.com/docs/products/dhtmlxGantt/individual/), [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/commercial/), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/enterprise/))로 구입하실 때 추가 요금으로 Node.js 빌드를 추가하실 수 있습니다. [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/ultimate/) 라이선스에는 기본적으로 포함되어 있습니다.

이미 dhtmlxGantt의 기본 라이브러리를 얻으셨다면 [Node.js 모듈을 별도로 구매](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=58429)하실 수 있으며 서버 측 버전의 Gantt에 대한 링크를 보내드립니다.

## 버전 관리


dhtmlxGantt는 Node.js 패키지에도 브라우저 패키지에 적용된 동일한 버전 번호 체계를 적용합니다(예: v7.0.0은 Node.js 패키지용 Gantt의 첫 버전입니다).

:::note
클라이언트 측의 gantt 라이브러리와 서버 측의 버전을 동일하게 사용하는 것을 권장합니다.
:::

## 프로젝트에 라이브러리 추가하기


Node.js용 dhtmlxGantt를 로컬 패키지로 설치할 수 있습니다:

~~~js
"dependencies": {
    "@dhtmlx/gantt-node": "file:../../gantt_7.0.0_node"
    ...
}
~~~

또는 코드에서 직접 dhtmlxgantt.node.js를 가져와 사용할 수 있습니다. 예는 다음과 같습니다:

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
            { id: 1, text: "프로젝트 #1", type: "project", parent: 0 },
            { id: 2, start_date: "05-04-2020 00:00", text: "작업 #1", duration: 1, 
            parent: 1, type: "task" },
            { id: 3, start_date: "05-04-2020 00:00", text: "작업 #2", duration: 3, 
            parent: 1, type: "task" },
            { id: 4, start_date: "05-04-2020 00:00", text: "작업 #3", duration: 3, 
            parent: 1, type: "task" },
            { id: 5, start_date: "05-04-2020 00:00", text: "작업 #4", duration: 3, 
            parent: 1, type: "task" },
            { id: 6, start_date: "05-04-2020 00:00", text: "작업 #5", duration: 1, 
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
            console.log("다음 작업이 자동으로 일정 조정되었습니다:");
            console.table(updatedTasks.map((taskId) => {
                return {
                    id: taskId,
                    text: this.getTask(taskId).text
                };
            }));
        },
        onParse: function() {
            console.log("로드된 데이터:")
            console.table(this.serialize().data);
        },
        onGanttReady: () => {
            console.log("백엔드에서 dhtmlxGantt 실행 중");
        }
    }
});

console.table(gantt.serialize());
~~~

## 제한 사항


dhtmlxGantt는 Node.js에서도 브라우저 버전과 동일한 핵심 API를 제공합니다.

다만, 클라이언트 측 버전의 Gantt에서 사용할 수 있는 일부 메서드는 서버 라이브러리에서 작동하지 않거나 정의되지 않을 수 있습니다, 즉:

- 서버 측 렌더링은 구현되어 있지 않습니다. [gantt.render](api/method/render.md), [gantt.refreshData](api/method/refreshdata.md), [gantt.refreshTask](api/method/refreshtask.md) 등과 같은 메서드를 호출해도 HTML이 생성되지 않고 관련 API 이벤트가 트리거됩니다. 예를 들어 [onBeforeGanttRender](api/event/onbeforeganttrender.md), [onGanttRender](api/event/onganttrender.md) 등이 해당됩니다.
- [Popup messages API](guides/message-boxes.md)는 Node 패키지에 포함되어 있지 않습니다. gantt.message, gantt.alert, gantt.confirm 메서드는 undefined가 됩니다.
- [Built-in ajax helpers](api/other/ajax.md)는 Node.js로 포트되지 않았으므로 gantt ajax API나 [gantt.load](api/method/load.md) 또는 기본 dataProcessor 라우팅도 작동하지 않습니다. [gantt.parse](api/method/parse.md)와 [데이터 프로세서의 사용자 정의 라우팅](guides/server-side.md#customrouting)을 사용해야 합니다.

:::note
Node.js용 dhtmlxGantt의 평가 버전은 75개의 Tasks 또는 Links까지 로드할 수 있는 제한된 기능을 제공합니다.
더 큰 데이터 세트를 로드하려고 하면 처음 75개 항목만 로드됩니다.
:::