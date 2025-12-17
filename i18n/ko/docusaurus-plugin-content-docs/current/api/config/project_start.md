---
sidebar_label: project_start
title: project_start config
description: "프로젝트의 시작 날짜를 설정합니다"
---

# project_start
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 프로젝트의 시작 날짜를 설정합니다

@signature: project_start: Date | undefined

### Example

~~~jsx
gantt.config.project_start = new Date(2019, 2, 1);
~~~

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details


이 설정은 자동 스케줄링이 켜져 있을 때 새 작업의 기본 시작 날짜를 정의합니다.

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)
