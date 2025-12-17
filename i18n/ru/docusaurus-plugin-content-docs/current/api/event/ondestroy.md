---
sidebar_label: onDestroy
title: onDestroy event
description: "срабатывает один раз после очистки диаграммы Ганта с помощью метода destructor"
---

# onDestroy

### Description

@short: Срабатывает один раз после очистки диаграммы Ганта с помощью метода [destructor](api/method/destructor.md)

@signature: onDestroy: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onDestroy", function(){
   alert("освободить пользовательские ресурсы");
});

gantt.destructor();
~~~

### Related API
- [destructor](api/method/destructor.md)

