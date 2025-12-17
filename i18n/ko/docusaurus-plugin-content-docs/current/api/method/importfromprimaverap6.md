---
sidebar_label: importFromPrimaveraP6
title: importFromPrimaveraP6 method
description: "XML 또는 XER 형식의 Primavera P6 파일을 JSON 형식으로 변환합니다."
---

# importFromPrimaveraP6

### Description

@short: XML 또는 XER 형식의 Primavera P6 파일을 JSON 형식으로 변환합니다.

@signature: importFromPrimaveraP6: (config: any) =\> void

### Parameters

- `config` - (required) *object* - 가져올 파일에 대한 구성 옵션을 포함하는 객체입니다.

### Example

~~~jsx
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

### Related samples
- [Import Primavera P6 file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_primaverap6.html)

### Details

:::note
이 메서드는 HTML5 File API 지원이 필요합니다. 
:::

:::note
이 메서드는 **export** 확장 기능의 일부이므로 [export_api](guides/extensions-list.md#exportservice) 플러그인이 활성화되어야 합니다. 자세한 내용은 [Export and Import from Primavera P6](guides/export-primavera.md#importfromprimaverap6) 문서를 참조하세요. 
:::

:::note
Gantt 8.0 이전 버전에서는 온라인 내보내기 서비스를 사용하려면 페이지에 **https://export.dhtmlx.com/gantt/api.js**를 포함해야 합니다. 예:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

이 메서드는 가져올 파일에 대한 구성 옵션을 포함하는 객체를 인수로 받습니다:

- **data** - XER 또는 XML 프로젝트 파일을 포함하는 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 인스턴스입니다.
- **callback** - 가져오기 완료 후 호출되는 함수입니다.
- **durationUnit** - 예상되는 기간 단위("minute", "hour", "day", "week", "month", "year")를 설정합니다.
- **projectProperties** - 응답에 포함할 프로젝트 속성 배열입니다.
- **taskProperties** - 가져올 추가 작업 속성 배열입니다.

## 응답

응답은 다음과 같은 구조의 JSON 객체입니다:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {}
}
~~~

- **data** - 각 작업에 *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource* 등의 속성이 포함된 gantt [데이터 객체](guides/supported-data-formats.md#json)입니다. 날짜는 "%Y-%m-%d %H:%i" 형식의 문자열로 표시됩니다.
- **config** - 프로젝트 파일에서 추출된 설정을 포함하는 gantt [구성](api/overview/properties-overview.md) 객체입니다.
- **resources** - 프로젝트 파일에서 가져온 리소스를 나타내는 객체 배열로, 각 객체는 *id*, *name*, *type*을 포함합니다.
- **worktime** - 프로젝트 캘린더의 근무 시간 설정을 포함하는 객체입니다.

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export and Import from Primavera P6](guides/export-primavera.md#importfromprimaverap6)

