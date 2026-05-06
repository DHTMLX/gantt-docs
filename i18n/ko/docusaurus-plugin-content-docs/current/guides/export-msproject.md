---
title: "MS Project에서의 내보내기 및 가져오기"
sidebar_label: "MS Project에서의 내보내기 및 가져오기"
---

# MS Project에서의 내보내기 및 가져오기

dhtmlxGantt 라이브러리는 Gantt 차트의 데이터를 MS Project로 내보낼 수 있게 해줍니다. 또한 MS Project에서 Gantt로 데이터를 가져올 수도 있습니다.

:::note
서비스는 무료이지만 출력 파일은 GPL 라이선스 하의 라이브러리 워터마크를 포함합니다. 라이선스를 구입하면 유효한 지원 기간(모든 PRO 라이선스에 대해 12개월) 동안 워터마크 없이 내보내기 결과를 이용할 수 있습니다.
:::

여러 개의 내보내기 서비스가 있습니다. 로컬에서 컴퓨터에 설치하고 Gantt 차트를 MS Project로 로컬로 내보낼 수 있습니다. 내보내기 서비스는 Gantt 패키지에 포함되어 있지 않다는 점에 유의하시고, 각 서비스의 이용 약관을 알아보려면 해당 문서를 읽으십시오.

## 온라인 내보내기 서비스 제한

:::note
온라인 내보내기 서비스에는 시간 제한과 요청 크기 제한이 있습니다.
:::

### 시간 제한

프로세스가 20초를 초과하면 내보내기가 취소되며 다음과 같은 오류가 발생합니다:

~~~html
Error: Timeout trigger 20 seconds
~~~

동시에 여러 사용자가 Gantt를 내보내면, 특정 사용자의 내보내기 요청에 소요되는 시간이 일반적으로 더 길어질 수 있습니다. 하지만 특정 사용자의 요청에 소요된 시간은 별도로 계산되므로 괜찮습니다.

### 요청 크기 제한

모든 내보내기 메서드(*exportToPDF*, *exportToPNG*, *exportToMSProject* 등)에 공용 API 엔드포인트 `https://export.dhtmlx.com/gantt`가 있습니다. **최대 요청 크기 10 MB**입니다.

MS Project 및 Primavera P6의 내보내기/가져오기에 특화된 별도 API 엔드포인트 `https://export.dhtmlx.com/gantt/project`도 있습니다 (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* 만 해당). **최대 요청 크기 40 MB**.

## 내보내기 모듈 사용

:::note
대용량 차트를 내보내야 하는 경우 [Standalone 내보내기 모듈](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)을 사용할 수 있습니다.  
Gantt를 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 또는 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 라이선스 하에 얻은 경우 이 모듈은 무료로 제공되며, 그렇지 않으면 모듈을 따로 구입할 수 있습니다.
:::

[MS Project용 내보내기 모듈 사용 방법 읽기](guides/msp-export-module.md).

## MS Project로 내보내기

Gantt 컴포넌트는 Gantt 차트의 링크, 작업 및 리소스를 MS Project로 내보낼 수 있습니다.

Gantt 차트의 데이터를 MS Project로 내보내려면 다음과 같이 수행합니다:

- 내보내기/가져오기 기능을 사용하려면 [plugins](api/method/plugins.md) 메서드를 통해 <b>export_api</b> 플러그인을 활성화합니다:

~~~js
gantt.plugins({
    export_api: true
});
~~~

온라인 내보내기 서비스 또는 로컬 내보내기 모듈을 사용할 수 있게 됩니다.

:::note
Gantt 버전이 8.0 미만인 경우 내보내기 기능을 활성화하려면 페이지에 `https://export.dhtmlx.com/gantt/api.js`를 포함해야 합니다. 예를 들면:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- [exportToMSProject](api/method/exporttomsproject.md) 메서드를 호출하여 Gantt 차트의 데이터를 MS Project로 내보냅니다.

~~~js
gantt.exportToMSProject();
~~~

이 메서드는 원격 서비스로 요청을 보내며, XML Project 파일을 출력하거나 생성된 파일을 다운로드할 수 있는 URL을 반환합니다.

