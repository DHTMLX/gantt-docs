---
title: "Редактирование 'на месте' в гриде"
sidebar_label: "Редактирование 'на месте' в гриде"
---

# Редактирование "на месте" в гриде

dhtmlxGantt предлагает два способа редактирования содержимого:

- с помощью формы редактирования [Lightbox](guides/default-edit-form.md)
- с помощью встроенных редакторов непосредственно в области грида

Редактирование "на месте" позволяет вносить изменения прямо из грида: создавать и обновлять задачи, устанавливать связи между ними, задавать даты начала и окончания, а также изменять длительность - всё это через встроенные редакторы.

![Inline grid editing](/img/inline_grid_editing.png)

Чтобы включить редактирование "на месте", необходимо:

- определить список конфигураций редакторов и использовать свойство **map_to** в объекте редактора для привязки его к соответствующей колонке грида

~~~js
var textEditor = {type: "text", map_to: "text"};
var dateEditor = {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), 
    max: new Date(2019, 0, 1)};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};
~~~

- указать свойство **editor** в конфигурации колонки для назначения редактора этой колонке

~~~js
gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true, editor: textEditor},
    {name: "start_date", align: "center", resize: true, editor: dateEditor},
    {name: "duration", align: "center", editor: durationEditor},
    {name: "add", width: 44}
];
~~~


[Inline editing](https://docs.dhtmlx.com/gantt/samples/07_grid/11_inline_edit_basic.html)


:::note
Подробнее об API объекта *inlineEditors* читайте в статье [Inline Editors Extension](guides/inline-editors-ext.md).
:::

Также доступно видео, демонстрирующее реализацию редактирования "на месте" в гриде.

<iframe width="704" height="400" src="https://www.youtube.com/embed/0rIPrC0GtME" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Типы редакторов {#typesofeditors}

Встроенные редакторы определяются в объекте конфигурации [editor_types](api/config/editor_types.md).

В Gantt предопределено несколько встроенных редакторов:

- **text** редактор - для текстовых колонок, таких как имя задачи
- **number** редактор - для числовых колонок, например, длительность задачи или порядок
- **duration** редактор - для колонок длительности, особенно если используется **map_to: "duration"** и тип редактора **"duration"**:

~~~js
{ type: "duration", map_to: "duration", formatter: formatter }
~~~

Этот тип редактора полезен, когда требуется указывать длительность с числом и [единицей измерения длительности](api/config/duration_unit.md), например: `5 days`. По умолчанию используется [Duration Formatter](guides/formatters-ext.md#durationformatter). Вы также можете настроить его или использовать [пользовательский форматтер](guides/formatters-ext.md#customformatter).

- **date** редактор - для редактирования дат, например, начала и окончания задачи
- **select** редактор - для выбора значения из списка
- **predecessor** редактор - для указания предшественников задачи. Этот редактор использует [WBS-коды задач](guides/specifying-columns.md#wbscode) для установления связей с предшествующими задачами.

~~~js
var editors = {
    text: {type: "text", map_to: "text"},
    start_date: {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), 
        max: new Date(2019, 0, 1)},
    end_date: {type: "date", map_to: "end_date", min: new Date(2018, 0, 1), 
        max: new Date(2019, 0, 1)},
    duration: {type: "number", map_to: "duration", min:0, max: 100},
    priority: {type:"select", map_to:"priority", options:gantt.serverList("priority")},
    predecessors: {type: "predecessor", map_to: "auto"}
};
~~~

### Ограничения дат в редакторе дат {#dateslimits}

Начиная с версии 6.3, для встроенных редакторов типа **date** нет предустановленных минимальных и максимальных значений.

Если вы хотите, чтобы видимые даты на временной шкале определяли min и max значения для редактора **date** (если не заданы пользовательские min/max), можно использовать динамические функции **min/max**:

~~~js
const dateEditor = {type: "date", map_to: "start_date", 
    min: function(taskId){
      return gantt.getState().min_date
    },
    max: function( taskId ){
      return gantt.getState().max_date
    }
};
~~~

### Редактор для включительных дат окончания {#inclusiveenddate}

Если вы используете [включительный формат даты окончания](api/template/task_end_date.md) для задач и хотите корректно поддерживать редактирование "на месте" в гриде, потребуется специальный редактор для включительных дат окончания:

~~~js
// редактор для включительных дат окончания
// используем стандартный редактор, но переопределяем методы set_value/get_value
var dateEditor = gantt.config.editor_types.date;
gantt.config.editor_types.end_date = gantt.mixin({
   set_value: function(value, id, column, node){
        var correctedValue = gantt.date.add(value, -1, "day");
        return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
   },
   get_value: function(id, column, node) {
        var selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
        return gantt.date.add(selectedValue, 1, "day");
   },
}, dateEditor);

var textEditor = {type: "text", map_to: "text"};
var startDateEditor = {type: "date", map_to: "start_date"};
var endDateEditor = {type: "end_date", map_to: "end_date"};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};

gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, editor: textEditor, 
        resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", 
        editor: durationEditor, resize: true},
    {name: "start_date", label: "Start", width:140, align: "center", 
        editor: startDateEditor, resize: true},
    {name: "end_date", label: "Finish", width:140, align: "center", 
        editor: endDateEditor, resize: true}
];

