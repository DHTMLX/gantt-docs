---
title: "Быстрая информация (Поддержка касаний)"
sidebar_label: "Быстрая информация (Поддержка касаний)"
---

# Быстрая информация (Поддержка касаний)


Библиотека включает расширение **Quick Info**, которое отображает всплывающее окно с деталями задачи при нажатии на задачу на экране.

![quick_info](/img/quick_info.png)


[QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)


Чтобы начать использовать расширение, просто активируйте плагин ["Quick Info"](guides/extensions-list.md#quickinfo) с помощью метода [gantt.plugins](api/method/plugins.md).

~~~js
gantt.plugins({
    quick_info: true
});
~~~

Если вы хотите отключить расширение **quick_info**, установите свойство [show_quick_info](api/config/show_quick_info.md) в *false*:

~~~js
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

## Обзор API


Расширение Quick Info предоставляет набор API для настройки параметров, управления поведением или изменения внешнего вида всплывающего окна.


Вы можете использовать как [API объекта gantt.ext.quickInfo](guides/quick-info.md#quickinfoobject), так и публичный API dhtmlxGantt, перечисленный ниже:

**Методы**

- [showQuickInfo](api/method/showquickinfo.md) - открывает всплывающую форму задачи для определённой задачи
- [hideQuickInfo](api/method/hidequickinfo.md) - закрывает всплывающую форму задачи (если она открыта)

**События**

- [onQuickInfo](api/event/onquickinfo.md) - срабатывает при появлении всплывающей формы редактирования
- [onAfterQuickInfo](api/event/onafterquickinfo.md) - срабатывает после закрытия всплывающей формы редактирования

**Свойства**

- [quick_info_detached](api/config/quick_info_detached.md) - определяет, появляется ли форма задачи рядом с выбранной задачей или с левой/правой стороны экрана
- [quickinfo_buttons](api/config/quickinfo_buttons.md) - содержит коллекцию кнопок внутри всплывающей формы с деталями задачи

**Шаблоны**

- [quick_info_class](api/template/quick_info_class.md) - определяет CSS-класс, применяемый к всплывающей форме редактирования
- [quick_info_content](api/template/quick_info_content.md) - определяет содержимое внутри всплывающей формы редактирования
- [quick_info_date](api/template/quick_info_date.md) - определяет дату, отображаемую во всплывающей форме редактирования
- [quick_info_title](api/template/quick_info_title.md) - определяет заголовок всплывающей формы редактирования

## Объект QuickInfo {#quickinfoobject}

По умолчанию расширение **Quick Info** автоматически показывает всплывающее окно над выбранной задачей.

Начиная с версии 7.0, функциональность Quick Info была расширена объектом [gantt.ext.quickInfo](guides/quickinfo-ext.md), который предоставляет методы для ручного управления всплывающим окном.

Объект **gantt.ext.quickInfo** предлагает следующие методы:

- **show()** - открывает всплывающее окно quick info для определённой задачи. Принимает один параметр:
    - **id** - (*string|number*) id задачи/ссылки/ресурса
- **show()** - открывает всплывающее окно quick info по указанным координатам. Параметры:
    - **top** - (*number*) координата X
    - **left** - (*number*) координата Y
- **hide()** - закрывает всплывающее окно quick info. Принимает необязательный параметр:
    - **[ force ]** - (*boolean*) определяет, будет ли окно закрыто немедленно, если [gantt.config.quick_info_detached](api/config/quick_info_detached.md) установлено в *false*. Если передать *true*, окно исчезнет мгновенно; иначе - плавно с анимацией.
- **setContainer()** - задаёт контейнер, в котором будет отображаться quick info.
    - **container** - (*string|HTMLElement*) контейнер QuickInfo. Если не указан, QuickInfo будет размещён внутри первого найденного узла среди: **gantt.$task, gantt.$grid, gantt.$layout**
- **getNode()** - возвращает HTMLElement всплывающего окна quick info или *null*, если оно не инициализировано
- **setContent(config)** - (*object*) наполняет quick info содержимым. Принимает объект конфигурации со следующей структурой:
    - **taskId** - (*string|number*) необязательно, связывает кнопки действий с определённой задачей
    - **header** - необязательно, заголовок окна, который может включать:
        - **title** - (*string*) необязательно, заголовок окна
        - **date** - (*string*) необязательно, дата во всплывающем окне
    - **content** - (*string*) необязательно, содержимое окна
    - **buttons** - (*string[]*) необязательно, кнопки для отображения во всплывающем окне


Если не указаны ни header, ни buttons, соответствующие секции окна будут скрыты.

####**Отображение Quick Info**

Всплывающее окно можно показать для конкретной задачи, ссылки, панели ресурсов или в произвольном месте экрана с помощью метода **gantt.ext.quickInfo.show()**:

~~~js
// показать окно для определённой задачи
var task = gantt.getTask(10);
gantt.ext.quickInfo.show(task.id);

// показать окно по определённым координатам
gantt.ext.quickInfo.show(100, 200);
~~~

Пример отображения окна для ресурса:

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

Пример отображения окна для определённой связи:

~~~js
const quickInfo = gantt.ext.quickInfo;
gantt.attachEvent("onLinkClick", function(id,e){
    //любая пользовательская логика
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

####**Скрытие Quick Info**

Чтобы закрыть всплывающее окно, используйте метод **gantt.ext.quickInfo.hide()**. Его поведение зависит от настройки **gantt.config.quick_info_detached** и может быть двух вариантов:

- если вызвать без параметров, окно закроется с небольшой анимацией

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// скрыть окно с анимацией
gantt.ext.quickInfo.hide();
~~~

- чтобы закрыть окно мгновенно, передайте *true* в качестве аргумента:

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");

// скрыть окно мгновенно
gantt.ext.quickInfo.hide(true);
~~~

Обратите внимание, что если **gantt.config.quick_info_detached** установлено в *true*, окно всегда закрывается мгновенно.

####**Создание собственного QuickInfo**

По умолчанию всплывающее окно quick info включает заголовок, дату, содержимое и кнопки, и выглядит так:

![quick_default](/img/quick_default.png)

Если вы хотите изменить внешний вид окна или создать своё собственное, вы можете определить HTML-содержимое с помощью **gantt.ext.quickInfo.setContent()**:

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

В результате появится всплывающее окно quick info такого вида:

![quick_custom](/img/quick_custom.png)

####**Добавление пользовательских кнопок с собственной логикой**

Объект [$click](api/other/click.md) позволяет добавить пользовательские действия для кнопок, размещённых во всплывающем окне:

~~~js
gantt.config.quickinfo_buttons="[""icon_delete","icon_edit","advanced_details_button"];
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");
 
gantt.$click.buttons.advanced_details_button="function(id){"
    gantt.message("These are advanced details");
    return false; //блокирует стандартное поведение
};
~~~

####**Указание контейнера для QuickInfo** 

Используйте **gantt.ext.quickInfo.setContainer()**, чтобы отобразить всплывающее окно quick info внутри пользовательского контейнера:

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

Теперь окно с пользовательским содержимым появится внутри **document.body**, вне контейнера Gantt:

![quick_container](/img/quick_container.png)

