---
sidebar_label: constants
title: constants config
description: "enthält verschiedene constants, um die Verwendung von Magic Numbers im Code zu vermeiden"
---

# constants

### Description

@short: Enthält verschiedene constants, um die Verwendung von Magic Numbers im Code zu vermeiden

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

enthält verschiedene constants, die helfen, die Nutzung von Magic Numbers im Code zu minimieren. Momentan umfasst es hauptsächlich das **KEY_CODES** Objekt
