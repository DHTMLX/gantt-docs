--- 
sidebar_label: autoscroll
title: autoscroll config
description: "현재 브라우저 화면 밖으로 작업이나 링크를 드래그할 때 자동 스크롤을 활성화합니다"
---

# autoscroll

### Description

@short: 현재 브라우저 화면 밖으로 작업이나 링크를 드래그할 때 자동 스크롤을 활성화합니다

@signature: autoscroll: boolean

### Example

~~~jsx
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

**기본값:** true


### Related samples
- [30,000개의 작업 다루기](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

### Details

참고: **버전 7.1.11까지**는 스크롤바에 사용할 예약된 뷰와 해당 아이디를 사용해야 합니다([스크롤바에 대한 예약 뷰와 그 아이디](guides/layout-config.md#required-views-and-settings)를 사용하면서 **autoscroll** 옵션을 함께 사용할 때 필요합니다).

~~~js
// horizontal scrollbar:
{view: "scrollbar", id: "scrollHor"}
// vertical scrollbar:
{view: "scrollbar", id: "scrollVer"}
~~~

다른 이름을 사용하면 스크롤바는 작동하겠지만, "autoscroll" 기능은 작동하지 않습니다. 

버전 7.1.11부터는 스크롤바에 아무 이름이나 사용할 수 있습니다.

### Related API
- [autoscroll_speed](api/config/autoscroll_speed.md)

### Change log
- 버전 4.2에서 추가됨