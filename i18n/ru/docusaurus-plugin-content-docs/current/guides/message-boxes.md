---
title: "Всплывающие сообщения и модальные окна"
sidebar_label: "Всплывающие сообщения и модальные окна"
---

# Сообщения во всплывающих окнах и модальные окна

Сообщения используются в Gantt Chart для уведомления пользователя об ошибке, подтверждения или отказа от действия, выбора одного из вариантов и так далее.  
Сообщения Gantt Chart основаны на форке репозитория dhtmlxMessage.  
Таким образом, вся функциональность dhtmlxMessage актуальна для сообщений dhtmlxGantt.

Существует два основных типа сообщений: [простое всплывающее сообщение](guides/message-boxes.md#basic-popup-message) и [модальное окно сообщения](guides/message-boxes.md#modal-message-boxes) с кнопками, которые блокируют работу приложения.

Модальное окно сообщения может относится к одному из трёх возможных типов:

- [Оповещающее окно](#alert)
- [Окно подтверждения](#confirm)
- [Modalbox](#modal)


## Базовое всплывающее сообщение

Чтобы создать базовое всплывающее сообщение, используйте метод [gantt.message](api/method/message.md). Обязательный параметр метода — текст сообщения:

~~~js
gantt.message("The task is updated");
~~~

Существует три типа окон сообщения:

- дефолтное окно сообщения (**type:"info"**)

![default_message](/img/default_message.png)

- окно ошибки (**type:"error"**)

![error_message](/img/error_message.png)

- окно-предупреждение (**type:"warning"**)

![warning_message](/img/warning_message.png)

Чтобы создать нужное окно сообщения, необходимо определить свойство *type* с соответствующим значением: 

~~~js
// создание окна ошибки
gantt.message({type:"error", text:"Invalid data format"});
~~~

[Gantt message types](https://docs.dhtmlx.com/gantt/samples/04_customization/20_message_types.html)

Чтобы применить к окну сообщения различные стили, нужно указать CSS‑класс через параметр type, как описано [здесь](guides/message-boxes.md#styling).

### Размещение окон сообщений

По умолчанию всплывающее окно сообщения появляется в правом верхнем углу окна. Оно не блокирует работу родительского приложения, в отличие от [модальных окон сообщения](guides/message-boxes.md#modal-message-boxes), которые накладываются на родительское приложение и блокируют его работу. Вы можете изменить положение окна сообщения, используя свойство **gantt.message.position**:

~~~js
gantt.message.position = 'bottom';
~~~

**Related sample**  [Message position](https://snippet.dhtmlx.com/tte3rx78)

Существуют четыре возможных значения для положения окна сообщения:

- **top** - отображает окно сообщения в правом верхнем углу окна, установлено по умолчанию

- **bottom** - отображает окно сообщения в правом нижнем углу окна

- **left** -  отображает окно сообщения слева от окна под Gantt

- **right** - отображает окно сообщения справа от окна под Gantt

### Интервал истечения

Можно настроить интервал истечения для окна сообщения с помощью параметра *expire*. Это период времени после окончания которого окно сообщения исчезает (в миллисекундах). По умолчанию интервал истечения равен 4000 миллисекунд.

Вы можете изменить это значение или вообще отключить период истечения, установив expire в "-1". В этом случае окно сообщения исчезнет только по клику мыши.

~~~js
gantt.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### Скрытие окна сообщения через API

Чтобы вручную скрыть указанное окно сообщения и не ждать его автоматического исчезновения, можно воспользоваться методом **gantt.message.hide(boxId)**. Он принимает один параметр:

- **boxId** - идентификатор окна, заданный в конструкторе окна

~~~js
gantt.message({
    id:"myBox",
    text:"Page is loaded"
});

gantt.message.hide("myBox");
~~~


## Модальные окна сообщения

Модальные окна сообщения блокируют работу родительского приложения, пока не будет выполнено необходимое действие (обычно нажатие кнопки). Они закрываются по клику на кнопку и вызову callback‑функции, если она присутствует.

Существует три типа модальных окон сообщения:

- [Оповещающее окно](#alert) - окно оповещения с одной кнопкой;
- [Окно подтверждения](#confirm) - окно подтверждения с двумя кнопками (для подтверждения или отмены); 
- [Modalbox](#modal) - модальное окно сообщения с неограниченным количеством кнопок. 

Общие свойства окон:

- **id** - идентификатор окна сообщения;
- **title** - текст заголовка;
- **type** - тип окна сообщения (предупреждение или ошибка);
- **text** - текст тела окна сообщения; 
- **ok** - текст кнопки "OK";
- **cancel** - текст кнопки "Cancel" (для окна подтверждения);
- **callback** - функция, вызываемая при нажатии на кнопку. Принимает *true* или *false* в зависимости от нажатой кнопки;
- **position** - на данный момент поддерживает только одно значение - "top", другое значение приведёт к выравниванию по центру;
- **width**    - ширина модального окна (задается как CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) значения, например, "100px", "50%");
- **height** - высота модального окна (задается как CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) значения, например, "100px", "50%").

## Оповещающее окно {#alert}

![alert](/img/alert.png)

Опoвещающее окно содержит кнопку "OK". Чтобы задать текст кнопки "OK", используйте параметр *ok* с текстовым значением:

- короткая форма (содержит только текст сообщения — не требует указания других параметров):

~~~js
gantt.alert("Text");
~~~

- полная форма (содержит несколько доступных параметров. Непоставленные параметры получают значения по умолчанию)

~~~js
gantt.alert({
    text:"some text",
    title:"Error!",
    ok:"Yes",
    callback:function(){...}
});
~~~


## Окно подтверждения {#confirm}

![confirm](/img/confirm.png)

Окно подтверждения имеет две кнопки: кнопку "OK" и кнопку "Cancel". Текст кнопок определяется в свойствах с соответствующими именами. 


- короткая форма

~~~js
gantt.confirm("ConfirmText");
~~~


- полная форма

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


## Modalbox {#modal}

![modalbox](/img/modalbox.png)

Modalbox имеет несколько особенностей:

- его *text* может содержать любой *HTML* контент;
- у него может быть много кнопок, указанных в массиве *buttons*, содержащих текстовые значения кнопок;
- функция *callback* принимает индекс выбранной кнопки в качестве параметра.

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


### Настройка кнопок modalbox

Существует два основных способа определения конфигурации кнопок modalbox:

- краткая форма: 

~~~js
gantt.modalbox({
    // другие настройки
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


Результатом вызова callback будет строковое представление индекса нажатой кнопки из массива ("0", "1", "2",...). Каждая кнопка получит CSS‑класс из своей подписи, приведённой к нижнему регистру, например gantt_save_button, gantt_delete_button, gantt_cancel_button. 

Эти классы можно использовать для стилизации кнопок:

~~~js
.gantt_delete_button div{
    background:red;
}
~~~


В случае, если одно и то же имя кнопки используется несколькими попапами и их нужно стилизовать по-разному, можно использовать конфигурацию **type**:

~~~js
gantt.modalbox({
    // другие настройки
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

Значение **type** будет префиксироваться строкой "gantt_" и добавлено в качестве имени класса к элементу попапа:

~~~js
.gantt_special_popup .gantt_delete_button div{
      background:red;
}
~~~


- полная форма:

CSS‑классы кнопок и значения callback можно задать явно, используя более длинную форму конфигурации:

~~~js
gantt.modalbox({
    // другие настройки
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


Параметр **label** обязателен, в то время как параметры **css** и **value** можно опустить. Отсутствующие параметры будут рассчитаны как в краткой форме конфигурации кнопок: CSS будет наследоваться от метки кнопки в нижнем регистре, а индекс кнопки будет использоваться в качестве значения.

Префикс класса будет добавляться к строке "gantt_" и добавлен как класс к элементу кнопки:

~~~js
.gantt_link_delete_btn div{
      background:red;
}
~~~


## Скрытие Modal Message Boxes

Чтобы вручную скрыть модальное окно сообщения, можно использовать метод **gantt.modalbox.hide()**. В качестве параметра он принимает div‑контейнер modalbox:

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


Для модальных окон alert и confirm также нужно использовать метод **gantt.modalbox.hide()**:

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


## Как Gantt работает с кнопками Modalbox

По умолчанию имена кнопок устанавливаются как текст. Если имя кнопки задано как HTML‑элемент (например, чтобы сделать шрифт жирным или добавить иконку material),
результатом вызова callback при клике по кнопке будет *null*. 

Это происходит потому, что Gantt отслеживает некоторые атрибуты родителя нажатого элемента. Если ожидаемых атрибутов нет, Gantt вернёт *null*. Кроме того, Gantt оборачивает все элементы, которые вы указываете для кнопок, в теги `<div>`.

Таким образом, если вы возвращаете строковый элемент, когда кликаете по тексту, его родитель будет пустым элементом `<div>`, и вы получите `null`. Но когда кнопка нажата вне текста, её родитель — элемент со всеми необходимыми атрибутами, поэтому вы получите более ожидаемый результат:

- *true/false* для окна подтверждения
- для modalbox:
    - номер элемента в массиве (для [краткой формы](#configuring-modalbox-buttons))
    - значение параметра `value` (для [полной формы](#configuring-modalbox-buttons))

Это значит, что если вы хотите использовать HTML‑элемент в качестве имени кнопки, вам нужно обернуть всё в два div‑элемента, у которых есть атрибут `data-result`. Например:

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

Если нужно использовать другие элементы для кнопки, все родительские элементы также должны иметь атрибут `data-result`. В приведённом сниппете ниже
теги `<u>` используются для имени кнопки. Соответственно, они имеют атрибут `data-result` так же, как и два других родительских элемента `<div>` кнопки:

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


## Styling

Для любого типа окна сообщения можно определить собственный стиль, чтобы добиться нужного внешнего вида. Обычно соответствующий CSS‑класс задаётся через параметр *type*: вы определяете CSS‑класс и устанавливаете параметр в его название.

Есть несколько правил, связанных с настройкой параметра 'type', которые стоит учитывать:

- Чтобы задать CSS‑класс для оповещающих и окон подтверждения, вы должны инициализировать такое окно способом, связанным с окном (window‑related).
- Чтобы задать CSS‑класс для окон сообщения, необходимо инициализировать такое окно обычным способом ('common').
- Имя CSS‑класса должно начинаться с префикса 'gantt-'.
- Чтобы стиль применялся корректно, нужно использовать имя класса в виде **.gantt-some div**, чтобы указать, что он предназначен для элемента внутри сообщения Gantt. 

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


**Related sample** [Styling message boxes](https://snippet.dhtmlx.com/p950vym3)

## Модальные окна и взаимодействие с клавиатурой

Клавиатурная функциональность для модальных окон управляется свойством **gantt.message.keyboard**. Изначально установлено значение *true*. 

По умолчанию модальные окна блокируют клавиатурные события на странице. Единственные доступные клавиши:

- "space" и "enter" — устанавливают значение *true* как результат модального окна;
- "escape" — устанавливает значение *false* как результат модального окна.

Установив свойство **keyboard** в *false*, вы включите клавиатурные события (и отключите вышеупомянутые клавиши):

~~~js
gantt.message.keyboard = false; 
gantt.modalbox({...});
~~~

Это позволяет полноценно использовать клавиатуру, например для ввода значений в поля внутри модальных окон.