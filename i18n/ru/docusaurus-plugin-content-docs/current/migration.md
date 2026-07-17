---
title: "Миграция с более ранних версий"
sidebar_label: "Миграция с более ранних версий"
---

# Миграция с более ранних версий


## 9.1 -> 10.0

### Миграция с GPL-издания на Community (MIT) издание {#gpl-to-mit}

Начиная с v10, бесплатное издание DHTMLX Gantt — это **Community edition**, распространяемое под лицензией **MIT**. Оно заменяет ранее бесплатное распространение под лицензией **GPL** для того же пакета `dhtmlx-gantt`. GPL v2 всё ещё применяется к предыдущим бесплатным версиям (v9.x и ранее), которые остаются доступны в отдельной ветке основного репозитория [на GitHub](https://github.com/DHTMLX/gantt), но не поддерживаются активнее.

Чтобы перенести существующий проект из GPL-издания в Community edition:

- **Проверьте версию пакета.** `dhtmlx-gantt` v10 и выше — Community (MIT) edition; v9.x и ниже — GPL edition.
- **Обновите уведомления о лицензии** в вашем проекте, если вы где-либо упоминаете лицензию Gantt — бесплатное издание теперь MIT, а не GPL.
- **Проверьте значение лицензии во время выполнения** - [`gantt.license`](api/other/license.md) возвращает `"mit"` для Community edition (оно возвращало `"gpl"` для предыдущего бесплатного издания).
- **Проверьте поведение экспорта.** Онлайн-сервис экспорта по-прежнему добавляет водяной знак к бесплатным экспорту; это не изменилось и больше не связано с лицензией GPL (сервис экспорта — отдельный продукт).
- **Просмотрите различия по функциям.** Community edition не является строгим надмножеством старого GPL-издания. Он **добавляет** проекты (summary tasks), вехи, пользовательские типы задач и поддержку нескольких экземпляров Gantt на одной странице, но **убирает** undo/redo, markers, multiselect, unscheduled tasks, строку-заглушку для новой задачи, календари рабочего времени и WBS-коды. См. [Community vs PRO Library Versions](guides/editions-comparison.md) для полного сравнения функций.

### Защита от XSS в обертках фреймворков

Начиная с v10.0,[React Gantt](integrations/react.md), [Vue Gantt](integrations/vue.md) и [Angular Gantt](integrations/angular.md) обертки по умолчанию очищают строковые значения, возвращаемые пользовательскими шаблонными функциями, вместо того чтобы вставлять их как сырый HTML. Это предотвращает уязвимости XSS, вызванные несанитизированными данными, выводимыми через шаблоны.

Это относится к:

- функциям, переданным через свойство `templates`
- функциям `config.columns[].template`
- функциям `config.scales[].format`

По умолчанию (`htmlTemplatePolicy="basic-sanitize"`) возвращаемый HTML проходит санитизацию по белому списку: сохраняются обычные форматы (`<b>`, `<span>`, `<div>`, ...), `class`, ограниченный набор встроенных стилей, `data-*` атрибуты и `<img>` со безопасным `src`, в то время как `<script>`, встроенные обработчики событий и опасные URL удаляются. Шаблоны, возвращающие простую разметку, продолжают работать; опасные конструкции удаляются.

#### Восстановление прежнего поведения raw-HTML

Установите свойство `htmlTemplatePolicy` в значение `"unsafe-html"`, чтобы рендерить строки шаблонов точно так же, как и раньше, без обработки:

~~~jsx
<ReactGantt htmlTemplatePolicy="unsafe-html" /* ... */ />
~~~

~~~vue
<VueGantt htmlTemplatePolicy="unsafe-html" /* ... */ />
~~~

~~~html
<dhx-gantt htmlTemplatePolicy="unsafe-html" /* ... */></dhx-gantt>
~~~

#### По шаблону сырая HTML

Оборачивайте отдельный шаблон в `allowRawHTML`, чтобы отключить санитизацию только для этого шаблона — обрабатывайте любые пользовательские данные сами с помощью экспортируемого помощника `escapeHTML`:

~~~jsx
import { allowRawHTML, escapeHTML } from "@dhx/react-gantt";
// или "@dhx/vue-gantt" / "@dhx/angular-gantt"

<ReactGantt
    templates={{
        task_text: allowRawHTML((start, end, task) => `<b>${escapeHTML(task.text)}</b>`)
    }}
/>
~~~

#### Собственный санитайзер или вывод текста

Используйте `htmlTemplatePolicy={{ mode: "sanitize", sanitize }}` для подключения санитайзера, например DOMPurify, или `"escape"` для вывода строк шаблонов как обычного текста. Подробности смотрите в [App security](guides/app-security.md#framework-wrapper-xss-protection).

### Обновление движка авто-расписания {#auto-scheduling-v2}

v10.0 включает переработанный движок авто-расписания. Он исправляет ряд давних ошибок, в основном связанные с расчётом slack и планированием проектов (summary tasks) при включённой опции [move_projects](api/config/auto_scheduling.md#move_projects).

Публичный API и видимое поведение остаются без изменений, за исключением случаев, когда ранее всё работало неправильно. Ниже приведены изменения, которые могут повлиять на существующий код.

Новый движок используется по умолчанию. Если нужно вернуться к предыдущему во время перехода, используйте флаги opt-out:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    _engine: "v1",          // предыдущий движок планирования
    _analysis_engine: "v1"  // прежний расчёт slack / критического пути
};
~~~

Эти флаги переходные и будут удалены в v10.1, поэтому планируйте миграцию до этого срока.

#### Изменения в поведении

| Область | Раньше (v9.x) | С v10.0 | Что делать |
|---|---|---|---|
| Повторяющиеся вызовы `gantt.autoSchedule()` | Задачи могли смещаться вперед на проектах, где задействованы несколько календарей | Повторный запуск авто-расписания на неизменённых данных сохраняет те же даты | Действий не требуется |
| Значения slack и критического пути | Могли изменяться при изменении `move_projects` / `gap_behavior` | Зависит только от данных, а не от режимов планирования | Действий не требуется |
| `getTotalSlack()` / `getFreeSlack()` для задач, исключённых из расчёта (цикл зависимостей, завершённые задачи) | Могли возвращать `undefined` | Возвращать `0` | Обновите код, который по-разному обрабатывает `undefined` и `0` |
| `getSlack(task1, task2)` | Точность — только для напрямую связанных задач | Более точные значения для связанных задач; значения для несвязанных пар остаются без изменений | Предпочитайте `getTotalSlack` / `getFreeSlack` |
| Аргументы `onBeforeTaskAutoSchedule` / `onAfterTaskAutoSchedule` для перемещений, управляемых ограничениями и предпочтениями | Аргументы `link` и исходной задачи могли быть заданы | Эти аргументы равны `null` для таких перемещений | Добавьте проверку на `null` в обработчиках, которые предполагали, что аргумент `link` всегда задан |
| Связи Start-to-Finish со значением `gap_behavior: "preserve"` | Следующий элемент всегда планировался как можно скорее (как при `"compress"`) | Опция `gap_behavior` учитывается | Действий не требуется — это исправленное поведение |
| Перемещение проекта с `move_projects: true` | Локальные ограничения потомка могли не позволить переместить весь проект | Весь проект перемещается вместе; потомок, чьё ограничение конфликтует, сообщается через `onAutoScheduleConflict` | При желании слушайте `onAutoScheduleConflict`, чтобы выявлять конфликты |

#### Новые события и конфигурация

- [onAutoScheduleConflict](api/event/onautoscheduleconflict.md) - срабатывает для каждого найденного во время планирования конфликта.
- [onAutoScheduleNoConverge](api/event/onautoschedulenoconverge.md) - срабатывает, когда планирование не может прийти к устойчивому результату.
- [strict_calendar](api/config/auto_scheduling.md#strict_calendar) - опциональная настройка (по умолчанию `false`), которая сообщает, когда задача попадает на своё нерабочее время.

#### Известные ограничения

- Когда дата ограничения (например, **must-finish-on** или **start-no-later-than**) попадает в нерабочее время пользовательского календаря, задача получает корректную по ограничению дату, но её сохранённая `end_date` (вычисляемая как start + duration) может не совпадать точно с датой ограничения. Событие [onAutoScheduleConflict](api/event/onautoscheduleconflict.md) срабатывает, чтобы вы могли отреагировать на несоответствие. Чтобы ограничение было учтено точно, используйте календарь, чьё рабочее время включает дату ограничения.
- Установка типа ограничения на проект (summary task) напрямую в коде сразу после парсинга данных может быть перезаписана во время парсинга. Задавайте такие ограничения в загруженных данных, или через lightbox / inline editor.

### Изменения в помощниках по дате {#date-helpers}

#### Хелперы начала интервала теперь чистые (pure)

Хелперы начала интервала [`gantt.date`](api/other/date.md) - `day_start`, `week_start`, `month_start`, `quarter_start`, `year_start`, `hour_start`, `minute_start`, и `date_part` - теперь возвращают новый объект `Date` и больше не изменяют переданный ему объект даты.

Возвращаемое значение не изменилось, поэтому потребуется обновить только код, который полагался на изменение объекта на месте и игнорировал возвращаемое значение:

~~~js
// до v10.0 - полагались на мутирование `date` через day_start
gantt.date.day_start(date);

// с v10.0 - используйте возвращаемую дату
date = gantt.date.day_start(date);
~~~

#### Одинарный парсер даты и устаревшая конфигурация `csp`

Gantt больше не поставляет быстрый парсер даты на основе `new Function`. Безопасный парсер, соответствующий [CSP](api/config/csp.md), теперь единственная реализация, и конфигурация [csp](api/config/csp.md) больше не влияет на форматирование дат.

Эта опция сохранена и по-прежнему читается lightbox как подсказка безопасной среды, поэтому существующие конфигурации продолжают работать. Миграция не требуется — код, устанавливавший `gantt.config.csp` только для форматирования дат, можно удалить.

### TypeScript: `SerializedTask` теперь строго сериализуется {#serialized-task-types}

Типы `SerializedTask` и `SerializedLink` теперь описывают только **JSON-форму**:

- поля дат (`start_date`, `end_date`, `constraint_date`, `deadline`, …) имеют тип `string`. В 9.x они были `Date | string`.
- `SerializedTask.id` теперь необязателен.

Если вы определяли данные приложения — хранилище, стартовый массив, демонстрацию — как `SerializedTask[]`, но заполняли их объектами `Date`, компилятор теперь сообщает об ошибках вроде *"Type 'Date' is not assignable to type 'string'"*.

Выберите тип, который соответствует тому, что реально хранится в данных:

- **`Task` / `Link`** — объекты во время выполнения с датами типа `Date` и полями с префиксом `$` (то, что возвращает `gantt.getTask()`).
- **`SerializedTask` / `SerializedLink`** — JSON с датами в виде `string` (серверный обмен, сохранённый JSON).
- **`TaskInput`** — данные, которые вы *передаёте* в Gantt; даты могут быть `Date` или `string`, и каждое поле (включая `id`) является необязательным. Это обычно правильный тип для состояния, принадлежащего приложению.

~~~ts
// до v10 - SerializedTask принимал Date, поэтому этот пример компилировался
const tasks: SerializedTask[] = [
    { id: 1, text: "Task #1", start_date: new Date(2026, 3, 1), duration: 5 }
];

// с v10 - используйте Task (Date- даты), или TaskInput, когда форма даты может варьироваться
const tasks: TaskInput[] = [
    { id: 1, text: "Task #1", start_date: new Date(2026, 3, 1), duration: 5 }
];
~~~

`TaskInput` — канонический входной тип и заменяет ранее устаревший псевдоним `NewTask` (всё ещё экспортируется для обратной совместимости). См. [Data Model](guides/data-model.md#taskinput) для полной картины.

## 9.0 -> 9.1

Gantt 9.1 не вводит разрушающих изменений, но несколько опций конфигурации устарели, и рекомендуется перейти к новому единымu формату. Также стоит учесть, что ранее устаревшая конфигурационная опция **subscales** была удалена. 

### unified конфигурация единообразного авто-планирования {#autoscheduling}

Несколько свойств, которые ранее управляли поведением [](guides/auto-scheduling.md) Gantt, устарели в пользу единообразной конфигурации [](api/config/auto_scheduling.md) объекта конфигурации.

~~~js
// before v9.1
gantt.config.auto_scheduling = true;
gantt.config.auto_scheduling_compatibility = true;
gantt.config.auto_scheduling_strict = true;
gantt.config.auto_scheduling_initial = false;

// since v9.1
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress",
    schedule_on_parse: false
};
~~~

Устаревшие свойства продолжают работать ради обратной совместимости, но рекомендуется перейти к новому формату объекта.

Следующие опции устарели:

- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)

**Сопоставление устаревших конфигураций с единым объектом**


- `gantt.config.auto_scheduling_initial` -> `schedule_on_parse`
- `gantt.config.auto_scheduling_descendant_links` -> `descendant_links`
- `gantt.config.auto_scheduling_move_projects` -> `move_projects`
- `gantt.config.auto_scheduling_project_constraint` -> `project_constraint`
- `gantt.config.auto_scheduling_use_progress` -> `use_progress`
- `gantt.config.auto_scheduling_compatibility = true` -> `apply_constraints: false`
- `gantt.config.auto_scheduling_compatibility = false` -> `apply_constraints: true`
- `gantt.config.auto_scheduling_strict = true` -> `gap_behavior: "compress"`
- `gantt.config.auto_scheduling_strict = false` -> `gap_behavior: "preserve"`

### Устаревшая конфигурационная опция **subscales** удалена {#subscales}

Обратите внимание, что конфигурационная опция **subscales**, устаревшая в версии v6.2, удалена в версии v9.1.

## 8.0 -> 9.0

Обновление до версии 9.0 вводит несколько разрушающих изменений.

### Скины переключились на CSS-переменные

CSS-скины (темы) полностью переработаны и теперь используют CSS-переменные. Хотя HTML-структура компонента и классы CSS в основном остались без изменений, стили CSS, написанные для более старых версий Gantt, могут больше не работать как задумано с версией 9.0.

Например, следующий стиль использовался для раскраски задач в зависимости от их приоритетa:

~~~html
<style>
    /* общие стили для переопределения цвета границ/прогресса */
    .gantt_task_line{
        border-color: rgba(0, 0, 0, 0.25);
    }
    .gantt_task_line .gantt_task_progress {
        background-color: rgba(0, 0, 0, 0.25);
    }

    /* high */
    .gantt_task_line.high {
        background-color: #03A9F4;
    }
    .gantt_task_line.high .gantt_task_content {
        color: #fff;
    }

    /* medium */
    .gantt_task_line.medium {
        background-color: #f57730;
    }
    .gantt_task_line.medium .gantt_task_content {
        color: #fff;
    }

    /* low */
    .gantt_task_line.low {
        background-color: #e157de;
    }
    .gantt_task_line.low .gantt_task_content {
        color: #fff;
    }
</style>
~~~

Начиная с v9.0, та же эффект достигается с помощью следующего стиля:

~~~html
<style>
    /* high */
    .gantt_task_line.high {
        --dhx-gantt-task-background: #d96c49;
        --dhx-gantt-task-color: #fff;
    }

    /* medium */
    .gantt_task_line.medium {
        --dhx-gantt-task-background: #f57730;
        --dhx-gantt-task-color: #fff;
    }

    /* low */
    .gantt_task_line.low {
        --dhx-gantt-task-background: #fff;
        --dhx-gantt-task-color: #fff;
    }
</style>
~~~

Проверьте доступные переменные на странице [](guides/custom-skins.md).

:::note
Миграция, вероятно, потребует обновления существующего CSS для достижения требуемого дизайна.
:::

### Единый CSS-файл {#single-css-file}

Все теми now встроены в один файл **dhtmlxgantt.css**.

Чтобы активировать конкретный скин, используйте свойство `gantt.skin`:

~~~js
gantt.skin = "material";
~~~

Или метод [](api/method/setskin.md):

~~~js
gantt.setSkin("material");
~~~

:::note
Обратите внимание, что `gantt.setSkin()` выполнит перерисовку Gantt.
:::

Если вы используете скин, отличный от **terrace**, потребуются следующие шаги миграции:

1) Замените CSS-файл скина на файл `dhtmlxgantt.css`:

~~~html
<!-- OLD -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt_material.css" type="text/css">
<!-- NEW -->
<link rel="stylesheet" href="./codebase/dhtmlxgantt.css" type="text/css">
~~~

2) Включите требуемый скин из JavaScript:

