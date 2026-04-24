---
sidebar_label: Gantt
title: Gantt
description: "dhtmlxGantt 차트의 새로운 인스턴스를 생성하는 데 사용할 수 있는 팩토리 객체"
---

# Gantt

:::info
This functionality is available in the Gantt PRO version under the Commercial (since October 6, 2021), Enterprise and Ultimate licenses 
:::

### Description

@short: dhtmlxGantt 차트의 새로운 인스턴스를 생성하는 데 사용할 수 있는 팩토리 객체

@signature: Gantt: object

### Example

~~~jsx
// 전역 객체로 사용할 수 있습니다
const myGantt = Gantt.getGanttInstance();

// 또는 `dhtmlx-gantt.js`에서 모듈로 가져오기
import { Gantt } from 'dhtmlx-gantt';
...
const myGantt = Gantt.getGanttInstance();
~~~

## 메서드

- **getGanttInstance(ganttConfig)** - creates a new instance of dhtmlxGantt. Takes the following parameter:
    - **ganttConfig** - (*object*) optional, 새로운 Gantt 인스턴스용 구성 객체([configuration object](guides/multiple-gantts.md#gantt-instance-configuration))

예시:

~~~js
const myGantt = Gantt.getGanttInstance();
~~~

더 이상 필요하지 않으면, Gantt 인스턴스의 `destructor()` 메서드를 사용하여 파괴할 수 있습니다, 예를 들어:

~~~js
const myGantt = Gantt.getGanttInstance();
...
myGantt.destructor();
~~~