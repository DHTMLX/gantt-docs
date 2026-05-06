---
sidebar_label: refreshData
title: refreshData метод
description: "Обновляет данные в диаграмме Ганта"
---

# refreshData

### Description

@short: Обновляет данные на диаграмме Ганта

@signature: refreshData: () =\> void

### Example

~~~jsx
gantt.refreshData();
~~~

### Related samples
- [Базовая фильтрация](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

### Details

The method is intended not to reload but to re-draw data in the Gantt chart. See the example:

:::note
образец: [Gantt. Перерисовать данные](https://snippet.dhtmlx.com/ces4sfdh)
:::

Если вам нужно загрузить данные с сервера, используйте либо метод [parse()](api/method/parse.md) или [load()](api/method/load.md) метод.

:::note
образец: [Gantt. Загрузка данных из разных объектов данных](https://snippet.dhtmlx.com/h9ob1hxr)
:::

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [Основные операции с задачами](guides/crud-task.md)