---
sidebar_label: alert
title: метод alert
description: "вызывает диалоговое окно alert"
---

# alert

### Description

@short: Вызывает диалоговое окно alert

@signature: alert: (config: AlertBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *AlertBoxConfig | string | number* - либо объект с конфигурацией окна alert или текст для показа

### Returns
- ` div` - (HTMLElement) - контейнер div для окна alert

### Example

~~~jsx
var box = gantt.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});

// or
var box = gantt.alert("This is an alert box");
~~~

### Details

Объект конфигурации использует следующие свойства:

- **id?** - (*number | string*) - необязательный идентификатор окна alert
- **text** - (*number | string*) - текст содержимого окна alert
- **title?** - (*number | string*) - необязательный текст заголовка
- **ok?** - (*number | string*) - необязательный текст кнопки "OK"
- **position?** - (*string*) - необязательное положение окна alert; на данный момент поддерживается только одно значение - "top", любое другое значение приведет к выравниванию по центру
- **width?** - (*string*) - необязательная ширина окна alert (устанавливается как значения CSS \<length\> или \<percentage\>, например "100px", "50%")
- **height?** - (*string*) - необязательная высота окна alert (устанавливается как значения CSS \<length\> или \<percentage\>, например "100px", "50%")
- **callback? (result): void** - необязательный, функция, вызываемая при клике по кнопке. Принимает *true* в качестве параметра (в зависимости от нажатой кнопки)
    - **_result_** - (*boolean*) - результат нажатой кнопки, всегда возвращает **true** (поскольку кнопка одна — "OK")

Для получения дополнительной информации об опциях конфигурации окна alert см. статью [Всплывающие сообщения и модальные окна](guides/message-boxes.md).

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Всплывающие сообщения и модальные окна](guides/message-boxes.md)

### Change log
- добавлено в версии 4.0