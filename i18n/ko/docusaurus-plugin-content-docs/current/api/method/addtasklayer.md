---
sidebar_label: addTaskLayer
title: addTaskLayer method
description: "타임라인 영역에 작업에 대한 사용자 정의 요소를 표시하는 추가 레이어를 보여줍니다"
---

# addTaskLayer

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### Description

@short: 타임라인 영역에서 작업에 대한 커스텀 엘리먼트를 포함한 추가 레이어를 표시합니다

@signature: addTaskLayer: (func: AdditionalTaskLayer['TaskLayerRender'] | AdditionalTaskLayer['TaskLayerConfig']) =\> string

### Parameters

- `func` - (required) *TaskLayerRender | TaskLayerConfig* -        렌더링 함수 또는 구성 객체

### Returns
- ` layerId` - (string) - 레이어에 표시될 DOM 요소

### Example

~~~jsx
gantt.init("gantt_here");

gantt.addTaskLayer((task) => {
  if (task.deadline) {
    const el = document.createElement("div");
    el.className = "deadline";

    const sizes = gantt.getTaskPosition(task, task.deadline);
    el.style.left = `${sizes.left}px`;
    el.style.top = `${sizes.top}px`;

    el.setAttribute("title", gantt.templates.task_date(task.deadline));
    return el;
  }
  return false;
});
~~~

### Details

인수는 다음 유형 중 하나일 수 있습니다:


- **taskLayerRender (task, timeline, config, viewport): HTMLElement|boolean|void** - 이 함수는 Task 객체를 매개변수로 받아 레이어에 표시될 DOM 요소를 반환해야 합니다.
    - **_task_** - (*Task*) - 태스크 객체
    - **_timeline?_** - (*any*) - 타임라인 뷰
    - **_config?_** - (*GanttConfigOptions*) - Gantt 구성 객체
    - **_viewport?_** - (*LayerViewport*) - 뷰포트 객체

- **taskLayerConfig** - (*object*) - 추가 작업 레이어의 구성 객체. 다음 속성을 가집니다:
    - **_id?_** - (*string | number*) - 선택적, 레이어 ID
    - **_renderer_** - (*object*) - 필수, 레이어의 요소 렌더링에 대한 응답을 하는 함수
        - **_render_** - (*TaskLayerRender*) - 렌더링되어야 하는 HTML 요소를 반환하는 함수
        - **_update?_** - (*Function*): void - 선택적, 렌더링된 HTML 요소를 업데이트할 수 있는 함수
            - **_task_** - (*Task*) - 작업 객체
            - **_node_** - (*HTMLElement*) - 렌더링된 노드 컨테이너
            - **_timeline?_** - (*any*) - 타임라인 뷰
            - **_config?_** - (*GanttConfigOptions*) - Gantt 구성 객체
            - **_viewport?_** - (*LayerViewport*) - 뷰포트 객체
        - **_onrender?_** - (*Function*): void - 선택적, 렌더링이 완료된 후 호출되는 함수. 예를 들어 네이티브 컴포넌트를 렌더링하는 데 사용할 수 있습니다(예: ReactDOM.render)
            - **_task_** - (*Task*) - 작업 객체
            - **_node_** - (*HTMLElement*) - 렌더링된 노드 컨테이너
            - **_view?_** - (*any*) - 레이어가 추가된 레이아웃 셀(기본적으로 타임라인)
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - 선택적, 뷰포트 사각형의 좌표를 반환하는 함수
            - **_task_** - (*Task*) - 작업 객체
            - **_view?_** - (*any*) - 레이어가 추가된 레이아웃 셀(타임라인, 기본값)
            - **_config?_** - (*GanttConfigOptions*) - Gantt 구성 객체
            - **_gantt?_** - (*GanttStatic*) - Gantt 객체
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - 현재 보이는 범위의 인덱스 객체를 반환하는 함수
            - **_gantt?_** - (*GanttStatic*) - Gantt 객체
            - **_view?_** - (*any*) - 레이어가 추가된 레이아웃 셀(타임라인, 기본값)
            - **_config?_** - (*GanttConfigOptions*) - Gantt 구성 객체
            - **_datastore?_** - (*any*) - 작업 데이터스토어 객체
            - **_viewport?_** - (*LayerViewport*) - 뷰포트 객체
    - **_container?_** - (*HTMLElement*) - 선택적, 레이어의 컨테이너
    - **_topmost?_** - (*boolean*) - 선택적, true인 경우 요소가 작업 위에 표시됩니다
    - **_filter?_** - (*Function*): boolean - 선택적, 작업 객체를 매개변수로 받는 함수. false를 반환하면 'renderer' 함수가 해당 작업에 대해 호출되지 않습니다
        - **_task_** - (*Task*) - 작업 객체

  
