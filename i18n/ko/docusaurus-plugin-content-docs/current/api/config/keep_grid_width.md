---
sidebar_label: keep_grid_width  
title: keep_grid_width 설정  
description: "'says'는 열의 크기를 조정하는 동안 초기 그리드의 너비를 보존합니다"  
---

# keep_grid_width

:::info  
이 기능은 PRO 에디션에서만 사용할 수 있습니다.  
:::  

### Description

@short: "'says'는 열의 크기를 조정하는 동안 초기 그리드의 너비를 보존합니다"

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

**기본값:** false

### Related samples
- [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md)