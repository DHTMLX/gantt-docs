---
sidebar_label: importFromExcel
title: importFromExcel method
description: "엑셀 파일을 JSON 형식으로 변환합니다."
---

# importFromExcel

### Description

@short: 엑셀 파일을 JSON 형식으로 변환합니다.

@signature: importFromExcel: (config: any) =\> void

### Parameters

- `config` - (required) *object* - 가져올 파일의 설정을 포함하는 객체입니다.

### Example

~~~jsx
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
        console.log(project)
    }
});
~~~

### Related samples
- [Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)

### Details

:::note
 이 메서드는 HTML5 File API 지원이 필요합니다. 
:::

:::note
 이 메서드는 **export** 확장 기능의 일부로, [export_api](guides/extensions-list.md#exportservice) 플러그인을 활성화해야 합니다. 자세한 내용은 [Export/Import for Excel, Export to iCal](guides/excel.md#importfromexcel) 문서를 참조하세요.

 
:::

:::note
 Gantt 버전 8.0 이전에서는 온라인 내보내기 서비스를 사용하기 위해 페이지에 **https://export.dhtmlx.com/gantt/api.js**를 포함해야 합니다. 예를 들어:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

이 메서드는 가져올 파일에 대한 설정 옵션을 포함하는 객체를 받습니다:

- **server** - 요청을 보낼 API 엔드포인트를 지정합니다. 로컬에 설치된 import 서비스와 함께 사용할 수 있습니다. 기본값은 **https://export.dhtmlx.com/gantt**입니다.
- **data** - Excel(xlsx) 파일을 포함하는 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 인스턴스입니다.
- **callback** - 가져오기가 완료되면 호출되는 함수입니다.
- **sheet** - 가져오기 서비스가 처리할 문서 내 시트의 인덱스 번호입니다.

## Response

응답은 객체 배열을 포함하는 JSON을 반환합니다:

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

세부사항:

- 첫 번째 행의 값들이 가져온 객체의 속성 이름으로 사용됩니다.
- 이후 각 행은 별도의 객체로 변환됩니다.
- 날짜는 "%Y-%m-%d %H:%i" 형식으로 포맷됩니다.

### Related API
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export/Import for Excel, Export to iCal](guides/excel.md#importfromexcel)

