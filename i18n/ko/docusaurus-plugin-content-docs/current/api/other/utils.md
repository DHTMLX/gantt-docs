---
sidebar_label: utils
title: utils config
description: "다양한 헬퍼 모듈"
---

# utils

### Description

@short: 다양한 헬퍼 모듈들

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

현재 모듈은 DOM 연산용 헬퍼만 포함하고 있으며, **gantt.utils.dom**에서 사용할 수 있습니다.


~~~js
var domHelpers = gantt.utils.dom;
~~~

다음 메서드들을 가지고 있습니다:

- **getNodePosition (node): object** - 화면에 있는 요소의 위치를 `{x:number, y:number,width:number, height:number}` 형식의 객체로 반환합니다
  - **_node_** - (*HTMLElement*) - 검사될 DOM 요소

- **getRelativeEventPosition (e, node): object** - DOM 요소에 상대적인 마우스 좌표를 `{x:number, y:number}` 형식의 객체로 반환합니다
  - **_e_** - (*Event*) - 발생한 이벤트
  - **_node_** - (*HTMLElement*) - 검사될 DOM 요소


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

- **isChildOf (child, parent): boolean** - 첫 번째 인수로 제공된 노드가 두 번째 인수로 제공된 노드의 DOM 자식인지 여부를 반환합니다
  - **_child_** - (*HTMLElement*) - 검사될 자식 노드
  - **_parent_** - (*HTMLElement*) - 검사될 부모 노드

- **hasClass (node, className): boolean** - 제공된 `node`의 클래스 목록에 특정 CSS 클래스가 포함되어 있는지 여부를 반환합니다 
  - **_node_** - (*HTMLElement*) - 검사될 DOM 요소
  - **_className_** - (*string*) - 검사할 클래스 이름

- **closest (node, cssSelector): HTMLElement**> - 주어진 CSS 선택자와 일치하는 첫 번째 노드를 반환하며, 시작 노드는 `node`에서, 그 DOM 부모 가지로 올라가며 탐색합니다
  - **_node_** - (*HTMLElement*) - 검사될 DOM 요소
  - **_cssSelector_** - (*string*) - 대상 노드의 선택자

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