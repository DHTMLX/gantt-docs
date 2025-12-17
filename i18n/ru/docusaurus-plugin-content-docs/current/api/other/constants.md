---
sidebar_label: constants
title: constants config
description: "содержит различные constants для избежания использования magic numbers в коде"
---

# constants

### Description

@short: Содержит различные constants для избежания использования magic numbers в коде

@signature: constants: any

### Example

~~~jsx
document.addEventListener("keypress", function(e){
   var keys = gantt.constants.KEY_CODES;
   if(e.keyCode === keys.ENTER){
    // do on enter
   }
});
~~~

### Details

содержит различные constants, которые помогают минимизировать использование magic numbers в коде. В настоящее время в основном включает объект **KEY_CODES**
