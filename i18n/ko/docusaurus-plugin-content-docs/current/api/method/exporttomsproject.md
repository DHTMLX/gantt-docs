---
sidebar_label: exportToMSProject
title: exportToMSProject 메서드
description: "Gantt 차트에서 MS Project로 데이터를 내보냅니다"
---

# exportToMSProject

### Description

@short: Gantt 차트의 데이터를 MS Project로 내보냅니다

@signature: exportToMSProject: (_export_?: any) => void

### Parameters

- `export`	- object - optional, an object with export settings (see the details)

### Example

~~~jsx
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

### Details

:::note
note 이 메서드는 **export** 확장 기능의 일부이므로 [export_api](guides/extensions-list.md#exportservice) 플러그인을 활성화해야 합니다. 자세한 내용은 [MS Project로부터의 내보내기 및 가져오기](guides/export-msproject.md#exporttomsproject) 문서를 참고하세요.
 
:::

:::note
참고: Gantt 버전이 8.0 미만인 경우 온라인 내보내기 서비스를 활성화하려면 페이지에 `https://export.dhtmlx.com/gantt/api.js`를 포함해야 합니다. 예:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

The **exportToMSProject()** 메서드는 매개변수로 여러 속성을 가진 객체를 받습니다(모든 속성은 선택적임):

- **name** - (*string*) 얻은 파일의 이름(기본값은 'gantt.xml').
- **auto_scheduling** - (*boolean*) 내보낸 프로젝트의 작업 스케줄링 모드를 나타냅니다. **true**는 작업을 자동으로 스케줄링으로 표시하고, **false**는 수동으로 스케줄링된 상태로 표시합니다(기본값).
- **skip_circular_links** - (*boolean*) 순환 연결이 제거될지 여부를 나타냅니다. 참은 제거, 기본 모드. 거짓은 제거되지 않음.
- **project** - (*object*) 내보낸 프로젝트 엔티티에 사용자 정의 속성을 설정합니다.
- **tasks** - (*object*) 내보낸 작업 항목에 사용자 정의 속성을 설정합니다.
- **data** - (*object*) 출력될 Gantt 차트에 표시될 사용자 정의 데이터 소스를 설정합니다. **start_date**와 **end_date** 속성은 날짜와 시간을 모두 포함하는 형식으로 지정되어야 합니다(*%d-%m-%Y %H:%i*).
- **callback** - (*function*) 생성된 XML의 다운로드 URL을 받고 싶다면 *callback* 속성을 사용할 수 있습니다. 이 값은 *url* 속성을 가진 JSON 객체를 받습니다.
- **resources** - (*array*) MS Project 파일로 리소스 목록을 내보낼 수 있습니다. 리소스 캘린더가 사용되는 경우 내보내기 중에 작업의 *CalendarUID* 속성에 -1을 지정해야 합니다(**tasks** 객체 내). 그러면 작업이 리소스 캘린더를 사용합니다.
- **server** - (*string*) 요청의 API 엔드포인트입니다. 로컬에 설치된 내보내기 서비스와 함께 사용할 수 있습니다. 기본값은 `https://export.dhtmlx.com/gantt`입니다.

내보내기 설정에 대한 자세한 설명은 [관련 섹션](guides/export-msproject.md#export-settings)을 확인하세요.

### Related API
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [MS Project로부터의 내보내기 및 가져오기](guides/export-msproject.md#exporttomsproject)