**관련 샘플**: [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

### Export 설정

The exportToMSProject() 메서드는 여러 속성을 가진 객체를 매개변수로 받습니다(모든 속성은 선택적).

- **name** - (string) 얻은 파일의 이름(기본값은 'gantt.xml').

~~~js
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) 내보낸 프로젝트의 작업 일정 모드를 나타냅니다. **true**면 작업이 자동으로 스케줄링되고, **false**면 수동으로 스케줄링된 것으로 간주됩니다(기본 설정).

~~~js
gantt.exportToMSProject({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) 순환 링크를 제거할지 여부를 나타냅니다(참조값이 true일 경우 제거, 기본 모드). 

~~~js
gantt.exportToMSProject({
    skip_circular_links: false
});
~~~

- **project** - (object) 내보낸 프로젝트 엔티티에 커스텀 속성을 설정합니다.

~~~js
gantt.exportToMSProject({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': function () {
            return gantt.config.hours_per_day * 60;
        }
    }
});
~~~

이 객체의 속성은 MS Project의 해당 속성에 대응합니다. 지원되는 속성 목록은 [여기](guides/tags.md)에서 확인할 수 있습니다. 속성은 고정 값이거나 내보내기 호출 시 실행될 함수일 수 있습니다.

- **tasks** - (object) 내보낸 작업 항목에 커스텀 속성을 설정합니다.

