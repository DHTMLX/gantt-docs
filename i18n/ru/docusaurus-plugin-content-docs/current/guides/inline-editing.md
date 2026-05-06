---
title: "Редактирование 'на месте' в гриде"
sidebar_label: "Редактирование 'на месте' в гриде"
---

# Редактирование в гриде

dhtmlxGantt предоставляет два варианта редактирования содержимого:

- с помощью формы редактирования Lightbox
- с использованием встроенных редакторов в области грид

Инлайн-редактирование позволяет вносить изменения прямо в гриде: создавать и обновлять задачи, устанавливать связи между ними, задавать даты начала и конца или изменять продолжительность — всё через встроенные редакторы.

![Inline grid editing](/img/inline_grid_editing.png)

Чтобы включить инлайн-редактирование, нужно:

- указать список конфигураций редакторов и использовать свойство **map_to** объекта редактора для отображения нужного редактора к столбцу грид

~~~js
const textEditor = { type: "text", map_to: "text" };
const dateEditor = { type: "date", map_to: "start_date", min: new Date(2025, 0, 1),
    max: new Date(2026, 0, 1) };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };
~~~

- в конфигурации столбца использовать свойство **editor** для определения редактора, который должен использоваться в столбце

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: "*", editor: textEditor, resize: true },
    { name: "start_date", align: "center", editor: dateEditor, resize: true },
    { name: "duration", align: "center", editor: durationEditor },
    { name: "add", width: 44 }
];
~~~

