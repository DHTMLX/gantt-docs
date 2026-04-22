---
sidebar_label: autosize
title: autosize 설정
description: "Gantt 차트가 스크롤 없이 모든 작업을 표시하도록 자동으로 크기를 변경하도록 강제합니다"
---

# autosize

### Description

@short: Gantt 차트가 스크롤 없이 모든 작업을 표시하도록 자동으로 크기를 변경하도록 강제합니다

@signature: autosize: boolean | string

### Example

~~~jsx
gantt.config.autosize = "xy";

gantt.init("gantt_here");
~~~

**Default value:** false

### Details

The `autosize` config defines whether the Gantt will fit data inside the size of the container where it's initialized and show inner scrollbars,
or modify the size of the container in order to show all data without inner scrolls:

- [a sample with sizes of Gantt div defined in CSS](https://snippet.dhtmlx.com/2m48u5oz) - inner scrollbars are active if necessary
- [a sample with sizes of Gantt div calculated by a component](https://snippet.dhtmlx.com/syzmiqwt) - inner scrollbars are disabled

In case Gantt should fit a certain area on a page, the size of the Gantt container must be managed manually:

- autosizing should be disabled
- width/height of a div should be calculated either by HTML layout if some ready solution for responsive layouts is used, or manually by code

## Scrolling to hidden elements

In the default mode, Gantt is scrolled automatically when you use the [`showTask()`](api/method/showtask.md) or [`showDate()`](api/method/showdate.md) method.
But, when `autosize` is enabled, Gantt increases the size of its container to show itself on the page instead of showing the hidden element.

There is no any universal way to escape the problem because the page can also include other elements except for Gantt, and some of the elements also need to be scrolled. Therefore, this problem should be solved depending on the page/application configuration.

In a *simple* configuration, Gantt may be located before or after some elements in your application. And it can work correctly if you scroll the page.

In a *complex* configuration, the Gantt container can be placed into other containers which can also be placed in some other containers.
In this case, you need to manually scroll only the elements you need.

One of the ways to make the page scroll to the necessary element is to use the `element.scrollIntoView()` method:

~~~js
const taskAttribute = gantt.config.task_attribute;
const timelineElement = document.querySelector(`.gantt_task_line[${taskAttribute}='${id}']`);

timelineElement?.scrollIntoView({ block: "center" });
~~~

where id is the task ID you need to show.

Another way is to modify the [`showTask()`](api/method/showtask.md) or [`showDate()`](api/method/showdate.md) method of Gantt:

~~~js
const defaultShowTask = gantt.showTask;

gantt.showTask = function(id) {
    defaultShowTask.apply(this, [id]);
    const taskAttribute = gantt.config.task_attribute;
    const timelineElement = document.querySelector(`.gantt_task_line[${taskAttribute}='${id}']`);

    timelineElement?.scrollIntoView({ block: "center" });
};
~~~

or create a custom function to show the task:

~~~js
const showTask = (id) => {
    gantt.showTask(id);
    const taskAttribute = gantt.config.task_attribute;
    const timelineElement = document.querySelector(`.gantt_task_line[${taskAttribute}='${id}']`);

    timelineElement?.scrollIntoView({ block: "center" });
};
~~~

:::note
샘플: [지정된 요소로 스크롤](https://snippet.dhtmlx.com/or73u6a5)
:::

### Related API
- [autosize_min_width](api/config/autosize_min_width.md)