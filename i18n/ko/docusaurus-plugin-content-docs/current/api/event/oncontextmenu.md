---
sidebar_label: onContextMenu
title: onContextMenu 이벤트
description: "Gantt 차트 안에서 사용자가 마우스 오른쪽 버튼을 클릭하면 발생합니다(세부 정보 참조)"
---

# onContextMenu

### Description

@short: Gantt 차트 안에서 사용자가 마우스 오른쪽 버튼을 클릭할 때 발생합니다(세부 정보 참조)

@signature: onContextMenu: (taskId: string | number, linkId: string | number, e: Event) =\> void;

### Parameters

- `taskId` - (필수) *string | number* - 작업 ID
- `linkId` - (필수) *string | number* - 연결 ID
- `e` - (필수) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
    const element = event.target;
    console.log("You've clicked on the ", element)
    return true;
});
~~~

### Related samples
- [Context menu to control tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/10_context_menu.html)

### Details

Gantt 차트에서 오른쪽 클릭은 다른 조건이 없으면 기본 브라우저 컨텍스트 메뉴를 열 수 있습니다.
다음 예제에서 작업을 클릭하면 [DHTMLX 컨텍스트 메뉴](https://docs.dhtmlx.com/menu__index.html)가 표시되고 기본 브라우저의 컨텍스트 메뉴는 숨겨집니다.

~~~js
// DHTMLX 메뉴 컴포넌트 필요
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
    const x = event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
    const y = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;

    if (taskId) {
        menu.showContextMenu(x, y);
        return false;
    }

    return true;
});
~~~

페이지에 [files of DHTMLX Menu or DHTMLX Suite](https://docs.dhtmlx.com/menu__how_to_start.html)를 포함하는 것을 잊지 마세요. 그렇지 않으면 예제가 작동하지 않습니다.

순수 JavaScript로 사용자 정의 컨텍스트 메뉴를 추가해야 한다면 [another example](https://snippet.dhtmlx.com/xuvxhjbc)를 확인해 보세요.