// обновляем шаблоны lightbox и грида для отображения включительных дат окончания
gantt.templates.task_end_date = function(date){
    return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};


var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
    if(column === "end_date"){
        return gridDateToStr(new Date(date.valueOf() - 1)); 
    }else{
        return gridDateToStr(date); 
    }
}
~~~


**Related example:** [Редактор включительной даты окончания](https://snippet.dhtmlx.com/ds28tk3c)


Подробнее о форматировании дат окончания читайте в статье [Отображение даты окончания задачи и включительные даты окончания](guides/loading.md#taskenddatedisplayampinclusiveenddates).

### Форматирование значений редактора Predecessor {#linkformatter}

:::note
Эта функция доступна только в PRO-версии.
:::

Начиная с версии 6.3, Gantt поддерживает указание типов связей, а также значений лаг/лид непосредственно во встроенном редакторе.

Для этого используйте модуль [Link Formatter](guides/formatters-ext.md#linkformatter) и передайте экземпляр *LinksFormatter* в редактор **predecessor**:

~~~js
var formatter = gantt.ext.formatters.durationFormatter({
    enter: "day", 
    store: "day", 
    format: "auto"
});
var linksFormatter = gantt.ext.formatters.linkFormatter({durationFormatter: formatter});
 
var editors = {
    text: {type: "text", map_to: "text"},
    start_date: {type: "date", map_to: "start_date", 
                min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)},
    end_date: {type: "date", map_to: "end_date", 
                min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)},
    duration: {type: "duration", map_to: "duration", 
                min:0, max: 100, formatter: formatter},
    priority: {type: "select", map_to: "priority", 
                options:gantt.serverList("priority")},
    predecessors: {type: "predecessor", map_to: "auto", formatter: linksFormatter} /*!*/
};
 
gantt.config.columns = [
    {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
    {name: "text", label: "Name", tree: true, width: 200, editor: editors.text, 
        resize: true},
    {name: "start_date", label: "Start", width:80, align: "center", 
      editor: editors.start_date, resize: true},
    {name: "predecessors", label: "Predecessors",width:80, align: "left", 
      editor: editors.predecessors, resize: true, template: function(task){
            var links = task.$target;
            var labels = [];
            for(var i = 0; i < links.length; i++){
                var link = gantt.getLink(links[i]);
                labels.push(linksFormatter.format(link)); /*!*/
            }
            return labels.join(", ")
        }},
    {name:"add"}
];
~~~


[Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)


Ниже приведены примеры кода для пользовательских редакторов:

- [Простой числовой input](guides/inline-editing.md#custominlineeditor)
- [JQuery Datepicker input](guides/inline-editing.md#jquery_datepicker)

## Пользовательский редактор "на месте" {#custominlineeditor}

Вы можете создать собственный редактор "на месте", определив новый объект редактора следующим образом:

~~~js
gantt.config.editor_types.custom_editor = {
  show: function (id, column, config, placeholder) {
    // вызывается при отображении редактора, вставьте HTML-разметку в placeholder 
    // и инициализируйте необходимые редакторы:
    var html = "<div><input type='text' name='" + column.name + "'></div>";
       placeholder.innerHTML = html;
  },
  hide: function () {
    // вызывается при скрытии редактора
    // здесь можно очистить сложные редакторы или удалить обработчики событий
  },
  
  set_value: function (value, id, column, node) {
    // установить значение в input
  },
  
  get_value: function (id, column, node) {
    // вернуть значение из input
  },
  
  is_changed: function (value, id, column, node) {
    // вызывается перед сохранением/закрытием. Верните true, если новое значение отличается от исходного
    // true инициирует сохранение изменений, false - пропускает сохранение 
  },
  
  is_valid: function (value, id, column, node) {
    // валидация значения, возврат false отменяет изменения
    return true/false;
  },

  save: function (id, column, node) {
     // для input с map_to:auto. Здесь реализуется сложная логика сохранения
  },
  focus: function (node) {
  }
}
~~~

Описание методов:

- <span class="submethod">**show (id, column, config, placeholder): void**</span> - вызывается при открытии редактора "на месте". Здесь добавляются DOM-элементы и инициализируются сторонние библиотеки. Параметры:
    - **_id_** - (*string | number*) - ID задачи
    - **_column_** - (*GridColumn*) - объект конфигурации колонки
    - **_config_** - (*any*) - объект конфигурации редактора
    - **_placeholder_** - (*HTMLElement*) - DOM-элемент редактора "на месте"
- <span class="submethod">**hide? (): void**</span> - необязательный, вызывается при закрытии редактора
- <span class="submethod">**set_value (value, id, column, node): void**</span> - вызывается после **show** для установки значения из объекта задачи. Параметры:
    - **_value_** - (*any*) - значение свойства задачи
    - **_id_** - (*string | number*) - ID задачи
    - **_column_** - (*GridColumn*) - объект конфигурации колонки
    - **_node_** - (*HTMLElement*) - DOM-элемент редактора "на месте"
- <span class="submethod">**get_value (id, column, node): any**</span> - вызывается перед закрытием для получения значения из редактора. Параметры:
    - **_id_** - (*string | number*) - ID задачи
    - **_column_** - (*GridColumn*) - объект конфигурации колонки
    - **_node_** - (*HTMLElement*) - DOM-элемент редактора "на месте"
- <span class="submethod">**is_changed? (value, id, column, node): boolean**</span> - необязательный, вызывается перед закрытием. Верните **true** для сохранения изменений, **false** для отмены. Параметры:
    - **_value_** - (*any*) - значение свойства задачи
    - **_id_** - (*string | number*) - ID задачи
    - **_column_** - (*GridColumn*) - объект конфигурации колонки
    - **_node_** - (*HTMLElement*) - DOM-элемент редактора "на месте"
- <span class="submethod">**is_valid? (value, id, column, node): boolean**</span> - необязательный метод валидации. Верните **false** для отклонения изменений. Параметры:
    - **_value_** - (*any*) - значение свойства задачи
    - **_id_** - (*string | number*) - ID задачи
    - **_column_** - (*GridColumn*) - объект конфигурации колонки
    - **_node_** - (*HTMLElement*) - DOM-элемент редактора "на месте"
- <span class="submethod">**save? (id, column, node): void**</span> - необязательный, для сложного сохранения с `map_to:auto`. Параметры:
    - **_id_** - (*string | number*) - ID задачи
    - **_column_** - (*GridColumn*) - объект конфигурации колонки
    - **_node_** - (*HTMLElement*) - объект задачи
- <span class="submethod">**focus? (node): void**</span> - необязательный, вызывается при получении редактором фокуса.
    - **_node_** - (*HTMLElement*) - DOM-элемент редактора "на месте"

Ключевые моменты для повторно используемых редакторов:

- Обычно **`get_value`** должен только возвращать текущее значение редактора, не модифицируя объект задачи. Если значение валидно, Gantt обновит задачу автоматически.
- Используйте параметр **`map_to`** для указания, какое свойство задачи обновляет редактор, чтобы не привязывать это внутри редактора и обеспечить повторное использование.
- Метод **`hide`** часто можно оставить пустым, если не требуется удалять обработчики событий или уничтожать сложные виджеты.
- Реализуйте методы **`is_changed`** и **`is_valid`**:
  - **`is_changed`** должен возвращать true только если значение действительно изменилось, чтобы избежать лишних обновлений.
  - **`is_valid`** предотвращает ввод некорректных данных.
- Для редакторов, которые делают больше, чем просто обновляют свойство (например, встроенный [predecessor editor](guides/inline-editing.md#typesofeditors)), реализуйте логику в **`save`** и установите **`map_to`** в *"auto"*. В этом случае gantt не будет напрямую изменять задачу, а вызовет **`save`** для применения изменений.

Пример простого редактора для числового значения. Метод **`hide`** пустой, а **`save`** не реализован.

~~~js
var getInput = function(node){
    return node.querySelector("input");
};

gantt.config.editor_types.simpleNumber = {
    show: function (id, column, config, placeholder) {
        var min = config.min || 0,
        max = config.max || 100;

        var html = "<div><input type='number' min='" + min + 
                      "' max='" + max + "' name='" + column.name + "'></div>";
        placeholder.innerHTML = html;
    },
    hide: function () {
      // пусто, так как очистка не требуется после удаления редактора
    },
    set_value: function (value, id, column, node) {
        getInput(node).value = value;
    },
    get_value: function (id, column, node) {
        return getInput(node).value || 0;
    },
    is_changed: function (value, id, column, node) {
        var currentValue = this.get_value(id, column, node);
        return Number(value) !== Number(currentValue);
    },
    is_valid: function (value, id, column, node) {
        return !isNaN(parseInt(value, 10));
    },
    focus: function (node) {
        var input = getInput(node);
        if (!input) {
            return;
        }
        if (input.focus) {
            input.focus();
        }

        if (input.select) {
          input.select();
        }
    }
};
~~~

Далее используйте его как встроенный редактор:

~~~js
var numberEditor = {type: "simpleNumber", map_to: "quantity", min:0, max: 50}; 

gantt.config.columns = [
    ...
    {name: "quantity", label: "Quantity", width: 80, editor: numberEditor, 
        resize: true},
    ...
];
~~~

Поскольку Gantt автоматически удаляет DOM-элемент редактора, дополнительная очистка в **`hide`** не требуется.

### editor.hide {#jquery_datepicker}

При использовании более сложных виджетов в редакторах "на месте" может понадобиться реализация метода **`hide`** для очистки.

Например, вот реализация поля DatePicker с использованием jQuery UI. Виджет datepicker необходимо уничтожить, когда редактор удаляется из DOM.

Необходимые зависимости:

~~~js
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
~~~

Редактор:

~~~js
gantt.config.editor_types.custom_datepicker_editor = {
    show: function (id, column, config, placeholder) {
        placeholder.innerHTML = "<div><input type='text' id='datepicker' name='" + 
                                  column.name + "'></div>";
        $("#datepicker").datepicker({
            dateFormat: "yy-mm-dd",
            onSelect: function(dateStr){
                gantt.ext.inlineEditors.save()
            }
        });
    },
    hide: function (node) {
        $("#datepicker").datepicker( "destroy" );
    },

    set_value: function (value, id, column, node) {
        $("#datepicker").datepicker("setDate", value);
    },

    get_value: function (id, column, node) {
        return $("#datepicker").datepicker( "getDate" );
    },

    is_changed: function (value, id, column, node) {
        return (+$("#datepicker").datepicker( "getDate" ) !== +value);
    },
    is_valid: function (value, id, column, node) {
        return !(isNaN(+$("#datepicker").datepicker( "getDate" )))
    },
    save: function (id, column, node) {
    },
    focus: function (node) {
    }
};

let dateEditor = {
    type: "custom_datepicker_editor",
    map_to: "start_date"
};

gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true},
    {name: "start_date", align: "center", resize: true, editor: dateEditor},
    {name: "duration", align: "center"},
    {name: "add", width: 44}
];
~~~


**Related example:** [Использование jQuery Datepicker в редакторе](https://plnkr.co/edit/U3vHJvleRBJ1Js0N?preview)


### editor.save

Функция **`save`** полезна, когда редактору требуется одновременно обновить несколько свойств задачи или изменить объекты, отличные от задач.

В таких случаях вы всё равно можете реализовать **`get_value`** для встроенной валидации, однако Gantt не будет пытаться напрямую применить значение редактора к задаче. Вместо этого будет вызвана функция **`save`**.

После вызова **`save`** вы должны обработать входные значения и применить необходимые изменения к Gantt с помощью собственного кода. После завершения метода **`save`** Gantt инициирует событие [onSave](guides/inline-editors-ext.md#events). Однако при этом не вызывается [gantt.updateTask](api/method/updatetask.md) для обновлённой строки.

**Важно!** Метод **`save`** вызывается только если в конфигурации редактора установлено **`map_to:"auto"`**:

~~~js
var editors = {
    ...
    predecessors: {type: "predecessor", map_to: "auto"}
};
~~~

Хорошим примером является встроенный редактор предшественников. Упрощённую реализацию можно посмотреть в соответствующем примере:


**Related example:** [Built-in predecessor editor](https://snippet.dhtmlx.com/xz6192wd)


## Режимы инлайн-редактирования {#inlineeditingmodes}

### Базовое инлайн-редактирование

В этом режиме используется мышь для фокусировки на ячейках и горячие клавиши для навигации между ними:

- Tab - перемещает фокус к следующему редактору
- Shift+Tab - возвращает фокус к предыдущему редактору


[Inline editing](https://docs.dhtmlx.com/gantt/samples/07_grid/11_inline_edit_basic.html)


### Режим навигации с клавиатуры

В этом режиме клавиатура используется как для навигации, так и для редактирования ячеек грида с помощью определённых клавиш или их сочетаний:

- Enter - открывает или закрывает редактор
- Пробел - открывает редактор
- Стрелки - перемещение между ячейками грида
- Shift+Стрелка вправо - перемещает задачу вправо, делая её вложенной, а выше стоящая задача становится проектом
- Shift+Стрелка влево - преобразует проект в простую задачу
- Shift+Стрелка вверх - сворачивает ветку задач
- Shift+Стрелка вниз - разворачивает ветку задач

Чтобы включить навигацию с клавиатуры для редактирования, необходимо:

- активировать плагин **keyboard_navigation** с помощью метода [gantt.plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

- включить [навигацию с клавиатуры](guides/keyboard-navigation.md) и навигацию по ячейкам:

~~~js
gantt.config.keyboard_navigation = true;
gantt.config.keyboard_navigation_cells = true;
~~~

Также можно включить [placeholder row](api/config/placeholder_task.md) - это пустая строка в конце списка задач. Пользователь может редактировать эту строку для добавления новых задач.

~~~js
gantt.config.placeholder_task = true;
~~~

Если нужно, чтобы фокус автоматически переходил к placeholder-задаче сразу после добавления новой задачи, используйте:

~~~js
gantt.config.placeholder_task = {
    focusOnCreate: true
};
~~~

При необходимости можно также активировать [автоматическое определение типа задачи](api/config/auto_types.md):

~~~js
gantt.config.auto_types = true;
~~~


[Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)


### Кастомное инлайн-редактирование

Можно определить собственные сочетания клавиш - указать, как открываются редакторы, а также обработать события редактора, такие как открытие, закрытие, начало и завершение редактирования. Для этого создайте отдельный объект с нужной логикой и передайте его в специальный метод для применения вашей схемы:

~~~js
var mapping = {
 init: function(inlineEditors){
  // модуль inlineEditor инициализирован
  // добавить глобальные слушатели начала/завершения редактирования
 },

 onShow: function(inlineEditors, node){
  // редактор открыт
 },

 onHide: function(inlineEditors, node){
  // редактор скрыт
  // при необходимости очистить изменения из onShow
 }
};

gantt.ext.inlineEditors.setMapping(mapping);
~~~


[Inline editing - Custom keyboard mapping](https://docs.dhtmlx.com/gantt/samples/07_grid/13_custom_mapping.html)


### Кастомное отображение для placeholder-задачи

Представьте, что в вашем Gantt используются навигация с клавиатуры, инлайн-редакторы и placeholder-задача. Рассмотрим два распространённых сценария.

**Сценарий 1.** После ввода имени новой placeholder-задачи и нажатия Tab ожидается, что Gantt откроет следующую ячейку для этой задачи. Вместо этого фокус переходит к следующей placeholder-задаче ниже, и инлайн-редактор не открывается.

**Сценарий 2.** После ввода имени новой placeholder-задачи и клика по следующей ячейке Gantt переводит фокус к следующей placeholder-задаче, а не к выбранной ячейке.

Кастомное отображение позволяет обработать эти ситуации, указав, как инлайн-редактор должен реагировать на действия мышью и клавиатурой. Пример:


**Related example:** [Gantt. Custom mapping for placeholder task](https://snippet.dhtmlx.com/xcgiommu)

))

## Валидация вводимых значений {#validationofinputvalues}

При редактировании ячеек в гриде могут возникать ошибки.

Чтобы предотвратить сохранение некорректных значений, необходимо валидировать ввод перед закрытием редактора. Это можно сделать двумя способами:

- через метод **is_valid** [объекта кастомного редактора](guides/inline-editing.md#custominlineeditor)
- с помощью события **onBeforeSave** объекта [inlineEditors](guides/inline-editors-ext.md)

Вот как валидация влияет на поведение редактора:

Если редактор в ячейке грида открыт с помощью мыши, применяются следующие правила:

- Нажатие Escape закрывает редактор без сохранения изменений.
- Нажатие Enter сохраняет и закрывает редактор, если значение корректно; если нет - ввод сбрасывается.
- Нажатие Tab или клик вне редактора сохраняет корректное значение и переводит фокус на другую ячейку; некорректные значения сбрасываются, а редактор закрывается.

:::note
Подробнее о клиентской или серверной валидации смотрите в статье [Валидация](guides/validation.md).
:::

### Предотвращение закрытия редактора

Когда включена валидация, Gantt сбрасывает некорректные значения и закрывает редактор, требуя повторного открытия ячейки для исправления значения.

Практичным способом избежать этого может быть показ alert-окна, позволяющего пользователю исправить значение. Это реализуется с помощью кастомной схемы управления с клавиатуры, например:

~~~js
function editAnotherCell(inlineEditors){
  var value = inlineEditors.getValue();
  if(confirm(`does '${value}' look ok to you?`)){
    inlineEditors.save();
  }
}

var mapping = {
  init: function(inlineEditors){
    gantt.attachEvent("onTaskClick", function (id, e) {
      var cell = inlineEditors.locateCell(e.target);
      if (cell && inlineEditors.getEditorConfig(cell.columnName)) {
        if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
        else inlineEditors.startEdit(cell.id, cell.columnName);
        return false;
      }
      return true;
    });
    gantt.attachEvent("onEmptyClick", function () {
      inlineEditors.hide();
      return true;
    });
  },

  onShow: function(inlineEditors, node){

    node.onkeydown = function (e) {
      e = e || window.event;
      if(e.defaultPrevented){
        return;
      }

      var keyboard = gantt.constants.KEY_CODES;

      var shouldPrevent = true;
      switch (e.keyCode) {
        case gantt.keys.edit_save:
          var value = inlineEditors.getValue();
          if(confirm(`does '${value}' look ok to you?`)){
            inlineEditors.save();
          }
          
          break;
        case gantt.keys.edit_cancel:
          inlineEditors.hide();
          break;
        case keyboard.TAB:
          if(e.shiftKey){
            if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
            else inlineEditors.editPrevCell(true);
          }else{
            if (inlineEditors.isVisible()) editAnotherCell(inlineEditors)
            else inlineEditors.editNextCell(true);
          }
          break;
        default:
          shouldPrevent = false;
          break;
      }

      if(shouldPrevent){
        e.preventDefault();
      }
    };
  },

  onHide: function(inlineEditors, node){}
};

gantt.ext.inlineEditors.setMapping(mapping);

gantt.init("gantt_here");
~~~


**Related example:** [Custom keyboard mapping](https://snippet.dhtmlx.com/5/5da351260)


## Открытие редактора по одному клику {#openingeditorwithoneclick}

В режиме одиночного выбора клик по задаче сразу открывает инлайн-редактор.

В режиме [множественного выбора](guides/multiselection.md) клик по невыбранной задаче сначала выделяет её, а инлайн-редактор открывается только при втором клике. Чтобы редактор открывался при первом клике, включите настройку [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md):

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~

