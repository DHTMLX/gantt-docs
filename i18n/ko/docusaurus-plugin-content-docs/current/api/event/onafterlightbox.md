---
sidebar_label: onAfterLightbox
title: onAfterLightbox event
description: "사용자가 라이트박스(편집 폼)를 닫을 때 한 번 실행됩니다."
---

# onAfterLightbox

### Description

@short: 사용자가 라이트박스(편집 폼)를 닫을 때 한 번 실행됩니다.

@signature: onAfterLightbox: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onAfterLightbox", function (){
    //여기에 커스텀 로직 작성
});
~~~
