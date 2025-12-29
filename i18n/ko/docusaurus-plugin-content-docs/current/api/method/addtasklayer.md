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

@short: 타임라인 영역에 작업에 대한 사용자 정의 요소를 표시하는 추가 레이어를 보여줍니다

@signature: addTaskLayer: (func: AdditionalTaskLayer['TaskLayerRender'] | AdditionalTaskLayer['TaskLayerConfig']) =\> string

### Parameters

- `func` - (required) *TaskLayerRender | TaskLayerConfig* -        렌더링 함수 또는 구성 객체

### Returns
- ` layerId` - (string) - 레이어에 표시될 DOM 요소

### Example

~~~jsx
gantt.init("gantt_here");
gantt.addTaskLayer(function draw_deadline(task) {
    if (task.deadline) {
        var el = document.createElement('div');
        el.className = 'deadline';
        var sizes = gantt.getTaskPosition(task, task.deadline);

        el.style.left = sizes.left + 'px';
        el.style.top = sizes.top + 'px';

        el.setAttribute('title', gantt.templates.task_date(task.deadline));
        return el;
    }
    return false;
});
~~~

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

인수는 다음 유형 중 하나일 수 있습니다:


- **taskLayerRender (task, timeline, config, viewport): HTMLElement|boolean|void** - 작업 객체를 받아 레이어에 표시할 DOM 요소를 반환하는 함수입니다.
    - **_task_** - (*Task*) - 작업 객체
    - **_timeline?_** - (*any*) - 타임라인 뷰
    - **_config?_** - (*GanttConfigOptions*) - 간트 구성 객체
    - **_viewport?_** - (*LayerViewport*) - 뷰포트 객체

- **taskLayerConfig** - (*object*) - 추가 작업 레이어를 위한 구성 객체로, 다음을 포함합니다:
    - **_id?_** - (*string | number*) - 선택적 레이어 ID
    - **_renderer_** - (*object*) - 필수, 레이어 요소 렌더링을 담당하는 객체
        - **_render_** - (*TaskLayerRender*) - 렌더링할 HTML 요소를 반환하는 함수
        - **_update?_** - (*Function*): void - 선택적, 렌더링된 HTML 요소를 업데이트하는 함수
            - **_task_** - (*Task*) - 작업 객체
            - **_node_** - (*HTMLElement*) - 렌더링된 노드의 컨테이너
            - **_timeline?_** - (*any*) - 타임라인 뷰
            - **_config?_** - (*GanttConfigOptions*) - 간트 구성 객체
            - **_viewport?_** - (*LayerViewport*) - 뷰포트 객체
        - **_onrender?_** - (*Function*): void - 선택적, 렌더링 완료 후 호출되며 네이티브 컴포넌트 렌더링에 유용 (예: `ReactDOM.render` 사용 시)
            - **_task_** - (*Task*) - 작업 객체
            - **_node_** - (*HTMLElement*) - 렌더링된 노드의 컨테이너
            - **_view?_** - (*any*) - 레이어가 추가된 레이아웃 셀 (기본값은 타임라인)
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - 선택적, 뷰포트 사각형 좌표를 반환
            - **_task_** - (*Task*) - 작업 객체
            - **_view?_** - (*any*) - 레이어가 추가된 레이아웃 셀 (기본값은 타임라인)
            - **_config?_** - (*GanttConfigOptions*) - 간트 구성 객체
            - **_gantt?_** - (*GanttStatic*) - 간트 객체
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - 선택적, 가시 범위 객체 반환
            - **_gantt?_** - (*GanttStatic*) - 간트 객체
            - **_view?_** - (*any*) - 레이어가 추가된 레이아웃 셀 (기본값은 타임라인)
            - **_config?_** - (*GanttConfigOptions*) - 간트 구성 객체
            - **_datastore?_** - (*any*) - 작업 데이터 저장소 객체
            - **_viewport?_** - (*LayerViewport*) - 뷰포트 객체
    - **_container?_** - (*HTMLElement*) - 선택적, 레이어의 컨테이너 요소
    - **_topmost?_** - (*boolean*) - 선택적, true일 경우 요소가 작업 위에 표시됨
    - **_filter?_** - (*Function*): boolean - 선택적, 작업 객체를 받아 false를 반환하면 해당 작업에 대해 렌더링을 건너뜀
        - **_task_** - (*Task*) - 작업 객체

  
레이어 뷰포트는 다음 속성을 포함합니다:

- **viewport** -  (*object*) - 레이어의 뷰포트 객체
    - **_x_** - (*number*) - 사각형의 왼쪽 위치
    - **_x_end_** - (*number*) - 사각형의 오른쪽 위치
    - **_y_** - (*number*) - 사각형의 위쪽 위치
    - **_y_end_** - (*number*) - 사각형의 아래쪽 위치
    - **_width_** - (*number*) - 사각형의 너비
    - **_height_** - (*number*) - 사각형의 높이


- 사용자 정의 레이어는 다음 [gantt.init](api/method/init.md) 호출 후에 지워집니다.
- 또한 [gantt.resetLayout()](api/method/resetlayout.md)를 호출하면 사용자 정의 레이어가 초기화됩니다. 사용자 정의 레이어를 계속 보이게 하려면 [resetLayout](api/method/resetlayout.md) 호출 후에 **gantt.addTaskLayer**를 다시 정의해야 합니다.

