---
sidebar_label: onEmptyClick
title: onEmptyClick event
description: "срабатывает, когда пользователь кликает по пустой области внутри диаграммы Ганта (вне задач)"
---

# onEmptyClick

### Description

@short: Срабатывает, когда пользователь кликает по пустой области внутри диаграммы Ганта (вне задач)

@signature: onEmptyClick: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
gantt.attachEvent("onEmptyClick", function (e){
    // здесь можно добавить кастомную логику
});
~~~

### Details

Событие **onEmptyClick** также срабатывает, когда пользователь кликает по ссылке. Если вы хотите отключить такое поведение, можно проверить, содержит ли элемент `e.target` или его ближайший предок свойство **link_attribute**, например так:

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
