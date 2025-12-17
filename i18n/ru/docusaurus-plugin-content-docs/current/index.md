---
sidebar_label: Обзор DHTMLX Gantt
title: Обзор DHTMLX Gantt
slug: /
description: "Обзор JavaScript-компонента DHTMLX Gantt. Начните с руководств, изучите подробные гайды и API, попробуйте живые демо."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';


**DHTMLX Gantt** - это JavaScript-компонент для отображения и редактирования проектных таймлайнов в браузере.  
Он сочетает настраиваемую таблицу, масштабируемую временную шкалу и планировщик, который учитывает рабочее время, зависимости и ограничения.

С его помощью можно создавать представления для управления проектами и ресурсами, графики строительства и производства, планирование полевых работ и любые приложения, которым требуется визуальная временная линия проекта.

DHTMLX Gantt доступен в редакциях Standard и PRO. PRO-версия включает такие функции, как авто-планирование, критический путь, управление ресурсами, динамическая загрузка и многое другое.

---

## Быстрый старт по фреймворкам

Вы можете использовать DHTMLX Gantt как ванильный JavaScript-виджет или интегрировать его в современные фреймворки. Начните со пошагового руководства, подходящего для вашего стека:

<div className="framework-grid">

  <a className="framework-card" href="guides/initializing-gantt-chart/">
  <FrameworkIcon name="javascript" className="framework-icon" />
  <div className="framework-title">JavaScript</div>
  <div className="framework-desc">
  Минимальная настройка через script-теги или сборщики. Отлично подходит для простых страниц или приложений без фреймворков.
  </div>
  </a>

  <a className="framework-card" href="integrations/react/">
  <FrameworkIcon name="react" className="framework-icon" />
  <div className="framework-title">React</div>
  <div className="framework-desc">
  Используйте готовый компонент <code>ReactGantt</code> с пропсами и событиями.
  </div>
  </a>

  <a className="framework-card" href="integrations/angular/howtostart-angular/">
  <FrameworkIcon name="angular" className="framework-icon" />
  <div className="framework-title">Angular</div>
  <div className="framework-desc">
  Интегрируйте Gantt в Angular-проекты с помощью тонкого обёрточного компонента.
  </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
  <FrameworkIcon name="vue" className="framework-icon" />
  <div className="framework-title">Vue</div>
  <div className="framework-desc">
  Добавьте диаграмму Ганта в Vue-приложения с небольшим wrapper-компонентом и реактивными пропсами.
  </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
  <FrameworkIcon name="svelte" className="framework-icon" />
  <div className="framework-title">Svelte</div>
  <div className="framework-desc">
  Используйте Gantt в Svelte через простой компонент, который связывает конфигурацию и события.
  </div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
  <FrameworkIcon name="react" className="framework-icon" />
  <div className="framework-title">React (интеграция)</div>
  <div className="framework-desc">
  Встраивайте базовый виджет Gantt в собственные компоненты для полного контроля жизненного цикла и потоков данных.
  </div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
  <FrameworkIcon name="salesforce" className="framework-icon" />
  <div className="framework-title">Salesforce</div>
  <div className="framework-desc">
  Встраивайте Gantt в приложения Salesforce, подключайте данные вашей организации и управляйте проектными таймлайнами в CRM.
  </div>
  </a>

</div>

---

## Живые демо

Чтобы увидеть DHTMLX Gantt в действии, откройте онлайн-демо:

