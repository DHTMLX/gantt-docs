---
sidebar_label: onError
title: onError событие
description: "срабатывает, когда [assert](api/method/assert.md) получает значение 'false', то есть когда утверждение не выполняется"
---

# onError

### Description

@short: Срабатывает, когда [assert](api/method/assert.md) получает значение 'false', то есть когда утверждение не выполняется

@signature: onError: (errorMessage: string) =\> boolean;

### Parameters

- `errorMessage` - (required) *string* - строка с сообщением об ошибке из метода [assert](api/method/assert.md)

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию для события (<b>true</b>) или отменено (<b>false</b>)

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

Событие можно заблокировать. Возврат значения false предотвратит выполнение действия по умолчанию (показ сообщения об ошибке в красном боксе в правом верхнем углу)

### Change log
- добавлено в версии 4.0