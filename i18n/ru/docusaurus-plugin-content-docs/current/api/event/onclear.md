---
sidebar_label: onClear
title: onClear event
description: "вызывается после того, как все задачи были удалены из Gantt диаграммы с помощью метода [clearAll](api/method/clearall.md)"
---

# onClear

### Description

@short: Вызывается после того, как все задачи были удалены из Gantt диаграммы с помощью метода [clearAll](api/method/clearall.md)

@signature: onClear: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onClear", function (){
    //любая ваша логика здесь
});
~~~

### Related API
- [clearAll](api/method/clearall.md)

