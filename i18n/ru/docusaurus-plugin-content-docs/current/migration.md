---
title: "Миграция с предыдущих версий"
sidebar_label: "Миграция с предыдущих версий"
---

Миграция с предыдущих версий
=================================================

8.0 -> 9.0
-------------

Обновление до версии 9.0 включает несколько изменений, несовместимых с предыдущими версиями.


### Скины переведены на CSS-переменные

CSS-скины (темы) были полностью переработаны и теперь используют CSS-переменные. Хотя HTML-структура компонента и имена CSS-классов в основном остались прежними, CSS-стили, написанные для более ранних версий Gantt, могут работать некорректно в v9.0.

Например, раньше для окрашивания задач в зависимости от их приоритета использовался следующий стиль:

~~~html
<style>
    /* общие стили для переопределения границ/цвета прогресса */
    .gantt_task_line{
        border-color: rgba(0, 0, 0, 0.25);
    }
    .gantt_task_line .gantt_task_progress {
        background-color: rgba(0, 0, 0, 0.25);
    }

    /* высокий */
    .gantt_task_line.high {
        background-color: #03A9F4;
    }
    .gantt_task_line.high .gantt_task_content {
        color: #fff;
    }

    /* средний */
    .gantt_task_line.medium {
        background-color: #f57730;
    }
    .gantt_task_line.medium .gantt_task_content {
        color: #fff;
    }

    /* низкий */
    .gantt_task_line.low {
        background-color: #e157de;
    }
    .gantt_task_line.low .gantt_task_content {
        color: #fff;
    }
</style>
~~~

Начиная с v9.0 тот же эффект достигается с помощью следующего стиля:

~~~html
<style>
    /* высокий */
    .gantt_task_line.high {
        --dhx-gantt-task-background: #d96c49;
        --dhx-gantt-task-color: #fff;
    }

    /* средний */
    .gantt_task_line.medium {
        --dhx-gantt-task-background: #f57730;
        --dhx-gantt-task-color: #fff;
    }

    /* низкий */
    .gantt_task_line.low {
        --dhx-gantt-task-background: #fff;
        --dhx-gantt-task-color: #fff;
    }
</style>
~~~

Список доступных переменных смотрите на странице [Кастомизация скинов](guides/custom-skins.md).

:::note
Миграция, скорее всего, потребует обновления существующих CSS для достижения нужного дизайна.
:::

### Единый CSS-файл

Все темы теперь включены в один файл **dhtmlxgantt.css**.

Для активации определённого скина используйте свойство `gantt.skin`:

~~~js
gantt.skin = "material";
~~~

Или метод [setSkin](api/method/setskin.md):

~~~js
gantt.setSkin("material");
~~~

:::note
Обратите внимание, что `gantt.setSkin()` приведёт к перерисовке Gantt.
:::

Если вы используете скин, отличный от **terrace**, выполните следующие шаги миграции:

1) Замените CSS-файл скина на файл `dhtmlxgantt.css`:

~~~html
<!-- СТАРОЕ -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt_material.css" type="text/css">
<!-- НОВОЕ -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt.css" type="text/css">
~~~

2) Включите нужный скин через javascript:

~~~js
gantt.setSkin("material");
gantt.init("gantt_here");
~~~

### Встроенная поддержка базовых линий, дедлайнов и ограничений

Ранее добавление базовых линий требовало ручной реализации через API `gantt.addTaskLayer`. В Gantt 9.0 появилась встроенная поддержка сущностей базовых линий, а также дедлайнов и ограничений задач.

Если вы хотите отключить стандартные настройки и реализовать отображение базовых линий и дедлайнов вручную, используйте соответствующие параметры конфигурации: [baselines](api/config/baselines.md) и [deadlines](api/config/deadlines.md):

~~~js
// отключение встроенной функциональности базовых линий
gantt.config.baselines = false;

// отключение встроенной функциональности дедлайнов
gantt.config.deadlines = false;
~~~

Встроенное отображение ограничений задач также можно отключить с помощью расширенной конфигурации [auto_scheduling](api/config/auto_scheduling.md):

