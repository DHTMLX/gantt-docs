---
title: "Тултипы для элементов Gantt"
sidebar_label: "Тултипы для элементов Gantt"
---

## Тултипы для элементов Gantt

Тултипы позволяют добавлять пользователям дополнительную информацию, не перегружая экран текстом. По умолчанию тултипы добавляются к задачам Gantt.

![task_tooltip](/img/task_tooltip.png)

Вы можете [добавлять тултипы к любым элементам Gantt](#tooltipsfordifferentelements) через соответствующий API. 


## Активация

Чтобы активировать тултипы для задач, включите плагин **tooltip** с помощью метода [gantt.plugins](api/method/plugins.md):

~~~js
<script>
    gantt.plugins({ /*!*/
        tooltip: true /*!*/
    }); /*!*/

    gantt.init("gantt_here");
</script>
~~~

[Тултип](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)

После активации расширения тултипы будут автоматически отображаться с настройками по умолчанию.


## Пользовательский текст

По умолчанию тултипы отображают 3 свойства задачи:

1. Дата начала задачи.
2. Дата окончания задачи.
3. Название задачи.

Чтобы задать пользовательский текст тултипов, используйте шаблон [tooltip_text](api/template/tooltip_text.md):

~~~js
gantt.templates.tooltip_text = (start, end, task) => 
    `<b>Task:</b> ${task.text}

<b>Duration:</b> ${task.duration}`;
~~~


## API тултипа {#tooltipapi}

### Объект тултипа

Вы можете получить доступ к объекту тултипа как к **gantt.ext.tooltips.tooltip**. Этот объект позволяет управлять позицией, содержимым и видимостью тултипа с помощью набора методов:

- **getNode()** - возвращает HTML-элемент тултипа  
- **setViewport()** - фиксирует позицию тултипа в границах указанного HTML-элемента
    - **node** - (*HTMLElement*) HTML-элемент под указателем
- **show()** - отображает тултип в определённых координатах (относительно document.body). Метод может принимать различные параметры в зависимости от позиции, на которой вы хотите показать тултип:
    - Чтобы отобразить тултип в конкретных координатах (относительно document.body), передайте: 
        - **left** - (*number*) X-координата
        - **top** - (*number*) Y-координата 
    - Чтобы отобразить тултип в координатах мышинного события (*tooltip_offset_x/y* и область просмотра будут учтены), передайте:
        - **event** - (*Event*) объект мышинного события  
- **hide()** - скрывает элемент тултипа
- **setContent()**- помещает HTML-содержимое в тултип. В качестве параметра принимает:
    - **html** - (*string*) строка с HTML-содержимым для тултипа


### Методы

Существуют несколько методов, позволяющих управлять поведением тултипа во время наведения на элементы DOM.

#### gantt.ext.tooltips.attach() {#attach}

добавляет тултип с расширенной настройкой. Метод принимает в качестве параметра объект с настройками тултипа. Настройки, которые можно изменить методом, следующие:

- **selector** - (*string*) определяет CSS-селектор элементов, на которых слушать события мыши
- **onmouseenter** - (*function*) обработчик, вызываемый при наведении курсора на элемент. Параметры:
     - **event** - (*Event*)Native-событие мыши
    - **node** -  (*HTMLElement*) HTML-узел
- **onmousemove** - (*function*) обработчик, вызываемый при перемещении курсора внутри элемента. Параметры:
    - **event** - (*Event*) Native-событие мыши
    - **node** -  (*HTMLElement*) HTML-узел
- **onmouseleave** - (*function*) обработчик, вызываемый при уходе курсора с элемента. Параметры:    
    - **event** - (*Event*) Native-событие мыши
    - **node** -  (*HTMLElement*) HTML-узел
- **global** - (*boolean*) определяет, слушает ли модуль события мыши по всей странице (*true*) или только внутри элемента gantt (*false*). По умолчанию значение равно *false*.

#### gantt.ext.tooltips.tooltipFor() {#tooltipfor}

добавляет тултип к указанному элементу Gantt. Это более упрощённая версия метода **attach()**. Метод принимает в качестве параметра *объект с деталями тултипа*. Этот объект имеет следующие свойства:

- **selector** - (*string*) CSS-селектор элемента Gantt, к которому нужно добавить тултип
- **html** - (*function*) шаблон для тултипа. Функция-шаблон принимает два параметра:
    - **event** - (*Event*)Native-событие мыши
    - **node** -  (*HTMLElement*) HTML-узел
  и возвращает строку с шаблоном.
- **global** - (*boolean*) необязательный, определяет, слушает ли модуль события мыши по всей странице (*true*) или только внутри элемента gantt (*false*). По умолчанию значение *false*. 

#### gantt.ext.tooltips.detach() {#detach} 

удаляет тултип. В качестве параметра метод принимает:

- **selector** - (*string*) CSS‑селектор элемента Gantt

#### gantt.ext.tooltips.delayShow() {#delayShow} 

показывает тултип с задержкой, установленной в [tooltip_timeout](api/config/tooltip_timeout.md). Если конфигурация не задана, используется небольшая задержка по умолчанию.

Этот метод является «debounced» (с задержкой), то есть повторные вызовы в пределах окна задержки сбрасывают таймер, и тултип показывается только один раз.

В качестве параметров метод принимает:

- **event** - (*Event*)Native-событие мыши, используемое для позиционирования тултипа
- **tooltipText** - (*string*) текст тултипа, отображаемый как innerHTML

#### gantt.ext.tooltips.delayHide() {#delayHide} 

скрывает в данный момент отображаемый тултип после задержки, заданной в [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md). Если конфигурация не задана, используется небольшая задержка по умолчанию.

## Тултипы для разных элементов {#tooltipsfordifferentelements}

По умолчанию тултипы добавляются только к задачам Gantt, но вы также можете задать тултипы и для других элементов Gantt. Например, для маркера ресурса:

![Resource marker tooltip](/img/resource_marker_tooltip.png)

Существует два соответствующих метода в [API тултипа](#tooltipapi) для этой цели:

- метод [**gantt.ext.tooltips.tooltipFor()**](#tooltipfor)

Например, так можно добавить тултипы для ячеек шкалы времени:

~~~js
const domHelper = gantt.utils.dom;
const pos = domHelper .getRelativeEventPosition(event, gantt.$task_scale);
return gantt.templates.task_date(gantt.dateFromPos(pos.x));
~~~

Обратите внимание, метод [gantt.ext.tooltips.tooltipFor()](#tooltipfor) должен быть вызван после завершения инициализации Gantt. Например, можно задать метод внутри обработчика события [onGanttReady](api/event/onganttready.md) так:

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

[Пользовательские тултипы](https://docs.dhtmlx.com/gantt/samples/02_extensions/22_tooltip_api.html)

Или можно использовать подход, как в примере ниже:

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

**Связанный пример** [Gantt. Пользовательские тултипы для ячеек](https://snippet.dhtmlx.com/6kb5gm39)

Тултип, добавленный таким способом, будет следовать за указателем мыши и будет использовать настройки *[tooltip_offset_x](api/config/tooltip_offset_x.md)*, *[tooltip_offset_y](api/config/tooltip_offset_y.md)*, *[tooltip_timeout](api/config/tooltip_timeout.md)*, [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md).

- метод [гantt.ext.tooltips.attach()](#attach)

Этот метод позволяет добавить тултип с расширенной настройкой, чтобы адаптировать поведение тултипа к перемещению курсора мыши.


## Настройка поведения тултипа

Есть возможность изменить поведение тултипа по умолчанию. Это можно сделать, удалив встроенный обработчик тултипа и добавив свой:

- Удалить встроенный обработчик тултипа у задач можно с помощью метода [**gantt.ext.tooltips.detach**](#detach):

~~~js
// удалить встроенный обработчик тултипа у задач
gantt.ext.tooltips.detach(`[${gantt.config.task_attribute}]:not(.gantt_task_row)`);
~~~

- Добавить желаемое поведение тултипа с помощью метода [**gantt.ext.tooltips.attach()**](#attach). В приведённом ниже примере тултип отображается только над таблицей:

~~~js
gantt.ext.tooltips.tooltipFor({
    selector: `.gantt_grid [${gantt.config.task_attribute}]`,
    html: (event) => {
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


## Тайм-аут

Вы можете настроить время показа и скрытия тултипа через соответствующие параметры.

Чтобы указать период времени в миллисекундах перед появлением тултипа для задачи, используйте [tooltip_timeout](api/config/tooltip_timeout.md):

~~~js
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~


Чтобы определить, как долго (в миллисекундах) тултип будет отображаться после перемещения курсора на другое место, используйте свойство [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md):

~~~js
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~


## Позиция

Позицию тултипа можно настраивать, изменяя смещения относительно его базового положения двумя конфигурационными свойствами:

- [tooltip_offset_x](api/config/tooltip_offset_x.md) - задаёт горизонтальное смещение позиции тултипа
- [tooltip_offset_y](api/config/tooltip_offset_y.md) - задаёт вертикальное смещение позиции тултипа

~~~js
gantt.config.tooltip_offset_x = 30;
gantt.config.tooltip_offset_y = 40;
 
gantt.init("gantt_here");
~~~


## Область отображения тултипа

До версии 6.1 тултипы отображались только внутри области временной шкалы. После выпуска версии 6.1 отображение тултипов не ограничено, и тултипы следуют за движением указателя мыши.

При необходимости можно вернуть предыдущее поведение, используя приведённый ниже код до инициализации Gantt:

~~~js
gantt.attachEvent("onGanttReady", () => {
    const tooltips = gantt.ext.tooltips;
    tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~