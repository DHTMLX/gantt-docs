---
sidebar_label: exportToExcel
title: exportToExcel method
description: "Gantt 차트의 데이터를 Excel 문서로 내보냅니다"
---

# exportToExcel

### Description

@short: Gantt 차트에서 데이터를 Excel 문서로 내보냅니다

@signature: exportToExcel: (_export_?: any) => void

### Parameters

- `export` - object - optional, 내보내기 설정이 담긴 객체(세부 내용 참조)

### Example

~~~jsx
gantt.exportToExcel({
    name: "document.xlsx", 
    columns:[
        { id: "text",  header: "Title", width: 150 },
        { id: "start_date",  header: "Start date", width: 250, type: "date" }
    ],
    server: "https://myapp.com/myexport/gantt",
    callback: (res) => {
        alert(res.url);
    },
    visual: true,
    cellColors: true,
    data: { },
    date_format: "dddd d, mmmm yyyy"
});
~~~

### Details

:::note
이 메서드는 **export** 확장에 정의되어 있으므로 export_api 플러그인을 활성화해야 합니다. [export_api](guides/extensions-list.md#export-service) 플러그인에 대한 자세한 내용은 guides/excel.md 문서를 참조하십시오.
:::

:::note
Gantt 버전이 8.0 미만인 경우 온라인 내보내기 서비스를 활성화하려면 페이지에 `https://export.dhtmlx.com/gantt/api.js`를 포함해야 합니다. 예:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

The **exportToExcel()** 메서드는 매개변수로 여러 속성을 가진 객체를 받습니다(모든 속성은 선택적입니다):

- **name** - (*string*) 출력 파일의 이름을 확장자 '.xlsx'와 함께 설정합니다
- **columns** - (*array*) 출력 Excel 시트의 열 구성을 설정합니다. 열 객체의 속성은:
    - **'id'** - (*string,number*) 열에 매핑될 이벤트 속성
    - **'header'** - (*string*) 열 헤더
    - **'width'** - (*number*) 열 너비(픽셀 단위)
    - **'type'** - (*string*) 열 유형
- **server** - (*string*) 요청의 API 엔드포인트를 설정합니다. 로컬에 설치된 export 서비스와 함께 사용할 수 있습니다. 기본값은 `https://export.dhtmlx.com/gantt`
- **callback** - (*function*) 생성된 XLSX 파일의 다운로드 URL을 받고 싶다면 callback 속성을 사용할 수 있습니다. 이 콜백은 url 속성을 가진 JSON 객체를 받습니다.
- **visual** - (*boolean*) 내보낸 Excel 문서에 타임라인 차트를 추가합니다; 기본값은 false입니다. 내보낸 파일에 작업 색상을 추가하는 방법은 [how to add task colors](guides/excel.md#adding-colors-of-tasks-to-export) 문서를 참조하십시오.
- **cellColors** - (*boolean*) true로 설정되면 내보낸 문서의 셀은 [template](api/template/timeline_cell_class.md)에서 정의된 색상을 가지며, color 및 background-color 속성이 내보냅니다
- **data** - (*object*) 출력 Gantt 차트에 표시될 사용자 정의 데이터 소스를 설정합니다
- **date_format** - (*string*) 내보낸 Excel 문서에서 날짜가 표시될 형식을 설정합니다. 다음 형식 코드를 사용할 수 있습니다:

~~~css
table.my_table {
    width: 70%;
    padding: 0 20px;
}
table.my_table tr td {
    text-align: left;
    vertical-align: middle;
    width: 35%;
    border-bottom: 1px solid grey;
}
table.my_table td.version_info {
    text-align: left;
    font-weight: bold;
}
~~~


 포맷 코드 출력:

<table class="my_table">
<tr><td class="version_info">Format code</td><td class="version_info">Output</td></tr>
<tr><td>d</td><td>9</td></tr>
<tr><td>dd</td><td>09</td></tr>
<tr><td>ddd</td><td>Mon</td></tr>
<tr><td>dddd</td><td>Monday</td></tr>
<tr><td>mm</td><td>01</td></tr>
<tr><td>mmm</td><td>Jan</td></tr>
<tr><td>mmmm</td><td>January</td></tr>
<tr><td>mmmmm</td><td>J</td></tr>
<tr><td>yy</td><td>12</td></tr>
<tr><td>yyyy</td><td>2021</td></tr>
<tr><td>mm/dd/yyyy</td><td>01/09/2021</td></tr>
<tr><td>m/d/y</td><td>1/9/21</td></tr>
<tr><td>ddd, mmm d</td><td>Mon, Jan 9</td></tr>
<tr><td>mm/dd/yyyy h:mm AM/PM</td><td>01/09/2021 6:20 PM</td></tr>
<tr><td>dd/mm/yyyy hh:mm:ss</td><td>09/01/2012 16:20:00</td></tr>
</table>


#### 기본 날짜 매개변수

Export 모듈은 **start_date** 와 **end_date** 열이 *Date* 타입을 가지도록, 그리고 **duration** 열이 *number* 타입을 가지도록 기대합니다. 

커스텀 템플릿을 적용하는 경우([datamappingandtemplates](guides/specifying-columns.md#datamappingandtemplates))에는 기대되는 타입의 값을 반환하거나 열 구성의 **name** 속성에 다른 값을 정의해야 합니다. 예를 들면:

~~~jsx {7,10-12}
gantt.config.columns = [
    ...
    { name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor },
    { name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor },
    { name: "duration_formatted", 
        align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: (task) => { 
            return formatter.format(task.duration_formatted); 
        }
    },
    ...
];
~~~

그렇지 않으면 Gantt 데이터가 내보내지지 않습니다. [관련 예제 확인](https://snippet.dhtmlx.com/q1lhyvt3).

### Related API

- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides

- [Export/Import for Excel, Export to iCal](guides/excel.md)

