---
sidebar_label: timeline_cell_content
title: timeline_cell_content template
description: "타임라인 셀에서 사용자 정의 HTML 콘텐츠를 지정합니다"
---

# timeline_cell_content

### Description

@short: 타임라인 셀에서 사용자 정의 HTML 콘텐츠를 지정합니다

@signature: timeline_cell_content: (task: Task, date: Date) =\> string | number | void;

### Parameters

- `task` - (필수) *Task* - 해당 작업의 객체
- `date` - (필수) *Date* - 셀의 날짜

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
- [타임라인 셀 안의 사용자 정의 콘텐츠](https://docs.dhtmlx.com/gantt/samples/04_customization/24_timeline_cells_custom_content.html)

### Details

:::note
템플릿은 타임라인 셀에 커스텀 콘텐츠를 표시해야 하는 경우 addTaskLayer() 메서드 대신 이 템플릿을 사용하면 됩니다. 구현이 더 쉽고 성능도 더 빠릅니다.
:::

참고로, 커스텀 콘텐츠는 작업 바 *아래에* 표시되며, 이는 작업 바가 위에 위치할 때 셀의 콘텐츠가 보이지 않음을 의미합니다.
콘텐츠가 막대 위에 보이도록 하려면 커스텀 요소에 'z-index'를 추가할 수 있습니다:

~~~css
    .cost{
        position:absolute;
        z-index: 5;
        pointer-events: none; 
    }
~~~

### Related API
- [addTaskLayer](api/method/addtasklayer.md)

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
- [타임라인 영역의 커스텀 엘리먼트](guides/baselines.md)

### Change log
- v8.0에 추가됨