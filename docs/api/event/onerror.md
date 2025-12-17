---
sidebar_label: onError
title: onError event
description: "fires when assert receives 'false' value, i.e. when assertion fails"
---

# onError

### Description

@short: Fires when [assert](api/method/assert.md) receives 'false' value, i.e. when assertion fails

@signature: onError: (errorMessage: string) =\> boolean;

### Parameters

- `errorMessage` - (required) *string* - a string with an error from the [assert](api/method/assert.md) method

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onError", function(errorMessage){
    gantt.message({
        text:"Error"
    });
    return true;
});
~~~

### Details

the event is blockable. Returning false will prevent the default behavior (showing error message in a red box in the top right)

### Change log
- added in version 4.0

