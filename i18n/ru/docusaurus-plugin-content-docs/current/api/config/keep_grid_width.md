--- 
sidebar_label: keep_grid_width
title: keep_grid_width config
description: "'говорит' чтобы сохранить начальную ширину сетки при изменении размера столбцов внутри"
---

# keep_grid_width

:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: 'говорит' чтобы сохранить начальную ширину сетки при изменении размера столбцов внутри

@signature: keep_grid_width: boolean

### Example

~~~jsx
gantt.config.columns = [
    { name:"text", tree:true, width:"*", resize:true },
    { name:"start_date", align: "center"},
    { name:"duration", align: "center", width:70 },
    { name:"add", width:44 }
];

gantt.config.keep_grid_width = true; /*!*/
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** false

### Related samples
- [События изменения размера столбцов сетки](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Related Guides
- [Указание столбцов](guides/specifying-columns.md)