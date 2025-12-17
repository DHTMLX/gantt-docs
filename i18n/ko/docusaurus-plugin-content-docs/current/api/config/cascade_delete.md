---
sidebar_label: cascade_delete
title: cascade_delete config
description: "상위 작업이 삭제될 때 중첩된 작업과 링크를 자동으로 삭제할 수 있게 합니다."
---

# cascade_delete

### Description

@short: 상위 작업이 삭제될 때 중첩된 작업과 링크를 자동으로 삭제할 수 있게 합니다.

@signature: cascade_delete: boolean

### Example

~~~jsx
gantt.config.cascade_delete = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

버전 4.2에서 도입되었습니다.

### Related Guides
- [작업의 기본 작업](guides/crud-task.md#cascadedeletingofnestedtasks)
