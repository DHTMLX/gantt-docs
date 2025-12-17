---
title: "Всплывающие сообщения и модальные окна"
sidebar_label: "Всплывающие сообщения и модальные окна"
---

Всплывающие сообщения и модальные окна
======================

Сообщения в Gantt используются для информирования пользователей об ошибках, подтверждения или отмены действий, выбора опций и других целей. Эти сообщения построены на основе [форка репозитория dhtmlxMessage](https://github.com/DHTMLX/message), поэтому все возможности dhtmlxMessage доступны и для сообщений dhtmlxGantt.

Существует два основных типа сообщений: [простое всплывающее сообщение](guides/message-boxes.md#basicpopupmessage) и [модальное окно](guides/message-boxes.md#modalmessageboxes) с кнопками, блокирующее взаимодействие с приложением.

Модальные окна бывают трёх видов:

- [Окно с сообщением об ошибке (Alert)](#alert)
- [Окно подтверждения (Confirm)](#confirm)
- [Модальное окно (Modalbox)](#modal)


## Простое всплывающее сообщение

Чтобы показать простое всплывающее сообщение, используйте метод [gantt.message](api/method/message.md). Обязательный параметр - текст сообщения:

~~~js
gantt.message("The task is updated");
~~~

Доступны три стиля сообщений:

- сообщение по умолчанию (**type:"info"**)

![default_message](/img/default_message.png)
  
- сообщение об ошибке (**type:"error"**)

![error_message](/img/error_message.png)

- предупреждающее сообщение (**type:"warning"**)

![warning_message](/img/warning_message.png)

Чтобы создать нужный тип сообщения, укажите свойство *type* с соответствующим значением: 

~~~js
// создание окна с ошибкой
gantt.message({type:"error", text:"Invalid data format"});
~~~


[Gantt message types](https://docs.dhtmlx.com/gantt/samples/04_customization/20_message_types.html)


Чтобы изменить стиль окна сообщения, укажите CSS-класс через параметр type, как описано [здесь](guides/message-boxes.md#styling).

### Позиционирование всплывающих сообщений

По умолчанию всплывающие сообщения появляются в правом верхнем углу окна. В отличие от [модальных окон](guides/message-boxes.md#modalmessageboxes), они не блокируют взаимодействие с родительским приложением. Положение можно изменить, установив свойство **gantt.message.position**:

~~~js
gantt.message.position = 'bottom';
~~~


**Related example:** [Message position](https://snippet.dhtmlx.com/tte3rx78)


Доступные значения для position:

- **top** - отображает окно в правом верхнем углу (по умолчанию)
- **bottom** - отображает окно в правом нижнем углу
- **left** - отображает окно слева под Gantt
- **right** - отображает окно справа под Gantt

### Интервал отображения (Expire Interval)

Вы можете настроить, как долго сообщение будет оставаться видимым, используя параметр *expire* - время в миллисекундах до исчезновения окна. По умолчанию - 4000 миллисекунд.

Чтобы изменить продолжительность или отключить автоматическое скрытие, установите другой параметр или значение -1. Если указать -1, сообщение исчезнет только при клике на него.

~~~js
gantt.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### Скрытие сообщения с помощью API

Чтобы вручную скрыть конкретное сообщение до его автоматического исчезновения, используйте метод **gantt.message.hide(boxId)**. Он принимает один параметр:

- **boxId** - идентификатор, который был присвоен окну при создании

~~~js
gantt.message({
    id:"myBox",
    text:"Page is loaded"
});

gantt.message.hide("myBox");
~~~

## Модальные окна

Модальные окна блокируют взаимодействие с родительским приложением до выполнения действия, обычно - нажатия кнопки. Они закрываются по клику по кнопке и при необходимости вызывают функцию обратного вызова.

Существует три типа модальных окон:

- [Alert Message Box](#alert) - окно с одним подтверждающим сообщением;
- [Confirm Message Box](#confirm) - окно с кнопками "OK" и "Cancel" для подтверждения действия;
- [Modalbox](#modal) - модальное окно с любым количеством кнопок.

Общие параметры:

- **id** - идентификатор окна;
- **title** - заголовок;
- **type** - тип окна (например, warning или error);
- **text** - содержимое сообщения;
- **ok** - текст для кнопки "OK";
- **cancel** - текст для кнопки "Cancel" (только для окна подтверждения);
- **callback** - функция, вызываемая при нажатии кнопки, получает *true* или *false* в зависимости от нажатой кнопки;
- **position** - поддерживается только "top"; другие значения выравнивают окно по центру;
- **width** - ширина окна, задаётся через CSS [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или [percentage](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage), например "100px" или "50%";
- **height** - высота окна, задаётся аналогично ширине.

## Окно с сообщением (Alert) (#alert)

![alert](/img/alert.png)

Окно с сообщением содержит кнопку "OK". Текст кнопки можно задать через параметр *ok*:

- короткая форма (только текст сообщения, остальные параметры по умолчанию):

~~~js
gantt.alert("Text");
~~~

- полная форма (можно указать несколько опций, неуказанные параметры примут значения по умолчанию):

~~~js
gantt.alert({
    text:"some text",
    title:"Error!",
    ok:"Yes",
    callback:function(){...}
});
~~~


## Окно подтверждения (Confirm) (#confirm)

![confirm](/img/confirm.png)

Окно подтверждения содержит две кнопки: "OK" и "Cancel". Их текст задаётся через соответствующие параметры.

- короткая форма:

~~~js
gantt.confirm("ConfirmText");
~~~

- полная форма:

~~~js
gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        gantt.message("Result: "+result);
    }
});
~~~


## Модальное окно (Modalbox) (#modal)

![modalbox](/img/modalbox.png)

Модальные окна обладают особыми возможностями:

- их *text* может содержать любой *HTML*;
- могут содержать любое количество кнопок, определённых в массиве *buttons*, где указываются подписи кнопок;
- функция *callback* получает индекс нажатой кнопки.

~~~js
gantt.modalbox({
    title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        gantt.alert(result);
    }
});
~~~


### Настройка кнопок modalbox (#configuringmodalboxbuttons)

Существует два основных способа настройки кнопок modalbox:

- короткая форма:

~~~js
gantt.modalbox({
    // другие параметры
    buttons:["Save", "Delete", "Cancel"],
    callback: function(result){
           switch(result){
            case "0":
                //Save
                break;
            case "1":
                //Delete
                break;
            case "2":
                //Cancel
                break;
        }    
    }
});
~~~

В этой форме callback получает строковой индекс нажатой кнопки ("0", "1", "2" и т.д.). Каждая кнопка получает CSS-класс на основе её подписи в нижнем регистре, например, *gantt_**save**_button*, *gantt_**delete**_button*, *gantt_**cancel**_button*.

Вы можете стилизовать кнопки с помощью этих классов:

~~~js
.gantt_delete_button div{
    background:red;
}
~~~

Если несколько всплывающих окон используют одну и ту же подпись кнопки, но требуют разного оформления, можно использовать параметр **type**:

~~~js
gantt.modalbox({
    // другие параметры
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

**type** добавляется с префиксом "gantt_" как класс к элементу popup:

~~~js
.gantt_special_popup .gantt_delete_button div{
      background:red;
}
~~~

- полная форма:

Можно явно задать CSS-классы кнопок и значения callback с помощью более детальной конфигурации:

~~~js
gantt.modalbox({
    // другие параметры
    buttons: [
        { label:"Save",   css:"link_save_btn",   value:"save" },
        { label:"Cancel", css:"link_cancel_btn", value:"cancel" },
        { label:"Delete", css:"link_delete_btn", value:"delete" }
    ],
    callback: function(result){
        switch(result){
            case "save":
                //Save
                break;
            case "cancel":
                //Cancel
                break;
            case "delete":
                //Delete
                break;
        }
    }
});
~~~

**label** обязателен, а **css** и **value** - опциональны. Если они не указаны, CSS-класс и значение вычисляются по подписи и индексу кнопки, как в короткой форме.

CSS-класс добавляется с префиксом "gantt_" к кнопке:

~~~js
.gantt_link_delete_btn div{
      background:red;
}
~~~


## Скрытие модальных окон

Чтобы вручную закрыть модальное окно, используйте метод **gantt.modalbox.hide()**, передав контейнер modalbox:

~~~js
var box = gantt.modalbox({    
    title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        gantt.alert(result);
    }
});

gantt.modalbox.hide(box);
~~~

Для модальных окон **alert** и **confirm** также используется метод **gantt.modalbox.hide()**:

~~~js
var box = gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        gantt.message("Result: "+result);
    }
});

gantt.modalbox.hide(box);
~~~

## Как Gantt работает с кнопками modalbox

По умолчанию имена кнопок - это просто текст. Если имя кнопки задано как HTML-элемент (например, с жирным шрифтом или иконкой), функция обратного вызова при клике по кнопке вернёт *null*.

Это происходит потому, что Gantt отслеживает определённые атрибуты у родительского элемента нажатого объекта. Если ожидаемых атрибутов нет, Gantt возвращает *null*. Кроме того, Gantt оборачивает все элементы, которые вы указываете для кнопок, в теги `<div>`.

То есть, если вы возвращаете строковый элемент при клике по тексту, его родитель - пустой `<div>`, что приводит к результату `null`. Однако при клике по кнопке вне текста родительский элемент содержит необходимые атрибуты, и callback возвращает ожидаемые значения:

- *true/false* для окон подтверждения
- для modalbox:
  - индекс элемента в массиве (для [короткой формы](#configuringmodalboxbuttons))
  - значение параметра `value` (для [полной формы](#configuringmodalboxbuttons))
  
Это означает, что если вы хотите использовать HTML-элемент в качестве имени кнопки, его нужно обернуть в два `<div>`, оба с атрибутом `data-result`. Например:

~~~js
gantt.confirm({
    ok:`<div data-result="yes"><div data-result="yes"><i>Yes</i></div></div>`,
    cancel:`<div data-result="no"><div data-result="no"><i>No</i></div></div>`,
});

gantt.modalbox({
  buttons: [
   { label:`<div data-result="yes">
           <div data-result="yes"><i>Yes</i></div>
     </div>`,   
     css:"link_save_btn", value:"yes" },
   { label:`<div data-result="no">
           <div data-result="no"><i>No</i></div>
     </div>`, 
     css:"link_cancel_btn", value:"no" },
   { label:`<div data-result="cancel">
           <div data-result="cancel"><i>Cancel</i></div>
     </div>`, 
     css:"link_cancel_btn", value:"cancel" },
  ],
});
~~~

Если вы хотите использовать другие элементы для кнопки, убедитесь, что все родительские элементы также имеют атрибут `data-result`. В примере ниже для имени кнопки используются теги `<u>`, и у них, как и у двух родительских `<div>`, есть атрибут `data-result`:

~~~js
gantt.confirm({
  ok:`<div data-result="yes">
      <div data-result="yes"><u data-result="yes"><i>Yes</i></u></div>
  </div>`,
  cancel:`<div data-result="no">
      <div data-result="no"><u data-result="no"><i>No</i></u></div>
  </div>`,
});

gantt.modalbox({
  buttons: [
    { label:`<div data-result="yes">
        <div data-result="yes">
            <u data-result="yes"><i>Yes</i></u>
           </div>
      </div>`,   
      css:"link_save_btn",  value:"yes" },
    { label:`<div data-result="no">
        <div data-result="no">
            <u data-result="no"><i>No</i></u>
        </div>
      </div>`, 
      css:"link_cancel_btn", value:"no" },
    { label:`<div data-result="cancel">
        <div data-result="cancel">
            <u data-result="cancel"><i>Cancel</i></u>
        </div>
      </div>`, 
      css:"link_cancel_btn", value:"cancel" },
  ],
});
~~~

## Стилизация

Вы можете настроить внешний вид любого message box, определив собственные стили. Обычно для этого вы указываете CSS-класс через параметр *type*: создаёте CSS-класс и присваиваете его имя этому параметру.

Вот несколько важных моментов, которые следует учитывать при установке параметра 'type':

- Чтобы применить CSS-класс к alert и confirm box, инициализируйте окно с помощью метода, связанного с окном ('window-related').
- Чтобы применить CSS-класс к message box, инициализируйте окно с помощью 'common' метода.
- Имена CSS-классов должны начинаться с префикса 'gantt-'.
- Чтобы стиль применился корректно, используйте селектор вида **.gantt-some div** для выбора элементов внутри Gantt message.

~~~js
<style type="text/css">
.gantt-myCss div{
    font-weight:bold;
    color:wheat;
    background-color:crimson;
}
</style>


gantt.message({ type:"myCss", text:"some text" });
~~~


**Related example:** [Styling message boxes](https://snippet.dhtmlx.com/p950vym3)


## Модальные окна и взаимодействие с клавиатурой

Поддержка клавиатуры для модальных окон регулируется свойством **gantt.message.keyboard**, которое по умолчанию включено (*true*).

По умолчанию модальные окна блокируют события клавиатуры на странице, кроме некоторых клавиш:

- "space" и "enter" устанавливают результат модального окна в *true*
- "escape" устанавливает результат модального окна в *false*

Если установить **gantt.message.keyboard** в *false*, события клавиатуры больше не блокируются, и эти клавиши не будут вызывать действие модального окна:

~~~js
gantt.message.keyboard = false; 
gantt.modalbox({...});
~~~

Это позволяет полноценно использовать клавиатуру, например, для ввода текста в поля внутри модальных окон.

