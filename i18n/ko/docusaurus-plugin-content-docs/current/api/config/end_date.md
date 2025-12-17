---
sidebar_label: end_date
title: end_date config
description: "시간 스케일의 종료 지점을 정의합니다."
---

# end_date

### Description

@short: 시간 스케일의 종료 지점을 정의합니다.

@signature: end_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");
~~~

### Details

:::note
 **end_date** 옵션은 반드시 [start_date](api/config/start_date.md) 옵션과 함께 사용해야 적용됩니다.  
:::

- **start_date**와 **end_date**가 모두 설정되면, 이 범위 밖에 있는 작업들은 차트에 표시되지 않습니다.
- [init](api/method/init.md) 메서드의 선택적 파라미터를 통해 [start_date](api/config/start_date.md)와 [end_date](api/config/end_date.md)의 초기값을 지정할 수 있습니다.
- [start_date](api/config/start_date.md)와 [end_date](api/config/end_date.md)의 설정은 [fit_tasks](api/config/fit_tasks.md)보다 우선합니다. 이 설정들을 조합하려면 [프로그래밍 방식으로 시간 스케일을 제어](guides/configuring-time-scale.md#range)해야 합니다.

시간 범위를 동적으로 확장하는 예시는 다음과 같습니다:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 const taskStart = task.start_date;
 const taskEnd = task.end_date;
 const scaleStart = gantt.config.start_date;
 const scaleEnd = gantt.config.end_date;

 // 작업이 현재 범위 밖에 있을 경우
 if(scaleStart > taskEnd || scaleEnd < taskStart ){
  // 시간 스케일 경계 조정
  gantt.config.end_date=new Date(Math.max(taskEnd.valueOf(), scaleEnd.valueOf()));
  gantt.config.start_date=new Date(Math.min(taskStart.valueOf(),scaleStart.valueOf()));
  gantt.render();
 }    
 return true;
});
~~~

또는 범위 밖 작업 저장을 방지하는 검증을 추가할 수도 있습니다:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
  const taskStart = task.start_date;
  const taskEnd = task.end_date;
  const scaleStart = gantt.config.start_date;
  const scaleEnd = gantt.config.end_date;

  // 작업이 허용된 범위 밖인지 확인
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
- [start_date](api/config/start_date.md)
- [fit_tasks](api/config/fit_tasks.md)
- [init](api/method/init.md)
- [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md)

### Related Guides
- [스케일 설정하기](guides/configuring-time-scale.md#settingtheminmasvaluesofthescale)

