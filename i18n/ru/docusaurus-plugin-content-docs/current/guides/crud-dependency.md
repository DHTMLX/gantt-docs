---
title: "Добавление, обновление и удаление связей"
sidebar_label: "Добавление, обновление и удаление связей"
---

# Добавление, обновление и удаление связей

В этом разделе описаны основы работы с зависимостями: создание, удаление и обновление свойств связей "на лету".

## Добавление новой связи {#addinganewlink}

Чтобы добавить новую связь в Gantt, используйте метод [addLink](api/method/addlink.md):

~~~js
var linkId = gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:"1"
});
~~~

## Обновление свойства связи {#updatingalinksproperty}

Для динамического изменения свойства связи удобно использовать метод [refreshLink](api/method/refreshlink.md):

~~~js
var links= gantt.config.links;
var link = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}

if (link.type == links.finish_to_start){/*!*/ 
    link.type = links.finish_to_finish;/*!*/ 
    gantt.refreshLink(1); /*!*/ 
}/*!*/ 
~~~

Если требуется обновить все связи на диаграмме Gantt одновременно, используйте метод [refreshData](api/method/refreshdata.md):

~~~js
var links= gantt.config.links;

var link1 = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}
var link2 = gantt.getLink(2);//->{id:2,source:4, target:5, type:"0"}

if (link1.type == links.finish_to_finish){/*!*/ 
    gantt.refreshData()/*!*/ 
}/*!*/ 
~~~

:::note
Имейте в виду, что все типы зависимостей связей определяются в объекте [links](api/config/links.md)
:::

## Удаление связи {#deletingalink}

Для удаления связи используется метод [deleteLink](api/method/deletelink.md):

~~~js
gantt.deleteLink(linkId);
~~~

## Удаление всех связей из Gantt {#removingalllinksfromtheganttchart}

Чтобы полностью очистить диаграмму Gantt от задач и связей, просто вызовите метод [clearAll](api/method/clearall.md):

~~~js
gantt.clearAll();
~~~

## Редактирование свойств связи через интерфейс {#editinglinkvaluesfromui}

Встроенного интерфейса для редактирования лагов или других свойств связей нет. Если вам нужен такой интерфейс, его потребуется реализовать самостоятельно.

Обычно это делается следующим образом:

- подписка на событие [onLinkDblClick](api/event/onlinkdblclick.md);
- предотвращение стандартного поведения;
- отображение всплывающего окна из обработчика события.

Для всплывающего окна можно использовать как [встроенные popups](guides/message-boxes.md), так и собственную реализацию.

Ниже приведён пример реализации всплывающего окна для редактирования лага:

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


**Related example:** [Edit-lag Popup](https://snippet.dhtmlx.com/2208ic0t)

