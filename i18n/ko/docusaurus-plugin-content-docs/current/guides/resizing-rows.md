---
title: "그리드에서 행 크기 조정하기"
sidebar_label: "그리드에서 행 크기 조정하기"
---

# 그리드에서 행 크기 조정하기


그리드에서 개별 행의 높이를 조정할 수 있습니다. 


dhtmlxGantt 라이브러리는 행 높이를 제어하는 두 가지 방법을 제공합니다:

- 특정 task 객체에 대해 행 높이와 작업 바 높이 모두를 설정하는 방법
- 그리드 행의 하단 가장자리를 드래그하여 조정하는 방법

:::note
이 기능은 7.1 버전부터 사용할 수 있습니다.
:::

## 행 높이 설정하기 {#settingtherowheight}


필요에 따라 특정 행의 높이를 사용자 정의할 수 있습니다.

:::note
현재, 개별 행 높이는 [static background rendering](api/config/static_background.md)와 함께 사용할 수 없습니다.
:::

![row_height](/img/row_height.png)

이를 위해 데이터셋 내의 task 객체에서 **row_height** 및 **bar_height** 속성을 재정의하세요:  

**데이터셋에서 작업 유형 지정하기**
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

또는, 이 속성들을 동적으로 설정할 수도 있습니다:

~~~js
gantt.getTask(11).row_height = 50;
gantt.getTask(11).bar_height = 25;
// 변경 사항을 적용하려면 Gantt를 다시 렌더링하세요
gantt.render();
~~~

**row_height** 및 **bar_height** 속성이 없거나 비어 있는 경우(기본값), [gantt.config.row_height](api/config/row_height.md) 및 [gantt.config.bar_height](api/config/bar_height.md)의 값이 적용됩니다.

## 드래그 앤 드롭으로 행 크기 조정하기 {#resizingrowsbydraganddrop}


![resize_row](/img/resize_row.png)

사용자가 행의 하단 테두리를 드래그하여 행의 크기를 조정할 수 있도록 하려면 [gantt.config.resize_rows](api/config/resize_rows.md) 옵션을 활성화하세요:

~~~js
gantt.config.resize_rows = true;
~~~


[Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)


[gantt.config.min_task_grid_row_height](api/config/min_task_grid_row_height.md) 옵션을 통해 크기 조정 시 허용되는 최소 행 높이를 설정할 수 있습니다:

~~~js
gantt.config.min_task_grid_row_height = 45;
~~~

### 이벤트

드래그 앤 드롭을 통한 행 크기 조정을 관리할 수 있는 네 가지 이벤트가 있습니다:

- [onBeforeRowResize](api/event/onbeforerowresize.md) - 사용자가 행 크기 조정을 시작하기 전에 발생
- [onRowResize](api/event/onrowresize.md) - 사용자가 행 테두리를 드래그하여 크기를 조정하는 동안 발생
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md) - 크기 조정 작업이 최종 확정되기 직전에 발생
- [onAfterRowResize](api/event/onafterrowresize.md) - 행 크기 조정이 완료된 후에 발생

