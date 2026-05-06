---
sidebar_label: constants
title: constants config
description: "코드 전반에 걸쳐 매직 넘버 사용을 피하기 위해 다양한 constants를 보유합니다."
---

# constants

### Description

@short: 코드에서 매직 넘버 사용을 줄이기 위해 다양한 상수를 저장합니다

@signature: constants: any

### Example

~~~jsx
document.addEventListener("keypress", function(e){
   var keys = gantt.constants.KEY_CODES;
   if(e.keyCode === keys.ENTER){
    // 엔터 입력 시 수행
   }
});
~~~

### Details

매직 넘버 사용을 줄이기 위해 다양한 상수를 저장합니다. 현재는 **KEY_CODES** 객체만 저장합니다