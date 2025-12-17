---
sidebar_label: exportToJSON
title: exportToJSON method
description: "Gantt 차트의 구조와 데이터를 포함하는 JSON 객체를 생성합니다."
---

# exportToJSON

### Description

@short: Gantt 차트의 구조와 데이터를 포함하는 JSON 객체를 생성합니다.

@signature: exportToJSON: (config?: any) =\> void

### Parameters

- `config` - (optional) *object* - 선택 사항, Gantt 구성 설정을 담은 객체

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
note Gantt 버전이 8.0 이전인 경우, 온라인 내보내기 서비스를 사용하려면 페이지에 **https://export.dhtmlx.com/gantt/api.js**를 추가해야 합니다. 예를 들어:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

**config** 객체는 다음 옵션을 지원합니다:

- name - 내보낼 JSON 파일의 파일명
- data - (배열) 내보낼 작업(task) 목록; 생략하면 전체 Gantt 차트가 내보내집니다

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

