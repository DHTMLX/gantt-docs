---
title: "한 페이지에 있는 여러 차트" 
sidebar_label: "한 페이지에 있는 여러 차트" 
---

# 한 페이지에 있는 여러 차트

:::info
이 기능은 상용(Gantt PRO 버전, 2021년 10월 6일 이후), Enterprise 및 Ultimate 라이선스에서 사용할 수 있습니다
:::

기본적으로 DHTMLX Gantt는 정적 객체이며 기본 인스턴스가 페이지에 지속적으로 존재합니다. 언제든지 전역 `gantt` 객체를 통해 접근할 수 있습니다. 필요하다면 새로 gantt 객체를 생성할 수도 있습니다.

## Gantt 인스턴스 구성

새로운 DHTMLX Gantt 인스턴스를 만들려면 `Gantt.getGanttInstance()` 메서드를 사용하세요:

~~~js
// 주의: 명령의 "Gantt"는 대문자로 시작합니다
const ganttChart = Gantt.getGanttInstance();
~~~

메서드는 매개변수로 구성 객체를 받을 수 있습니다:

~~~js
const ganttInstance = Gantt.getGanttInstance({
    plugins: {
        auto_scheduling: true,
    },
    container: "gantt_here",
    config: {
        work_time: true,
        duration_unit: "minute",
        auto_scheduling_compatibility: true,
        auto_scheduling: true,
        auto_scheduling_strict: true,
        auto_scheduling_initial: true,
        start_date: new Date(2027, 0, 1),
        end_date: new Date(2028, 0, 1),
    },
    calendars: [
        {
            id: "global",
            worktime: {
                hours: ["8:00-17:00"],
                days: [0, 1, 1, 1, 1, 0, 0],
                customWeeks: {
                    lastMonthOfYear: {
                        from: new Date(2027, 11, 1),
                        to: new Date(2028, 0, 1),
                        hours: ["9:00-13:00"],
                        days: [0, 1, 1, 1, 1, 1, 0]
                    },
                    firstMonthOfNextYear: {
                        from: new Date(2028, 0, 1),
                        to: new Date(2028, 1, 1),
                        hours: ["14:00-16:00"],
                        days: [1, 1, 1, 1, 1, 0, 1]
                    }
                }
            }
        }
    ],
    data: {
        tasks: [
            { id: 11, text: "Project #1", type: "project", "open": true, "parent": 0 },
            { id: 1, text: "1", start_date: "2027-04-05", duration: 1, parent: "11" },
            { id: 2, text: "2", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 3, text: "3", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 4, text: "4", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 5, text: "5", start_date: "2027-04-05", duration: 1, parent: "11" }
        ],
        links: [
            { source: "1", target: "2", type: "0", id: 1 },
            { source: "1", target: "3", type: "0", id: 2 },
            { source: "1", target: "4", type: "0", id: 3 },
            { source: "2", target: "4", type: "0", id: 4 },
            { source: "3", target: "4", type: "0", id: 5 },
            { source: "4", target: "5", type: "0", id: 6 }
        ]
    }
});
~~~

그 결과, 지정된 설정으로 초기화된 Gantt 차트를 얻을 수 있습니다.

구성 객체는 다음 속성을 포함할 수 있습니다:

- `container` - (*string|HTMLElement*) Gantt 차트가 표시될 HTML 컨테이너 또는 그 ID. 지정되지 않으면 Gantt가 컨테이너 없이 초기화됩니다.
- `config` - (*object*) Gantt 차트 구성 설정이 담긴 객체
- `calendars` - (*array*) gantt 인스턴스에 로드될 작업 시간 캘린더 배열. 캘린더는 [`gantt.addCalendar()`](api/method/addcalendar.md) 메서드에서 지원하는 형식으로 지정되어야 합니다.
- `templates` - (*object*) 템플릿이 들어 있는 객체
- `events` - (*object*) 이벤트 핸들러가 들어 있는 객체

새로운 Gantt 인스턴스에 대해 이벤트 핸들러를 지정할 때는 다음 형식을 사용해야 합니다:

~~~js
const ganttInstance = Gantt.getGanttInstance({
    events: {
        onTaskCreated: (task) => {
            task.owner = null;
            return true;
        },
        onTaskClick: (taskId) => {
            alert(ganttInstance.getTask(taskId).text);
            return true;
        }
    }
});
~~~

- `data` - (*object|string*) 로드할 데이터가 들어 있는 객체 또는 데이터를 로드할 URL
- `plugins` - (*object*) 활성화해야 할 확장 기능
- `locale` - (*string|object*) 활성화해야 하는 두 글자 언어 코드 또는 활성화해야 할 로케일 객체

참고: 파라미터 없이 `Gantt.getGanttInstance()` 메서드를 호출하면 기본 구성 설정이 적용된 gantt 객체가 반환됩니다. 따라서 새 인스턴스를 구성하고, 초기화하며, 데이터를 로드하는 것이 일반적인 절차입니다.

간단한 예를 들어 보겠습니다: 두 개의 Gantt 차트를 서로 아래에 배치합니다.

