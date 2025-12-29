---
title: "Пользовательские элементы в области временной шкалы"
sidebar_label: "Пользовательские элементы в области временной шкалы"
---

# Пользовательские элементы в области временной шкалы

:::info
Эта функция доступна только в редакции PRO.
:::

dhtmlxGantt включает [встроенную функциональность](guides/inbuilt-baselines.md) для отображения дополнительных элементов, таких как базовые планы, крайние сроки и ограничения задач по умолчанию. Если вы хотите расширить или изменить эти возможности, вы можете вручную добавить пользовательские элементы на временную шкалу, как описано ниже.

Добавление дополнительных элементов обычно включает создание слоя отображения и позиционирование пользовательских элементов с помощью абсолютного позиционирования, чтобы выровнять их относительно соответствующей задачи.

**Чтобы добавить дополнительный слой в область временной шкалы**, используйте метод [addTaskLayer](api/method/addtasklayer.md). Этот метод принимает функцию в качестве параметра, которая:

- Получает объект задачи;
- Возвращает либо DOM-элемент для отображения, либо *false*, если элемент для задачи не должен отображаться.

~~~js
gantt.addTaskLayer(function myNewElement(task) {
    var el = document.createElement('div');
    // ваш код
    return el;
});
~~~

[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


Примечания:

1. После вызова метода dhtmlxGantt добавляет контейнер в область временной шкалы.
2. При отрисовке данных метод [addTaskLayer](api/method/addtasklayer.md) вызывается для каждой задачи, и возвращённый DOM-элемент добавляется в контейнер.
3. Вы можете использовать стандартное абсолютное позиционирование для размещения элементов.
4. При обновлении задачи в Gantt обновляются все слои, включая пользовательские (функция вызывается для обновлённой задачи, и связанный DOM-элемент заменяется).
5. dhtmlxGantt предоставляет метод для вычисления позиции и размера задачи - [getTaskPosition](api/method/gettaskposition.md). Его можно использовать для определения позиции и размера ваших пользовательских элементов.

*Советы по повышению производительности отрисовки пользовательских элементов см. в статье [addTaskLayer](api/method/addtasklayer.md#smartrenderingforcustomlayers).*

:::note
Если вы хотите отображать пользовательский контент в каждой ячейке временной шкалы, проще и быстрее вставлять HTML напрямую в ячейки с помощью шаблона [timeline_cell_content](api/template/timeline_cell_content.md).
:::

## Пример использования

Вот пример, иллюстрирующий использование данной функциональности: предположим, у вас есть как запланированное, так и фактическое время выполнения задач, и вы хотите отобразить оба варианта.

![baselines](/img/baselines.png)

### Шаг 1. Уменьшите высоту задачи и переместите линии задач вверх

Изначально задачи выглядят так:

![baselines_start](/img/baselines_start.png)

Чтобы освободить место для базовых планов под задачами, уменьшите высоту полосы задачи примерно до половины высоты строки:

~~~js
gantt.config.bar_height = 16;
gantt.config.row_height = 40;
~~~

Затем переместите линию задачи к верхней части строки с помощью следующего CSS:

~~~css
.gantt_task_line, .gantt_line_wrapper {
    margin-top: -9px;
}
.gantt_side_content {
    margin-bottom: 7px;
}
.gantt_task_link .gantt_link_arrow {
    margin-top: -12px
}
.gantt_side_content.gantt_right {
    bottom: 0;
}
~~~

В результате получится:

![baselines_task_height](/img/baselines_task_height.png)

### Шаг 2. Добавьте дополнительные свойства данных

Далее добавьте дополнительные свойства данных в объект задачи, например, 'planned_start' и 'planned_end'.

![baseline_task_object](/img/baseline_task_object.png)

### Шаг 3. Преобразуйте добавленные свойства данных в объекты Date

dhtmlxGantt автоматически распознаёт и преобразует 'start_date' и 'end_date' в объекты Date. Другие свойства дат требуют ручного преобразования.


Чтобы сделать 'planned_start' и 'planned_end' пригодными для использования в dhtmlxGantt, преобразуйте их в объекты Date с помощью метода parseDate() внутри обработчика события [onTaskLoading](api/event/ontaskloading.md).

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date");
    task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date");
    return true;
});
~~~

### Шаг 4. Отобразите пользовательские элементы для запланированного времени

Затем используйте метод [addTaskLayer](api/method/addtasklayer.md) для отображения запланированного времени для каждой задачи (от 'planned_start' до 'planned_end').

~~~js
gantt.addTaskLayer(function draw_planned(task) {
    if (task.planned_start && task.planned_end) {
        var sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
        var el = document.createElement('div');
        el.className = 'baseline';
        el.style.left = sizes.left + 'px';
        el.style.width = sizes.width + 'px';
        el.style.top = sizes.top + gantt.config.task_height  + 13 + 'px';
        return el;
    }
    return false;
});
~~~

