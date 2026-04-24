---
sidebar_label: onError
title: onError event
description: "löst aus, wenn [assert](api/method/assert.md) einen Wert 'false' erhält, d.h. wenn die Assertion fehlschlägt"
---

# onError

### Description

@short: Wird ausgelöst, wenn [assert](api/method/assert.md) einen Wert 'false' erhält, d.h. wenn die Assertion fehlschlägt

@signature: onError: (errorMessage: string) =\> boolean;

### Parameters

- `errorMessage` - (erforderlich) *string* - ein String mit einer Fehlermeldung aus der [assert](api/method/assert.md) Methode

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

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

Das Ereignis ist blockierbar. Wenn false zurückgegeben wird, wird das Standardverhalten verhindert (die Anzeige der Fehlermeldung in einer roten Box oben rechts)

### Change log
- in Version 4.0 hinzugefügt