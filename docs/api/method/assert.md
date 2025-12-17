---
sidebar_label: assert
title: assert method
description: "if the specified expression is false, an errorMessage is shown in the red popup at the top right corner of the screen"
---

# assert

### Description

@short: If the specified expression is false, an errorMessage is shown in the red popup at the top right corner of the screen

@signature: assert: (expression: any, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *any* - truthy value to assert the expression, falsy - if assertion fails
- `errorMessage` - (required) *string* - an error message that will be shown in the red popup

### Example

~~~jsx
gantt.attachEvent("onLoadEnd", function(){
   gantt.assert(gantt.getTaskCount(), "no data loaded");
});
~~~

### Details

dhtmlxGantt codebase uses gantt.assert to detect an invalid state of the component

Error display can be changed using the [show_errors](api/config/show_errors.md) config.

Errors can be traced programmatically, using the [onError](api/event/onerror.md) event.