레이어 뷰포트에는 다음 속성이 있습니다:

- **viewport** -  (*object*) - 레이어 뷰포트 객체
    - **_x_** - (*number*) - 왼쪽 사각형 위치
    - **_x_end_** - (*number*) - 오른쪽 사각형 위치
    - **_y_** - (*number*) - 위쪽 사각형 위치
    - **_y_end_** - (*number*) - 아래쪽 사각형 위치
    - **_width_** - (*number*) - 사각형 너비
    - **_height_** - (*number*) - 사각형 높이


- 주의: 커스텀 레이어는 다음 gantt.init 호출 후에 재설정됩니다
- [gantt.resetLayout()](api/method/resetlayout.md) 메서드를 호출하면 커스텀 레이어도 재설정됩니다. 페이지에 커스텀 레이어를 표시하려면 resetlayout.md를 호출한 후 **gantt.addTaskLayer** 메서드를 다시 정의해야 합니다.

## 사용자 정의 레이어의 스마트 렌더링

[Smart rendering](guides/performance.md#smart-rendering) 은 사용자가 현재 볼 수 있는 HTML 요소만 표시하려고 시도하고 수평 및 수직 스크롤 바 아래에 숨겨지지 않도록 합니다.

다만 [커스텀 레이어](guides/baselines.md)의 경우, Gantt 는 커스텀 요소가 위치한 곳을 알 수 없으므로 커스텀 렌더링 함수 구현에 따라 달라집니다.

해결책으로 스마트 렌더링은 커스텀 엘리먼트가 관련 작업과 같은 행에 위치한다고 가정합니다. 커스텀 엘리먼트는 관련 작업의 행이 화면에 렌더링될 때 페이지 마크업에 추가됩니다. 이 모드에서 Gantt 는 수평 스크롤 바의 위치를 고려하지 않으며, 커스텀 엘리먼트가 마크업에 렌더링되지만 수평 스크롤로 인해 화면에 보이지 않을 수 있습니다.

대부분의 경우 충분하지만, 레이어가 많다면 커스텀 엘리먼트의 위치 정보를 Gantt 에 제공하여 렌더링을 조금 더 최적화할 수 있습니다.


이를 위해서는 addTaskLayer() 메서드의 *object* 매개변수를 사용하고, **renderer** 객체에 다음 메서드를 제공해야 합니다:

- **render** - 렌더링 함수
- **getRectangle** - 커스텀 요소의 좌표를 반환하는 좌표 객체를 반환하는 함수

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task, timeline, viewport) => {
      // ...
      return /* HTMLElement */;
    },
    getRectangle: (task, view) => {
      // ...
      return { left, top, height, width };
    }
  }
});
~~~

커스텀 요소 렌더링 로직은 다음과 같습니다:

