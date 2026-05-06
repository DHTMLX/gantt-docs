---
sidebar_label: onTemplatesReady
title: onTemplatesReady 이벤트
description: "dhtmlxGantt 템플릿이 초기화될 때 실행됩니다"
---

# onTemplatesReady

### Description

@short: dhtmlxGantt 템플릿이 초기화될 때 실행됩니다

@signature: onTemplatesReady: () => void;

### Example

~~~jsx
gantt.attachEvent("onTemplatesReady", function(){
    // 여기에 코드 작성
});
~~~

### Details

이벤트는 dhtmlxGantt의 템플릿이 준비되었음을 알립니다. 이 이벤트는 커스텀 뷰를 생성하기에 좋은 포인트입니다.

onTemplatesReady 이벤트 핸들러에서 커스텀 뷰 생성을 위한 코드를 작성하는 것이 좋습니다. 이렇게 하면 커스텀 뷰의 템플릿이 그리드 초기화 전에 준비되며, 페이지에 커스텀 뷰가 올바르게 렌더링됩니다.