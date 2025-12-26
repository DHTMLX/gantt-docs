---
title: "Export/Import for Excel, Export to iCal"
sidebar_label: "Export/Import for Excel, Export to iCal"
---

# Export/Import for Excel, Export to iCal

dhtmlxGantt 라이브러리는 간트 차트의 데이터를 Excel 및 iCal 형식으로 내보내는 기능을 지원합니다. 또한 Excel 파일에서 간트 차트로 데이터를 가져오는 것도 가능합니다.

:::note
내보내기 서비스는 무료로 사용할 수 있지만, 결과로 생성된 Excel/iCal 파일에는 GPL 라이선스 하에서 라이브러리 워터마크가 포함됩니다. 
라이선스를 구매하면, 활성 지원 기간(모든 PRO 라이선스의 경우 12개월) 동안 내보낸 파일에 워터마크가 표시되지 않습니다.
:::

여러 가지 내보내기 서비스를 컴퓨터에 설치하여 간트 차트를 Excel 또는 iCal로 로컬에서 내보낼 수 있습니다.
이 내보내기 서비스들은 Gantt 패키지에 포함되어 있지 않음을 유의하세요. 
자세한 내용은 [관련 문서](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)를 참고하여 사용 조건을 확인하세요.

## 온라인 내보내기 서비스 제한 사항

:::note
내보내기 서비스에는 처리 시간 및 요청 크기에 대한 제한이 있습니다.
:::

### 시간 제한

내보내기 과정이 20초를 초과하면, 프로세스가 중단되고 다음과 같은 오류가 표시됩니다:

~~~html
Error: Timeout trigger 20 seconds
~~~

여러 사용자가 동시에 간트 차트를 내보내는 경우, 처리 시간이 평소보다 길어질 수 있습니다. 하지만 각 사용자의 내보내기 요청에 소요된 시간은 별도로 계산됩니다.

### 요청 크기 제한

주요 API 엔드포인트 **https://export.dhtmlx.com/gantt**에서는 모든 내보내기 메서드(*exportToPDF*, *exportToPNG*, *exportToMSProject* 등)를 처리합니다. 이 엔드포인트의 최대 요청 크기는 **10 MB**입니다.

또한 [MSProject](guides/export-msproject.md) 및 
[Primavera P6](guides/export-primavera.md) 
내보내기/가져오기 서비스(*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*)를 위한 전용 API 엔드포인트 **https://export.dhtmlx.com/gantt/project**도 있습니다. 이 엔드포인트의 최대 요청 크기는 **40 MB**입니다.

## 내보내기 모듈 사용하기

:::note
대용량 차트 내보내기가 필요한 경우 [독립 실행형 내보내기 모듈](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 사용을 고려하세요. 
이 모듈은 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), 또는 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 라이선스가 있으면 무료입니다. 그렇지 않은 경우 [여기](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)에서 별도 구매할 수 있습니다.
:::

PDF 내보내기 모듈 사용법에 대한 자세한 내용은 다음 가이드에서 확인할 수 있습니다: [PDF export module](guides/pdf-export-module.md). 이 모듈은 PDF, PNG, Excel, iCal 형식으로 내보내기를 지원합니다.

## Excel로 내보내기

간트 차트의 데이터를 Excel 파일로 내보내려면 다음 단계를 따르세요:

- <b>export_api</b> 플러그인을 [plugins](api/method/plugins.md) 메서드로 활성화하세요:
~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Gantt 8.0 미만 버전에서는 온라인 내보내기 서비스를 활성화하려면 **https://export.dhtmlx.com/gantt/api.js** 스크립트를 페이지에 추가해야 합니다. 예시:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- [exportToExcel](api/method/exporttoexcel.md) 메서드를 사용하여 간트 차트 데이터를 내보내세요: 

~~~html
<input value="Export to Excel" type="button" onclick='gantt.exportToExcel()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~



[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)



[Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)
      
        

#### 내보내기 메서드의 파라미터

**exportToExcel()** 메서드는 여러 속성을 가진 선택적 객체를 인자로 받을 수 있습니다:

- **name** - (*string*) 내보내는 파일의 이름을 '.xlsx' 확장자까지 포함하여 지정합니다.
- **columns** - (*array*) Excel 시트의 열을 설정합니다. 각 열 객체는 다음 속성을 가질 수 있습니다:
    - **'id'** - (*string,number*) 열에 매핑되는 이벤트 속성
    - **'header'** - (*string*) 열 헤더 텍스트
    - **'width'** - (*number*) 열 너비(픽셀 단위)
    - **'type'** - (*string*) 열 데이터 타입
- **server** - (*string*) 내보내기 요청을 보낼 API 엔드포인트를 지정합니다. 로컬 내보내기 서비스를 사용할 때 유용합니다. 기본값은 **https://export.dhtmlx.com/gantt**
- **callback** - (*function*) 생성된 XLSX 파일을 다운로드할 수 있는 *url* 속성을 가진 JSON 객체를 받는 콜백 함수
- **visual** - (*boolean*) 내보내는 Excel 파일에 타임라인 차트를 포함합니다. 기본값은 *false*
- **cellColors** - (*boolean*) *true*로 설정 시, 내보내는 파일의 셀에 [timeline_cell_class](api/template/timeline_cell_class.md) 템플릿에서 정의한 색상(*color*, *background-color*)이 적용됩니다.
- **data** - (*object*) 현재 간트 차트 데이터 대신 내보낼 커스텀 데이터 소스를 지정할 수 있습니다.
- **date_format** - (*string*) 내보내는 Excel 파일에서 사용할 날짜 형식을 정의합니다. 지원되는 전체 형식 목록은 [여기](api/method/exporttoexcel.md)에서 확인하세요.        

