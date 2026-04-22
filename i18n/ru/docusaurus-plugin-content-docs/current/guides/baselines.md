---
title: "Пользовательские элементы в области временной шкалы"
sidebar_label: "Пользовательские элементы в области временной шкалы"
---

# Пользовательские элементы в области временной шкалы

:::info
Эта функциональность доступна только в редакции PRO
:::

dhtmlxGantt предоставляет встроенную функциональность ([built-in functionality](guides/inbuilt-baselines.md)), которая по умолчанию позволяет отрисовывать такие дополнительные элементы, как базовые линии, дедлайны и ограничения задач. Если вам нужно расширить или изменить стандартные функции, вы можете вручную добавить пользовательские элементы в область временной шкалы, как описано ниже.

Отображение дополнительных элементов обычно выполняется путём создания отображаемого слоя и размещения там пользовательских элементов (с использованием абсолютного позиционирования для размещения элементов рядом с соответствующей задачей).

**Чтобы добавить ещё один слой в область временной шкалы**, используйте метод [`addTaskLayer()`](api/method/addtasklayer.md). В качестве параметра метод принимает функцию, которая:

- принимает объект задачи;
- возвращает либо DOM-элемент, который будет отображаться, либо *false* (элемент задачи должен быть скрыт).

~~~js
gantt.addTaskLayer((task) => {
    const layerElement = document.createElement('div');
    // your code
    return layerElement;
});
~~~

**Связанный пример**: [Отображение дедлайнов](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

Примечание:

1. После вызова метода dhtmlxGantt добавляет контейнер в область временной шкалы.
2. Когда dhtmlxGantt отрисовывает данные, метод [`addTaskLayer()`](api/method/addtasklayer.md) будет вызываться для каждой задачи, и возвращённый DOM-элемент будет добавлен в контейнер.
3. Для размещения элементов можно использовать обычное абсолютное позиционирование.
4. Когда задача в Gantt обновляется, она будет обновляться во всех слоях, включая пользовательские (функция будет вызвана для обновлённой задачи, и соответствующий DOM-элемент будет заменён).
5. dhtmlxGantt предоставляет метод для вычисления позиции и размера задачи — [`getTaskPosition()`](api/method/gettaskposition.md). Вы можете использовать его для расчёта позиции и размера ваших пользовательских элементов.

*Чтобы узнать, как повысить производительность рендеринга пользовательских элементов, прочитайте статью [`addTaskLayer()`](api/method/addtasklayer.md#smart-rendering-for-custom-layers).*

:::note
Если вам нужно отображать пользовательский контент во всех ячейках области временной шкалы, поместите HTML непосредственно в ячейки, используя шаблон [`timeline_cell_content`](api/template/timeline_cell_content.md). Такой путь проще реализовать и быстрее по производительности.
:::

## Пример использования

Чтобы понять, как применить эту функциональность, рассмотрим пример: у задач есть запланированное и фактическое время, и нужно отобразить оба времени.

![baselines](/img/baselines.png)

### Шаг 1. Уменьшите высоту задачи и переместите линию задачи вверх

Изначально задачи выглядят так:

![baselines_start](/img/baselines_start.png)

Прежде всего нужно освободить место для базовых линий под задачами. Для этого необходимо уменьшить высоту панели задачи с помощью `gantt.config.bar_height` и сделать её примерно вдвое меньше высоты строки, определяемой `gantt.config.row_height`:

~~~js
gantt.config.bar_height = 16;
gantt.config.row_height = 40;
~~~

И переместите линию задачи к верхней части строки, применив следующий CSS-код:

~~~css
.gantt_task_line,
.gantt_line_wrapper {
    margin-top: -9px;
}

.gantt_task_link .gantt_link_arrow {
    margin-top: -10px;
}

.gantt_task_link .gantt_link_corner {
    margin-top: -9px;
}
~~~

Результат будет следующего вида:

![baselines_task_height](/img/baselines_task_height.png)

### Шаг 2. Добавьте дополнительные свойства данных

После этого нужно добавить в объект задачи дополнительные свойства данных. Назовём их: `planned_start` и `planned_end`.

![baseline_task_object](/img/baseline_task_object.png)

### Шаг 3. Преобразуйте добавленные свойства в объекты Date

dhtmlxGantt знает только свойства данных `start_date` и `end_date` и автоматически преобразует их в объекты Date. Любые другие свойства даты требуют дополнительной обработки. Чтобы распознавать добавленные свойства `planned_start` и `planned_end` в dhtmlxGantt, преобразуйте их в Date с помощью метода `parseDate()` в обработчике события [`onTaskLoading`](api/event/ontaskloading.md).

~~~js
gantt.attachEvent("onTaskLoading", (task) => {
    task.planned_start = gantt.date.parseDate(task.planned_start, gantt.config.date_format);
    task.planned_end = gantt.date.parseDate(task.planned_end, gantt.config.date_format);
    return true;
});
~~~

### Шаг 4. Отображение пользовательских элементов для запланированного времени

Затем вызовите метод [`addTaskLayer()`](api/method/addtasklayer.md) для отображения запланированного времени задачи, определённого свойствами `planned_start` и `planned_end`.

~~~js
gantt.addTaskLayer((task) => {
    if (task.planned_start && task.planned_end) {
        const taskPosition = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
        const baselineElement = document.createElement('div');
        baselineElement.className = 'baseline';
        baselineElement.style.left = taskPosition.left + 'px';
        baselineElement.style.width = taskPosition.width + 'px';
        baselineElement.style.top = taskPosition.top + gantt.config.task_height + 13 + 'px';
        return baselineElement;
    }
    return false;
});
~~~

### Шаг 5. Определите правила CSS для добавленных элементов

Далее добавьте стиль для ваших новых элементов:

~~~css
.baseline {
    position: absolute;
    border-radius: 2px;
    opacity: 0.6;
    margin-top: -7px;
    height: 12px;
    background: #ffd180;
    border: 1px solid rgb(255, 153, 0);
}
~~~

### Шаг 6. Добавьте возможность редактирования добавленных свойств данных в лайтбоксе

Наконец, переработайте структуру `lightbox`, если хотите предоставить возможность редактировать добавленные свойства через интерфейс пользователя.

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, map_to: "auto", type: "duration" },
    {
        name: "baseline",
        height: 72,
        map_to: {
            start_date: "planned_start",
            end_date: "planned_end"
        },
        type: "duration"
    }
];
gantt.locale.labels.section_baseline = "Planned";
~~~

