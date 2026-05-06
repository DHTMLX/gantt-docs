---
sidebar_label: modalbox
title: метод modalbox
description: "вызывает modalbox"
---

# modalbox

### Description

@short: Вызывает modalbox

@signature: modalbox: (config: ModalBoxConfig) =\> HTMLElement

### Parameters

- `config` - (required) *ModalBoxConfig* - конфигурация модального окна

- `div` - (HTMLElement) - div-контейнер модального окна

### Returns
- ` div` - (HTMLElement) - div-контейнер модального окна

### Example

~~~jsx
let box = gantt.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

Объект конфигурации использует следующие свойства:

- **id?** - (*number | string*) - необязателен, идентификатор модального окна
- **text** - (*number | string*) - текст тела модального окна
- **title?** - (*number | string*) - необязательное, текст заголовка
- **position?** - (*string*) - необязательное, положение модального окна; на данный момент поддерживается только одно значение — 'top'; любое другое значение приведет к 'center-align'
- **buttons** - (*string[] | number[] | ModalboxButton[]*) - массив кнопок
- **width?** - (*string*) - необязательное, ширина модального окна (устанавливается как значения CSS \<length\> или \<percentage\>, например, "100px", "50%")
- **height?** - (*string*) - необязательное, высота модального окна (устанавливается как значения CSS \<length\> или \<percentage\>, например, "100px", "50%")
- **callback? (result): void** - необязательная, функция, вызываемая при нажатии кнопки. Принимает true или false в качестве параметра (в зависимости от нажатой кнопки)
    - **_result_** - (*string | number | boolean*) - Результат функции обратного вызова будет равен строковому индексу нажатой кнопки из массива ("0", "1", "2",...)

У ModalboxButton есть следующие типы:

- **label** - (*string | number*) - текст кнопки
- **value?** - (*string | number | boolean*) - необязательное значение, возвращаемое в аргумент result функции callback
- **css?** - (*string | number*) - необязательное, пользовательское имя класса для кнопки, с префиксом "gantt_"

Для дополнительной информации о поддерживаемых параметрах конфигурации modalbox смотрите статью [Сообщения во всплывающих окнах и модальные окна](guides/message-boxes.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- [Сообщения во всплывающих окнах и модальные окна](guides/message-boxes.md)

### Change log
- добавлено в версии 4.0