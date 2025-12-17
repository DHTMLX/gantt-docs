---
sidebar_label: timeline_cell_content
title: timeline_cell_content template
description: "타임라인 셀 내부에 커스텀 HTML 콘텐츠를 지정할 수 있습니다."
---

# timeline_cell_content

### Description

@short: 타임라인 셀 내부에 커스텀 HTML 콘텐츠를 지정할 수 있습니다.

@signature: timeline_cell_content: (task: Task, date: Date) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - 작업 객체
- `date` - (required) *Date* - 셀에 해당하는 날짜

### Returns
- ` text` - (string | number | void) - HTML 문자열

### Example

~~~jsx
gantt.templates.timeline_cell_content = function (task, date) {
    if (gantt.getTaskType(task) === "task"){
        const cost = calculateSlotCost(task, date);
        return `<div class='cost'>${demoValue}</div>`;
    }
    return "";
};
~~~

### Related samples
- [Custom content inside the timeline cells](https://docs.dhtmlx.com/gantt/samples/04_customization/24_timeline_cells_custom_content.html)

### Details

:::note
 이 템플릿은 타임라인 셀 내부에 커스텀 콘텐츠를 표시하고자 할 때 [addTaskLayer()](guides/baselines.md) 메서드보다 선호됩니다. 구현이 더 간편하며 성능도 더 우수합니다. 
:::

커스텀 콘텐츠는 작업 바 아래에 *표시*되므로 작업 바가 더 높은 z-index를 가집니다. 따라서 작업 바가 셀을 덮는 경우 콘텐츠가 가려질 수 있다는 점을 유의하세요.

커스텀 콘텐츠가 작업 바 위에 표시되길 원한다면, 커스텀 요소에 더 높은 'z-index'를 지정할 수 있습니다:

~~~html
<style>
    .cost{
        position:absolute;
        z-index: 5;
        pointer-events: none; 
    }
</style>
~~~

### Related API
- [addTaskLayer](api/method/addtasklayer.md)

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
- [타임라인 영역의 커스텀 요소](guides/baselines.md)

### Change log
- v8.0에 추가됨