### Шаг 5. Задайте CSS-правила для добавленных элементов

Наконец, добавьте CSS-стили для новых элементов:

~~~css
.baseline {
    position: absolute;
    border-radius: 2px;
    opacity: 0.6;
    margin-top: -7px;
    height: 12px;
    background: #ffd180;
    border: 1px solid rgb(255,153,0);
}
~~~

### Шаг 6. Разрешение редактирования добавленных свойств данных в lightbox

Чтобы пользователи могли редактировать недавно добавленные свойства через интерфейс, необходимо соответствующим образом переопределить структуру lightbox.

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "time", height: 72, map_to: "auto", type: "duration"},
    {name: "baseline", height: 72, map_to: { 
        start_date: "planned_start", end_date: "planned_end"}, type: "duration"}
];
gantt.locale.labels.section_baseline = "Planned";
~~~

Полный пример кода вы можете найти в соответствующем примере.


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


## Примеры пользовательского контента

Ниже приведены примеры использования метода [addTaskLayer()](api/method/addtasklayer.md) для расширения временной шкалы Gantt различными пользовательскими элементами:

- [Пользовательские базовые линии](https://snippet.dhtmlx.com/wv23be05)
- [Подсветка ячеек с просроченным временем](https://snippet.dhtmlx.com/bk5m6his)
- [Подсветка просроченных задач](https://snippet.dhtmlx.com/p74m3du2)
- [Отображение пропущенного дедлайна для всего проекта](https://snippet.dhtmlx.com/cuc7d4vn)
- [Отображение значения прогресса задачи](https://snippet.dhtmlx.com/bpupkrce)
- [Добавление пользовательских элементов для задач](https://snippet.dhtmlx.com/quqe9s2o)
- [Перетаскиваемые базовые линии](https://snippet.dhtmlx.com/pmuy0lj8)
- [Базовые линии с перетаскиваемым индикатором прогресса](https://snippet.dhtmlx.com/38h66bni)
- [Пользовательские вехи](https://snippet.dhtmlx.com/70kqo4do)
- [Повторяющиеся задачи](https://snippet.dhtmlx.com/5/7faa7b03a) 


## Drag-and-drop для пользовательских элементов

Если вы хотите реализовать drag-and-drop для пользовательских элементов, важно понимать, что DHTMLX Gantt не предоставляет встроенной поддержки этой функции, однако вы можете реализовать её вручную с помощью нескольких простых шагов.

Идея заключается в том, чтобы отслеживать три DOM-события (**mousedown**, **mousemove**, **mouseup**) и использовать несколько флагов для отслеживания состояния drag-and-drop между этими событиями.

1. Событие **mousedown** сигнализирует о начале потенциального drag-and-drop. Однако это также может быть обычный клик, который не должен инициировать перетаскивание. На этом этапе установите флаг, что drag-and-drop запрошен, и сохраните начальную позицию мыши и другие необходимые данные.

~~~js
var dndRequested = false;
var dndActivated = false;
var startPosition = null;
var startTimestamp = null
var taskId = null;
var domUtils = gantt.utils.dom;
// в этом примере мы будем перетаскивать элементы `.baseline` внутри контейнера `gantt.$task_data`
gantt.event(gantt.$task_data, 'mousedown', function(e) {
  // используйте element.closest или gantt.utils.dom.closest для поиска перетаскиваемого элемента
  var draggableElement = domUtils.closest(e.target, '.baseline');
 
  if (draggableElement) {
    // мы ещё не знаем, собирается ли пользователь перетаскивать элемент или просто кликнуть по нему
    // сохраняем информацию о событии, проверим это при 'mousemove'
    dndRequested = true;
    startTimestamp = Date.now();
    startPosition = domUtils.getRelativeEventPosition(e, gantt.$task_data);
    taskId = draggableElement.getAttribute("data-task");
  }
});
~~~

Обратите внимание, что обработчик события добавляется с помощью [gantt.event](api/method/event.md), а не через нативный [Element.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Это связано с тем, что при уничтожении экземпляра Gantt через **gantt.destructor** все обработчики, добавленные через **gantt.event**, удаляются автоматически. При использовании нативных слушателей событий потребуется ручная очистка для предотвращения утечек памяти.

2. Сам процесс drag-and-drop начинается при событии **mousemove**. Вместо немедленного начала перетаскивания по mouse down, сравнивайте текущую позицию мыши с ранее сохранённой. Таким образом, перетаскивание начинается только при смещении курсора на определённое расстояние. Также можно проверить, удерживается ли кнопка мыши дольше обычного клика.

После начала перетаскивания обработчик **mousemove** обновляет позицию перетаскиваемого элемента. Для элементов, добавленных через `gantt.addTaskLayer`, предпочтительно обновлять связанные данные задачи и обновлять задачу с помощью [gantt.refreshTask](api/method/refreshtask.md), а не напрямую изменять DOM.

~~~js
gantt.event(window, 'mousemove', function(e) {
  if (dndRequested && gantt.isTaskExists(taskId)) {
    // мы зафиксировали 'mousemove' после события 'mousedown'
    var currentPosition = domUtils.getRelativeEventPosition(e, gantt.$task_data);
    if (!dndActivated) {
      // 'mousemove' может быть частью обычного клика,
      // не нужно запускать drag-and-drop при обычном клике
      // проверяем, изменилось ли положение мыши существенно,
      // или пользователь удерживает кнопку мыши дольше, чем обычно при клике      
      if(Math.abs(
          currentPosition.x - startPosition.x) > 5 || (Date.now() - startTimestamp
        ) > 500) {
          // если да - предполагаем, что начался drag-and-drop
          dndActivated = true;
      }
    }
    if (dndActivated) {
      // здесь можно обновить позицию перетаскиваемого элемента.
      // при перетаскивании элемента, добавленного через `gantt.addTaskLayer`,
      // лучше обновлять объект задачи
      // и перерисовывать его через `gantt.refreshTask`
      // также можно получить соответствующую дату из временной шкалы:
      var pointerDate = gantt.dateFromPos(currentPosition.x);
      gantt.getTask(taskId).baseline_date = pointerDate;
      gantt.refreshTask(taskId);
    }
  }
 
});
~~~

3. Наконец, отслеживайте событие **mouseup**. Если перетаскивание происходило, завершите изменения, округлив дату, вызовите [gantt.updateTask](api/method/updatetask.md) при необходимости и сбросьте все временные флаги.

~~~js
gantt.event(window, 'mouseup', function(e) {
  // применяем изменения, если drag-and-drop был в процессе
  if (dndActivated) {
    // проверить и завершить изменения при необходимости
    var task = gantt.getTask(taskId);
    task.baseline_date = gantt.roundDate({
      date: task.baseline_date,
      unit: "hour",
      step: 1    
    });
    // вызовите gantt.updateTask для обновления данных    
    gantt.updateTask(taskId);
  }
  // очистить все флаги, установленные на предыдущих этапах
  dndRequested = false;
  dndActivated = false;
  startPosition = null;
  startTimestamp = null;
  taskId = null;
});
~~~

## Дополнительный слой поверх диаграммы

dhtmlxGantt позволяет добавить дополнительный слой поверх диаграммы для размещения пользовательского контента. Этот слой может быть div-контейнером, HTML canvas или другими элементами. Для отображения содержимого внутри него можно использовать сторонние библиотеки.

Например, вы можете добавить наложение S-кривой, которая часто используется для визуализации роста расходов, потребления материалов или общего прогресса проекта.

Чтобы добавить overlay, выполните два шага:

- Включите расширение **overlay** через метод [gantt.plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    overlay: true
});
~~~

- Используйте метод **addOverlay()** из объекта **gantt.ext.overlay**, передав функцию, которая добавляет ваш пользовательский контент в контейнер overlay. Эта функция получает элемент-контейнер в качестве параметра. Пример ниже.

Ниже приведён пример добавления canvas overlay с S-кривыми, отображающими целевой и фактический прогресс проекта, с использованием библиотеки [ChartJS](https://www.chartjs.org/):

![Overlay with S-curve](/img/overlay_scurve.png)

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){
    var canvas = document.createElement("canvas");
    container.appendChild(canvas);
    canvas.style.height = container.offsetHeight + "px";
    canvas.style.width = container.offsetWidth + "px";

    var ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
        type: "line",
        // полная конфигурация графика
    });
});
~~~

Метод **gantt.ext.overlay.addOverlay()** возвращает числовой id созданного overlay.


[Gantt chart with overlay and zoom (S-Curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)


### API расширения Overlay

Расширение **dhtmlxgantt_overlay** предоставляет набор API-методов для работы с overlay, доступных через объект **gantt.ext.overlay**.

#### addOverlay

Добавляет новый overlay на диаграмму Gantt и возвращает его id. Вы передаёте функцию, получающую контейнер для вашего пользовательского контента.

~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){});
~~~

#### deleteOverlay

Удаляет overlay по его id.

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

#### getOverlaysIds 

Возвращает массив id всех overlay, добавленных на диаграмму.

~~~js
var ids = gantt.ext.overlay.getOverlaysIds();
~~~

#### refreshOverlay

Перерисовывает указанный overlay по его id.

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

#### showOverlay

Делает overlay видимым по его id.

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

#### hideOverlay

Скрывает overlay по его id.

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

#### isOverlayVisible

Проверяет, видим ли указанный overlay. Возвращает *true*, если видим.

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~

