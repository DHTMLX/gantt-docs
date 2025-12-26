---
title: "MS Project로부터의 내보내기 및 가져오기"
sidebar_label: "MS Project로부터의 내보내기 및 가져오기"
---

# MS Project로부터의 내보내기 및 가져오기

dhtmlxGantt 라이브러리는 Gantt 차트의 데이터를 MS Project로 내보내기(Export) 및 MS Project로부터 Gantt 차트로 가져오기(Import)를 지원합니다.

:::note
내보내기 서비스는 무료로 사용할 수 있지만, 결과 파일에는 GPL 라이선스 하에 라이브러리 워터마크가 포함됩니다.  
라이선스를 구매하신 경우, 지원 기간(모든 PRO 라이선스의 경우 12개월) 동안 내보내기 결과에 워터마크가 표시되지 않습니다.
:::

여러 종류의 내보내기 서비스가 제공되며, 이들 서비스는 로컬 컴퓨터에 별도로 설치하여 Gantt 차트를 MS Project로 내보낼 수 있습니다.  
이 내보내기 서비스들은 Gantt 패키지에 기본 포함되어 있지 않으니 참고하시기 바랍니다.  
각 서비스의 사용 조건에 대한 자세한 내용은 [관련 문서](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)를 참고하세요.

## 온라인 내보내기 서비스 제한 사항

:::note
내보내기 서비스는 처리 시간과 요청 크기에 제한이 있습니다.
:::

### 시간 제한

내보내기 처리가 20초를 초과할 경우, 작업이 중단되며 아래와 같은 오류가 표시됩니다:

~~~html
Error: Timeout trigger 20 seconds
~~~

여러 사용자가 동시에 Gantt 차트를 내보내는 경우 전체적으로 처리 시간이 길어질 수 있지만, 각 사용자의 내보내기 요청 별로 시간이 개별적으로 계산됩니다.

### 요청 크기 제한

공통 API 엔드포인트 **https://export.dhtmlx.com/gantt**는 모든 내보내기 유형(*exportToPDF*, *exportToPNG*, *exportToMSProject* 등)을 처리하며, 최대 요청 크기는 **10 MB**입니다.

