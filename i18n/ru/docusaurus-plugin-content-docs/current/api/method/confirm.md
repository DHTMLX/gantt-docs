---
sidebar_label: confirm
title: confirm method
description: "отображает окно confirm с сообщением"
---

# confirm

### Description

@short: Отображает окно confirm с сообщением

@signature: confirm: (config: ConfirmBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *ConfirmBoxConfig | string | number* -            может быть либо объектом конфигурации для confirm окна, либо просто текстом для отображения

### Returns
- ` div` - (HTMLElement) - div элемент, содержащий окно confirm

### Example

~~~jsx
var box = gantt.confirm({
    text: "Продолжить?",
    ok:"Да", 
    cancel:"Нет",
    callback: function(result){
        if(result){
            gantt.message("Да!");
        }else{
            gantt.message("Нет...");
        }
    }
});

// или
var box = gantt.confirm("Хотите продолжить?");
~~~

### Details

Объект конфигурации включает следующие свойства:

- **id?** - (*number | string*) - необязательный идентификатор для окна confirm
- **text** - (*number | string*) - основной текст, отображаемый внутри окна confirm
- **title?** - (*number | string*) - необязательный заголовок
- **ok?** - (*number | string*) - необязательная надпись для кнопки "OK"
- **cancel?** - (*number | string*) - необязательная надпись для кнопки "Cancel"
- **position?** - (*string*) - необязательное расположение окна confirm; в настоящее время поддерживается только "top", иначе по умолчанию используется "center-align"
- **width?** - (*string*) - необязательная ширина окна confirm, задаётся в формате CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage), например "100px", "50%"
- **height?** - (*string*) - необязательная высота окна confirm, задаётся в формате CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage), например "100px", "50%"
- **callback? (result): void** - необязательная функция, вызываемая при нажатии на кнопку. Получает *true* или *false* в зависимости от нажатой кнопки
    - **_result_** - (*boolean*) - указывает, какая кнопка была нажата: **true** для "OK", **false** для "Cancel".


Для получения дополнительной информации о параметрах конфигурации confirm окон смотрите статью [Всплывающие сообщения и модальные окна](guides/message-boxes.md).

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Всплывающие сообщения и модальные окна](guides/message-boxes.md)

### Change log
- добавлено в версии 4.0

