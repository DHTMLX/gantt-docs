---
title: "DnD로 작업 생성/선택하기"
sidebar_label: "DnD로 작업 생성/선택하기"
---

# DnD로 작업 생성/선택하기

dhtmlxGantt 라이브러리는 타임라인에서 작업을 관리할 수 있도록 향상된 드래그 앤 드롭 기능을 제공하는 확장 기능을 지원합니다.

요약하면, **click_drag** 확장은 다음을 지원합니다:

- [드래그 앤 드롭으로 작업 생성](#creatingtaskswithdragndrop)
- [드래그하여 스케줄되지 않은 작업의 시간 지정](#settingtimeforunscheduledtasks)
- [드래그 앤 드롭으로 작업 선택](#selectingtaskswithdragndrop)
- [드래그 앤 드롭으로 분할 작업의 일부 생성](#creatingpartsofsplittasks) (PRO 버전)

:::note
이 확장을 사용하려면 [gantt.plugins](api/method/plugins.md) 메서드를 이용해 [click_drag](guides/extensions-list.md#advanceddragndrop) 플러그인을 활성화하세요.
:::

고급 드래그 앤 드롭을 활성화하려면 [click_drag](api/config/click_drag.md) 구성 옵션을 설정하고 아래 목록에서 필요한 속성을 객체에 포함하세요:

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- **className** -  (*string*) 선택된 요소에 커스텀 CSS 클래스를 적용합니다
- **render** - (*function*) 드래그 중에 표시되는 요소를 생성하는 함수입니다. 두 개의 파라미터를 받습니다: 
    - **startPoint** - (*object*) - 다음과 같은 구조의 객체:


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


    absolute는 문서 좌상단 기준 좌표, relative는 viewPort 요소 기준 좌상단 좌표를 나타냅니다 
    - **endPoint** - (*object*) startPoint와 동일한 구조:


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


    absolute와 relative 좌표는 위와 같습니다 
- **viewPort** - (*HTMLElement*) 이벤트가 연결되고 선택이 일어나는 요소
- **useRequestAnimationFrame** - (*boolean*) 렌더링 중 requestAnimationFrame 사용 여부
- **callback** - (*function*) 마우스 버튼을 놓았을 때 호출됩니다. 6개의 파라미터를 받습니다:
    - **startPoint** - (*object*) 위와 동일한 구조
    - **endPoint** - (*object*) 위와 동일한 구조
     - **startDate** - (*Date*) 드래그 시작 시점의 날짜
    - **endDate** - (*Date*) 드래그 종료 시점의 날짜
    - **tasksBetweenDates** - (*array*) 시작과 종료 날짜 사이에 위치한 작업들
    - **tasksInRows** - (*array*) 세로로 드래그한 영역에 포함된 작업들
- **singleRow** - (*boolean*) true일 경우 선택 영역이 작업 한 행의 높이로 제한됩니다

다음 이벤트를 타임라인 뷰포트 요소(기본적으로 gantt.$task_data, 작업 바를 포함)에 연결할 수 있습니다:

- **onBeforeDrag** - 마우스 버튼을 누른 직후, 드래그 시작 전에 발생
- **onDrag** - 드래그가 시작된 후 마우스 버튼을 놓기 전까지 반복적으로 발생
- **onBeforeDragEnd** - 마우스 버튼을 놓은 후, 드래그된 요소가 제거되고 선택된 작업이 식별되기 전에 발생
- **onDragEnd** - 드래그된 요소가 제거되고 선택된 작업이 식별된 후, 콜백 함수가 호출되기 전에 발생 (설정된 경우)

~~~js
gantt.$task_data.attachEvent("onBeforeDrag", function (coords) {
    gantt.message("onBeforeDrag event");
});
~~~


**Related example:** ["click_drag" 확장에 이벤트 핸들러 연결하기](https://snippet.dhtmlx.com/l13f1cxl)


:::note
이벤트 핸들러는 반드시 이미 생성된 요소에만 추가할 수 있습니다. 따라서 Gantt를 초기화한 후에 이벤트 핸들러를 추가해야 하며, 그렇지 않으면 요소가 아직 생성되지 않아 동작하지 않습니다.
:::

## 드래그 앤 드롭으로 작업 생성하기

타임라인의 빈 공간을 클릭하여 시작 날짜를 지정한 후, 오른쪽으로 드래그하여 작업의 기간을 설정할 수 있습니다.

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};

gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRow){
    if (tasksInRow.length === 1) {
        var parent = tasksInRow[0];
        gantt.createTask({
            text:"Subtask of " + parent.text,
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        }, parent.id);
    } else if (tasksInRow.length === 0) {
        gantt.createTask({
            text:"New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        });
    }
}
~~~


[Create new tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)


## 스케줄되지 않은 작업의 시간 지정하기

**click_drag** 확장을 사용하면 [스케줄되지 않은 작업](guides/unscheduled-tasks.md)의 시간 구간도 드래그 앤 드롭으로 지정할 수 있습니다.

## 드래그 앤 드롭으로 작업 선택하기

드래그 앤 드롭을 통해 여러 방식(날짜, 행, 경계 내)으로 작업을 선택할 수 있습니다.

~~~js
gantt.config.multiselect = true;
gantt.config.click_drag = {
    callback: onDragEnd
};

gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;
gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRows){
    var mode = document.querySelector("input[name="selectMode]:checked"").value;
        switch(mode) {
            case "1":
                unselectTasks();
                tasksBetweenDates.forEach(function(item) {
                    gantt.selectTask(item.id);
                });
            break;
            case "2":
                unselectTasks();
                tasksInRows.forEach(function(item) {
                    gantt.selectTask(item.id);
                });
            break;
            case "3":
                unselectTasks();
                for (var i="0;" i<tasksBetweenDates.length; i++) {
                    for (var j="0;" j<tasksInRows.length; j++) {
                        if (tasksBetweenDates[i] === tasksInRows[j]) {
                            gantt.selectTask(tasksBetweenDates[i].id);
                        }
                    }
                }
            break;
            return;
        }
}
~~~


[Select multiple tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/25_click_drag_select_by_drag.html)


## 분할 작업의 일부 생성하기

드래그 앤 드롭을 사용하여 [분할 작업](guides/split-tasks.md)의 일부를 생성할 수도 있습니다.

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
}

gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRow){
    if (tasksInRow.length === 1) {
        var currentTask = tasksInRow[0];
        if (currentTask.type === "project") {
            currentTask.render = "split";
            gantt.addTask({
                text:"Subtask of " + currentTask.text,
                start_date: gantt.roundDate(startDate),
                end_date: gantt.roundDate(endDate)
            }, currentTask.id);
        } else {
            var projectName = "new Project " + currentTask.text;
            var newProject = gantt.addTask({
                text: projectName,
                render: "split",
                type: "project",
            }, currentTask.parent);
            gantt.moveTask(
                newProject,
                gantt.getTaskIndex(currentTask.id),
                gantt.getParent(currentTask.id)
            );
            gantt.moveTask(currentTask.id, 0, newProject);
            gantt.calculateTaskLevel(currentTask)

            var newTask = gantt.addTask({
                text:"Subtask of " + projectName,
                start_date: gantt.roundDate(startDate),
                end_date: gantt.roundDate(endDate)
            }, newProject);
            gantt.calculateTaskLevel(newTask);
        }
    } else if (tasksInRow.length === 0) {
        gantt.createTask({
            text:"New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        });
    }
}
~~~


[Create split tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/23_click_drag_splittask.html)

