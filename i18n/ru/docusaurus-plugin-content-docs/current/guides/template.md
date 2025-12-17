---
title: "Контрол Template"
sidebar_label: "Контрол Template"
---

Контрол Template
=====================================

Это контейнер, который содержит некоторый HTML-контент внутри.

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


Инициализация
-----------------

Чтобы добавить контрол **template** в лайтбокс, выполните следующие действия:

1) Добавьте секцию в конфигурацию лайтбокса:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

2) Задайте метку для секции:

~~~js
gantt.locale.labels.section_template = "Details";
~~~

3) Заполните содержимое контрола с помощью события, например, события [onBeforeLightbox](api/event/onbeforelightbox.md):

~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
      var task = gantt.getTask(id);
       task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});
~~~


Свойства
--------------

Ниже приведены основные свойства, часто используемые с контролом **template** (полный список смотрите [здесь](api/config/lightbox.md)):

- **name** - (*string*) задаёт имя секции 
- **height** - (*number*) устанавливает высоту секции
- **map_to** - (*string*) свойство данных, к которому привязана секция
- **type** - (*string*) определяет тип [контрола секции](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установлено в *true*, секция получает фокус при открытии лайтбокса

