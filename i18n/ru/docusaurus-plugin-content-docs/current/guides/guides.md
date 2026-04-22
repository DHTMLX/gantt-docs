---
title: "Руководства"
sidebar_label: "Руководства"
---

## Руководства

Информация по руководствам составляет основную часть документации и помогает вам в реальном использовании dhtmlxGantt.
Раздел разделён на руководства, ориентированные на выполнение задач различной сложности.
Статьи охватывают ключевые процедуры и задачи по решению проблем. 

Посмотрите [функции, доступные в версиях Standard и PRO](guides/editions-comparison.md) библиотеки dhtmlxGantt.

<div className="guidesList">

## Создание диаграммы Gantt на странице 

Показывает, как установить и инициализировать Gantt, и предоставляет список доступных расширений.

- ### [Как установить dhtmlxGantt](guides/installation.md)
- ### [Инициализация Gantt](guides/initializing-gantt-chart.md)
- ### [Полный список расширений](guides/extensions-list.md)

## Настройка диаграммы Gantt 

Рассказывает, как создать Gantt на сервере, собрать стандартную диаграмму Gantt на странице и привести её к жизни: настройка с конкретными параметрами, настройка стандартных шаблонов, присоединение обработчиков событий и т.д.

- ### [Конфигурация](guides/common-configuration.md)
- ### [Макет Gantt](guides/layout-config.md)
- ### [Управление ресурсами](guides/resource-management.md)
- ### [Обработка событий](guides/handling-events.md)
- ### [Несколько диаграмм Gantt на странице](guides/multiple-gantts.md)
- ### [Использование Gantt на сервере](guides/using-gantt-on-server.md)


## Загрузка и сохранение данных 

Обсуждает способы загрузки данных в диаграмму Gantt: различные источники данных, форматы, техники.

- ### [Загрузка данных](guides/loading.md)
- ### [Интеграция на стороне сервера](guides/server-side.md)
- ### [Производительность: способы улучшения](guides/performance.md)
 
## Настройка области грид 

Фокусируется на работе с грид: укажите требуемые столбцы и настройте их, настройте столбец дерева, включите выделение и т.д.

- ### [Указание столбцов](guides/specifying-columns.md)
- ### [Изменение размера строк в грид](guides/resizing-rows.md)
- ### [Настройка столбца дерева](guides/tree-column.md)
- ### [Переупорядочение задач](guides/reordering-tasks.md)
- ### [Множественный выбор задач](guides/multiselection.md)
- ### [Сортировка столбцов](guides/sorting.md)
- ### [Группировка задач](guides/grouping.md)
- ### [Фильтрация задач](guides/filtering.md)
- ### [Встроенное редактирование в грид](guides/inline-editing.md)
  
 
## Настройка шкал времени

Фокусируется на работе с таймлайном: настройка формата, единиц измерения, шага основной временной шкалы, добавление вторичных шкал и их настройка, выделение конкретных дат и т.д.

- ### [Настройка шкалы](guides/configuring-time-scale.md) 
- ### [Масштабирование](guides/zooming.md)
- ### [Выделение временных интервалов](guides/highlighting-time-slots.md)
- ### [Динамическое изменение параметров шкалы](guides/dynamic-scale.md)
- ### [Скрытие временных единиц в шкале](guides/custom-scale.md)
- ### [Добавление вертикальных маркеров](guides/markers.md)
- ### [RTL (право-налево) режим](guides/rtl-mode.md)
  
## Настройка Lightbox (формы редактирования) 

Фокусируется на работе с lightbox: добавление/удаление элементов управления, получение/установка значений элементов управления, настройка внешнего вида lightbox и т.д.

- ### [Настройка элементов Lightbox](guides/default-edit-form.md)
- ### [Работа с элементами Lightbox](guides/lightbox-manipulations.md)
- ### [Пользовательский Lightbox](guides/custom-edit-form.md)
- ### [Создание пользовательского элемента](guides/custom-editor.md)
- ### [Изменение кнопок в Lightbox](guides/custom-button.md)
 

## Настройка задач 

Освещает основы выполнения общих операций над задачами, таких как добавление, удаление, установка формата даты, фильтрация и т.д.

