---
sidebar_label: importFromMSProject
title: importFromMSProject method
description: "MS Project 파일(XML 또는 MPP 형식)을 JSON으로 변환합니다."
---

# importFromMSProject

### Description

@short: MS Project 파일(XML 또는 MPP 형식)을 JSON으로 변환합니다.

@signature: importFromMSProject: (config: any) =\> void

### Parameters

- `config` - (required) *object* - 가져온 파일에 대한 설정 정보를 포함하는 객체입니다.

### Example

~~~jsx
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

### Related samples
- [Import MS Project file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_mpp.html)

### Details

:::note
 이 메서드는 HTML5 File API 지원이 필요합니다. 
:::

:::note
 이 메서드는 **export** 확장 기능의 일부이므로, [export_api](guides/extensions-list.md#exportservice) 플러그인을 활성화해야 합니다. 자세한 내용은 [MS Project로부터의 내보내기 및 가져오기](guides/export-msproject.md#importfrommsproject) 문서를 참고하세요.

:::

:::note
Gantt 8.0 이전 버전에서는 온라인 export 서비스를 활성화하기 위해 페이지에 **https://export.dhtmlx.com/gantt/api.js** 스크립트를 포함해야 합니다. 예:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

이 메서드는 가져올 파일에 대한 설정 옵션을 포함하는 객체를 인수로 받습니다:

- **data** - MPP 또는 XML 프로젝트 파일을 포함하는 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 인스턴스입니다.
- **callback** - 가져오기 완료 후 호출되는 함수입니다.
- **durationUnit** - 예상되는 기간 단위를 지정합니다 ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - 응답에 포함할 프로젝트 속성들의 배열입니다.
- **taskProperties** - 추가로 가져올 작업 속성들의 배열입니다.

## Response

응답은 다음과 같은 구조의 JSON 객체를 반환합니다:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {}
}
~~~

- **data** - gantt [데이터 객체](guides/supported-data-formats.md#json)입니다. 각 작업은 *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource* 등의 속성을 포함합니다. 날짜는 "%Y-%m-%d %H:%i" 형식의 문자열로 표현됩니다.
- **config** - 프로젝트 파일에서 추출한 설정을 포함하는 gantt [구성](api/overview/properties-overview.md) 객체입니다.
- **resources** - 프로젝트 파일의 리소스를 나타내는 객체 배열로, 각 객체는 \{*id:string, name:string, type:string*\} 속성을 가집니다.
- **worktime** - 프로젝트 캘린더에서 가져온 근무 시간 설정을 담고 있는 객체입니다.

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)

### Related Guides
- [MS Project로부터의 내보내기 및 가져오기](guides/export-msproject.md#importfrommsproject)