1. 수평 스크롤의 위치가 바뀌면 스마트 렌더링은 화면에 현재 보이는 영역의 새로운 좌표를 얻습니다.
2. dhtmlxGantt 은 각 작업/링크에 대해 getRectangle 함수를 호출하여 커스텀 엘리먼트의 정확한 좌표를 얻습니다.
3. getRectangle 함수가 null 값을 반환하면 render 함수가 호출되지 않고 커스텀 엘리먼트가 표시되지 않습니다.
4. getRectangle 함수가 작업/링크의 좌표를 포함하는 객체를 반환하고 그 좌표가 현재 뷰포트에 들어오면 render 함수가 호출되어 작업/링크를 표시합니다.

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task) => {
      if (task.planned_start && task.planned_end) {
        const sizes = gantt.getTaskPosition(
          task,
          task.planned_start,
          task.planned_end
        );
        const el = document.createElement('div');
        el.className = 'baseline';
        el.style.left = sizes.left + 'px';
        el.style.width = sizes.width + 'px';
        el.style.top = (sizes.top + gantt.config.task_height + 13) + 'px';
        return el;
      }
      return false;
    },
    // 스마트 렌더링과의 연결을 위해 getRectangle 정의
    getRectangle: (task, view) =>
      gantt.getTaskPosition(
        task,
        task.planned_start,
        task.planned_end
      )
  }
});
~~~

## 사용자 정의 요소의 보이는 부분 렌더링

*addTaskLayer()*의 **renderer** 객체는 **update** 메서드를 통해 사용자 정의 요소의 노드 마크업을 현재 보이는 부분만 표시하도록 업데이트할 수 있습니다:

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task, timeline, viewport) => {
      // ...
      return /* HTMLElement */;
    },
    update: (task, node, timeline, viewport) => {
      // ...
      // put the currently visible part of the element into node inner html
    },
    getRectangle: (task, view) => {
      // ...
      return { left, top, height, width };
    }
  }
});
~~~

- **update** - 커스텀 엘리먼트의 inner HTML을 업데이트할 수 있으며, 보이지 않는 셀은 숨기고 보이는 셀만 표시합니다

**update** 메서드는 [onGanttScroll](api/event/onganttscroll.md) 이벤트 후에 호출되며, **render**가 생성한 작업 노드와 현재 뷰포트를 제공합니다.

## 보이는 작업 행 렌더링

v7.1.8부터 **renderer** 객체는 작업 행의 보이는 범위를 지정하는 **getVisibleRange** 함수를 지원합니다:

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task, timeline, viewport) => {
      // ...
      return /* HTMLElement */;
    },
    getVisibleRange: () => {
      // ...
      return {
        start: indexStart,
        end: indexEnd
      };
    }
  }
});     
~~~

- **getVisibleRange** - 보이는 작업 행의 시작 인덱스와 끝 인덱스를 포함하는 객체를 반환하는 함수입니다. 
작업이 지정된 범위를 벗어나면 해당 작업에 대해 추가 레이어가 렌더링되지 않습니다. 

만약 **getVisibleRange** 함수가 객체 대신 *false*를 반환하면, Gantt 는 모든 작업 범위를 사용한다고 가정하고 보이지 않는 작업이라도 추가 레이어가 렌더링될 수 있습니다.

## 요소 렌더 콜백

**renderer** 객체에는 **onrender** 콜백도 포함됩니다:

~~~js
gantt.addTaskLayer({
  renderer: {
    render: (task, timeline, viewport) => {
      // ...
      return /* HTMLElement */;
    },
    onrender: (item, node, view) => {
      console.log("render", item, node);
    }
  }
});
~~~

**onrender** 함수는 데이터 항목이 DOM에 렌더링될 때마다 호출됩니다. 데이터 항목, 결과 DOM 요소, 렌더링을 트리거한 뷰(grid 또는 timeline)에 접근할 수 있습니다.

이 콜백은 렌더링 후 DOM 요소를 수정하거나 렌더링된 요소 내에 서드파티 위젯을 초기화하는 데 사용할 수 있습니다.

### Related API
- [getTaskPosition](api/method/gettaskposition.md)
- [removeTaskLayer](api/method/removetasklayer.md)
- [layer_attribute](api/config/layer_attribute.md)

### Related Guides
- [타임라인 영역의 커스텀 요소](guides/baselines.md)
- [How-tos](guides/how-to.md#howtoverticallyreordertasksinthetimeline) (타임라인에서 작업을 수직으로 재정렬하는 방법 설명)

