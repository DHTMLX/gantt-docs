---
title: "멀티 태스크 선택"
sidebar_label: "멀티 태스크 선택"
---

멀티 태스크 선택  
===========================================

버전 3.2부터 라이브러리에는 여러 작업을 동시에 선택할 수 있는 **multiselect** 확장 기능이 포함되어 있습니다.

<div style="text-align:center;">![multiselection](/img/multiselection.png)</div>

멀티 태스크 선택 활성화  
--------------------------------------
작업에 대해 멀티 태스크 선택을 활성화하려면 [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 활성화하세요:

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

[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


활성화하면 멀티 태스크 선택 기능이 자동으로 적용됩니다.




이 확장 기능을 비활성화하려면 [multiselect](api/config/multiselect.md) 옵션을 사용하세요:
**Disabling multi-task selection**
~~~js
gantt.config.multiselect = false; 
~~~

여러 작업을 한 번에 수정하기  
--------------------------------
여러 작업이나 링크를 동시에 수정하려면 [batchUpdate](api/method/batchupdate.md) 메서드를 사용하세요:

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
이 메서드를 사용하면 여러 작업이나 링크를 한 번의 렌더링으로 일괄 업데이트할 수 있으므로, 여러 번의 업데이트로 인한 반복 렌더링을 방지할 수 있습니다.


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


이터레이터  
------------------------
간트 차트에서 선택된 모든 작업을 반복 처리하려면 [eachSelectedTask](api/method/eachselectedtask.md) 메서드를 사용하세요:

~~~js
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


동시 들여쓰기/내어쓰기  
-------------------------------------
멀티 태스크 선택을 사용하면 여러 작업에 동시에 작업을 적용할 수 있습니다. 예를 들어, 들여쓰기 또는 내어쓰기를 통해 작업을 하위 작업으로 만들거나, 하위 작업을 다시 상위 작업으로 승격할 수 있습니다.


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


작업이 선택되었는지 확인하기  
-------------------------------------
현재 작업이 선택되어 있는지 확인하려면 [isSelectedTask](api/method/isselectedtask.md) 메서드를 사용하세요:

~~~js
gantt.templates.task_class = 
gantt.templates.grid_row_class = 
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~

[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


작업의 선택 상태를 전환하려면 [toggleTaskSelection](api/method/toggletaskselection.md) 메서드를 사용하세요:

~~~js
gantt.toggleTaskSelection("t_1"); //"t_1"은 작업의 id입니다
gantt.render();
~~~

선택된 모든 작업 가져오기  
-----------------------------------
현재 선택된 모든 작업을 가져오려면 [getSelectedTasks](api/method/getselectedtasks.md) 메서드를 사용하세요:

~~~js
gantt.getSelectedTasks();
~~~

가장 최근에 선택된 작업을 가져오려면 [getLastSelectedTask](api/method/getlastselectedtask.md) 메서드를 사용하세요:

~~~js
gantt.getLastSelectedTask();
~~~

동일 레벨 내에서만 멀티 선택 제한  
-----------------------------------------------
동일한 레벨의 작업만 선택할 수 있도록 제한하려면 [multiselect_one_level](api/config/multiselect_one_level.md) 옵션을 사용하세요:

~~~js
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

## 멀티 태스크 선택과 드래그 앤 드롭 {#multitaskselectionanddragndrop}

**multiselect.js** 확장 기능이 활성화된 상태에서 Ctrl 또는 Shift를 누르면 여러 작업을 선택할 수 있으며, 선택된 작업을 함께 수평으로 드래그할 수 있습니다.

이 기능을 비활성화하려면 [drag_multiple](api/config/drag_multiple.md) 옵션을 *false*로 설정하세요:

~~~js
gantt.config.drag_multiple = true; 
~~~


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


한 번의 클릭으로 에디터 열기  
------------------------------

단일 선택 모드에서는 작업을 클릭하면 바로 인라인 에디터가 열립니다.  

**멀티 선택** 모드에서는 선택되지 않은 작업을 클릭하면 작업이 선택만 되고, 인라인 에디터는 두 번째 클릭 이후에만 열립니다.  
멀티 선택 모드에서도 첫 클릭에 에디터가 열리도록 하려면 [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md) 설정을 활성화하세요.

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~

API 이벤트  
--------------

멀티 태스크 선택이 활성화된 경우, 하나 이상의 작업을 선택하면 일반 [onTaskSelected](api/event/ontaskselected.md) / [onTaskUnselected](api/event/ontaskunselected.md) 이벤트와 멀티셀렉트 확장 전용 이벤트가 모두 발생합니다.

멀티 태스크 선택 시 발생하는 이벤트 흐름은 다음과 같습니다:

- [onBeforeMultiSelect](api/event/onbeforemultiselect.md) - 작업 또는 작업 범위를 선택하기 전에 발생; 이 이벤트는 차단할 수 있습니다
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md) - 개별 작업의 선택 상태가 변경(선택 또는 선택 해제)되기 전에 발생; 이 이벤트는 차단할 수 있습니다
- [onTaskMultiSelect](api/event/ontaskmultiselect.md) - 개별 작업의 선택 상태가 변경된 후 발생
- [onTaskUnselected](api/event/ontaskunselected.md) - 범위 내에서 선택 해제된 각 작업에 대해 호출됨
- [onTaskSelected](api/event/ontaskselected.md) - 범위 내에서 선택된 각 작업에 대해 호출됨
- [onMultiSelect](api/event/onmultiselect.md) - 작업 또는 작업 범위의 선택이 완료된 후 발생