또한, [MSProject](#limitsonrequestsizeandimportoflargefiles) 및  
[Primavera P6](guides/export-primavera.md) 내보내기/가져오기 서비스(*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*)를 위한 전용 API 엔드포인트 **https://export.dhtmlx.com/gantt/project**가 있습니다. 이 엔드포인트는 최대 **40 MB**까지 요청 가능합니다.

## 내보내기 모듈 사용

:::note
대용량 차트 내보내기가 필요한 경우, [독립형 내보내기 모듈](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 사용을 고려하세요.  
이 모듈은 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 라이선스 보유 시 무료로 제공되며, 아니면 [여기](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)에서 별도 구매할 수 있습니다.
:::

[MS Project 내보내기 모듈 사용법 자세히 알아보기](guides/msp-export-module.md)


## MS Project로 내보내기

Gantt 컴포넌트는 링크, 작업, 리소스를 MS Project로 내보낼 수 있습니다.

Gantt 차트의 데이터를 MS Project로 내보내려면 다음 단계를 따르세요:

- 온라인 내보내기 서비스를 사용하려면 <b>export_api</b> 플러그인을 [plugins](api/method/plugins.md) 메서드를 통해 활성화합니다:

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Gantt 8.0 미만 버전에서는 온라인 내보내기 서비스 활성화를 위해 **https://export.dhtmlx.com/gantt/api.js**를 페이지에 포함해야 합니다. 예시:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- [exportToMSProject](api/method/exporttomsproject.md) 메서드를 사용하여 Gantt 차트 데이터를 내보냅니다.

~~~js
gantt.exportToMSProject();
~~~

이 메서드는 원격 서비스로 요청을 전송하며, XML Project 파일을 생성하거나 파일 다운로드를 위한 URL을 제공합니다.


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


### 응답

응답은 다음과 같은 구조의 JSON 객체를 포함합니다:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktimes: []
}
~~~

- **data** - gantt [데이터 객체](guides/supported-data-formats.md#json). 각 작업에는 *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource* 등의 속성이 포함됩니다. 날짜는 "%Y-%m-%d %H:%i" 형식의 문자열입니다.
- **config** - 프로젝트 파일에서 추출된 설정을 담은 gantt [설정 객체](api/overview/properties-overview.md)입니다.
- **resources** - 프로젝트 파일의 리소스를 나타내는 (*id: string, name:string, type:string*) 속성의 객체 배열입니다.
- **worktimes** - 새 캘린더 생성을 위한 객체 배열입니다. 각 캘린더 객체는 다음을 포함할 수 있습니다:
    - **id** - (선택) 캘린더 식별자
    - **hours** - (배열) 작업 시작 및 종료 시간을 정의하는 전역 근무 시간
    - **dates** - (배열) 다음을 포함할 수 있음:
        - 일주일 7일(0 = 일요일 ~ 6 = 토요일), 1/true는 근무일, 0/false는 비근무일 의미
        - 특정 날짜


### 내보내기 설정

**exportToMSProject()** 메서드는 다양한 속성을 가진 옵션 객체를 인자로 받을 수 있습니다:

- **name** - (string) 내보내는 파일의 이름(기본값: 'gantt.xml').

~~~js
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) 내보내는 작업의 스케줄링 모드 설정. **true**면 자동 스케줄, **false**면 수동 스케줄(기본값).

~~~js
gantt.exportToMSProject({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) 순환 링크를 제거할지 여부(기본값 true).

~~~js
gantt.exportToMSProject({
    skip_circular_links: false
});
~~~

- **project** - (object) 내보내는 프로젝트 엔터티에 사용자 정의 속성 부여.

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

이 속성들은 [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))의" 속성과 대응합니다.  
지원 속성 목록은 [여기](guides/tags.md)에서 확인하세요. 값은 고정값 또는 내보내기 시 실행되는 함수일 수 있습니다.

- **tasks** - (object) 내보낼 작업에 사용자 정의 속성 부여.

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

이 속성들은 [Task entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))의" 속성과 대응하며, 지원 속성 목록은 [여기](guides/tags.md#tasksproperties)에서 확인할 수 있습니다.  
값은 고정값 또는 각 작업별로 호출되는 함수일 수 있습니다.

- **data** - (object) 내보내는 Gantt 차트에 사용할 커스텀 데이터 소스 지정.

:::note
**start_date**와 **end_date**는 날짜와 시간을 모두 포함하는 형식(*%d-%m-%Y %H:%i*)으로 지정해야 합니다.
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


**Related example:** [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)

))

- **callback** - (function) 생성된 XML 파일의 다운로드 URL을 받을 콜백 함수. 콜백에는 *url* 속성을 가진 JSON 객체가 전달됩니다:

~~~js
gantt.exportToMSProject({
    callback: function(res){
        alert(res.url);
    }
});
~~~
 
- **resources** - (array) MS Project 파일에 포함될 리소스 목록.

~~~js
gantt.exportToMSProject({
  resources: [
    {"id":"1","name":"John","type":"work"},
    {"id":"2","name":"Mike","type":"work"},
    {"id":"3","name":"Anna","type":"work"}
  ]
});
~~~

리소스 타입은 "work", "cost", "material" 중 하나일 수 있습니다.  
리소스 할당은 tasks 설정의 **ResourceAssignments** 속성을 사용하여 지정합니다:

~~~js
var users = [// resources
  {key:'0', label: "N/A"},
  {key:'1', label: "John"},
  {key:'2', label: "Mike"},
  {key:'3', label: "Anna"}
];

