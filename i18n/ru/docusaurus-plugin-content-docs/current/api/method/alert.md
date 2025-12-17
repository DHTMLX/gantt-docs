---
sidebar_label: alert
title: alert method
description: "вызывает окно alert-сообщения"
---

# alert

### Description

@short: Вызывает окно alert-сообщения

@signature: alert: (config: AlertBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *AlertBoxConfig | string | number* -            может быть объектом с настройками alert-бокса или просто текстом для отображения

### Returns
- ` div` - (HTMLElement) - div-элемент, содержащий alert-бокс

### Example

~~~jsx
var box = gantt.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});

// или
var box = gantt.alert("This is an alert box");
~~~

### Details

Объект конфигурации поддерживает следующие свойства:

- **id?** - (*number | string*) - необязательный, ID alert-бокса
- **text** - (*number | string*) - основной текст внутри alert-бокса
- **title?** - (*number | string*) - необязательный, заголовок
- **ok?** - (*number | string*) - необязательный, надпись на кнопке "OK"
- **position?** - (*string*) - необязательный, позиция alert-бокса; в настоящее время поддерживается только "top", любое другое значение по умолчанию будет "center-align"
- **width?** - (*string*) - необязательный, ширина alert-бокса в формате CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage), например "100px", "50%"
- **height?** - (*string*) - необязательный, высота alert-бокса в формате CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage), например "100px", "50%"
- **callback? (result): void** - необязательная функция, вызываемая при нажатии на кнопку. Параметр *result* всегда равен *true* (так как есть только кнопка "OK")
    - **_result_** - (*boolean*) - указывает результат нажатой кнопки, всегда **true**


Для получения более подробной информации о настройках alert-бокса смотрите статью [Всплывающие сообщения и модальные окна](guides/message-boxes.md).

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Всплывающие сообщения и модальные окна](guides/message-boxes.md)

### Change log
- добавлено в версии 4.0

