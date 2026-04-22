---
sidebar_label: exportToICal
title: exportToICal 메서드
description: "Gantt 차트의 데이터를 iCal 문자열로 내보냅니다"
---

# exportToICal

### Description

@short: Gantt 차트의 데이터를 iCal 문자열로 내보냅니다

@signature: exportToICal: (_export_?: any) => void

### Parameters

- `export`	- object - optional, 내보내기 설정이 들어있는 객체(세부 사항 참조)

### 예제

~~~jsx
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

### Details

:::note
이 메서드는 **export** 확장에 정의되어 있으므로 export_api 플러그인을 활성화해야 합니다. [Export/Import for Excel, Export to iCal](guides/excel.md) 문서에서 세부 정보를 확인하십시오.

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

**exportToICal()** 메서드는 선택적으로 아래 속성을 가진 객체를 매개변수로 받습니다:

- **server** - (*string*) 요청의 API 엔드포인트를 설정합니다. 내보내기 서비스의 로컬 설치와 함께 사용할 수 있습니다. 기본값은 `https://export.dhtmlx.com/gantt`입니다;
- **name** - (*string*) 파일의 이름과 확장자를 커스텀으로 지정할 수 있습니다. 다만 파일은 여전히 iCal 형식으로 내보내집니다. [Check the example](https://snippet.dhtmlx.com/atbhz9vq).

- **server** - (*string*) 내보내기 요청을 위한 API 엔드포인트를 지정합니다. 로컬에 설치된 export 서비스와 함께 사용할 때 유용합니다. 기본 엔드포인트는 **https://export.dhtmlx.com/gantt** 입니다;
- **name** - (*string*) 사용자 지정 파일명과 확장자를 설정할 수 있지만, 파일은 여전히 iCal 포맷으로 내보내집니다. [예제 보기](https://snippet.dhtmlx.com/atbhz9vq).

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Export/Import for Excel, Export to iCal](guides/excel.md)

