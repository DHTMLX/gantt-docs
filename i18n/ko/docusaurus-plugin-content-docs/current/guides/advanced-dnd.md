---
title: "드래그 앤 드롭으로 작업 만들기/선택하기"
sidebar_label: "드래그 앤 드롭으로 작업 만들기/선택하기"
---

# 드래그 앤 드롭으로 작업 만들기/선택하기

dhtmlxGantt 라이브러리는 타임라인에서 작업을 다룰 때 고급 드래그 앤 드롭 기능을 포함하는 확장 기능을 제공합니다. 

모든 면에서, **click_drag** 확장은 다음을 가능하게 합니다:

- [드래그 앤 드롭으로 작업 만들기](#creating-tasks-with-drag-n-drop)
- [미정렬된 작업의 시간을 드래그 앤 드롭으로 설정하기](#setting-time-for-unscheduled-tasks)
- [드래그 앤 드롭으로 작업 선택하기](#selecting-tasks-with-drag-n-drop)
- [드래그 앤 드롭으로 분할 작업의 일부 만들기](#creating-parts-of-split-tasks) (PRO 버전)

:::note
확장을 사용하려면 [gantt.plugins] 메서드를 사용해 [click_drag] 플러그인을 활성화하세요.
:::

고급 드래그 앤 드롭을 활성화하려면 [click_drag](api/config/click_drag.md) 구성 옵션을 지정하고 아래 목록의 필요한 속성들을 해당 객체 안에 설정합니다: 

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- **className** -  (*string*) 선택된 요소에 대한 사용자 정의 CSS 클래스를 설정합니다
- **render** - (*function*) 드래그 중에 렌더링되는 요소를 생성하는 함수입니다. 두 개의 매개변수를 받습니다: 
    - **startPoint** - (*object*) - 다음 형식의 객체:


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  여기서 absolute - 문서의 좌상단 모서리의 좌표이고, relative - 뷰포트로 사용되는 왼쪽 상단 요소의 좌표를 나타냅니다 
    - **endPoint** - (*object*) - 다음 형식의 객체:


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  여기서 absolute - 문서의 좌상단 모서리의 좌표이고, relative - 뷰포트로 사용되는 왼쪽 상단 요소의 좌표를 나타냅니다 
- **viewPort** - (*HTMLElement*) 이벤트를 연결하고 선택할 요소
- **useRequestAnimationFrame** - (*boolean*) 렌더링 중에 requestAnimationFrame을 사용할지 여부를 정의합니다
- **callback** - (*function*) - 마우스 버튼을 놓을 때 호출되는 함수입니다. 6개의 매개변수를 받습니다:
    - **startPoint** - (*object*) - 다음 형식의 객체:


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  여기서 absolute - 문서의 좌상단 모서리의 좌표이고, relative - 뷰포트로 사용되는 왼쪽 상단 요소의 좌표를 나타냅니다 
    - **endPoint** - (*object*) - 다음 형식의 객체:


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  여기서 absolute - 문서의 좌상단 모서리의 좌표이고, relative - 뷰포트로 사용되는 왼쪽 상단 요소의 좌표를 나타냅니다 
     - **startDate** - (*Date*) 시작 지점에 해당하는 날짜
    - **endDate** - (*Date*) 종료 지점에 해당하는 날짜
    - **tasksBetweenDates** - (*array*) 시작일과 종료일 사이의 작업 배열
    - **tasksInRows** - (*array*) 시작 좌표와 종료 좌표 사이에 수직으로 선택된 작업 배열
- **singleRow** - (*boolean*) 선택을 작업의 높이와 같은 한 행에만 추가하려면 true

다음 이벤트를 타임라인 뷰포트의 요소에 연결할 수 있습니다(기본적으로 gantt.$task_data - 타임라인의 작업 막대가 있는 영역의 일부):

- **onBeforeDrag** - 마우스 버튼을 누른 직후 드래그를 시작하기 전에 발생
- **onDrag** - 드래그를 시작한 후 마우스 버튼을 놓기 전 매번 발생
- **onBeforeDragEnd** - 마우스 버튼을 놓은 후 렌더링된 요소가 삭제되기 전과 선택 영역에 들어오는 작업들을 검색하기 전에 발생
- **onDragEnd** - 렌더링된 요소를 제거하고 선택 영역에 들어오는 작업들을 찾은 후, 콜백 함수를 호출하기 전에 발생합니다(지정된 경우)

~~~js
gantt.$task_data.attachEvent("onBeforeDrag", function (coords) {
    gantt.message("onBeforeDrag event");
});
~~~

**관련 샘플**  [Attaching event handlers for the "click_drag" extension](https://snippet.dhtmlx.com/l13f1cxl)

:::note
참고로 이벤트 핸들러는 기존 요소에 대해서만 추가될 수 있습니다. 따라서 Gantt 초기화 후에 이벤트 핸들러를 추가해야 하며, 그렇지 않으면 작동하지 않습니다. 왜냐하면 요소가 아직 생성되지 않았기 때문입니다.
:::

## 드래그 앤 드롭으로 작업 만들기

타임라인에서 비어 있는 위치를 클릭하여 작업의 시작 날짜를 설정하고 오른쪽으로 드래그하여 기간을 설정하면 드래그 앤 드롭으로 작업을 만들 수 있습니다.

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


## 미정렬된 작업의 시간 설정

The **click_drag** extension allows setting time for [unscheduled tasks](guides/unscheduled-tasks.md) with drag-n-drop.

## 드래그 앤 드롭으로 작업 선택하기

다양한 모드에서 드래그 앤 드롭으로 작업을 선택하는 것이 가능합니다: 날짜 안에서, 행 안에서, 또는 경계 안에서.

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


## 드래그 앤 드롭으로 분할 작업의 일부 만들기

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::
또한 드래그 앤 드롭으로 [split tasks](guides/split-tasks.md)의 일부를 만들 수 있습니다. 

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