[Inline editing](https://docs.dhtmlx.com/gantt/samples/07_grid/11_inline_edit_basic.html)

:::note
Read details about the *inlineEditors* object API in the [Inline Editors Extension](guides/inline-editors-ext.md) article.
:::

You can take a look at the video guide that shows how to implement inline editing in the grid.

<iframe width="704" height="400" src="https://www.youtube.com/embed/0rIPrC0GtME" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Типы редакторов

Встроенные редакторы хранятся в конфигурационном объекте [editor_types](api/config/editor_types.md).

Существует несколько предопределённых встроенных редакторов:

- **text** редактор - для редактирования текстовых столбцов, например названия задачи
- **number** редактор - для редактирования числовых столбцов, например продолжительности задачи, порядка и т.д.
- **duration** редактор - для редактирования столбцов продолжительности, т.е. длительности задачи. Работает только тогда, когда используется конфигурация с **map_to: "duration"** и тип редактора установлен в
на **"duration"**:

~~~js
{ type: "duration", map_to: "duration", formatter: formatter }
~~~

Этот тип встроенного редактора полезен, если вам нужно задать продолжительность, которая содержит как число, так и единицу продолжительности (см. [Duration Formatter](guides/formatters-ext.md#durationformatter)). По умолчанию используется [Duration Formatter](guides/formatters-ext.md#durationformatter). Вместо использования стандартного форматтера продолжительности можно изменить его конфигурацию или задать [пользовательский форматтер](guides/formatters-ext.md#customformatter).

- **date** редактор - для редактирования дат, например дат начала и окончания задачи
- **select** редактор - для выбора варианта из списка
- **predecessor** редактор - для задания предшественника текущей редактируемой задачи. Этот редактор получает [WBS коды задач](guides/specifying-columns.md#wbscode) для установки соединения с предшествующей задачей.

~~~js
const editors = {
    text: { type: "text", map_to: "text" },
    start_date: { type: "date", map_to: "start_date", min: new Date(2025, 0, 1),
        max: new Date(2026, 0, 1) },
    end_date: { type: "date", map_to: "end_date", min: new Date(2025, 0, 1), 
        max: new Date(2026, 0, 1) },
    duration: { type: "number", map_to: "duration", min: 0, max: 100 },
    priority: { type: "select", map_to: "priority",
        options: gantt.serverList("priority") },
    predecessors: { type: "predecessor", map_to: "auto" }
};
~~~

### Даты и ограничения в редакторе date {#dateslimits}

Начиная с версии v6.3, для минимальных и максимальных значений ввода встроенных редакторов типа **date** по умолчанию ограничений нет.

Если вам нужно ограничивать минимальные и максимальные значения даты на временной шкале (за исключением указанных вами min/max значений), можно задать динамические значения **min/max**:

~~~js
const dateEditor = {
    type: "date",
    map_to: "start_date",
    min: taskId => gantt.getState().min_date,
    max: taskId => gantt.getState().max_date
};
~~~

### Редактор для включительных дат окончания {#inclusiveenddate}

Если вы используете формат включительных дат окончания задач и хотите корректно работать с инлайн-редактированием в гриде, вам нужно создать специальный редактор для редактирования включительных дат окончания задач, как в примере:

~~~js
// inclusive editor for end dates
// use the default editor, but override the set_value/get_value methods
const dateEditor = gantt.config.editor_types.date;

gantt.config.editor_types.end_date = gantt.mixin({
    set_value: function(value, id, column, node) {
        const correctedValue = gantt.date.add(value, -1, "day");
        return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
    },
    get_value: function(id, column, node) {
        const selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
        return gantt.date.add(selectedValue, 1, "day");
    }
}, dateEditor);

const textEditor = { type: "text", map_to: "text" };
const startDateEditor = { type: "date", map_to: "start_date" };
const endDateEditor = { type: "end_date", map_to: "end_date" };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };

gantt.config.columns = [
    { name: "text", label: "Name", tree: true, width: 200, editor: textEditor, 
        resize: true },
    { name: "duration", label: "Duration", width: 80, align: "center", 
        editor: durationEditor, resize: true },
    { name: "start_date", label: "Start", width: 140, align: "center", 
        editor: startDateEditor, resize: true },
    { name: "end_date", label: "Finish", width: 140, align: "center", 
        editor: endDateEditor, resize: true }
];

// change lightbox and grid templates to display dates of tasks in an inclusive format
gantt.templates.task_end_date = date => 
    gantt.templates.task_date(new Date(date.valueOf() - 1));

const gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = (date, column) =>
    column === "end_date"
        ? gridDateToStr(new Date(date.valueOf() - 1))
        : gridDateToStr(date);
~~~

**Related sample** [Inclusive end date editor](https://snippet.dhtmlx.com/ds28tk3c)

Для получения дополнительной информации по форматированию дат окончания смотрите статью [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).

### Форматирование значений редактора predecessor {#linkformatter}

:::note
Эта функциональность доступна только в версии PRO.
:::

Начиная с v6.3 Gantt позволяет задавать типы связей, а также лаг/lead значения напрямую из встроенного редактора.

Для этого необходимо использовать модуль [Link Formatter](guides/formatters-ext.md#linkformatter) и передать экземпляр *LinksFormatter* в редактор **predecessor**:

~~~js
const formatter = gantt.ext.formatters.durationFormatter({
    enter: "day",
    store: "day",
    format: "auto"
});

const linksFormatter = gantt.ext.formatters.linkFormatter({
    durationFormatter: formatter
});

const editors = {
    text: { type: "text", map_to: "text" },
    start_date: { type: "date", map_to: "start_date", min: new Date(2025, 0, 1),
        max: new Date(2026, 0, 1) },
    end_date: { type: "date", map_to: "end_date", min: new Date(2025, 0, 1),
        max: new Date(2026, 0, 1) },
    duration: { type: "duration", map_to: "duration", min: 0,
        max: 100, formatter: formatter },
    priority: { type: "select", map_to: "priority",
        options: gantt.serverList("priority") },
    predecessors: { type: "predecessor", map_to: "auto", formatter: linksFormatter }
};

gantt.config.columns = [
    { name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode },
    { name: "text", label: "Name", tree: true, width: 200,
        editor: editors.text, resize: true },
    { name: "start_date", label: "Start", width: 80, align: "center",
        editor: editors.start_date, resize: true },
    { name: "predecessors", label: "Predecessors", width: 80, align: "left",
        editor: editors.predecessors, resize: true, template: task => {
            const links = task.$target || [];
            const labels = links.map(id => {
                const link = gantt.getLink(id);
                return linksFormatter.format(link);
            });
            return labels.join(", ");
        }
    },
    { name: "add" }
];
~~~

[Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)

Раздел ниже предоставляет примеры кода для следующих пользовательских редакторов:

- [Простой числовой ввод](guides/inline-editing.md#custominlineeditor)
- [JQuery Datepicker ввод](guides/inline-editing.md#jquery_datepicker)

## Пользовательский встроенный редактор {#custominlineeditor}

Вы также можете задать свой пользовательский inline редактор. Для этого нужно создать новый объект редактора следующим образом:

~~~js
gantt.config.editor_types.custom_editor = {
    show: (id, column, config, placeholder) => {
        // вызывается, когда инлайн-редактор отображается, поместите HTML-разметку редактора в
        // placeholder и при необходимости инициализируйте ваш редактор:
        const html = "<div><input type='text' name='" + column.name + "'></div>";
        placeholder.innerHTML = html;
    },
    hide: () => {
        // вызывается, когда ввод скрывается
        // удалите любые сложные редакторы или от detach-событий здесь
    },
    set_value: (value, id, column, node) => {
        // задать значение поля ввода
    },
    get_value: (id, column, node) => {
        // вернуть значение ввода
    },
    is_changed: (value, id, column, node) => {
        // вызывается перед сохранением
        // вернуть true, если новое значение отличается от исходного
        // возвращение true инициирует сохранение изменений, а false пропустит сохранение
    },
    is_valid: (value, id, column, node) => {
        // валидировать, если вернуть false, изменения будут отброшены
        return true/false;
    },
    save: (id, column, node) => {
        // только для вводов с map_to:auto. здесь размещается сложная логика сохранения
    },
    focus: (node) => {
        // 
    }
};
~~~

Вот более подробное описание типов:

- <span class="submethod">**show (id, column, config, placeholder): void**</span> - функция вызывается при открытии inline редактора. Здесь можно добавить контейнер для DOM-элементов и инициализировать сторонние библиотеки. Параметры:
    - **_id_** - (*string | number*) - ID задачи
    - **_column_** - (*GridColumn*) - объект конфигурации столбца
    - **_config_** - (*any*) - конфигурационный объект пользовательского inline редактора
    - **_placeholder_** - (*HTMLElement*) - DOM-элемент inline редактора
- <span class="submethod">**hide? (): void**</span> - необязательно, функция вызывается при скрытии inline редактора
- <span class="submethod">**set_value (value, id, column, node): void**</span> - вызывается после функции **show**. Здесь нужно установить значения в элементы inline редактора из объекта **task**. Параметры:
    - **_value_** - (*any*) - значение свойства задачи
    - **_id_** - (*string | number*) - ID задачи
    - **_column_** - (*GridColumn*) - объект конфигурации столбца
    - **_node_** - (*HTMLElement*) - DOM-элемент inline редактора
- <span class="submethod">**get_value (id, column, node): any**</span> - вызывается перед скрытием редактора. Нужно получить значения из inline редактора и добавить их в объект задачи. Параметры:
    - **_id_** - (*string | number*) - ID задачи
    - **_column_** - (*GridColumn*) - объект конфигурации столбца
    - **_node_** - (*HTMLElement*) - DOM-элемент inline редактора
- <span class="submethod">**is_changed? (value, id, column, node): boolean**</span> - необязательно, функция вызывается перед скрытием редактора. Если вернуть **true**, изменения будут сохранены; иначе — отменены. Параметры:
    - **_value_** - (*any*) - значение свойства задачи
    - **_id_** - (*string | number*) - ID задачи
    - **_column_** - (*GridColumn*) - объект конфигурации столбца
    - **_node_** - (*HTMLElement*) - DOM-элемент inline редактора
- <span class="submethod">**is_valid? (value, id, column, node): boolean**</span> - необязательно, функция для валидации. Если вернуть **false**, изменения будут отменены. Параметры:
    - **_value_** - (*any*) - значение свойства задачи
    - **_id_** - (*string | number*) - ID задачи
    - **_column_** - (*GridColumn*) - объект конфигурации столбца
    - **_node_** - (*HTMLElement*) - DOM-элемент inline редактора
- <span class="submethod">**save? (id, column, node): void**</span> - необязательно, функция для сложного поведения сохранения, когда редактор имеет свойство `map_to:auto`. Параметры:
    - **_id_** - (*string | number*) - ID задачи
    - **_column_** - (*GridColumn*) - объект конфигурации столбца
    - **_node_** - (*HTMLElement*) - объект задачи
- <span class="submethod">**focus? (node): void**</span> - необязательно, эта функция вызывается, когда встроенный редактор получает фокус.
    - **_node_** - (*HTMLElement*) - DOM-элемент inline редактора

Есть несколько ключевых моментов, которые помогут сделать редактор повторно используемым:

- Как правило, **`get_value`** не изменяет объект задачи. Этот метод просто возвращает текущее значение inline редактора. Если значение признано валидным, Gantt автоматически обновит соответствующую задачу.
- Используйте опцию конфигурации редактора **map_to** для указания того, какое свойство задачи должно обновляться редактором, но не прописывайте его жестко внутри редактора. Это позволяет повторно использовать редактор для разных столбцов.
- Если вы не используете сложный виджет на JavaScript, вам не нужно определять логику в функции **`hide`**; можно оставить её пустой. Иначе используйте этот метод, чтобы вызвать деструктор или очистить любые обработчики событий, которые вы привязали при отображении редактора.
- Обязательно реализуйте функции **`is_changed`** и **`is_valid`**:
  - Если **`is_changed`** всегда возвращает *true*, редактор будет запускать обновление (которое можно отправить на сервер) каждый раз при закрытии редактора. Эта функция должна возвращать *true* только если введённое значение действительно изменилось по сравнению с исходным состоянием;
  - **`is_valid`** используется для предотвращения ввода недопустимых значений.
- Если вы реализуете редактор, который делает что-то более сложное, чем простое присвоение значения свойству задачи — хороший пример это встроенный редактор predecessor — вам нужно реализовать необходимую логику в функции **`save`** и указать опцию ввода **map_to** как *"auto"*. В таком случае gantt не будет изменять объект задачи напрямую, а вызовет функцию **`save`**, когда настало время применить изменения редактора.

Ниже пример реализации простого числового ввода.
Обратите внимание, что метод **`hide`** может быть пустым, а метод **`save`** можно пропустить.

~~~js
const getInput = node => node.querySelector("input");

gantt.config.editor_types.simpleNumber = {
    show: (id, column, config, placeholder) => {
        const min = config.min ?? 0,
            max = config.max ?? 100;
        const html = "<div><input type='number' min='" + min + 
            "' max='" + max + 
            "' name='" + column.name + "'></div>";
        placeholder.innerHTML = html;
    },
    hide: () => {
        // может быть пустым, поскольку после отсоединения редактора из DOM у нас нечего очищать
    },
    set_value: (value, id, column, node) => {
        getInput(node).value = value;
    },
    get_value: (id, column, node) => {
        return getInput(node).value || 0;
    },
    is_changed: function(value, id, column, node) {
        const currentValue = this.get_value(id, column, node);
        return Number(value) !== Number(currentValue);
    },
    is_valid: (value, id, column, node) => {
        return !isNaN(parseInt(value, 10));
    },
    focus: node => {
        const input = getInput(node);
        if (!input) return;
        if (input.focus) input.focus();
        if (input.select) input.select();
    }
};
~~~

После этого редактор можно использовать так же, как и встроенные редакторы:

~~~js
const numberEditor = { type: "simpleNumber", map_to: "quantity", min: 0, max: 50 };

gantt.config.columns = [
    ...
    { name: "quantity", label: "Quantity", width: 80, editor: numberEditor,
        resize: true },
    ...
];
~~~

Обратите внимание, что в данном случае нам не нужно реализовывать метод **`hide`**, так как Gantt автоматически отсоединяет DOM-элемент редактора, и больше ничего очищать не требуется.

### editor.hide {#jquery_datepicker}

Вам может понадобиться добавить логику **`hide`**, если внутри inline редактора используется сложный виджет.

Например, рассмотрим реализацию DatePicker с использованием jQuery.
В таком случае необходимо уничтожать виджет date picker после его отсоединения из DOM.

Prerequisites:

~~~js
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
~~~

Редактор:

~~~js
gantt.config.editor_types.custom_datepicker_editor = {
    show: (id, column, config, placeholder) => {
        placeholder.innerHTML =
            `<div><input type="text" id="datepicker" name="${column.name}"></div>`;
        $("#datepicker").datepicker({
            dateFormat: "yy-mm-dd",
            onSelect: () => gantt.ext.inlineEditors.save()
        });
    },
    hide: (node) => {
        $("#datepicker").datepicker("destroy");
    },
    set_value: (value, id, column, node) => {
        $("#datepicker").datepicker("setDate", value);
    },
    get_value: (id, column, node) => {
        return $("#datepicker").datepicker("getDate");
    },
    is_changed: (value, id, column, node) => {
        return +$("#datepicker").datepicker("getDate") !== +value;
    },
    is_valid: (value, id, column, node) => {
        return !isNaN(+$("#datepicker").datepicker("getDate"));
    },
    save: (id, column, node) => {
    },
    focus: (node) => {
    }
};

const dateEditor = { type: "custom_datepicker_editor", map_to: "start_date" };

gantt.config.columns = [
    { name: "text", tree: true, width: '*', resize: true },
    { name: "start_date", align: "center", resize: true, editor: dateEditor },
    { name: "duration", align: "center" },
    { name: "add", width: 44 }
];
~~~

**Related sample** [Using jQuery Datepicker in the editor](https://plnkr.co/edit/U3vHJvleRBJ1Js0N?preview)

### editor.save

Используйте функцию **`save`** только тогда, когда вашему редактору нужно одновременно изменить несколько свойств задачи или если вы хотите изменить объекты, отличные от задач.

В таком случае можно сохранить правильную реализацию **`get_value`** ради встроенной валидации, но gantt сам не будет пытаться применить значение редактора к задаче и вызовет функцию **`save`** вместо этого.

После того как будет вызвана **`save`**, вам нужно интерпретировать введённые значения и применить изменения в gantt с помощью пользовательского кода.
Gantt вызовет событие [onSave](guides/inline-editors-ext.md#events) после завершения метода **`save`**, но не вызовет [gantt.updateTask](api/method/updatetask.md) для изменённой строки.

**Примечание!** Метод **`save`** будет вызван только если вы указали в конфигурации редактора **`map_to:"auto"`**:

~~~js
const editors = {
    ...
    predecessors: { type: "predecessor", map_to: "auto" }
};
~~~

Хорошим примером такого управления является встроенный редактор predecessor. Его упрощённую реализацию можно найти в связанном примере:

**Related sample** [Built-in predecessor editor](https://snippet.dhtmlx.com/xz6192wd)

## Режимы инлайн-редактирования

### Базовое инлайн-редактирование

Этот режим предполагает использование мыши для установки фокуса на ячейки и горячих клавиш для навигации между ними:

- Tab - переместить фокус на следующий редактор
- Shift+Tab - вернуть фокус к предыдущему редактору

[Inline editing](https://docs.dhtmlx.com/gantt/samples/07_grid/11_inline_edit_basic.html)

### Режим навигации с клавиатуры

В этом режиме клавиатура используется как для навигации, так и для редактирования ячеек грид с помощью заранее определённых клавиш или их комбинаций.

- Enter - открыть/закрыть редактор
- Пробел - открыть редактор
- Стрелки — перемещаться по ячейкам грид
- Shift+Right Arrow Key - переместить задачу вправо, то есть сделать вложенную задачу, а предыдущая задача станет проектом
- Shift+Left Arrow Key - превратить проект в обычную задачу
- Shift+Up Arrow Key - свернуть ветку с задачами
- Shift+Down Arrow Key - развернуть ветку с задачами

Чтобы включить навигацию клавиатурой для редактирования, нужно:

- включить плагин **keyboard_navigation** с помощью метода [gantt.plugins](api/method/plugins.md)

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

- включить [keyboard navigation](guides/keyboard-navigation.md) и навигацию по ячейкам:

~~~js
gantt.config.keyboard_navigation = true;
gantt.config.keyboard_navigation_cells = true;
~~~

Дополнительно можно включить [placeholder row](api/config/placeholder_task.md) — пустую строку в конце списка задач. Ваш пользователь может редактировать её, чтобы добавить новые задачи в gantt.

~~~js
gantt.config.placeholder_task = true;
~~~

Если нужно, чтобы фокус перемещался к строке-заглушке после добавления новой задачи, используйте следующую конфигурацию:

~~~js
gantt.config.placeholder_task = {
    focusOnCreate: true
};
~~~

При необходимости можно также включить [автоматическое определение типов задач](api/config/auto_types.md):

~~~js
gantt.config.auto_types = true;
~~~

[Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)

### Пользовательское инлайн-редактирование

Вы также можете задать пользовательскую карту клавиатуры, т.е. описать логику открытия редакторов пользователем, указать обработчики событий редактора (открытие, закрытие редакторов, начало и конец редактирования и т.д.)
в отдельном объекте и затем передать этот объект в специальный метод, который применит вашу схему отображения:

~~~js
const mapping = {
    init: (inlineEditors) => {
        // модуль inlineEditor инициализирован
        // добавьте глобальные обработчики запуска/завершения редактирования
    },

    onShow: (inlineEditors, node) => {
        // редактор отображён
    },

    onHide: (inlineEditors, node) => {
        // редактор скрыт
        // при необходимости очистить изменения onShow
    }
};

gantt.ext.inlineEditors.setMapping(mapping);
~~~


[Inline editing - Custom keyboard mapping](https://docs.dhtmlx.com/gantt/samples/07_grid/13_custom_mapping.html)

### Пользовательская карта для placeholder задачи

Предположим, что вы используете навигацию клавиатуры, встроенные редакторы и placeholder задачу в вашем гриде и рассмотрим две реальные ситуации.

Ситуация 1. Когда вы вводите имя для новой placeholder задачи и нажимаете Tab, ожидаете, что Gantt откроет следующую ячейку для этой задачи. Вместо этого фокус переходит к новой placeholder задаче ниже и редактор не открывается.

Ситуация 2. Если вы вводите имя новой placeholder задачи и затем кликаете на следующую ячейку мышью, Gantt переводит фокус к следующей placeholder задаче вместо того, чтобы перевести фокус на ячейку, на которую вы кликнули.

Пользовательская карта поможет вам решить описанные выше проблемы. Нужно просто определить логику поведения inline редактора при обработке мыши и нажатий клавиш. Выглядит пример так:

**Related sample** [Gantt. Custom mapping for placeholder task](https://snippet.dhtmlx.com/xcgiommu)

## Валидация введённых значений

Во время редактирования ячейки в Grid вы можете допускать ошибки.

Чтобы избежать сохранения некорректных значений, необходимо валидировать введённые значения перед закрытием редактора. Это можно сделать двумя способами:

- через метод **is_valid** пользовательского редактора
- через событие **onBeforeSave** объекта [inlineEditors](guides/inline-editors-ext.md)

Рассмотрим поведение редактора при включенной валидации.

Например, вы открыли редактор в ячейке гриды с помощью мыши. Далее применяются следующие действия:

- Нажатие Escape после редактирования ячейки закроет редактор без сохранения изменений.
- Нажатие Enter подтвердит и закроет редактор, если значение валидно, в противном случае введённое значение будет отброшено.
- Нажатие Tab или использование мыши во время редактирования ячейки сохранит валидное значение и переместит фокус на другую ячейку, в то время как неверное значение будет сброшено и редактор закроется.

:::note
Для информации о том, как выполнить валидацию на стороне клиента или сервера, смотрите статью Validation.
:::

### Предотвращение закрытия редактора

При включенной валидации редактор не сохраняет некорректный ввод, а сбрасывает его и закрывает редактор. Чтобы открыть ячейку заново и изменить значения, используйте подходящий способ.

Хороший способ предотвратить закрытие редактора — показать всплывающее окно-оповещение, которое даст пользователю возможность исправить неверное значение. Для этого нужно использовать пользовательскую карту клавиатуры, как в примере:

~~~js
function customValidation() {
    const state = gantt.ext.inlineEditors.getState()
    if (!state.id){
        return
    }
    const value = gantt.ext.inlineEditors.getValue()
    if (state.columnName == "start_date" || state.columnName == "end_date") {
        if (value.getFullYear() != 2025) {
            gantt.message({ text: "Validation failed", type: "error" })
            return false
        }
    }
    if (state.columnName == "duration") {
        if (value > 4) {
            gantt.message({ text: "Validation failed", type: "error" })
            return false
        }
    }

    return true
}

const mapping = {
    init: function (inlineEditors) {
        keyNav.attachEvent("onBeforeFocus", function (e) {
            if (gantt.ext.inlineEditors.isVisible()) {
                return false;
            }
        });

        gantt.attachEvent("onTaskClick", function (id, e) {
            const cell = inlineEditors.locateCell(e.target);
            if (!gantt.ext.inlineEditors.isVisible()) {
                if (cell && inlineEditors.getEditorConfig(cell.columnName)) {
                    inlineEditors.startEdit(cell.id, cell.columnName);
                    return false;
                }
            }
            return true;

        });

        keyNav.attachEvent("onKeyDown", function (id, e) {

            const editorOpened = gantt.ext.inlineEditors.isVisible();
            if (editorOpened && e.keyCode >= 37 && e.keyCode <= 40) return false;
            return true;
        });

        gantt.attachEvent("onEmptyClick", function () {

            if (customValidation()) {
                inlineEditors.hide();
            }
            return true;
        });
    },

    onShow: function (inlineEditors, node) {

        node.onkeydown = function (e) {
            e = e || window.event;
            if (e.defaultPrevented) {
                return;
            }

            const keyboard = gantt.constants.KEY_CODES;

            let shouldPrevent = true;
            switch (e.keyCode) {
                case gantt.keys.edit_save:
                    if (customValidation()) {
                        inlineEditors.save();
                    }

                    break;
                case gantt.keys.edit_cancel:
                    inlineEditors.hide();

                    break;
                case keyboard.TAB:
                    if (e.shiftKey) {
                        inlineEditors.editPrevCell(true);
                    } else {
                        inlineEditors.editNextCell(true);
                    }
                    break;
                default:
                    shouldPrevent = false;
                    break;
            }


            if (shouldPrevent) {
                e.preventDefault();
            }
        };
    },

    onHide: function (inlineEditors, node) { }
};

gantt.ext.inlineEditors.setMapping(mapping);
gantt.init("gantt_here");
~~~

**Related sample** [Validation for inline editors via custom mapping](https://snippet.dhtmlx.com/efsftrq1)

## Открытие редактора по одному клику

В режиме одиночного выделения Gantt открывает inline редактор после того, как вы кликнули по задаче.

В режиме [много выбора](guides/multiselection.md) после клика по незап selected задаче Gantt выберет её и откроет inline редактор только после второго клика.
Если вы хотите, чтобы Gantt открывал inline редактор после первого клика, включите конфигурацию [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md).

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~