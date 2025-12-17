---
sidebar_label: refreshData
title: refreshData method
description: "обновляет данные в диаграмме Ганта"
---

# refreshData

### Description

@short: Обновляет данные в диаграмме Ганта

@signature: refreshData: () =\> void

### Example

~~~jsx
gantt.refreshData();
~~~

### Related samples
- [Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

### Details

Этот метод предназначен для перерисовки данных, уже присутствующих в диаграмме Ганта, без их повторной загрузки. Вот пример для наглядности:

:::note
Sample: [Gantt. Re-draw data](https://snippet.dhtmlx.com/ces4sfdh) 
:::

Если необходимо получить данные с сервера, следует использовать методы [parse()](api/method/parse.md) или [load()](api/method/load.md).

:::note
Sample: [Gantt. Load data from different data objects](https://snippet.dhtmlx.com/h9ob1hxr) 
:::

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [Базовые операции с задачами](guides/crud-task.md)

