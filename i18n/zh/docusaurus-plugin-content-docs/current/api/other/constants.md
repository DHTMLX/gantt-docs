---
sidebar_label: constants
title: constants config
description: "保存各种常量，避免在代码中使用魔法数字"
---

# constants

### Description

@short: 存储各种常量以减少代码中魔术数字的使用

@signature: constants: any

### Example

~~~jsx
document.addEventListener("keypress", function(e){
   var keys = gantt.constants.KEY_CODES;
   if(e.keyCode === keys.ENTER){
    // 在按下回车时执行
   }
});
~~~

### Details

用于存储各种常量以减少代码中魔术数字的使用。目前仅存储 **KEY_CODES** 对象