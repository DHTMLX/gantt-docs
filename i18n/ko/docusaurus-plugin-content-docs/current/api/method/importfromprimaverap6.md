---
sidebar_label: importFromPrimaveraP6
title: importFromPrimaveraP6 메서드
description: "XML 또는 XER Primavera P6 파일을 JSON으로 변환"
---

# importFromPrimaveraP6

### Description

@short: XML 및 XER Primavera P6 파일을 JSON으로 변환

@signature: importFromPrimaveraP6: (config: any) => void

### Parameters

- `config` - (required) *object* - 수입된 파일의 구성 속성을 가진 객체

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

### Details

:::note
이 메서드는 HTML5 File API 지원이 필요합니다.
:::

:::note
이 메서드는 **export** 확장에 정의되어 있으므로 [export_api](guides/extensions-list.md#export-service) 플러그인을 활성화해야 합니다. [Export/Import for Excel, Export to iCal](guides/excel.md#importfromexcel) 문서에서 자세한 내용을 확인하십시오.
:::

:::note
Gantt 버전이 8.0 미만인 경우 온라인 내보내기 서비스를 활성화하기 위해 페이지에 다음을 포함해야 합니다. 예: 

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

메서드는 가져온 파일의 구성 속성을 가진 객체를 매개변수로 받습니다:

- **data** - XER 또는 XML 프로젝트 파일을 포함해야 하는 [File](https://developer.mozilla.org/en-US/docs/Web/API/File)의 인스턴스.
- **callback** - 콜백 함수.
- **durationUnit** - 예상 기간 단위를 설정합니다 ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - 응답에 포함될 프로젝트 속성 배열을 지정합니다.
- **taskProperties** - 가져올 추가 작업 속성들의 배열을 지정합니다.

수입 설정에 대한 상세 설명은 [관련 섹션](guides/export-primavera.md#import-settings)에서 확인하십시오.

## 응답

응답은 다음 구조의 JSON을 포함합니다:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {},
    calendars: []
}
~~~

- **data** - (*object*)gantt [data object](guides/supported-data-formats.md). 각 작업은 다음 속성을 가집니다: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. 날짜는 "%Y-%m-%d %H:%i" 형식의 문자열로 변환됩니다.
- **config** - (*object*) gantt [configuration](api/overview/properties-overview.md) 객체로 프로젝트 파일에서 가져온 설정을 포함합니다.
- **resources** - (*array*) 프로젝트 파일의 자원 목록을 나타내는 속성들로 구성된 객체 배열. 각 객체는 다음 속성을 가집니다: \{*id: string, name: string, type: string, calendar: string*\}
- **worktime** - (*object*) 프로젝트 달력의 근무 시간 설정을 포함하는 객체. 아래 속성을 포함할 수 있습니다:
    - **id** - (*string | number*) 선택적, 달력 ID
    - **hours** - (*array*) 전역 근무 시간 배열, 작업의 시작 및 종료 시각을 설정합니다
    - **dates** - (*array*) 날짜 배열로, 포함될 수 있는 내용은 다음과 같습니다:
        - 주 7일(0 - 일요일, 6 - 토요일), 1/true는 근무일, 0/false - 비근무일
        - 다른 기록은 날짜
- **calendars** - (*array*) 새 달력을 만들기 위한 달력 구성 객체 배열.
    - **calendarConfig** - (*object*) 다음 속성을 포함할 수 있는 달력 구성 객체:
      - **id** - (*string | number*) 선택적, 달력 ID
      - **name** - (*string*) 달력 이름
      - **hours** - (*array*) 전역 근무 시간 배열, 시작과 종료 시각을 설정합니다
      - **dates** - (*array*) 날짜 배열로, 포함될 수 있는 내용은 다음과 같습니다:
            - 주 7일(0 - 일요일에서 6 - 토요일까지), 1/true는 근무일, 0/false - 비근무일
            - 다른 기록은 날짜

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)
- [importFromExcel](api/method/importfromexcel.md)

### Related Guides
- [Export and Import from Primavera P6](guides/export-primavera.md#import-from-primavera-p6)