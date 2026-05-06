---
sidebar_label: end_date
title: end_date 설정
description: "시간 척도의 종료 값을 설정합니다"
---

# end_date

### Description

@short: 시간 척도의 종료 값을 설정합니다

@signature: end_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");
~~~

### Details

:::note
**end_date** 옵션을 적용하려면 [start_date](api/config/start_date.md)와 함께 사용해야 합니다.
:::

- 만약 두 옵션인 **start_date** 와 **end_date** 가 모두 지정되고, 범위를 벗어나는 작업을 만들면 차트에 표시되지 않습니다.
- [init](api/method/init.md) 메서드의 Optional 매개변수는 [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md) 구성의 초기 값으로 사용할 수 있습니다.
- [start_date](api/config/start_date.md) 와 [end_date](api/config/end_date.md)는 [fit_tasks](api/config/fit_tasks.md)를 덮어씁니다. 이러한 설정들을 함께 사용하려면, 코드를 통해 시간 척도를 관리해야 합니다 [manage the time scale from code](guides/configuring-time-scale.md#range).

이 경우 범위를 확장할 수 있습니다:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 const taskStart = task.start_date;
 const taskEnd = task.end_date;
 const scaleStart = gantt.config.start_date;
 const scaleEnd = gantt.config.end_date;

 // if the task is out of the range
 if(scaleStart > taskEnd || scaleEnd  taskEnd || scaleEnd < taskStart ){
    gantt.message({
      type:"warning", 
      text:"Warning! The task is outside the date range!",
      expire:5000
    });
    return false;
  } 
  return true;
});
~~~

### Related API
- [start_date](api/config/start_date.md)
- [fit_tasks](api/config/fit_tasks.md)
- [init](api/method/init.md)
- [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md)

### Related Guides
- [스케일 설정하기](guides/configuring-time-scale.md)