~~~js
gantt.config.auto_scheduling = {
  enabled: true, 
  show_constraints: false /*!*/
};
~~~

Это отключает стандартное отображение ограничений задач, но сохраняет работу авто-планирования.

### Фиксированные подписи на временной шкале

Начиная с v9.0 подписи временной шкалы по умолчанию фиксированы (sticky). Это значит, что подписи остаются видимыми на экране при прокрутке, следуя за областью просмотра, пока естественным образом не исчезнут. В предыдущих версиях подписи были выровнены по центру своих ячеек и не оставались видимыми при прокрутке.

Если нужно вернуть старое поведение и отключить фиксированные подписи, установите свойство `sticky` объекта [scale](guides/configuring-time-scale.md) в false:

~~~js
gantt.config.scales = [
  {unit: "year", step: 1, format: "%Y", sticky: false},
  {unit: "month", step: 1, format: "%F", sticky: false},
  {unit: "day", step:1, format: "%j", sticky: false}
];
~~~

### Реализация Promise

Библиотека **Bluebird** была исключена из сборки Gantt. Теперь [Promise](api/method/promise.md) использует нативную реализацию Promise.

### Изменение размера lightbox

Начиная с v9.0 метод [resizeLightbox](api/method/resizelightbox.md) устарел и удалён из кода Gantt. В этом больше нет необходимости, так как изменение размера lightbox теперь работает автоматически.
Обратите внимание: если в вашей конфигурации используется метод **resizeLightbox()**, его следует удалить, чтобы избежать ошибок.

7.1 -> 8.0
-------------

### Назначения ресурсов

В предыдущих версиях DHTMLX Gantt изменения в назначениях ресурсов отправлялись на сервер в виде свойств объектов задач, что иногда усложняло интеграцию с backend API.