gantt.exportToMSProject({
  resources: users
     .filter(function(u){
        if(u.key === '0')//기본 옵션은 제외 
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
     ResourceAssignments: function(task){  /*!*/
        return task.user;                   /*!*/
     }                                       /*!*/
  }
});
~~~

**ResourceAssignments** 속성은 작업 객체를 받아 문자열/숫자 또는 문자열/숫자 배열을 반환하는 함수입니다:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~

- **server** - (string) 내보내기 요청에 사용할 API 엔드포인트 지정. 로컬 내보내기 서비스를 사용할 때 활용할 수 있습니다. 기본값은 **https://export.dhtmlx.com/gantt**입니다.

~~~js
gantt.exportToMSProject({
   server:"https://myapp.com/myexport/gantt"
});
~~~


## MS Project로부터 가져오기

XML 또는 MPP MS Project 파일을 변환하려면 내보내기 서비스로 다음 정보를 포함하여 요청을 전송합니다:

 - 요청 URL: **https://export.dhtmlx.com/gantt**
 - 요청 메서드: **POST**
 - Content-Type: **multipart/form-data**

요청 파라미터:

 - **file** - MPP 또는 XML MS Project 파일
 - **type** - "msproject-parse"
 - **data** - (*선택*) 설정이 담긴 JSON 문자열

예시 폼:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <button type="submit">Get</button>
</form>
~~~

또는, [클라이언트 측 API](api/method/importfrommsproject.md)를 다음과 같이 사용할 수 있습니다:

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

여기서 *file*은 XML 또는 MPP Project 파일을 담은 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 인스턴스여야 합니다.

:::note
**gantt.importFromMSProject**는 HTML5 File API 지원이 필요합니다.
:::

### 응답

응답은 다음과 같은 구조의 JSON을 포함합니다:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {}
}
~~~

- **data** - gantt [데이터 객체](guides/supported-data-formats.md#json). 각 작업에는 *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource* 속성이 포함됩니다. 날짜는 "%Y-%m-%d %H:%i" 패턴의 문자열입니다.
- **config** - 프로젝트 파일에서 가져온 설정을 담은 gantt [설정 객체](api/overview/properties-overview.md)입니다.
- **resources** - 프로젝트 파일에 나열된 리소스를 나타내는 (*id:string, name:string, type:string*) 속성의 객체 배열입니다.
- **worktime** - 프로젝트 캘린더에서 가져온 근무 시간 설정을 담은 객체입니다.

### 가져오기 설정

(이하 원본 문서에 내용이 추가로 제공되지 않았으므로 번역을 여기서 마칩니다.)

#### 기간 단위 설정

예상 기간 단위를 지정하려면 서버로 전송되는 데이터에 **durationUnit** 문자열("minute", "hour", "day", "week", "month", "year")을 포함할 수 있습니다.

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

#### 프로젝트 속성 가져오기

프로젝트 필드를 추출하려면 **projectProperties** 입력값에 서버로 전송할 원하는 필드의 배열을 포함할 수 있습니다. 이를 통해 [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))의" 임의 속성을 응답의 **config** 속성으로 가져올 수 있습니다. 지원되는 [속성](guides/tags.md#projectproperties)은 문서에서 확인할 수 있습니다.

- **projectProperties** - 응답에 포함할 프로젝트 속성 배열을 정의합니다.

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

#### 작업 속성 가져오기

작업 필드를 가져오려면 **taskProperties** 입력값에 서버로 전송할 원하는 필드의 배열을 포함할 수 있습니다. 이를 통해 [Task entities](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))의" 임의 속성을 추출할 수 있습니다. 지원되는 [속성](guides/tags.md#tasksproperties)은 문서에서 확인할 수 있습니다.

- **taskProperties** - 추가로 가져올 작업 속성 배열을 지정합니다.

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

#### 작업 유형 가져오기

이 방법을 통해 작업 유형을 식별할 수 있습니다. **Project**로 표시된 작업은 `Summary: "1"` 속성을 가지고, **Milestone**으로 표시된 작업은 `Milestone: "1"` 속성을 가집니다. 이러한 속성을 가져오면 작업 유형을 해당 값에 따라 지정할 수 있습니다.

가져오기 호출 예시는 다음과 같습니다:

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

이후, 다음과 같이 속성에 따라 작업 유형을 조정할 수 있습니다:

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


