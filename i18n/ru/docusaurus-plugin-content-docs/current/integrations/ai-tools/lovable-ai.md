---
title: "Интеграция с Lovable AI"
sidebar_label: "Lovable AI"
description: "Руководство по интеграции DHTMLX React Gantt в приложение, сгенерированное Lovable AI"
---

# Интеграция с Lovable AI

Эта статья описывает, как добавить DHTMLX React Gantt в проект Lovable и получить точный сгенерированный код.

## Как Lovable обрабатывает DHTMLX Gantt

Lovable генерирует приложения на React из подсказок на естественном языке. Он хорошо справляется с обычными шаблонами UI — макеты, маршруты, стандартные компоненты — потому что модель видела достаточно примеров во время обучения. DHTMLX Gantt — это специализированный компонент с собственным API конфигурации, именами свойств и форматами данных. У модели здесь меньше примеров, поэтому она делает догадки. Иногда верно, часто нет.

Исправление — контекст. Три механизма позволяют подать Lovable точную информацию об API, каждый на своем масштабе:

| Method | Best for | Scope |
|---|---|---|
| **Inline prompts** | Одноразовые настройки, когда вы точно знаете свойство | Единичный запрос |
| **Knowledge Base** | Повторяемые правила для нескольких запросов | на уровне проекта |
| **MCP** | Полное покрытие API без копирования и вставки | Внешний сервер connection |

Эти подходы не взаимоисключающие. Knowledge Base и MCP хорошо работают вместе — используйте Knowledge Base для правил, характерных для проекта, MCP — для общей точности API.

Ниже приведены разделы полного рабочего процесса: создать каркас приложения, добавить Gantt, затем улучшать качество вывода с каждым методом.

## Избранный стартовый пример: React Gantt + проектный планировщик Supabase

Если вам нужен полный, полнофункциональный эталон вместо того, чтобы строить всё с нуля, [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter) — это много-проектный планировщик, сгенерированный от начала до конца в Lovable, с бэкендом Supabase, CRUD для задач и связей, отмена/возврат, рабочий календарь, загрузка ресурсов и демонстрационная модель ролей.

