---
title: "여러 개의 차트를 한 페이지에 표시하기"
sidebar_label: "여러 개의 차트를 한 페이지에 표시하기"
---

# 여러 개의 차트를 한 페이지에 표시하기


:::info
이 기능은 Gantt PRO 버전에 포함되어 있으며, Commercial(2021년 10월 6일부터), Enterprise, Ultimate 라이선스에서 제공됩니다.
:::

기본적으로 dhtmlxGantt는 정적 객체로 동작하며, 그 기본 인스턴스는 항상 페이지에 존재합니다. 전역 **gantt** 객체를 통해 언제든지 접근할 수 있습니다. 하지만 필요하다면 새로운 gantt 인스턴스를 생성할 수도 있습니다.

## Gantt 인스턴스 구성 {#ganttinstanceconfiguration}

새로운 dhtmlxGantt 인스턴스를 생성하려면 **Gantt.getGanttInstance()** 메서드를 사용하세요:

~~~js
// "Gantt"의 첫 글자는 대문자임에 유의하세요.
const ganttChart = Gantt.getGanttInstance();
~~~

이 메서드는 구성 객체를 인자로 받을 수 있습니다:

~~~js
const gantt = Gantt.getGanttInstance({
    plugins:{
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
        start_date: new Date(2020, 0, 1),
        end_date: new Date(2021, 0, 1),
    },
    calendars: [
        {
            id:"global",
            worktime: {
                hours: ["8:00-17:00"],
                days: [ 0, 1, 1, 1, 1, 0 ,0],
                customWeeks: {
                    lastMonthOfYear: {
                        from: new Date(2020, 11, 1),// 2020년 12월 1일
                        to: new Date(2021, 0, 1),// 2021년 1월 1일 00:00
                        hours: ["9:00-13:00"],
                        days: [ 0, 1, 1, 1, 1, 1, 0]
                    },
                    firstMonthOfNextYear:{
                        from: new Date(2021, 0, 1),// 2021년 1월 1일
                        to: new Date(2021, 1, 1),// 2021년 2월 1일 00:00
                        hours: ["14:00-16:00"],
                        days: [ 1, 1, 1, 1, 1, 0, 1]
                    }
                }
            }
        }
    ],
    data: {
        tasks: [
            { id: 11, text: "Project #1", type: "project", "open": true, "parent": 0 },
            { id: 1, start_date: "05-04-2020", text: "1", duration: 1, parent: "11", 
            type: "task" },
            { id: 2, start_date: "05-04-2020", text: "2", duration: 3, parent: "11", 
            type: "task" },
            { id: 3, start_date: "05-04-2020", text: "3", duration: 3, parent: "11", 
            type: "task" },
            { id: 4, start_date: "05-04-2020", text: "4", duration: 3, parent: "11", 
            type: "task" },
            { id: 5, start_date: "05-04-2020", text: "5", duration: 1, parent: "11", 
            type: "task" }
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

이렇게 하면 지정한 옵션으로 초기화된 Gantt 차트가 생성됩니다.

config 객체는 다음과 같은 속성을 지원합니다:

- **container** - (*string|HTMLElement*) Gantt 차트를 렌더링할 HTML 컨테이너(또는 그 id). 생략하면 Gantt는 컨테이너 없이 초기화됩니다.
- **config** - (*object*) Gantt 차트의 구성 설정
- **calendars** - (*array*) gantt에 로드할 근무시간 캘린더 배열. 캘린더는 [gantt.addCalendar](api/method/addcalendar.md) 메서드에서 지원하는 형식이어야 합니다.
- **templates** - (*object*) 템플릿 객체
- **events** - (*object*) 이벤트 핸들러 객체 


새로운 Gantt 인스턴스에 이벤트 핸들러를 지정할 때는 다음과 같이 작성하세요:

~~~js
const gantt = Gantt.getGanttInstance({
     events: {
          onTaskCreated: function(task){
               task.owner = null;
               return true;
          },
          onTaskClick: function(id){
               alert(gantt.getTask(id).text);
               return true;
          }
     }
})
~~~

- **data** - (*object|string*) 로드할 데이터 또는 데이터를 가져올 URL
- **plugins** - (*object*) 활성화할 플러그인
- **locale** - (*string|object*) 활성화할 2자리 언어 코드 또는 로케일 객체

**참고:** **Gantt.getGanttInstance()**를 인자 없이 호출하면 기본 설정을 가진 gantt 객체가 반환됩니다. 이 경우 새 인스턴스를 일반적으로 구성, 초기화, 데이터 로드해야 합니다.

두 개의 Gantt 차트를 세로로 배치하는 간단한 예시는 다음과 같습니다:

~~~js
window.addEventListener("DOMContentLoaded", function(){
    var gantt1 = Gantt.getGanttInstance();
    gantt1.init("gantt_here");
    gantt1.parse(tasksA);

    var gantt2 = Gantt.getGanttInstance();
    gantt2.init("gantt_here_2");
    gantt2.parse(tasksB);
});

<body>
<div id="gantt_here" style="width:100%; height: 50%;"></div>
<div id="gantt_here_2" style="width:100%; height: 50%;"></div>
</body>
~~~

## dhtmlxLayout과의 통합 {#integrationwithdhtmlxlayout}


여러 개의 Gantt 차트를 한 페이지에 깔끔하게 배치하는 효과적인 방법 중 하나는 [dhtmlxLayout](https://docs.dhtmlx.com/layout__index.html)을 사용하는 것입니다. dhtmlxLayout은 레이아웃 프레임워크를 제공하며, 다른 페이지 요소와의 상호작용 및 크기 조정 이벤트도 잘 처리합니다.

:::note
dhtmlxLayout은 별도의 제품으로, dhtmlxGantt 라이브러리에 포함되어 있지 않습니다. 프로젝트에서 dhtmlxLayout을 사용하려면 별도의 라이선스 구매가 필요합니다.
라이선스 옵션을 [여기에서 확인](https://dhtmlx.com/docs/products/dhtmlxLayout/#editions-licenses)하세요.
:::

**dhtmlxGantt 인스턴스를 레이아웃 셀에 연결하려면** **attachGantt()** 메서드를 사용하세요.

**참고:** dhtmlxGantt를 셀에 연결하면 자동으로 초기화됩니다. 따라서 레이아웃에 연결하기 전에 gantt 인스턴스를 구성해야 합니다.

~~~js
function init() {
    var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

    gantt1 = Gantt.getGanttInstance();
    gantt1.config.min_column_width = 50;
    gantt1.config.scale_height = 90;
    dhxLayout.cells("a").attachGantt(null, null, gantt1); /*!*/
    gantt1.parse(tasksA);
        
    gantt2 = Gantt.getGanttInstance();
    gantt2.config.date_grid = "%Y-%m-%d %H:%i";
    gantt2.config.xml_date = "%Y-%m-%d %H:%i:%s";
    dhxLayout.cells("b").attachGantt(null, null, gantt2);/*!*/
    gantt2.parse(tasksB);
}
~~~

## Gantt와 DataProcessor 인스턴스의 소멸자 {#destructorofganttanddataprocessorinstances}


버전 5.1부터 dhtmlxGantt 객체는 불필요한 gantt 인스턴스를 정리할 수 있는 [destructor](api/method/destructor.md)를 제공합니다.

gantt 인스턴스에 소멸자를 사용하는 방법은 다음과 같습니다:

~~~js
var gantt = Gantt.getGanttInstance();
gantt.destructor();
~~~

이 소멸자는 다음 작업을 수행합니다:

- gantt 인스턴스에 로드된 데이터를 초기화합니다.
- 연결된 dataProcessor를 제거합니다.
- gantt를 DOM에서 분리합니다.
- [gantt.event()](api/method/event.md) 메서드를 통해 연결된 모든 DOM 이벤트를 제거합니다.

소멸자는 [gantt.createDatastore()](api/method/createdatastore.md) 메서드로 생성된 데이터 스토어는 제거하지 않는다는 점에 유의하세요. 이런 데이터 스토어는 다음과 같이 직접 제거해야 합니다:

~~~js
// 데이터 스토어 생성
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});

// 나중에 데이터 스토어 제거
resourcesStore.destructor();
~~~

### Angular에서 소멸자 사용하기

Angular에서 gantt 인스턴스를 해제하는 예시입니다:

~~~js
@Component({selector: 'app-gantt', template: `...`})
class MyGanttComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Gantt.getGanttInstance();

     // 구성 및 초기화
  }
  
  ngOnDestroy() {
     this.$gantt.destructor();
     this.$gantt = null;
  }
}
~~~

### dataProcessor 분리하기

dataProcessor에 소멸자를 호출하면 인스턴스를 정리하고 gantt에서 분리합니다. 예시:

~~~js
var gantt = Gantt.getGanttInstance();
var dp = new gantt.dataProcessor("url");
dp.init(gantt);

// dataProcessor를 제거하고 gantt에서 분리
dp.destructor();
~~~

:::note
여러 gantt 인스턴스를 지원하지 않는 패키지(GPL 또는 Commercial 에디션)를 사용하는 경우, gantt 소멸자를 호출하면 페이지를 새로고침할 때까지 gantt를 사용할 수 없습니다.
:::