~~~js
gantt.setSkin("material");
gantt.init("gantt_here");
~~~

### Встроенная поддержка базовых линий, крайних сроков и ограничений

Ранее добавление базовых линий требовало ручного программирования через API `gantt.addTaskLayer`. В Gantt 9.0 мы добавили встроенную поддержку базовых сущностей вместе с
крайними сроками и ограничениями задач.

Если вы хотите отключить настройки по умолчанию и прорисовывать базовые линии и крайние сроки вручную, можно использовать соответствующие конфигурационные опции: [](api/config/baselines.md) и [](api/config/deadlines.md):

~~~js
// отключение встроенной функциональности базовых линий
gantt.config.baselines = false;

// отключение встроенной функциональности крайних сроков
gantt.config.deadlines = false;
~~~

Встроенное отображение ограничений задач можно также отключить с помощью расширенной конфигурации [](api/config/auto_scheduling.md):

~~~js
gantt.config.auto_scheduling = {
  enabled: true, 
  show_constraints: false /*!*/
};
~~~

Это отключит отображение ограничений задач по умолчанию, сохранив при этом функциональность авто-м расписания включенной.

### Фиксированные метки на Timeline (Sticky labels)

Начиная с v9.0 метки временной шкалы по умолчанию являются фиксированными. Это означает, что метки остаются видимыми на экране при прокрутке, следуя за областью просмотра, пока не окажутся за её пределами. В предыдущих версиях метки были центрированы в своих ячейках и не оставались видимыми при прокрутке.

