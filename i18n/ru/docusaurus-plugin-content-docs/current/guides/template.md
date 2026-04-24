---
title: "Контрол Template"
sidebar_label: "Контрол Template"
---

# Управление шаблоном

Контейнер с некоторым HTML-контентом внутри.

![template_control](/img/template_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.locale.labels.section_template = "Details";

gantt.attachEvent("onBeforeLightbox", function(id) {
      var task = gantt.getTask(id);
       task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});
~~~

[Template control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/05_template.html)


## Инициализация

Чтобы добавить элемент управления **template** в lightbox, выполните следующие шаги:

1) Добавьте раздел в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

2) Установите подпись к разделу:

~~~js
gantt.locale.labels.section_template = "Details";
~~~

3) Установите содержимое элемента управления с помощью некоторого события, например события [onBeforeLightbox](api/event/onbeforelightbox.md):

~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
      var task = gantt.getTask(id);
       task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});
~~~


## Свойства

Ниже приведённые свойства являются наиболее важными и обычно устанавливаются для элемента управления **template** (см. полный список [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя раздела 
- **height** - (*number*) высота раздела
- **map_to** - (*string*) имя свойства данных, которое будет сопоставлено с разделом
- **type** - (*string*) тип [контроля секции](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установлен в *true*, раздел будет получать фокус при открытии lightbox