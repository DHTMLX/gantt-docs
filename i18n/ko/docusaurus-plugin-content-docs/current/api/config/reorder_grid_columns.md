---
sidebar_label: reorder_grid_columns
title: reorder_grid_columns config
description: "드래그 앤 드롭을 사용하여 그리드 컬럼의 순서를 변경할 수 있습니다."
---

# reorder_grid_columns

### Description

@short: 드래그 앤 드롭을 사용하여 그리드 컬럼의 순서를 변경할 수 있습니다.

@signature: reorder_grid_columns: boolean

### Example

~~~jsx
gantt.config.reorder_grid_columns = true;
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

이 기능은 그리드와 리소스 뷰 모두에서 작동합니다.

두 가지 CSS 클래스가 추가됩니다:

- **.gantt_column_drag_marker** - 드래그 중인 컬럼이 떨어질 위치를 표시합니다.
- **.gantt_grid_head_cell_dragged** - 현재 드래그 중인 컬럼에 적용됩니다.

## 이벤트

그리드 내부 이벤트를 통해 컬럼 드래그 및 드롭을 제어할 수 있습니다: **onBeforeColumnDragStart**, **onAfterColumnReorder**, 그리고 **onColumnDragMove**. 예를 들면:

~~~js
gantt.attachEvent("onGanttReady", function(){
      var grid = gantt.$ui.getView("grid");
      grid.attachEvent("onBeforeColumnDragStart", function(column, index){
        // 커스텀 코드
        return true; // false 반환 시 해당 컬럼 드래그 방지
      });
      grid.attachEvent("onColumnDragMove",function(
          dragColumn, targetColumn, dragIndex, targetIndex){
        // 커스텀 코드
        return true; // false 반환 시 이 위치로의 순서 변경 차단
      });
});
~~~

그리고

snippet "onBeforeColumnDragStart"/"onAfterColumnReorder" :
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
        // 순서 변경 후 컬럼 설정에 접근
        console.log(object)
      });
});
~~~
