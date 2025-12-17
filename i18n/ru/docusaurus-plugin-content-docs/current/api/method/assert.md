---
sidebar_label: assert
title: assert method
description: "если переданное выражение ложно, в правом верхнем углу экрана появляется красный popup с сообщением об ошибке"
---

# assert

### Description

@short: Если переданное выражение ложно, в правом верхнем углу экрана появляется красный popup с сообщением об ошибке

@signature: assert: (expression: any, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *any* - истинное значение для подтверждения выражения, ложное если assert не прошёл
- `errorMessage` - (required) *string* - сообщение, которое будет отображено в красном popup

### Example

~~~jsx
gantt.attachEvent("onLoadEnd", function(){
   gantt.assert(gantt.getTaskCount(), "no data loaded");
});
~~~

### Details

В кодовой базе dhtmlxGantt используется gantt.assert для определения, когда компонент находится в некорректном состоянии.

Способ отображения ошибок можно настроить через конфигурацию [show_errors](api/config/show_errors.md).

Ошибки также можно обрабатывать программно через событие [onError](api/event/onerror.md).

