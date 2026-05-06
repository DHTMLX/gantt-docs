---
sidebar_label: onAfterLightbox
title: onAfterLightbox event
description: "사용자가 라이트박스(편집 양식)를 닫은 후 발생"
---

# onAfterLightbox

### Description

@short: 사용자가 라이트박스(편집 양식)를 닫은 직후 발생합니다

@signature: onAfterLightbox: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onAfterLightbox", function (){
    // 여기에 코드 작성
});
~~~