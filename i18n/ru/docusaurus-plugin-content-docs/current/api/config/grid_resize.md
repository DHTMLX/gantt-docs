---
sidebar_label: grid_resize
title: grid_resize config
description: "позволяет изменять размер grid, перетаскивая его правую границу"
---

# grid_resize
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Позволяет изменять размер grid, перетаскивая его правую границу

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
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

:::note
Это свойство устарело. Вместо него используйте [gantt.config.layout](api/config/layout.md) и настраивайте объекты grid и resizer по необходимости. Подробнее можно узнать [здесь](guides/layout-config.md#defaultlayout). 
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
- [Указание колонок](guides/specifying-columns.md)

### Change log
- отмечено как устаревшее, начиная с версии 5.0

