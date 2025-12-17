---
sidebar_label: onContextMenu
title: onContextMenu event
description: "사용자가 간트 차트 내에서 마우스 오른쪽 버튼을 클릭할 때 트리거됩니다 (자세한 내용 참조)"
---

# onContextMenu

### Description

@short: 사용자가 간트 차트 내에서 마우스 오른쪽 버튼을 클릭할 때 트리거됩니다 (자세한 내용 참조)

@signature: onContextMenu: (taskId: string | number, linkId: string | number, e: Event) =\> void;

### Parameters

- `taskId` - (required) *string | number* - 작업 ID
- `linkId` - (required) *string | number* - 링크 ID
- `e` - (required) *Event* - 원시 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
      var element = event.target;
    console.log("You've clicked on the ", element)
    return true;
});
~~~

### Related samples
- [Context menu to control tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/10_context_menu.html)

### Details

간트 차트 내에서 마우스 오른쪽 버튼을 클릭하면 일반적으로 브라우저의 기본 context menu가 표시됩니다. 다만, 다른 조건이 적용되면 예외가 있을 수 있습니다. 
아래 예제에서는 작업(task)을 오른쪽 클릭할 경우, 기본 브라우저 메뉴 대신 [DHTMLX context menu](https://docs.dhtmlx.com/menu__index.html)가 표시되어 기본 메뉴가 나타나지 않도록 합니다.

~~~
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

예제에서 사용하는 DHTMLX 메뉴 파일 또는 [DHTMLX Suite](https://docs.dhtmlx.com/menu__how_to_start.html)를 페이지에 반드시 포함해야 합니다.
<br>

순수 JavaScript로 커스텀 context menu를 추가하는 방법은 [이 예제](https://snippet.dhtmlx.com/xuvxhjbc)를 참고하세요.