- [Базовая диаграмма Ганта с задачами и связями.](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27)
- Примеры [авто-планирования](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/12_auto_scheduling.html%27&filter=%27%27) и [критического пути](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/03_critical_path.html%27&filter=%27%27).
- Управление ресурсами: [диаграмма](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/04_resource_usage_diagram.html%27&filter=%27%27) и [гистограмма](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/09_resource_histogram.html%27&filter=%27%27).
- [Просмотреть все примеры](https://docs.dhtmlx.com/gantt/samples/), чтобы оценить полный набор функций.

---

## Основные возможности

DHTMLX Gantt сочетает в себе планировщик, гибкую временную шкалу и инструменты работы с ресурсами. 
Ниже приведены основные области с ссылками на подробные разделы.

### Планирование проекта

DHTMLX Gantt включает планировщик, понимающий структуру проекта и рабочее время:

- [Типы задач](guides/task-types.md) и [зависимости](guides/dependencies.md) - три базовых типа (задача, суммарная задача, веха) со связями.
- [Календари рабочего времени](guides/working-time/) на уровне проекта, задач и ресурсов.
- [Авто-планирование](guides/auto-scheduling/) и [критический путь](guides/critical-path/) для пересчёта планов и выделения задач, влияющих на дату окончания проекта.

Поведение авто-планирования может быть настроено под ваши процессы или такие инструменты, как MS Project.

### Таймлайн и таблица

Компонент объединяет таблицу слева и масштабируемую временную шкалу справа, обе части гибко настраиваются:

- Гибкая [настройка layout](guides/layout-config/) с дополнительными таблицами, правыми колонками и кастомными панелями.
- Настраиваемые [колонки](guides/specifying-columns/) с inline-редактированием, [множественным выбором](guides/multiselection/), drag-and-drop и навигацией с клавиатуры.
- Настраиваемая [временная шкала](guides/configuring-time-scale/) с [маркерами](guides/markers/) и [выделением временных интервалов](guides/highlighting-time-slots/).

### Продвинутое управление проектом

Для подробного контроля хода проекта Gantt поддерживает:

- [Базовые планы](guides/inbuilt-baselines/#baselines) и [дедлайны](guides/inbuilt-baselines/#deadlines-and-constraints) для сравнения плановых и фактических дат.
- [Непланируемые задачи](guides/unscheduled-tasks/) и [разделённые задачи](guides/split-tasks/) для неполной или прерываемой работы.
- [Историю действий (undo/redo)](guides/undo-redo).

### Управление ресурсами (PRO)

PRO-редакция добавляет слой управления ресурсами:

- [Назначение ресурсов](guides/resource-management/#assigningresources) на задачи.
- [Гистограммы ресурсов](guides/resource-management/#resource-histogram) и [диаграммы нагрузки](guides/resource-management/#resourceloaddiagram).
- [Группировку задач](guides/resource-management/#balancingresourceload) по ресурсам.

Это превращает диаграмму Ганта в удобный инструмент управления нагрузкой - без выхода из вашего приложения.

### Экспорт и экосистема

DHTMLX Gantt интегрируется с внешними инструментами и поддерживает множество форматов экспорта/импорта:

- Экспорт в [PDF/PNG](guides/export/) и [Excel](guides/excel/) (включая [Node.js-модуль экспорта](guides/export-requirements/)).
- Экспорт/импорт в [MS Project](guides/export-msproject/) и [Primavera](guides/export-primavera/) (через сервис экспорта).

---

## Интеграция с фреймворками и backend

### Интеграция на frontend

DHTMLX Gantt - независимый от фреймворков компонент на чистом JavaScript, работающий во всех современных браузерах. Его можно использовать:

- как самостоятельный JS-виджет на любой странице;
- как компонент в [React](integrations/react), [Angular](integrations/angular/howtostart-angular), [Vue](integrations/vue/howtostart-vue) или [Svelte](integrations/svelte/howtostart-svelte).

Для **React** доступно два варианта:

- Использовать [официальный ReactGantt-wrapper](integrations/react) - декларативный компонент с пропсами и событиями. Оптимальный выбор для новых проектов.
- Использовать [низкоуровневую интеграцию](integrations/react/quick-start/), если вы хотите полностью контролировать инициализацию, уничтожение и данные.

Для **Angular**, **Vue** и **Svelte** в разделах *How to start* показано, как создать лёгкий wrapper-компонент.

### Интеграция с backend

На стороне сервера Gantt работает через REST-подобный API:

- Данные обычно загружаются/сохраняются в формате [JSON (задачи, связи, ресурсы, назначения)](guides/loading/).
- Встроенный [DataProcessor](guides/server-side/) помогает маршрутизировать операции создания/обновления/удаления.
- Есть [руководства](integrations/howtostart-guides/#how-to-start-with-gantt-on-server-side) для популярных платформ ([Node.js](integrations/node/howtostart-nodejs/), [.NET Core](integrations/dotnet/howtostart-dotnet-core/), [Laravel](integrations/php/howtostart-php-laravel/)), охватывающие CRUD-операции и синхронизацию с БД.

Так Gantt легко подключается к существующим системам или микросервисам.

---

## Что дальше?

Если вы только начинаете:

1. Перейдите к [руководству How to start](#quick-start-by-framework) для вашего фреймворка или JavaScript. 
2. Настройте [колонки таблицы](guides/specifying-columns/), [рабочие календари](guides/working-time/), [временную шкалу](guides/configuring-time-scale/) и [поведение редактирования](guides/default-edit-form/). 
3. [Подключите backend](integrations/howtostart-guides/#how-to-start-with-gantt-on-server-side) - настройте [DataProcessor](guides/server-side/#customrouting) и REST-эндпоинты для задач, связей и ресурсов. 
4. Изучите разделы [Guides](guides/) и [API-справочник](api/api-overview/) для глубокой кастомизации (шаблоны, события, расширения).

Если вы уже используете DHTMLX Gantt и обновляетесь с предыдущей версии, откройте [Что нового](whats-new/) - там собраны Release Notes и миграционные инструкции.
