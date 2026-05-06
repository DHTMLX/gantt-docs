---
sidebar_label: confirm
title: confirm method
description: "вызывает диалоговое окно подтверждения"
---

# confirm

### Description

@short: Отображает окно confirm с сообщением

@signature: confirm: (config: ConfirmBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *ConfirmBoxConfig | string | number* - либо объект с конфигурацией окна подтверждения или текст, который нужно показать

### Returns
- ` div` - (HTMLElement) - контейнер div окна подтверждения

### Example

~~~jsx
var box = gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        if(result){
            gantt.message("Yes!");
        }else{
            gantt.message("No...");
        }
    }
});

// or
var box = gantt.confirm("Do you want to continue?");
~~~

### Details

Объект конфигурации использует следующие свойства:

- **id?** - (*number | string*) - необязательный идентификатор окна подтверждения
- **text** - (*number | string*) - текст содержимого окна подтверждения
- **title?** - (*number | string*) - необязательный текст заголовка
- **ok?** - (*number | string*) - необязательный текст кнопки «OK»
- **cancel?** - (*number | string*) - необязательный текст кнопки «Cancel»
- **position?** - (*string*) - необязательное, положение окна подтверждения; на данный момент поддерживается только одно значение — "top"; любое другое значение приведет к центрированному выравниванию
- **width?** - (*string*) - необязательная ширина окна подтверждения (задается как значения CSS \<length\> или \<percentage\>, например, "100px", "50%")
- **height?** - (*string*) - необязательная высота окна подтверждения (задается как значения CSS \<length\> или \<percentage\>, например, "100px", "50%")
- **callback? (result): void** - необязательная функция, вызываемая при клике на кнопку. Принимает *true* или *false* в качестве параметра (в зависимости от нажатой кнопки)
    - **_result_** - (*boolean*) - результат нажатой кнопки: **true** для "OK", **false** для "Cancel".

Для получения дополнительных сведений о поддерживаемых настройках конфигурации окна подтверждения см. статью [Popup Messages and Modal Boxes](guides/message-boxes.md).

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/message-boxes.md)

### Change log
- добавлено в версии 4.0