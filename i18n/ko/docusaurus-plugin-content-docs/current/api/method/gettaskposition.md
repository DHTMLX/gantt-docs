---
sidebar_label: getTaskPosition
title: getTaskPosition method
description: "타임라인 영역 내에서 작업의 DOM 요소 위치와 크기를 계산합니다."
---

# getTaskPosition

### Description

@short: 타임라인 영역 내에서 작업의 DOM 요소 위치와 크기를 계산합니다.

@signature: getTaskPosition: (task: Task, from?: Date, to?: Date) =\> any

### Parameters

- `task` - (required) *Task* - 작업 객체
- `from` - (optional) *Date* - 선택 사항, 항목의 시작 날짜
- `to` - (optional) *Date* - 선택 사항, 항목의 종료 날짜

### Returns
- ` object` - (object) - 크기와 위치를 설명하는 객체를 반환합니다.

### Example

~~~jsx
// 기준선 표시 추가
gantt.addTaskLayer(function draw_planned(task) {
    if (task.planned_start && task.planned_end) {
        const sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end); /*!*/
        const el = document.createElement('div');
        el.className = 'baseline';
        el.style.left = sizes.left + 'px';
        el.style.top = sizes.top + 'px';
        el.style.width = sizes.width + 'px';
        el.style.height= sizes.height + 'px';
        return el;
    }
    return false;
});
~~~

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

이 메서드는 다음 속성을 포함하는 객체를 반환합니다:

- **left** - 픽셀 단위의 CSS left 위치
- **top** - 픽셀 단위의 CSS top 위치
- **height** - 바 요소의 픽셀 단위 CSS 높이 ([bar_height](api/config/bar_height.md) 설정 또는 *task.bar_height* 속성에 의해 설정)
- **rowHeight** - 작업 행의 픽셀 단위 CSS 높이 ([row_height](api/config/row_height.md) 설정 또는 *task.row_height* 속성에 의해 설정) (v7.1에 추가됨)
- **width** - 픽셀 단위의 CSS 너비 (작업의 시작 및 종료 날짜 사이 기간 또는 선택적으로 제공된 'from'과 'to' 날짜를 기반으로 계산)

인수를 하나만 제공하면 메서드는 **task.start_date**와 **task.end_date**를 사용하여 **width**와 **left**를 계산합니다. 두 번째와 세 번째 인수를 제공하면 해당 날짜들이 대신 사용됩니다.

이 메서드는 시간 단위 설정에 관계없이 날짜의 날짜 및 시간 부분을 항상 고려합니다. 예를 들어, 다음 두 호출은:

~~~js
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 1, 0)); 
// 그리고
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 5, 0)); 
~~~

*hour*, *day*, *month*, 또는 *year* 스케일을 사용하더라도 서로 다른 크기의 박스를 반환합니다.

