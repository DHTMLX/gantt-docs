---
sidebar_label: isSelectedTask
title: isSelectedTask method
description: "지정된 작업이 현재 선택되어 있는지 확인합니다."
---

# isSelectedTask

### Description

@short: 지정된 작업이 현재 선택되어 있는지 확인합니다.

@signature: isSelectedTask: (task: string | number) =\> boolean

### Parameters

- `task` - (required) *string | number* -   작업의 ID

### Returns
- ` value` - (boolean) - 작업이 선택되어 있으면 'true'를 반환하고, 그렇지 않으면 'false'를 반환합니다.

### Example

~~~jsx
gantt.templates.task_class = 
gantt.templates.grid_row_class = 
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

:::note
이 메서드는 **multiselect** 확장 기능에서 제공되므로, [multiselect](guides/extensions-list.md#multitaskselection) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [멀티 태스크 선택](guides/multiselection.md) 문서를 참고하시기 바랍니다. 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [멀티 태스크 선택](guides/multiselection.md)

