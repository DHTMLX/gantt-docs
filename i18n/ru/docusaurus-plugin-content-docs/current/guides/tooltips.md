---
title: "Тултипы для элементов Gantt"
sidebar_label: "Тултипы для элементов Gantt"
---

# Тултипы для элементов Gantt


Тултипы позволяют отображать дополнительную информацию, не перегружая экран лишним текстом. По умолчанию тултипы появляются на задачах Gantt.

![task_tooltip](/img/task_tooltip.png)

Можно [добавлять тултипы к любому элементу Gantt](#tooltipsfordifferentelements) с помощью соответствующего API.


## Активация


Чтобы включить тултипы для задач, просто активируйте плагин **tooltip** через метод [gantt.plugins](api/method/plugins.md):

~~~js
<script>
    gantt.plugins({ /*!*/
        tooltip: true /*!*/
    }); /*!*/

    gantt.init("gantt_here");
</script>
~~~


[Tooltip](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)


После активации расширения тултипы будут отображаться автоматически с настройками по умолчанию.


## Пользовательский текст 


По умолчанию тултип показывает три свойства задачи:

1. Дата начала задачи.
2. Дата окончания задачи.
3. Название задачи.

Если вы хотите изменить текст тултипа, используйте шаблон [tooltip_text](api/template/tooltip_text.md) следующим образом:

~~~js
gantt.templates.tooltip_text = (start, end, task) => 
    `<b>Task:</b> ${task.text}

<b>Duration:</b> ${task.duration}`;
~~~


## API тултипов {#tooltipapi}

### Объект tooltip

Объект тултипа доступен как **gantt.ext.tooltips.tooltip**. Он предоставляет методы для управления позицией, содержимым и видимостью тултипа:

- **getNode()** - возвращает HTML-элемент тултипа  
- **setViewport()** - ограничивает область отображения тултипа границами указанного HTML-элемента
    - **node** - (*HTMLElement*) элемент, внутри которого отображается тултип
- **show()** - показывает тултип в заданных координатах (относительно document.body). Принимает разные параметры в зависимости от способа позиционирования тултипа:
    - Чтобы показать тултип по определённым координатам, передайте: 
        - **left** - (*number*) координата X
        - **top** - (*number*) координата Y 
    - Чтобы показать тултип по координатам события мыши (с учётом *tooltip_offset_x/y* и viewport), передайте:
        - **event** - (*Event*) объект события мыши  
- **hide()** - скрывает тултип
- **setContent()** - задаёт HTML-содержимое тултипа. Принимает:
    - **html** - (*string*) строка с HTML-содержимым


### Методы

Несколько методов позволяют управлять поведением тултипов при наведении на DOM-элементы.

#### gantt.ext.tooltips.attach() {#attach}

добавляет тултип с расширенной конфигурацией. Принимает объект с настройками:

- **selector** - (*string*) CSS-селектор элементов для отслеживания событий мыши
- **onmouseenter** - (*function*) вызывается при наведении мыши на элемент, параметры:
     - **event** - (*Event*) нативное событие мыши
    - **node** -  (*HTMLElement*) элемент
- **onmousemove** - (*function*) вызывается при движении мыши внутри элемента, параметры:
    - **event** - (*Event*) нативное событие мыши
    - **node** -  (*HTMLElement*) элемент
- **onmouseleave** - (*function*) вызывается при уходе мыши с элемента, параметры:    
    - **event** - (*Event*) нативное событие мыши
    - **node** -  (*HTMLElement*) элемент
- **global** - (*boolean*) отслеживать ли события мыши на всей странице (*true*) или только внутри элемента Gantt (*false*). По умолчанию *false*.

#### gantt.ext.tooltips.tooltipFor() {#tooltipfor}

добавляет тултип для конкретного элемента Gantt. Это более простой вариант **attach()**. Принимает объект с параметрами тултипа:

- **selector** - (*string*) CSS-селектор элемента Gantt, к которому добавляется тултип
- **html** - (*function*) шаблонная функция для тултипа, принимает:
    - **event** - (*Event*) нативное событие мыши
    - **node** -  (*HTMLElement*) элемент
  и возвращает строку с HTML тултипа
- **global** - (*boolean*) необязательный параметр, отслеживать ли на всей странице (*true*) или только внутри Gantt (*false*). По умолчанию *false*. 

#### gantt.ext.tooltips.detach() {#detach} 

удаляет тултип. Принимает:

- **selector** - (*string*) CSS-селектор элемента Gantt


## Тултипы для различных элементов


По умолчанию тултипы добавляются только к задачам Gantt, но их можно применять и к другим элементам Gantt, например, к маркеру ресурса:

![Resource marker tooltip](/img/resource_marker_tooltip.png)


Здесь полезны два метода из [API тултипов](#tooltipapi):

- метод [**gantt.ext.tooltips.tooltipFor()**](#tooltipfor)

Например, чтобы добавить тултипы к ячейкам шкалы временной линии:

~~~js
const domHelper = gantt.utils.dom;
const pos = domHelper.getRelativeEventPosition(event, gantt.$task_scale);
return gantt.templates.task_date(gantt.dateFromPos(pos.x));
~~~

Обратите внимание, вызывать [gantt.ext.tooltips.tooltipFor()](#tooltipfor) нужно после инициализации Gantt. Например, внутри обработчика события [onGanttReady](api/event/onganttready.md):

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;

    tooltips.tooltipFor({
        selector: ".gantt_task_link",
        html: (event, node) => {
            // ...
        }
    });

    gantt.init("gantt_here");
});
~~~


[Custom Tooltips](https://docs.dhtmlx.com/gantt/samples/02_extensions/22_tooltip_api.html)


Или так:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.ext.tooltips.tooltipFor({
    selector: ".gantt_task_cell",
    html: (event, domElement) => {
        const id = event.target.parentNode.getAttribute("task_id");
        const task = gantt.getTask(id);
        return task.text;
    }
});
~~~


**Related example:** [Gantt. Custom tooltips for cells](https://snippet.dhtmlx.com/6kb5gm39)


Тултипы, добавленные этим способом, следуют за курсором мыши и учитывают настройки *[tooltip_offset_x](api/config/tooltip_offset_x.md)*, *[tooltip_offset_y](api/config/tooltip_offset_y.md)*, *[tooltip_timeout](api/config/tooltip_timeout.md)* и *[tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)*.

- метод [**gantt.ext.tooltips.attach()**](#attach)

Этот метод позволяет добавить тултипы с более гибкой конфигурацией для детального управления поведением тултипа при движении мыши.


## Настройка поведения тултипа


Вы можете изменить стандартное поведение тултипа, удалив встроенный обработчик и добавив свой:

- Удалите стандартный обработчик тултипа для задач с помощью [**gantt.ext.tooltips.detach**](#detach):

~~~js
// удалить стандартный обработчик тултипа с задач
gantt.ext.tooltips.detach(`[${gantt.config.task_attribute}]:not(.gantt_task_row)`);
~~~

- Добавьте своё поведение тултипа с помощью [**gantt.ext.tooltips.attach()**](#attach). Например, чтобы тултипы отображались только над гридом:

~~~js
gantt.ext.tooltips.tooltipFor({
    selector: `.gantt_grid [${gantt.config.task_attribute}]`,
    html: (event: MouseEvent) => {
        if (gantt.config.touch && !gantt.config.touch_tooltip) {
            return;
        }

        const targetTaskId = gantt.locate(event);
        if (gantt.isTaskExists(targetTaskId)) {
            const task = gantt.getTask(targetTaskId);
            return gantt.templates.tooltip_text(task.start_date, task.end_date, task);
        }

        return null;
    },
    global: false
});
~~~


## Таймаут


Время показа и скрытия тултипа можно настраивать с помощью соответствующих параметров.

Чтобы задать задержку (в миллисекундах) перед появлением тултипа для задачи, используйте [tooltip_timeout](api/config/tooltip_timeout.md):

~~~js
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~


Для управления временем (в миллисекундах), в течение которого тултип остаётся видимым после ухода курсора, используйте [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md):

~~~js
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~


## Позиция


Положение тултипа можно настраивать, изменяя горизонтальный и вертикальный отступы с помощью следующих свойств конфигурации:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - задаёт горизонтальный отступ
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - задаёт вертикальный отступ

~~~js
gantt.config.tooltip_offset_x = 30;
gantt.config.tooltip_offset_y = 40;
 
gantt.init("gantt_here");
~~~


## Область отображения


До версии 6.1 тултипы отображались только внутри области временной линии. Начиная с v6.1, тултипы могут появляться в любом месте и следовать за курсором мыши.

Если вы хотите вернуть прежнее поведение, используйте следующий код до инициализации Gantt:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;
    tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

