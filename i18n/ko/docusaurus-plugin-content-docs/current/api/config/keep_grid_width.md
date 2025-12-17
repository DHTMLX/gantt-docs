---
sidebar_label: keep_grid_width
title: keep_grid_width config
description: "컬럼 크기 조정 시 원래의 그리드 너비를 그대로 유지합니다"
---

# keep_grid_width
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 컬럼 크기 조정 시 원래의 그리드 너비를 그대로 유지합니다

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

**Default value:** false

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### Related Guides
- [컬럼 지정하기](guides/specifying-columns.md)
