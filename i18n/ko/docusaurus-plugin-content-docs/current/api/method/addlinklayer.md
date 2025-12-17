---
sidebar_label: addLinkLayer
title: addLinkLayer method
description: "타임라인 영역에 링크를 위한 커스텀 요소를 포함하는 추가 레이어를 표시합니다"
---

# addLinkLayer
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 타임라인 영역에 링크를 위한 커스텀 요소를 포함하는 추가 레이어를 표시합니다

@signature: addLinkLayer: (func: AdditionalLinkLayer['LinkLayerRender'] | AdditionalLinkLayer['LinkLayerConfig']) =\> string

### Parameters

- `func` - (required) *LinkLayerRender | LinkLayerConfig* -        렌더 함수 또는 구성 객체

### Returns
- ` layerId` - (string) - 표시될 레이어를 나타내는 DOM 요소

### Example

~~~jsx
gantt.attachEvent("onGanttReady", function () {
    const link_types = ["FS", "SS", "FF", "SF"]
    gantt.addLinkLayer(function (link) {
        const node = gantt.getLinkNode(link.id);
        if (node){
            const el = document.createElement('div');
            el.className = 'link_layer';
            el.style.left = (node.childNodes[2].offsetLeft + 20) + 'px'
            el.style.top = (node.childNodes[2].offsetTop - 6) + 'px'
            el.innerHTML = link_types[link.type];
            return el;
        }
        return false;
    });
});
~~~

### Details


인수는 다음 두 가지 유형 중 하나일 수 있습니다:

- **linkLayerRender (link, timeline, config, viewport): HTMLElement|boolean|void** - 링크 객체를 받아 레이어에 표시할 DOM 요소를 반환하는 함수입니다.
    - **_link_** - (*Link*) - 링크 객체
    - **_timeline?_** - (*any*) - 선택 사항, 타임라인 뷰
    - **_config?_** - (*GanttConfigOptions*) - 선택 사항, 간트 구성 객체
    - **_viewport?_** - (*LayerViewport*) - 선택 사항, 뷰포트 객체


- **linkLayerConfig** - (*object*) - 추가 링크 레이어를 위한 구성 객체이며, 다음 속성을 포함합니다:
    - **_id?_** - (*string | number*) - 선택 사항, 레이어 ID
    - **_renderer_** - (*object*) - 필수, 레이어 요소 렌더링을 담당하는 객체
        - **_render_** - (*LinkLayerRender*) - 렌더링할 HTML 요소를 반환하는 함수
        - **_update?_** - (*Function*): void - 선택 사항, 렌더링된 HTML 요소를 업데이트하는 함수
            - **_link_** - (*Link*) - 링크 객체
            - **_node_** - (*HTMLElement*) - 렌더링된 노드의 컨테이너
            - **_timeline?_** - (*any*) - 선택 사항, 타임라인 뷰
            - **_config?_** - (*GanttConfigOptions*) - 선택 사항, 간트 구성 객체
            - **_viewport?_** - (*LayerViewport*) - 선택 사항, 뷰포트 객체
        - **_onrender?_** - (*Function*): void - 선택 사항, 렌더링 완료 후 호출되며 네이티브 컴포넌트 렌더링에 유용합니다 (예: `ReactDOM.render` 사용 시)
            - **_link_** - (*Link*) - 링크 객체
            - **_node_** - (*HTMLElement*) - 렌더링된 노드의 컨테이너
            - **_view?_** - (*any*) - 선택 사항, 레이어가 추가된 레이아웃 셀 (기본값: timeline)
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - 선택 사항, 뷰포트 사각형 좌표 반환
            - **_link_** - (*Link*) - 링크 객체
            - **_view?_** - (*any*) - 선택 사항, 레이어가 추가된 레이아웃 셀 (기본값: timeline)
            - **_config?_** - (*GanttConfigOptions*) - 선택 사항, 간트 구성 객체
            - **_gantt?_** - (*GanttStatic*) - 선택 사항, 간트 인스턴스
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - 선택 사항, 보이는 범위 객체 반환
            - **_gantt?_** - (*GanttStatic*) - 선택 사항, 간트 인스턴스
            - **_view?_** - (*any*) - 선택 사항, 레이어가 추가된 레이아웃 셀 (기본값: timeline)
            - **_config?_** - (*GanttConfigOptions*) - 선택 사항, 간트 구성 객체
            - **_datastore?_** - (*any*) - 선택 사항, 링크 데이터스토어 객체
            - **_viewport?_** - (*LayerViewport*) - 선택 사항, 뷰포트 객체
    - **_container?_** - (*HTMLElement*) - 선택 사항, 레이어의 컨테이너 요소
    - **_topmost?_** - (*boolean*) - 선택 사항, true면 레이어 요소가 링크 위에 표시됩니다
    - **_filter?_** - (*Function*): boolean - 선택 사항, 링크 객체를 받아 false를 반환하면 해당 링크 렌더링을 건너뜁니다
        - **_link_** - (*Link*) - 링크 객체


- 커스텀 레이어는 [gantt.init](api/method/init.md)을 다시 호출하면 지워집니다  
- 또한 [gantt.resetLayout()](api/method/resetlayout.md)를 호출하면 커스텀 레이어가 초기화됩니다. 레이어를 계속 표시하려면 [resetLayout](api/method/resetlayout.md) 호출 후 **gantt.addLinkLayer**를 다시 적용해야 합니다.

:::note

**Related example:** [Gantt. 링크 타입을 가진 추가 레이어](https://snippet.dhtmlx.com/6mmt1nvw)

 
:::

### Related API
- [removeLinkLayer](api/method/removelinklayer.md)
- [addTaskLayer](api/method/addtasklayer.md)

