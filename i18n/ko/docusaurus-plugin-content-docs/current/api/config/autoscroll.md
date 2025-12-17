---
sidebar_label: autoscroll
title: autoscroll config
description: "Gantt 차트에서 작업(task)이나 링크(link)를 브라우저의 보이는 영역 밖으로 드래그할 때 자동으로 스크롤되도록 허용합니다."
---

# autoscroll

### Description

@short: Gantt 차트에서 작업(task)이나 링크(link)를 브라우저의 보이는 영역 밖으로 드래그할 때 자동으로 스크롤되도록 허용합니다.

@signature: autoscroll: boolean

### Example

~~~jsx
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Working with 30000 tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

### Details

버전 7.1.11 이전까지는 **autoscroll** 기능을 활성화할 때 [예약된 뷰와 해당 스크롤바의 특정 ID](guides/layout-config.md#requiredviewsandsettings)를 사용해야 했습니다.

~~~js
// 가로 스크롤바:
{view: "scrollbar", id: "scrollHor"}
// 세로 스크롤바:
{view: "scrollbar", id: "scrollVer"}
~~~

다른 ID를 사용하면 스크롤바는 표시되지만 autoscroll 기능이 정상적으로 작동하지 않습니다.

버전 7.1.11부터는 스크롤바의 이름이 어떠해도 autoscroll에 영향을 주지 않습니다.

### Related API
- [autoscroll_speed](api/config/autoscroll_speed.md)

### Change log
- version 4.2에 추가됨