Начиная с DHTMLX Gantt v8.0, изменения ресурсов и их назначений могут обрабатываться через dataProcessor. См. раздел [Маршрутизация CRUD-операций ресурсов и их назначений](guides/server-side.md#resources_crud).

### Сервис экспорта

С версии 8.0 функциональность импорта/экспорта включена в библиотеку gantt.

Если у вас уже был подключён **https://export.dhtmlx.com/gantt/api.js** для онлайн-экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

Необходимо удалить этот файл и активировать расширение **export_api** через метод **gantt.plugins**:

~~~js
gantt.plugins({
    export_api: true
});
~~~

### Устаревшие имена классов

Начиная с v8.0 следующие устаревшие имена классов были удалены и заменены на новые:

- ".dhtmlx-info" -> **".gantt-info"**
- ".dhtmlx-error" -> **".gantt-info"**
- ".dhtmlx_popup_title" -> **".gantt_popup_title"**
- ".dhtmlx_popup_text" -> **".gantt_popup_text"**
- ".dhtmlx_popup_controls" -> **".gantt_popup_controls"**
- ".dhtmlx_ok_button" -> **".gantt_ok_button"**
- ".dhtmlx_click_me_button" -> **".gantt_click_me_button"**
- ".dhtmlx_popup_button" -> **".gantt_popup_button"**
- ".dhtmlx_modal_box" -> **".gantt_modal_box"**
- ".dhtmlx-" + config.type -> **".gantt-" + config.type**
- ".dhtmlx_" + btn.label.toLowerCase() + "_button" -> **".gantt_" + btn.label.toLowerCase() + "_button"**

7.0 -> 7.1
-------------

Версия 7.1 не содержит изменений, несовместимых с предыдущими версиями, которые требовали бы модификации существующего кода.

Есть небольшое визуальное изменение в отображении вех (milestones), которое при необходимости можно отменить кодом.
В крупных проектах с панелью ресурсов возможно снижение производительности из-за новой логики назначений ресурсов; это можно компенсировать, отключив ненужную логику.

### Вехи (Milestones)

Размер элементов вех изменился по сравнению с предыдущими версиями, чтобы высота вех соответствовала высоте обычных полос.

Если вы хотите, чтобы вехи выглядели так же, как раньше, можно задать высоту элемента вехи с помощью свойства **bar_height**:

~~~js
{
    id:23, text:"Mediate milestone", start_date:"13-04-2018", 
    type:"milestone", parent:"15", bar_height: 35
}
~~~

### Назначения ресурсов

Версия 7.1 добавляет сложную логику назначений ресурсов, позволяющую указывать даты назначений и работать с ними через DataStore.
Это не должно повлиять на существующий код, но изменения могут привести к заметному снижению производительности при расчёте ресурсов.

Если вам не нужно назначать ресурсы на конкретные даты задач, можно отключить новую функциональность с помощью конфигурации **process_resource_assignments** для повышения производительности:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Новые необязательные свойства объектов задач

Следующие свойства объекта задачи теперь обрабатываются gantt и влияют на отображение задач:

- "task.row_height"
- "task.bar_height"
- "task.hide_bar"
- "task.rollup"
  
Если у вас есть собственные свойства с такими же именами, их следует переименовать во избежание конфликтов.

### Глубокое копирование при парсинге данных

Gantt выполнял глубокое копирование объектов данных при парсинге с [v6.3.2](whats-new.md#632) до v7.1.


Начиная с v7.1, эта функциональность по умолчанию отключена.

Вы можете включить старое поведение, установив [gantt.config.deepcopy_on_parse](api/config/deepcopy_on_parse.md) в *true*:

~~~js
gantt.config.deepcopy_on_parse = true;
~~~

### Устаревшая конфигурация

Свойство **gantt.config.task_height** устарело с v7.1. Хотя оно продолжит работать, рекомендуется использовать новую опцию [gantt.config.bar_height](api/config/bar_height.md):

~~~js
gantt.config.bar_height = 50;
~~~


6.3 -> 7.0
---------------------

###Расширения и файлы локализации

Последнее обновление v7.0 включает два важных изменения в структуре пакета Gantt:

1) Все файлы расширений теперь включены в файл *dhtmlxgantt.js*. 
Для активации любого из дополнительных расширений dhtmlxGantt используйте вызов API.

- Если вы уже подключали какие-либо файлы расширений из встроенного пакета, например:

~~~js
<script src="../codebase/dhtmlxgantt.js"></script>
<script src="../codebase/ext/dhtmlxgantt_auto_scheduling.js"></script>
~~~

или

~~~js
import "dhtmlx-gantt";
import "dhtmlx-gantt/ext/dhtmlxgantt_auto_scheduling";
~~~

Необходимо удалить файл расширения и активировать расширение через метод **gantt.plugins**:

~~~js
gantt.plugins({
   auto_scheduling: true
});
~~~

Полный список расширений смотрите [здесь](guides/extensions-list.md).

- Если вы используете модифицированные версии расширений или разработали собственные, подключайте их как файлы на страницу, и они будут работать.

- **Обратите внимание**, что расширения **dhtmlxgantt_smart_rendering.js** и **dhtmlxgantt_csp.js** полностью удалены и не требуют ручного включения.


2) Все локализации теперь включены в *dhtmlxgantt.js*. Для их активации используйте вызов API.

- Если вы подключали какую-либо локализацию на страницу, удалите её и активируйте нужную через **gantt.i18n.setLocale**:

~~~js
gantt.i18n.setLocale("de");
~~~

- Если вы используете собственный файл локализации, его можно загружать как раньше.

###Изменение стандартных настроек рабочего времени

Во всех версиях до 7.0 стандартные рабочие часы были с 8:00 до 17:00, то есть 9 часов в день.


Начиная с v7.0, рабочие часы - 8:00-12:00, 13:00-17:00, то есть 8 часов в день.

Если вы хотите вернуть прежние настройки, задайте их вручную:

~~~js
gantt.setWorkTime({hours: [8, 17]});
~~~

### Content Security Policy

Расширение **ext/dhtmlxgantt_csp.js** больше не требуется, так как оно удалено и заменено на [csp config](api/config/csp.md), который включён по умолчанию; расширение следует удалить из Gantt.

