---
title: " Primavera P6에서 내보내기 및 가져오기 "
sidebar_label: " Primavera P6에서 내보내기 및 가져오기 "
---

# Primavera P6에서 내보내기 및 가져오기

dhtmlxGantt 라이브러리는 간트 차트의 데이터를 Primavera P6로 내보낼 수 있게 해줍니다. 또한 Primavera P6에서 Gantt로 데이터를 가져올 수도 있습니다.

:::note
서비스는 무료이지만 출력 파일에는 GPL 라이선스 하의 워터마크가 포함됩니다. 
라이선스를 구입하면 유효한 지원 기간(모든 PRO 라이선스의 경우 12개월) 동안 워터마크 없이 내보낸 결과를 사용할 수 있습니다.
:::

여러 가지 내보내기 서비스가 있습니다. 이를 컴퓨터에 설치하고 로컬에서 Gantt 차트를 Primavera P6로 내보낼 수 있습니다.
내보내기 서비스는 Gantt 패키지에 포함되어 있지 않으니,
각 서비스 이용 약관을 확인하려면 [해당 기사](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)를 읽으십시오.

## 온라인 내보내기 서비스의 제약

:::note
내보내기 서비스에는 시간 제한과 요청 크기 제한이 있습니다.
:::

### 시간 제한

프로세스가 20초를 초과하면 내보내기가 취소되고 다음과 같은 오류가 발생합니다:

~~~html
Error: Timeout trigger 20 seconds
~~~

동시에 여러 사용자가 Gantt를 내보내면, 일반적으로보다 오래 걸릴 수 있습니다. 다만 특정 사용자로부터의 내보내기 요청에 소요된 시간은 각각 따로 계산되므로 문제되지 않습니다.

### 요청 크기 제한

모든 내보내기 메서드(*exportToPDF*, *exportToPNG*, *exportToMSProject* 등)에 공통으로 사용되는 엔드포인트 `https://export.dhtmlx.com/gantt`가 있습니다. **최대 요청 크기 10 MB**.

MS Project 및 Primavera P6의 내보내기/가져오기 서비스에 대해 별도로 제공되는 엔드포인트도 있습니다. (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* 만 해당). **최대 요청 크기: 40 MB**.

## 내보내기 모듈 사용하기

:::note
대용량 차트를 내보내려면 [독립 실행형 내보내기 모듈](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)을 사용할 수 있습니다. 
내보내기 모듈은 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 또는 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 라이선스 하에 Gantt를 받은 경우 무료로 제공되며, 모듈을 별도로 구입할 수도 있습니다.
:::

[MS Project를 위한 내보내기 모듈 사용 방법 읽기](guides/msp-export-module.md). 이 내보내기 모듈은 MS Project와 
Primavera P6의 내보내기/가져오기 기능을 제공합니다.

## Primavera P6로 내보내기 {#exporttoprimaverap6}

Gantt 구성요소는 Primavera P6로의 링크, 작업, 자원을 내보낼 수 있습니다.

Gantt 차트의 데이터를 Primavera P6로 내보내려면 다음 절차를 따르십시오:

- 내보내기/가져오기 기능을 사용하려면 <b>export_api</b> 플러그인을 [plugins](api/method/plugins.md) 메서드를 통해 활성화합니다:

~~~js
gantt.plugins({
    export_api: true
});
~~~

온라인 내보내기 서비스나 로컬 내보내기 모듈 중 하나를 사용할 수 있도록 해줍니다.

:::note
Gantt 버전이 8.0 미만인 경우, 페이지에 아래 스크립트를 포함시켜 내보내기 기능을 활성화해야 합니다. 예:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Gantt 차트에서 PrimaveraP6로 데이터를 내보내려면 [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md) 메서드를 호출합니다.

~~~js
gantt.exportToPrimaveraP6();
~~~

이 메서드는 원격 서비스에 요청을 보내고, XML 프로젝트 파일을 출력하거나_GENERATED 파일을 다운로드할 수 있는 URL을 반환합니다.

