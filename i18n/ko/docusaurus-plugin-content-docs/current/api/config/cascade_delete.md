--- 
sidebar_label: cascade_delete
title: cascade_delete 설정
description: "중첩된 작업 및 링크의 cascade 삭제를 활성화합니다"
---

# cascade_delete

### Description

@short: 중첩된 작업 및 링크의 연쇄 삭제를 활성화합니다

@signature: cascade_delete: boolean

### Example

~~~jsx
gantt.config.cascade_delete = false;
gantt.init("gantt_here");
~~~

**기본값:** true

### Details

버전 4.2에서 추가됨

### Related Guides
- [Basic Operations with Tasks](guides/crud-task.md)