~~~js
window.addEventListener("DOMContentLoaded", () => {
    const firstGantt = Gantt.getGanttInstance();
    firstGantt.init("gantt_here");
    firstGantt.parse(tasksA);

    const secondGantt = Gantt.getGanttInstance();
    secondGantt.init("gantt_here_2");
    secondGantt.parse(tasksB);
});
~~~

~~~html
<body>
    <div id="gantt_here" style="width: 100%; height: 50%;"></div>
    <div id="gantt_here_2" style="width: 100%; height: 50%;"></div>
</body>
~~~

## DHTMLX Layout와의 통합

두 개의 Gantt 차트를 페이지에 배치하는 좋은 방법은 [DHTMLX Layout](https://docs.dhtmlx.com/suite/layout/)을 사용하는 것입니다.
레이아웃 프레임을 편리하게 제공할 뿐만 아니라 페이지의 다른 요소와의 상호 작용도 올바르게 보장하고 페이지 크기 변경에 대응합니다.

:::note
DHTMLX Layout은 독립적인 제품이며 DHTMLX Gantt 라이브러리의 일부가 아닙니다. 애플리케이션에서 DHTMLX Layout을 사용하고자 한다면 라이선스를 구매해야 합니다.
라이선스 옵션을 [확인하십시오](https://dhtmlx.com/docs/products/licenses.shtml).
:::

DHTMLX Gantt 인스턴스는 셀 내 컨테이너를 정의하고 그 안에서 Gantt를 초기화함으로써 레이아웃 셀에 배치될 수 있습니다.

~~~js
new dhx.Layout("layout_container", {
    rows: [
        {
            id: "top",
            height: "50%",
            html: '<div id="gantt_here" style="width: 100%; height: 100%;"></div>'
        },
        {
            id: "bottom",
            height: "50%",
            html: '<div id="gantt_here_2" style="width: 100%; height: 100%;"></div>'
        }
    ]
});

const firstGantt = Gantt.getGanttInstance();
firstGantt.init("gantt_here");
firstGantt.parse(tasksA);

const secondGantt = Gantt.getGanttInstance();
secondGantt.init("gantt_here_2");
secondGantt.parse(tasksB);
~~~

## Gantt 및 DataProcessor 인스턴스의 소멸자 {#destructorofganttanddataprocessorinstances}

버전 5.1부터는 DHTMLX Gantt 객체에 더 이상 필요 없는 인스턴스를 제거하는 데 사용할 수 있는 [`destructor()`](api/method/destructor.md) 메서드가 추가되었습니다.

gantt 인스턴스의 `destructor()` 메서드는 다음과 같이 사용할 수 있습니다:

~~~js
const ganttInstance = Gantt.getGanttInstance();
ganttInstance.destructor();
~~~

소멸자는 다음 작업을 수행합니다:

- gantt 인스턴스에 로드된 데이터를 삭제합니다
- gantt에 연결된 데이터 프로세서를 제거합니다
- DOM에서 gantt를 분리합니다
- [`gantt.event()`](api/method/event.md) 메서드를 통해 DOM에 연결된 모든 이벤트를 분리합니다

참고로 소멸자는 [`gantt.createDatastore()`](api/method/createdatastore.md) 메서드로 생성된 데이터 저장소를 파괴하지 않습니다. 이를 수동으로 파괴해야 합니다. 예시는 다음과 같습니다:

~~~js
// 데이터스토어 생성
const ganttInstance = Gantt.getGanttInstance();
const resourcesStore = ganttInstance.createDatastore({
    name: "resource",
    initItem: (item) => {
        item.id = item.key || ganttInstance.uid();
        return item;
    }
});

// 나중에 데이터스토어 파괴
resourcesStore.destructor();
~~~

### Angular에서의 destructor 사용

다음은 Angular 프레임워크를 사용하는 동안 소멸자를 이용해 gantt 인스턴스를 폐기하는 예시입니다:

~~~ts
@Component({ template: '...' })
class MyGanttComponent implements OnInit, OnDestroy {
    private ganttInstance;

    ngOnInit() {
        this.ganttInstance = Gantt.getGanttInstance();

        // 구성 및 초기화
    }

    ngOnDestroy() {
        if (this.ganttInstance) {
            this.ganttInstance.destructor();
        }
    }
}
~~~

### dataProcessor 분리

다음은 dataProcessor의 소멸자를 호출하여 gantt에서 데이터 프로세서를 분리하는 예시입니다:

~~~js
const ganttInstance = Gantt.getGanttInstance();
const dataProcessor = ganttInstance.createDataProcessor({
    url: "url",
    mode: "REST"
});

// 데이터 프로세서 파괴 및 gantt로부터 분리
dataProcessor.destructor();
~~~

:::note
만약 다중 인스턴스 생성을 허용하지 않는 패키지(GPL 또는 상용 에디션)을 사용하는 경우, gantt 소멸자를 호출하면 페이지를 다시 로드할 때까지 gantt에 접근할 수 없게 됩니다.
:::