**관련 샘플**: [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

Primavera로 데이터를 내보낼 때는 프로젝트 작업의 **Summary** 속성에 대해 *true*를 반환해야 이 기능이 올바르게 작동합니다:

~~~js
gantt.exportToPrimaveraP6({
  tasks: {
    Summary: function (task) {
      return !!gantt.hasChild(task.id);
    },
    CustomProperty: function (task) {
      return task.custom_property;
    },
    SlateId: function (task) {
      return task.id + "";
    },
  }
});
~~~

**관련 샘플**: [Custom properties for WBS tasks (PrimaveraP6's Summary tasks)](https://snippet.dhtmlx.com/r90hjlvo?tag="gantt")

### Export 설정

`exportToPrimaveraP6()` 메서드는 여러 속성을 포함하는 객체를 매개변수로 받습니다(모든 속성은 선택적).

- **name** - (string) 얻은 파일의 이름(기본값은 'gantt.xml').

~~~js
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) 내보낸 프로젝트의 작업 스케줄링 모드를 나타냅니다. **true**는 작업을 자동으로 스케줄링하고, **false**는 수동으로 스케줄링된 것으로 표기합니다(기본값).

~~~js
gantt.exportToPrimaveraP6({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) 순환 링크를 제거할지 여부를 나타냅니다(참/참조: 기본값은 제거). 

~~~js
gantt.exportToPrimaveraP6({
    skip_circular_links: false
});
~~~

- **project** - (object) 내보낸 프로젝트 엔티티에 사용자 정의 속성을 설정할 수 있습니다

~~~js
gantt.exportToPrimaveraP6({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': function () {
            return gantt.config.hours_per_day * 60;
        }
    }
});
~~~

이 객체의 속성은 [Project 엔티티](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))의 해당 속성에 대응합니다. 지원되는 속성 목록은 [여기](guides/properties.md)에서 확인할 수 있습니다. 속성은 고정 값이거나 export가 호출될 때 실행될 함수일 수 있습니다.

- **tasks** - (object) 내보낸 작업 항목에 사용자 정의 속성을 설정합니다

~~~js
gantt.exportToPrimaveraP6({
   tasks: {
        'StartVariance': function (task) {
           if (task.startVariance)
               return task.startVariance;
           else
               return 0;
        },
        'PercentWorkComplete': function (task) {
           return (task.progress + 0.1);
        },
        'Custom': function (task) {
           return 'Custom value';
        },
        'Custom 2': 'My Custom value'
    }
});
~~~

