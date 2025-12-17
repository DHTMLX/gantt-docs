---
sidebar_label: refreshData
title: refreshData method
description: "간트 차트의 데이터를 새로 고침합니다."
---

# refreshData

### Description

@short: 간트 차트의 데이터를 새로 고침합니다.

@signature: refreshData: () =\> void

### Example

~~~jsx
gantt.refreshData();
~~~

### Related samples
- [Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

### Details

이 메서드는 간트 차트에 이미 존재하는 데이터를 다시 로드하지 않고 다시 그리도록 설계되었습니다. 다음 예제를 참고하세요:

:::note

**Related example:** [Gantt. Re-draw data](https://snippet.dhtmlx.com/ces4sfdh)

:::

서버에서 데이터를 가져와야 할 경우에는 [parse()](api/method/parse.md) 또는 [load()](api/method/load.md) 메서드를 사용해야 합니다.

:::note

**Related example:** [Gantt. Load data from different data objects](https://snippet.dhtmlx.com/h9ob1hxr)

:::

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [작업의 기본 작업](guides/crud-task.md)

