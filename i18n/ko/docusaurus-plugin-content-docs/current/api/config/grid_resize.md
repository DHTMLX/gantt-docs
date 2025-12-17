---
sidebar_label: grid_resize
title: grid_resize config
description: "그리드의 오른쪽 경계를 드래그하여 크기를 조절할 수 있도록 합니다"
---

# grid_resize
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 그리드의 오른쪽 경계를 드래그하여 크기를 조절할 수 있도록 합니다

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
 이 속성은 현재 더 이상 권장되지 않습니다. 대신 [gantt.config.layout](api/config/layout.md)을 사용하고 필요한 경우 grid 및 resizer 객체를 구성하세요. 자세한 내용은 [여기](guides/layout-config.md#defaultlayout)에서 확인할 수 있습니다. 
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
- [컬럼 지정하기](guides/specifying-columns.md)

### Change log
- 버전 5.0부터 deprecated 처리됨

