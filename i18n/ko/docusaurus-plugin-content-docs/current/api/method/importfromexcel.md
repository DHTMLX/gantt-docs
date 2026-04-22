---
sidebar_label: importFromExcel
title: importFromExcel 메서드
description: "엑셀 파일을 JSON으로 변환합니다"
---

# importFromExcel

### Description

@short: 엑셀S파일을변 형식으로 변환합니다.

@signature: importFromExcel: (config: any) => void

### Parameters

- `config` - (필수) *object* - 가져온 파일의 구성 속성을 가진 객체

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
이 메서드는 **export** 확장에 정의되어 있으므로 [export_api](guides/extensions-list.md#export-service) 플러그인을 활성화해야 합니다. [Export/Import for Excel, Export to iCal](guides/excel.md#importfromexcel) 문서에서 세부 정보를 확인하세요.
:::

:::note
Gantt 버전이 8.0 미만인 경우 온라인 내보내기 서비스를 활성화하려면 페이지에 다음 스크립트를 포함해야 합니다. 예:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

메서드는 가져온 파일의 구성 속성을 가진 객체를 매개변수로 받습니다:

- **server** - 요청의 API 엔드포인트를 설정합니다. 로컬 설치의 가져오기 서비스와 함께 사용할 수 있습니다. 기본값은 **https://export.dhtmlx.com/gantt**입니다.
- **data** - Excel (xlsx) 파일을 포함해야 하는 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 인스턴스.
- **callback** - 콜백 함수.
- **sheet** - 가져오기 서비스에서 반환해야 하는 문서의 시트 번호.

## Response

응답은 객체 배열을 포함하는 JSON을 반환합니다:

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

다음과 같이 구성됩니다:

- 첫 번째 행의 값이 가져온 객체의 속성 이름으로 사용됩니다.
- 각 행은 개별 객체로 직렬화됩니다.
- 날짜 값은 "%Y-%m-%d %H:%i" 형식으로 직렬화됩니다.

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