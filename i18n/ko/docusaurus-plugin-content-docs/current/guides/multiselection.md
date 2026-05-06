---
title: "다중 작업 선택" 
sidebar_label: "다중 작업 선택" 
---

# 다중 작업 선택

버전 3.2부터 라이브러리는 한 번에 여러 작업을 선택할 수 있는 **multiselect** 확장 기능을 제공합니다.

<div style="text-align:center;">![multiselection](/img/multiselection.png)</div>

## 다중 작업 선택 활성화

작업에 대해 다중 작업 선택을 활성화하려면 [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 활성화합니다:

~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({ /*!*/
        multiselect: true /*!*/
    }); /*!*/
    //your code will be here
</body>
</html>
~~~

[다중 선택 및 들여쓰기/내어쓰기 작업](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

확장 기능이 활성화되면 다중 작업 선택이 자동으로 활성화됩니다.

확장 기능을 비활성화하려면 [multiselect](api/config/multiselect.md) 옵션을 사용하세요:
**다중 작업 선택 비활성화**
~~~js
gantt.config.multiselect = false; 
~~~

## 다중 작업에 대한 일회성 업데이트

다중 작업/링크를 한 번에 업데이트하려면 [batchUpdate](api/method/batchupdate.md) 메서드를 사용하세요:

~~~js
gantt.batchUpdate(function () {
    var tasks = gantt.getTaskByTime();
    for(var i = 0; i < tasks.length; i++){
        var task = tasks[i];
        task.start_date = gantt.date.add(task.start_date, 1, "day");
        task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
        gantt.updateTask(task.id);
    }
});
~~~
이 메서드는 여러 번의 재렌더링을 나누어 수행하는 대신 단일 재렌더링으로 다수의 작업/링크를 한 번에 업데이트할 수 있게 해줍니다.

[다중 선택 및 들여쓰기/내어쓰기 작업](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

## 이터레이터

Gantt 차트의 모든 선택된 작업을 순회하려면 [eachSelectedTask](api/method/eachselectedtask.md) 메서드를 사용하세요:

~~~js
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~

[다중 선택 및 들여쓰기/내어쓰기 작업](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

## 동시 들여쓰기/내어쓰기

다중 작업 선택은 여러 작업에 대해 동시에 서로 다른 작업을 적용할 수 있게 합니다. 예를 들어 들여쓰기/내어쓰기를 추가하여 작업을 하위 작업으로 변환하거나 그 반대로도 할 수 있습니다.

[다중 선택 및 들여쓰기/내어쓰기 작업](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

## 작업이 선택되었는지 확인

작업이 현재 선택되었는지 확인하려면 [isSelectedTask](api/method/isselectedtask.md) 메서드를 사용하세요:

~~~js
gantt.templates.task_class = 
gantt.templates.grid_row_class = 
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~

[다중 선택 및 들여쓰기/내어쓰기 작업](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

선택된 상태와 비선택 상태 간 토글하려면 [toggleTaskSelection](api/method/toggletaskselection.md) 메서드를 사용하세요:

~~~js
gantt.toggleTaskSelection("t_1"); //"t_1" is the task's id
gantt.render();
~~~

## 선택된 모든 작업 얻기

현재 선택된 모든 작업을 얻으려면 [getSelectedTasks](api/method/getselectedtasks.md) 메서드를 사용하세요:

~~~js
gantt.getSelectedTasks();
~~~

가장 마지막에 선택된 작업을 얻으려면 [getLastSelectedTask](api/method/getlastselectedtask.md) 메서드를 사용하세요:

~~~js
gantt.getLastSelectedTask();
~~~

## 한 레벨 내에서의 다중 작업 선택 제한

다른 레벨의 작업 선정을 허용하지 않으려면 [multiselect_one_level](api/config/multiselect_one_level.md) 옵션을 사용하세요:

~~~js
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

## 다중 작업 선택과 drag-n-drop {#multitaskselectionanddragndrop}

**multiselect.js** 확장 기능이 활성화되면 Ctrl 키나 Shift 키를 누른 채로 선택된 작업들을 수평으로 한 번에 드래그하여 여러 작업을 선택할 수 있습니다.

이 기능을 비활성화하려면 [drag_multiple](api/config/drag_multiple.md) 설정을 *false*로 설정하세요:

~~~js
gantt.config.drag_multiple = true; 
~~~

[다중 선택 및 들여쓰기/내어쓰기 작업](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

## 한 번 클릭으로 에디터 열기

단일 선택 모드에서는 작업을 클릭하면 Gantt가 인라인 에디터를 엽니다.

다중 선택 모드에서는 선택되지 않은 작업을 클릭한 후에 그것을 선택하고, 두 번째 클릭 후에만 [inline editor](guides/inline-editing.md)가 열립니다. 만약 첫 번째 클릭 후에 인라인 에디터를 열고 싶다면 [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md) 구성을 활성화하세요.

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~

## API 이벤트 {#apievents}

다중 작업 선택이 활성화되면 하나의 작업이나 작업 범위를 선택하는 것이 일반적인 onTaskSelected / onTaskUnselected 이벤트를 트리거하고, 다중선택 확장에 특화된 이벤트도 트리거됩니다.

다중 작업 선택에는 다음과 같은 이벤트 흐름이 있습니다:

- [onBeforeMultiSelect](api/event/onbeforemultiselect.md) - 작업이나 범위를 선택하기 직전에 발생하며, 차단 가능합니다
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md) - 작업 선택 상태가 변경되기 직전에 발생합니다(해당 작업이 선택되거나 해제될 때), 차단 가능
- [onTaskMultiSelect](api/event/ontaskmultiselect.md) - 작업 선택 상태가 변경된 후(해당 작업이 선택되거나 해제된 경우) 발생
- [onTaskUnselected](api/event/ontaskunselected.md) - 다중 선택 범위의 각 작업에 대해 호출됩니다
- [onTaskSelected](api/event/ontaskselected.md) - 다중 선택 범위의 각 작업에 대해 호출됩니다
- [onMultiSelect](api/event/onmultiselect.md) - 하나의 작업 또는 작업 범위의 선택이 완료된 후 발생