---
sidebar_label: updateLink
title: updateLink method
description: "지정된 의존성 링크를 업데이트합니다"
---

# updateLink

### Description

@short: 지정된 의존성 링크를 업데이트합니다

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

gantt.getLink(5).type = 2; //링크의 데이터를 변경
gantt.updateLink(5); //업데이트된 링크를 렌더링합니다
~~~

### Details

:::note
메서드는 [onAfterLinkUpdate](api/event/onafterlinkupdate.md) 이벤트를 발생시킵니다. 
:::

:::note
데이터 프로세서(DataProcessor)가 활성화되어 있으면 메서드는 [DataProcessor](guides/server-side.md)을 트리거합니다. 
:::

이 메서드는 링크 객체를 수정한 후 Gantt의 상태를 업데이트하고, 관련 UI 요소를 다시 렌더링하며 백엔드로 변경사항을 전송하기 위해 호출해야 합니다.

이 메서드를 호출하면 [onAfterLinkUpdate](api/event/onafterlinkupdate.md) 이벤트가 발생하며, 추가적인 재계산이 트리거될 수 있습니다.

데이터 프로세서(DataProcessor)를 사용하는 경우 이 메서드를 호출하면 서버에 **업데이트** 요청이 전송됩니다.

저장할 필요가 없는 시각적 변경을 적용하려면 대신 [refreshLink](api/method/refreshlink.md) 메서드를 사용하세요. 이렇게 하면 추가 계산이나 서버 요청 없이 Gantt의 레코드를 다시 렌더링합니다.

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
- [Server-Side Integration](guides/server-side.md)