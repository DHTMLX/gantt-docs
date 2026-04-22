---
title: "Excel용 내보내기/가져오기, iCal로 내보내기"
sidebar_label: "Excel용 내보내기/가져오기, iCal로 내보내기"
---

# Excel용 내보내기/가져오기, iCal로 내보내기

dhtmlxGantt 라이브러리는 Gantt 차트의 데이터를 Excel 및 iCal 형식으로 내보내는 기능을 제공합니다. 또한 Excel 파일로부터 Gantt에 데이터를 가져올 수도 있습니다.

:::note
서비스는 무료이지만, 출력되는 Excel/iCal 파일에는 GPL 라이선스 하의 워터마크가 포함됩니다. 라이선스를 구매하면 유효한 지원 기간(모든 PRO 라이선스의 경우 12개월) 동안 워터마크 없이 내보낸 결과를 얻을 수 있습니다.
:::

다양한 내보내기 서비스가 있습니다. 이들을 컴퓨터에 설치하고 로컬에서 Gantt 차트를 Excel 또는 iCal로 내보낼 수 있습니다. 내보내기 서비스는 Gantt 패키지에 포함되어 있지 않으므로, 각 서비스의 이용 조건을 알아보려면 해당 문서(링크의 기사)를 읽어보시기 바랍니다.

## Online export service restrictions

:::note
온라인 내보내기 서비스에는 시간 제한과 요청 크기 제한이 있습니다.
:::

### Time limits

과정이 20초를 넘으면 내보내기가 취소되고 다음과 같은 오류가 발생합니다:

~~~html
Error: Timeout trigger 20 seconds
~~~

동시에 여러 명이 Gantt를 내보내는 경우, 과정이 일반적으로보다 오래 걸릴 수 있습니다. 다만 특정 사용자의 내보내기 요청에 쓰인 시간은 각각 독립적으로 계산되므로 문제되지 않습니다.

### Limits on request size

모든 내보내기 메서드에 공통으로 사용되는 API 엔드포인트 `https://export.dhtmlx.com/gantt`가 있습니다(ex: *exportToPDF*, *exportToPNG*, *exportToMSProject* 등). **최대 요청 크기는 10 MB**입니다.

MSProject 및 Primavera P6 내보내기/가져오기 서비스에 특화된 별도 엔드포인트 `https://export.dhtmlx.com/gantt/project`도 있습니다(*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* 만 해당). **최대 요청 크기: 40 MB**입니다.

## Using export modules