Если нужно вернуть старое поведение и отключить фиксированные метки, можно установить свойство `sticky` объекта [scale](guides/configuring-time-scale.md) в значение false:

~~~js
gantt.config.scales = [
  {unit: "year", step: 1, format: "%Y", sticky: false},
  {unit: "month", step: 1, format: "%F", sticky: false},
  {unit: "day", step:1, format: "%j", sticky: false}
];
~~~

### Реализация промисов

Библиотека **Bluebird** больше не входит в пакет Gantt. [](api/method/promise.md) теперь использует встроенную реализацию Promise.

### Изменение размера Lightbox

С версии 9.0 метод [](api/method/resizelightbox.md) устарел и удалён из кода Gantt. Он больше не нужен, так как изменение размера lightbox теперь работает автоматически.
Обратите внимание, что если в вашей конфигурации есть метод **resizeLightbox()**, его следует удалить, чтобы избежать ошибок. 

## 7.1 -> 8.0

### Назначения ресурсов

В предыдущих версиях DHTMLX Gantt изменения в назначениях ресурсов отправлялись на бекэнд как свойства объектов задач, что в некоторых случаях усложняло интеграцию с backend API.

Начиная с DHTMLX Gantt v8.0, изменения в ресурсах и назначениях ресурсов можно направлять через dataProcessor. См. раздел Routing CRUD actions of resources and resource assignments в guides/server-side.md#resources_crud.

