---
sidebar_label: onMouseMove
title: onMouseMove 이벤트
description: "마우스가 gantt 컨테이너 위로 이동할 때 발생합니다"
---

# onMouseMove

### Description

@short: 마우스가 gantt 컨테이너 위로 움직일 때 발생합니다

@signature: onMouseMove: (id: string | number, e: Event) => void;

### Parameters

- `id` - (필수) *string | number* - 마우스가 올라간 작업의 ID
- `e` - (필수) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onMouseMove", function (id, e){
    // 여기에 코드 작성
});
~~~

### Details

이 이벤트는 네이티브 [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event) 이벤트 핸들러의 별칭으로, **gantt.$root** 요소에 연결된 네이티브 이벤트 핸들러입니다.

이벤트 대상이 작업 요소의 노드인 경우, 관련된 작업의 ID가 첫 번째 인수로 전달됩니다.
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
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline)