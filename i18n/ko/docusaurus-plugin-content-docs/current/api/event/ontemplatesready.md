---
sidebar_label: onTemplatesReady
title: onTemplatesReady event
description: "dhtmlxGantt 템플릿이 초기화될 때 트리거됩니다."
---

# onTemplatesReady

### Description

@short: DhtmlxGantt 템플릿이 초기화될 때 트리거됩니다.

@signature: onTemplatesReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onTemplatesReady", function(){
    //여기에 커스텀 로직을 작성하세요
});
~~~

### Details

이 이벤트는 dhtmlxGantt 템플릿이 완전히 초기화되었음을 알립니다. 커스텀 뷰를 설정하기에 적절한 시점을 제공합니다.

커스텀 뷰 생성 코드를 onTemplatesReady 이벤트 핸들러 안에 배치하면, 뷰의 템플릿이 grid가 초기화되기 전에 준비되어 
커스텀 뷰가 페이지에서 제대로 표시되도록 도와줍니다.