이 객체의 속성은 [Task 엔티티](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))의 해당 속성과 대응합니다. 지원되는 [속성들](guides/properties.md#tasks-properties) 목록은 여기에 있습니다.
속성은 고정 값이거나 export 호출 시 각 작업에 대해 실행될 함수일 수 있습니다.

- **data** - (object) 출력 Gantt 차트에 표시될 사용자 정의 데이터 소스를 설정합니다.

:::note
**start_date**와 **end_date** 속성은 날짜와 시간을 모두 포함하는 형식으로 지정되는 것이 좋습니다(*%d-%m-%Y %H:%i*).
:::

~~~js
const customData = {
    "data": [
        { "id": "10", "text": "Project #5", "start_date": "01-04-2025 00:00", 
            "duration": 3, "order": 10, "progress": 0.4, "open": true, 
            "end_date": "04-04-2025 00:00", "parent": 0 
        },
        { "id": "1", "text": "Task #67", "start_date": "02-04-2025 00:00", 
            "duration": 2, "order": 10, "progress": 0.6, "parent": "10", 
            "end_date": "04-04-2025 00:00" 
        },
        { "id": "2", "text": "Task #89", "start_date": "01-04-2025 00:00", 
            "duration": 2, "order": 20, "progress": 0.6, "parent": "10", 
            "end_date": "03-04-2025 00:00" 
        },
    ],
    "links": [
        { "id": 1, "source": 1, "target": 2, "type": "1" },
    ]
}

gantt.exportToPrimaveraP6({
    data: customData
});
~~~

**관련 샘플**: [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)

- **callback** - (function) XML을 다운로드할 URL을 받고 싶다면, *callback* 속성을 사용할 수 있습니다. 이 함수는 *url* 속성을 포함하는 JSON 객체를 받습니다:

~~~js
gantt.exportToPrimaveraP6({
    callback: function(res){
        alert(res.url);
    }
});
~~~

- **resources** - (array) Primavera P6 파일에 자원 목록을 내보낼 수 있습니다

~~~js
gantt.exportToPrimaveraP6({
    resources: [
        { "id": "1", "name": "John", "type": "work" },
        { "id": "2", "name": "Mike", "type": "work" },
        { "id": "3", "name": "Anna", "type": "work" }
    ]
});
~~~

가능한 자원 유형은 "work", "cost", "material"입니다. 자원 할당은 작업 구성의 **ResourceAssignments** 속성으로 지정합니다:

~~~js {23-25}
var users = [// resources
    { key: '0', label: "N/A" },
    { key: '1', label: "John" },
    { key: '2', label: "Mike" },
    { key: '3', label: "Anna" }
];

gantt.exportToPrimaveraP6({
    resources: users
        .filter(function(u){
            if(u.key === '0')//skip the default option 
                return false;
            return true;
        })
        .map(function(u){
            return {
                id: u.key,
                name: u.label,
                type: "work"
               };
          }),
    tasks: {
        ResourceAssignments: function(task){  
            return task.user;                   
        }                                       
    }
});
~~~

**ResourceAssignments** 속성은 작업 객체를 매개변수로 받아 문자열/숫자 값 또는 문자열/숫자로 이루어진 배열을 반환하는 함수로 설정됩니다:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~

**관련 샘플**: [Export Gantt with resources to Primavera P6](https://snippet.dhtmlx.com/6bfbwp8g)

자원 할당에 대한 *단위(units)* 매개변수는 **ResourceAssignments** 속성에 아래와 같은 객체를 반환함으로써 지정할 수 있습니다:

~~~js
{
    resource_id: "id",
    units: "units value"
}
~~~

- **resource calendars**

기본적으로 각 작업에는 일정이 하나씩 부여됩니다. 자원 달력이 사용될 경우, 내보내기 시 작업의 *CalendarUID* 속성에 -1을 지정해야 하며(작업 객체의 [tasks](#export-settings)에서), 그러면 작업은 자원 달력을 사용합니다.

자원 달력을 내보낼 때는 [resources](#export-settings) 배열의 객체 안에서 자원 달력을 지정할 수 있습니다:

~~~js
gantt.exportToPrimaveraP6({
    resources: [
        {
            id: "10",
            name: "John",
            type: "work",
            calendar: gantt.config.resource_calendars[10]
        }
    ]
});    
~~~

- **server** - (string) 요청용 API 엔드포인트. 로컬에 설치된 내보내기 서비스를 함께 사용할 때 쓸 수 있습니다. 기본값은 `https://export.dhtmlx.com/gantt`입니다.

~~~js
gantt.exportToPrimaveraP6({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## Primavera P6에서 가져오기

XML 또는 XER 파일을 변환하려면 내보내기 서비스에 다음 요청을 보내야 합니다:

 - 요청 URL - `https://export.dhtmlx.com/gantt`
 - 요청 메서드 - **POST**
 - Content-Type - **multipart/form-data**

요청 매개변수:

 - **file** - XER 또는 XML Primavera P6 파일
 - **type** - "primaveraP6-parse"
 - **data** - (*optional*) 설정이 포함된 JSON 문자열

예:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <button type="submit">Get</button>
</form>
~~~

또는 [클라이언트 측 API](api/method/importfromprimaverap6.md)를 사용할 수 있습니다. 아래와 같이:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }                    
            gantt.parse(project.data);
        }
    }
});
~~~


**관련 샘플**: [Import Primavera P6 file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_primaverap6.html)

여기서 *file*은 XML 또는 XER 프로젝트 파일을 포함해야 하는 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 인스턴스입니다.

:::note
**gantt.importFromPrimaveraP6**는 HTML5 File API 지원이 필요합니다.
:::

### 응답

응답은 아래 구조의 JSON을 포함합니다:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {},
    calendars: []
}
~~~

- **data** - (*object*) 간트 [데이터 객체](guides/supported-data-formats.md). 각 작업은 다음 속성을 가집니다: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. 날짜는 "%Y-%m-%d %H:%i" 형식의 문자열로 표현됩니다.
- **config** - (*object*) 간트 [구성 객체](api/overview/properties-overview.md)로 프로젝트 파일에서 설정을 가져온 것입니다.
- **resources** - (*array*) 각 요소가 아래 속성을 가진 객체들의 배열입니다: (*id: string, name: string, type: string, calendar: string*) 프로젝트 파일의 자원 목록을 나타냅니다.
- **worktime** - (*object*) 프로젝트 캘린더의 작업 시간 설정을 포함하는 객체입니다. 다음 속성을 가질 수 있습니다:
   - **id** - (*string | number*) 선택적, 달력 ID
   - **hours** - (*array*) 작업의 시작 및 종료 시간을 설정하는 전역 작업 시간 배열
    - **dates** - (*array*) 날짜 배열로 포함될 수 있습니다:
        - 주의 7일(일요일 0부터 토요일 6까지) 중 1/true는 근무일, 0/false는 비근무일을 나타냅니다
        - 다른 기록은 날짜입니다 
- **calendars** - (*array*) 새로운 달력을 만들 때의 달력 구성 객체를 담은 배열
    - **calendarConfig** - (*object*) 달력 구성 객체로 다음 속성을 포함할 수 있습니다:
      - **id** - (*string | number*) 선택적, 달력 ID
      - **name** - (*string*) 달력 이름
      - **hours** - (*array*) 전역 작업 시간을 설정하는 시작/종료 시간 배열
      - **dates** - (*array*) 날짜 배열로 포함될 수 있습니다:
            - 주의 7일(일요일 0에서 토요일 6까지) 중 1/true는 근무일, 0/false는 비근무일
            - 다른 기록은 날짜

### Import 설정

#### 지속 시간 단위 설정

예상 지속 시간 단위를 설정하려면 서버로 보낼 수 있는 durationUnit 문자열("minute", "hour", "day", "week", "month", "year")도 포함될 수 있습니다.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "durationUnit": "hour" }" />
    <button type="submit">Get</button>
