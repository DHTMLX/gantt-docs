---
sidebar_label: start_date
title: start_date config
description: "타임 스케일의 시작 값을 설정합니다"
---

# start_date

### Description

@short: 타임 스케일의 시작 값을 설정합니다

@signature: start_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");
~~~

### Details

:::note
**start_date** 옵션을 적용하려면 [end_date](api/config/end_date.md)와 함께 사용해야 합니다.
:::

- 두 옵션 **start_date**와 **end_date**가 모두 지정되고 범위를 벗어난 작업을 생성하면 차트에서 해당 작업이 사라집니다.
- [init](api/method/init.md) 메서드의 선택적 매개변수는 [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md)의 초기 값으로 사용할 수 있습니다.
- [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md)가 [fit_tasks](api/config/fit_tasks.md)을 덮어씁니다. 이러한 설정을 함께 사용하려면 [타임 스케일을 코드에서 관리하십시오](guides/configuring-time-scale.md#range).

In this case we can extend the range:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 var taskStart = task.start_date;
 var taskEnd = task.end_date;
 var scaleStart = gantt.config.start_date;
 var scaleEnd = gantt.config.end_date;

 // 작업이 현재 범위를 벗어났을 경우
 if(scaleStart > taskEnd || scaleEnd < taskStart ){
  // 시간 축 경계 업데이트
  gantt.config.end_date=new Date(Math.max(taskEnd.valueOf(), scaleEnd.valueOf()));
  gantt.config.start_date=new Date(Math.min(taskStart.valueOf(),scaleStart.valueOf()));
  gantt.render();
 }    
 return true;
});
~~~

또는 라이트박스에서 범위를 벗어난 작업을 방지하는 유효성 검사를 추가할 수도 있습니다:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
     var taskStart = task.start_date;
     var taskEnd = task.end_date;
     var scaleStart = gantt.config.start_date;
     var scaleEnd = gantt.config.end_date;

    // 작업이 허용된 범위를 벗어나는지 확인
    if(scaleStart > taskEnd || scaleEnd < taskStart ){
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
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)
- [init](api/method/init.md)
- [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md)

### Related Guides
- [Setting up Scale](guides/configuring-time-scale.md)