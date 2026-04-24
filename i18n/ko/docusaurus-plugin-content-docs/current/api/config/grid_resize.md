---
sidebar_label: grid_resize
title: grid_resize 구성
description: "오른쪽 그리드의 경계선을 드래그하여 그리드를 크기 조절 가능하게 만듭니다"
---

# grid_resize

:::warning
이 속성은 더 이상 사용되지 않습니다.
:::

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### Description

@short: 오른쪽 그리드의 경계선을 드래그하여 그리드를 크기 조절 가능하게 만듭니다

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

**기본 값:** false

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Details

:::note
이 속성은 더 이상 사용되지 않습니다. 대신 [gantt.config.layout](api/config/layout.md) 를 사용하고 필요한 구성으로 내부의 grid와 resizer 객체를 지정하십시오. 자세한 내용은 [here](guides/layout-config.md#default-layout)를 확인하십시오.
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
- 버전 5.0부터 더 이상 사용되지 않음