---
sidebar_label: exportToPrimaveraP6
title: exportToPrimaveraP6 method
description: "Gantt 차트의 데이터를 Primavera P6로 내보냅니다."
---

# exportToPrimaveraP6

### Description

@short: 간트 차트의 데이터를 Primavera P6로 내보냅니다

@signature: exportToPrimaveraP6: (_export_?: any) => void

### Parameters

- `export` - object - optional, an object with export settings (see the details)

### Example

~~~jsx
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

### Related Samples
- [데이터 내보내기: MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

### Details

:::note
이 메서드는 **export** 확장에 정의되어 있으므로 [export_api](guides/extensions-list.md#export-service) 플러그인을 활성화해야 합니다. Primavera P6에서의 내보내기 및 가져오기 문서의 세부 정보를 확인하십시오. [Primavera P6에서의 내보내기 및 가져오기](guides/export-primavera.md#exporttoprimaverap6) 문서를 참조하십시오.

:::

:::note
Gantt 버전이 8.0 미만인 경우 온라인 내보내기 서비스를 활성화하려면 페이지에 `https://export.dhtmlx.com/gantt/api.js`를 포함해야 합니다. 예:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

The **exportToPrimaveraP6()** method takes as a parameter an object with a number of properties (all of the properties are optional):

- **name** - (*string*) 얻은 파일의 이름 ('gantt.xml' 기본값).
- **auto_scheduling** - (*boolean*) 내보낸 프로젝트의 작업 스케줄링 모드를 나타냅니다. **true**는 작업을 자동 스케줄링으로 표시하고, **false**는 수동으로 스케줄링된 상태로 표시합니다(기본값).
- **skip_circular_links** - (*boolean*) 순환 연결이 제거될지 여부를 나타냅니다(참고: true일 경우 제거됨(기본 모드), false일 경우 제거되지 않음).
- **project** - (*object*) 내보낸 프로젝트 엔티티에 사용자 정의 속성을 설정합니다.
- **tasks** - (*object*) 내보낸 작업 항목에 사용자 정의 속성을 설정합니다.
- **data** - (*object*) 출력 Gantt 차트에 표시될 사용자 정의 데이터 소스를 설정합니다. start_date와 end_date 속성이 날짜와 시간을 모두 포함하는 형식(*%d-%m-%Y %H:%i*)으로 지정될 것으로 기대됩니다.
- **callback** - (*function*) 생성된 XML의 다운로드 URL을 받으려면 이 속성을 사용할 수 있습니다. 반환되는 값은 *url* 속성을 가진 JSON 객체입니다.
- **resources** - (*array*) Primavera P6 파일에 자원 목록을 내보낼 수 있습니다. 자원 달력이 사용되는 경우 내보내기 중에 **tasks** 객체의 *CalendarUID* 속성에 -1을 지정해야 합니다. 그러면 작업은 자원 달력을 사용하게 됩니다.
- **server** - (*string*) 요청의 API 엔드포인트입니다. 로컬에 설치된 내보내기 서비스를 함께 사용할 수 있습니다. 기본값은 `https://export.dhtmlx.com/gantt`입니다.

내보내기 설정에 대한 자세한 설명은 [관련 섹션](guides/export-primavera.md#export-settings)을 참조하십시오.

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
- [Primavera P6에서의 내보내기 및 가져오기](guides/export-primavera.md#exporttoprimaverap6)