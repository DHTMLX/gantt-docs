---
sidebar_label: onAfterBranchLoading
title: onAfterBranchLoading event
description: "다이나믹 로딩이 활성화된 경우, 작업 브랜치가 페이지에 로딩을 완료한 직후에 발생하는 이벤트입니다."
---

# onAfterBranchLoading

### Description

@short: 다이나믹 로딩이 활성화된 경우, 작업 브랜치가 페이지에 로딩을 완료한 직후에 발생하는 이벤트입니다.

@signature: onAfterBranchLoading: (settings: any) =\> void;

### Parameters

- `settings` - (required) *object* - 작업 ID와 요청 URL을 포함하는 객체입니다.

### Example

~~~jsx
gantt.attachEvent("onAfterBranchLoading", function(settings){
    console.log(settings.url);
});
~~~

### Details

`settings` 객체는 두 가지 속성을 포함합니다: 작업의 ID와 요청에 사용된 URL입니다.

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

이 이벤트는 [다이나믹 로딩](guides/loading.md)이 활성화된 경우에만 발생합니다.

### Related API
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [데이터 로딩](guides/loading.md)

