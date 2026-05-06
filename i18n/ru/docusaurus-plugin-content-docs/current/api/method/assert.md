---
sidebar_label: assert
title: assert method
description: "если указанное выражение ложно, errorMessage будет показано в красном всплывающем окне в правом верхнем углу экрана"
---

# assert

### Description

@short: Если указанное выражение ложно, errorMessage выводится в красном всплывающем окне в правом верхнем углу экрана

@signature: assert: (expression: any, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *any* - истинное значение для проверки выражения, ложное - если утверждение не выполняется
- `errorMessage` - (required) *string* - сообщение об ошибке, которое будет показано в красном всплывающем окне

### Example

~~~jsx
gantt.attachEvent("onLoadEnd", function(){
   gantt.assert(gantt.getTaskCount(), "no data loaded");
});
~~~

### Details

В кодовой базе dhtmlxGantt используется gantt.assert для обнаружения некорректного состояния компонента

Отображение ошибок можно изменить с помощью конфигурации [show_errors](api/config/show_errors.md).

Ошибки можно отслеживать программно, используя событие [onError](api/event/onerror.md).