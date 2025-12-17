---
sidebar_label: refreshLink
title: refreshLink method
description: "지정된 링크를 업데이트합니다"
---

# refreshLink

### Description

@short: 지정된 링크를 업데이트합니다

@signature: refreshLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    링크 ID

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

var task = gantt.getLink(1);

task.type = 2; /*!*/
gantt.refreshLink(1);       /*!*/
~~~

### Details

이 메서드는 링크의 속성을 수정한 후 링크를 다시 그릴 때 사용됩니다. [updateLink](api/method/updatelink.md)와 달리 [DataProcessor](guides/server-side.md)를 활성화하지 않으므로 서버로 변경 사항이 전송되지 않습니다.

### Related API
- [refreshTask](api/method/refreshtask.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)

