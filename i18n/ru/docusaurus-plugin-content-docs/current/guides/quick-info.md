---
title: "Быстрая информация (Поддержка касаний)"
sidebar_label: "Быстрая информация (Поддержка касаний)"
---

# Краткая информация (Поддержка касания)

Библиотека включает расширение **Quick Info**, которое позволяет отображать всплывающее окно с деталями задачи, когда пользователь касается задачи на экране. 

![quick_info](/img/quick_info.png)


[Расширение Quick Info](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)


Чтобы начать использовать расширение, включите плагин ["Quick Info"](guides/extensions-list.md#quick-info) с помощью метода [gantt.plugins](api/method/plugins.md) .

~~~js
gantt.plugins({
    quick_info: true
});
~~~

Чтобы отключить расширение **quick_info**, установите свойство [show_quick_info](api/config/show_quick_info.md) в *false*:

~~~js
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

## Обзор API

Расширение Quick Info предоставляет набор API, который позволяет управлять настройками Quick Info, контролировать его поведение или изменять внешний вид всплывающего окна.


Вы можете использовать либо API объекта [gantt.ext.quickInfo](guides/quick-info.md#quickinfoobject) или публичный API dhtmlxGantt, перечисленный ниже:

**Методы**

- [showQuickInfo](api/method/showquickinfo.md) - отображает всплывающую форму задачи для указанной задачи
- [hideQuickInfo](api/method/hidequickinfo.md) - скрывает всплывающую форму задачи (если она в данный момент активна)

**События**

- [onQuickInfo](api/event/onquickinfo.md) - срабатывает, когда появляется всплывающая форма редактирования
- [onAfterQuickInfo](api/event/onafterquickinfo.md) - срабатывает после закрытия всплывающей формы редактирования

**Свойства**

- [quick_info_detached](api/config/quick_info_detached.md) - определяет, будет ли форма задачи появляться слева/справа от экрана или рядом с выбранной задачей
- [quickinfo_buttons](api/config/quickinfo_buttons.md) - хранит коллекцию кнопок, размещённых во всплывающей форме деталей задачи

**Шаблоны**

- [quick_info_class](api/template/quick_info_class.md) - задаёт CSS-класс, который будет применён к всплывающей форме редактирования
- [quick_info_content](api/template/quick_info_content.md) - задаёт содержимое всплывающей формы редактирования
- [quick_info_date](api/template/quick_info_date.md) - задаёт дату во всплывающей форме редактирования
- [quick_info_title](api/template/quick_info_title.md) - задаёт заголовок во всплывающей форме редактирования

## Объект QuickInfo {#quickinfoobject}

Стандартное поведение расширения **Quick Info** подразумевает, что всплывающее окно будет автоматически появляться над выбранной задачей.

Начиная с версии v7.0 функциональность Quick Info расширяется; добавлен объект [gantt.ext.quickInfo](guides/quickinfo-ext.md), который предоставляет методы для ручного управления всплывающим окном.

Методы, доступные через объект **gantt.ext.quickInfo**, следующие:

- **show()** - отображает окно Quick Info для указанной задачи. Принимает один параметр:
    - **id** - (*string|number*) идентификатор задачи/ссылки/ресурса
- **show()**  - отображает окно Quick Info в конкретных координатах. Параметры:
    - **top** - (*number*) координата X
    - **left** - (*number*) координата Y
- **hide()** - скрывает всплывающее окно Quick Info. Методу можно передать один необязательный параметр:
    - **[ force ]** - (*boolean*) определяет, исчезнет ли Quick Info немедленно, когда [gantt.config.quick_info_detached](api/config/quick_info_detached.md) установлен в *false*. Указание *true* в качестве параметра метода **hide** удалит всплывающее окно немедленно, в противном случае окно исчезнет после короткой анимации.
- **setContainer()** - устанавливает контейнер, в котором будет отображаться QuickInfo. 
    - **container** - (*string|HTMLElement*) контейнер QuickInfo. Если не указан пользовательский контейнер, QuickInfo будет размещён в первом найденном узле: **gantt.$task, gantt.$grid, gantt.$layout**
- **getNode()** - возвращает HTMLElement всплывающего окна Quick Info. Вернёт *null*, если Quick Info не инициализирован.
- **setContent(config)** - (*object*) помещает содержимое в Quick Info. Принимает конфигурационный объект Quick Info в качестве параметра. 


Структура *конфигурационного объекта* имеет следующую форму:
    - **taskId** - (*string|number*) необязательно, идентификатор задачи, к которому будут привязаны кнопки действий Quick Info
    - **header** - необязательно, заголовок всплываемой формы редактирования, который может включать:
        - **title** - (*string*) необязательно, заголовок всплываемой формы редактирования
        - **date** - (*string*) необязательно, дата во всплываемой форме редактирования
    - **content** - (*string*) необязательно, содержимое всплывающей формы редактирования
    - **buttons** - (*string[]*) необязательно, кнопки, размещаемые во всплывающей форме редактирования


Если ни заголовок, ни кнопки не указаны, соответствующие области всплывающего окна Quick Info будут скрыты.

#### **Показ Quick Info**

Вы можете показать всплывающее окно для указанной задачи, ссылки, панели ресурсов или задать другое положение на экране, где будет отображаться окно, с помощью метода **gantt.ext.quickInfo.show()**:

~~~js
// показываем всплывающее окно для указанной задачи
var task = gantt.getTask(10);
gantt.ext.quickInfo.show(task.id);

// показываем всплывающее окно в заданных координатах
gantt.ext.quickInfo.show(100, 200);
~~~

Пример показа всплывающего окна для ресурса приведён ниже:

~~~js
const quickInfo = gantt.ext.quickInfo;
gantt.attachEvent("onGanttReady", function(){
    quickInfo.setContainer(document.body);
})

gantt.attachEvent("onEmptyClick", function (e) {
  const domHelpers = gantt.utils.dom;
  const resourceElement = domHelpers.closest(e.target, "[data-resource-id]");
  if(resourceElement){
    const resourceId = resourceElement.getAttribute("data-resource-id");
    const resource = gantt.$resourcesStore.getItem(resourceId);
    const position = resourceElement.getBoundingClientRect();
    quickInfo.show(position.right, position.top);

    const assignedTasks = gantt.getResourceAssignments(resourceId).map(function(assign){
        return gantt.getTask(assign.task_id).text;
    });

    quickInfo.setContent({
        header: {
        title: resource.text,
        date: ""
    },
        content: "Assigned tasks: " + assignedTasks.join(", "),
        buttons: []
    });
  }
});
~~~

И пример показа всплывающего окна для указанной ссылки:

~~~js
const quickInfo = gantt.ext.quickInfo;
gantt.attachEvent("onLinkClick", function(id,e){
    //любая произвольная логика здесь
    const link = gantt.getLink(id);
    const linksFormatter = gantt.ext.formatters.linkFormatter();

    const domHelpers = gantt.utils.dom;
    const position = domHelpers.getRelativeEventPosition(e, gantt.$task_data);

    const sourceTask = gantt.getTask(link.source);
    const targetTask = gantt.getTask(link.target);
    quickInfo.show(position.x, position.y);

    let linkDescr = "";

    if (link.type === gantt.config.links.start_to_start){
        linkDescr = "Start to start";
    } else if (link.type === gantt.config.links.start_to_finish){
        linkDescr = "Start to finish";
    } else if (link.type === gantt.config.links.finish_to_finish){
        linkDescr = "Finish to Finish";
    } else {
        linkDescr = "Finish to start";
    }

    quickInfo.setContent({
        header: {
            title: `${linkDescr} link`,
            date: ""
        },
        content: `Source: ${sourceTask.text}


                    Target: ${targetTask.text}`,
        buttons: []
    });
});
~~~

#### **Скрыть Quick Info**

Чтобы скрыть форму редактирования поп-апа, используйте метод **gantt.ext.quickInfo.hide()**. Метод зависит от конфигурации **gantt.config.quick_info_detached** и предполагает два возможных варианта:

- когда вызывается без параметров, всплывающая форма редактирования будет скрыта с экрана после короткой анимации 

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// скрыть всплывающее окно после короткой анимации
gantt.ext.quickInfo.hide();
~~~

- если вы хотите скрыть Quick Info мгновенно, передайте *true* в качестве параметра методу **hide**:

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// скрыть всплывающее окно мгновенно
gantt.ext.quickInfo.hide(true);
~~~

Замечание: если конфигурация **gantt.config.quick_info_detached** установлена в *true*, метод всегда будет скрывать всплывающее окно немедленно.

#### **Создание пользовательского QuickInfo**

По умолчанию всплывающее окно Quick Info содержит заголовок, дату, содержимое, кнопки и выглядит так:

![quick_default](/img/quick_default.png)

Если вы хотите изменить внешний вид всплывающего окна редактирования или создать своё, вы можете определить желаемое HTML-содержимое через метод **gantt.ext.quickInfo.setContent()**:

~~~js
gantt.locale.labels.custom_button = "My button"
gantt.ext.quickInfo.setContent({
    header:{
        title: "My custom header",
        date: "18th of February, 2020"
    },
    content: "some content here",
    buttons: ["custom_button"]
})
~~~

В результате на странице появится следующее окно Quick Info:

![quick_custom](/img/quick_custom.png)


#### **Добавление кнопок с пользовательским поведением**

Объект [$click](api/other/click.md) позволяет добавлять пользовательское поведение для кнопок, размещённых во всплывающей форме редактирования:

~~~js
gantt.config.quickinfo_buttons="[""icon_delete","icon_edit","advanced_details_button"]";
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");
 
gantt.$click.buttons.advanced_details_button="function(id){"
    gantt.message("These are advanced details");
    return false; //blocks the default behavior
};
~~~

#### **Установка контейнера для QuickInfo**

Вы можете использовать метод **gantt.ext.quickInfo.setContainer()** чтобы сделать так, чтобы всплывающее окно QuickInfo отображалось в пользовательском контейнере:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.setContainer(document.body); /*!*/
gantt.ext.quickInfo.show(1300,100);
gantt.locale.labels.custom_button = "My button"
gantt.ext.quickInfo.setContent({
    header:{
        title: "My custom header",
        date: "18th of February, 2020"
    },
    content: "some content here",
    buttons: ["custom_button"]
});
~~~

Теперь всплывающее окно с произвольным содержимым будет отрисовано в **document.body** вне контейнера Gantt:

![quick_container](/img/quick_container.png)