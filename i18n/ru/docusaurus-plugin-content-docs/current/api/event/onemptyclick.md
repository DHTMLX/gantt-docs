---
sidebar_label: onEmptyClick
title: onEmptyClick event
description: "срабатывает, когда пользователь кликает по пустому месту на диаграмме Ганта (не по задачам)"
---

# onEmptyClick

### Description

@short: Срабатывает, когда пользователь кликает по пустому месту на диаграмме Ганта (не по задачам)

@signature: onEmptyClick: (e: Event) => void;

### Parameters

- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
gantt.attachEvent("onEmptyClick", function (e){
    // любая ваша логика здесь
});
~~~

### Details

Событие **onEmptyClick** также срабатывает, когда пользователь кликает по ссылке. Вы можете предотвратить это поведение события. Для этого нужно проверить, содержит ли элемент `e.target` или ближайший к нему элемент свойство **link_attribute**, как в примере:

~~~js
gantt.attachEvent("onEmptyClick", function (e) {
  var domHelpers = gantt.utils.dom;
  if(!domHelpers.closest(e.target, "[" + gantt.config.link_attribute + "]")){
    gantt.message("not a link");
  }else{
    gantt.message("link!"); 
  }
});
~~~