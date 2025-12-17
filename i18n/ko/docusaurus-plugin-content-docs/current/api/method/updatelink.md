---
sidebar_label: updateLink
title: updateLink method
description: "지정된 의존성 링크를 업데이트합니다."
---

# updateLink

### Description

@short: 지정된 의존성 링크를 업데이트합니다.

@signature: updateLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    작업 ID

### Example

~~~jsx
gantt.addLink({
    id:5, 
    source:1, 
    target:2, 
    type:1
});

gantt.getLink(5).type = 2; // 링크 데이터를 수정합니다.
gantt.updateLink(5); // 수정된 링크를 시각적 및 기능적으로 적용합니다.
~~~

### Details

:::note
 이 메서드는 [onAfterLinkUpdate](api/event/onafterlinkupdate.md) 이벤트를 트리거합니다. 
:::
:::note
 dataProcessor가 활성화된 경우, 이 메서드는 [DataProcessor](guides/server-side.md)를 작동시킵니다. 
:::

이 메서드는 링크 객체에 변경이 있을 때 Gantt의 내부 상태를 새로 고치고, 관련 UI 컴포넌트를 업데이트하며, 변경 사항을 백엔드로 전송하기 위해 사용해야 합니다.

이 함수를 호출하면 [onAfterLinkUpdate](api/event/onafterlinkupdate.md) 이벤트가 발생하며, 이는 추가 재계산을 유발할 수 있습니다.

[DataProcessor](guides/server-side.md)를 사용할 경우, 이 메서드는 서버로 **update** 요청을 시작합니다.

저장할 필요 없는 시각적 업데이트의 경우, [refreshLink](api/method/refreshlink.md) 메서드를 사용하는 것이 더 좋습니다. 이 메서드는 추가 계산이나 서버 통신 없이 Gantt에서 링크를 다시 그리기만 합니다.

~~~js
let selectedLink = null;
gantt.templates.link_class = function(link){
    if(link.id == selectedLink) {
        return "selected_link";
    }
};

gantt.attachEvent("onLinkClick", function(id,e){
    selectedLink = id;
    gantt.refreshLink(id); /*!*/
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)

### Related Guides
- [Server-Side Integration](guides/server-side.md#updatingdataontheserver)

