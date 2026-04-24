---
sidebar_label: onEmptyClick
title: onEmptyClick 이벤트
description: "사용자가 Gantt 차트의 빈 공간(작업이 아닌 곳)을 클릭할 때 발생합니다"
---

# onEmptyClick

### Description

@short: 사용자가 Gantt 차트의 빈 공간(작업이 아닌 곳)을 클릭할 때 발생합니다

@signature: onEmptyClick: (e: Event) =\> void;

### Parameters

- `e` - (필수) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onEmptyClick", function (e){
    // 여기에 코드 작성
});
~~~

### Details

**onEmptyClick** 이벤트는 사용자가 링크를 클릭할 때도 발생합니다. 이 이벤트의 이 기능을 방지할 수 있습니다. 이를 수행하려면 `e.target` 요소나 그와 가장 가까운 요소에 포함된 **link_attribute** 속성이 있는지 확인해야 합니다. 예는 다음과 같습니다:

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