Поскольку в библиотеку dhtmlxGantt добавлено свойство **csp**, ко всем элементам Gantt будут применяться валидные HTML 5 атрибуты, которые могут использоваться в любом браузере, поддерживающем HTML5 doctype.


Рекомендуем обновить уже существующие атрибуты на новые:

- "task_id" -> ["data-task-id"](api/config/task_attribute.md)
- "link_id" -> ["data-link-id"](api/config/link_attribute.md)
- "resource_id" -> ["data-resource-id"](api/config/resource_attribute.md)
- "column_index" -> ["data-column-index"](api/config/grid_resizer_column_attribute.md)

Однако старые атрибуты также включены в разметку, поэтому если вы не измените их имена, ваш код продолжит работать.

### Стилизация ячеек грида

Ранее выравнивание ячеек грида осуществлялось с помощью `display:inline-block`. Начиная с версии 7.0 используется `display:flex`, а ячейки размещаются внутри flex-контейнера.

Это изменение не влияет на внешний вид интерфейса для пользователя (он остаётся полностью идентичным) и не должно вызывать проблем при переходе на новую версию.
Однако некоторые регрессии в стилизации ячеек грида могут быть связаны с этим обновлением.

### Удалены конфиг и шаблоны "xml_date" и "xml_format"

Устаревшие в версии 6.2 конфиг и шаблоны удалены в версии 7.0 и заменены новыми:

- gantt.config.xml_date →  [gantt.config.date_format](api/config/date_format.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/template/parse_date.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/template/format_date.md)

Если вы уже определили старые имена в своём коде, они продолжат работать. В противном случае используйте новую версию API.

6.2 -> 6.3
---------------

### Множественный выбор задач

Начиная с версии 6.3 расширение **ext/dhtmlxgantt_multiselect.js** автоматически позволяет горизонтально перетаскивать сразу несколько выбранных задач.
Если вы хотите отключить эту функциональность, используйте свойство [drag_multiple](api/config/drag_multiple.md) и установите его в *false* (по умолчанию включено).

~~~js
gantt.config.drag_multiple = false;
~~~

### Шрифт Google Roboto больше не включён в Material skin

