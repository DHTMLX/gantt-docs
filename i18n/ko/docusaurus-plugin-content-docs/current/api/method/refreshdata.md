---
sidebar_label: refreshData
title: refreshData method
description: "Gantt 차트의 데이터를 새로 고칩니다"
---

# refreshData

### Description

@short: Gantt 차트의 데이터를 새로 고칩니다

@signature: refreshData: () =\> void

### Example

~~~jsx
gantt.refreshData();
~~~

### Related samples
- [Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

### Details

이 메서드는 데이터를 다시 로드하지 않고 Gantt 차트의 데이터를 다시 그리려는 의도입니다. 아래 예제를 참조하십시오:

:::note
샘플: [Gantt. Re-draw data ](https://snippet.dhtmlx.com/ces4sfdh)
::: 

서버에서 데이터를 로드해야 하는 경우에는 [parse()](api/method/parse.md) 또는 [load()](api/method/load.md) 메서드를 사용하세요.

:::note
샘플: [Gantt. Load data from different data objects ](https://snippet.dhtmlx.com/h9ob1hxr)
:::

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [작업의 기본 작업](guides/crud-task.md)

