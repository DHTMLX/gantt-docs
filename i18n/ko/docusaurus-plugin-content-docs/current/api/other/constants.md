---
sidebar_label: constants
title: constants config
description: "코드 전반에 걸쳐 매직 넘버 사용을 피하기 위해 다양한 constants를 보유합니다."
---

# constants

### Description

@short: 코드 전반에 걸쳐 매직 넘버 사용을 피하기 위해 다양한 constants를 보유합니다.

@signature: constants: any

### Example

~~~jsx
document.addEventListener("keypress", function(e){
   var keys = gantt.constants.KEY_CODES;
   if(e.keyCode === keys.ENTER){
    // enter 키 입력 시 동작
   }
});
~~~

### Details

코드 내 매직 넘버 사용을 최소화하기 위해 여러 constants를 보유합니다. 현재는 주로 **KEY_CODES** 객체를 포함하고 있습니다.
