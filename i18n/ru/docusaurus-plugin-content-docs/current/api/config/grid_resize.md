---
sidebar_label: grid_resize
title: grid_resize конфигурация
description: "делает сетку изменяемой путем перетаскивания правого края сетки"
---

# grid_resize

:::warning
Свойство устарело.
:::

:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Делает сетку изменяемой путем перетаскивания правого края сетки

### Example

~~~jsx
gantt.config.columns = [
    { name:"text", tree:true, width:"*", resize:true },
    { name:"start_date", align: "center"},
    { name:"duration", align: "center", width:70 },
    { name:"add", width:44 }
];

gantt.config.grid_resize = true; /*!*/
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [События изменения ширины столбцов сетки](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

:::note
Свойство устарело. Используйте [gantt.config.layout](api/config/layout.md) вместо этого и укажите в конфигурации объекты grid и resizer внутри. Подробности см. [здесь](guides/layout-config.md#default-layout). 
:::

~~~js
gantt.config.layout = {
  css: "gantt_container",
  rows:[
    {
      cols: [
        {view: "grid", id: "grid", scrollX:"scrollHor", scrollY:"scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", id: "timeline", scrollX:"scrollHor", scrollY:"scrollVer"},
        {view: "scrollbar", scroll: "y", id:"scrollVer"}
      ]
     },
    {view: "scrollbar", scroll: "x", id:"scrollHor", height:20}
  ]
};
 
gantt.init("gantt_here");
~~~

### Related API
- [keep_grid_width](api/config/keep_grid_width.md)
- [min_grid_column_width](api/config/min_grid_column_width.md)

### Related Guides
- [Указание столбцов](guides/specifying-columns.md)

### Change log
- устарело с версии 5.0