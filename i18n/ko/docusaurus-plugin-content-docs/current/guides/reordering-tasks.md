---
title: "작업 순서 변경하기"
sidebar_label: "작업 순서 변경하기"
---

# 작업 순서 변경하기  


dhtmlxGantt에서는 그리드에서 작업의 순서를 변경하는 두 가지 방법을 제공합니다:

1. 드래그 앤 드롭
2. 정렬 (자세한 내용은 [여기](guides/sorting.md)를 참고하세요)

이 두 방법은 서로 동시에 사용할 수 없습니다. 기본적으로 두 옵션 모두 비활성화되어 있습니다.

드래그 앤 드롭을 통한 순서 변경을 활성화하려면 [order_branch](api/config/order_branch.md) 옵션을 설정하세요:

~~~js
gantt.config.order_branch = true;
gantt.init("gantt_here");
~~~


[Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)


그리드에서 작업을 정렬하고 순서를 변경하는 방법을 보여주는 동영상 튜토리얼도 있습니다.

<iframe width="676" height="400" src="https://www.youtube.com/embed/srtb3nYOb-E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 전체 Gantt 구조에서 드래그 앤 드롭 {#dragndropwithinthewholeganttstructure}


[order_branch](api/config/order_branch.md) 옵션을 사용하면 동일한 트리 레벨 내에서만 작업을 드래그할 수 있습니다.

하지만, Gantt 내 어디서든 작업의 순서를 변경할 수 있는 모드를 활성화하는 것도 가능합니다. 이 모드를 사용하면 작업이 어떤 트리 레벨에서도 다른 작업을 대체할 수 있습니다. 이를 활성화하려면 [order_branch_free](api/config/order_branch_free.md) 옵션을 사용하세요:

~~~js
// 전체 gantt에서 작업 순서 변경
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

gantt.init("gantt_here");
~~~


[Drag and drop rows in Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)


## 드롭 위치 제한하기 {#denyingdroppingtospecificpositions}


특정 위치에 작업이 드롭되는 것을 방지하려면 [onBeforeTaskMove](api/event/onbeforetaskmove.md) 또는 [onBeforeRowDragEnd](api/event/onbeforerowdragend.md) 이벤트를 사용하세요:

~~~js
// 다른 하위 브랜치로 이동 방지:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});

// 또는
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

## 대용량 데이터셋에서 성능 개선하기 {#improvingperformanceforlargedatasets}


작업이 많은 경우, 기본 브랜치 순서 변경 모드는 성능 저하를 유발할 수 있습니다. 이럴 때는 "marker" 모드를 사용할 수 있습니다.

~~~js
gantt.config.order_branch = "marker";
~~~


[Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html)


이 모드에서는 마우스 왼쪽 버튼을 누르고 있을 때 작업 이름만 이동하며, 작업을 드롭할 때만 Gantt 차트가 다시 렌더링됩니다. 기본 모드와 달리, 작업 위치 변경 시 onBeforeTaskMove 또는 onAfterTaskMove 이벤트가 발생하지 않습니다.

이 모드에서 특정 위치에 작업 드롭을 제한하려면 [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) 이벤트를 사용하세요 ("marker" 모드에서만 동작합니다).

## 드래그 앤 드롭 중 드롭 가능한 위치 강조하기 {#highlightingavailabledropplaceswhiledragampdrop}


드래그 중에 유효한 드롭 위치를 시각적으로 표시하려면(예: 루트 노드를 다른 루트 노드 아래로 드래그하는 것을 방지), [onRowDragStart](api/event/onrowdragstart.md) 및 [onRowDragEnd](api/event/onrowdragend.md) 이벤트를 사용하세요:

~~~js
gantt.config.order_branch = true; // 브랜치 내에서만 작업 순서 변경
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

## 타임라인에서 작업을 수직으로 순서 변경하기 {#reorderingtasksverticallyinthetimeline}


타임라인에서 작업을 수직으로 순서 변경하는 방법은 [How to vertically reorder tasks in the timeline](guides/how-to.md#howtoverticallyreordertasksinthetimeline) 섹션의 예제를 참고하세요.

