---
sidebar_label: constants
title: constants config
description: "stores various constants to reduce the use of magic numbers in the code"
---

# constants

### Description

@short: Stores various constants to reduce the use of magic numbers in the code

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

stores various constants to reduce the use of magic numbers in the code. Currently stores only **KEY_CODES** object
