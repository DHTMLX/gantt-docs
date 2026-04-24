---
sidebar_label: exportToJSON
title: exportToJSON method
description: "Gantt 차트의 구조와 데이터를 JSON 객체로 내보냅니다"
---

# exportToJSON

### Description

@short: Gantt 차트의 구조와 데이터를 JSON 객체로 내보냅니다

@signature: exportToJSON: (config?: any) => void

### Parameters

- `config` - 객체 - 선택적; Gantt 구성 정보가 포함된 객체

### Example

~~~jsx
gantt.exportToJSON({
    name:"gantt.json"
});
~~~

### Details

:::note
note 이 메서드는 **export** 확장 기능의 일부이므로, [export_api](guides/extensions-list.md#exportservice) 플러그인이 활성화되어 있는지 확인하세요.
 
:::

:::note
참고: Gantt 버전이 8.0 미만인 경우 온라인 내보내기 서비스를 활성화하려면 페이지에 `https://export.dhtmlx.com/gantt/api.js`를 포함해야 합니다, 예:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

**config** 객체는 다음 옵션을 지원합니다:

- **name** - 내보낼 JSON 파일의 이름
- **data** - (array) 내보낼 작업 목록. 지정하지 않으면 전체 Gantt가 내보내집니다

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)