---
sidebar_label: modalbox
title: modalbox method
description: "открывает modalbox"
---

# modalbox

### Description

@short: Открывает modalbox

@signature: modalbox: (config: ModalBoxConfig) =\> HTMLElement

### Parameters

- `config` - (required) *ModalBoxConfig* - настройки конфигурации для modalbox

### Returns
- ` div` - (HTMLElement) - div элемент, содержащий modalbox

### Example

~~~jsx
let box = gantt.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

Объект конфигурации включает следующие свойства:

- **id?** - (*number | string*) - необязательно, уникальный идентификатор для modalbox
- **text** - (*number | string*) - текст содержимого, отображаемый внутри modalbox
- **title?** - (*number | string*) - необязательно, заголовок modalbox
- **position?** - (*string*) - необязательно, управляет позицией modalbox; в настоящее время поддерживается только "top", любые другие значения по умолчанию приводят к "center-align"
- **buttons** - (*string[] | number[] | ModalboxButton[]*) - массив, указывающий кнопки для отображения
- **width?** - (*string*) - необязательно, задаёт ширину modalbox с помощью CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) значений, например "100px" или "50%"
- **height?** - (*string*) - необязательно, задаёт высоту modalbox с помощью CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) единиц, например "100px" или "50%"
- **callback? (result): void** - необязательная функция, вызываемая при клике на кнопку. Функция получает *true* или *false* в зависимости от нажатой кнопки
    - **_result_** - (*string | number | boolean*) - callback получает строковое представление индекса нажатой кнопки из массива ("0", "1", "2", ...)


Тип ModalboxButton включает следующие свойства:

- **label** - (*string | number*) - текст метки кнопки
- **value?** - (*string | number | boolean*) - необязательно, значение, возвращаемое как *result* в функции *callback*
- **css?** - (*string | number*) - необязательно, пользовательский CSS класс для кнопки, который должен начинаться с префикса "gantt_"


Для дополнительной информации о параметрах конфигурации modalbox смотрите статью [Всплывающие сообщения и модальные окна](guides/message-boxes.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- [Всплывающие сообщения и модальные окна](guides/message-boxes.md)

### Change log
- добавлено в версии 4.0