Полный код рассмотренного примера можно увидеть в связанном примере.

**Связанный пример**: [Отображение базовых линий] (https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

## Примеры пользовательского контента

Ниже приведены примеры, демонстрирующие различные способы применения метода [`addTaskLayer()`](api/method/addtasklayer.md) для обогащения временной шкалы диаграммы Ганта различными пользовательскими элементами:

- <a href="https://snippet.dhtmlx.com/wv23be05" target="_blank">Пользовательские базовые линии</a>
- <a href="https://snippet.dhtmlx.com/bk5m6his" target="_blank">Выделение ячеек с просроченным временем</a>
- <a href="https://snippet.dhtmlx.com/p74m3du2" target="_blank">Выделение просроченных задач</a>
- <a href="https://snippet.dhtmlx.com/cuc7d4vn" target="_blank">Показ пропущенного дедлайна для всего проекта</a>
- <a href="https://snippet.dhtmlx.com/bpupkrce" target="_blank">Отображение значения прогресса выполнения задачи</a>
- <a href="https://snippet.dhtmlx.com/quqe9s2o" target="_blank">Добавление пользовательских элементов для задач</a>
- <a href="https://snippet.dhtmlx.com/pmuy0lj8" target="_blank">Перетаскиваемые базовые линии</a>
- <a href="https://snippet.dhtmlx.com/38h66bni" target="_blank">Базовые линии с перетаскиваемой ручкой прогресса</a>
- <a href="https://snippet.dhtmlx.com/3oy6052q" target="_blank">Пользовательские вехи</a>
- <a href="" target="_blank">Повторяющиеся задачи</a>

## Перетаскивание для пользовательских элементов

Возможно, вам будет полезно рассмотреть вопрос о включении перетаскивания для пользовательских элементов. Суть в том, что в DHTMLX Gantt нет встроенной функции реализации собственного перетаскивания, но его можно реализовать вручную довольно простым способом.

Здесь нужно обработать три DOM-события: `mousedown`, `mousemove` и `mouseup`, и определить пару флагов для хранения состояния перетаскивания между этими событиями.

1. Событие `mousedown` сигнализирует о начале перетаскивания. Однако это может быть и первая стадия обычного клика, который не должен активировать перетаскивание. На этом шаге нужно установить флаг, означающий, что перетаскивание запрошено, и запомнить исходную позицию мыши, а также любые другие данные, которые понадобятся позже.

~~~js
let dndRequested = false;
let dndActivated = false;
let startPosition = null;
let startTimestamp = null;
let taskId = null;
const domUtils = gantt.utils.dom;
// в этом примере мы будем перетаскивать элементы `.baseline` внутри контейнера `gantt.$task_data`
gantt.event(gantt.$task_data, 'mousedown', (event) => {
    // используйте element.closest или gantt.utils.dom.closest для поиска перетаскиваемого элемента
    const draggableElement = domUtils.closest(event.target, '.baseline');

    if (draggableElement) {
        // ещё не известно, будет ли пользователь перетаскивать элемент или просто кликнет
        // сохраните информацию о событии, мы проверим её во время 'mousemove'
        dndRequested = true;
        startTimestamp = Date.now();
        startPosition = domUtils.getRelativeEventPosition(event, gantt.$task_data);
        taskId = draggableElement.getAttribute("data-task");
    }
});
~~~

Обработчик события добавляется через [`gantt.event()`](api/method/event.md), а не через нативный [Element.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Это сделано потому, что Gantt можно уничтожить с помощью метода `gantt.destructor()`, и все события, подключённые через `gantt.event()`, будут очищены автоматически. Если вы используете нативный метод и `gantt.destructor()`, может потребоваться вручную очищать обработчики событий, чтобы избежать утечек памяти.

2. Реальное перетаскивание начнётся в обработчике `mousemove`. Вместо того чтобы инициировать перетаскивание при клике, сравните текущую позицию мыши с исходной, сохранённой в `mousedown`. Так вы сможете начать перетаскивание только тогда, когда текущая позиция существенно отличается от исходной. Если не хотите устанавливать минимальный порог для перетаскивания, можно также оценивать время, прошедшее с момента `mousedown`.

Как только вы определили, что перетаскивание началось, можете использовать обработчик `mousemove` для обновления позиции перетаскиваемого элемента на экране. Если вы перетаскиваете элемент слоя, ожидаемым способом обновления является изменение базового объекта и повторная отрисовка через Gantt API ([`gantt.refreshTask()`](api/method/refreshtask.md)), а не прямое изменение DOM-элемента.

~~~js
gantt.event(window, 'mousemove', (event) => {
    if (dndRequested && gantt.isTaskExists(taskId)) {
        // мы перехватили 'mousemove' после события 'mousedown'
        const currentPosition = domUtils.getRelativeEventPosition(event, gantt.$task_data);
        if (!dndActivated) {
            // 'mousemove' может быть частью обычного процесса клика,
            // мы не хотим запускать dnd на обычном клике
            // проверяем, изменилось ли положение мыши существенно,
            // или если пользователь задерживает нажатие более чем обычно
            if (Math.abs(currentPosition.x - startPosition.x) > 5 || (Date.now() - startTimestamp) > 500) {
                // если да — считаем, что dnd началось
                dndActivated = true;
            }
        }
        if (dndActivated) {
            // здесь можно обновить позицию перетаскиваемого элемента.
            // если вы перетаскиваете элемент, добавленный через `gantt.addTaskLayer`,
            // лучше обновлять соответствующий объект задачи
            // и перерисовывать его через `gantt.refreshTask`
            // также можно получить соответствующую дату временной шкалы:
            const pointerDate = gantt.dateFromPos(currentPosition.x);
            gantt.getTask(taskId).baseline_date = pointerDate;
            gantt.refreshTask(taskId);
        }
    }
});
~~~

3. Наконец, необходимо зафиксировать событие `mouseup`. Если перетаскивание было запущено, примените изменения к перемещённому объекту, при необходимости вызовите метод [`gantt.updateTask()`](api/method/updatetask.md) и очистите все временные флаги.

~~~js
gantt.event(window, 'mouseup', (event) => {
    // применить изменения, если перетаскивание было в процессе
    if (dndActivated) {
        // проверить и завершить изменения при необходимости
        const task = gantt.getTask(taskId);
        task.baseline_date = gantt.roundDate({
            date: task.baseline_date,
            unit: "hour",
            step: 1
        });
        // вызвать gantt.updateTask, чтобы инициировать обновление данных
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

## Дополнительный оверлей для диаграммы Ганта

dhtmlxGantt предоставляет возможность добавить дополнительный слой поверх диаграммы Ганта для размещения некоторого пользовательского контента внутри неё. В качестве оверлея можно использовать div-контейнер, HTML-канвас и т.д. Чтобы нарисовать контент оверлея, можно использовать любую стороннюю библиотеку.

Например, можно добавить S-образную кривую во временный оверлей. В общем случае S-образные кривые отображают рост расходов, уменьшение запасов материалов и т.д., и позволяют отслеживать общий прогресс реализации задач проекта.

Чтобы добавить оверлей в Gantt, нужно выполнить два шага:

- включите расширение `overlay` с помощью метода [`gantt.plugins()`](api/method/plugins.md)

~~~js
gantt.plugins({
    overlay: true
});
~~~

- используйте метод `addOverlay()` объекта `gantt.ext.overlay` и передайте функцию, которая содержит логику добавления контента оверлея в него. Эта функция принимает контейнер с пользовательским контентом в качестве параметра. См. примеры ниже.

Следующий пример демонстрирует, как можно добавить канвас-оверлей с S-кривыми для отображения целевого и фактического прогресса проекта (реализовано с помощью библиотеки [ChartJS](https://www.chartjs.org/)):

![Overlay with S-curve](/img/overlay_scurve.png)

~~~js
const overlayId = gantt.ext.overlay.addOverlay((container) => {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    canvas.style.height = container.offsetHeight + "px";
    canvas.style.width = container.offsetWidth + "px";

    const chartContext = canvas.getContext("2d");
    const progressChart = new Chart(chartContext, {
        type: "line",
        // полный конфиг графика
    });
});
~~~

Метод `gantt.ext.overlay.addOverlay()` возвращает id нового оверлея в виде числа.

**Связанный пример**: [Гантт-график с оверлеем и зумом (S-кривая)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)

### API расширения Overlay

Расширение **dhtmlxgantt_overlay** содержит набор API-методов для работы с оверлеями. Эти методы доступны через объект `gantt.ext.overlay`.

#### `addOverlay()`

Добавляет новый оверлей в диаграмму Ганта и возвращает его id. Принимает контейнер с пользовательским контентом в качестве параметра.

~~~js
const overlayId = gantt.ext.overlay.addOverlay((container) => {});
~~~

#### `deleteOverlay()`

Удаляет оверлей по его id.

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

#### `getOverlaysIds()`

Возвращает массив с id оверлеев, добавленных на диаграмму.

~~~js
const overlayIds = gantt.ext.overlay.getOverlaysIds();
~~~

#### `refreshOverlay()`

Перерисовывает указанный оверлей. Принимает id оверлея в качестве параметра.

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

#### `showOverlay()`

Показывает оверлей по его id. Принимает id оверлея в качестве параметра.

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

#### `hideOverlay()`

Скрывает оверлей по его id.

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

#### `isOverlayVisible()`

Проверяет, видим ли указанный оверлей. Возвращает `true`, если оверлей видим.

~~~js
const isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~