</form>
~~~

또는

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    durationUnit: "hour",
    callback: function(project){}
});
~~~

#### 프로젝트 속성 얻기

프로젝트 필드를 얻으려면 서버로 **projectProperties** 배열 입력을 보낼 수 있습니다.
이는 프로젝트 파일로부터 설정 값을 추출하여 출력의 config 속성에 담습니다. 지원되는 [속성 목록](guides/properties.md#project-properties)을 확인하십시오.

 - **projectProperties** - 응답에 포함될 프로젝트 속성의 배열을 지정합니다.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "projectProperties": ["Author", "Title"] }" />
    <button type="submit">Get</button>
</form>
~~~

또는

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    durationUnit: "hour",
    projectProperties: ["Author", "Title"],
    callback: function(project){
        var config = project.config;
        alert(config.$custom_properties.Author);
    }
});
~~~

#### 작업 속성 얻기

작업 필드를 얻으려면 **taskProperties** 입력에 필요한 필드 배열을 서버로 보낼 수 있습니다.
이는 [Task 엔티티](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))의 임의 속성을 추출합니다. 지원되는 [속성들](guides/properties.md#tasks-properties) 목록은 아래와 같습니다:

 - **taskProperties** - 가져올 추가 작업 속성의 배열을 지정합니다.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "taskProperties": ["Contact", "Priority"] }" />
    <button type="submit">Get</button>
</form>
~~~
또는
~~~js
gantt.importFromPrimaveraP6({
    data: file,
    durationUnit: "hour",
    taskProperties: ["Contact", "Priority"],
    callback: function(project){
        var config = project.config;
        alert(config.$custom_properties.Author);
        gantt.parse(project.data);
    }
});
gantt.attachEvent("onTaskLoading", function(task) {
    if (task.$custom_data) {
        task.contact = task.$custom_data["Contact"];
        task.priority = task.$custom_data["priority"];
        delete task.$custom_data;
    }
    return true;
});
~~~

#### 작업 유형 얻기

다음 로직은 작업 유형을 얻는 방법을 보여줍니다: 프로젝트 타입의 작업은 `Summary: "1"` 속성을 가지며, 마일스톤 타입의 작업은 `Milestone: "1"` 속성을 가집니다. 이러한 속성들을 가진 데이터를 먼저 가져온 후, 이 속성들에 따라 작업 유형을 설정해야 합니다.

가져오기 함수 호출은 다음과 같이 보입니다:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: [
        "Summary", 
        "Milestone",
    ],
    callback: function (project) {
        if (project) {
            console.log(project)
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }
            console.log('import: ', project.data);
            gantt.parse(project.data);
        }
    }
});
~~~

그 후 수신된 속성에 따라 태스크 유형을 다음과 같이 변환할 수 있습니다:

~~~js
gantt.attachEvent("onTaskLoading", function (task) {
    if (task.$custom_data) {
        if (task.$custom_data.Summary == "1") {
            task.type = "project";
        }
        if (task.$custom_data.Milestone == "1") {
            task.type = "milestone";
        }
        // delete task.$custom_data;
    }
    return true;
});
~~~

