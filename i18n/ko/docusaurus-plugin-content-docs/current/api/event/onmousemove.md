---
sidebar_label: onMouseMove
title: onMouseMove event
description: "마우스가 gantt 컨테이너 위에서 움직일 때 발생합니다"
---

# onMouseMove

### Description

@short: 마우스가 gantt 컨테이너 위에서 움직일 때 발생합니다

@signature: onMouseMove: (id: string | number, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 마우스가 현재 위치한 작업의 ID
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onMouseMove", function (id, e){
    // 여기에 사용자 정의 로직을 작성하세요
});
~~~

### Details

이 이벤트는 **gantt.$root** 요소에 연결된 네이티브 [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event) 이벤트 리스너의 별칭 역할을 합니다.

이벤트 대상이 작업 요소의 일부인 경우, 작업의 id가 첫 번째 인수로 제공됩니다.
그렇지 않으면 첫 번째 인수는 null이 됩니다.


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
:::note

**Related example:** [마우스 커서 아래의 날짜-시간 가져오기](https://snippet.dhtmlx.com/3rn86wwq)

:::

### Related API
- [utils](api/other/utils.md)

### Related Guides
- [How-tos](guides/how-to.md#howtohaveaninfinitescrollinthetimeline)