### Сервис экспорта

С версии 8.0 импорт/экспорт включён в библиотеку gantt. Поэтому, если вы уже подключали файл `https://export.dhtmlx.com/gantt/api.js` на вашей странице для онлайн-экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

то необходимо удалить этот файл и включить расширение **export_api** через метод **gantt.plugins**:

~~~js
gantt.plugins({
    export_api: true
});
~~~

### Устаревшие имена классов

С версии 8.0 устаревшие имена классов удалены и заменены на новые:

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

## 7.0 -> 7.1

Версия 7.1 не вводит никаких разрушающих изменений, требующих модификации существующего кода.

Есть незначительное визуальное изменение в способе отрисовки вех (milestones), которое можно отменить кодом, если нужно. Большие проекты, использующие панель ресурсов, могут столкнуться с возможным снижением производительности из-за новой логики назначения ресурсов; это можно снизить, отключив ненужную логику.

### Milestones

Размер элементов milestone изменился по сравнению с предыдущими версиями, чтобы их высота была такой же, как у обычных полос.

Если вы хотите, чтобы милистоны выглядели так же, как в предыдущих версиях, можно настроить высоту элементов milestone с помощью свойства **bar_height**:

~~~js
{
    id:23, text:"Mediate milestone", start_date:"13-04-2018", 
    type:"milestone", parent:"15", bar_height: 35
}
~~~

### Назначения ресурсов

Версия 7.1 добавляет сложную логику назначения ресурсов, которая позволяет задавать даты назначений ресурсов и работать с ними через DataStore.
Это не должно влиять на существующий код, но изменения могут добавить заметные задержки в расчётах ресурсов.

Если вам не нужно назначать ресурсы на конкретные даты задач, можно отключить новую функциональность через конфигурацию **process_resource_assignments** для повышения производительности:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Новые необязательные свойства объектов задач

Следующие свойства объекта задачи теперь обрабатываются Gantt и влияют на отображение задач:

- "task.row_height"
- "task.bar_height"
- "task.hide_bar"
- "task.rollup"
  
Если у вас есть пользовательские свойства с такими же именами, переименуйте их, чтобы избежать конфликтов.

