---
sidebar_label: utils
title: utils config
description: "다양한 헬퍼 모듈"
---

# utils

### Description

@short: 다양한 헬퍼 모듈

@signature: utils: \{ dom: DomHelpers \}

### Example

~~~jsx
var tooltips = gantt.ext.tooltips;
tooltips.tooltipFor({
    selector: ".gantt_scale_cell",
    html: function (event, node) {
        const domHelper = gantt.utils.dom;
        const pos = domHelper.getRelativeEventPosition(event, gantt.$task_scale);
        return gantt.templates.task_date(gantt.dateFromPos(pos.x));
}
});
~~~

### Details

현재 이 모듈은 주로 **gantt.utils.dom**을 통해 DOM 작업에 대한 헬퍼 기능을 제공합니다.


~~~js
var domHelpers = gantt.utils.dom;
~~~

다음과 같은 메서드를 제공합니다:

- **getNodePosition (node): object** - 화면 상에서 요소의 위치를 가져오며, `{x:number, y:number,width:number, height:number}` 형태의 객체를 반환합니다.
  - **_node_** - (*HTMLElement*) - 위치를 확인할 DOM 요소

- **getRelativeEventPosition (e, node): object** - 특정 DOM 요소를 기준으로 한 마우스 좌표를 `{x:number, y:number}` 형태로 반환합니다.
  - **_e_** - (*Event*) - 발생한 이벤트
  - **_node_** - (*HTMLElement*) - 기준이 되는 DOM 요소


~~~js
gantt.message({
    expire: -1,
    text: ""
});

const formatDate = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.attachEvent("onMouseMove", function (id, e){
    const helper = gantt.utils.dom;
    if(helper.isChildOf(e.target, gantt.$task_data)){
        const textContainer = document.querySelector("#pointer-date");
        const pos = helper.getRelativeEventPosition(e, gantt.$task_data);
        const pointerDate = gantt.dateFromPos(pos.x);
        textContainer.innerText = formatDate(pointerDate);
    }
});
~~~

- **isChildOf (child, parent): boolean** - 첫 번째 노드가 두 번째 노드의 DOM 자식인지 확인하며, 맞으면 `true`를 반환합니다.
  - **_child_** - (*HTMLElement*) - 확인할 자식 노드
  - **_parent_** - (*HTMLElement*) - 확인할 부모 노드

- **hasClass (node, className): boolean** - 주어진 `node`가 특정 CSS 클래스를 포함하는지 확인하며, 포함하면 `true`를 반환합니다.
  - **_node_** - (*HTMLElement*) - 확인할 DOM 요소
  - **_className_** - (*string*) - 찾을 CSS 클래스 이름

- **closest (node, cssSelector): HTMLElement** - 주어진 CSS 셀렉터와 일치하는 가장 가까운 조상 노드(자신 포함)를 찾습니다.
  - **_node_** - (*HTMLElement*) - 시작할 DOM 요소
  - **_cssSelector_** - (*string*) - 일치시킬 CSS 셀렉터

~~~js
gantt.attachEvent("onEmptyClick", function (e) {
  const domHelpers = gantt.utils.dom;
  if(!domHelpers.closest(e.target, `[${gantt.config.link_attribute}]`)){
    gantt.message("not a link");
  }else{
    gantt.message("link!"); 
  }
});
~~~

### Related samples
- [Custom Tooltips](https://docs.dhtmlx.com/gantt/samples/02_extensions/22_tooltip_api.html)