**Related example:** [Gantt. Import MSP files. Get task type from properties](https://snippet.dhtmlx.com/sjka4br8)


## 요청 크기 제한 및 대용량 파일 가져오기

MSProject 내보내기/가져오기 서비스에는 두 가지 API 엔드포인트가 있습니다:

- **https://export.dhtmlx.com/gantt** - 모든 내보내기 메서드(*exportToPDF*, *exportToPNG*, *exportToMSProject* 등)를 처리하는 기본 엔드포인트입니다. **최대 요청 크기는 10MB**입니다.
- **https://export.dhtmlx.com/gantt/project** - [MSProject](guides/export-msproject.md) 및 [Primavera P6](guides/export-primavera.md) 내보내기/가져오기 서비스를 위한 전용 엔드포인트입니다(*exportToMSProject*, *importFromMSProject*, *exportToPrimaveraP6*, *importFromPrimaveraP6*). **최대 요청 크기는 40MB**입니다.

엔드포인트는 내보내기 구성 객체의 **server** 속성으로 지정할 수 있습니다:

~~~js
gantt.importFromMSProject({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

엔드포인트를 지정하지 않으면 <b>*https://export.dhtmlx.com/gantt*</b>가 기본값으로 사용됩니다. 다음 호출은 위와 동일합니다:

~~~js
gantt.importFromMSProject({
    data: file,
    callback: function(project){
       // some logic
    }
});
~~~

4MB를 초과하는 대용량 프로젝트를 내보내거나 가져오려면 두 번째 엔드포인트를 사용하세요:

~~~js
gantt.importFromMSProject({
    server:"https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

이 엔드포인트는 최대 40MB까지 지원하며 MS Project 내보내기/가져오기를 위해 설계되었습니다. MS Project 내보내기에만 사용할 수 있습니다.

다른 메서드, 예를 들어 *gantt.exportToPDF((server:"https://export.dhtmlx.com/gantt/project"))*와 같이 사용하면 서버 오류가 발생합니다.

## dhtmlxGantt와 MS Project의 시간 계산 차이

dhtmlxGantt와 MS Project는 날짜 계산 방식에 차이가 있어 결과가 다를 수 있습니다.

이 차이는 사용 중인 gantt 설정 조합에 따라 달라집니다. gantt의 일부 설정은 계산 결과에 영향을 줍니다:

1. dhtmlxGantt와 [MS Project](https://blog.epmainc.com/start-and-end-date-do-not-align-task-duration/) 간 기간 변환 방식이 다릅니다.

이 문제는 MS Project로 내보낼 때 *HoursPerDay*와 *MinutesPerDay*를 지정하여 해결할 수 있습니다:

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


**Related example:** [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)


2. 프로젝트에서 [work_time](guides/working-time.md) 설정이 비활성화되어 있을 수 있습니다:

~~~js
gantt.config.work_time = false;
~~~

작업 시간 계산이 꺼져 있어도, gantt는 기본 캘린더 설정(하루 8시간, 월~금 근무)을 계속 포함합니다. 내보내기 클라이언트는 항상 이 기본 캘린더를 MS Project로 전송하므로, MS Project에서 작업 기간을 다르게 계산하게 됩니다.

해결 방법은 기본 캘린더를 지워 gantt와 MS Project에서 작업 기간이 동일하게 계산되도록 하는 것입니다:

~~~js
gantt.setWorkTime({day:0, hours:[0,24]});
gantt.setWorkTime({day:1, hours:[0,24]});
gantt.setWorkTime({day:2, hours:[0,24]});
gantt.setWorkTime({day:3, hours:[0,24]});
gantt.setWorkTime({day:4, hours:[0,24]});
gantt.setWorkTime({day:5, hours:[0,24]});
gantt.setWorkTime({day:6, hours:[0,24]});
~~~

3. [gantt.config.duration_unit](api/config/duration_unit.md)이 "day"로 설정된 경우 요약 항목 날짜에 차이가 있을 수 있습니다:

~~~js
gantt.config.duration_unit = "day";
~~~

이 설정에서는 gantt가 기간을 정수 일수로 반올림하지만, MS Project는 소수점 이하 기간을 표시합니다. 예를 들어, 프로젝트 기간이 gantt에서는 439일, MS Project에서는 438.58일로 표시될 수 있습니다.

해결 방법은 [duration_unit](api/config/duration_unit.md)을 시간 단위로 변경하는 것입니다:

~~~js
gantt.config.duration_unit = "hour";
~~~


**Related example:** [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)