До версии 6.3 шрифт Google [Roboto](https://fonts.google.com/specimen/Roboto) был включён в ['Material' skin](guides/skins.md#materialskin) dhtmlxGantt через оператор `import`.
Начиная с версии 6.3 импорт был удалён, поэтому теперь необходимо добавить шрифт `Roboto` вручную:

~~~html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family="Open+Sans|Roboto:regular,medium,thin,bold"">
~~~

### Использование с Require.JS

Ранее можно было использовать любые произвольные имена для различных файлов библиотеки dhtmlxGantt, включённых в приложение на основе RequireJS:

~~~js
requirejs.config({
  paths: {
    "gantt": "../../codebase/dhtmlxgantt",
    "tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "marker": "../../codebase/ext/dhtmlxgantt_marker",
    "locale_de": "../../codebase/locale/locale_de",
  },
  shim: {
    "tooltip": ["gantt"],
    "marker": ["gantt"],
    "locale_de": ["gantt"],
  }
});
requirejs(["gantt", "tooltip", "marker", "locale_de"],
function (dhx) {
  var gantt = dhx.gantt;
 ...
});
~~~

Начиная с версии 6.3 имена модулей должны быть фиксированы в соответствии со структурой папок библиотеки dhtmlxGantt:

~~~js
requirejs.config({
  paths: {
    "dhtmlxgantt": "../../codebase/dhtmlxgantt",
    "ext/dhtmlxgantt_tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "ext/dhtmlxgantt_critical_path": "../../codebase/ext/dhtmlxgantt_critical_path",
    "locale/locale_de": "../../codebase/locale/locale_de",
  },
  shim: {
    "ext/dhtmlxgantt_tooltip": ["dhtmlxgantt"],
    "ext/dhtmlxgantt_critical_path": ["dhtmlxgantt"],
    "locale/locale_de": ["dhtmlxgantt"],
  }
});
 
requirejs(["dhtmlxgantt", "ext/dhtmlxgantt_tooltip", "ext/dhtmlxgantt_critical_path", 
            "locale/locale_de"], 
function (dhx) {
  var gantt = dhx.gantt;
...
});
~~~

Убедитесь, что имя модуля для любого файла внутри пакета указано как *относительный путь внутри папки 'codebase' пакета* плюс *имя файла*, например:

**основная библиотека:**

- "dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"

**расширения:**

- "ext/dhtmlxgantt_critical_path": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_critical_path"
- "ext/dhtmlxgantt_tooltip": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_tooltip"

**локализации:**

- "locale/locale_de": "./vendor/dhtmlxgantt/locale/locale_de"
- "locale/locale_be": "./vendor/dhtmlxgantt/locale/locale_be"

### Inline Editors {#inline_editors}

До версии 6.3 минимальные и максимальные значения для **date** [inline editor](guides/inline-editing.md#typesofeditors) ограничивались датами, видимыми на временной шкале, если не были заданы свои значения.

Начиная с версии 6.3 нет ограничений по умолчанию для минимальных и максимальных значений редакторов дат.

Чтобы восстановить прежнее поведение, можно указать динамические значения **min**/**max**:

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

6.1 -> 6.2
---------------

Обновление до версии 6.2, как правило, совместимо с 6.1 и не требует изменений в коде.
Однако поведение некоторых компонентов было изменено (старое поведение можно восстановить через конфиг), а некоторые API были объявлены устаревшими.

### Smart rendering и статический фон

Функциональность smart rendering была обновлена и теперь встроена в компонент. Теперь она работает как в основной области временной шкалы, так и в панелях ресурсов. Отныне все временные шкалы должны рендерить только те строки и ячейки, которые видимы в данный момент.

Smart rendering можно отключить через конфиг **smart_rendering**, что вернёт Gantt к поведению по умолчанию версии 6.1:

~~~js
gantt.config.smart_rendering = false;
~~~

Расширение **dhtmlxgantt_smart_rendering** больше не требуется и должно быть удалено из Gantt. Само расширение всё ещё доступно в пакете на случай проблем совместимости.
Если расширение добавлено на страницу, Gantt вернётся к режиму smart rendering версии 6.1.

Также изменено поведение конфига **[static_background](api/config/static_background.md)**. Начиная с версии 6.2 он будет рендерить PNG-фон И любые ячейки, к которым через функцию-шаблон привязан CSS-класс.

Если вам нужно вернуть поведение версии 6.1, используйте конфиг **static_background_cells**:

~~~js
gantt.config.static_background_cells = false;
~~~

### Настройки временной шкалы

Конфигурирование временной шкалы было упрощено. Вместо указания множества настроек для каждой шкалы отдельно, теперь следует использовать одну опцию [scales](api/config/scales.md), которая будет содержать массив объектов шкал с их настройками.

В целом, следующие API временной шкалы объявлены устаревшими:

- gantt.config.scale_unit
- gantt.config.step
- gantt.config.date_scale
- gantt.templates.date_scale
- gantt.config.subscales

Например, следующий код:

~~~js
gantt.config.scale_unit = "day"; 
gantt.config.step = 1; 
gantt.config.date_scale = "%d %M"; 
gantt.templates.date_scale = null; 
gantt.config.subscales = [];
~~~

Теперь выглядит так:

~~~js
gantt.config.scales = [ { unit:"day", step: 1, format: "%d %M"} ];
~~~

#### Шаблон task_cell_class переименован

Шаблон, используемый для задания CSS-класса для ячеек временной шкалы, переименован следующим образом:

- gantt.templates.task_cell_class → [gantt.templates.timeline_cell_class](api/template/timeline_cell_class.md)

Пример использования переименованного шаблона:

~~~js
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
 
gantt.templates.timeline_cell_class = function(task,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
~~~

### Конфиг и шаблоны "xml_date" и "xml_format" переименованы

Ниже приведена схема замены ранее использовавшихся API:

- gantt.config.xml_date →  [gantt.config.date_format](api/config/date_format.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/template/parse_date.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/template/format_date.md)

Начиная с версии 6.2 значения по умолчанию для конфига **xml_date** и шаблонов **xml_date** и **xml_format** - *undefined*. Соответственно, если вы не назначили им значения, они работать не будут.

Однако Gantt продолжит использовать старые имена конфига и шаблонов, поэтому если вы переопределили эти API в своём коде, они будут работать как прежде. Например:

~~~js
// будет работать корректно
gantt.templates.xml_date = function(datestring){
    return new Date(datestring);
};
~~~

### Удалён неиспользуемый API

Конфиг **gantt.config.api_date** и шаблон **gantt.templates.api_date** удалены из API, так как не использовались внутри кода Gantt. Если вы использовали их в своём коде, необходимо объявить их заново.

~~~js
gantt.config.api_date = "%d-%m-%Y %H:%i";
gantt.templates.api_date = gantt.date.date_to_str(gantt.config.api_date);
~~~

6.0 -> 6.1 
-------------

### Ограничения по времени и авто-планирование

Расширение **dhtmlxgantt_auto_scheduling.js** было дополнено функциональностью [tasks constraints](guides/auto-scheduling.md#timeconstraintsfortasks). Поскольку эта функция изменяет стандартное поведение авто-планирования,
Gantt поддерживает режим совместимости, который позволяет восстановить прежнее поведение и не учитывать ограничения задач при авто-планировании.

Для включения режима совместимости используйте следующий конфиг:

~~~js
gantt.config.auto_scheduling_compatibility = true;
~~~

### Область отображения тултипов

До версии 6.1 [тултипы](guides/tooltips.md) отображались только внутри области временной шкалы. Начиная с версии 6.1 отображение тултипов не ограничено, и тултип следует за движением указателя мыши.

При необходимости вы можете восстановить прежнее поведение, используя следующий код до инициализации Gantt:

~~~js
gantt.attachEvent("onGanttReady", function(){
    var tooltips = gantt.ext.tooltips;
     tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

5.2 -> 6.0
------------------

В версии 6.0 метод **getSlack()** объявлен устаревшим. Вместо него добавлены два метода:

- [getFreeSlack](api/method/getfreeslack.md) - возвращает свободный резерв задачи
- [getTotalSlack](api/method/gettotalslack.md) - возвращает общий резерв задачи

Методы, отмеченные как устаревшие в v[4.0](#3x---40), перестали работать в v6.0. Определение объекта **dhtmlx** было удалено из *dhtmlxgantt.js*.

Если вы используете какие-либо устаревшие методы, вам потребуется заменить их поддерживаемыми реализациями согласно таблице ниже. Изменений в аргументах или поведении методов не было.

<table class="my_table">

<tr><td class="version_info">Устаревшие методы</td><td class="version_info">Рабочие методы</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>


3.x -> 4.0
------------

Версия 4.0 включает некоторые изменения в публичном API:

- устаревшие модули, а также модули, пересекающиеся с модулями dhtmlxSuite, больше не определяются библиотекой dhtmlxGantt
- часто используемые модули, такие как dhtmlxMessage, dataProcessor, Ajax, перенесены в пространство имён **window.gantt** и стали частью публичного API dhtmlxGantt

В v4.x включён механизм обратной совместимости с устаревшим API, поэтому код, написанный для v3.3 и более ранних версий, продолжит работать. Однако в некоторых случаях изменения необходимы.
В целом, все глобальные объявления, кроме **window.gantt** и **window.Gantt** (только для enterprise-версии), считаются устаревшими и будут удалены в версии 5.0.

### Устаревший API

Существуют методы, которые были объявлены устаревшими. Они будут продолжать работать в v4.x, но при каждом вызове будут выводить предупреждение в консоль (не видимое конечным пользователям).

![gantt_deprecated_warning](/img/gantt_deprecated_warning.png)

Обзор:

- модуль dhtmlxMessage был перенесён из объекта **window.dhtmlx** в объект **window.gantt**. Подробнее о Message Boxes читайте [здесь](guides/message-boxes.md)
- конструктор dhtmlxDataProcessor перенесён из **window.dataProcessor** в **window.gantt.dataProcessor**
- утилитные методы, такие как **dhtmlx.copy**, **dhtmlx.uid** и **dhtmlx.mixin**, перенесены в объект **window.gantt**

Если вы используете эти методы, ваше приложение продолжит работать после обновления до v4.0 без необходимости немедленных изменений. В будущем рекомендуется обновить их до новой версии API.

Полный список устаревших методов:

<table class="my_table">

<tr><td class="version_info">До версии 3.3</td><td class="version_info">С версии 4.0</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>

### Устаревший API

Некоторые методы стали устаревшими и больше не используются в v4.x.
Если вы всё ещё используете эти методы или объекты, вам потребуется либо изменить код приложения, либо подключить файл **dhtmlxgantt_deprecated.js** на страницу.

Обзор:

- **window.dhx4** больше не определяется в **dhtmlxgantt.js**
- переменные окружения, ранее определённые в **window.dhx4**, теперь доступны в объекте **gantt.env**
- модуль Ajax перенесён из **dhx4.ajax** в **gantt.ajax**
- теперь следует использовать **gantt.event**, **gantt.eventRemove** вместо **dhtmlxEvent/dhtmlxDetachEvent**

Полный список устаревшего API:

<table class="my_table">

<tr><td class="version_info">До версии 3.3</td><td class="version_info">С версии 4.0</td></tr>
<tr><td>window.dhtmlxEvent</td><td>gantt.event</td></tr>
<tr><td>window.dhtmlxDetachEvent</td><td>gantt.eventRemove</td></tr>
<tr><td>window.dhx4.isIE</td><td>gantt.env.isIE</td></tr>
<tr><td>window.dhx4.isIE6</td><td>gantt.env.isIE6</td></tr>
<tr><td>window.dhx4.isIE7</td><td>gantt.env.isIE7</td></tr>
<tr><td>window.dhx4.isIE8</td><td>gantt.env.isIE8</td></tr>
<tr><td>window.dhx4.isOpera</td><td>gantt.env.isOpera</td></tr>
<tr><td>window.dhx4.isChrome</td><td>gantt.env.isChrome</td></tr>
<tr><td>window.dhx4.isKHTML</td><td>gantt.env.isKHTML</td></tr>
<tr><td>window.dhx4.isFF</td><td>gantt.env.isFF</td></tr>
<tr><td>window.dhx4.isIPad</td><td>gantt.env.isIPad</td></tr>
</table>


2.0 -> 3.0
----------------------
1) Для предотвращения конфликтов CSS с dhtmlxScheduler имена классов, которые использовались обоими компонентами, были переименованы в dhtmlxGantt (все классы относились к lightbox).
Если у вас есть кастомизированные стили для lightbox, миграция будет заключаться в переименовании соответствующих CSS-классов.

Существует 2 шаблона переименования:

- Замените <b>'.dhx_gantt_'</b> на <b>'.gantt_'</b> (.dhx_gantt_duration -> .gantt_duration)
- Замените префикс <b>'.dhx_'</b> на <b>'.gantt_'</b> (.dhx_custom_button -> .gantt_custom_button)

*Если возникнут сложности с миграцией CSS-классов, полный список переименованных классов смотрите [здесь](guides/migrating-renamedcss.md).*


2) Значения по умолчанию для конфигов [buttons_right](api/config/buttons_right.md) и [buttons_left](api/config/buttons_left.md) изменились следующим образом:

~~~js
gantt.config.buttons_left = [
        "dhx_save_btn",
        "dhx_cancel_btn"
];
gantt.config.buttons_right = [
        "dhx_delete_btn"
],

-->

gantt.config.buttons_left = [
        "gantt_save_btn",
        "gantt_cancel_btn"
];
gantt.config.buttons_right = [
        "gantt_delete_btn"
];
~~~

Старые конфигурации ("dhx_save_btn", "dhx_cancel_btn", "gantt_delete_btn") по-прежнему будут работать. Изменения не ломают существующее поведение.

3) Следующие функции теперь доступны только в Commercial или Enterprise версии компонента (не доступны в GPL-версии dhtmlxGantt):

- Возможность скрывать дни в неделе, месяце, представлении timeline
- Проекты, вехи и другие пользовательские типы

1.0 -> 2.0
----------------------

1) Ряд объектов (**GanttProjectInfo**, **GanttTaskInfo**, **GanttChart**, **GanttProject**, **GanttTask**) заменены одним статическим объектом - **gantt**. 


Объект **gantt** содержит набор методов и 2 основных свойства: [config](api/overview/properties-overview.md) и [templates](api/overview/templates-overview.md).

- [gantt.config](api/overview/properties-overview.md) - параметры конфигурации для дат, шкалы, элементов управления и др.
- [gantt.templates](api/overview/templates-overview.md) - шаблоны форматирования дат и меток, используемых в диаграмме Gantt.


2) dhtmlxGantt инициализируется с помощью метода [init](api/method/init.md) 

  <code> var gantt = new GanttChart()</code> -> <code>gantt.init("gantt_div")</code>.


3) Вместо GanttProject и GanttTask данные хранятся как [массив простых объектов с обязательными и любыми пользовательскими свойствами](guides/loading.md#dataproperties):

~~~js
{
    data:[
        {id:1, text:"Project #2", start_date:"01-04-2013", duration:18,
    progress:0.4, open: true},
        {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8,
    progress:0.6, parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,
    progress:0.6, parent:1}
    ],
    links:[
        { id:1, source:1, target:2, type:"1"},
        { id:2, source:2, target:3, type:"0"},
        { id:3, source:3, target:4, type:"0"},
        { id:4, source:2, target:5, type:"2"},
  ]
}
~~~


4) [XML-формат](guides/supported-data-formats.md#xmldhtmlxgantt20) был изменён, но [старый XML-формат](guides/supported-data-formats.md#xmldhtmlxganttlt20) всё ещё можно [загрузить](api/method/load.md).

~~~js
gantt.load("tasks.xml","oldxml");
~~~

[Loading data in Gantt 1.6 format](https://docs.dhtmlx.com/gantt/samples/01_initialization/09_backward_compatibility.html)


5) **Design-time объекты**:

- Методы объекта **<i>GanttProjectInfo</i>** заменены на:
  - addTask  -> [gantt.addTask()](api/method/addtask.md)
  - deleteTask  ->  [gantt.deleteTask()](api/method/deletetask.md)
  - getTaskById  -> [gantt.getTask()](api/method/gettask.md)
- Методы объекта **<i>GanttTaskInfo</i>** заменены на:
  - addChildTask -> [gantt.addTask()](api/method/addtask.md) (свойство "parent" объекта задачи задаёт родителя для задачи)

6) **Run-time объекты**:

dhtmlxGantt 2.0 не использует разные типы для объектов проекта и задачи. Вместо этого любой объект задачи может иметь одного родителя и любое количество дочерних задач.

- **<i>GanttProject</i>**
  - Вместо getDuration(), getId(), getName(), getPercentCompleted(), getStartDate() свойства проекта доступны через **gantt.getTask(projectTaskId).(name_of_property)**
- **<i>GanttTask</i>**
  - Вместо getDuration(), getId(), getName(), getParentTaskId(), getPercentCompleted(), getPredecessorTaskId(), setDuration(, ) свойства задачи доступны через **gantt.getTask(taskId).(name_of_property)**
  
Список методов для получения родительских/дочерних объектов:

- [getTask](api/method/gettask.md)
- [hasChild](api/method/haschild.md)
- [getChildren](api/method/getchildren.md)

:::note
Идентификатор родительской задачи доступен как **gantt.getTask(task_id).parent**. Корневой элемент не имеет свойства 'parent'.
:::

