---
title: "이벤트 처리"
sidebar_label: "이벤트 처리"
---

이벤트 처리
===================================

이벤트는 페이지를 상호작용적이고 사용자 행동에 반응하도록 만드는 핵심 요소입니다.

사용자가 Gantt 차트와 상호작용할 때마다 dhtmlxGantt는 이벤트를 발생시킵니다. 이러한 이벤트를 활용하여 어떤 일이 발생했는지 감지하고, 그에 맞는 코드를 실행할 수 있습니다.


## 이벤트 연결하기 {#attachingevents}
--------------------------------------------

이벤트 리스너를 추가하려면 [attachEvent](api/method/attachevent.md) 메서드를 사용하세요.

~~~js
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
~~~

[D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)


**참고:**

- 이벤트 이름은 대소문자를 구분하지 않습니다.
- 동일한 이벤트에 여러 개의 핸들러를 연결할 수 있습니다.

## 이벤트 해제하기 {#detachingevents}
-------------------------

이벤트 핸들러를 제거하려면 [detachEvent](api/method/detachevent.md) 메서드를 사용하세요:

[이벤트 핸들러를 연결/해제하는 일반적인 방법](이벤트 핸들러를 연결/해제하는 일반적인 방법)
~~~js
// 이벤트 연결
var eventId = gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
// 이벤트 해제
gantt.detachEvent(eventId);/*!*/
~~~

모든 핸들러를 한 번에 제거하고 싶다면 다음과 같은 방법을 사용할 수 있습니다:

~~~js
// 이벤트를 연결할 때 핸들러 ID 저장
var events = [];
events.push(gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
events.push(gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("You've just double clicked an item with id="+id);
});
 
// 저장된 모든 이벤트 해제
while (events.length)
   gantt.detachEvent(events.pop()); /*!*/
~~~

## 핸들러 존재 여부 확인하기 {#checkingtheexistenceofahandler}
------------------------------------------

특정 이벤트에 핸들러가 연결되어 있는지 확인하려면 [checkEvent](api/method/checkevent.md) 메서드를 사용하세요:

~~~js
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked a task with id="+id);
});
 
gantt.checkEvent("onTaskClick"); // 'true' 반환 /*!*/
~~~

## 취소 가능한 이벤트 {#cancelableevents}
-----------------------

'onbefore'로 시작하는 이벤트는 취소할 수 있습니다.

이러한 이벤트를 취소하려면 이벤트 핸들러에서 **false**를 반환하면 됩니다.

**이벤트 핸들러 취소하기**
~~~js
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, old_task){
    var task = gantt.getTask(id);
    if(mode == gantt.config.drag_mode.progress){
        if(task.progress < old_task.progress){
            dhtmlx.message(task.text + " progress can't be undone!");
            return false; /*!*/
        }
    }
    return true;
});
~~~


[D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)



## 핸들러 내부에서 gantt 객체 접근하기 {#accessingtheganttobjectinsidethehandler}
---------------------------------
이벤트 핸들러 내부에서는 **this** 키워드를 사용하여 gantt 객체에 접근할 수 있습니다. <br/>

**이벤트 핸들러 내부에서 참조하기**
~~~js
gantt.attachEvent("onTaskClick", function(id, e){
    parentId = this.getTask(id).parent;
});
~~~

