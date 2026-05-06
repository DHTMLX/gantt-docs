---
title: "Добавление/Обновление/Удаление связей" 
sidebar_label: "Добавление/Обновление/Удаление связей" 
---

# Добавление/Обновление/Удаление связей

В этой главе вы узнаете, как выполнять базовые операции со связями зависимостей: создать или удалить связь, 
динамически обновлять свойство связи. 


## Добавление новой связи

Чтобы добавить новую связь на диаграмме Gantt, используйте метод [addLink](api/method/addlink.md):

~~~js
var linkId = gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:"1"
});
~~~


## Динамическое обновление свойства связи

Чтобы динамически обновить свойство объекта связи, используйте метод [refreshLink](api/method/refreshlink.md):

~~~js
var links= gantt.config.links;
var link = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}

if (link.type == links.finish_to_start){/*!*/ 
    link.type = links.finish_to_finish;/*!*/ 
    gantt.refreshLink(1); /*!*/ 
}/*!*/ 
~~~

Примечание, чтобы обновить все связи на диаграмме Gantt сразу, используйте метод [refreshData](api/method/refreshdata.md):

~~~js
var links= gantt.config.links;

var link1 = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}
var link2 = gantt.getLink(2);//->{id:2,source:4, target:5, type:"0"}

if (link1.type == links.finish_to_finish){/*!*/ 
    gantt.refreshData()/*!*/ 
}/*!*/ 
~~~

:::note
Замечание: все типы зависимостей связей хранятся в объекте [links](api/config/links.md)
:::

## Удаление связи

Чтобы удалить связь, используйте метод [deleteLink](api/method/deletelink.md):

~~~js
gantt.deleteLink(linkId);
~~~


## Удаление всех связей с диаграммой Gantt

Чтобы очистить диаграмму Gantt от всех задач и связей, вызовите метод [clearAll](api/method/clearall.md):

~~~js
gantt.clearAll();
~~~


## Редактирование значений связи через пользовательский интерфейс

Нет встроенного интерфейса пользователя для редактирования задержки (lag) или любых других свойств связи. Поэтому, если вам нужен пользовательский интерфейс, его необходимо реализовать вручную.

Распространенный подход предполагает выполнение следующих шагов:

- перехватить событие [onLinkDblClick](api/event/onlinkdblclick.md); 
- отменить обработчик по умолчанию; 
- отобразить всплывающее окно из обработчика события.

На последнем шаге можно либо использовать встроенные всплывающие окна [встроенные попапы](guides/message-boxes.md) или реализовать какое-то собственное решение.

Ниже приводится пример кода реализации popup редактирования задержки (edit-lag):

~~~js
(function(){
    var modal;
    var editLinkId;

    function endPopup(){
        modal = null;
        editLinkId = null;
    }
    function cancelEditLink(){
        endPopup();
    }

    function deleteLink(){
        gantt.deleteLink(editLinkId);
        endPopup();
    }

    function saveLink(){
        var link = gantt.getLink(editLinkId);

        var lagValue = modal.querySelector(".lag-input").value;
        if(!isNaN(parseInt(lagValue, 10))){
            link.lag = parseInt(lagValue, 10);
        }

        gantt.updateLink(link.id);
        if(gantt.autoSchedule){
            gantt.autoSchedule(link.source);
        }
        endPopup();
    }
    gantt.attachEvent("onLinkDblClick", function(id,e){
        editLinkId = id;
        var link = gantt.getLink(id);
        var linkTitle = gantt.getTask(link.source).text + " -> " + 
            gantt.getTask(link.target).text;

        modal = gantt.modalbox({
            title: linkTitle,
            text: "<div>" +
                    "<label>Lag <input type='number' class='lag-input' /></label>" +
                "</div>",
            buttons: [
                {label:"Save", value:"save"},
                {label:"Cancel", value:"cancel"},
                {label:"Delete", value:"delete"}
            ],
            width: "500px",
            callback: function(result){
                switch(result){
                    case "save":
                        saveLink();
                        break;
                    case "cancel":
                        cancelEditLink();
                        break;

                    case "delete":
                        deleteLink();
                        break;
                }
            }
        });

        modal.querySelector(".lag-input").value = link.lag || 0;

        return false;
    });
})();
~~~


**Связанный пример** [Редактирование задержки (Edit-lag Popup)](https://snippet.dhtmlx.com/2208ic0t)