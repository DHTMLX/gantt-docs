---
title: "의존 태스크와 함께 태스크를 이동하기"
sidebar_label: "의존 태스크와 함께 태스크를 이동하기"
---

# 의존 태스크와 함께 태스크를 이동하기

의존 태스크와 함께 태스크를 이동시키는 여러 가지 방법이 있습니다.

## 자동 스케줄링 확장 사용하기

먼저 [자동 스케줄링](guides/auto-scheduling.md) 확장을 사용할 수 있습니다.
이 기능은 태스크 간의 관계에 따라 자동으로 태스크를 스케줄링합니다.

자동 스케줄링 기능을 사용하려면 [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 활성화해야 합니다:

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

그리고 **auto_scheduling** 속성을 true로 설정합니다:

~~~js
gantt.config.auto_scheduling = true;
~~~

## 태스크를 수동으로 이동하기

### 챕터 내용

- [연결된 모든 태스크 가져오기](#linked_tasks)
- [메인 태스크와 함께 자손 태스크를 동기적으로 이동하기](#sync)
- [메인 태스크 이동이 끝난 후 자손 태스크를 이동하기](#after)


### 핵심 아이디어
종속 태스크를 드래그해 이동시키는 일반적인 방법은 다음과 같습니다:

- 태스크가 이동 중인지 감지합니다
- 모든 종속 태스크를 순회하며 동일한(또는 필요에 따라 다른) 기준으로 이동합니다

따라서 아래의 두 가지 방법 중 하나를 선택할 수 있습니다:

- [메인 태스크와 함께 자손 태스크를 동기적으로 이동하기](#sync)
- [메인 태스크 이동이 끝난 후 자손 태스크를 이동하기](#after)

두 경우 모두 먼저 모든 연결된 태스크를 가져와야 합니다.


### 모든 연결된 태스크 가져오기 {#linked_tasks}

관련 링크를 검색하려면 태스크 객체의 **$source** 및 **$target** 속성을 사용합니다.
속성은 자동으로 생성되며 관련 링크의 아이디를 저장합니다:

- $source - 태스크에서 나오는 링크;
- $target - 태스크로 들어오는 링크

~~~js
var taskObj = gantt.getTask("t1");
 
var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - 나오는 링크들의 아이디  
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - 들어오는 링크들의 아이디
~~~


그리고 링크에서 종속 태스크를 얻을 수 있습니다.

따라서 연결된 태스크를 가져오려면 이터레이터를 선언해야 합니다:

~~~js
gantt.eachSuccessor = function(callback, root){
  if(!this.isTaskExists(root))
    return;
  
  // 무한 루프를 방지하기 위해 이미 순회한 태스크를 기억합니다
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
        
        // 첫 번째 레벨 의존성뿐만 아니라 가지 전체를 순회합니다
        this.eachSuccessor(callback, link.target, traversedTasks);
      }
    }
  }
};
~~~


### 메인 태스크와 함께 자손 태스크를 동기적으로 이동하기 {#sync}

자손 태스크는 메인 태스크의 이동과 함께 동기적으로 이동할 수 있습니다. 즉, 사용자가 태스크를 이동하기 시작하면 모든 종속 가지가 함께 이동합니다. 
이 방식은 보기에는 좋지만, 한꺼번에 많은 태스크를 이동하면 성능 저하가 발생할 수 있습니다.


#### 1단계

먼저 앞서 보인 이터레이터를 선언합니다 [위의](#linked_tasks).


#### 2단계

그런 다음 [onTaskDrag](api/event/ontaskdrag.md) 이벤트에 핸들러를 연결해야 합니다. 이 핸들러는 드래그-앤-드롭의 매 프레임마다 호출되며, 여기에서 모든 연결된 태스크를 이동시킵니다.

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


#### 3단계

마지막으로 사용자가 마우스 버튼을 놓고 드래그-앤-드롭이 끝나면 자식 아이템의 위치를 스케일에 맞게 반올림해야 합니다. [onAfterTaskDrag](api/event/onaftertaskdrag.md) 이벤트를 사용하면 됩니다:

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


이 방법은 연결된 태스크가 너무 많지 않을 때 잘 작동합니다.


### 메인 태스크 이동이 끝난 후 자손 태스크를 이동하기 {#after}

메인 태스크 이동이 끝난 후 자손 태스크를 업데이트할 수 있습니다. 결과는 더 단순하게 보이지만 성능은 더 좋습니다.

다음과 같은 방식으로 동작합니다: 드래그 앤 드롭이 끝나면 태스크가 얼마나 이동되었는지 확인하고 모든 연결된 태스크를 같은 값으로 이동합니다.

#### 1단계

먼저 위에서 보여준 [연결된 태스크 가져오기](#linked_tasks)와 같이 이터레이터를 선언합니다.


#### 2단계

사용자가 마우스 버튼을 놓고 드래그 앤 드롭이 끝나면 [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) 이벤트를 캡처할 수 있으며,
여기서는 수정된 태스크와 원래 태스크의 두 인스턴스가 이용 가능하고 이들 간의 날짜 차이를 계산합니다.

:::note
주: 이 단계에서 drag-and-drop은 취소될 수 있습니다(onBeforeTaskChanged가 이를 취소하도록 허용하고, 귀하의 앱에 이를 처리하는 핸들러가 있을 수 있습니다),
따라서 이곳에서는 종속 태스크를 수정하지 않습니다.
:::

대신 같은 클로저 안에 계산된 diff 값을 변수에 저장하여 나중에 접근할 수 있도록 합니다.

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


#### 3단계

마지막으로 drag-and-drop가 수행되었음을 나타내는 [onAfterTaskDrag](api/event/onaftertaskdrag.md) 이벤트를 캡처합니다. 이 시점에서 이전 단계에서 계산한 *diff*를 사용하여 모든 의존 태스크를 업데이트할 수 있습니다:

~~~js
//자식 아이템의 위치를 스케일에 맞게 반올림
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


전체 코드는 아래와 같습니다:

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
  
  //자식 아이템의 위치를 스케일에 맞게 반올림
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