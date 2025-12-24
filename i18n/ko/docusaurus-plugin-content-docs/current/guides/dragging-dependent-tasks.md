---
title: "종속 작업과 함께 작업 드래그하기"
sidebar_label: "종속 작업과 함께 작업 드래그하기"
---

# 종속 작업과 함께 작업 드래그하기


작업을 종속 작업과 함께 이동하는 방법에는 여러 가지가 있습니다.

## Auto Scheduling 확장 기능 사용하기


한 가지 방법은 [자동 스케줄링](guides/auto-scheduling.md) 확장 기능을 사용하는 것입니다. 이 확장 기능은 작업 간의 관계를 기반으로 자동으로 일정을 조정합니다.

Auto scheduling을 활성화하려면 [gantt.plugins](api/method/plugins.md) 메서드를 사용하세요:

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

그리고 **auto_scheduling** 속성을 true로 설정하세요:

~~~js
gantt.config.auto_scheduling = true;
~~~

## 작업을 수동으로 이동하기


###챕터 목차

- [모든 연결된 작업 가져오기](#linked_tasks)
- [주 작업과 하위 작업을 동시에 이동하기](#sync)
- [주 작업 이동 후 하위 작업 이동하기](#after)


###주요 아이디어
종속 작업을 드래그하는 일반적인 방법은 다음과 같습니다:

- 작업이 이동 중임을 감지합니다.
- 모든 종속 작업을 찾아 동일한(또는 조정된) 양만큼 이동시킵니다.

다음 두 가지 접근법 중 하나를 선택할 수 있습니다:

- [주 작업과 하위 작업을 동시에 이동하기](#sync)
- [주 작업 이동 후 하위 작업 이동하기](#after)

어느 경우든, 첫 번째 단계는 모든 연결된 작업을 가져오는 것입니다.


### 모든 연결된 작업 가져오기 {#linked_tasks}

작업에 연결된 링크를 찾으려면, 작업 객체의 **$source** 및 **$target** 속성을 사용하세요.
이 속성들은 자동으로 생성되며 관련 링크의 ID를 포함합니다:

- $source - 해당 작업에서 시작하는 링크
- $target - 해당 작업을 가리키는 링크

~~~js
var taskObj = gantt.getTask("t1");
 
var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - 아웃고잉 링크의 id  
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - 인커밍 링크의 id
~~~

이 링크들로부터 종속 작업을 찾을 수 있습니다.

모든 연결된 작업을 수집하려면 다음과 같이 이터레이터를 정의하세요:

~~~js
gantt.eachSuccessor = function(callback, root){
  if(!this.isTaskExists(root))
    return;
  
  // 무한 루프를 방지하기 위해 방문한 작업을 추적합니다
  var traversedTasks = arguments[2] || {};
  if(traversedTasks[root])
    return;
  traversedTasks[root] = true;
  
  var rootTask = this.getTask(root);
  var links = rootTask.$source;
  if(links){
    for(var i="0;" i < links.length; i++){
      var link = this.getLink(links[i]);
      if(this.isTaskExists(link.target) && !traversedTasks[link.target]){
        callback.call(this, this.getTask(link.target));
        
        // 1단계뿐 아니라 전체 종속 분기를 순회합니다
        this.eachSuccessor(callback, link.target, traversedTasks);
      }
    }
  }
};
~~~


### 주 작업과 하위 작업을 동시에 이동하기 {#sync}

하위 작업은 주 작업을 드래그하는 동안 함께 이동할 수 있습니다. 즉, 사용자가 주 작업을 이동할 때 모든 종속 작업도 동시에 이동합니다. 이 방식은 부드럽게 보이지만, 작업이 많을 경우 성능이 저하될 수 있습니다.

####1단계

먼저, [모든 연결된 작업 가져오기](#linked_tasks)에서 보여준 대로 이터레이터를 선언하세요.

####2단계

다음으로, [onTaskDrag](api/event/ontaskdrag.md) 이벤트에 핸들러를 연결하세요. 이 이벤트는 드래그 프레임마다 발생하며, 여기서 연결된 모든 작업을 이동할 수 있습니다.

~~~js
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
  var modes = gantt.config.drag_mode;
  if(mode == modes.move){
    var diff = task.start_date - original.start_date;
    gantt.eachSuccessor(function(child){
      child.start_date = new Date(+child.start_date + diff);
      child.end_date = new Date(+child.end_date + diff);
      gantt.refreshTask(child.id, true);
    },id );
  }
  return true;
});
~~~

####3단계

마지막으로, 드래그가 끝나고 사용자가 마우스를 놓았을 때 하위 작업의 위치를 스케일에 맞게 반올림하세요. 이는 [onAfterTaskDrag](api/event/onaftertaskdrag.md) 이벤트를 사용하여 할 수 있습니다:

~~~js
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
  var modes = gantt.config.drag_mode;
  if(mode == modes.move ){
    gantt.eachSuccessor(function(child){
      child.start_date = gantt.roundDate(child.start_date);
      child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
      gantt.updateTask(child.id);
    },id );
  }
});
~~~

이 방법은 연결된 작업이 많지 않은 경우에 적합합니다.


### 주 작업 이동 후 하위 작업 이동하기 {#after}

또 다른 방법으로, 하위 작업을 주 작업이 이동된 후에만 업데이트할 수 있습니다. 이 방식은 시각적으로 더 간단하며 성능도 더 좋습니다.

아이디어는 드래그 앤 드롭이 끝날 때까지 기다렸다가, 주 작업이 얼마나 이동했는지 계산한 후 모든 연결된 작업을 그만큼 이동시키는 것입니다.

####1단계

먼저, 앞서 [모든 연결된 작업 가져오기](#linked_tasks)에서 설명한 대로 이터레이터를 선언하세요.

####2단계

사용자가 드래그를 끝냈을 때 [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) 이벤트를 캡처하세요. 이 이벤트는 이동된 작업의 원본과 수정본을 모두 제공하므로 날짜 차이를 계산할 수 있습니다.

:::note
이 시점에서는 드래그 앤 드롭이 여전히 취소될 수 있다는 점에 유의하세요( onBeforeTaskChanged는 취소를 지원하며, 앱에 이를 수행하는 핸들러가 있을 수 있음). 따라서 이 단계에서는 종속 작업을 업데이트하지 않습니다.
:::

대신, 계산된 차이를 나중에 접근 가능한 변수에 저장하세요.

~~~js
var diff = 0;

gantt.attachEvent("onBeforeTaskChanged", function(id, mode, originalTask){
  var modes = gantt.config.drag_mode;
  if(mode == modes.move ){
    var modifiedTask = gantt.getTask(id);
    diff = modifiedTask.start_date - originalTask.start_date;
  }
  return true;
});
~~~

####3단계

마지막으로, [onAfterTaskDrag](api/event/onaftertaskdrag.md) 이벤트를 사용하여 이전에 계산한 *diff* 만큼 모든 종속 작업을 업데이트하세요:

~~~js
// 하위 항목의 위치를 스케일에 맞게 반올림합니다
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
      gantt.eachSuccessor(function(child){
        child.start_date = gantt.roundDate(new Date(child.start_date.valueOf() + diff));
        child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
        gantt.updateTask(child.id);
      },id );
    }
});
~~~

전체 코드는 다음과 같습니다:

~~~js
(function(){
  
  var diff = 0;
  
  gantt.attachEvent("onBeforeTaskChanged", function(id, mode, originalTask){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
      var modifiedTask = gantt.getTask(id);
      diff = modifiedTask.start_date - originalTask.start_date;
    }
    return true;
  });
  
  // 하위 항목의 위치를 스케일에 맞게 반올림합니다
  gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
      gantt.eachSuccessor(function(child){
        child.start_date = gantt.roundDate(new Date(child.start_date.valueOf() + diff));
        child.end_date = gantt.calculateEndDate(child.start_date, child.duration);
        gantt.updateTask(child.id);
      },id );
    }
  });
})();
~~~

@linkclass:hidden

