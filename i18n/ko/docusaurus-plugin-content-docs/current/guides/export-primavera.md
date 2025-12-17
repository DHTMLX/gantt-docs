---
title: "Export and Import from Primavera P6"
sidebar_label: "Export and Import from Primavera P6"
---

Export and Import from Primavera P6
============================

dhtmlxGantt 라이브러리는 Gantt 차트의 데이터를 Primavera P6로 내보내는 것과 Primavera P6에서 Gantt 차트로 데이터를 가져오는 것을 지원합니다.

:::note
이 서비스는 무료로 사용할 수 있지만, 내보낸 파일에는 GPL 라이선스 하에 라이브러리의 워터마크가 포함됩니다.
라이선스를 구매하면 유효한 지원 기간(모든 PRO 라이선스의 경우 12개월) 동안 워터마크가 제거됩니다.
:::

여러 가지 내보내기 서비스가 로컬 컴퓨터에 설치할 수 있도록 제공되어, Gantt 차트를 직접 Primavera P6로 내보낼 수 있습니다.
내보내기 서비스는 Gantt 패키지에 포함되어 있지 않다는 점을 유념하세요.
사용 조건에 대한 자세한 내용은 [관련 문서](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)를 참고하세요.

온라인 내보내기 서비스 제한 사항
-----------------------------

:::note
내보내기 서비스는 처리 시간과 요청 크기에 제한이 있습니다.
:::

### 시간 제한

내보내기 과정이 20초를 초과하면, 작업이 취소되고 다음과 같은 오류가 표시됩니다:

~~~html
Error: Timeout trigger 20 seconds
~~~

여러 사용자가 동시에 Gantt 차트를 내보내는 경우, 처리 시간이 평소보다 오래 걸릴 수 있습니다. 그러나 각 사용자의 내보내기 요청에 소요되는 시간은 별도로 계산되므로, 이는 정상적인 동작입니다.

### 요청 크기 제한

공통 API 엔드포인트 **https://export.dhtmlx.com/gantt**는 모든 내보내기 메서드(*exportToPDF*, *exportToPNG*, *exportToMSProject* 등)를 처리하며, **최대 요청 크기는 10 MB**입니다.

또한 [MSProject](guides/export-msproject.md) 및 [Primavera P6](#limitsonrequestsizeandimportoflargefiles) 내보내기/가져오기 서비스(*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*)를 위한 전용 API 엔드포인트 **https://export.dhtmlx.com/gantt/project**도 있습니다. 이 엔드포인트는 **최대 요청 크기 40 MB**를 지원합니다.

내보내기 모듈 사용하기
---------------------

:::note
대용량 차트 내보내기를 위해 [독립 실행형 내보내기 모듈](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)을 사용할 수 있습니다.
이 모듈은 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 라이선스가 있으면 무료이며, [이 링크](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)를 통해 별도로 구매할 수도 있습니다.
:::

MS Project에서 내보내기 모듈 사용에 관한 자세한 내용은 [이 가이드](guides/msp-export-module.md)를 참고하세요. 이 모듈은 MS Project와 Primavera P6 모두에 대해 내보내기/가져오기를 지원합니다.

## Primavera P6로 내보내기 {#exporttoprimaverap6}


Gantt 컴포넌트는 링크, 작업, 리소스를 Primavera P6로 내보낼 수 있습니다.

Gantt 차트에서 Primavera P6로 데이터를 내보내려면 다음 단계를 따르세요:

- <b>export_api</b> 플러그인을 [plugins](api/method/plugins.md) 문서에 설명된 대로 활성화하세요:

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Gantt 8.0 이전 버전에서는 온라인 내보내기 서비스를 활성화하려면 **https://export.dhtmlx.com/gantt/api.js**를 페이지에 포함해야 합니다. 예시:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md) 메서드를 사용하여 Gantt 차트의 데이터를 내보냅니다:

~~~js
gantt.exportToPrimaveraP6();
~~~

이 메서드는 원격 서비스로 요청을 보내며, XML Project 파일을 생성하여 반환하거나 파일을 다운로드할 수 있는 URL을 제공합니다.


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


Primavera로 데이터를 내보낼 때, 프로젝트 작업의 **Summary** 속성이 *true*를 반환해야 올바르게 동작합니다:

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


**Related example:** [Custom properties for WBS tasks (PrimaveraP6's Summary tasks)](https://snippet.dhtmlx.com/r90hjlvo?tag="gantt")


### 응답

내보내기 서비스의 응답은 다음과 같은 구조의 JSON 객체입니다:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {}
}
~~~

- **data** - *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource* 등의 속성을 포함하는 작업이 있는 gantt [data object](guides/supported-data-formats.md#json)입니다. 날짜는 "%Y-%m-%d %H:%i" 형식의 문자열입니다.
- **config** - 프로젝트 파일에서 추출된 설정이 담긴 gantt [configuration](api/overview/properties-overview.md) 객체입니다.
- **resources** - 프로젝트 파일의 리소스를 나타내는 (*id: string, name:string, type:string*) 객체 배열입니다.
- **worktime** - 프로젝트 캘린더의 근무 시간 설정을 담고 있는 객체입니다.

### 내보내기 설정

**exportToPrimaveraP6()** 메서드는 여러 가지 선택적 속성을 가진 객체를 인자로 받을 수 있습니다:

- **name** - (string) 내보내는 파일의 이름을 지정합니다(기본값: 'gantt.xml').

~~~js
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) 내보낸 프로젝트에서 작업의 일정 모드를 정의합니다. **true**로 설정하면 자동 일정, **false**(기본값)로 설정하면 수동 일정이 됩니다.

~~~js
gantt.exportToPrimaveraP6({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) 순환 링크를 제거할지 여부를 결정합니다. **true**(기본값)이면 제거, **false**이면 유지합니다.

~~~js
gantt.exportToPrimaveraP6({
    skip_circular_links: false
});
~~~

- **project** - (object) 내보내는 프로젝트 엔터티에 사용자 정의 속성을 할당할 수 있습니다.

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

이 속성들은 [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))의" 속성에 해당합니다. 지원되는 속성 목록은 [여기](guides/properties.md)에서 확인할 수 있습니다. 값은 고정값이거나 내보내기 시 실행되는 함수일 수 있습니다.

- **tasks** - (object) 내보낸 작업 항목에 대한 사용자 정의 속성을 정의할 수 있습니다.

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

이 속성들은 [Task entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))에" 해당하며, 지원되는 [속성 목록](guides/properties.md#tasksproperties)이 있습니다. 값은 고정값이거나 각 작업별로 호출되는 함수일 수 있습니다.

- **data** - (object) 출력 Gantt 차트에 사용할 사용자 정의 데이터 소스를 제공합니다.

:::note
**start_date**와 **end_date**는 날짜와 시간(*%d-%m-%Y %H:%i*)이 모두 포함된 형식이어야 합니다.
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


**Related example:** [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)

))

