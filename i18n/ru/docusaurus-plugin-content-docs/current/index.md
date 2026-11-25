---
sidebar_label: Обзор DHTMLX Gantt
title: Обзор DHTMLX Gantt
slug: /
description: "Изучите возможности DHTMLX Gantt, версии, варианты установки, интеграции с фреймворками, документацию по API, образцы и инструменты ИИ для создания приложений планирования проектов."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';
 
**DHTMLX Gantt** — наиболее настраиваемая JavaScript Gantt-диаграмма, полностью со спецификациями TypeScript. Она предназначена для создания продвинутых интерфейсов планирования и составления расписаний. Она интегрируется с React, Angular, Vue и другими фронтенд-фреймворками. DHTMLX Gantt также поддерживает разработку с поддержкой ИИ через DHTMLX MCP Server, Agent Skills и структурированный API. 

Её можно использовать в управлении проектами, ERP, строительстве, производстве, выездном обслуживании, SaaS и других бизнес-приложениях, которые требуют настраиваемой визуальной временной шкалы.

## Быстрый старт по фреймворкам

Вы можете использовать DHTMLX Gantt как обычный виджет JavaScript или интегрировать его в современный фреймворк. Начните с пошагового руководства, подходящего вашей технологии:

<div className="framework-grid">

  <a className="framework-card" href="guides/initializing-gantt-chart/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
  </a>

  <a className="framework-card" href="integrations/angular/quick-start/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
  </a>

  <a className="framework-card" href="integrations/vue/quick-start/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
  </a>

</div>

React, Angular и Vue поддерживают два подхода к интеграции:

- Официальные обёртки [React Gantt](integrations/react/quick-start.md), [Angular Gantt](integrations/angular/quick-start.md) и [Vue Gantt](integrations/vue/quick-start.md) (рекомендуются для PRO и проектов-оценок)
- Прямая интеграция базового JavaScript Gantt-компонента с [React](integrations/react/js-gantt-react.md), [Angular](integrations/angular/js-gantt-angular.md), [Vue](integrations/vue/js-gantt-vue.md) (Community edition)

## Живые демо

Чтобы увидеть DHTMLX Gantt в работе, попробуйте некоторые из самых популярных демо:

