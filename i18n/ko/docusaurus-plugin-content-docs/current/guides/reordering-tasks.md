---
title: "작업 재정렬"
sidebar_label: "작업 재정렬"
---

# 작업 재정렬

dhtmlxGantt는 그리드에서 작업을 재정렬하는 2가지 방법을 제공합니다:

1. 드래그 앤 드롭.
2. 정렬(자세한 내용은 [details](guides/sorting.md)을 참조).

두 방법은 서로 대안적입니다. 기본적으로 두 모드 모두 비활성화되어 있습니다.

드래그-앤-드롭 재정렬을 활성화하려면 [order_branch](api/config/order_branch.md) 옵션을 사용하세요: 

~~~js
gantt.config.order_branch = true;
gantt.init("gantt_here");
~~~

[브랜치 정렬](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

그리드에서 작업을 정렬하고 재배치하는 방법을 보여주는 비디오 가이드를 확인해 보세요.

<iframe width="676" height="400" src="https://www.youtube.com/embed/srtb3nYOb-E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 전체 Gantt 구조 내의 드래그 앤 드롭

The [order_branch](api/config/order_branch.md) 옵션은 같은 트리 레벨 내에서 작업을 드래그할 수 있게 해줍니다.

전체 Gantt 내에서 작업을 재정렬할 수 있는 모드를 활성화하는 것도 가능합니다. 이는 한 작업이 어떤 트리 레벨의 다른 작업으로 교체될 수 있음을 의미합니다.
이 유형의 작업 재정렬을 사용하려면 [order_branch_free](api/config/order_branch_free.md) 옵션을 사용하세요:

~~~js
// 전체 gantt 내에서의 재정렬
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

gantt.init("gantt_here");
~~~

[그리드에서 행 드래그-드롭](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)

## 특정 위치로의 드롭 거부{#denyingdroppingtospecificpositions}

특정 위치로의 드롭을 거부하려면 [onBeforeTaskMove](api/event/onbeforetaskmove.md) 또는 [onBeforeRowDragEnd](api/event/onbeforerowdragend.md) 이벤트를 사용하세요:

~~~js
//다른 서브 브랜치로 이동 방지:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});

//또는
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
      var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

## 대용량 데이터셋의 성능 개선

もし 당신의 Gantt에 많은 작업이 포함되어 있다면, 기본 모드의 브랜치 재정렬은 성능을 저하시킬 수 있습니다.
속도를 높이려면 "marker" 모드를 사용할 수 있습니다.

~~~js
gantt.config.order_branch = "marker";
~~~

[브랜치 정렬 - 하이라이팅 모드](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html)

이 모드에서는 이름만 재정렬되고(왼쪽 마우스 버튼을 길게 누르고 있음) 작업이 대상 위치에 드롭될 때만 Gantt가 다시 렌더링됩니다(키를 놓을 때).
기본 모드와 달리 작업 위치 변경은 onBeforeTaskMove/onAfterTaskMove 이벤트를 발생시키지 않습니다.

특정 위치에 작업이 드롭되는 것을 방지하려면 대신 (이벤트는 오직 "marker" 모드에서 작동합니다) [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) 이벤트를 사용하세요.

## 드래그-앤-드롭 중 사용 가능한 드롭 위치 하이라이트

드래그 중에 사용 가능한 대상 위치를 하이라이트하려면(예: 루트 노드를 다른 루트 아래로 드래그하는 것은 불가능하며 이를 시각적으로 사용자에게 알리고 싶을 때), [onRowDragStart](api/event/onrowdragstart.md) 및 [onRowDragEnd](api/event/onrowdragend.md) 이벤트를 사용하세요:

~~~js
gantt.config.order_branch = true;// order tasks only inside a branch
gantt.init("gantt_here");
gantt.parse(demo_tasks);

var drag_id = null;
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    drag_id = id;
    return true;
});
gantt.attachEvent("onRowDragEnd", function(id, target) {
    drag_id = null;
    gantt.render();
});

gantt.templates.grid_row_class = function(start, end, task){
    if(drag_id && task.id != drag_id){
        if(task.$level != gantt.getTask(drag_id).$level)
            return "cant-drop";
        }
    return "";
};
~~~

## 타임라인에서 작업을 수직으로 재배치하기

타임라인에서 작업을 수직으로 재배치하는 방법에 대한 예제는 [How to vertically reorder tasks in the timeline](guides/how-to.md#how-to-vertically-reorder-tasks-in-the-timeline) 섹션의 예제를 참고하세요.