- **callback** - (function) 생성된 XML 파일의 다운로드 URL을 받아올 때 사용할 수 있습니다. 콜백은 *url* 속성이 포함된 JSON 객체를 인자로 받습니다:

~~~js
gantt.exportToPrimaveraP6({
    callback: function(res){
        alert(res.url);
    }
});
~~~
 
- **resources** - (array) Primavera P6 파일에 리소스 목록을 내보낼 수 있습니다.

~~~js
gantt.exportToPrimaveraP6({
    resources: [
        {"id":"1","name":"John","type":"work"},
        {"id":"2","name":"Mike","type":"work"},
        {"id":"3","name":"Anna","type":"work"}
    ]
});
~~~

리소스 타입은 "work", "cost", "material" 중 하나일 수 있습니다. 리소스 할당은 작업 설정의 **ResourceAssignments** 속성을 통해 지정합니다:

~~~js
var users = [// resources
    {key:'0', label: "N/A"},
    {key:'1', label: "John"},
    {key:'2', label: "Mike"},
    {key:'3', label: "Anna"}
];

gantt.exportToPrimaveraP6({
    resources: users
        .filter(function(u){
            if(u.key === '0')//기본 옵션 제외 
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

**ResourceAssignments** 속성은 작업 객체를 받아 문자열/숫자 또는 문자열/숫자 배열을 반환하는 함수일 수 있습니다:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~


**Related example:** [Export Gantt with resources to Primavera P6](https://snippet.dhtmlx.com/6bfbwp8g)


- **server** - (string) 내보내기 요청의 API 엔드포인트를 지정합니다. 로컬 내보내기 서비스를 설치한 경우 사용할 수 있습니다. 기본값은 **https://export.dhtmlx.com/gantt**입니다.

~~~js
gantt.exportToPrimaveraP6({
    server:"https://myapp.com/myexport/gantt"
});
~~~


Primavera P6에서 가져오기
----------------------

XML 또는 XER 파일을 변환하려면 다음 정보를 포함하여 내보내기 서비스로 POST 요청을 전송하세요:

 - 요청 URL: **https://export.dhtmlx.com/gantt**
 - 메서드: **POST**
 - Content-Type: **multipart/form-data**

요청 파라미터:

 - **file** - XER 또는 XML Primavera P6 파일
 - **type** - "primaveraP6-parse"로 설정
 - **data** - (*선택 사항*) 가져오기 설정이 담긴 JSON 문자열

예시:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <button type="submit">Get</button>
</form>
~~~

또는, [클라이언트 측 API](api/method/importfromprimaverap6.md)를 다음과 같이 사용할 수 있습니다:

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


[Import Primavera P6 file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_primaverap6.html)


여기서 *file*은 XML 또는 XER 프로젝트 파일을 담고 있는 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 객체여야 합니다.

:::note
**gantt.importFromPrimaveraP6**는 HTML5 File API 지원이 필요합니다.
:::

### 응답

응답은 다음과 같이 구성된 JSON 객체를 반환합니다:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {}
}
~~~

- **data** - 간트 [data object](guides/supported-data-formats.md#json)입니다. 각 작업에는 *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*와 같은 속성이 포함되어 있습니다. 날짜는 "%Y-%m-%d %H:%i" 형식으로 표시됩니다.
- **config** - 프로젝트 파일에서 추출된 설정을 포함하는 간트 [configuration](api/overview/properties-overview.md) 객체입니다.
- **resources** - 프로젝트 파일의 리소스를 나타내는 리소스 객체 배열(*id*, *name*, *type* 포함)입니다.
- **worktime** - 프로젝트 캘린더의 작업 시간 설정을 포함하는 객체입니다.


### 가져오기 설정

#### 기간 단위 설정

서버로 **durationUnit** 문자열("minute", "hour", "day", "week", "month", "year")을 전송하여 예상 기간 단위를 지정할 수 있습니다.

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

#### Project 속성 가져오기

특정 프로젝트 필드를 가져오기 위해 **projectProperties** 입력값에 원하는 필드의 배열을 서버로 전송합니다. 이 입력값은 [Project 엔터티](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))에서" 속성을 추출하여 응답의 **config** 속성에 포함시킵니다. 지원되는 [속성들](guides/properties.md#projectproperties)이 나열되어 있습니다.

 - **projectProperties** - 응답에 포함할 프로젝트 속성을 지정하는 배열입니다.

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

#### 작업 속성 가져오기

특정 작업 필드를 가져오기 위해 **taskProperties** 입력값에 원하는 필드의 배열을 서버로 전송합니다. 이 입력값은 [Task 엔터티](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))에서" 속성을 추출합니다. 지원되는 [속성들](guides/properties.md#tasksproperties)이 제공됩니다.

 - **taskProperties** - 가져올 추가 작업 속성을 지정하는 배열입니다.

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


#### 작업 유형 가져오기

작업 유형을 확인하는 방법은 다음과 같습니다: **Project**로 표시된 작업에는 `Summary: "1"` 속성이, **Milestone**으로 표시된 작업에는 `Milestone: "1"` 속성이 있습니다. 데이터를 가져올 때 이러한 속성을 활용하여 작업 유형을 결정할 수 있습니다.

가져오기 함수는 아래와 같이 호출합니다:

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

가져온 후, 다음과 같이 해당 속성에 따라 작업 유형을 지정할 수 있습니다:

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


**Related example:** [Gantt. Import Primavera P6 files. Get task type from properties](https://snippet.dhtmlx.com/y95rsxor)

))

## 요청 크기 제한 및 대용량 파일 가져오기

Primavera P6 내보내기/가져오기 서비스에는 두 개의 API 엔드포인트가 있습니다:

- **https://export.dhtmlx.com/gantt** - 모든 내보내기 메소드(*exportToPDF*, *exportToPNG*, *exportToPrimaveraP6* 등)에 사용되는 기본 엔드포인트입니다. **최대 요청 크기는 10MB**입니다.
- **https://export.dhtmlx.com/gantt/project** - [MSProject](guides/export-msproject.md) 및 [Primavera P6](guides/export-primavera.md) 내보내기/가져오기 서비스(*exportToMSProject*, *importFromMSProject*, *exportToPrimaveraP6*, *importFromPrimaveraP6*) 전용 엔드포인트입니다. 이 엔드포인트는 **최대 40MB**까지 지원합니다.

엔드포인트는 내보내기 설정 객체의 **server** 속성으로 지정할 수 있습니다:

~~~js
gantt.importFromPrimaveraP6({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

엔드포인트를 지정하지 않으면 기본값 <b>https://export.dhtmlx.com/gantt</b>가 사용됩니다. 아래 호출은 위와 동일하게 동작합니다:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    callback: function(project){
       // some logic
    }
});
~~~

4MB를 초과하는 대형 프로젝트를 처리하려면 두 번째 엔드포인트를 사용할 수 있습니다:

~~~js
gantt.importFromPrimaveraP6({
    server:"https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

이 엔드포인트는 최대 40MB까지 요청을 허용하며, Primavera P6의 내보내기와 가져오기를 모두 지원합니다. 이 엔드포인트는 특별히 Primavera P6 내보내기/가져오기를 위해 설계되었습니다.

다른 메소드에서 *gantt.exportToPDF((server:"https://export.dhtmlx.com/gantt/project"))*와 같이 사용하면 서버 오류가 발생할 수 있습니다.