- [Базовая диаграмма Ганта с задачами и связями.](https://docs.dhtmlx.com/gantt/demos/enterprise-demo/)
- Примеры [авто-планирования](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/12_auto_scheduling.html%27&filter=%27%27) и [критического пути](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/03_critical_path.html%27&filter=%27%27).
- Управление ресурсами: [диаграмма](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/04_resource_usage_diagram.html%27&filter=%27%27) и [гистограмма](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/09_resource_histogram.html%27&filter=%27%27).
- [Просмотреть все примеры](https://docs.dhtmlx.com/gantt/demos/), чтобы оценить полный набор функций.

![gantt_overview](/img/gantt_sample.png)

Посмотрите [Все образцы](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27), чтобы ознакомиться с полным набором возможностей Gantt. 

Для ориентированных на фреймворк стартовых точек смотрите примеры репозиториев для [React](https://github.com/DHTMLX/react-gantt-examples), [Angular](https://github.com/DHTMLX/angular-gantt-examples), и [Vue](https://github.com/DHTMLX/vue-gantt-examples).
.

:::note
Некоторые образцы демонстрируют функционал PRO, поэтому перед повторным использованием в проекте Community edition ознакомьтесь с [сравнением Community и PRO](guides/editions-comparison.md).
:::

## Ресурсы для разработчиков

- [Руководство по установке](guides/installation.md) для процессов установки Community, пробной и PRO версий
- [Сравнение Community vs PRO](guides/editions-comparison.md) по различиям функционала между редакциями
- Публичный [npm-пакет](https://www.npmjs.com/package/dhtmlx-gantt) JavaScript Gantt под Community edition
- [GitHub-репозиторий](https://github.com/DHTMLX/gantt) исходного кода Community edition и отслеживания проблем
- [Справка по API](api/api-overview.md) и [образцы](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27) для деталей реализации
- [What's New](whats-new.md) о выпусках и миграционных заметках

## Основные возможности Gantt

DHTMLX Gantt включает движок планирования, гибкую временную шкалу и инструменты для работы с ресурсами.

### Планирование проекта

В основе стоит движок планирования, который обрабатывает структуру проекта и рабочее время. Он включает:

- [Типы задач и зависимости](guides/task-types.md).
- [Настройку рабочего времени](guides/working-time.md) с календарями задач и проектов, а также календарями, специфичными для ресурсов (версия PRO).
- [Auto scheduling](guides/auto-scheduling.md) для перерасчета планов (версия PRO).
- [Critical path](guides/critical-path.md) для выделения задач, влияющих на дату завершения проекта (версия PRO).

### Грид и временная шкала

Компонент сочетает в себе грид данных слева с масштабируемой по масштабу временной шкалой справа. Обе части настраиваются детально:

- [Flexible layout](guides/layout-config.md) с дополнительными гридами, колонками на правой стороне и настраиваемыми панелями.
- [Configurable columns](guides/specifying-columns.md) с встроенным редактированием, перетаскиванием и управлением клавиатурой, плюс [multi-selection](guides/multiselection.md) (PRO версия).
- [Customizable time scale](guides/configuring-time-scale.md) с маркерами и выделенными временными интервалами.

### Продвинутые средства управления проектом (PRO)

Для команд, которым нужна не просто временная шкала, версия PRO DHTMLX Gantt предоставляет инструменты для детального отслеживания проекта:

- [Baselines](guides/inbuilt-baselines.md#baselines) и [deadlines](guides/inbuilt-baselines.md#deadlines-and-constraints) для сопоставления планируемых дат с текущими.
- [Unscheduled tasks](guides/unscheduled-tasks.md) и [split tasks](guides/split-tasks.md) для незапланированной, прерванной или поэтапной работы.

### Управление ресурсами и загрузкой (PRO)

Версия PRO добавляет отдельный уровень ресурсов, превращая диаграмму Ганта в интерфейс планирования, который охватывает и планирование задач, и видимость загрузки. Включает:

- [Resource assignments](guides/resource-management.md#assigningresources), позволяющие связывать ресурсы с задачами для точного планирования.
- [Resource histograms](guides/resource-management.md#resource-histogram) и [resource load diagrams](guides/resource-management.md#resourceloaddiagram) для визуализации загрузки команды.
- [Grouping tasks by resource](guides/resource-management.md#balancingresourceload) для отслеживания рабочих нагрузок, обнаружения конфликтов и балансировки команды.

### Экспорт и экосистема

Команды часто мигрируют между платформами, сохраняют локальные копии или выполняют аналитику вне системы. DHTMLX Gantt интегрируется с внешними инструментами и форматами экспорта посредством:

- Экспорт в [PDF/PNG](guides/export.md) и [Excel](guides/excel.md), включая [Node.js export module](guides/export-requirements.md).
- Экспорт/импорт в [MS Project](guides/export-msproject.md) и [Primavera](guides/export-primavera.md) через поддерживаемый экспорт-сервис.

### Взаимодействие и редактирование

Пользователи могут редактировать данные прямо на диаграмме, а не только просматривать их. Это поддерживается через:

- Настраиваемый [редактор во всплывающем окне](guides/default-edit-form.md) для просмотра и редактирования сведений о задачах, с поддержкой пользовательских полей и кнопок.
- [Quick info](guides/quick-info.md) всплывающие подсказки и [tooltips](guides/tooltips.md), которые выводят детали задач без открытия полной формы.
- [Drag-and-drop создание и выбор задач](guides/advanced-dnd.md), плюс [мышиная прокрутка временной шкалы](api/config/drag_timeline.md).
- [Keyboard navigation](guides/keyboard-navigation.md) и [поддержка доступности](guides/accessibility.md).
- [Undo/redo history](guides/undo-redo.md) для безопасного редактирования.

### Настройка и стилизация

Внешний вид диаграммы можно настраивать на любом уровне — от полной темы до одной полосы задачи, через:

- Набор встроенных [скинов](guides/skins.md), основанных на CSS-переменных, с поддержкой [глубокой настройки](guides/custom-skins.md) и созданием новых тем.
- [Шаблоны](guides/common-configuration.md#gantttemplatesobject) для переопределения того, как отображаются задачи, связи и клетки грид.
- Гранулированная [окраска задач](guides/colouring-tasks.md) и [стилизация связей](guides/colouring-lines.md) для визуального выделения конкретных элементов.
- [Локализация](guides/localization.md) интерфейса и форматов даты/времени.

## Издания и лицензирование

DHTMLX Gantt доступен в двух редакциях: **Community** и **PRO**. Вы можете начать с бесплатной Community edition и позже перейти к PRO edition, если потребуются дополнительные функции, официальная поддержка и полностью поддерживаемая база Gantt. Также можно сразу начать с PRO edition либо через официальный пробный период, либо с платной лицензией. Выберите один из следующих вариантов для начала работы с DHTMLX Gantt:

- **[Community edition](https://dhtmlx.com/docs/products/dhtmlxGantt/open-source/).** Бесплатна и лицензируется по MIT, охватывает основные интерактивные функции Gantt для DHTMLX Gantt v10+.
- **[Official trial](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml).** Позволяет оценить полный набор функций PRO и получить техническую поддержку в течение пробного периода.
- **[PRO edition](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing).** Создана для проблемной среды, включает расширенные функции планирования, официальную поддержку и коммерческую лицензию.

Чтобы увидеть точные различия между редакциями, смотрите [Сравнение Community и PRO](guides/editions-comparison.md). Для пошаговой настройки каждого варианта смотрите [руководство по установке](guides/installation.md).

:::note
Если вы переходите с более ранней версии GPL, воспользуйтесь [руководством миграции](migration.md). DHTMLX Gantt v10 и далее больше не выпускаются под GPL; GPL v2 применяется только к более ранним версиям.
:::

## Инструменты кодирования с ИИ

Для разработки с поддержкой ИИ начните с руководств по DHTMLX Gantt, созданных специально для помощников по кодированию:

- [Руководство по инструментам ИИ](integrations/ai-tools.md)
- [Руководство DHTMLX MCP Server](integrations/ai-tools/mcp-server.md)
- [Руководство Agent Skills](integrations/ai-tools/agent-skills.md)
- [Руководство Lovable AI интеграции](integrations/ai-tools/lovable-ai.md)

## Интеграция с бэкендом

DHTMLX Gantt позволяет подключаться к любому бэкенду, реализуя RESTful API на сервере:

- Данные обычно загружаются и сохраняются в формате JSON для [задач](guides/loading.md), [связей](guides/loading.md), [ресурсов](guides/resource-management.md) и [назначений](guides/resource-management.md#connecting-resources-to-tasks).
- Встроенный [DataProcessor](guides/server-side.md) помогает маршрутизировать операции создания, обновления и удаления на ваш сервер.
- Есть руководства для популярных бэкенд-платформ и фреймворков ([Node.js](integrations/node/howtostart-nodejs.md), [.NET Core](integrations/dotnet/howtostart-dotnet-core.md), [Laravel](integrations/php/howtostart-php-laravel.md) и т. д.), которые охватывают CRUD-операции и лучшие практики синхронизации Gantt с вашей базой данных.

## Что дальше

Если вы только начинаете, действуйте следующим образом:

1. Обратитесь к [Руководству по началу](integrations/howtostart-guides.md) для вашей предпочитаемой фронтенд-технологии или обычного JavaScript.
2. Настройте [колонки грид](guides/specifying-columns.md), [календари рабочего времени](guides/working-time.md), [шкалы времени](guides/configuring-time-scale.md) и [поведение редактирования](guides/default-edit-form.md).
3. Подключитесь к вашему бэкенду, настройте [DataProcessor](guides/server-side.md) и конечные точки приложения для задач, связей и ресурсов.
4. Изучайте [руководства](guides.md) и [API-справочник](api/api-overview.md) для более глубокой настройки, такой как шаблоны, события и расширения.

Если вы уже используете DHTMLX Gantt и обновляетесь с более ранней версии, проверьте [Что нового](whats-new.md) для заметок о релизах и резюме последних функций и миграционных руководств.