:::note
대용량 차트를 내보내야 하는 경우 [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)을 사용할 수 있습니다. 
Export 모듈은 Gantt를 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 또는 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 라이선스로 획득한 경우 무료로 제공되며, 모듈을 별도로 [구매할 수 있습니다](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

[PDF용 export 모듈 사용에 대한 자세한 내용](guides/pdf-export-module.md). 이 export 모듈은 데이터를 PDF, PNG, Excel, 및 iCal 파일로 내보낼 수 있습니다.

## Excel로 내보내기

Gantt 차트의 데이터를 Excel 문서로 내보내려면 다음과 같이 수행합니다:

- 내보내기/가져오기 기능을 사용하려면 [plugins](api/method/plugins.md) 메서드를 통해 <b>export_api</b> 플러그인을 활성화합니다:
~~~js
gantt.plugins({
    export_api: true
});
~~~

온라인 내보내기 서비스나 로컬 내보내기 모듈 중 하나를 사용할 수 있습니다.

:::note
Gantt 버전이 8.0 미만인 경우 Django 페이지에 내보내기 기능을 활성화하기 위해 `https://export.dhtmlx.com/gantt/api.js`를 포함해야 합니다. 예:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Gantt 차트의 데이터를 Excel로 내보내기 위해서는 [exportToExcel](api/method/exporttoexcel.md) 메서드를 호출합니다:

~~~html
<input value="Export to Excel" type="button" onclick='gantt.exportToExcel()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~

**관련 샘플**: [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

**관련 샘플**: [Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)
  

#### Parameters of the export method

**exportToExcel()** 메서드는 여러 속성을 가진 객체를 매개변수로 받으며(모두 선택적):

- **name** - (*string*) 출력 파일의 이름을 확장자 '.xlsx'와 함께 설정합니다.
- **columns** - (*array*) 출력 Excel 시트의 열 구성을 설정합니다. 열 객체의 속성은 다음과 같습니다:
    - **'id'** - (*string,number*) 열에 매핑될 이벤트의 속성
    - **'header'** - (*string*) 열 머리글
    - **'width'** - (*number*) 픽셀 단위의 열 너비
    - **'type'** - (*string*) 열 타입
- **server** - (*string*) 요청의 API 엔드포인트를 설정합니다. 로컬 설치의 내보내기 서비스와 함께 사용할 수 있습니다. 기본값은 `https://export.dhtmlx.com/gantt`
- **callback** - (*function*) 생성된 XLSX 파일의 다운로드 URL을 받으려면 callback 속성을 사용할 수 있습니다. url 속성이 있는 JSON 객체를 수신합니다
- **visual** - (*boolean*) 내보낸 Excel 문서에 타임라인 차트를 추가합니다. 기본값은 false
- **cellColors** - (*boolean*) 이 값을 *true*로 설정하면, 내보낸 문서의 셀에 [timeline_cell_class](api/template/timeline_cell_class.md) 템플릿에 정의된 색상이 적용되며, *color* 과 *background-color* 속성이 내보내집니다
- **data** - (*object*) 출력 Gantt 차트에 표시될 사용자 정의 데이터 소스를 설정합니다
- **date_format** - (*string*) 내보낸 Excel 문서에 날짜를 표시할 형식을 설정합니다. 사용 가능한 형식 코드의 전체 목록은 [여기](api/method/exporttoexcel.md)를 참조하십시오.        

~~~jsx title="선택적 속성으로 export 메서드 호출"
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

#### Default date parameters

Export 모듈은 **start_date** 와 **end_date** 열이 *Date* 타입이고, **duration** 열이 *number* 타입이길 기대합니다. 

커스텀 템플릿을 적용하는 경우에는 기대하는 타입의 값을 반환하거나, 열 구성의 **name** 속성에 다른 값을 정의해야 합니다. 예를 들면:

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

### Setting a custom data source to export

Gantt 차트를 커스텀 데이터 세트로 내보내려면(초기 Gantt 차트에 표시된 데이터가 아닌 경우) [exportToExcel](api/method/exporttoexcel.md) 메서드 매개변수의 **data** 속성을 사용합니다:

~~~js
gantt.exportToExcel({   
    name: "document.xlsx", 
    data: [
        { id: 1, text: "Project #1", start_date: "01-04-2026", duration: 18},
        { id: 2, text: "Task #1", start_date: "02-04-2026", duration: 8, parent: 1},
        { id: 3, text: "Task #2", start_date: "11-04-2026", duration: 8, parent: 1}
    ]      
});
~~~

:::note
주의: data 매개변수의 값으로 URL을 지정할 수 없으며, 데이터 객체만 사용할 수 있습니다.
:::

### Adding colors of tasks to export

작업의 색상을 내보낸 Excel 파일에 추가하려면 visual 속성을 *"base-colors"* 로 설정하고, cellColors를 true로 설정합니다:

~~~js
gantt.exportToExcel({
    visual: "base-colors", 
    cellColors: true
})
~~~

**관련 샘플**: [Export colors of tasks](https://snippet.dhtmlx.com/t2znjrfj)

## Import from Excel {#importfromexcel}

Excel 문서의 임의 열을 Gantt 데이터 모델에 자동으로 매핑하는 방법은 없으므로, 내보내기 서비스는 문서를 JSON으로 반환되는 행 배열로 변환합니다. 결과 문서를 Gantt 데이터로 변환하는 책임은 최종 개발자에게 있습니다.

Excel 파일을 변환하려면 내보내기 서비스에 아래와 같은 요청을 보내야합니다:

- Request URL - `https://export.dhtmlx.com/gantt`
- Request Method - **POST**
- Content-Type - **multipart/form-data**

요청 매개변수는 다음과 같습니다:

- **file** - 엑셀 파일
- **type** - "excel-parse"
- **data** - (*optional*) 설정이 포함된 JSON 문자열

예를 들면:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="excel-parse">
    <button type="submit">Get</button>
</form>
~~~

또는 [client-side API](api/method/importfromexcel.md)를 사용할 수 있습니다:

~~~js
gantt.importFromExcel({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    callback: (project) => {
        console.log(project)
    }
});
~~~

**관련 샘플**: [Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)


여기서 *file*은 Excel(xlsx) 파일을 포함해야 하는 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 인스턴스입니다.

:::note
**gantt.importFromExcel** 는 HTML5 File API 지원이 필요합니다.
:::

### Response

응답은 객체 배열이 포함된 JSON을 반환합니다:

~~~js
[
   { "Name": "Task Name", "Start": "2026-04-11 10:00", "Duration": 8 },
   ...
]
~~~

여기서:

- 첫 번째 행의 값은 가져온 객체의 속성 이름으로 사용됩니다.
- 각 행은 개별 객체로 직렬화됩니다.
- 날짜 값은 "%Y-%m-%d %H:%i" 형식으로 직렬화됩니다. 


### Import settings

- 가져오기 서비스는 가져온 시트의 첫 번째 행이 열 이름을 포함하는 머리글 행이 되기를 기대합니다.
- 기본적으로 서비스는 문서의 첫 번째 시트를 반환합니다. 다른 시트를 반환하려면 **sheet** 매개변수를 사용합니다(제로 기반)

~~~js
gantt.importFromExcel({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    sheet: 2, // print third sheet
    callback: (rows) => {}
});
~~~


## iCal로 Export

Gantt 차트의 데이터를 iCal 문자열로 내보내려면 아래와 같이 수행합니다:

- 온라인 내보내기 서비스를 사용하려면 [plugins] 메서드를 통해 <b>export_api</b> 플러그인을 활성화합니다:

~~~js
gantt.plugins({
    export_api: true
});
~~~

- Gantt 차트의 데이터를 iCal로 내보내려면 [exportToICal](api/method/exporttoical.md) 메서드를 호출합니다: 

~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~


**관련 샘플**: [Export data: MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


**관련 샘플**: [Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)


#### Parameters of the export method

[exportToICal()](api/method/exporttoical.md) 메서드는 선택적으로 아래 속성을 가진 객체를 매개변수로 받습니다:

- **server** - (*string*) 요청의 API 엔드포인트를 설정합니다. 로컬 설치의 내보내기 서비스와 함께 사용할 수 있습니다. 기본값은 `https://export.dhtmlx.com/gantt`;
- **name** - (*string*) 파일의 사용자 정의 이름과 확장자를 지정할 수 있지만, 파일은 여전히 iCal 형식으로 내보내집니다.
  
~~~jsx title="선택적 속성으로 exportToICal 메서드 호출"
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~