---
sidebar_label: start_date
title: start_date config
description: "시간 축이 시작되는 지점을 정의합니다"
---

# start_date

### Description

@short: 시간 축이 시작되는 지점을 정의합니다

@signature: start_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);

gantt.init("gantt_here");
~~~

### Details

:::note
 **start_date** 옵션을 제대로 사용하려면 [end_date](api/config/end_date.md) 옵션과 함께 설정해야 합니다. 
:::

- **start_date**와 **end_date**가 모두 설정되면, 이 범위를 벗어나는 작업은 차트에 표시되지 않습니다.
- [init](api/method/init.md) 메서드의 선택적 파라미터를 [start_date](api/config/start_date.md)와 [end_date](api/config/end_date.md)의 초기 값으로 사용할 수 있습니다.
- [start_date](api/config/start_date.md)와 [end_date](api/config/end_date.md)는 [fit_tasks](api/config/fit_tasks.md)보다 우선 적용됩니다. 두 옵션을 함께 사용하려면 [시간 축을 프로그래밍적으로 제어](guides/configuring-time-scale.md#range)해야 합니다.

시간 범위를 동적으로 확장하는 방법은 다음과 같습니다:

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
            text:"경고! 작업이 날짜 범위를 벗어났습니다!",
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
- [스케일 설정하기](guides/configuring-time-scale.md#settingtheminmasvaluesofthescale)

