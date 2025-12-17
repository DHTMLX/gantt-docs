---
sidebar_label: onBeforeBranchLoading
title: onBeforeBranchLoading event
description: "동적 로딩이 활성화된 경우, 사용자가 작업 브랜치를 확장한 직후 로딩 프로세스가 시작되기 전에 이 이벤트가 발생합니다."
---

# onBeforeBranchLoading

### Description

@short: 동적 로딩이 활성화된 경우, 사용자가 작업 브랜치를 확장한 직후 로딩 프로세스가 시작되기 전에 이 이벤트가 발생합니다.

@signature: onBeforeBranchLoading: (settings: any) =\> boolean;

### Parameters

- `settings` - (required) *object* - 작업 ID와 요청 URL을 포함합니다.

### Returns
- ` result` - (boolean) - `false`를 반환하면 동적 로딩이 중단되고 서버로의 요청이 전송되지 않습니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeBranchLoading", function(settings){
    var task = gantt.getTask(settings.taskId);
    config.url += "&value=" + encodeURIComponent(task.text);
    return true;
});
~~~

### Details

이 이벤트는 동적 로딩 요청에 추가 파라미터를 넣을 때 유용합니다. `settings` 객체는 작업 ID와 요청 URL 두 가지 속성을 포함합니다:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

코드 내에서 요청 URL을 직접 수정할 수 있습니다.

이 이벤트는 [Dynamic loading](guides/loading.md)이 활성화된 경우에만 발생합니다.

이벤트를 차단할 수도 있으며, *false*를 반환하면 동적 로딩 요청이 취소됩니다.

### Related API
- [onAfterBranchLoading](api/event/onafterbranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [데이터 로딩](guides/loading.md)