## 사용자 정의 레이어의 스마트 렌더링

[스마트 렌더링](guides/performance.md#smartrendering)은 사용자에게 보이는 HTML 요소만 표시하여 스크롤바 뒤에 숨겨진 요소를 렌더링하지 않도록 합니다.

하지만 [사용자 정의 레이어](guides/baselines.md)의 경우, 렌더링 로직이 완전히 사용자에게 맡겨져 있어 Gantt가 사용자 정의 요소의 위치를 기본적으로 알지 못합니다.

이를 해결하기 위해 스마트 렌더링은 사용자 정의 요소가 관련 작업과 같은 행에 있다고 가정합니다. 사용자 정의 요소는 작업 행이 화면에 보일 때만 DOM에 추가됩니다. 이 방식은 수평 스크롤바 위치를 무시하므로, 사용자 정의 요소가 마크업에는 존재하지만 수평으로 스크롤되어 페이지에 보이지 않을 수 있습니다.

대부분 잘 작동하지만, 레이어가 많을 경우 사용자 정의 요소의 정확한 위치를 Gantt에 제공하여 렌더링을 최적화할 수 있습니다.


이렇게 하려면 *addTaskLayer()* 메서드의 *object* 매개변수를 사용하고 **renderer** 객체에 다음 메서드를 제공합니다:

- **render** - 렌더링 함수
- **getRectangle** - 사용자 정의 요소의 좌표를 반환하는 함수

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        getRectangle: function(task, view){
            ....
            return {left, top, height, width};
        }
    }
});
~~~

사용자 정의 요소의 렌더링 과정은 다음과 같습니다:

1\. 수평 스크롤 위치가 변경되면, 스마트 렌더링은 현재 보이는 영역의 좌표를 가져옵니다. <br>
2\. dhtmlxGantt는 각 작업/링크에 대해 **getRectangle**을 호출하여 사용자 정의 요소의 정확한 좌표를 얻습니다. <br>
3\. **getRectangle**이 null을 반환하면, **render** 함수는 건너뛰어지고 사용자 정의 요소가 표시되지 않습니다.<br>
4\. **getRectangle**이 현재 뷰포트와 겹치는 좌표를 반환하면, **render** 함수가 호출되어 사용자 정의 요소를 표시합니다.<br>

~~~js
gantt.addTaskLayer({
    renderer: {
      render: function draw_planned(task) {
        if (task.planned_start && task.planned_end) {
          var sizes = gantt.getTaskPosition(task,task.planned_start,task.planned_end);
          var el = document.createElement('div');
          el.className = 'baseline';
          el.style.left = sizes.left + 'px';
          el.style.width = sizes.width + 'px';
          el.style.top = sizes.top + gantt.config.task_height + 13 + 'px';
          return el;
        }
        return false;
      },
      // getRectangle 정의는 레이어를 스마트 렌더링에 연결합니다
      getRectangle: function(task, view){
        return gantt.getTaskPosition(task, task.planned_start, task.planned_end);
      }
    }
});
~~~

## 사용자 정의 요소의 보이는 부분 렌더링

*addTaskLayer()*의 **renderer** 객체는 **update** 메서드를 통해 사용자 정의 요소의 노드 마크업을 현재 보이는 부분만 표시하도록 업데이트할 수 있습니다:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        update: function(task, node, timeline, viewport){
            ...
            // 현재 보이는 부분만 표시하도록 노드의 inner HTML 업데이트
        },
        getRectangle: function(task, view){
            ....
            return {left, top, height, width};
        }
    }
});
~~~

- **update** - 사용자 정의 요소의 내부 HTML을 갱신하여, 예를 들어 보이지 않는 부분을 숨기고 보이는 부분만 보여줄 수 있습니다.

**update** 메서드는 [onGanttScroll](api/event/onganttscroll.md) 이벤트 후에 호출되며, **render**가 생성한 작업 노드와 현재 뷰포트를 제공합니다.

## 보이는 작업 행 렌더링

v7.1.8부터 **renderer** 객체는 작업 행의 보이는 범위를 지정하는 **getVisibleRange** 함수를 지원합니다:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        getVisibleRange: function(){
            ...
            return { 
                  start: indexStart,
                  end: indexEnd
            }
        }
    }
});     
~~~

- **getVisibleRange** - 보이는 작업 행의 시작과 끝 인덱스를 포함하는 객체를 반환합니다. 이 범위 밖의 작업에는 추가 레이어가 렌더링되지 않습니다.

**getVisibleRange**가 객체 대신 *false*를 반환하면, Gantt는 모든 작업이 보이는 것으로 간주하고 모든 작업에 대해 추가 레이어를 렌더링합니다.

## 요소 렌더 콜백

**renderer** 객체에는 **onrender** 콜백도 포함됩니다:

~~~js
gantt.addTaskLayer({
    renderer: {
        render: function(task, timeline, viewport){
            ...
            return  HTMLElement
        },
        onrender: function(item, node, view){
            console.log("render", item, node)
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

