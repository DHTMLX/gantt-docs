---
sidebar_label: task_height
title: task_height config
description: "타임라인 영역에서 작업 바의 높이를 제어합니다."
---

# task_height

### Description

@short: 타임라인 영역에서 작업 바의 높이를 제어합니다.

### Example

~~~jsx
gantt.config.task_height = 30;
gantt.init("gantt_here");
~~~

**Default value:** "full"

### Details

:::note
 **task_height** 속성은 더 이상 권장되지 않습니다. 대신 [bar_height](api/config/bar_height.md) 설정 속성을 사용하세요: 
:::

~~~
gantt.config.bar_height = 30;
gantt.init("gantt_here");
~~~

### Change log
- **task_height** 속성은 v7.1에서 deprecated 되었습니다.

