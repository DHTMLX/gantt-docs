---
sidebar_label: exportToPrimaveraP6
title: exportToPrimaveraP6 method
description: "Gantt 차트의 데이터를 Primavera P6로 내보냅니다."
---

# exportToPrimaveraP6

### Description

@short: Gantt 차트의 데이터를 Primavera P6로 내보냅니다.

@signature: exportToPrimaveraP6: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 선택 사항, 내보내기 설정을 포함하는 객체 (자세한 내용 참고)

### Example

~~~jsx
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

### Related samples
- [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

### Details

:::note
note 이 메서드는 **export** 확장 기능의 일부이므로, [export_api](guides/extensions-list.md#exportservice) 플러그인을 활성화해야 합니다. 자세한 내용은 [Primavera P6로 내보내기 및 가져오기](guides/export-primavera.md#exporttoprimaverap6) 문서에서 확인할 수 있습니다.
 
:::

:::note
note Gantt 버전 8.0 이전에서는 온라인 내보내기 서비스를 사용하기 위해 페이지에 **https://export.dhtmlx.com/gantt/api.js**를 포함해야 합니다. 예시는 다음과 같습니다:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::


**exportToPrimaveraP6()** 메서드는 여러 선택적 속성을 포함하는 객체를 인수로 받습니다:

- **name** - (*string*) 내보내기 파일의 이름 (기본값은 'gantt.xml').
- **auto_scheduling** - (boolean) 내보낸 프로젝트에서 작업의 스케줄링 모드를 정의합니다. **true**로 설정하면 작업이 자동 스케줄링되고, **false**는 수동 스케줄링(기본값)을 의미합니다.
- **skip_circular_links** - (boolean) 순환 링크를 제거할지 여부를 결정합니다. **true**면 제거(기본값), **false**면 유지합니다.
- **project** - (object) 내보낼 프로젝트 엔티티에 대한 사용자 지정 속성을 지정할 수 있습니다.
- **tasks** - (object) 내보낼 작업 항목에 대한 사용자 지정 속성을 설정할 수 있습니다.
- **data** - (object) 출력되는 Gantt 차트의 사용자 지정 데이터 소스를 제공할 수 있습니다. **start_date**와 **end_date**는 날짜와 시간이 모두 포함된 형식이어야 합니다 (*%d-%m-%Y %H:%i*).
- **callback** - (function) 생성된 XML 파일을 다운로드할 수 있는 URL을 받고 싶을 때 사용합니다. 이 함수는 *url*을 포함한 JSON 객체를 인수로 받습니다.
- **resources** - (array) Primavera P6 파일로 내보낼 리소스 목록을 지정할 수 있습니다.
- **server** - (string) 내보내기 요청을 위한 API 엔드포인트를 지정합니다. 로컬에 내보내기 서비스를 설치한 경우 사용할 수 있으며, 기본값은 **https://export.dhtmlx.com/gantt**입니다.

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

- **data** - gantt [데이터 객체](guides/supported-data-formats.md#json)입니다. 각 작업에는 *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource* 등의 속성이 포함됩니다. 날짜는 "%Y-%m-%d %H:%i" 형식의 문자열입니다.
- **config** - 프로젝트 파일에서 추출한 설정을 포함하는 gantt [구성](api/overview/properties-overview.md) 객체입니다.
- **resources** - 프로젝트 파일의 리소스를 나타내는 객체 배열로, 각 객체는 *id*, *name*, *type* 속성을 가집니다.
- **worktime** - 프로젝트 캘린더의 작업 시간 설정을 포함하는 객체입니다.

### Related API
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export and Import from Primavera P6](guides/export-primavera.md#exporttoprimaverap6)

