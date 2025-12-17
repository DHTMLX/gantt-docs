---
sidebar_label: exportToICal
title: exportToICal method
description: "Gantt 차트의 데이터를 iCal 문자열로 내보냅니다."
---

# exportToICal

### Description

@short: Gantt 차트의 데이터를 iCal 문자열로 내보냅니다.

@signature: exportToICal: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - 선택 사항이며, 내보내기 설정을 포함하는 객체입니다 (자세한 내용 참조).

### Example

~~~jsx
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

### Details

:::note
note 이 메서드는 **export** 확장의 일부이므로, [export_api](guides/extensions-list.md#exportservice) 플러그인을 활성화해야 합니다. 자세한 내용은 [Export/Import for Excel, Export to iCal](guides/excel.md) 문서에서 확인할 수 있습니다.

 
:::


**exportToICal()** 메서드는 다음 속성을 가진 선택적 객체를 인수로 받습니다:

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
- [Export/Import for Excel, Export to iCal](guides/excel.md#exporttoical)

