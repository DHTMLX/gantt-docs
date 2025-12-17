---
sidebar_label: onEmptyClick
title: onEmptyClick event
description: "사용자가 간트 차트 내 빈 영역(작업 외부)을 클릭할 때 발생합니다."
---

# onEmptyClick

### Description

@short: 사용자가 간트 차트 내 빈 영역(작업 외부)을 클릭할 때 발생합니다.

@signature: onEmptyClick: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onEmptyClick", function (e){
    //여기에 커스텀 로직을 추가할 수 있습니다
});
~~~

### Details

**onEmptyClick** 이벤트는 사용자가 링크를 클릭할 때도 활성화됩니다. 이 동작을 비활성화하려면 `e.target` 요소나 그 가장 가까운 조상 요소에 **link_attribute** 속성이 포함되어 있는지 확인할 수 있습니다. 예시는 다음과 같습니다:

~~~js
gantt.attachEvent("onEmptyClick", function (e) {
  var domHelpers = gantt.utils.dom;
  if(!domHelpers.closest(e.target, "[" + gantt.config.link_attribute + "]")){
    gantt.message("not a link");
  }else{
    gantt.message("link!"); 
  }
});
~~~
