---
sidebar_label: message
title: message method
description: "вызывает окно сообщения указанного типа"
---

# message

### Description

@short: Вызывает окно сообщения указанного типа

@signature: message: MessagePopupObject

### Parameters

- `config` - (required) *object | string | number* - либо объект с конфигурацией окна сообщения или текст для отображения

### Returns
- ` id` - (string | number) - идентификатор окна сообщения

### Example

~~~jsx
let box = gantt.message({ 
    type:"warning", 
    text:"Are you sure you want to do it?"
});

// or
box = gantt.message("This is the message");
~~~

### Details

Объект конфигурации использует следующие свойства:

- **id?** - (*number | string*) - необязательный идентификатор всплывающего сообщения
- **text** - (*number | string*) - содержимое всплывающего сообщения
- **type?** - (*string*) - необязательный, имя класса всплывающего сообщения
- **expire?** - (*number*) - необязательный, время до исчезновения всплывающего сообщения. -1 означает, что сообщение не исчезнет само по себе


Свойство **message** может быть функцией, но может использоваться и как объект конфигурации для всплывающего сообщения. Оно имеет следующие свойства:

- **position** - (*string*) - положение всплывающего сообщения. Возможные значения: "top", "bottom", "left", "right"

~~~js
gantt.message.position = "left";
~~~
- **keyboard** - (*boolean*) - указывает, следует ли Gantt блокировать события клавиатуры. *true* по умолчанию.

~~~js
gantt.message.keyboard = false;
~~~
- **hide (id): any** - функция, которая скрывает всплывающее сообщение. В качестве параметра принимает **id**:
    - **_id_** - (*number | string*) - идентификатор всплывающего сообщения
~~~js
gantt.message.hide("popupId");
~~~

Для получения дополнительной информации о поддерживаемых параметрах конфигурации окна сообщения см. статью [Сообщения всплывающих окон и модальные окна](guides/message-boxes.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Сообщения всплывающих окон и модальные окна](guides/message-boxes.md)

### Change log
- добавлено в версии 4.0