**선택적 속성을 포함하여 내보내기 메서드를 호출하는 예시**
~~~js
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
    data:{},
    date_format: "dddd d, mmmm yyyy"
});
~~~

#### 기본 날짜 파라미터

내보내기 모듈은 **start_date** 및 **end_date** 열이 *Date* 타입이고, **duration** 열이 *number* 타입일 것으로 기대합니다.

[커스텀 템플릿](guides/specifying-columns.md#datamappingandtemplates)을 사용할 경우, 반환 값이 기대 타입과 일치하도록 하거나, 열 설정의 **name** 필드에 다른 속성명을 지정하세요. 예시:

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

이 작업을 하지 않으면 간트 데이터가 올바르게 내보내지지 않습니다. [관련 예시](https://snippet.dhtmlx.com/q1lhyvt3)를 참고하세요.

### 내보내기용 커스텀 데이터 소스 지정

간트 차트에 표시되는 데이터와 다른 커스텀 데이터셋을 기반으로 내보내려면, [exportToExcel](api/method/exporttoexcel.md) 메서드의 파라미터 객체의 **data** 속성을 사용하세요:

~~~js
gantt.exportToExcel({   
    name:"document.xlsx", 
    data:[
        {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
        {id:2, text:"Task #1", start_date:"02-04-2020",duration:8, parent:1},
        {id:3, text:"Task #2", start_date:"11-04-2020",duration:8, parent:1}
    ]      
});
~~~

:::note
**data** 파라미터는 데이터 객체여야 하며, URL 문자열이 아니어야 합니다.
:::

### 내보내기에 작업 색상 추가

내보내는 Excel 파일에 작업 색상을 포함하려면 **visual** 속성을 *"base-colors"*로 설정하세요:

~~~js
gantt.exportToExcel({
    visual: "base-colors", /*!*/
    cellColors: true
})
~~~


**Related example:** [Export colors of tasks](https://snippet.dhtmlx.com/t2znjrfj)


## Excel에서 가져오기

임의의 Excel 열을 Gantt 데이터 모델에 자동 매핑하는 기능은 지원되지 않으므로, 내보내기 서비스는 Excel 문서를 JSON으로 반환되는 행 배열로 변환합니다. 
이 데이터를 Gantt 형식으로 변환하는 작업은 개발자가 직접 구현해야 합니다.

Excel 파일을 변환하려면, 다음 정보를 포함하여 내보내기 서비스에 요청을 보내세요:

- 요청 URL - **https://export.dhtmlx.com/gantt**
- 요청 방식 - **POST**
- Content-Type - **multipart/form-data**

요청 파라미터:

- **file** - 업로드할 Excel 파일
- **type** - "excel-parse"로 설정
- **data** - (*optional*) 추가 설정이 담긴 JSON 문자열

예시 폼:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="excel-parse">
    <button type="submit">Get</button>
</form>
~~~

또는 [클라이언트 측 API](api/method/importfromexcel.md)를 사용할 수 있습니다:

~~~js
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
        console.log(project)
    }
});
~~~


[Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)


여기서 *file*은 Excel(xlsx) 파일을 나타내는 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 객체입니다.

:::note
**gantt.importFromExcel**은 HTML5 File API 지원이 필요합니다.
:::


### 응답

응답은 객체 배열로 구성된 JSON입니다:

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

상세 내용:

- 첫 번째 행의 값이 가져온 객체의 속성명으로 사용됩니다.
- 이후 각 행은 별도의 객체로 변환됩니다.
- 날짜는 "%Y-%m-%d %H:%i" 형식으로 반환됩니다. 


### 가져오기 설정

- 가져오기 서비스는 첫 번째 행이 열 이름이 포함된 헤더 행일 것으로 기대합니다.
- 기본적으로 Excel 파일의 첫 번째 시트가 처리됩니다. 다른 시트를 지정하려면 **sheet** 파라미터(0부터 시작)를 사용하세요:

~~~js
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    sheet:2, // 세 번째 시트 처리
    callback: function (rows) {}
});
~~~


## iCal로 내보내기

간트 차트 데이터를 iCal 문자열로 내보내려면 다음 단계를 따르세요:

- <b>export_api</b> 플러그인을 [plugins](api/method/plugins.md) 메서드로 활성화하세요:
~~~js
gantt.plugins({
      export_api: true
});
~~~

- [exportToICal](api/method/exporttoical.md) 메서드를 사용하여 데이터를 내보내세요:

~~~html
<input value="Export to iCal" type="button" onclick='gantt.exportToICal()'>/*!*/

<script>
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
</script>
~~~



[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)



[Export data: store online](https://docs.dhtmlx.com/gantt/samples/08_api/09_export_store.html)



#### 내보내기 메서드의 파라미터

[exportToICal()](api/method/exporttoical.md) 메서드는 다음 속성을 가진 선택적 객체를 인자로 받을 수 있습니다:

- **server** - (*string*) 요청을 보낼 API 엔드포인트를 지정합니다. 로컬 내보내기 서비스 설치 시 유용합니다. 기본값은 **https://export.dhtmlx.com/gantt**.
- **name** - (*string*) 파일 형식은 iCal로 유지되지만, 파일명 및 확장자를 커스텀으로 지정할 수 있습니다.
        
**선택적 속성을 포함하여 내보내기 메서드를 호출하는 예시**
~~~js
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

