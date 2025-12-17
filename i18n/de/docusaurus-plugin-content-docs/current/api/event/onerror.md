---
sidebar_label: onError
title: onError event
description: "Wird ausgelöst, sobald assert einen Wert 'false' erhält, was bedeutet, dass eine Assertion nicht bestanden wurde."
---

# onError

### Description

@short: Wird ausgelöst, sobald [assert](api/method/assert.md) einen Wert 'false' erhält, was bedeutet, dass eine Assertion nicht bestanden wurde.

@signature: onError: (errorMessage: string) =\> boolean;

### Parameters

- `errorMessage` - (required) *string* - ein String, der die Fehlermeldung der [assert](api/method/assert.md) Methode enthält

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder gestoppt wird (<b>false</b>)

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

Dieses Event kann blockiert werden. Wenn false zurückgegeben wird, wird das Standardverhalten gestoppt, welches darin besteht, die Fehlermeldung in einem roten Kästchen oben rechts anzuzeigen.

### Change log
- hinzugefügt in Version 4.0

