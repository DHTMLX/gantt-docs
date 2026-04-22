---
sidebar_label: onClear
title: onClear событие
description: "Срабатывает после того, как все задачи были удалены из диаграммы Ганта методом [clearAll](api/method/clearall.md)"
---

# onClear

### Description

@short: Срабатывает после того, как все задачи были удалены из диаграммы Ганта методом [clearAll](api/method/clearall.md)

@signature: onClear: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onClear", function (){
    // любая ваша логика здесь
});
~~~

### Related API
- [clearAll](api/method/clearall.md)