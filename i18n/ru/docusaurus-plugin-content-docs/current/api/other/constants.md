---
sidebar_label: constants
title: constants config
description: "содержит различные constants для избежания использования magic numbers в коде"
---

# constants

### Description

@short: Хранит различные константы, чтобы снизить использование магических чисел в коде

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

Хранит различные константы, чтобы снизить использование магических чисел в коде. В настоящее время хранит только объект **KEY_CODES**.