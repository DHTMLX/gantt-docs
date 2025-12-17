---
sidebar_label: message
title: message method
description: "открывает message box заданного типа"
---

# message

### Description

@short: Открывает message box заданного типа

@signature: message: MessagePopupObject

### Parameters

- `config` - (required) *object | string | number* -           может быть либо объектом конфигурации для message box, либо просто текстом для отображения

### Returns
- ` id` - (string | number) - идентификатор message box

### Example

~~~jsx
let box = gantt.message({ 
    type:"warning", 
    text:"Are you sure you want to do it?"
});

// или
box = gantt.message("This is the message");
~~~

### Details

Объект конфигурации поддерживает следующие свойства:

- **id?** - (*number | string*) - необязательно, ID, присвоенный всплывающему сообщению
- **text** - (*number | string*) - содержимое message для отображения во всплывающем окне
- **type?** - (*string*) - необязательно, CSS класс, применяемый к всплывающему сообщению
- **expire?** - (*number*) - необязательно, время в миллисекундах, через которое всплывающее сообщение автоматически исчезнет. Значение -1 означает, что сообщение останется видимым до ручного закрытия


Свойство **message** также может быть функцией или использоваться как объект конфигурации для всплывающего сообщения с такими свойствами:

- **position** - (*string*) - позиция появления всплывающего сообщения. Возможные значения: "top", "bottom", "left", "right"

~~~js
gantt.message.position = "left";
~~~
- **keyboard** - (*boolean*) - определяет, блокирует ли Gantt события клавиатуры. По умолчанию *true*.

~~~js
gantt.message.keyboard = false;
~~~
- **hide (id): any** - метод для скрытия всплывающего сообщения, принимает **id** в качестве аргумента:
    - **_id_** - (*number | string*) - ID всплывающего сообщения для скрытия
~~~js
gantt.message.hide("popupId");
~~~

Для получения дополнительной информации о доступных параметрах конфигурации для message box смотрите статью [Всплывающие сообщения и модальные окна](guides/message-boxes.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Всплывающие сообщения и модальные окна](guides/message-boxes.md)

### Change log
- добавлено в версии 4.0

