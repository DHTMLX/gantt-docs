---
sidebar_label: getTaskBarHeight
title: getTaskBarHeight method
description: "작업의 DOM 요소 높이를 픽셀 단위로 반환합니다."
---

# getTaskBarHeight

### Description

@short: 작업의 DOM 요소 높이를 픽셀 단위로 반환합니다.

@signature: getTaskBarHeight: (taskId: number | string) =\> number

### Parameters

- `taskId` - (required) *number | string* -   작업의 ID

### Returns
- ` param` - (number) -   작업의 높이

### Example

~~~jsx
gantt.config.bar_height = 45;
gantt.render();

gantt.getTaskBarHeight(1); // -> 45
~~~ 

### Details

반환 값은 또한 작업 객체의 **bar_height** 속성에 지정된 값과 일치할 수 있습니다:

~~~js
const tasks = {
      data:[
         { id: 1, text: "Project #2", start_date: "01-04-2018", duration: 18, 
             progress: 0.4, open: true, bar_height: "full", row_height: 50 }, 
        { id: 2, text: "Task #1", start_date: "02-04-2018", duration: 8, 
            progress: 0.6, parent: 1, bar_height: 25, row_height: 50 },
       ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTaskBarHeight(1); // -> 45
gantt.getTaskBarHeight(2); // -> 25
~~~ 

:::note
**bar_height** 속성이 "full"로 지정되면, 이 메서드는 태스크 바의 높이를 픽셀 단위로 계산합니다.
:::

### Related API
- [bar_height](api/config/bar_height.md)

### Related Guides
- [그리드에서 행 크기 조정하기](guides/resizing-rows.md)
- [Task Object/Id](guides/task-object-operations.md#taskheight)

### Change log
- v7.1에서 추가됨