~~~js
gantt.exportToMSProject({
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

이 객체의 속성은 MS Project의 해당 작업 엔티티에 대응합니다. 지원되는 속성 목록은 [여기](guides/tags.md#tasks-properties)에서 확인할 수 있습니다. 속성은 고정 값이거나 내보내기 호출 시 각 작업마다 실행될 함수일 수 있습니다.

- **data** - (object) 출력 Gantt 차트에 표시될 커스텀 데이터 소스를 설정합니다.

:::note
start_date와 end_date 속성은 날짜와 시간을 모두 포함하는 형식으로 지정되어야 한다고 가정합니다(%d-%m-%Y %H:%i).
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

gantt.exportToMSProject({
    data: customData
});
~~~

**관련 샘플**: [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)

- **callback** - (function) 생성된 XML의 다운로드 URL을 받으려면 *callback* 속성을 사용할 수 있습니다. JSON 객체에 *url* 속성이 들어 있습니다:

~~~js
gantt.exportToMSProject({
    callback: function(res){
        alert(res.url);
    }
});
~~~

- **resources** - (array) MS Project 파일로 리소스 목록을 내보냅니다.

~~~js
gantt.exportToMSProject({
    resources: [
        { "id": "1", "name": "John", "type": "work" },
        { "id": "2", "name": "Mike", "type": "work" },
        { "id": "3", "name": "Anna", "type": "work" }
    ]
});
~~~

가능한 리소스 유형은 "work", "cost", "material"입니다. 리소스 할당은 작업 구성의 **ResourceAssignments** 속성을 사용하여 지정합니다:

~~~js {23-25}
var users = [// resources
    { key:'0', label: "N/A" },
    { key:'1', label: "John" },
    { key:'2', label: "Mike" },
    { key:'3', label: "Anna" }
];

gantt.exportToMSProject({
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

- **ResourceAssignments** 속성은 작업 객체를 매개변수로 받아 문자열/숫자 값 또는 문자열/숫자 값의 배열을 반환하는 함수로 설정됩니다:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~

자원 할당의 *units* 매개변수는 ResourceAssignments 속성에 다음 객체를 반환함으로써 지정할 수 있습니다:

~~~js
{
    resource_id: "id",
    units: "units value"
}
~~~

- **resource calendars**

기본적으로 각 작업에는 일정이 부여됩니다. 리소스 달력이 사용되는 경우 내보내기 중에 작업의 CalendarUID 속성에 -1을 지정해야 하며(작업 객체 내에서), 그러면 작업은 리소스 달력을 사용하게 됩니다.

리소스 달력을 내보내는 동안 [리소스 배열](#export-settings)에 있는 객체 안에서 리소스 달력을 지정할 수도 있습니다:

~~~js
gantt.exportToMSProject({
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

- **server** - (string) 요청의 API 엔드포인트. 로컬에 설치된 내보내기 서비스와 함께 사용할 수 있습니다. 기본 값은 `https://export.dhtmlx.com/gantt`입니다.

~~~js
gantt.exportToMSProject({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## MS Project에서의 가져오기

XML 또는 MPP MS Project 파일을 변환하려면 내보내기 서비스에 다음 요청을 보내야 합니다:

 - 요청 URL - `https://export.dhtmlx.com/gantt`
 - 요청 메서드 - **POST**
 - Content-Type - **multipart/form-data**

요청 매개변수:

 - **file** - MPP 또는 XML MS Project 파일
 - **type** - "msproject-parse"
 - **data** - (*optional*) 설정이 포함된 JSON 문자열

예:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <button type="submit">Get</button>
</form>
~~~

또는 [클라이언트 측 API](api/method/importfrommsproject.md)를 사용할 수 있습니다. 예:

~~~js
gantt.importFromMSProject({
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

**관련 샘플**: [Import MSP 파일에서 작업 유형 가져오기](https://snippet.dhtmlx.com/sjka4br8)

파일 *file*은 XML 또는 MPP 프로젝트 파일을 포함해야 하는 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 인스턴스입니다.

:::note
**gantt.importFromMSProject**는 HTML5 File API 지원이 필요합니다.
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

 
- **data** - (*object*) Gantt [데이터 객체](guides/supported-data-formats.md). 각 작업은 다음 속성을 가집니다: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. 날짜는 "%Y-%m-%d %H:%i" 형식의 문자열로 표현됩니다.
- **config** - (*object*) MS Project 파일에서 가져온 설정이 포함된 Gantt [구성 객체](api/overview/properties-overview.md).
- **resources** - (*array*) 객체 배열(각 객체는 다음 속성을 가집니다: (*id: string, name: string, type: string, calendar: string*)). 프로젝트 파일의 리소스 목록을 나타냅니다.
- **worktime** - (*object*) 프로젝트 달력의 작업 시간을 담은 객체. 다음 속성을 포함할 수 있습니다:
    - **id** - (*string | number*) 선택적, 달력 ID
    - **hours** - (*array*) 전역 작업 시간이 포함된 배열로, 작업의 시작 및 종료 시간을 설정합니다
    - **dates** - (*array*) 날짜 배열로, 포함될 수 있는 값은:
        - 주의 요일 7일(0은 일요일부터 6은 토요일까지), 1/true는 작업일, 0/false는 비작업일
        - 기타 레코드는 날짜입니다
- **calendars** - (*array*) 새 달력을 만들기 위한 달력 구성 객체를 담고 있는 배열.
    - **calendarConfig** - (*object*) 달력 구성 객체로 다음 속성을 포함할 수 있습니다:
        - **id** - (*string | number*) 선택적, 달력 ID
        - **name** - (*string*) 달력 이름
        - **hours** - (*array*) 전역 작업 시간이 포함된 배열로, 작업의 시작 및 종료 시간을 설정합니다
        - **dates** - (*array*) 날짜 배열로, 포함될 수 있는 값은:
            - 주의 요일 7일(0은 일요일부터 6은 토요일까지), 1/true는 작업일, 0/false는 비작업일
            - 기타 레코드는 날짜

### Import 설정

#### 지속 시간 단위 설정

예상 지속 시간 단위를 서버로 보낼 수 있으며, 문자열로 구성된 durationUnit("분", "시간", "일", "주", "월", "년")도 보낼 수 있습니다.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
        value="{ "durationUnit": "hour" }" />
    <button type="submit">Get</button>
</form>
~~~

또는

~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    callback: function(project){}
});
~~~

#### 프로젝트 속성 얻기

프로젝트 필드를 얻으려면 필요한 필드들의 배열을 포함하는 projectProperties 입력을 서버로 보낼 수 있습니다. 이는 MS Project 엔티티의 임의 속성을 추출하여 출력의 config 속성에 넣습니다. 지원되는 [속성] 목록은 [여기](guides/tags.md#project-properties)에서 확인할 수 있습니다.

 - **projectProperties** - 응답에 포함될 프로젝트 속성의 배열을 지정합니다.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
        value="{ "projectProperties": ["Author", "Title"] }" />
    <button type="submit">Get</button>
</form>
~~~

또는

~~~js
gantt.importFromMSProject({
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

작업 필드를 얻으려면 필요한 필드들의 배열을 포함하는 taskProperties 입력을 서버로 보낼 수 있습니다. 이는 MS Project Task 엔티티의 임의 속성을 추출합니다. 지원되는 [속성] 목록은 [여기](guides/tags.md#tasks-properties)에서 확인할 수 있습니다:

 - **taskProperties** - 가져올 추가 작업 속성의 배열을 지정합니다.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
        value="{ "taskProperties": ["Contact", "Priority"] }" />
    <button type="submit">Get</button>
</form>
~~~
또는
~~~js
gantt.importFromMSProject({
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

다음 로직은 작업 유형을 얻는 방법을 제공합니다: Projects 유형의 작업은 Summary: "1" 속성을 가지고, Milestone 유형의 작업은 Milestone: "1" 속성을 가집니다. 이 속성들로 데이터를 가져온 후, 이 속성들에 따라 작업 유형을 설정해야 합니다.

다음과 같이 내보내기 함수를 호출하는 모양은 다음과 같습니다:

~~~js
gantt.importFromMSProject({
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

그 후 수신된 속성에 따라 작업 유형을 다음과 같이 변환할 수 있습니다:

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

**관련 샘플**: [Gantt. Import MSP files. Get task type from properties](https://snippet.dhtmlx.com/sjka4br8)

#### 달력 추가 및 조정

가져오기 중에 달력이 자동으로 추가되지는 않는다는 점에 주의하십시오. addCalendar() 메서드를 사용하여 수동으로 추가해야 합니다. 그런 다음 setWorkTime() 메서드를 통해 달력 설정을 지정합니다. 예를 들면:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // 달력 추가를 위한 설정
            project.calendars.forEach(function (calendar) {
                let addedCalendar;
                // 글로벌 달력의 작업 시간 설정 추가
                if (calendar.id == project.config.global_calendar_id) {
                    addedCalendar = gantt.getCalendar("global");
                }
                else {
                    // Gantt는 hours 매개변수가 비어 있으면 달력을 추가하지 않습니다
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

**관련 샘플**: [Gantt. Calendars settings for export/import in MSProject and Primavera6](https://snippet.dhtmlx.com/668xqts7)

#### 리소스 달력

리소스 달력이 있는 경우, [gantt.config.resource_calendars](api/config/resource_calendars.md) 속성으로 설정해야 합니다:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // 달력 설정
            project.calendars.forEach(function (calendar) {
                // 달력을 추가하고 작업 시간 설정 적용
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

**관련 샘플**: [Gantt. Resource calendars settings for export/import in MSProject and Primavera6](https://snippet.dhtmlx.com/10czv54b)

#### 리소스 및 리소스 할당

파일 내 리소스가 있는 경우 가져오기 시 resources 배열에 포함됩니다. resources 속성의 calendar 매개변수는 리소스 달력을 지정합니다:

~~~js
{
    resources: [
        { id: 6, name: "John", type: "work", calendar: "8" },
        // 더 많은 리소스들
    ]
}
~~~

리소스 할당이 있는 경우, assignments 배열에 가져오며, 할당 객체는 *resource_id: string* 와 *value: number* 매개변수를 포함합니다. 예를 들면:

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
        // 더 많은 작업들
    ],
    links: [],
    assignments: [
        { id: 1, task_id: 5, resource_id: 6, value: 3},
        // 더 많은 할당
    ],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        // 더 많은 리소스
    ]
}
~~~

## 대용량 파일의 요청 크기 제한 및 가져오기

MSProject 내보내기/가져오기 서비스에는 두 개의 API 엔드포인트가 있습니다:

- `https://export.dhtmlx.com/gantt` - 기본 엔드포인트로 모든 내보내기 메서드(*exportToPDF*, *exportToPNG*, *exportToMSProject*, 등)에 사용됩니다. **최대 요청 크기 10 MB**.
- `https://export.dhtmlx.com/gantt/project` - [MSProject](guides/export-msproject.md) 및 [ Primavera P6](guides/export-primavera.md) 내보내기/가져오기 서비스에 특화된 엔드포인트(*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*만 해당). **최대 요청 크기: 40 MB**.

엔드포인트는 export 구성 객체의 **server** 속성으로 지정할 수 있습니다:

~~~js
gantt.importFromMSProject({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // 일부 로직
    }
}); 
~~~

엔드포인트가 명시되지 않은 경우 기본값인 `https://export.dhtmlx.com/gantt`가 사용됩니다. 위와 같은 동작은 아래의 호출과 동일합니다:

~~~js
gantt.importFromMSProject({
    data: file,
    callback: function(project){
       // 일부 로직
    }
});
~~~

4MB를 초과하는 대형 프로젝트를 내보내거나 가져오기 위해서는 두 번째 엔드포인트를 사용할 수 있습니다:

~~~js
gantt.importFromMSProject({
    server: "https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // 일부 로직
    }
}); 
~~~

이 엔드포인트는 최대 40MB 크기의 요청 전송을 가능하게 하며 MS Project의 내보내기 및 가져오기를 지원합니다. 이는 MS Project 내보내기 전용으로 사용할 수 있습니다.

다른 메서드 예: `gantt.exportToPDF({server:"https://export.dhtmlx.com/gantt/project"})` 는 서버 오류를 반환해야 합니다.

## dhtmlxGantt vs MS Project 시간 계산

dhtmlxGantt와 MS Project에서 날짜 계산 방식 간에는 근본적인 차이가 있으며, 경우에 따라 서로 다른 결과를 낳습니다.

차이점은 gantt에서 사용하는 구성의 조합에 따라 달라지기도 합니다. 하지만 내보내기 결과에 영향을 줄 수 있는 gantt의 설정을 변경할 수 있습니다:

1. 먼저, dhtmlxGantt와 MS Project 간의 지속 시간 변환에 차이가 있습니다.

이를 피하려면 MS Project로 내보낼 때 HoursPerDay와 MinutesPerDay를 지정하십시오:

~~~js
gantt.exportToMSProject({
    project: {
        HoursPerDay: function () {
            return 24;
        },
        MinutesPerDay: function () {
            return 24 * 60;
        }
    }
});
~~~

**관련 샘플**: [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)

2. 둘째, 프로젝트가 work_time 설정을 비활성화했을 수 있습니다:

~~~js
gantt.config.work_time = false;
~~~

참고로, 작업 시간 계산이 비활성화되더라도 내보내기 클라이언트는 항상 기본 달력을 MS Project로 전송합니다. 따라서 MS Project는 작업 기간을 다르게 계산합니다.

해결 방법으로 기본 달력을 지워서 MS Project로 전송되더라도 차트에서와 같은 방식으로 작업 기간이 계산되도록 할 수 있습니다:

~~~js
gantt.setWorkTime({day:0, hours:[0,24]});
gantt.setWorkTime({day:1, hours:[0,24]});
gantt.setWorkTime({day:2, hours:[0,24]});
gantt.setWorkTime({day:3, hours:[0,24]});
gantt.setWorkTime({day:4, hours:[0,24]});
gantt.setWorkTime({day:5, hours:[0,24]});
gantt.setWorkTime({day:6, hours:[0,24]});
~~~

3. 또한, [gantt.config.duration_unit](api/config/duration_unit.md)를 "day"로 지정했을 때 요약 항목의 날짜 차이가 벌어지는 경우가 있습니다:

~~~js
gantt.config.duration_unit = "day";
~~~

이 경우 차트는 총 일 수로 반올림하지만 MS Project는 소수점 형태로 남길 수 있습니다. 예를 들어 상단 프로젝트의 지속 기간은 차트에서 439로 보이지만 MS Project에서는 438.58로 보일 수 있습니다.

이 문제의 유일한 해결 방법은 duration_unit를 시간 단위로 전환하는 것입니다:

~~~js
gantt.config.duration_unit = "hour";
~~~

**관련 샘플**: [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)