### Глубокое копирование при разборе данных

Gantt выполнял глубокую копию объектов данных при разборе данных с версий [v6.3.2](whats-new.md#632) по версию v7.1.

Начиная с v7.1 эта функциональность отключена по умолчанию. 

Вы можете включить старое поведение, установив [gantt.config.deepcopy_on_parse](api/config/deepcopy_on_parse.md) в значение true:

~~~js
gantt.config.deepcopy_on_parse = true;
~~~

### Устарированная конфигурация

Свойство **gantt.config.task_height** было устаревшим с v7.1. Хотя свойство продолжает работать и конфигурация **task_height** будет использоваться, если она указана, лучше использовать новую опцию [gantt.config.bar_height](api/config/bar_height.md) вместо этого:

~~~js
gantt.config.bar_height = 50;
~~~


## 6.3 -> 7.0

### Расширения и локализационные файлы

Обновление v7.0 вводит две крупные изменения в структуру пакета Gantt:

1) Все файлы расширений теперь включены в файл *dhtmlxgantt.js*. Чтобы активировать любое из дополнительных расширений, предоставляемых dhtmlxGantt, нужно использовать вызов API.

- Если вы уже подключили какие-либо файлы расширений из встроенного пакета на страницу, например:

~~~js
<script src="../codebase/dhtmlxgantt.js"></script>
<script src="../codebase/ext/dhtmlxgantt_auto_scheduling.js"></script>
~~~

или

~~~js
import "dhtmlx-gantt";
import "dhtmlx-gantt/ext/dhtmlxgantt_auto_scheduling";
~~~

то удалите файл расширения и включите расширение с помощью метода **gantt.plugins**:

~~~js
gantt.plugins({
   auto_scheduling: true
});
~~~

См. полный список расширений [здесь](guides/extensions-list.md).

- если вы используете модифицированные версии файлов расширений или создали собственные, включайте их как файлы на странице — они будут работать. 

- Примечание: расширения **dhtmlxgantt_smart_rendering.js** и **dhtmlxgantt_csp.js** полностью удалены и не требуют ручного включения.

2) Все локали теперь встроены в файл *dhtmlxgantt.js*. Чтобы активировать их, используйте вызов API.

- Если на странице была подключена любая локаль, удалите её со страницы и включите требуемую локаль с помощью **gantt.i18n.setLocale**:

~~~js
gantt.i18n.setLocale("de");
~~~

- Если вы используете пользовательский файл локали, его можно подключить как раньше.

### Значения рабочего времени по умолчанию изменены

Во всех версиях до v7.0 рабочие часы по умолчанию были с 8:00 до 17:00, то есть 9 часов в день.

Начиная с v7.0 рабочие часы составляют 8 часов в день: 8:00-12:00, 13:00-17:00.

Если вы хотите вернуть предыдущие настройки, задайте их вручную:

~~~js
gantt.setWorkTime({hours: [8, 17]});
~~~

### Политика безопасности контента (Content Security Policy)

Расширение **ext/dhtmlxgantt_csp.js** больше не требуется, так как удалено и заменено конфигурацией [csp](api/config/csp.md), которая включена по умолчанию; расширение следует удалить из gantt.

Поскольку свойство **csp** добавлено в библиотеку dhtmlxGantt, валидные HTML5-атрибуты, которые поддерживаются любым браузером с HTML5-доктайпом, будут назначаться всем элементам Gantt. 

Поэтому рекомендуется обновить существующие атрибуты на новые:

- "task_id" -> ["data-task-id"](api/config/task_attribute.md)
- "link_id" -> ["data-link-id"](api/config/link_attribute.md)
- "resource_id" -> ["data-resource-id"](api/config/resource_attribute.md)
- "column_index" -> ["data-column-index"](api/config/grid_resizer_column_attribute.md)

Однако старые атрибуты остаются в разметке, поэтому при отсутствии переименования ваши скрипты продолжат работать. 

### Стилизация ячеек грида (grid)

Ранее выравнивание ячеек грида осуществлялось через `display:inline-block`. Начиная с v7.0 используется `display:flex`, и ячейки размещаются внутри flex-контейнера.

Это изменение не влияет на UI с точки зрения пользователя (интерфейс останется 100% идентичным) и не должно вызывать миграционных проблем. Тем не менее некоторые регрессии в стилизации ячеек грида могут быть связаны с этим обновлением.

### Конфигурация "xml_date" и шаблоны, и "xml_format" шаблоны удалены

Устаревшие в v6.2 конфигурации и шаблоны удалены в v7.0 и заменены на новые:

- gantt.config.xml_date →  [gantt.config.date_format](api/config/date_format.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/template/parse_date.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/template/format_date.md)

С версии v6.2 значения конфигурации **xml_date** и шаблонов **xml_date** и **xml_format** по умолчанию не определены. Следовательно, если вы не назначали им значения, они не будут работать. 

Однако Gantt продолжит использовать старые имена конфигурации и шаблонов, поэтому если вы переопределяли эти API в коде, они будут работать как раньше. Например:

~~~js
// будет работать корректно
gantt.templates.xml_date = function(datestring){
    return new Date(datestring);
};
~~~

## 6.2 -> 6.3

### Множественный выбор задач (Multi-task selection)

Начиная с версии 6.3, расширение `ext/dhtmlxgantt_multiselect.js` автоматически позволяет перетаскивать несколько одновременно выбранных задач по горизонтали.
Если вы хотите отключить эту функциональность, используйте [`drag_multiple`](api/config/drag_multiple.md) и установите значение `false` (по умолчанию включено).

