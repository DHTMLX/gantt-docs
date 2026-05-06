---
sidebar_label: drag_project
title: drag_project config
description: "프로젝트 타입 항목의 드래그 앤 드롭을 활성화합니다"
---

# drag_project

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

### Description

@short: 프로젝트 타입 항목의 드래그 앤 드롭을 활성화합니다

@signature: drag_project: boolean

### Example

~~~jsx
gantt.config.drag_project = true;
~~~

**기본값:** false

### Related samples
- [드래그 가능한 프로젝트들](https://docs.dhtmlx.com/gantt/samples/08_api/19_draggable_projects.html)

### Details

사용자가 프로젝트를 하위 작업과 함께 드래그 앤 드롭할 수 있도록 합니다.

### Related Guides
- [타임라인에서의 작업 드래그](guides/dnd.md#draggingprojectswithsubtasks)