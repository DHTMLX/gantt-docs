---
sidebar_label: reorder_grid_columns
title: reorder_grid_columns 구성
description: "드래그 앤 드롭으로 그리드 열의 순서를 재정렬하는 기능을 활성화합니다"
---

# reorder_grid_columns

### Description

@short: 드래그 앤 드롭으로 그리드 열의 순서를 재정렬하는 기능을 활성화합니다

@signature: reorder_grid_columns: boolean

### Example

~~~jsx
gantt.config.reorder_grid_columns = true;
gantt.init("gantt_here");
~~~

**기본값:** false

### Related samples
- [작업 및 자재 리소스](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

이 기능은 그리드 뷰와 리소스 뷰 모두에서 작동합니다.

속성은 두 가지 CSS 클래스를 제공합니다:

- **.gantt_column_drag_marker** - 드래그된 열이 배치될 위치를 지정하는 마커의 CSS 클래스
- **.gantt_grid_head_cell_dragged** - 드래그된 열의 CSS 클래스

## Events

그리드 열이 드래그 및 드롭되는 동안의 동작은 그리드의 내부 이벤트를 통해 처리할 수 있습니다: **onBeforeColumnDragStart**, **onAfterColumnReorder**, 및 **onColumnDragMove**. 예를 들면:

snippets "onBeforeColumnDragStart"/"onColumnDragMove":
~~~js 
gantt.attachEvent("onGanttReady", function(){
      var grid = gantt.$ui.getView("grid");
      grid.attachEvent("onBeforeColumnDragStart", function(column, index){
        // 커스텀 코드
        return true; // 열 드래깅을 취소하려면 false를 반환
      });
      grid.attachEvent("onColumnDragMove",function(
          dragColumn, targetColumn, dragIndex, targetIndex){
        // 커스텀 코드
        return true; // 이 위치로 재정렬을 취소하려면 false를 반환
      });
});
~~~

그리고 스니펫 "onBeforeColumnDragStart"/"onAfterColumnReorder":
~~~js 
gantt.attachEvent("onGanttReady", function(){
      var grid = gantt.$ui.getView("grid");
      grid.attachEvent("onBeforeColumnDragStart", function(column, index){
        if(column.draggedColumn.name == "text"){
              return false;
        }
        return true;
     });
      grid.attachEvent("onAfterColumnReorder", function(object){
        // 재정렬 후 열의 구성 가져오기
        console.log(object)
      });
});
~~~