- **Демо онлайн**: [https://react-gantt-lovable-starter.lovable.app](https://react-gantt-lovable-starter.lovable.app)
- **Исходник**: [github.com/DHTMLX/react-gantt-lovable-starter](https://github.com/DHTMLX/react-gantt-lovable-starter)
- **Повторяемый рецепт**: папка [`lovable/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/lovable) содержит точную последовательность промптов (11 шагов), содержимое Knowledge Base, использованное во время сборки, и журнал каждого ручного исправления, применённого к сгенерированному выводу.

Для подробного обзора рецепта и того, как воспроизвести его в вашем рабочем пространстве, смотрите [ Lovable Starter Walkthrough ](integrations/ai-tools/lovable-starter-walkthrough.md).

Если вам нужна лишь визуализация Gantt внутри общего административного приложения, продолжайте с шагами ниже.

## Требования

- Аккаунт Lovable

Для локальной разработки (необязательно):

- Node.js 18+
- npm

Для деталей по платформе смотрите [документацию Lovable](https://docs.lovable.dev/).

## Генерация базового приложения

Начните со стандартного административного макета. Этот промпт создаёт дашборд с навигацией, KPI‑карточками и областью графика:

> Create an admin application.
> Requirements:
> - Each navigation item opens a separate route
> - The Dashboard includes KPI cards and a main content block with a Sales chart.

![Lovable-generated admin dashboard layout](/img/lovable_admin_dashboard_layout.png)

После генерации продолжайте редактировать в Lovable или клонируйте Git‑репозиторий и работайте локально. Изменения синхронизируются в обоих направлениях.

Держите первый промпт сфокусированным на структуре и навигации — настройка конфигурации компонентов идёт дальше.

## Добавление DHTMLX React Gantt

Ссылайтесь на trial-пакет в промпте:

> Replace the Sales chart with a DHTMLX React Gantt chart using @dhtmlx/trial-react-gantt.

![DHTMLX Gantt chart in Lovable dashboard](/img/lovable_gantt_dashboard.png)

Lovable генерирует приложения на React, поэтому обертка на React — естественный выбор. Руководство использует `@dhtmlx/trial-react-gantt` — сборку для оценки из [DHTMLX React Gantt](../../react/overview/). Она публично доступна в npm, что означает, что Lovable может установить её без дополнительной настройки.

Сборка trial полностью функциональна, но включает водяной знак для оценки. Для production переключитесь на `@dhx/react-gantt`, который требует аутентификации в [DHTMLX private npm registry](../../react/installation/). Либо добавьте файлы пакета в проект локально.

Lovable устанавливает пакет, создаёт импорт и рендерит базовый Gantt с примерами задач и таймлайном. Вывод часто не совпадает с API полностью — конфигурация колонок, настройка масштаба и форматы данных подбираются по догадке. Разделы ниже показывают, как закрыть этот разрыв.

## Улучшение вывода с помощью встроенных подсказок

Когда вы точно знаете вызов API, укажите имя свойства и фрагмент кода, чтобы Lovable не гадал:

> Update the DHTMLX React Gantt configuration:
> - Set row height to `40px` using `config.row_height`
> - Pass the config object into the ReactGantt component
>
> Example:
> ```jsx
> const config = {
>   row_height: 40
> };
>
> <ReactGantt config={config} />
> ```

Это хорошо работает для изолированных изменений. По мере роста конфигурации возникает затруднение — вы попадаете на одни и те же детали API в каждом промпте.

## Хранение правил в Knowledge Base

Knowledge Base хранит повторно используемые правила, которые применимы ко всем промптам в проекте. Определяйте специфику API один раз, вместо повторения:

> Theme:
> - Gantt поддерживает изменение темы через проп "theme".
> - Разрешённые значения: `"terrace"` (светлая) и `"dark"` (тёмная).
> - Когда у приложения есть глобальная тема, сопоставьте:
>   - light -> `"terrace"`
>   - dark  -> `"dark"`
> - Передайте сопоставленное значение в Gantt как `theme={ganttTheme}`.
>
> Grid row height:
> - Установите высоту строк через конфигурационный объект Gantt.
> - Используйте `config.row_height` (число, в пикселях).
> - Передайте конфигурацию в компонент ReactGantt:
>
>   ```jsx
>   const config = { row_height: 40 };
>
>   <ReactGantt config={config} />
>   ```

![Lovable Knowledge Base with Gantt configuration rules](/img/lovable_knowledge_base_gantt_rules.png)

С правилами в наличии промпты можно писать короче:

> Use the project Knowledge Base. Set the Gantt grid row height to 60.

![Gantt after applying Knowledge Base configuration in Lovable](/img/lovable_gantt_after_kb_update.png)

Knowledge Base ограничивает размер примерно до ~100k символов — достаточно для узконастроечного справочного блока конфигурации, но не для полного [DHTMLX Gantt API](https://github.com/DHTMLX/gantt-docs). Для более широкого охвата подключайте MCP.

## Подключение MCP для полного доступа к API

MCP (Model Context Protocol) соединяет Lovable с внешним сервером документации. Он предоставляет Lovable доступ к полному и актуальному API без ручного копирования.

Подключите [DHTMLX MCP Server](../mcp-server/) в настройках вашего проекта Lovable:

![Adding DHTMLX MCP server in Lovable](/img/lovable_mcp_server_setup.png)

Затем укажите его в промптах, чтобы Lovable запрашивал релевантную документацию перед генерацией кода:

> Use the DHTMLX MCP server. Set the Gantt grid row height to 60 pixels.

Lovable разрешает имена свойств, форматы данных и конфигурационные паттерны на основе реального API, а не по догадке.

## Практические советы

- **Одно изменение — один промпт.** Меньшие промпты облегчают локализацию проблем, когда вывод неверен.
- **Проверяйте импорты.** Иногда Lovable импортирует из неверного пути пакета или путает именованные и экспорт по умолчанию. Проверяйте строку импорта после каждого изменения.
- **Комбинируйте Knowledge Base и MCP.** Knowledge Base для правил проекта (отображение темы, распределение колонок), MCP — для общей точности API. Они дополняют друг друга.
- **Проверяйте объект config.** Когда Gantt не рисуется как ожидалось, залогируйте объект config, переданный в `<ReactGantt />`, и сравните его с [справкой по конфигурационным свойствам](../../react/configuration-props/). Большинство проблем связано с отсутствующим или неверно названным свойством.

## Что читать дальше

- [Обзор DHTMLX React Gantt](../../react/overview/) — API компонента и функции
- [Руководство по установке](../../react/installation/) — настройка профессионального пакета
- [DHTMLX MCP Server](../mcp-server/) — подключение MCP к другим AI-инструментам
- [Lovable Starter Walkthrough](integrations/ai-tools/lovable-starter-walkthrough.md) — воспроизведение полного примера проекта планировщика
- [Установка React Gantt](../../react/installation/) — включает процедуру замены trial на коммерческий пакет