---
title: "Что нового"
sidebar_label: "Что нового"
---

# Что нового

Если ваша текущая версия dhtmlxGantt старше 2.0, ознакомьтесь с [](migration.md) для получения информации об обновлении.

## 9.0.11

<span class='release_date'>27 мая 2025. Релиз с исправлениями</span>

### Исправления

- Исправлена проблема, при которой [mergeCalendars](api/method/mergecalendars.md) объединял значения `customWeeks` некорректно
- Исправлена ошибка, возникающая в функции `onrender`, когда [колонка](guides/specifying-columns.md#wbscode) `name` содержит пробелы
- Исправлена проблема, при которой Gantt оставался в режиме только для чтения после [click_drag](guides/extensions-list.md#advanceddragndrop) Таймлайна при включённой [S-Curve Overlay](guides/baselines.md#extraoverlayforthechart)
- Исправлена проблема, при которой длительность задачи сбрасывалась в `0` при использовании [ресурсного календаря](guides/resource-management.md) и секция [Resources](guides/resource-management.md#resourceviewpanel) находилась ниже секции длительности в [Lightbox](guides/default-edit-form.md)
- Исправлена ошибка консоли, вызванная предупреждением "This is a Trial version" при использовании Gantt в **React StrictMode**
- Исправлена проблема, при которой функция [adjustTaskHeightForBaselines](api/method/adjusttaskheightforbaselines.md) не пересчитывала высоту строки при отключённом [gantt.config.baselines.render_mode](api/config/baselines.md#rendermode)
- Исправлена проблема, мешающая отображению задач при [скрытом](api/config/show_chart.md) Таймлайне в среде Salesforce
- Исправлена проблема, при которой календари не наследовались от родительских задач при отключённой конфигурации [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md)
- Исправлена проблема, при которой позиция скролла сбрасывалась при повторном рендере, если [ReactGantt](integrations/react.md) находился в режиме groupBy

### Обновления

- Добавлен флаг `isSalesforce` в [gantt.env](api/other/env.md)
- Добавлено свойство `groupTasks` для [React Gantt](integrations/react.md#groupingtasks)

## 9.0.10

<span class='release_date'>22 апреля 2025. Релиз с исправлениями</span>

### Исправления

- Исправлена проблема, мешающая изменять значение поля `parent` в [Lightbox](guides/default-edit-form.md)
- Исправлена избыточная скорость прокрутки при использовании колеса мыши в Firefox 88 и новее
- Исправлена невозможность перемещения [проектных задач](guides/task-types.md#projecttasks), если подзадача не запланирована и не содержит параметры даты
- Исключён неожиданный вызов [gantt.render()](api/method/render.md) во время операции [gantt.silent](api/method/silent.md) при использовании методов [open](api/method/open.md) или [close](api/method/close.md)
- Исправлена проблема, при которой [проектные задачи](guides/task-types.md#projecttasks) не перерисовывались, если событие [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) возвращало `false`
- Обеспечено, что индикаторы прогресса задачи занимают всю ширину задачи, как ожидается
- Удалены некорректные WAI-ARIA-атрибуты из ссылок задач только для чтения для повышения [доступности](guides/accessibility.md#waiariaattributes)
- Исправлена проблема, при которой ресайзеры панели задач не адаптировались к изменению высоты панели задачи

## 9.0.9

<span class='release_date'>16 апреля 2025. Релиз с исправлениями</span>

### Обновления

- Примеры для [React Gantt](integrations/react.md) добавлены в Commercial, Enterprise, Ultimate и Evaluation пакеты

### Исправления

- Исправлена проблема, при которой масштабирование колесом мыши переставало работать после вызова метода [resetLayout](api/method/resetlayout.md)
- Исправлена проблема, при которой всплывающее окно [Quick Info](guides/quick-info.md) появлялось после нажатия на кнопку разворачивания/сворачивания в представлениях [Timeline](guides/configuring-time-scale.md) или [грид](guides/specifying-columns.md)
- Исправлена ошибка, возникающая при уничтожении Gantt без инициализации грида
- Исправлена ошибка, возникающая при загрузке задачи с несуществующим родителем при включённой [Undo extension](guides/undo-redo.md)
- Исправлена проблема, при которой расширение [click_drag](guides/extensions-list.md#advanceddragndrop) не работало на сенсорных устройствах
- Улучшена отзывчивость прокрутки грида на сенсорных устройствах

## 9.0.7

<span class='release_date'>27 марта 2025. Релиз с исправлениями</span>

### Исправления

- Исправлена ошибка, возникающая при клике по задаче в таймлайне без грида при включённой [keyboard_navigation](guides/keyboard-navigation.md)
- Исправлен расчёт [WBS кода](guides/specifying-columns.md#wbscode) для отсортированных задач, включающих [placeholder task](api/config/placeholder_task.md)
- Решена проблема, при которой ячейки шкалы в ресурсном таймлайне исчезали при сворачивании задач или [изменении размера грида](guides/layout-config.md#defaultlayout)
- Обеспечен правильный порядок задач при добавлении как дочерних, так и родительских задач внутри функции [`gantt.silent`](api/method/silent.md)
- Сохранён фокус в редактируемых [ресурсных ячейках](guides/resource-management.md#resourcecellvalue) после редактирования значения
- Предотвращён скролл Gantt к самой левой позиции грида при клике по задаче
- Сохранено свойство `group` при добавлении новых задач в режиме [group](api/method/groupby.md)
- Исправлена проблема, при которой [маркеры](guides/markers.md) не отображались, если таймлайн был изначально отключён
- Предотвращено дублирование [маркеров](guides/markers.md), когда график изначально не отображается в конфигурации layout
- Исправлено исчезновение элементов drag handles (ссылки, прогресс, изменение размера задачи) после [перетаскивания таймлайна](api/config/drag_timeline.md)
- Обеспечена корректная работа [инлайн-редактора предшественников](guides/inline-editors-ext.md#predecessoreditor) при числовом типе id ссылки
- Предотвращено дублирование элементов `gantt_marker_area`
- Исправлена работа [undo](guides/undo-redo.md) с действием `changeTaskId`

## 9.0.6

<span class='release_date'>18 марта 2025. Релиз с исправлениями</span>

### Исправления

- Исправлена проблема с [lightbox](guides/default-edit-form.md), когда кнопки не отображали текущую локаль до повторной инициализации Gantt
- Исправлена ошибка, возникающая при удалении ссылок с частично загруженными задачами
- Предотвращено некорректное перемещение задач в конец ветки после изменения типа свойства `parent` с числового на строковый
- Улучшено поведение полос прокрутки за счёт корректировки ресайзеров возле скроллбаров
- Обеспечено сохранение [назначений ресурсов](guides/resource-management.md#assigningresources) при добавлении задач внутри [gantt.batchUpdate](api/method/batchupdate.md)
- Исправлена проблема исчезновения задач при drag-and-drop в [бесконечной шкале](guides/configuring-time-scale.md#infinitescroll)
- Обеспечено корректное отображение имён ресурсов в [lightbox](guides/default-edit-form.md) после многократного парсинга данных
- Исправлен некорректный расчёт даты в [`getClosestWorkTime`](api/method/getclosestworktime.md) при использовании конфигурации [duration_step](api/config/duration_step.md)
- Разрешено отменять событие [onColumnDragMove](api/config/reorder_grid_columns.md)
- Исправлена проблема совместимости, мешающая запуску trial-сборки в Lightning Web Components (LWC)
- Решены проблемы, связанные с конфигурациями `fetchTasks` и [deepcopy_on_parse](api/config/deepcopy_on_parse.md), влияющие на [ресурсную панель](guides/resource-management.md#resourceviewpanel)
- Исправлен внешний вид иконок-шрифтов при инициализации Gantt

## 9.0.5

<span class='release_date'>28 февраля 2025. Релиз с исправлениями</span>

- Исправлена ошибка при изменении размера строк в [Resource Grid](guides/resource-management.md#resourceviewpanel)
- Обеспечено указание последнего года в диапазоне, заданном свойством **year_range** для [Time control](guides/time.md#properties)
- Исправлено положение стрелок ссылок, зависящее от CSS-свойства `line-height`
- Исправлена ошибка при загрузке [коллекций](guides/supported-data-formats.md#jsonwithcollections) без массива `links`
- Решена проблема с `gantt.config.baselines`, когда значение ложно, но не установлено явно в `false`
- Исправлена проблема, при которой [click_drag](guides/extensions-list.md#advanceddragndrop) не работал после вызова [resetLayout](api/method/resetlayout.md)
- Обеспечено, чтобы выбранные дочерние задачи не отображались выше родительских при включённой [keyboard_navigation](guides/keyboard-navigation.md)
- Исправлены проблемы навигации с клавиатуры, возникающие, если идентификаторы задач содержат одинарные кавычки
- Исправлено поведение [calculateEndDate](api/method/calculateenddate.md) при отрицательной длительности
- Решена ошибка при загрузке наборов данных с [baselines](guides/inbuilt-baselines.md) без активного таймлайна
- Обеспечено, чтобы ячейки грида получали фокус даже если задачи выходят за пределы временного диапазона графика
- Исправлена ошибка при частичном удалении значения даты в [инлайн-редакторе](guides/inline-editors-ext.md)
- Исправлена проблема некорректного отображения [ресурсной панели](guides/resource-management.md#resourceviewpanel) после фильтрации при включённом `fetchTasks`

## 9.0.4

<span class='release_date'>3 декабря 2024. Релиз с исправлениями</span>

- Исправлена проблема, при которой дату ограничения [SNET](guides/auto-scheduling.md#timeconstraintsfortasks) нельзя было изменить через [инлайн-редактор](guides/inline-editors-ext.md)
- Исправлена проблема, при которой Gantt возвращал глобальный [календарь](guides/working-time.md) вместо ресурсного календаря для задач с одним [назначением ресурса](guides/resource-management.md#assigningresources), если конфигурация [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) отключена
- Исправлена проблема с датой [constraint](guides/auto-scheduling.md#timeconstraintsfortasks) при изменении даты начала через инлайн-редактор после [переинициализации](api/method/init.md) Gantt или [сброса layout](api/method/resetlayout.md)
- Исправлена ошибка скрипта при некоторых конфигурациях [gantt.plugins](api/method/plugins.md) при использовании метода [gantt.getGanttInstance](guides/multiple-gantts.md) без указания контейнера
- Исправлена проблема, при которой Gantt переставал работать при включённой конфигурации [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md) и [группировке](api/method/groupby.md) задач
- Обеспечено сохранение задачи [constraint](guides/auto-scheduling.md#timeconstraintsfortasks) после перетаскивания задачи

## 9.0.3

<span class='release_date'>19 ноября 2024. Релиз с исправлениями</span>

- Исправлена регрессия в стилях для всплывающего окна [Quick Info](guides/quick-info.md)
- Устранены предупреждения сборки PostCSS, вызванные использованием 'start'/'end' вместо 'flex-start'/'flex-end'
- Предотвращено удаление [назначения ресурса](guides/resource-management.md#assigningresources) при обновлении через lightbox
- Исправлена проблема с пустым массивом задач в [resource_cell_value](api/template/resource_cell_value.md) в нерабочие дни при включённой опции [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- Исправлена ошибка при клике по кнопкам, встроенным в секции [lightbox](guides/default-edit-form.md)
- Обеспечена синхронизация [ресурсной панели](guides/resource-management.md#resourceviewpanel) и [уровней масштабирования](guides/zooming.md#builtinzoomingmodule)
- Предотвращено удаление событий [Inline Editors](guides/inline-editors-ext.md) после [переинициализации](api/method/init.md) Gantt или [сброса layout](api/method/resetlayout.md)
- Исправлена проблема, при которой состояние открытия не восстанавливалось после [redo](guides/undo-redo.md) изменений

## 9.0.2

<span class='release_date'>11 ноября 2024. Релиз с исправлениями</span>

### Исправления

- Исправлена регрессия, вызывавшая некорректные стили для границ задач и прогресса при указании цвета задачи через [свойства объекта задачи](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)
- Восстановлена работоспособность шаблона [marker_class](api/template/marker_class.md)
- Восстановлен отсутствующий класс для секции [textarea](guides/textarea.md) в lightbox
- Исправлена проблема, при которой [дедлайны](guides/inbuilt-baselines.md#deadlinesandconstraints) отображались вне строки задачи и были не полностью по центру
- Обеспечено отображение связей поверх других связей при наведении курсора мыши
- Исправлена проблема, при которой даты [baseline](guides/inbuilt-baselines.md) не рассчитывались при их загрузке через метод [parse](api/method/parse.md)
- Исправлены позиции [ограничений](guides/inbuilt-baselines.md#deadlinesandconstraints) как для обычного, так и для [RTL](guides/rtl-mode.md) режимов
- Предотвращено появление лишних циклических связей при связывании частей разбитых задач
- Исправлена проблема, при которой [Quick Info](guides/quick-info.md) в [detached mode](api/config/quick_info_detached.md) не скрывалась из-за увеличенной ширины и жёстко заданных стилей
- Обновлён [Export API](api/method/exporttoexcel.md) для поддержки отступов дерева при экспорте в Excel
- Решена проблема, мешавшая выбору задачи при включённой опции [multiselect_one_level](api/config/multiselect_one_level.md) и выборе задачи на другом уровне дерева
- Восстановлена работоспособность плагина [export_api](api/method/exporttopdf.md) в среде TypeScript
- Обновлены определения типов

## 9.0.1

<span class='release_date'>21 октября 2024. Релиз с исправлением ошибок</span>

### Исправления

- Исправлена регрессия с некорректным положением связи при перетаскивании с включённым [smart_rendering](api/config/smart_rendering.md)
- Исправлена регрессия, при которой [Resource Control](guides/resources.md) в [lightbox](guides/default-edit-form.md) выходил за пределы контейнера
- Исправлена отсутствующая нижняя граница ячеек [шкалы времени](guides/configuring-time-scale.md) в последней строке при их выделении с помощью пользовательского CSS
- Исправлено некорректное поведение [липких меток](guides/configuring-time-scale.md#stickylabels) при отключённом [smart_scales](api/config/smart_scales.md)
- Решена проблема, при которой Gantt продолжал [вертикальное перетаскивание](api/config/order_branch.md) задачи после клика правой кнопкой мыши
- Исправлена проблема, при которой вызов [resetLayout](api/method/resetlayout.md) нарушал работу плагина [S-Curve Overlay](guides/baselines.md#extraoverlayforthechart)
- Предотвращено создание дублирующихся связей редактором предшественников ([predecessor editor](guides/inline-editing.md#typesofeditors))

## <b>9.0</b>

<span class='release_date'>17 октября 2024. Крупное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlx-gantt-9-0/)

### Важные изменения

Это обновление вносит изменения в структуру пакета Gantt и поведение функциональности. Обязательно ознакомьтесь с 
[заметками по миграции](migration.md#80---90), чтобы избежать проблем.

### Новая функциональность

- [Настройка скинов](guides/custom-skins.md) с помощью CSS-переменных
- Новый [тёмный скин](guides/skins.md#darkskin)
- Добавлена встроенная поддержка [baselines](guides/inbuilt-baselines.md)
- Поддержка [вручную планируемых суммарных задач](guides/custom-projects-dates.md)
- [Липкие метки для шкалы времени](guides/configuring-time-scale.md#stickylabels)

### Обновления

- Обновлён [Terrace skin](guides/skins.md#terraceskin)
- Добавлено отображение [дедлайнов](guides/inbuilt-baselines.md#deadlinesandconstraints) по умолчанию
- Добавлено отображение [ограничений задач](guides/inbuilt-baselines.md#taskconstraints) по умолчанию
- [Исходные файлы скинов](guides/custom-skins.md) теперь включены в пакет
- В [Undo plugin](guides/undo-redo.md) добавлены методы `setUndoStack` и `setRedoStack` для управления стеками undo/redo
- Возможность [установки профессиональных версий Gantt через npm](guides/installation.md)
- Библиотека [Bluebird Promise](api/method/promise.md) **удалена** из основной библиотеки
- Различные улучшения масштабирования на экранах с высоким разрешением и отзывчивости на небольших экранах
- Обновлены определения типов

### Исправления

- Исправлены некорректные позиции связей для Milestones при увеличенной высоте родительской задачи
- Исправлена ошибка, возникавшая при [автоматическом планировании](guides/auto-scheduling.md), если автоматическое планирование отменено для задачи
- Обеспечено корректное отображение [разбитых задач](guides/split-tasks.md) в строке родителя
- Исправлено [автоматическое планирование](guides/auto-scheduling.md#summaryscheduling) проектов при наличии связи подзадачи с лагом 0
- Исправлены некорректные позиции связей для [разбитых задач](guides/split-tasks.md) с разной высотой строк
- Gantt корректно автоматически планирует проекты с двумя уровнями задач
- Исправлена проблема, при которой Gantt не возвращал fixedDate "assignments" в [resource_cell_value](guides/resource-management.md#resourcecellvalue), если задача вне указанного диапазона дат

## 8.0.11

<span class='release_date'>8 октября 2024. Релиз с исправлением ошибок</span>

### Исправления

- Исправлен скроллинг грида вместе с таймлайном при наличии [разделителя столбцов](guides/specifying-columns.md#resizing) в самой правой колонке
- Предотвращено переключение [lightbox](guides/default-edit-form.md) в режим [wide_form](api/config/wide_form.md) при добавлении секции [Time](guides/time.md)
- [Числовой редактор](guides/inline-editing.md) теперь учитывает свойства min и max, не позволяя вводить значения вне заданного диапазона
- Исправлена ошибка при удалении задачи внутри метода [gantt.batchUpdate](api/method/batchupdate.md) при отображении задач в [Resource Panel](guides/resource-management.md)
- Исправлено позиционирование [lightbox](guides/default-edit-form.md) для корректного центрирования в среде Salesforce
- Исправлена остановка [клавиатурной навигации](guides/keyboard-navigation.md) из-за настройки [row_height](api/config/row_height.md)
- Исправлены даты для [автоматического планирования](guides/auto-scheduling.md) проектов в некоторых сценариях, теперь требуется только один вызов для корректного результата
- Решена проблема с [клавиатурной навигацией](guides/keyboard-navigation.md) при наличии [Resource Histogram](guides/resource-management.md#resourceviewpanel) на странице
- Исправлена ошибка инициализации на устройствах с поддержкой touch при вызове [gantt.getGanttInstance](guides/multiple-gantts.md) с параметрами конфигурации
- Метод [gantt.load](api/method/load.md) удалён из Node.js версии
- Исправлена ошибка, возникающая в Gantt при определении кастомной функции [getVisibleRange](api/method/addtasklayer.md)
- Исправлена регрессия, из-за которой Gantt прокручивал к задаче после её обновления при включённой [клавиатурной навигации](guides/keyboard-navigation.md)
- Исправлено [сортировка грида](api/config/sort.md) при клике по иконке сортировки в заголовке
- Исправлено неконсистентное перерисовывание задач при включённой опции [drag_timeline](api/config/drag_timeline.md)

## 8.0.10

<span class='release_date'>23 августа 2024. Релиз с исправлением ошибок</span>

### Исправления

- Исправлена проблема, при которой Gantt не [объединял](guides/working-time.md#mergingcalendars)" настройки дат из второго [календаря](guides/working-time.md)
- Исправлена проблема, при которой [ресурсы](guides/resource-management.md) не назначались при включённой опции ["скрывать пустые"](guides/resources.md)
- Исправлен метод [getLightboxSection](api/method/getlightboxsection.md), возвращавший `null` для секции [Resource Section](guides/resources.md) до изменения какого-либо значения
- Исправлена проблема, при которой шаблоны [Resource Histogram](guides/resource-management.md#resourceviewpanel) не вызывались для задач, начинающихся до минимальной даты, но заканчивающихся в отображаемом диапазоне
- Исправлена проблема, при которой [назначения ресурсов](guides/resource-management.md) не сохранялись после изменения [типа задачи](guides/typeselect.md)
- Исправлена проблема, при которой тип задачи 'project' [type](guides/typeselect.md) не устанавливался в lightbox
- Исправлена проблема, при которой [настройки рабочего времени](guides/working-time.md) [объединённого](guides/working-time.md#mergingcalendars)" календаря считались выходными
- Исправлена проблема, мешавшая [группировке](api/method/groupby.md) по ресурсам при наличии [назначений ресурсов](guides/resource-management.md) на разные даты
- Исправлена ошибка при попытке [отфильтровать разбитые задачи](guides/split-tasks.md#filteringsplittasks) без дочерних элементов с помощью события [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md)
- Исправлена проблема, при которой [назначения ресурсов](guides/resource-management.md) не обновлялись после [перетаскивания проекта с подзадачами](api/config/drag_project.md)

## 8.0.9

<span class='release_date'>18 июня 2024. Релиз с исправлением ошибок</span>

### Исправления

- Исправлена проблема, из-за которой задачи исчезали после использования [горячих клавиш](guides/keyboard-navigation.md) для увеличения или уменьшения отступа несколько раз подряд
- Исправлена проблема, мешавшая повторному открытию [inline editor](guides/inline-editing.md) после вертикальной прокрутки Gantt
- Исправлена проблема с [DataProcessor](guides/server-side.md#resources_crud), игнорировавшим пользовательские заголовки, указанные в методе [gantt.createDataProcessor](api/method/createdataprocessor.md)
- Исправлено отображение задач при возврате `false` из обработчика [onBeforeLightbox](api/event/onbeforelightbox.md) при создании новой задачи
- Исправлена некорректная высота [markers](guides/markers.md) при включённом параметре [timeline_placeholder](api/config/timeline_placeholder.md)
- Исправлена работа [Formatter](guides/formatters-ext.md) только с латинскими символами
- Исправлена проблема, из-за которой задачи исчезали после [вертикального перетаскивания](api/config/order_branch.md) родительской задачи
- Исправлена некорректная работа [горячих клавиш](guides/keyboard-navigation.md) для прокрутки при включённом [smart_rendering](api/config/smart_rendering.md)
- Исправлена проблема, при которой пользовательские свойства объектов [Resource Assignments](guides/resource-management.md) не включались после парсинга
- Обновлены определения типов TypeScript

## 8.0.8

<span class='release_date'>31 мая 2024. Релиз с исправлением ошибок</span>

### Исправления

- Исправлена проблема, из-за которой [Undo extension](guides/undo-redo.md) пропускала некоторые действия при массовых операциях
- Исправлена ошибка скрипта при вызове [gantt.deleteLink](api/method/deletelink.md) из функции [gantt.silent](api/method/silent.md)
- Исправлено некорректное поведение [автоматического планирования](guides/auto-scheduling.md) при наличии двух связанных задач с разными [календарями](guides/working-time.md)
- Исправлена ошибка скрипта после создания [циклической связи](api/method/iscircularlink.md)
- Исправлена ошибка скрипта после [уничтожения](api/method/destructor.md) Gantt с редактируемой [Resource Panel](guides/resource-management.md)
- Исправлена проблема, из-за которой [тултип](guides/tooltips.md) исчезал в некоторых браузерах

## 8.0.7

<span class='release_date'>16 мая 2024. Релиз с исправлением ошибок</span>

### Исправления

- Исправлена ошибка скрипта, возникающая в пробной сборке на SalesForce
- Событие [onAfterTaskUpdate](api/event/onaftertaskupdate.md) теперь срабатывает до событий [Auto Scheduling](guides/auto-scheduling.md) после перетаскивания задач на временной шкале
- Исправлено повторное срабатывание события при взаимодействии с выбранной задачей при включённом расширении [Multiselect](guides/multiselection.md)
- Исправлена ошибка скрипта, возникающая при отсутствии дат у первой задачи в диаграмме
- Добавлено имя секции [lightbox](guides/default-edit-form.md) как имя класса к элементу секции для лучшей идентификации
- Исправлена невозможность убрать планирование задач из [lightbox](guides/default-edit-form.md) при включённом [Auto Scheduling](guides/auto-scheduling.md)
- Исправлено позиционирование маркера [resize_rows](api/config/resize_rows.md) при прокрутке диаграммы Gantt
- Предотвращено [Auto Scheduling](guides/auto-scheduling.md) связанных [несогласованных задач](guides/unscheduled-tasks.md)
- Исправлен сбой Gantt при добавлении задач [Rollup](guides/milestones.md#rolluptasksandmilestones) с отключённым smart rendering
- Исправлено перетаскивание [split tasks](guides/split-tasks.md) на сенсорных устройствах
- Исправлены ошибки, возникающие при работе методов [isCriticalTask](api/method/iscriticaltask.md), [getFreeSlack](api/method/getfreeslack.md) и [getTotalSlack](api/method/gettotalslack.md) для [несогласованных задач](guides/unscheduled-tasks.md)
- Исправлена ошибка, возникающая при наличии в связанном проекте только дочерних [несогласованных](guides/unscheduled-tasks.md) задач

## 8.0.6

<span class='release_date'>25 сентября 2023. Релиз с исправлениями</span>

### Исправления

- Улучшения и исправления в использовании [WAI-ARIA атрибутов](guides/accessibility.md#waiariaattributes) для повышения доступности
- Исправлена проблема уменьшения ширины грида после перерисовки при включённой конфигурации [`grid_elastic_columns`](api/config/grid_elastic_columns.md)
- Значение по умолчанию для [`undo_steps`](guides/undo-redo.md#configuringtheundofunctionality) увеличено с 10 до 100
- [Export API client](guides/extensions-list.md#exportservice) теперь интегрирован в GPL-версию Gantt, ранее был доступен только в PRO-версиях
- Добавлена поддержка https export [server endpoints](guides/export.md#parametersoftheexportmethods) в [Node.js версии Gantt](guides/using-gantt-on-server.md)

## 8.0.5

<span class='release_date'>1 сентября 2023. Релиз с исправлениями</span>

### Исправления

- Исправлены некорректные предупреждения при включении расширений через конфигурацию [gantt.getGanttInstance](guides/multiple-gantts.md)
- Исправлена некорректная работа [gantt.exportToExcel()](api/method/exporttoexcel.md) при включённой конфигурации [skip_off_time](api/config/skip_off_time.md)
- Улучшения для [Samples Viewer](https://docs.dhtmlx.com/gantt/samples/)

## 8.0.4

<span class='release_date'>31 июля 2023. Релиз с исправлениями</span>

### Исправления

- Исправлена проблема с [DataProcessor](guides/server-side.md#resources_crud), не отслеживающим изменения [Resource Datastore](guides/resource-management.md#workingwithresourceviewpanel)
- Исправлена ошибка, возникающая после перетаскивания задачи при отключённой конфигурации [process_resource_assignments](api/config/process_resource_assignments.md)
- Исправлена некорректная работа [gantt.calculateEndDate](api/method/calculateenddate.md) при вычитании дат в минутах
- Незначительное повышение производительности для макетов с [visibility groups](guides/layout-config.md#visibilitygroups)

## 8.0.3

<span class='release_date'>14 июня 2023. Релиз с исправлениями</span>

### Исправления

- Повышена производительность [Resource Panel](guides/resource-management.md)
- Исправлен некорректный расчёт [Free Slack](guides/critical-path.md#gettingfreeandtotalslack) для задач с [отрицательным Lag](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)
- Исправлен некорректный расчёт [Critical Path](guides/critical-path.md) для задач с прогрессом 100%

## 8.0.2

<span class='release_date'>31 мая 2023. Релиз с исправлениями</span>

### Исправления

- Исправлены ошибки [Export](guides/export-common.md), возникающие при использовании [LinkFormatters](guides/formatters-ext.md#linkformatter)
- Исправлена некорректная работа расширения [Undo](guides/undo-redo.md) с [ресурсами и назначениями ресурсов](guides/resource-management.md)
- Обновлены определения типов
- Повышена производительность отрисовки задач [Rollup](guides/milestones.md#rolluptasksandmilestones)
- Повышена производительность отрисовки [Split Tasks](guides/split-tasks.md)
- Другие улучшения производительности

## 8.0.1

<span class='release_date'>30 марта 2023. Релиз с исправлениями</span>

### Исправления

- Исправлена ошибка, возникающая при вызове [gantt.showCover()](api/method/showcover.md), когда [lightbox](guides/default-edit-form.md) не открыт
- Исправлен регресс в [split tasks](guides/split-tasks.md), вызывавший ошибку скрипта для задач вне временной шкалы
- Исправлен регресс в методе [gantt.addLinkLayer()](api/method/addlinklayer.md)
- Исправлена некорректная работа [auto scheduling](guides/auto-scheduling.md) с ограничениями [MSO, FNET и FNLT](guides/auto-scheduling.md#timeconstraintsfortasks) при наличии минутных настроек рабочего времени ([settings of work time](guides/working-time.md#globalsettings))
- Исправлена работа события [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) при прокрутке

## <b>8.0</b>

<span class='release_date'>20 марта 2023. Крупное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlx-gantt-8-0/)

### Важные изменения

Ознакомьтесь с [статьёй по миграции](migration.md#71---80), чтобы быть в курсе последних изменений.

### Новая функциональность

- Обновлённое управление ресурсами:
    - ресурсы и назначения ресурсов теперь могут быть [загружены вместе с данными](guides/supported-data-formats.md#json)
    - изменения ресурсов и назначений ресурсов можно отслеживать с помощью [DataProcessor](guides/server-side.md#resources_crud)
    - уменьшено количество шаблонного кода для использования [панели ресурсов](guides/resource-management.md#workingwithresourceviewpanel)
- Группировка задач теперь может сохранять оригинальную структуру дерева Gantt внутри групп:
    - новый параметр **save_tree_structure** метода [groupBy()](api/method/groupby.md)
- [Экран пустого состояния](guides/empty-state-screen.md):
    - новое свойство [show_empty_state](api/config/show_empty_state.md)
    - новое расширение [emptyStateElement](guides/empty-state-element-ext.md)
- Возможность расширять фоновый грид временной шкалы на весь контейнер:
    - новое свойство [timeline_placeholder](api/config/timeline_placeholder.md)
- Улучшения для rollup-элементов и split tasks:
    - возможность стилизовать отдельные [rollup-элементы](guides/milestones.md#stylingseparaterollupitems) и [split tasks](guides/split-tasks.md#styling)
    - возможность [скрывать все rollup-элементы для задачи проекта](guides/milestones.md#hidingtasksandmilestones)
    - возможность контролировать, где отображаются rollup-элементы (новое событие [onBeforeRollupTaskDisplay](api/event/onbeforerolluptaskdisplay.md))
    - возможность [фильтровать split tasks](guides/split-tasks.md#filteringsplittasks) (новое событие [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md))
    - оптимизация производительности отображения split tasks
- Возможность удалять элементы только после подтверждения от backend:
    - новый параметр **deleteAfterConfirmation** объекта конфигурации [dataProcessor](api/method/createdataprocessor.md)
- Обновлённые Auto Scheduling и расчёт ограничений:
    - задачи теперь могут наследовать тип ограничения от родительских проектов:
        - новое свойство [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- Улучшения для Critical Path, Slack и Auto Scheduling:
    - Алгоритмы Critical path, Slack и Auto scheduling теперь могут использовать прогресс задачи:
        - новое свойство [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
     - [total slack](guides/critical-path.md#gettingfreeandtotalslack) теперь может рассчитываться для проектов
     - значительное улучшение производительности расчёта critical path
- Метод [getTaskBy()](api/method/gettaskby.md) теперь позволяет выбирать задачи типа 'project':
    - новый параметр **types** метода [getTaskBy()](api/method/gettaskby.md)
- Возможность добавлять любой HTML-контент в ячейки Timeline:
    - новый шаблон [timeline_cell_content](api/template/timeline_cell_content.md)
- Экспорт API теперь включён в [gantt.plugins](guides/extensions-list.md#exportservice) и больше не требует подключения отдельного JS-файла. Подробнее в статье по [миграции](migration.md#71---80)

### Обновления

- Обновлены определения типов TypeScript

### Исправления

- Исправлена проблема [расчёта длительности](guides/working-time.md) с минутной [duration_unit](api/config/duration_unit.md) и пользовательскими настройками [рабочего времени](guides/working-time.md#globalsettings)
- Исправлены различные ошибки расчёта slack
- Исправлена ошибка скрипта при загрузке данных при включённых [Slack calculations](guides/critical-path.md#gettingfreeandtotalslack)
- Метод [setWorkTime](api/method/setworktime.md) теперь поддерживает установку правил для дат внутри customWeeks
- Исправлена проблема с smart rendering, вызывающая появление пустых областей вместо данных в Gantt
- Исправлена проблема [вертикального перемещения](guides/reordering-tasks.md) строк в гриде при наличии строк с [нестандартной высотой](guides/resizing-rows.md#settingtherowheight)
- Исправлена некорректная работа [Inline editors](guides/inline-editing.md) при включённом расширении [Multiselect](guides/multiselection.md)
- Исправлено некорректное отображение всплывающего окна [Quick Info](guides/quick-info.md) при установленном значении [gantt.config.quick_info_detached](api/config/quick_info_detached.md) в `false`
- Исправлены аргументы функции `is_valid` интерфейса [Inline Editor](guides/inline-editing.md#custominlineeditor). Теперь функция получает объект колонки
- Гарантируется корректное сохранение свойства `parent` задачи при создании задачи с активным [gantt.groupBy](guides/grouping.md)
- Исправлена проблема с неожиданной вертикальной прокруткой при включённых [placeholder tasks](api/config/placeholder_task.md) и [Keyboard navigation](guides/keyboard-navigation.md)
- Исправлена проблема с [DataProcessor](guides/server-side.md), из-за которой некоторые изменения не отправлялись на backend после [Auto Scheduling](guides/auto-scheduling.md)
- Исправлена некорректная работа [вертикального перемещения](guides/reordering-tasks.md), позволявшая перетаскивать строки задач за пределы Gantt
- Исправлен неправильный порядок CSS-классов `odd` строк в [Resource panel](guides/resource-management.md#resourceviewpanel)

## 7.1.13

<span class='release_date'>4 ноября 2022. Релиз с исправлениями</span>

### Исправления

- Исправлена некорректная работа метода [gantt.addLinkLayer()](api/method/addlinklayer.md) с параметром [smart_rendering](api/config/smart_rendering.md)
- Исправлены проблемы отображения [S-Curve Overlay](guides/baselines.md#extraoverlayforthechart) совместно с различными [шкалами времени](guides/configuring-time-scale.md)
- Исправлена проблема с [изменением размера колонок грида](guides/specifying-columns.md#resizing) при включённой опции [grid_elastic_columns](api/config/grid_elastic_columns.md)
- Исправлена проблема, из-за которой Gantt сбрасывал позицию вертикального скролла после удаления задачи с помощью [Клавиатурной навигации](guides/keyboard-navigation.md)
- Исправлена некорректная работа метода [treeDatastore.move()](api/other/treedatastore.md)
- Исправлена проблема с методом [gantt.parse()](api/method/parse.md): [дополнительные коллекции](guides/supported-data-formats.md#jsonwithcollections) из набора данных теперь доступны через метод [gantt.serverList()](api/method/serverlist.md)
- Исправлена ошибка метода [gantt.groupBy()](api/method/groupby.md), приводившая к сбросу состояния выделения после группировки
- Исправлены проблемы совместимости с Vue.js v3.x
- Исправлена ошибка скрипта, возникавшая при вызове метода [gantt.getConstraintLimitations()](api/method/getconstraintlimitations.md) для задачи без параметра 'constraint_date'
- Исправлены проблемы совместимости с SalesForce Web Security
- Исправлена проблема, из-за которой фокус возвращался в Gantt после клика вне контейнера Gantt при включённой [Клавиатурной навигации](guides/keyboard-navigation.md#focusbehaviorduringkeyboardnavigation)
- Обновлена [немецкая локализация](guides/localization.md#activatingalocale)
- Теперь возможно открыть встроенный редактор одним кликом по задаче в режиме мультивыделения (добавлено свойство [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md))

## 7.1.12

<span class='release_date'>16 июня 2022. Релиз исправлений</span>

### Исправления

- Исправлена некорректная работа метода [gantt.isWorkTime()](api/method/isworktime.md) с временной единицей "week"
- Исправлена проблема, из-за которой задачи и связи не отображались при их добавлении через метод [gantt.silent()](api/method/silent.md)
- Исправлена ошибка, вызывавшая появление сообщения "Task not found" после загрузки данных в некоторых случаях
- Исправлена некорректная работа метода [gantt.changeLightboxType()](api/method/changelightboxtype.md), оставлявшего старые элементы lightbox в DOM
- Исправлен некорректный расчёт конечных дат задач при наложении задач после перехода на летнее/зимнее время
- Исправлена проблема, из-за которой [Resource Grid](guides/resource-management.md#resourceviewpanel) исчезал при редактировании значения ресурса через редактор ячейки
- Исправлена ошибка скрипта при наличии в [макете Gantt](guides/layout-config.md) представлений ["resourceGrid"/"resourceTimeline"](guides/resource-management.md#resourceviewpanel) без включения "grid"/"timeline"
- Исправлена некорректная работа конфигурации [autosize](api/config/autosize.md) при наличии в макете Gantt [Resource Panel](guides/resource-management.md#resourceviewpanel)
- Исправлена работа [lightbox](guides/default-edit-form.md) для [разделённых задач](guides/split-tasks.md): теперь lightbox появляется при двойном клике по разделённой задаче

## 7.1.11

<span class='release_date'>27 апреля 2022. Релиз исправлений</span>

### Исправления

- Исправлены sourcemaps для сжатых файлов Gantt
- Исправлена некорректная позиция [маркеров](guides/markers.md) при применении [autosize = 'y'](api/config/autosize.md)
- Исправлено некорректное положение [тултипов](guides/tooltips.md) и некоторых других элементов Gantt, если контейнер Gantt имел дополнительный отступ или вертикальные смещения
- Исправлена проблема, из-за которой строки [редактируемой диаграммы ресурсов](guides/resource-management.md) меняли порядок после редактирования первой ячейки назначения ресурса
- Исправлена некорректная работа [smart rendering](api/config/smart_rendering.md) после сворачивания или разворачивания задач в некоторых случаях
- Исправлена проблема с событием [onBeforeDrag](guides/advanced-dnd.md), которое не блокировало стандартные действия при активных расширениях [click_drag](guides/extensions-list.md#advanceddragndrop) и [drag_timeline](guides/extensions-list.md#dragtimeline)
- Исправлена ошибка скрипта при вызове метода [changeId()](api/other/datastore.md) для [хранилища назначений ресурсов](guides/resource-management.md#assigningresources)
- Полосы прокрутки стандартного [макета Gantt](guides/layout-config.md#defaultlayout) больше не требуют фиксированных имён **scrollVer**/**scrollHor** для корректной работы
- [Разделённые задачи](guides/split-tasks.md) теперь получают класс 'gantt_selected' при [выделении](api/config/select_task.md), как и обычные задачи

## 7.1.10

<span class='release_date'>16 марта 2022. Релиз исправлений</span>

### Исправления

- Исправлена проблема, из-за которой Gantt не отображал [проектную задачу](guides/task-types.md#projecttasks), если у неё не было дочерних задач и был указан параметр `start_date`
- Исправлена проблема с [изменением размера строки задачи перетаскиванием](guides/resizing-rows.md#resizingrowsbydraganddrop), если ID задачи был не числовым значением или строкой-числом длиннее 16 символов
- Исправлена некорректная работа [групп видимости](guides/layout-config.md#visibilitygroups), мешавшая синхронизации размеров грида и шкалы времени в [сложном макете](guides/layout-config.md)
- Исправлены проблемы с датами задач после горизонтального перетаскивания нескольких задач одновременно
- Исправлена проблема, из-за которой [dataProcessor](guides/server-side.md) не отправлял все обновления из разных хранилищ при отключённом [режиме автообновления](https://docs.dhtmlx.com/api__dataprocessor_setupdatemode.html)
- Исправлена проблема, из-за которой [milestone](guides/milestones.md) со связью [FF](api/config/links.md) переносился на следующий день
- Исправлен некорректный расчёт `end_date` для вех при использовании [обратного планирования](guides/auto-scheduling.md#forwardbackwardplanning) и установке [project_end](api/config/project_end.md) на нерабочее время
- Исправлена некорректная работа переупорядочивания задач, если над Gantt отображались HTML-элементы
- Исправлена проблема с методом [unsetWorkTime()](api/method/unsetworktime.md), когда конфигурация даты/дня удалялась из календаря, но изменения не применялись сразу
- Исправлена проблема с методом [clearAll()](api/method/clearall.md), который не очищал выделенные задачи при включённом расширении [multiselect](guides/extensions-list.md#multitaskselection)
- Исправлена ошибка при использовании метода [exportToExcel()](api/method/exporttoexcel.md) с параметром
`visual: true` и установкой конфигурации [duration_unit](api/config/duration_unit.md) в 'hour'

## 7.1.9

<span class='release_date'>10 января 2022. Релиз исправлений</span>

### Исправления

- Исправлена проблема с выравниванием подзадач после перетаскивания проекта в шкале "year" и [динамическом переключении шкал](guides/dynamic-scale.md)
- Исправлена проблема, из-за которой продолжительность проекта менялась после [перетаскивания проекта с подзадачами](api/config/drag_project.md) в шкале ["month"](api/config/scales.md)
- Исправлена ошибка при [Автоматическом планировании](guides/auto-scheduling.md), из-за которой [тип ограничения](guides/auto-scheduling.md#timeconstraintsfortasks) менялся с "ASAP" на "SNET" после изменения продолжительности задачи
- Исправлена некорректная работа [обратного планирования](guides/auto-scheduling.md#forwardbackwardplanning) после изменения дат начала и окончания через встроенные редакторы при включённой опции [schedule_from_end](api/config/schedule_from_end.md)
- Теперь можно открыть lightbox [для задач только для чтения в режиме только для чтения](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)
- Теперь невозможно редактировать задачи только для чтения через lightbox
- Исправлена проблема, из-за которой lightbox не открывался для [редактируемых задач в режиме только для чтения](guides/readonly-mode.md#readonlymodefortheentiregantt) (появилась в v6.3.1)
- Исправлена проблема с изменением размера колонок грида после скрытия шкалы времени через [show_chart](api/config/show_chart.md)
- Исправлена проблема с [Автоматическим планированием](guides/auto-scheduling.md), которое нельзя было отменить после изменения значений [project_start](api/config/project_start.md) и [project_end](api/config/project_end.md)
- Исправлена проблема, из-за которой gantt назначал ограничения задачам с отключённым авто-планированием
- Исправлена проблема с определением диапазона лет в lightbox, когда диапазон дат задач превышает 10 лет и [не задан диапазон для селектора года](guides/duration.md)
- Исправлена ошибка скрипта, возникавшая после загрузки Gantt при наличии горизонтального скроллбара, прикреплённого к 3 и более вертикальным представлениям
- Исправлена некорректная работа события [onBeforeTaskAutoSchedule](api/event/onbeforeautoschedule.md) после установки [ограничения ASAP](guides/auto-scheduling.md#timeconstraintsfortasks) для задачи без связей при включённом [строгом режиме](api/config/auto_scheduling_strict.md)
- Исправлена ошибка при запуске минифицированных версий Gantt в проектах Next.js
- Исправлена проблема, из-за которой ширина Gantt изменялась после инициализации [экземпляра gantt](guides/multiple-gantts.md#ganttinstanceconfiguration) внутри пустого контейнера

## 7.1.8

<span class='release_date'>30 ноября 2021. Релиз исправлений</span>

### Исправления

- Исправлена ошибка скрипта, возникавшая из метода [gantt.groupBy](guides/grouping.md) при включённых [Resource Histogram](guides/resource-management.md#resourceviewpanel) и конфигурации [fit_tasks](api/config/fit_tasks.md)
- Исправлена некорректная работа [расширения Undo](guides/undo-redo.md), не отправлявшего обновления [на сервер](guides/server-side.md) при возврате [вертикального переупорядочивания](guides/reordering-tasks.md)
- Исправлена проблема с модулем [Экспорт в MS Project](guides/export-msproject.md), который в некоторых случаях возвращал результат `Unknown error` при отправке пользовательских свойств на экспорт
- Исправлена некорректная работа метода [gantt.silent](api/method/silent.md), который не предотвращал вызов событий API и перерисовок при использовании [gantt.changeTaskId](api/method/changetaskid.md)
- Исправлена некорректная работа метода [gantt.undo](api/config/undo.md), не восстанавливавшего исходное вертикальное положение возвращаемого элемента
- Исправлена некорректная работа [формы назначения ресурсов](guides/resources.md), из-за которой gantt заменял пользовательский id [назначения ресурса](guides/resource-management.md#assigningresources) автоматически сгенерированным значением
- Исправлена некорректная работа [gantt.changeTaskId](api/method/changetaskid.md) в случаях, когда затронутые задачи имели вложенные элементы, что приводило к некорректному вычислению уровня вложенности

## 7.1.7

<span class='release_date'>5 октября 2021. Релиз исправлений</span>

### Исправления

- Исправлены ошибки некорректного расчёта значений [total slack](api/method/gettotalslack.md)
- Улучшена производительность расчёта [total slack](guides/critical-path.md#gettingfreeandtotalslack)
- Исправлены стили для [lightbox](guides/edit-form.md) в скине [Material](guides/skins.md#materialskin)
- Исправлена проблема с [Zoom plugin](guides/zooming.md#builtinzoomingmodule), из-за которой метод [zoom.init](guides/zoom.md) не работал при вызове после [gantt.init](api/method/init.md)
- Исправлена ошибка скрипта при использовании настройки [inherit_calendar](guides/working-time.md#assigningcalendartoproject) совместно с методом [gantt.groupBy](guides/grouping.md)
- Исправлена ошибка скрипта при добавлении задач через [gantt.batchUpdate](api/method/batchupdate.md), если активна [placeholder task](api/config/placeholder_task.md)
- Исправлена проблема, позволявшая [placeholder task](api/config/placeholder_task.md) сортироваться, менять порядок или принимать подзадачи
- Исправлены ошибки с некорректным размером [столбцов грида](guides/specifying-columns.md)
- Исправлена некорректная работа [разделителей столбцов](guides/specifying-columns.md#resizing), конфликтующих с [перетаскиванием столбцов](api/config/reorder_grid_columns.md)

## 7.1.6

<span class='release_date'>23 августа 2021. Исправление ошибок</span>

### Исправления

- Исправлена некорректная работа настройки [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md) при включённой опции [schedule_from_end](api/config/schedule_from_end.md)
- Исправлена некорректная работа колбэка [onrender](api/config/columns.md) столбца, из-за которой пользовательские элементы исчезали при быстрой прокрутке грида
- Исправлен регресс (появился в v7.1.5), из-за которого строки грида исчезали после изменения размера ячейки в сложных макетах
- Исправлена некорректная работа [групп видимости/размера](guides/layout-config.md#visibilitygroups), из-за которой размеры столбцов не синхронизировались в сложных макетах
- Улучшено отображение грида при рендеринге Gantt в маленьком контейнере

## 7.1.5

<span class='release_date'>22 июля 2021. Исправление ошибок</span>

### Исправления

- Исправлена некорректная работа вертикального изменения порядка задач в режиме ["marker"](guides/reordering-tasks.md#improvingperformancewithlargedatasets), когда строки Gantt имеют разную высоту
- Исправлена проблема с размерами временной шкалы и грида в некоторых макетах, когда отключены настройки [show_grid](api/config/show_grid.md) и [show_chart](api/config/show_chart.md)
- Для ячеек заголовка грида добавлены атрибуты `data-column-name` и `data-column-index`
- Исправлено некорректное отображение грида после [повторной инициализации](api/method/init.md) Gantt после удаления всех столбцов [из конфигурации](guides/specifying-columns.md#overview)
- Исправлена проблема, из-за которой конфигурация панели ресурсов перезаписывала [основную конфигурацию](guides/common-configuration.md#ganttconfigobject) Gantt в приложениях на Vue.js
- Добавлена возможность изменять конфигурацию [панели ресурсов](guides/resource-management.md#resourceviewpanel) на лету путём изменения объекта конфигурации, передаваемого в [resource layout](guides/layout-config.md#configsandtemplatesofviews)

## 7.1.4

<span class='release_date'>30 июня 2021. Исправление ошибок</span>

### Исправления

- Исправлена некорректная работа [unsetWorkTime](api/method/unsetworktime.md), из-за которой затронутые даты имели неправильные рабочие часы
- Исправлена ошибка скрипта в [Resource histogram](guides/resource-management.md#resourceviewpanel) после прокрутки, если [resource_render_empty_cells](api/config/resource_render_empty_cells.md) установлено в false и [smart_rendering](api/config/smart_rendering.md) включён
- Исправлена некорректная работа методов `editNextRow` и `editPrevRow` модуля [Inline Editors](guides/inline-editors-ext.md)
- Исправлена некорректная работа всплывающего окна [Quick Info](guides/extensions-list.md#quickinfo), из-за которой окно отображалось после нажатия кнопки "добавить" в гриде
- Исправлена некорректная работа ограничений [ASAP](guides/auto-scheduling.md#timeconstraintsfortasks), из-за которой задачи не переносились на самую раннюю дату проекта
- Исправлена некорректная работа [Inline Editors](guides/inline-editors-ext.md), из-за которой [constraints](guides/auto-scheduling.md#timeconstraintsfortasks) нельзя было редактировать через inline editor
- Исправлено некорректное поведение логики "scroll into view" для [Keyboard Navigation](guides/keyboard-navigation.md), вызывавшее ненужную прокрутку, когда выбранные бары задач уже видимы
- Исправлена ошибка скрипта при перемещении мыши за пределы контейнера, если включено расширение [click_drag](guides/extensions-list.md#advanceddragndrop)
- Улучшена производительность для опции конфигурации [auto_types](api/config/auto_types.md) в Gantt

## 7.1.3

<span class='release_date'>25 мая 2021. Исправление ошибок</span>

### Исправления

- Исправлена ошибка скрипта при вызове [gantt.moveTask](api/method/movetask.md), если некоторые задачи скрыты через событие [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)
- Исправлена проблема со скоростью прокрутки в последних версиях браузера Firefox
- Улучшена производительность [расчётов рабочего времени](guides/working-time.md)

## 7.1.2

<span class='release_date'>26 апреля 2021. Исправление ошибок</span>

### Исправления

- Значительное повышение производительности [панели ресурсов](guides/resource-management.md#resourceviewpanel)
- Исправлена ошибка скрипта при вызове [gantt.destructor](api/method/destructor.md) во время выполнения [gantt.load](api/method/load.md)
- Исправлено некорректное поведение [split tasks](guides/split-tasks.md) при изменении id задачи
- Исправлена некорректная работа прокрутки с помощью колёсика мыши в Angular

## 7.1.1

<span class='release_date'>19 апреля 2021. Исправление ошибок</span>

### Исправления

- Исправлен регресс в плагине [click_drag](guides/extensions-list.md#advanceddragndrop)
- Исправлена ошибка Security Violation, возникавшая в Gantt при установке [gantt.config.csp](api/config/csp.md) в режим "auto"
- Исправлены настройки сборки, из-за которых пакет версии v7.1.0 содержал синтаксис ES6, библиотека снова совместима с ES5
- Исправлена ошибка скрипта при попытке изменить размер столбца грида при включённой настройке [gantt.config.reorder_grid_columns](api/config/reorder_grid_columns.md)
- Обновлены определения типов TypeScript
- Добавлено событие [onDestroy](api/other/datastore.md#ondestroy) для [datastore](api/other/datastore.md)
- Улучшена производительность Gantt с большим количеством [календарей задач](guides/working-time.md#assigningcalendartotask)
- Улучшена производительность [расчёта назначений ресурсов](guides/resource-management.md#managingresourceassignments) во время [batchUpdate](api/method/batchupdate.md) и [autoScheduling](guides/auto-scheduling.md)

## 7.1

<span class='release_date'>8 апреля 2021. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlx-gantt-7-1-part-time-resource-assignment-rollup-tasks/)
### Важные изменения

Обновление вносит изменения в некоторые части компонента. Хотя обновление не требует модификации существующего кода, обязательно ознакомьтесь со статьёй [Migration](migration.md#70---71).

### Новая функциональность

- [Возможность назначать ресурсы на определённые даты задачи](guides/resource-management.md#resourceassignmenttime)
- Новый метод [gantt.getTaskAssignments()](api/method/gettaskassignments.md)
- [Возможность управлять назначениями ресурсов](guides/resource-management.md#managingresourceassignments) через новые API [gantt.config.process_resource_assignments](api/config/process_resource_assignments.md) и [gantt.updateTaskAssignments()](api/method/updatetaskassignments.md)
- [Rollup задачи и вехи](guides/milestones.md#rolluptasksandmilestones)
- [Возможность скрывать бары задач и вехи на временной шкале](guides/milestones.md#hidingtasksandmilestones)
- [Возможность задавать разные рабочие часы для разных периодов времени](guides/working-time.md#rules_for_periods)
- [Возможность задавать высоту отдельной строки в гриде](guides/resizing-rows.md#settingtherowheight)
- [Возможность изменять размер строки в гриде перетаскиванием](guides/resizing-rows.md#resizingrowsbydraganddrop)
- Возможность получить высоту DOM-элемента задачи через метод [gantt.getTaskBarHeight()](api/method/gettaskbarheight.md)
- Новые события: [onBeforeRowResize](api/event/onbeforerowresize.md), [onRowResize](api/event/onrowresize.md), [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md), [onAfterRowResize](api/event/onafterrowresize.md)
- Добавлен колбэк [onrender](guides/specifying-columns.md#modifyingcellsafterrendering) для рендера ячейки грида в DOM
- Добавлен колбэк [onrender](api/method/addtasklayer.md) для рендера пользовательского элемента слоя задачи в DOM

### Исправления

- Исправлена проблема с изменением порядка задач по вертикали в resource view, когда у ресурсов есть назначенные значения
- Исправлена проблема, из-за которой не вызывался "resource_cell_value" и не отображались маркеры ресурсов, если задача не начиналась в начале ячейки временной шкалы
- Исправлена проблема, из-за которой Gantt переставал работать при удалении задачи с id, который уже существует в data store
- Исправлена ошибка скрипта при указании значения 0 в качестве id задачи, даже если задан параметр "root_id"
- Исправлена проблема, из-за которой обработчик изменения размера не работал в среде Salesforce
- Исправлена ошибка скрипта при многократном применении расширения [Fullscreen Extension](guides/fullscreen-ext.md) и его методов
- Исправлена проблема с [Keyboard Navigation Extension](guides/keynav-ext.md), из-за которой навигация по гриду прекращалась при многократном добавлении плагина
- Исправлена проблема с [Inline Editors](guides/inline-editing.md), когда редактор нельзя было открыть в ячейке после скрытого столбца с помощью свойства [hide:true](guides/specifying-columns.md#visibility)

## 7.0.13

<span class='release_date'>15 февраля 2021. Исправление ошибок</span>

### Исправления

- Исправлена ошибка скрипта при динамическом изменении [конфигурации layout](guides/layout-config.md#layoutcustomization) и использовании [gantt.addTaskLayer](api/method/addtasklayer.md)
- Исправлена проблема с начальной внутренней высотой [resource histogram](guides/resource-management.md#resourceviewpanel) при использовании опции `fetchTasks`
- Исправлена некорректная работа [predecessor editor](guides/inline-editing.md#typesofeditors), из-за которой существующие связи удалялись при редактировании значения
- Исправлена некорректная работа Gantt при добавлении [задачи с неуникальным ID](guides/task-object-operations.md) через методы [gantt.addTask](api/method/addtask.md) и [gantt.parse](api/method/parse.md)
- Повышена производительность drag and drop при включённых опциях [auto_types](api/config/auto_types.md) и [drag_project](api/config/drag_project.md)
- Улучшена производительность [расчёта рабочего времени](guides/working-time.md), когда [duration_unit](api/config/duration_unit.md) установлен в "day"

## 7.0.12

<span class='release_date'>14 января 2021. Исправление ошибок</span>

### Исправления

- Исправлены некоторые мелкие проблемы с [вертикальным drag and drop](guides/reordering-tasks.md#draganddropacrosstheentireganttstructure) в крупных проектах
- Исправлена ошибка с некорректным размером контейнера при использовании конфигурации [autosize](api/config/autosize.md)
- [Клавиатурная навигация](guides/keyboard-navigation.md) теперь корректно работает с горизонтальной прокруткой грида
- [HTML-представления](guides/layout-config.md#htmlasinnerview) Layout теперь поддерживают внешние [скроллбары](guides/layout-config.md#scrollbar)
- Исправлена ошибка, приводившая к некорректному состоянию грида после [изменения порядка задач](guides/reordering-tasks.md#draganddropacrosstheentireganttstructure), если в layout был добавлен [дополнительный грид](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html)
- Исправлена ошибка скрипта, возникавшая после очистки и повторной загрузки [панели ресурсов](guides/resource-management.md), если был выбран ресурс
- Добавлена возможность отключить автоматическую корректировку конечной даты в секции [time](guides/time.md) lightbox, которая применялась, когда выбранная дата начала превышала дату окончания
- Исправлена опечатка в конфигурации по умолчанию [Duration Formatter](guides/formatters-ext.md)
- Исправлена ошибка скрипта, возникавшая при уничтожении gantt через [gantt.destructor](api/method/destructor.md), если в это время отображалось [popup сообщение](guides/message-boxes.md#basicpopupmessage)
- Исправлена начальная позиция горизонтальной прокрутки в Grid и Timeline в режиме [RTL](guides/rtl-mode.md)
- Исправлена некорректная работа lightbox, из-за которой выбранный тип задачи не сохранялся, если в конфигурацию lightbox не был добавлен контрол [typeselect](guides/typeselect.md)
- Исправлена ошибка, из-за которой [маркеры](guides/markers.md) исчезали после вызова метода [gantt.resetLayout()](api/method/resetlayout.md)
- Исправлена проблема с производительностью при использовании конфигурации [drag_project](api/config/drag_project.md) в крупных проектах
- Исправлена ошибка, из-за которой тултип [QuickInfo](api/method/showquickinfo.md) не отображался в режиме [read-only](guides/readonly-mode.md), если в конфиг были добавлены пользовательские кнопки

## 7.0.11

<span class='release_date'>11 ноября 2020. Bugfix release</span>

### Обновления

- Добавлена конфигурация [container_resize_timeout](api/config/container_resize_timeout.md) для изменения таймаута перед перерисовкой Gantt при изменении размера контейнера
- Добавлена конфигурация [wheel_scroll_sensitivity](api/config/wheel_scroll_sensitivity.md) для изменения скорости прокрутки gantt колесом мыши

### Исправления

- Исправлен баг с [Автоматическим планированием](guides/auto-scheduling.md) при использовании разных рабочих календарей
- Исправлен конфликт между задачами [placeholder](api/config/placeholder_task.md) и [Автоматическим планированием](guides/auto-scheduling.md)
- Исправлены лишние перерисовки при включенной опции [sort](api/config/sort.md)
- Исправлена проблема с [Inline Editors](guides/inline-editing.md) и прокручиваемым гридом, когда inline editors теряли фокус сразу после клика
- Исправлена ошибка, из-за которой Gantt закрывал тултип [Quick Info](guides/extensions-list.md#quickinfo) при клике по нему пользователем

## 7.0.10

<span class='release_date'>22 сентября 2020. Bugfix release</span>

### Исправления

- Исправлена некорректная работа [вертикальных ресайзеров](guides/layout-config.md#defaultlayout) (регрессия появилась в v7.0.9)
- Предотвращено неожиданное обновление страницы при вертикальном изменении порядка задач в Chrome на Android (pull-to-refresh)
- Исправлена ошибка скрипта, возникавшая при создании связи на мобильном Firefox
- Исправлена некорректная работа выбора задач при включенной конфигурации [multiselect](api/config/multiselect.md), но неактивированном плагине [multiselect](guides/extensions-list.md#multitaskselection)
- Улучшена работа HTML select-контролов внутри [Inline Editors](guides/inline-editing.md)
- Исправлена некорректная работа [Автоматического планирования](guides/auto-scheduling.md) при использовании связанных задач с разными [рабочими календарями](guides/working-time.md)
- Метод [gantt.plugins](api/method/plugins.md) больше не активирует плагины, указанные со значением `false`
- Исправлен конфликт между [Inline Editors](guides/inline-editing.md) и [Клавиатурной навигацией](guides/keyboard-navigation.md)
- Исправлена ошибка, из-за которой [Inline Editors](guides/inline-editing.md) закрывались при двойном клике

## 7.0.9

<span class='release_date'>27 августа 2020. Bugfix release</span>

### Исправления

- Исправлена ошибка скрипта при втором [инициализации](api/method/init.md) Gantt при добавлении [кастомных datastores](api/method/createdatastore.md)
- Исправлена некорректная работа [auto-scheduling](guides/auto-scheduling.md) при использовании с [FF и SS связями](api/config/links.md) и когда исходные и целевые задачи используют [разные рабочие календари](guides/working-time.md#multipleworktimecalendars)
- Исправлена некорректная [работа с рабочим временем](guides/working-time.md), когда [duration_unit](api/config/duration_unit.md) установлен в "minute" и время начала попадает на середину нерабочего дня
- Исправлена поддержка touch для Safari iPad на iPadOS v13.6
- Исправлены размеры модального оверлея [Lightbox](guides/default-edit-form.md) на мобильных устройствах
- Исправлено некорректное отображение [кнопок lightbox](guides/custom-button.md) в некоторых браузерах
- Исправлена поддержка итальянской и португальской локалей в модуле [gantt.i18n](api/other/i18n.md)
- Исправлен баг в [Parent control](guides/parent.md) [Lightbox](guides/default-edit-form.md), приводивший к некорректной работе при назначении задач на корневой уровень
- Исправлена ошибка скрипта при инициализации gantt внутри iframe
- Исправлена некорректная работа конфигурации [redo](api/config/redo.md) при отключенной опции [undo](api/config/undo.md)

## 7.0.8

<span class='release_date'>24 июля 2020. Bugfix release</span>

### Исправления

- Исправлены некоторые проблемы с поддержкой touch на Android/iOS устройствах
- Исправлена регрессия (появилась в v7.0.6) с созданием связей и методом [gantt.isLinkAllowed](api/method/islinkallowed.md)
- Исправлена ошибка скрипта при использовании параметра 'locale' в [gantt.getGanttInstance](guides/multiple-gantts.md)
- Исправлена ошибка скрипта, возникавшая при вызове [gantt.destructor](api/method/destructor.md) при активных расширениях [Keyboard Navigation](guides/extensions-list.md#keyboardnavigation) и [Quick Info](guides/extensions-list.md#quickinfo)

## 7.0.7

<span class='release_date'>17 июля 2020. Bugfix release</span>

- Исправлена синтаксическая ошибка в type definition для [gantt.Promise](api/method/promise.md)

## 7.0.6

<span class='release_date'>16 июля 2020. Bugfix release</span>

### Исправления

- Исправлены ошибки скрипта на touch устройствах при работе с [drag and drop](guides/dnd.md)
- Исправлена некорректная работа расширения [Auto Scheduling](guides/auto-scheduling.md), когда [типы связей](api/config/links.md) определялись с помощью числовых значений
- Уменьшено количество лишних перерисовок [гистограммы ресурсов](guides/resource-management.md#resourceviewpanel)
- Улучшена производительность расширения [группировка задач](guides/grouping.md)
- Исправлена возможность прокрутки ресурсного timeline на touch устройствах
- Исправлена некорректная работа [resource control](guides/resource-management.md) при использовании кнопки 'hide empty'
- Исправлен тип возвращаемого значения [gantt.Promise](api/method/promise.md) в type definitions

## 7.0.5

<span class='release_date'>19 июня 2020. Bugfix release</span>

### Обновления

- Улучшена производительность [расчёта рабочего времени](guides/working-time.md), когда конфигурация [duration_unit](api/config/duration_unit.md) установлена в "hour"
- Улучшена производительность [расчёта рабочего времени](guides/working-time.md), когда конфигурация [duration_unit](api/config/duration_unit.md) установлена в "minute"
- Добавлена возможность указывать рабочие календари в объекте конфигурации [`Gantt.getGanttInstance`](guides/multiple-gantts.md#ganttinstanceconfiguration)

## 7.0.4

<span class='release_date'>4 июня 2020. Bugfix release</span>

### Исправления

- Удалено ограничение в 10000px на размер gantt в режиме autosize, что позволяет [печать](api/method/exporttopdf.md) более крупных диаграмм
- [Drag and drop](guides/dnd.md) теперь завершается при отпускании кнопки мыши над любой частью документа, а не только над контейнером gantt
- Обновлена [португальская локализация](guides/localization.md)
- Исправлен тип возвращаемого значения [gantt.columnIndexByDate](api/method/columnindexbydate.md) в type definitions
- Исправлены ошибки скрипта при уничтожении экземпляра Gantt ([gantt.destructor](api/method/destructor.md)) во время [drag and drop](guides/dnd.md)
- Исправлен некорректный расчет [end_date](api/method/calculateenddate.md)/[duration](api/method/calculateduration.md), когда [duration_unit](api/config/duration_unit.md) установлен в "minute" и [последний интервал рабочего времени](api/method/setworktime.md) заканчивается после 23:00
- Исправлена ошибка, из-за которой группы расширения [группировка](guides/grouping.md) раскрывались при любом изменении задачи
- Исправлена ошибка, из-за которой второй параметр метода [dataProcessor.setTransactionMode](guides/server-side.md#technique) игнорировался, если в первый параметр передавался объект
- Исправлена ошибка, из-за которой активный [inline editor](guides/inline-editing.md) исчезал после [перерисовки Gantt](api/method/render.md)
- Исправлена ошибка с расширением [static_background](api/config/static_background.md), когда клик по пустой ячейке воспринимался как клик по элементу задачи
- Gantt теперь динамически перерисовывает связи между [разделёнными задачами](guides/split-tasks.md) во время drag and drop
- Исправлена ошибка скрипта при вызове [gantt.addTask](api/method/addtask.md) в [node.js пакете](guides/using-gantt-on-server.md)
- Исправлена ошибка скрипта при вызове [gantt.destructor](api/method/destructor.md) в [node.js пакете](guides/using-gantt-on-server.md)

## 7.0.3

<span class='release_date'>14 мая 2020. Bugfix release</span>

### Исправления

- Исправлена регрессия в [методе setWorkTime](api/method/setworktime.md), приводившая к ошибке скрипта при установке рабочего времени для конкретного дня
- Исправлена некорректная работа расширения [Keyboard Navigation](guides/keyboard-navigation.md), когда Gantt используется внутри [SalesForce Lightning Web Component](https://github.com/DHTMLX/salesforce-gantt-demo)

## 7.0.2

<span class='release_date'>30 апреля 2020. Bugfix release</span>

### Исправления

- Исправлена некорректная работа [date formatters](api/other/date.md) при установленной опции [gantt.config.csp](api/config/csp.md) в true
- Исправлена регрессия в расширениях [click_drag](guides/extensions-list.md#advanceddragndrop) и [drag_timeline](guides/extensions-list.md#dragtimeline), приводившая к ошибке при создании [нескольких экземпляров Gantt](guides/multiple-gantts.md)
- Исправлен некорректный css-класс строки задачи после возврата статуса ошибки из [dataProcessor router function](guides/server-side.md#customrouting)
- Исправлена некорректная работа [inline editors](guides/inline-editing.md) внутри Shadow DOM

## 7.0.1

<span class='release_date'>16 апреля 2020. Bugfix release</span>

### Исправления

- Существенное повышение производительности при [вычислении длительности задач в рабочих минутах](guides/working-time.md)
- Исправлена регрессия в расширениях [Тултип](guides/tooltips.md) и [Undo](guides/undo-redo.md), которая приводила к некорректной работе при создании нескольких экземпляров Gantt
- Исправлена проблема с [перетаскиванием столбцов грида](api/config/reorder_grid_columns.md), из-за которой происходила прокрутка временной шкалы при перемещении курсора мыши к краю грида во время drag and drop
- Исправлено [неверное положение столбца после его перетаскивания к правой границе грида](api/config/reorder_grid_columns.md)
- [dataProcessor custom router](guides/server-side.md#customrouting) теперь корректно работает с отклонёнными promise
- Исправлена регрессия в [умном рендеринге](guides/performance.md#smartrendering), из-за которой некоторые связи не отображались
- [Разделённые задачи](guides/split-tasks.md) теперь отображают не только дочерние элементы первого уровня, но и все вложенные подзадачи
- Исправлена ошибка с [разделёнными задачами](guides/split-tasks.md) и умным рендерингом, возникавшая при наличии у разделённой задачи типа 'task'
- Исправлена проблема с [разделёнными задачами](guides/split-tasks.md), из-за которой Gantt не рассчитывал длительность задач типа 'project', вложенных в разделённую задачу
- Исправлено некорректное положение placeholder после открытия [inline-редактора](guides/inline-editing.md) в [RTL-режиме](guides/rtl-mode.md)


## <b>7.0</b>

<span class='release_date'>7 апреля 2020. Крупное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlx-gantt-7-0-node-js-server-module-merging-multiple-calendars-reordering-grid-columns-drag-n-drop-new-customization-options/)
### Важные изменения

Обновление вносит множество изменений в методы API. Ознакомьтесь со статьёй [Миграция](migration.md#63---70), чтобы быть в курсе последних изменений.

### Новая функциональность

- Возможность создавать [экземпляр Gantt в Node.js](guides/using-gantt-on-server.md)
- Добавлен config [grid_elastic_columns](api/config/grid_elastic_columns.md) для настройки размера столбцов при изменении размера всего грида
- [Возможность изменять порядок столбцов грида с помощью drag and drop](api/config/reorder_grid_columns.md)
- Расширение [QuickInfo](guides/quick-info.md) теперь позволяет вручную управлять всплывающим окном через [методы объекта gantt.ext.quickInfo](guides/quickinfo-ext.md)
- Возможность [обрезать длинный текст с помощью троеточия в столбцах грида](guides/styling-guide.md#customizationgridcolumns)
- Добавлены config [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) и метод [mergeCalendars](api/method/mergecalendars.md) [для объединения нескольких календарей автоматически и вручную](guides/working-time.md#mergingcalendars)
- Добавлен метод [getResourceCalendar](api/method/getresourcecalendar.md)
- Возможность указывать [рабочее время в минутах](guides/working-time.md#globalsettings)


### Обновления

- Файлы локализации удалены из пакета, добавлен [новый API](api/other/i18n.md) для локализации Gantt
- Все расширения теперь должны активироваться через метод [plugins](api/method/plugins.md)
- `Gantt.getGanttInstance` теперь [может принимать объект конфигурации](guides/multiple-gantts.md#ganttinstanceconfiguration) при создании нового экземпляра Gantt
- Расширение CSP удалено из пакета, [csp mode включён по умолчанию](api/config/csp.md)
- В метод [attachEvent](api/method/attachevent.md) добавлен объект настроек в качестве третьего параметра
- Формат задания рабочих часов в методе [setWorkTime](api/method/setworktime.md) упрощён
- Рабочие часы по умолчанию изменены с 8:00-17:00 на 8:00-12:00, 13:00-17:00
- Формат config [gantt.config.resource_calendars](api/config/resource_calendars.md) упрощён
- В документацию добавлены [Видеоруководства](guides/video-guides.md)

### Исправления

- Исправлена ошибка, из-за которой ширина столбца менялась после его скрытия и повторного отображения
- Исправлена ошибка, отключавшая возможность выбора любой задачи при отключении расширения multiselect через config `multiselect`
- Исправлена некорректная работа `gantt.sort` для задач с одинаковой датой начала
- Исправлен drag and drop связи при инициализации Gantt внутри Web Component

## 6.3.7

<span class='release_date'>12 февраля 2020. Исправление ошибок</span>

### Исправления

- Значительное повышение производительности при умном рендеринге диаграммы и панели ресурсов

## 6.3.6

<span class='release_date'>10 февраля 2020. Исправление ошибок</span>

### Исправления

- Исправлена регрессия в [gantt.resetLayout](api/method/resetlayout.md), вызывавшая ошибку скрипта
- Исправлена проблема с [всплывающим окном QuickInfo](https://docs.dhtmlx.com/gantt/desktop__extensions_list.html#quickinfo ), из-за которой оно могло располагаться за [панелью ресурсов](https://docs.dhtmlx.com/gantt/desktop__resource_management.html#resourceviewpanel) в некоторых случаях
- Исправлена ошибка скрипта, возникавшая в методе [gantt.getShortcutHandler](api/method/getshortcuthandler.md)
- Исправлена ошибка скрипта, возникавшая в методе [tooltip.show(x, y)](https://docs.dhtmlx.com/gantt/desktop__tooltips_ext.html)
- [gantt.getTaskNode](api/method/gettasknode.md) теперь возвращает корректный HTML-элемент для [разделённых задач](https://docs.dhtmlx.com/gantt/desktop__split_tasks.html)
- Исправлена проблема с [горизонтальными полосами прокрутки](https://docs.dhtmlx.com/gantt/desktop__specifying_columns.html#horizontalscrollbar), не отображавшимися при наличии [visibility groups](https://docs.dhtmlx.com/gantt/desktop__layout_config.html#visibilitygroups) в некоторых конфигурациях layout

## 6.3.5

<span class='release_date'>31 января 2020. Исправление ошибок</span>

### Исправления

- Исправлена проблема с [группировкой задач](guides/grouping.md), из-за которой вертикальная позиция прокрутки сбрасывалась после перемещения любой задачи с помощью drag and drop
- Исправлена ошибка скрипта, возникавшая при установке config [drag_timeline](api/config/drag_timeline.md) в `null`
- Исправлено некорректное положение выделенных ячеек при включённых [static_background](api/config/static_background.md) и [static_background_cells](api/config/static_background_cells.md) и отключённом [smart_rendering](api/config/smart_rendering.md)
- Исправлена проблема, при которой событие [onAfterBranchLoading](api/event/onafterbranchloading.md) не вызывалось
- Исправлена некорректная работа [умного рендеринга](guides/performance.md#smartrendering), когда значение [task_height](api/config/task_height.md) было меньше значения [row_height](api/config/row_height.md)

### Обновления

- [Добавлен публичный метод для перестроения layout Gantt после изменения его конфигурации](api/method/resetlayout.md)

## 6.3.4

<span class='release_date'>27 декабря 2019. Исправление ошибок</span>

### Исправления

- Исправлены сбои [диаграммы загрузки ресурсов](guides/resource-management.md#resourceviewpanel) при отключённом [умном рендеринге](guides/performance.md#smartrendering)
- Исправлена проблема с пользовательским свойством задачи "unit", которое Gantt воспринимал как единицу длительности и умножал длительность задачи после её перетаскивания
- Исправлено некорректное положение [тултипа](guides/tooltips.md) при включённом config [autosize](api/config/autosize.md)
- Исправлено некорректное выравнивание ячеек грида при одновременном включении свойства [scrollable](guides/specifying-columns.md#horizontalscrollbar) и config [autofit](api/config/autofit.md)
- Создание связи между задачей на временной шкале и [placeholder](api/config/placeholder_task.md) в гриде теперь заблокировано
- Исправлена ошибка в [расширении авто-планирования](guides/auto-scheduling.md), которая приводила к зависанию Gantt при наличии у задачи [типа ограничения (SNET/FNET/SNLT/FNLT)](guides/auto-scheduling.md#timeconstraintsfortasks) без даты или с некорректной датой

## 6.3.3

<span class='release_date'>18 декабря 2019. Исправление ошибок</span>

### Исправления

- Исправлено некорректное [изменение размера грида](guides/specifying-columns.md#resizing), которое отключало Timeline в некоторых случаях
- [gantt.parse](api/method/parse.md) теперь корректно обновляет дерево проекта при загрузке родительской задачи после её дочерних элементов
- Исправлена совместимость с фреймворком SalesForce Lightning Aura components (Evaluation build)
- Исправлено некорректное положение [тултипа](guides/tooltips.md) в среде SalesForce
- Исправлено некорректное положение [тултипа](guides/tooltips.md), если контейнер gantt имеет вертикальный отступ
- Добавлены недостающие атрибуты [WAI-ARIA](guides/accessibility.md#waiariaattributes) для элементов внутри Gantt
- Исправлена некорректная работа config [min_duration](api/config/min_duration.md)
- Исправлена некорректная работа [link formatters](guides/formatters-ext.md#linkformatter) с пользовательскими [экземплярами Gantt](guides/multiple-gantts.md)

## 6.3.2

<span class='release_date'>10 декабря 2019. Исправление ошибок</span>

### Исправления

- Исправлена ошибка скрипта, возникавшая при вызове [gantt.destructor](api/method/destructor.md) при включённой [функции click-drag](guides/advanced-dnd.md)
- [gantt.parse](api/method/parse.md) больше не изменяет объекты данных, переданные в аргументах, теперь используются глубокие копии

### Обновления

- Обновлены определения типов TypeScript
- Добавлены публичные события [onBeforeBranchLoading](api/event/onbeforebranchloading.md) и [onAfterBranchLoading](api/event/onafterbranchloading.md), чтобы можно было изменять url или динамические параметры запросов [динамической загрузки](guides/dynamic-loading.md)
- Добавлен публичный метод для изменения url [dataProcessor](guides/server-side.md) после его инициализации

## 6.3.1

<span class='release_date'>29 ноября 2019. Исправление ошибок</span>

### Исправления

- Исправлена регрессия в [умном рендеринге](api/method/addtasklayer.md#smartrenderingforcustomlayers), из-за которой связи не отображались в некоторых случаях
- Исправлена ошибка, позволявшая изменять и создавать новые задачи с помощью [навигации с клавиатуры](guides/keyboard-navigation.md) при активированном [режиме только для чтения](guides/readonly-mode.md)
- Исправлена проблема отображения с [расширением Fullscreen](guides/fullscreen-mode.md), при которой некоторые элементы страницы отображались поверх Gantt в полноэкранном режиме
- Исправлена ошибка, при которой [расширение drag-timeline](guides/extensions-list.md#dragtimeline) сбрасывало значение config [readonly](guides/readonly-mode.md)

## 6.3

<span class='release_date'>14 ноября 2019. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlx-gantt-chart-6-3-decimal-durations-link-formatting-drag-n-drop-multiple-tasks-even-smarter-rendering/)
### Важные изменения

Обновление вносит множество изменений в методы API. Ознакомьтесь со статьёй [Миграция](migration.md#62---63), чтобы быть в курсе последних изменений.

### Новая функциональность

- [Возможность указывать дробные единицы длительности задач](guides/working-time.md#taskdurationindecimalformat)
- [Возможность прокручивать временную шкалу с помощью мыши (клик и drag)](guides/extensions-list.md#dragtimeline)
- [Возможность горизонтального drag and drop для нескольких задач](guides/multiselection.md#multitaskselectionanddragndrop)


### Обновления

- Возможность [отображать задачи](api/config/show_tasks_outside_timescale.md) вне явного диапазона [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md) [шкалы времени](guides/configuring-time-scale.md#range)
- Добавлен новый шаблон [task_end_date](api/template/task_end_date.md) для форматирования конечных дат задач
- Возможность добавлять пользовательские действия в стек [Undo](guides/undo-redo.md#undoingredoingchangesmadefromcode)
- Возможность подключать пользовательские слои к [умному рендерингу](api/method/addtasklayer.md#smartrenderingforcustomlayers)
- [Встроенные редакторы](guides/inline-editing.md) для **предшественников** теперь поддерживают форматированные значения связей
- Удалены стандартные ограничения для вводимых значений в [встроенных редакторах дат](migration.md#inline_editors)
- Возможность указать корневой узел для [расширения полноэкранного режима](guides/fullscreen-mode.md)
- Возможность изменять или отключать [горизонтальную прокрутку](api/config/horizontal_scroll_key.md) с помощью `shiftKey`+`mousewheel`
- Шрифт Roboto был удалён из [Material skin](guides/skins.md#materialskin) и теперь должен импортироваться вручную

### Исправления

- Исправлены сбои [гистограммы ресурсов](guides/resource-management.md#resourceviewpanel) при отключённом [умном рендеринге](guides/performance.md#smartrendering)
- Исправлена совместимость с компрессором r.js
- Исправлены различные конфликты между [клавиатурной навигацией](guides/keyboard-navigation.md) и [встроенными редакторами](guides/inline-editing.md)
- Исправлено некорректное состояние [DataProcessor](guides/server-side.md#customrouting) при последовательном изменении задач и связей из [пользовательского роутера](guides/server-side.md#customrouting)
- Корректный объект данных задачи/связи теперь также передаётся в вызов **delete** [пользовательского роутера](guides/server-side.md#customrouting)

## 6.2.7

<span class='release_date'>11 октября 2019. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлена проблема с вертикальным изменением размера [гридов с горизонтальной прокруткой](guides/specifying-columns.md#horizontalscrollbar) в [сложных макетах](guides/resource-management.md#resourceviewpanel)
- Исправлена некорректная работа [гистограммы ресурсов](guides/resource-management.md#resourceviewpanel) при [шаге шкалы времени](guides/configuring-time-scale.md#timestep) больше одного
- Исправлена повторно возникшая ошибка со свернутыми ветками после вызова [gantt.parse](api/method/parse.md) из исправления ошибок [v6.2.4](#624)

## 6.2.6

<span class='release_date'>19 сентября 2019. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлен регресс в [умном рендеринге v6.2](#62), который в некоторых случаях приводил к некорректному вертикальному расположению задач после [повторной инициализации](api/method/init.md) Gantt
- Исправлена проблема с [всплывающим окном QuickInfo](guides/extensions-list.md#quickinfo), не отображавшимся для [незапланированных задач](guides/unscheduled-tasks.md)
- Исправлена некорректная работа файлов расширения с Ultimate-сборкой Gantt

## 6.2.5

<span class='release_date'>12 сентября 2019. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлены некорректные начальные значения подзадач в обработчике события [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) после [перетаскивания проекта с подзадачами](api/config/drag_project.md)
- Исправлена некорректная работа расширения [группировки](guides/grouping.md) при включённых [автоматических типах задач](api/config/auto_types.md)
- Исправлена ошибка скрипта после возврата значения *false* из обработчика события [onTaskLoading](api/event/ontaskloading.md)
- Добавлены более понятные сообщения об ошибках для исключений, которые могут возникнуть при вызове [gantt.load](api/method/load.md) и [gantt.parse](api/method/parse.md)

## 6.2.4

<span class='release_date'>5 сентября 2019. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлена проблема со свёрнутыми ветками задач после обновления данных методом [parse](api/method/parse.md)
- Исправлена некорректная работа [умного рендеринга](guides/performance.md#smartrendering) в [ресурсном представлении](guides/resource-management.md#resourceviewpanel)
- Исправлена проблема, из-за которой [Zoom-модуль](guides/zooming.md) добавлял лишние обработчики DOM-событий при каждой [повторной инициализации](api/method/init.md) Gantt

## 6.2.3

<span class='release_date'>29 августа 2019. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлена некорректная работа [контроля ограничений](guides/auto-scheduling.md#timeconstraintsfortasks) в браузерах IE11 и MS Edge
- Исправлен размер элемента Gantt в [полноэкранном режиме](guides/fullscreen-mode.md)
- Исправлена проблема с событиями [onExpand](api/event/onexpand.md) и [onCollapse](api/event/oncollapse.md), которые не вызывались из [полноэкранного режима](guides/fullscreen-mode.md)
- Корректируется позиция [тултипа](guides/tooltips.md), когда курсор мыши находится у левого/правого края экрана
- [Тултип](guides/tooltips.md) теперь скрывается при открытии [Lightbox](guides/default-edit-form.md)
- [Тултип](guides/tooltips.md) теперь скрывается при прокрутке диаграммы
- Исправлена некорректная работа [тултипа](guides/tooltips.md), из-за которой тултип не обновлялся при перемещении курсора между двумя элементами, соответствующими одному и тому же селектору
- Исправлена некорректная работа [getTaskBy](api/method/gettaskby.md) при передаче `null` или `0` в качестве второго аргумента
- Исправлена проблема с колонкой [WBS](api/method/getwbscode.md), которая не обновлялась после [сортировки](guides/sorting.md) Gantt
- Исправлено некорректное отображение [static_background](api/config/static_background.md) в [Material skin](guides/skins.md#materialskin)

## 6.2.2

<span class='release_date'>13 августа 2019. Релиз с исправлениями ошибок</span>

### Обновления

- Добавлено свойство [gantt.license](api/other/license.md)
- Добавлено событие [onLinkCreated](api/event/onlinkcreated.md) для новых связей, аналогично функционалу [onTaskCreated](api/event/ontaskcreated.md) для новых задач
- [moveTask](api/method/movetask.md) возвращает `false`, если действие предотвращено с помощью [onBeforeTaskMove](api/event/onbeforetaskmove.md)

### Исправления

- Исправлена проблема, из-за которой линия связи исчезала при вызове метода [render](api/method/render.md) во время создания [новой связи](guides/dependencies.md) пользователем
- Исправлена проблема, когда [маркеры](guides/markers.md) не отображались, если их начальная дата была раньше минимальной даты [шкалы времени](guides/configuring-time-scale.md#range)
- Исправлена проблема, когда [маркеры](guides/markers.md) не отображались при инициализации gantt с конфигом [gantt.config.show_chart = false](api/config/show_chart.md)
- Исправлено исчезновение модального оверлея [lightbox](guides/default-edit-form.md) при изменении [типа задачи](guides/typeselect.md)
- Исправлено [поведение в пресетах клавиатурной навигации](https://docs.dhtmlx.com/gantt/desktop__keyboard_navigation.html#comment-4488512513), когда событие [onAfterTaskUpdate](api/event/onaftertaskupdate.md) срабатывало после горячей клавиши **Shift+стрелка влево**, даже если действие было отменено с помощью [onBeforeTaskMove](api/event/onbeforetaskmove.md)

## 6.2.1

<span class='release_date'>7 августа 2019. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлена совместимость с IE11 для [функции click-drag](guides/advanced-dnd.md)
- Исправлена ошибка скрипта при попытке пользователя добавить новую задачу в пустую диаграмму с ресурсным представлением
- Исправлено некорректное поведение расширения [группировки](guides/grouping.md), из-за которого новым задачам присваивалось неверное значение группы
- Исправлена ошибка скрипта в расширении [клавиатурной навигации](guides/keyboard-navigation.md), возникавшая при сочетании клавиш Alt+Arrow
- Фильтрация в [ресурсном контроле](guides/resource-management.md) теперь не учитывает регистр текста
- Перетаскивание задач и drag-and-drop теперь завершаются по mouseup на любом элементе gantt
- Исправлена ошибка скрипта, возникавшая после сохранения [незапланированной задачи](guides/unscheduled-tasks.md)

## 6.2

<span class='release_date'>16 июля 2019. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlxgantt-6-2-minor-update-boosting-gantt-chart-performance-zooming-mouse-wheel-much/)

### Изменения, нарушающие обратную совместимость

Обновление вносит множество изменений в методы API. Ознакомьтесь со статьёй [Миграция](migration.md#61---62), чтобы оставаться в курсе последней версии.

### Новая функциональность

- [Создание и выбор задач с помощью drag-n-drop](guides/advanced-dnd.md)
- Плавное [масштабирование](guides/zooming.md) колесом мыши
- Возможность [разворачивать/сворачивать раздельные задачи](guides/split-tasks.md#expandingandcollapsingsplittasks) (PRO)

### Обновления

- Значительное повышение производительности диаграммы и панели ресурсов
- Изменение даты начала/окончания задачи через [встроенные редакторы](guides/inline-editing.md) соответственно меняет длительность задачи
- Процесс [настройки шкалы времени](guides/configuring-time-scale.md) стал проще
- Новый API для [масштабирования](guides/zoom.md) и [шкал](api/config/scales.md)

### Исправления

- Подсветка нескольких задач сбрасывается после рендеринга
- Ошибка скрипта при уничтожении Gantt из обработчика data processor

## 6.1.7

<span class='release_date'>27 июня 2019. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлено некорректное поведение [getClosestWorkTime](api/method/getclosestworktime.md)
- Исправлена проблема с [autoscroll](api/config/autoscroll.md), возникшая после [переключения видимости](api/config/show_chart.md) шкалы времени
- Исправлена ошибка в [расширении Multiselect](guides/multiselection.md), из-за которой выбранные задачи теряли подсветку после перерисовки диаграммы
- Исправлена ошибка скрипта, возникавшая после [вертикального drag-and-drop](guides/reordering-tasks.md), если были включены [умный рендеринг](guides/performance.md#smartrendering) и [клавиатурная навигация](guides/keyboard-navigation.md)
- Исправлено некорректное поведение при попытке переключения между [встроенными редакторами](guides/inline-editing.md) с помощью клавиши `Tab`, если некоторые колонки грида были [скрыты](guides/specifying-columns.md#visibility)
- Исправлено неожиданное поведение, мешающее [lightbox](guides/edit-form.md) и [встроенным редакторам](guides/inline-editing.md) переопределять [даты ограничений](guides/auto-scheduling.md#timeconstraintsfortasks)

## 6.1.6

<span class='release_date'>14 мая 2019. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлена проблема с неработающими [обработчиками кликов](api/config/quickinfo_buttons.md) во [всплывающем окне QuickInfo](guides/extensions-list.md#quickinfo) после второго вызова [init](api/method/init.md)
- Исправлена проблема с [всплывающим окном QuickInfo](guides/extensions-list.md#quickinfo), не появлявшимся при установке [show_chart](api/config/show_chart.md) в false
- Исправлен некорректный аргумент `action` для [роутера dataProcessor](guides/server-side.md#customrouting) после [вертикального drag-and-drop](guides/reordering-tasks.md)
- Исправлена проблема, когда [createTask](api/method/createtask.md) игнорировал параметр `index`

## 6.1.5

<span class='release_date'>25 апреля 2019. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлена ошибка скрипта при втором вызове [init](api/method/init.md), если конфиг [show_chart](api/config/show_chart.md) отключён
- Исправлено некорректное положение плейсхолдера [вертикального drag-and-drop](guides/reordering-tasks.md) в [режиме маркера](guides/reordering-tasks.md#improvingperformancewithlargedatasets)

## 6.1.4

<span class='release_date'>18 апреля 2019. Релиз с исправлениями ошибок</span>

### Исправления

- Исправлена ошибка скрипта при [повторной инициализации](api/method/init.md) gantt в браузере IE
- Исправлено некорректное поведение [расширения тултипа](guides/tooltips.md) при вызове [gantt.destructor](api/method/destructor.md)
- Исправлена некорректная работа [встроенных редакторов](guides/inline-editing.md) в режиме [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md), когда грид содержит [скрытые колонки](guides/specifying-columns.md#visibility)
- Исправлена ошибка в расширении [Undo](guides/undo-redo.md), когда действие Redo для восстановления новых задач не возвращало все свойства
- Исправлен регресс в GPL-сборке, вызывавший ошибку скрипта при втором вызове [gantt.init](api/method/init.md)

## 6.1.3

<span class='release_date'>15 апреля 2019. Релиз с исправлениями ошибок</span>

### Исправления

- [gantt.createTask](api/method/createtask.md)/[gantt.addTask](api/method/addtask.md) теперь используют значение конфигурации [root_id](api/config/root_id.md) вместо захардкоженного id 0
- Повышена производительность [расчетов рабочего времени](guides/working-time.md) для единиц длительности `minute` и `hour` ([duration units](api/config/duration_unit.md))
- Незначительное повышение производительности при отображении больших списков задач в режиме [умного рендеринга](guides/performance.md#smartrendering)
- Гарантировано, что [вертикальное перетаскивание](guides/reordering-tasks.md) не начинается при выделении текста внутри [inline editor](guides/inline-editing.md)
- Исправлена ошибка скрипта при [повторной инициализации](api/method/init.md) Gantt в браузере IE
- Исправлена ошибка скрипта при [навигации с клавиатуры](guides/keyboard-navigation.md) в режиме `cell` после удаления последних задач из диаграммы
- Гарантировано, что Gantt очищает автоматически созданные элементы стилей [static background](api/config/static_background.md) после уничтожения или повторной инициализации
- Гарантировано, что [inline editors](guides/inline-editing.md) неактивны при включении [режима только для чтения](guides/readonly-mode.md)
- Исправлен некорректный выбор ячеек заголовка грида в режиме `cell` для [навигации с клавиатуры](guides/keyboard-navigation.md) при включенной конфигурации `sort`
- Исправлен регресс в конфигурации [auto_types](api/config/auto_types.md), из-за которого не происходила автоматическая смена типа при добавлении новых задач
- Исправлена ошибка, когда возврат `false` из [onTaskDblClick](api/event/ontaskdblclick.md) блокировал также [onLinkDblClick](api/event/onlinkdblclick.md)
- Исправлена ошибка скрипта при парсинге [дат ограничений](guides/auto-scheduling.md#timeconstraintsfortasks) из JSON-данных
- Исправлено некорректное положение задач и [маркеров](guides/markers.md) при использовании конфигурации [skip_off_time](api/config/skip_off_time.md)
- Исправлена некорректная высота [маркеров](guides/markers.md) после изменения порядка задач через [drag and drop](guides/reordering-tasks.md)
- Новые задачи получают начальное значение свойства `progress`
- Исправлено некорректное положение задачи после вертикального drag and drop в режиме [marker](guides/reordering-tasks.md#improvingperformancewithlargedatasets)
- Исправлена ошибка скрипта из [gantt.destructor](api/method/destructor.md) при включенной [панели ресурсов](guides/resource-management.md#resourceviewpanel)
- Исправлена ошибка, из-за которой отображалась пустая строка в блоке [typeselect](guides/typeselect.md)
- Исправлена ошибка, из-за которой задача не распознавалась как часть [критического пути](guides/critical-path.md) после [изменения id](api/method/changetaskid.md)


## 6.1.2

<span class='release_date'>26 марта 2019. Релиз исправлений</span>

### Обновления

- [Навигация с клавиатуры](guides/keyboard-navigation.md): добавлен метод для получения активной ячейки

### Исправления

- Исправлена некорректная работа [панели ресурсов](guides/resource-management.md#resourceviewpanel) после создания нового datastore поверх предыдущего
- Исправлены некорректные значения query-параметров в POST-режиме [dataProcessor](guides/server-side.md)
- Исправлен некорректный результат работы [gantt.getClosestWorkTime](api/method/getclosestworktime.md) при вызове без указания направления
- Исправлена проблема, когда английская локаль не могла переопределить ранее добавленную локаль
- Исправлена ошибка скрипта с [gantt.undo](api/config/undo.md) и действиями отступа в гриде
- Совместимость с SalesForce: новый resize listener не работал в SF, добавлен fallback


## 6.1.1

<span class='release_date'>5 марта 2019. Релиз исправлений</span>

### Исправления

- Добавлены недостающие опции локализации для [ресурсного элемента lightbox](guides/resources.md)
- Исправлена ошибка скрипта при использовании [gantt.destructor](api/method/destructor.md) вместе с dataProcessor
- Исправлена ошибка скрипта при использовании [gantt.destructor](api/method/destructor.md) вместе с [панелью ресурсов](guides/resource-management.md#resourceviewpanel)
- Исправлен размер файла расширения [tooltip](guides/tooltips.md)
- Исправлен неожиданный вызов события [onTaskDblClick](api/event/ontaskdblclick.md) при двойном клике по элементу ссылки
- Исправлен залипший [lightbox](api/config/lightbox.md) при вызове [gantt.init](api/method/init.md) во время открытого lightbox
- Исправлены проблемы с [lightbox](api/config/lightbox.md) и расширением [tooltip](guides/tooltips.md) в [полноэкранном режиме](guides/fullscreen-mode.md)


## 6.1

<span class='release_date'>21 февраля 2019. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlxgantt-6-1-time-constraints-backward-scheduling-s-curve/)

### Новая функциональность

- [Возможность добавлять overlay для Gantt](guides/baselines.md#extraoverlayforthechart) (PRO)
- [Ограничения по времени для задач](guides/auto-scheduling.md#timeconstraintsfortasks) (PRO)
- [Обратное планирование](guides/auto-scheduling.md#backwardscheduling) (PRO)
- В пакет добавлены определения типов TypeScript

### Обновления

- Возможность [создавать тултипы для всех элементов](guides/tooltips.md#tooltipsfordifferentelements) dhtmlxGantt
- [Опции маршрутизации для dataProcessor](guides/server-side.md#customrouting)
- [Рабочие календари на уровне проекта](guides/working-time.md#assigningcalendartoproject) (PRO)
- Возможность [импортировать dhtmlxGantt как ES6-модуль](guides/initializing-gantt-chart.md#moduleimport)

## 6.0.7

<span class='release_date'>16 января 2019. Релиз исправлений</span>

### Исправления

- Снижено количество лишних перерисовок [диаграммы ресурсов](guides/resource-management.md#resourceviewpanel)
- Исправлена ошибка скрипта из [диаграммы ресурсов](guides/resource-management.md#resourceviewpanel) после удаления задачи
- Исправлена ошибка скрипта из [расширения полноэкранного режима](guides/fullscreen-mode.md) после выхода из полноэкранного режима по клавише `Esc`
- Исправлено некорректное состояние drag and drop связей при перетаскивании между несколькими диаграммами на странице. Создание связей между разными Gantt не поддерживается
- Исправлена ошибка скрипта после удаления [нескольких выбранных задач](guides/multiselection.md) через [навигацию с клавиатуры](guides/keyboard-navigation.md)
- Исправлено стандартное сопоставление [inline editors](guides/inline-editing.md). Inline editors не должны блокировать горячие клавиши на ячейках задач

## 6.0.4

<span class='release_date'>27 декабря 2018. Релиз исправлений</span>

### Исправления

- Исправлено некорректное положение задачи после вертикального dnd в режиме `order_branch='marker'`
- Исправлена ошибка скрипта после удаления поддерева, содержащего выбранную задачу
- Исправлена ошибка скрипта при сохранении/отмене lightbox, содержащего фильтры ресурсов

## 6.0.2

<span class='release_date'>6 декабря 2018. Релиз исправлений</span>

### Исправления

- Исправлено `ReferenceError: getResourceAssignments is not defined` при импорте Gantt в проект на Vue.js
- Исправлена ошибка скрипта при удалении задачи после назначения ей ресурса через форму ресурсов
- Исправлена ошибка скрипта в диаграмме ресурсов после второго вызова `gantt.init`
- Исправлена ошибка скрипта при переключении видимости timeline при использовании расширения marker
- Исправлен "зависание" страницы при `gantt.parse`, если дерево задач содержит циклические ссылки - теперь выбрасывается ошибка скрипта


## <b>6.0</b>

<span class='release_date'>5 ноября 2018. Крупное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlxgantt-6-0-major-update-advanced-resource-management/)

### Функциональность

- [Назначение нескольких ресурсов на задачу](guides/resource-management.md#assigningresources) (PRO версия)
- [Группировка задач по нескольким ресурсам](guides/resource-management.md#balancingresourceload) (PRO версия)
- [Гистограмма ресурсов](guides/resource-management.md#resourceviewpanel) в дополнение к диаграмме загрузки ресурсов (PRO версия)
- Возможность [получать свободный/общий резерв задачи](guides/critical-path.md#gettingfreeandtotalslack) при [расчете критического пути](guides/critical-path.md) (PRO версия)
- [Импорт проектов из Excel](guides/excel.md#importfromexcel)
- [Режим DataProcessor "REST-JSON"](guides/server-side.md#restjson) для обработки сложных записей на любой серверной платформе
- Автоматическое изменение размера при изменении размера контейнера


### Конфигурация

- [Контрол ресурсов](guides/resources.md) в lightbox для назначения ресурсов задаче (PRO версия)
- [Улучшена производительность перестановки задач](guides/reordering-tasks.md#improvingperformancewithlargedatasets) в режиме "branch"
- Обновление производительности конфигурации [auto_types](api/config/auto_types.md) (PRO версия)

### API

- Режим "marker" для конфигурации [order_branch](api/config/order_branch.md) для ускорения перестановки задач внутри ветки
- Событие [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) для совместной работы с конфигурацией [order_branch](api/config/order_branch.md) в режиме "marker"
- Методы [getTotalSlack](api/method/gettotalslack.md) / [getFreeSlack](api/method/getfreeslack.md) для работы с резервом вместо метода getSlack() (PRO)
- Метод [importFromExcel](api/method/importfromexcel.md)
- Опция *delimiter* в методе [groupBy](api/method/groupby.md) для группировки ресурсов

## 5.2

<span class='release_date'>6 июля 2018. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlxgantt-5-2/)

### Функциональность

- [Inline-редактирование в гриде](guides/inline-editing.md)
- [Разделение задач](guides/split-tasks.md) (PRO версия)
- Обновленная [навигация с клавиатуры](guides/keyboard-navigation.md#existingshortcuts)
- Улучшена производительность [автоматического планирования](guides/auto-scheduling.md)

### Конфигурация

- Возможность [автоматически задавать типы задач](api/config/auto_types.md) (PRO версия)
- Возможность [использовать строку-заполнитель](api/config/placeholder_task.md) для создания новых задач
- [Чекбокс](guides/checkbox.md) и [радиокнопка](guides/radio.md) для lightbox
- Обновленное расширение [Content Security Policy](guides/content-security-policy.md)

### API

- Новые методы и события для расширений [undo](guides/undo-redo.md) и [autoscheduling](guides/auto-scheduling.md).

## 5.1

<span class='release_date'>27 февраля 2018. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlxgantt-5-1-resource-management-rtl-mode-and-more/)

### Функциональность

- [Управление ресурсами](guides/resource-management.md) (PRO версия)
- [RTL-режим](guides/rtl-mode.md)
- [Горизонтальный скролл для грида](guides/specifying-columns.md#horizontalscrollbar) и [другие улучшения layout](guides/layout-config.md)
- [Деструкторы для экземпляров Gantt и DataProcessor](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances)


### Конфигурация

- [Возможность задавать мин/макс ширины столбцов грида](guides/specifying-columns.md#width)
- [Возможность перетаскивать проекты вместе с подзадачами](guides/dnd.md#draggingprojectsalongwiththeirsubtasks) (PRO версия)
- [Расширенные параметры для методов экспорта](guides/export-common.md)


### API

- [Обновленные API-события](guides/multiselection.md#apievents) для расширения [Множественного выбора задач](guides/multiselection.md)


### Исправления

- Исправлены проблемы с навигацией с клавиатуры в режиме умного рендеринга


## <b>5.0</b>

<span class='release_date'>12 декабря 2017. Крупное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/large-scale-update-dhtmlxgantt-version-5-0/)

### Функциональность

- [Гибкая компоновка Gantt](guides/layout-config.md)
- [Интеграция с сервером через REST API](guides/server-side.md). Также смотрите [руководства для разных серверных платформ](integrations/howtostart-guides.md)


### Стилизация

- Новый скин ["Material"](guides/skins.md#materialskin)


## 4.2

<span class='release_date'>17 августа 2017. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlxgantt-4-2-manage-working-days-hours-individual-tasks/)

### Функциональность

- [Календари рабочего времени на уровне задачи и ресурса](guides/working-time.md#multipleworktimecalendars)
- [Расчет кода WBS (outline numbers)](guides/specifying-columns.md#wbscode)
- [Автопрокрутка при операциях drag and drop](guides/dnd.md#autoscrollwhiledraggingtasks)
- [Добавлена персидская (фарси) локализация](guides/localization.md#predefinedlocales)

### Конфигурация

- Добавлена [функция-геттер для горячих клавиш навигации](api/method/getshortcuthandler.md)
- Добавлена [конфигурация каскадного удаления вложенных задач и связей](api/config/cascade_delete.md)
- Добавлена возможность [горизонтальной прокрутки временной шкалы при *Shift+движении колесика мыши*](guides/keyboard-navigation.md#builtinshortcutforhorizontaltimelinescrolling)
- Обновлены немецкая и итальянская локализации
- GIF-изображения в скинах Gantt заменены на PNG


## 4.1

<span class='release_date'>1 сентября 2016. Минорное обновление</span>

[Обзор релиза в блоге](https://dhtmlx.com/blog/dhtmlxgantt-4-1-full-accessibility-support/)

### Функциональность

- [Навигация с клавиатуры](guides/keyboard-navigation.md)
- [Поддержка WAI-ARIA](guides/accessibility.md#waiariaattributes)
- [Темы с высоким контрастом](guides/accessibility.md#highcontrastthemes)
- Обновлен расчет [автоматического планирования](guides/auto-scheduling.md) и [критического пути](guides/critical-path.md) (PRO версия)

### Конфигурация

- Улучшена производительность при [расчете рабочего времени](guides/working-time.md) и [отрисовке временной шкалы](guides/performance.md)
- Добавлен [публичный метод для сброса рабочих времён](api/method/unsetworktime.md)
- Добавлены [API-события для тултипа QuickInfo](api/overview/events-overview.md)
- Добавлена [хорватская локализация](guides/localization.md#predefinedlocales)
- Обновлена [турецкая локализация](guides/localization.md#predefinedlocales)


## <b>4.0</b>

<span class='release_date'>1 декабря 2015. Крупное обновление</span>

### Функциональность

- [Умный рендеринг](guides/performance.md#smartrendering) для больших наборов данных
- Расширения для [отмены/повтора действий](guides/undo-redo.md)

### Конфигурация

- [Расчет критического пути](guides/critical-path.md) - добавлена поддержка [лагов и опережения для связей](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks) (PRO версия)
- Обновлены испанская и китайская [локализации](guides/localization.md#predefinedlocales)

### API

- Улучшения публичного API - публичные хелперы для [ajax](https://docs.dhtmlx.com/api__refs__dhtmlxajax.html), [переменных окружения](api/other/env.md)
- [Очистка публичного API](migration.md#3x---40) - удалены избыточные глобальные объекты, устранены конфликты с dhtmlxSuite
- Добавлены публичные хелперы для [всплывающих сообщений](guides/message-boxes.md)


## 3.3

<span class='release_date'>21 июля 2015. Минорное обновление</span>

### Функциональность

- Функция [автоматического планирования зависимостей](guides/auto-scheduling.md) (PRO версия)
- [Полноэкранный режим](guides/fullscreen-mode.md)
- Поддержка [незапланированных задач](guides/unscheduled-tasks.md)
- [Обратное планирование](guides/loading.md#loadingtaskdates)

### Конфигурация

- Начальная поддержка [Content Security Policy](guides/content-security-policy.md)
- Возможность задавать [сортировку грида по отдельным колонкам](guides/sorting.md#sortingpercolumninthegrid)
- Улучшена функция сортировки веток - [drag-n-drop между уровнями](guides/reordering-tasks.md#draganddropacrosstheentireganttstructure)

### API

- [REST-режим для загрузки/сохранения через ajax](guides/server-side.md)


## 3.2

<span class='release_date'>18 марта 2015. Минорное обновление</span>

### Функциональность

- [Группировка задач](guides/grouping.md) (PRO версия)
- [Множественный выбор задач](guides/multiselection.md)
- [Экспорт данных в форматы iCal и Excel](guides/excel.md)
- [Значительное повышение производительности расчетов рабочего времени и критического пути](guides/performance.md)


### Конфигурация

- [Возможность задавать диапазон для селектора года в lightbox](guides/time.md#mapping)


### API

- [События для управления доступными целями при переупорядочивании задач](guides/reordering-tasks.md#restrictingdroppositions)
- [События для управления процессом загрузки](guides/loading.md#eventsflow)
- Новые примеры, методы, события


## 3.1

<span class='release_date'>25 октября 2014. Минорное обновление</span>

### Функциональность

- Возможность перетаскивания задач на touch-устройствах

### Конфигурация

- [Изменено смещение по умолчанию между первой и последней задачей на шкале](api/config/scale_offset_minimal.md)

### Исправления ошибок

- Некорректная работа тултипа при раскрытии/свертывании дерева задач
- Порядок событий API во время инициализации Gantt
- Некорректная работа вертикальных маркеров при очистке или переинициализации Gantt


## <b>3.0</b>

<span class='release_date'>11 сентября 2014. Крупное обновление</span>

### Конфигурация

- [Возможность сопоставлять контролы 'Время' и 'Длительность' с пользовательскими свойствами дат](guides/time.md#mapping)

### Функциональность

- [Динамическая загрузка](guides/dynamic-loading.md) (PRO версия)
- [Возможность изменять размер колонок и всего грида с помощью drag-&-drop](guides/specifying-columns.md)
- [Возможность динамически скрывать/показывать колонки](guides/specifying-columns.md#visibility) (PRO версия)
- [Возможность отображать дополнительные элементы на временной шкале](guides/baselines.md) (PRO версия)
- [Поддержка критического пути](guides/critical-path.md) (PRO версия)
- [Новые возможности для режима только для чтения](guides/readonly-mode.md)
- [Маркер сегодняшнего дня и другие вертикальные маркеры](guides/markers.md)
- [Возможность полностью переопределять отрисовку различных типов задач (проекты, вехи и др.)](guides/baselines.md) (PRO версия)
- [Стилизация задач через специальные свойства данных](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)
- [Стилизация связей через специальные свойства данных](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)


### API

- [Новые методы для работы с деревом](guides/task-tree-operations.md)

## 2.1

<span class='release_date'>28 марта 2014. Минорное обновление</span>

### Глобально

- Обновлены локализации
- Исправлено множество ошибок

### Конфигурация

- [Пользовательская настройка lightbox для разных типов задач](guides/task-types.md#specificlightboxpertasktype)
- [Нелинейные шкалы, возможность пропускать время на шкале](guides/custom-scale.md) (PRO версия)

### Функциональность

- Поддержка [вех](guides/milestones.md) и [проектов](guides/task-types.md#projecttasks) (PRO версия)
- [Возможность рассчитывать длительность задач в рабочих днях/часах вместо календарного времени](guides/working-time.md)
- [Поддержка нескольких диаграмм Gantt на странице](guides/multiple-gantts.md) (PRO версия)

### API

- Добавлено больше конфигураций, методов, событий


## <b>2.0</b>

<span class='release_date'>18 октября 2013. Крупное обновление</span>

### Глобально

- [Интеграция с jQuery](guides/jquery-integration.md)
- Существенное повышение производительности
- [Готовая интеграция с PHP](guides/server-side.md)

### Конфигурация

- [Настраиваемые многоуровневые временные шкалы](guides/configuring-time-scale.md)
- [Настраиваемый много-колоночный грид с опциональной сортировкой и Drag-n-Drop](guides/reordering-tasks.md)
- [Настраиваемая всплывающая форма для редактирования задач](guides/edit-form.md)
- [Все текстовые элементы могут быть определены через шаблоны](guides/common-configuration.md#gantttemplatesobject)
- [Все строковые значения дат настраиваются](guides/common-configuration.md#ganttconfigobject)
- [Все текстовые метки могут быть локализованы](guides/localization.md)

### Стилизация

- [Скин по умолчанию изменен на "terrace"](guides/skins.md#terraceskin)
- [3 новых скина](guides/skins.md)
- [Бары могут иметь дополнительный внутренний резайзер](api/config/drag_resize.md)
- [Опциональный UI для создания задач](guides/overview.md)
- [Вертикальные и горизонтальные линии могут быть окрашены по пользовательским правилам](guides/highlighting-time-slots.md)

### Функциональность

- [Загрузка и сериализация из JSON](guides/supported-data-formats.md#json)
- [Загрузка и сериализация в упрощенном формате XML](guides/supported-data-formats.md#xmldhtmlxgantt20)
- [3 типа связей между задачами](api/config/links.md)
- Диаграммы Gantt работают на touch-устройствах


### API

- [Добавлено множество событий](api/overview/events-overview.md)
- [Шаблоны](api/overview/templates-overview.md) и [опции конфигурации](api/overview/properties-overview.md)
- [API упрощен: теперь используется единый объект Gantt вместо множества разных объектов](migration.md)