- ### [Типы задач](guides/task-types.md) 
- ### [Объект задачи/ID](guides/task-object-operations.md)
- ### [Родительская/Дочерняя задача](guides/task-tree-operations.md)
- ### [Основные операции с задачами](guides/crud-task.md)
- ### [Незапланированные задачи](guides/unscheduled-tasks.md)
- ### [Разбиение задач](guides/split-tasks.md)
- ### [Множественный выбор задач](guides/multiselection.md)
- ### [Расчет рабочего времени](guides/working-time.md)
- ### [Критический путь](guides/critical-path.md)
- ### [Дополнительные элементы во временной шкале](guides/inbuilt-baselines.md)
- ### [Пользовательские элементы в области таймлайна](guides/baselines.md)
- ### [Вехи](guides/milestones.md)
- ### [Тултипы для элементов Gantt](guides/tooltips.md)
- ### [Отображение содержимого задач](guides/text-block-for-task.md)
- ### [Режим только для чтения](guides/readonly-mode.md)
- ### [Валидация](guides/validation.md)
- ### [Перемещение задач внутри таймлайна](guides/dnd.md)
- ### [Создание/выбор задач с помощью DnD](guides/advanced-dnd.md)
- ### [Ручное планирование сводных задач](guides/custom-projects-dates.md)

  
## Настройка зависимостей 

Освещает основы выполнения общих операций над объектами зависимостей, таких как добавление, удаление, получение объекта зависимости и т.д.

- ### [Получение объекта/ID связи](guides/link-object-operations.md)
- ### [Добавление/Обновление/Удаление связей](guides/crud-dependency.md)
- ### [Автоматическое планирование](guides/auto-scheduling.md)


## Экспорт и импорт данных 

Обсуждаются способы экспорта и импорта данных Gantt в различных форматах, а также сериализация данных в XML и JSON.

- ### [Export Service - системные требования для автономной установки](guides/export-requirements.md)
- ### [Экспорт в PDF и PNG](guides/export.md)
- ### [Экспорт/импорт для Excel, экспорт в iCal](guides/excel.md)
- ### [Экспорт и импорт для MS Project](guides/export-msproject.md)
- ### [Экспорт и импорт для Primavera P6](guides/export-primavera.md)
- ### [Сериализация данных в XML и JSON](guides/serialization.md)
- ### [Экспорт и импорт данных на Node.js](guides/export-nodejs.md)


## Стилизация 

Описывает форматы и техники, которые можно использовать для стилизации диаграммы Gantt.

- ### [Документация по CSS](guides/css-overview.md)
- ### [Скины](guides/skins.md)
- ### [Шаблоны диаграммы Gantt](guides/templates.md)
- ### [Раскраска задач](guides/colouring-tasks.md)
- ### [Раскраска и оформление связей](guides/colouring-lines.md)
- ### [Работа со стилями Gantt](guides/styling-guide.md)
 

## Работа с датами 

Обсуждаются темы, которые могут понадобиться при работе с датами в диаграмме Gantt: преобразование дат в строку и обратно, разрешённые символы в формате даты и т.д.

- ### [Спецификация формата даты](guides/date-format.md)
- ### [Операции с датами](guides/date-operations.md)

## Общие возможности 

Выводит через общую информацию, которая может понадобиться при создании диаграммы Gantt.

- ### [Локализация](guides/localization.md)
- ### [Полноэкранный режим](guides/fullscreen-mode.md)
- ### [Функциональность отмены/повтора](guides/undo-redo.md)
- ### [Сообщения во всплывающих окнах и модальные окна](guides/message-boxes.md)
- ### [Доступность](guides/accessibility.md)
- ### [Клавиатурная навигация](guides/keyboard-navigation.md)
- ### [Соответствие политике безопасности контента](guides/content-security-policy.md)
- ### [Интеграция с JQuery](guides/jquery-integration.md)

  
## Руководство по пользовательскому интерфейсу 

Описывает элементы интерфейса диаграммы Gantt с точки зрения конечного пользователя.

- ### [Интерфейс диаграммы Gantt](guides/overview.md)


</div>