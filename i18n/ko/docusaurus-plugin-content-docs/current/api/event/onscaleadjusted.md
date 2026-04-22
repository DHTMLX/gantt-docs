---
sidebar_label: onScaleAdjusted
title: onScaleAdjusted event
description: "스케일이 모든 작업을 완전히 표시하도록 다시 렌더링될 때 발생합니다"
---

# onScaleAdjusted

### Description

@short: 스케일이 다시 렌더링되어 모든 작업이 완전히 보이도록 할 때 발생하는 이벤트

@signature: onScaleAdjusted: () => void;

### Example

~~~jsx
gantt.attachEvent("onScaleAdjusted", function(){
    const min = gantt.getState().min_date;
    const max = gantt.getState().max_date;
    const to_str = gantt.templates.task_date;

    return gantt.message(`Scale shows days from ${to_str(min)} 
 to ${to_str(max)}`);
});
~~~

### Related samples
- [자동 크기 조정 스케일](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)

### Details

참고: 이 이벤트는 [fit_tasks](api/config/fit_tasks.md) 속성이 *true*로 설정되어 있을 때에만 발생합니다.

### Related API
- [fit_tasks](api/config/fit_tasks.md)