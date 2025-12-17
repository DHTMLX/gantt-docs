---
sidebar_label: onError
title: onError event
description: "Срабатывает каждый раз, когда assert возвращает значение 'false', что означает, что утверждение не прошло проверку."
---

# onError

### Description

@short: Срабатывает каждый раз, когда [assert](api/method/assert.md) возвращает значение 'false', что означает, что утверждение не прошло проверку.

@signature: onError: (errorMessage: string) =\> boolean;

### Parameters

- `errorMessage` - (required) *string* - строка, содержащая сообщение об ошибке из метода [assert](api/method/assert.md)

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет остановлено (<b>false</b>)

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

Это событие можно блокировать. Возврат false остановит поведение по умолчанию, которое заключается в отображении сообщения об ошибке в красном окне в правом верхнем углу.

### Change log
- добавлено в версии 4.0

