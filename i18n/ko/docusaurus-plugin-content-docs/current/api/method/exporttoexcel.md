---
sidebar_label: exportToExcel
title: exportToExcel method
description: "Gantt 차트의 데이터를 Excel 파일로 내보냅니다."
---

# exportToExcel

### Description

@short: Gantt 차트의 데이터를 Excel 파일로 내보냅니다.

@signature: exportToExcel: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 선택 사항, 내보내기 설정을 포함하는 객체 (자세한 내용 참조)

### Example

~~~jsx
gantt.exportToExcel({
    name:"document.xlsx", 
    columns:[
        { id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250, type:"date" }
    ],
    server:"https://myapp.com/myexport/gantt",
    callback: function(res){
        alert(res.url);
    },
    visual:true,
    cellColors:true,
    date_format: "dddd d, mmmm yyyy"
});
~~~

### Details

:::note
note 이 메서드는 **export** 확장 기능의 일부이므로, [export_api](guides/extensions-list.md#exportservice) 플러그인을 활성화해야 합니다.
자세한 내용은 [Export/Import for Excel, Export to iCal](guides/excel.md) 문서를 참고하세요.

 
:::

:::note
note Gantt 버전 8.0 이전에서는 온라인 내보내기 서비스를 사용하려면 페이지에 **https://export.dhtmlx.com/gantt/api.js** 스크립트를 포함해야 합니다. 예를 들어:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

**exportToExcel()** 메서드는 여러 선택적 속성을 포함하는 객체를 인자로 받습니다:

- **name** - (*string*) 출력 파일의 이름을 설정하며, '.xlsx' 확장자를 포함해야 합니다.
- **columns** - (*array*) 생성될 Excel 시트의 컬럼을 정의합니다. 각 컬럼 객체는 다음을 가질 수 있습니다:
    - **'id'** - (*string,number*) 컬럼에 매핑할 이벤트 속성
    - **'header'** - (*string*) 컬럼 헤더 텍스트
    - **'width'** - (*number*) 컬럼 너비 (픽셀 단위)
    - **'type'** - (*string*) 컬럼 데이터 타입
- **server** - (*string*) 내보내기 요청을 위한 API 엔드포인트 URL. 로컬 내보내기 서비스 설치 시 유용합니다. 기본값은 **https://export.dhtmlx.com/gantt**
- **callback** - (*function*) 생성된 XLSX 파일 URL을 받는 콜백 함수. 콜백 함수는 url 속성을 가진 JSON 객체를 전달받습니다.
- **visual** - (*boolean*) 내보낸 Excel 파일에 타임라인 차트를 포함할지 여부, 기본값은 *false* 입니다. [작업 색상 추가 방법](guides/excel.md#:~:text=Adding%20colors%20of%20tasks%20to%20export) 참조
- **cellColors** - (*boolean*) true인 경우, 내보낸 파일의 셀에 [timeline_cell_class](api/template/timeline_cell_class.md) 템플릿에서 정의된 색상이 적용되어 *color* 및 *background-color* 속성이 내보내집니다.
- **data** - (*object*) 출력될 Gantt 차트에 표시할 사용자 지정 데이터 소스 지정
- **date_format** - (*string*) 내보낸 Excel 문서에서 사용할 날짜 형식을 정의합니다. 지원하는 형식 코드는 다음과 같습니다:

<table class="my_table">
<tr><td class="version_info">형식 코드</td><td class="version_info">출력 예</td></tr>

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

## 기본 날짜 파라미터

Export 모듈은 **start_date** 와 **end_date** 컬럼이 *Date* 타입이어야 하며, **duration** 컬럼은 *number* 타입이어야 합니다.

[커스텀 템플릿](guides/specifying-columns.md#datamappingandtemplates)을 사용하는 경우, 예상 타입의 값을 반환하거나 컬럼 설정의 **name** 필드에 다른 속성을 지정해야 합니다. 예를 들면:

~~~js

gantt.config.columns = [
    ...
    {name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor},
    {name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor},
    {name: "duration_formatted", /*!*/
        align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: function(task){ /*!*/
			return formatter.format(task.duration_formatted); /*!*/
        }
    },
    ...
];
~~~

그렇지 않으면 Gantt 데이터가 제대로 내보내지지 않습니다. [관련 예제 보기](https://snippet.dhtmlx.com/q1lhyvt3).

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