~~~js
gantt.config.drag_multiple = false;
~~~

### Шрифт Google Roboto больше не включён в скин Material

До версии 6.3 шрифт Google [Roboto](https://fonts.google.com/specimen/Roboto) был включён в [скин 'Material'](guides/skins.md#materialskin) dhtmlxGantt через выражение `import`.
Начиная с версии 6.3, этот импорт был удалён, поэтому вам нужно добавить шрифт `Roboto` вручную:

~~~html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto:regular,medium,thin,bold">
~~~

### Использование с Require.JS

Ранее вы могли использовать произвольные имена для различных файлов библиотеки dhtmlxGantt, подключаемых в приложении на основе RequireJS:

~~~js
requirejs.config({
    paths: {
        "gantt": "../../codebase/dhtmlxgantt",
        "tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
        "marker": "../../codebase/ext/dhtmlxgantt_marker",
        "locale_de": "../../codebase/locale/locale_de"
    },
    shim: {
        "tooltip": ["gantt"],
        "marker": ["gantt"],
        "locale_de": ["gantt"]
    }
});
requirejs(["gantt", "tooltip", "marker", "locale_de"], (dhx) => {
    const gantt = dhx.gantt;
    ...
});
~~~

Начиная с версии 6.3, имена модулей должны быть зафиксированы в соответствии со структурой папок библиотеки dhtmlxGantt:

~~~js
requirejs.config({
    paths: {
        "dhtmlxgantt": "../../codebase/dhtmlxgantt",
        "ext/dhtmlxgantt_tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
        "ext/dhtmlxgantt_critical_path": "../../codebase/ext/dhtmlxgantt_critical_path",
        "locale/locale_de": "../../codebase/locale/locale_de"
    },
    shim: {
        "ext/dhtmlxgantt_tooltip": ["dhtmlxgantt"],
        "ext/dhtmlxgantt_critical_path": ["dhtmlxgantt"],
        "locale/locale_de": ["dhtmlxgantt"]
    }
});

requirejs([
    "dhtmlxgantt",
    "ext/dhtmlxgantt_tooltip",
    "ext/dhtmlxgantt_critical_path",
    "locale/locale_de"
], (dhx) => {
    const gantt = dhx.gantt;
    ...
});
~~~

Убедитесь, что имя модуля для любого файла внутри пакета указано как *относительный путь внутри папки `codebase` пакета* плюс *имя файла*, например:

**основная библиотека:**

- `"dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"`

**расширения:**

- `"ext/dhtmlxgantt_critical_path": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_critical_path"`
- `"ext/dhtmlxgantt_tooltip": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_tooltip"`

**локализации:**

- `"locale/locale_de": "./vendor/dhtmlxgantt/locale/locale_de"`
- `"locale/locale_be": "./vendor/dhtmlxgantt/locale/locale_be"`

### Встроенные редакторы {#inline_editors}

До версии 6.3 минимальные и максимальные значения [встроенного редактора](guides/inline-editing.md#types-of-editors) даты **date** ограничивались датами, видимыми на временной шкале, если не были заданы собственные значения `min` или `max`.

Начиная с версии 6.3, для редакторов дат больше нет ограничений по умолчанию для минимальных и максимальных значений.

Чтобы восстановить прежнее поведение, вы можете задать динамические значения `min` и `max`:

~~~js
const dateEditor = {
    type: "date",
    map_to: "start_date",
    min: (taskId) => gantt.getState().min_date,
    max: (taskId) => gantt.getState().max_date
};
~~~

## 6.1 -> 6.2

Обновление до v6.2 в целом совместимо с v6.1 и не должно требовать изменений в коде. Однако некоторые особенности поведения компонента изменились, прежнее поведение можно восстановить через конфигурацию, а некоторые API были признаны устаревшими.

### Smart rendering и статичный фон

Функциональность smart rendering была обновлена и теперь встроена в компонент. Она должна работать как в основной области временной шкалы, так и в панелях ресурсов. Отныне все временные шкалы должны отрисовывать только строки и ячейки, которые в данный момент видимы.

Smart rendering можно отключить через конфигурацию `smart_rendering`, что вернёт gantt к поведению по умолчанию из v6.1:

~~~js
gantt.config.smart_rendering = false;
~~~

Расширение `dhtmlxgantt_smart_rendering` больше не требуется и должно быть удалено из gantt. Само расширение по-прежнему доступно в пакете на случай проблем с совместимостью.
Если расширение добавлено на страницу, gantt вернётся к режиму smart rendering из v6.1.

Поведение [`static_background`](api/config/static_background.md) также было обновлено. Начиная с v6.2, оно отрисовывает PNG-фон и любые ячейки, к которым через функцию-шаблон прикреплён CSS-класс.

Если вам нужно вернуться к поведению v6.1, используйте конфигурацию `static_background_cells`:

~~~js
gantt.config.static_background_cells = false;
~~~

### Настройки временной шкалы {#timescalesettings}

Конфигурация временной шкалы была упрощена. Вместо указания нескольких настроек шкалы отдельно для каждой шкалы теперь следует использовать единую конфигурационную опцию [`scales`](api/config/scales.md), содержащую объекты шкал с их настройками.

В целом устарели следующие API временной шкалы:

- `gantt.config.scale_unit`
- `gantt.config.step`
- `gantt.config.date_scale`
- `gantt.templates.date_scale`
- `gantt.config.subscales`

Например, приведённый ниже код:

~~~js
gantt.config.scale_unit = "day";
gantt.config.step = 1;
gantt.config.date_scale = "%d %M";
gantt.templates.date_scale = null;
gantt.config.subscales = [];
~~~

Теперь выглядит так:

~~~js
gantt.config.scales = [{ unit: "day", step: 1, format: "%d %M" }];
~~~

#### Шаблон task_cell_class переименован

Шаблон, используемый для определения CSS-класса, применяемого к ячейкам области временной шкалы, переименован следующим образом:

- `gantt.templates.task_cell_class` → [`gantt.templates.timeline_cell_class`](api/template/timeline_cell_class.md)

Пример использования переименованного шаблона:

~~~html
<style>
    .weekend { background: #f4f7f4 !important; }
</style>

<script>
    gantt.templates.timeline_cell_class = (task, date) => {
        if (date.getDay() === 0 || date.getDay() === 6) {
            return "weekend";
        }

        return "";
    };
</script>
~~~

### Конфигурация `xml_date` и шаблоны, а также шаблоны `xml_format` переименованы

Ниже приведена схема замены ранее использовавшегося API:

- `gantt.config.xml_date` → [`gantt.config.date_format`](api/config/date_format.md)
- `gantt.templates.xml_date` → [`gantt.templates.parse_date`](api/template/parse_date.md)
- `gantt.templates.xml_format` → [`gantt.templates.format_date`](api/template/format_date.md)

Начиная с v6.2 значения по умолчанию для конфигурации `xml_date` и шаблонов `xml_date` и `xml_format` — *undefined*. Таким образом, если вы не назначали им никаких значений, они не будут работать.

Однако Gantt продолжит использовать старые имена конфигурации и шаблонов, поэтому если вы переопределили эти API в своём коде, они будут работать как прежде. Например:

~~~js
// будет работать корректно
gantt.templates.xml_date = (dateString) => new Date(dateString);
~~~

### Неиспользуемые API удалены

Конфигурация **gantt.config.api_date** и шаблон **gantt.templates.api_date** удалены из API, так как они не использовались внутри кода gantt. Если вы использовали их в своем коде, необходимо объявить их заново.

~~~js
gantt.config.api_date = "%d-%m-%Y %H:%i";
gantt.templates.api_date = gantt.date.date_to_str(gantt.config.api_date);
~~~

## 6.0 -> 6.1 

### Время ограничений и авто-расписания

Расширение **dhtmlxgantt_auto_scheduling.js** обновлено функциональностью ограничений задач. Так как эта возможность изменяет поведение авто-расписания, Gantt поддерживает режим совместимости, который позволяет вернуть предыдущее поведение и не учитывать ограничения задач при авто-расписании. 

Чтобы перейти в режим совместимости, используйте следующую конфигурацию:

~~~js
gantt.config.auto_scheduling_compatibility = true;
~~~

### Область отображения тултипов

До версии 6.1 тултипы отображались только внутри временной шкалы. После выпуска v6.1 отображения тултипов не ограничены, и тултип следует за движением указателя мыши.

При необходимости можно вернуть предыдущее поведение, используя следующий код до инициализации Gantt:

~~~js
gantt.attachEvent("onGanttReady", function(){
    var tooltips = gantt.ext.tooltips;
     tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

## 5.2 -> 6.0

В версии 6.0 метод **getSlack()** устарел. Вместо него добавлены два метода:

- [getfreeslack.md](api/method/getfreeslack.md) - вернуть свободный запас времени задачи
- [gettotalslack.md](api/method/gettotalslack.md) - вернуть общий запас времени задачи

Методы, помеченные как устаревшие в v[4.0](#3x---40), перестали работать в v6.0. Определение объекта dhtmlx было удалено из *dhtmlxgantt.js*.

Если вы используете какие-либо устаревшие методы, их нужно заменить на поддерживаемые реализации согласно таблице ниже. В аргументах или поведении методов изменений не вносилось.

<table class="my_table">

<tr><td class="version_info">Up to version 3.3</td><td class="version_info">From version 4.0</td></tr>

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


## 3.x -> 4.0

Version 4.0 вводит некоторые изменения в публичном API, а именно:

- устарели модули и те модули, которые пересекаются с модулями dhtmlxSuite, больше не определяются библиотекой dhtmlxGantt
- общие модули, такие как dhtmlxMessage, dataProcessor, Ajax, перемещены в пространство имен window.gantt и стали частью публичного API dhtmlxGantt

В v4.x включена обратная совместимость до старого API, поэтому код, написанный для v3.3 и ранее, продолжит работать. Однако в некоторых случаях изменения потребуют правок.
Как правило, все глобальные декларации, за исключением window.gantt и window.Gantt (только в версии enterprise), устарели и будут удалены в версии 5.0.

### Устаревший API

Есть методы, которые устарели. Они будут работать в v4.x, но будут вызывать предупреждение в консоли (не видно конечным пользователям) каждый раз, когда вызываются. 


Обзор:

- модуль dhtmlxMessage был перенесен из объекта window.dhtmlx в window.gantt. Подробнее об Message Boxes см. здесь: guides/message-boxes.md
- конструктор dhtmlxDataProcessor перенесен из window.dataProcessor в window.gantt.dataProcessor
- утилита dhtmlx.copy, dhtmlx.uid и dhtmlx.mixin перенесены в объект window.gantt

Если вы используете эти методы, ваше приложение будет работать после обновления до v4.0 без каких-либо немедленных изменений. В будущем рекомендуется обновить их до более новой версии API.

Полный список устаревших методов приведён в таблице ниже:

<table class="my_table">

<tr><td class="version_info">Up to version 3.3</td><td class="version_info">From version 4.0</td></tr>

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

### Устаревший (неиспользуемый) API

Некоторые методы стали неактуальными и больше не будут использоваться в v4.x.
Если вы всё ещё используете эти методы или объекты, вам нужно либо изменить код приложения, либо подключить на странице файл `dhtmlxgantt_deprecated.js`.

Обзор:

- `window.dhx4` больше не определяется файлом `dhtmlxgantt.js`
- Переменные окружения, ранее определённые в `window.dhx4`, теперь доступны в объекте `gantt.env`
- Модуль Ajax перемещён из `dhx4.ajax` в `gantt.ajax`
- Вместо `dhtmlxEvent`/`dhtmlxDetachEvent` следует использовать `gantt.event` и `gantt.eventRemove`

Полный список устаревшего API приведён ниже:

<table class="my_table">

<tr><td class="version_info">Up to version 3.3</td><td class="version_info">From version 4.0</td></tr>
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

## 2.0 -> 3.0

1) Чтобы предотвратить конфликты CSS с dhtmlxScheduler, имена классов, которые использовались обеими компонентами, были переименованы в dhtmlxGantt (все классы, связанные с блоком lightbox).

Если у вас есть кастомизация стилевых правил для lightbox, миграция будет состоять в переименовании в соответствующие CSS-классы.

Есть 2 набора переименования:

- Замените <b>'.dhx_gantt_'</b> на <b>'.gantt_'</b> (.dhx_gantt_duration -> .gantt_duration)
- Замените префикс <b>'.dhx_'</b> на <b>'.gantt_'</b> (.dhx_custom_button -> .gantt_custom_button)

*Если у вас возникают проблемы с миграцией CSS-классов, см. полный список переименованных классов [здесь](guides/migrating-renamedcss.md)*.


2) Значения по умолчанию конфигураций [](api/config/buttons_right.md) и [](api/config/buttons_left.md) изменены следующим образом:

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

Старые конфигурации ("dhx_save_btn", "dhx_cancel_btn", "gantt_delete_btn") всё ещё будут работать. Изменения не ломают существующее поведение.

3) Следующие функции теперь доступны только в коммерческой или корпоративной версии компонента (не доступны в GPL версии dhtmlxGantt):

- Возможность скрывать дни в неделе, месяце, временных рамках
- Проекты, вехи и другие типы

## 1.0 -> 2.0

1) Различные объекты (**GanttProjectInfo**, **GanttTaskInfo**, **GanttChart**, **GanttProject**, **GanttTask**) заменены единым статическим объектом - **gantt**. 

Объект **gantt** содержит набор методов и 2 главные свойства: [config](api/overview/properties-overview.md) и [templates](api/overview/templates-overview.md).

- [gantt.config](api/overview/properties-overview.md) - параметры конфигурации для дат, шкалы, контролов и т. д.
- [gantt.templates](api/overview/templates-overview.md) - шаблоны форматирования дат и меток, используемых на диаграмме Ганта.

2) dhtmlxGantt инициализируется через метод [](api/method/init.md) 

  <code> var gantt = new GanttChart()</code> -> <code>gantt.init("gantt_div")</code>.

3) Вместо GanttProject и GanttTask данные хранятся как [массив простых объектов с набором обязательных свойств и любыми пользовательскими свойствами](guides/loading.md#dataproperties): 

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

4) Формат [XML](guides/supported-data-formats.md#xmldhtmlxgantt20) был изменён, но старый XML-формат [можно загрузить](api/method/load.md).

~~~js
gantt.load("tasks.xml","oldxml");
~~~

**Связанный пример**: [Loading data in Gantt 1.6 format](https://docs.dhtmlx.com/gantt/samples/01_initialization/09_backward_compatibility.html)

5) **Design-time Objects**:

- Методы объекта <i>GanttProjectInfo</i> заменены на:
  - addTask  -> [gantt.addTask()](api/method/addtask.md)
  - deleteTask  ->  [gantt.deleteTask()](api/method/deletetask.md)
  - getTaskById  -> [gantt.getTask()](api/method/gettask.md)
- Методы объекта <i>GanttTaskInfo</i> заменены на:
  - addChildTask -> [gantt.addTask()](api/method/addtask.md) (свойство "parent" задачи устанавливает родителя для задачи)

6) **Run-time Objects**:

dhtmlxGantt 2.0 не использует разные типы для объектов проекта и задачи. Вместо этого любая задача может иметь одного родительского объекта и любое количество дочерних задач.

- <i>GanttProject</i> 
  - Вместо getDuration(), getId(), getName(), getPercentCompleted(), getStartDate() свойства проекта доступны через **gantt.getTask(projectTaskId).(name_of_property)**
- <i>GanttTask</i> 
  - Вместо getDuration(), getId(), getName(), getParentTaskId(), getPercentCompleted(), getPredecessorTaskId(), setDuration(, ) свойства задачи доступны через **gantt.getTask(taskId).(name_of_property)**
  
Список методов для получения родительских/дочерних объектов:

- [](api/method/gettask.md)
- [](api/method/haschild.md)
- [](api/method/getchildren.md)

:::note
Идентификатор родительской задачи можно получить как **gantt.getTask(task_id).parent**. Корневой элемент не имеет свойства 'parent'.
:::