**관련 샘플**: [Gantt. Import Primavera P6 files. Get task type from properties](https://snippet.dhtmlx.com/y95rsxor)

#### 달력 추가 및 조정

가져오기 중 달력이 자동으로 추가되지는 않는다는 점에 유의하십시오. [addCalendar()](api/method/addcalendar.md) 메서드를 사용해 달력을 추가해야 합니다. 그런 다음 [setWorkTime()](api/method/setworktime.md) 메서드를 통해 달력 설정을 지정해야 합니다. 예:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // 달력 추가를 위한 설정
            project.calendars.forEach(function (calendar) {
                let addedCalendar;
                // 글로벌 달력에 대한 작업 시간 설정 추가
                if (calendar.id == project.config.global_calendar_id) {
                    addedCalendar = gantt.getCalendar("global");
                }
                else {
                    // Gantt는 hours 매개변수가 빈 배열인 경우 달력을 추가하지 않음
                    let calendarHours = calendar.hours;
                    if (!calendarHours.length) {
                        calendarHours = undefined
                    }
                    gantt.addCalendar({
                        id: calendar.id,
                        hours: calendarHours,
                        name: calendar.name
                    });

                    addedCalendar = gantt.getCalendar(calendar.id);
                }
                const worktimeDates = calendar.dates;
                for (let element in worktimeDates) {
                    const date = new Date(+element)
                    if (element < 10) {
                        addedCalendar.setWorkTime({ 
                            day: element, 
                            hours: worktimeDates[element] 
                        })
                    }
                    else {
                        addedCalendar.setWorkTime({ 
                            date: date, 
                            hours: worktimeDates[element] 
                        })
                    }
                }
            })
        }
    }
});
~~~

**관련 샘플**: [Gantt. Calendars settings for export/import in MSProject and Primavera P6](https://snippet.dhtmlx.com/668xqts7)

#### 리소스 달력

리소스 달력이 있는 경우, [gantt.config.resource_calendars](api/config/resource_calendars.md) 속성을 통해 지정해야 합니다:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // 달력 설정
            project.calendars.forEach(function (calendar) {
                // 달력을 추가하고 작업 시간 설정을 적용
            })

            // 리소스 달력 설정
            gantt.config.resource_calendars = {}

            project.resources.forEach(function (resource) {
                if (resource.calendar) {
                    gantt.config.resource_calendars[resource.id] = resource.calendar;
                }
            })
        }
    }
});
~~~

**관련 샘플**: [Gantt. Resource calendars settings for export/import in MSProject and Primavera P6](https://snippet.dhtmlx.com/10czv54b)

#### 자원 및 자원 할당

파일에 자원이 있는 경우 가져오기 중에 resources 배열로 들어옵니다. resources 속성의 *calendar* 매개변수는 자원 달력을 지정합니다:

~~~js
{
    resources: [
        { id: 6, name: "John", type: "work", calendar: "8" },
        // 더 많은 자원
    ]
}
~~~

자원 할당이 있는 경우 assignments 배열에 가져오게 되며, 할당 객체에는 *resource_id: string* 및 *value: number* 매개변수가 포함됩니다. 예:

~~~js
{
    tasks: [
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            priority: 1
        },
        // 더 많은 작업
    ],
    links: [],
    assignments: [
        { id: 1, task_id: 5, resource_id: 6, value: 3},
        // 더 많은 할당
    ],
    resources: [
        { id: 6, text: "John", unit: "hours/day" },
        { id: 7, text: "Mike", unit: "hours/day" },
        // 더 많은 자원
    ]
}
~~~

## 큰 파일의 요청 크기 제한 및 가져오기 제한

Primavera P6 내보내기/가져오기 서비스에는 두 개의 API 엔드포인트가 있습니다:

- `https://export.dhtmlx.com/gantt` - 기본 엔드포인트로 모든 내보내기 메서드(*exportToPDF*, *exportToPNG*, *exportToPrimaveraP6* 등)을 제공합니다. **최대 요청 크기 10 MB**.
- `https://export.dhtmlx.com/gantt/project` - [MSProject](guides/export-msproject.md) 및 [Primavera P6](guides/export-primavera.md) 내보내기/가져오기 서비스에 대해 특화된 엔드포인트(*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* 만 해당). **최대 요청 크기: 40 MB**.

엔드포인트는 export 구성 객체의 **server** 속성으로 지정할 수 있습니다:

~~~js
gantt.importFromPrimaveraP6({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // 일부 로직
    }
}); 
~~~

엔드포인트가 지정되지 않은 경우 기본값은 `https://export.dhtmlx.com/gantt`입니다. 위의 호출과 동등한 것은 다음과 같습니다:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    callback: function(project){
       // 일부 로직
    }
});
~~~

4MB를 초과하는 대용량 프로젝트를 내보내거나 가져오기 위해서는 두 번째 엔드포인트를 사용할 수 있습니다:

~~~js
gantt.importFromPrimaveraP6({
    server: "https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // 일부 로직
    }
}); 
~~~

이 엔드포인트는 최대 40MB까지의 요청을 보낼 수 있으며 Primavera P6의 내보내기 및 가져오기를 지원합니다. Primavera P6 내보내기 전용으로 사용할 수도 있습니다. 

다른 메서드는 예를 들어, `gantt.exportToPDF({server:"https://export.dhtmlx.com/gantt/project"})` 와 같은 호출은 서버 오류를 반환해야 합니다.