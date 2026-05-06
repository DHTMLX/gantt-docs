---
title: "그리드의 행 높이 조정" 
sidebar_label: "그리드의 행 높이 조정" 
---

# 그리드의 행 높이 조정

그리드의 개별 행 높이를 변경할 수 있습니다. 

dhtmlxGantt 라이브러리는 행 높이를 관리하는 두 가지 방법을 제공합니다:

- 필요한 작업 객체에 대해 행 높이와 작업 바의 높이를 모두 설정하는 방법;
- 그리드 행의 하단 경계를 끌어 조정하는 방법.

:::note
이 기능은 v7.1 이상에서 사용 가능합니다.
:::

## 행 높이 설정

필요에 따라 특정 행의 높이를 조정할 수 있습니다.

:::note
개별 행 높이는 현재 [정적 배경 렌더링](api/config/static_background.md)과 호환되지 않습니다.
:::

![row_height](/img/row_height.png)

이를 위해 데이터 세트에서 작업 객체의 **row_height** 및 **bar_height** 속성을 재정의해야 합니다: 

**데이터 세트에서 작업의 유형 지정**
~~~js
gantt.parse({
    data: [
        { id: 11, text: "Project #1", type: "project", progress: 0.6, open: true, 
            row_height: 70, bar_height: 60 }, /*!*/
        { id: 12, text: "Task #1", start_date: "03-04-2018", duration: "5", 
            parent: "11", progress: 1, open: true },
        { id: 13, text: "Task #2", start_date: "03-04-2018", type: "project", 
            parent: "11", progress: 0.5, open: true }
    ],
    links: []
});
~~~ 

또는 동적으로 구현할 수 있습니다:

~~~js
gantt.getTask(11).row_height = 50;
gantt.getTask(11).bar_height = 25;
// 변경 사항을 반영하기 위해 Gantt 재렌더링
gantt.render();
~~~

**row_height** 및 **bar_height** 속성이 작업 객체에 지정되지 않거나 비어 있는 경우(기본 상태)에는 [gantt.config.row_height](api/config/row_height.md)와 [gantt.config.bar_height](api/config/bar_height.md)의 값이 사용됩니다.

## 드래그 앤 드롭으로 행 크기 조정

![resize_row](/img/resize_row.png)

그리드에서 행의 하단 경계를 드래그하여 행을 조정하는 기능을 사용자에게 제공하려면 [gantt.config.resize_rows](api/config/resize_rows.md) 옵션을 *true*로 설정하세요:

~~~js
gantt.config.resize_rows = true;
~~~

[Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

[gantt.config.min_task_grid_row_height](api/config/min_task_grid_row_height.md) 옵션은 크기 조정 중에 태스크에 대해 설정할 수 있는 최소 행 높이를 정의하는 기능을 제공합니다:

~~~js
gantt.config.min_task_grid_row_height = 45;
~~~

### 이벤트

드래그 앤 드롭으로 행 높이를 조정하는 동작을 처리하기 위해 사용할 수 있는 4개의 이벤트가 있습니다:

- [onBeforeRowResize](api/event/onbeforerowresize.md) - 사용자가 드래그 앤 드롭으로 행 높이 조정을 시작하기 전에 실행됩니다
- [onRowResize](api/event/onrowresize.md) - 사용자가 행의 경계를 드래그하여 행 높이를 조정할 때 실행됩니다
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md) - 행 높이 조정이 완료되기 전에 실행됩니다
- [onAfterRowResize](api/event/onafterrowresize.md) - 행 높이 조정이 완료된 후 실행됩니다