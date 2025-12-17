---
sidebar_label: exportToMSProject
title: exportToMSProject method
description: "Gantt 차트의 데이터를 MS Project로 내보냅니다."
---

# exportToMSProject

### Description

@short: Gantt 차트의 데이터를 MS Project로 내보냅니다.

@signature: exportToMSProject: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 선택 사항, 내보내기 설정을 포함하는 객체 (자세한 내용 참조)

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
note Gantt 버전 8.0 이전에서는 온라인 내보내기 서비스를 활성화하기 위해 페이지에 **https://export.dhtmlx.com/gantt/api.js** 스크립트를 포함해야 합니다. 예:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::


**exportToMSProject()** 메서드는 다음과 같은 여러 선택적 속성을 가진 객체를 인자로 받습니다:

- **name** - (*string*) 내보낼 파일의 이름 (기본값은 'gantt.xml').
- **auto_scheduling** - (boolean) 내보낸 프로젝트의 작업에 대한 스케줄링 모드를 설정합니다. **true**로 설정하면 작업이 자동 스케줄링되고, **false**는 수동 스케줄링으로 표시합니다(기본값).
- **skip_circular_links** - (boolean) 순환 링크를 제거할지 여부를 결정합니다. **true**(기본값)는 제거, **false**는 유지합니다.
- **project** - (object) 내보낸 프로젝트 엔티티에 사용자 정의 속성을 추가할 수 있습니다.
- **tasks** - (object) 내보낸 작업 항목에 사용자 정의 속성을 추가할 수 있습니다.
- **data** - (object) 출력될 Gantt 차트의 사용자 지정 데이터 소스를 지정할 수 있습니다. **start_date**와 **end_date**는 날짜와 시간을 모두 포함하는 형식(*%d-%m-%Y %H:%i*)이어야 합니다.
- **callback** - (function) 생성된 XML의 다운로드 URL을 받을 수 있는 콜백 함수입니다. 콜백은 *url* 속성을 포함하는 JSON 객체를 받습니다.
- **resources** - (array) MS Project 파일에 리소스 목록을 내보내도록 설정합니다.
- **server** - (string) 내보내기 요청을 위한 API 엔드포인트를 지정합니다. 로컬에 설치된 내보내기 서비스를 사용할 때 유용하며 기본값은 **https://export.dhtmlx.com/gantt**입니다.

## 응답

응답은 다음과 같은 구조의 JSON 객체를 반환합니다:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {}
}
~~~

- **data** - gantt [데이터 객체](guides/supported-data-formats.md#json)입니다. 각 작업은 *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*를 포함합니다. 날짜 형식은 "%Y-%m-%d %H:%i" 문자열 형식을 따릅니다.
- **config** - 프로젝트 파일에서 가져온 설정을 포함하는 gantt [구성](api/overview/properties-overview.md) 객체입니다.
- **resources** - 프로젝트 파일의 리소스를 나타내는 객체 배열로, 각 객체는 \{*id: string, name: string, type: string*\} 속성을 가집니다.
- **worktime** - 프로젝트 캘린더의 근무 시간 설정을 포함하는 객체입니다.

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

