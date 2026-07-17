---
sidebar_label: Навыки агента
title: Навыки агента
description: "Установите навыки агента для ИИ-помощников, работающих с DHTMLX Gantt"
---

# Навыки агента

ИИ-помощники по кодированию, такие как Claude Code или Codex, могут генерировать код DHTMLX Gantt, но часто допускают ошибки в специализированных API: неверные имена свойств, отсутствуют импорты CSS, неверные сигнатуры обратных вызовов или смешение несовместимых паттернов данных. Навыки агентов решают эту проблему, обучая помощника правильным паттернам и известным подводным камням до того, как он начнёт писать код.

В отличие от [MCP сервера](integrations/ai-tools/mcp-server.md), который предоставляет справочник по API в реальном времени, навыки сосредоточены на паттернах интеграции, точках принятия решений и предотвращении сбоев.

**GitHub:** [DHTMLX/skills](https://github.com/DHTMLX/skills)

## Доступные навыки {#available-skills}

### DHTMLX JS Gantt

Освещает интеграцию ядра JavaScript Gantt в обычные приложения на JavaScript и TypeScript. Навык распознаёт все каналы поставки — бесплатный пакет `dhtmlx-gantt` (Community edition под MIT для v10+, устаревшее GPL-издание для v9.x и ранее), оценочный пакет `@dhx/trial-gantt`, коммерческий пакет `@dhx/gantt`, а также загрузку через `<script>` / CDN — и адаптирует инструкции по настройке, данным и теме оформления под каждый из них.

Ознакомьтесь с правилами в репозитории GitHub: https://github.com/DHTMLX/skills/tree/main/dhtmlx-js-gantt.

### DHTMLX React Gantt

Освещает интеграцию `@dhtmlx/trial-react-gantt` и `@dhx/react-gantt` в React-приложения. Навык обучает помощника конфигурации, специфичной для обёртки, паттернам владения данными и их сохранения, а также подходу к стилизации, который легко приводят к ошибкам — и перечисляет известные подводные камни, извлечённые из реальных проектов с конкретными исправлениями.

Ознакомьтесь с правилами в репозитории GitHub: https://github.com/DHTMLX/skills/tree/main/dhtmlx-react-gantt.

Для примера полного применения этих паттернов от начала до конца смотрите [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter) — много-проектный планировщик, сгенерированный в Lovable, с полным рецептом сборки в его папке [`lovable/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/lovable).

### DHTMLX Angular Gantt

Освещает интеграцию `@dhtmlx/trial-angular-gantt` и `@dhx/angular-gantt` в Angular-приложения. Навык обучает помощника конфигурации, специфичной для обёртки, паттернам владения данными и их сохранения (`data.save` / `data.batchSave`), а также подходу к стилизации, который легко привести к ошибкам — и перечисляет известные режимы сбоев с конкретными исправлениями.

Ознакомьтесь с правилами в репозитории GitHub: https://github.com/DHTMLX/skills/tree/main/dhtmlx-angular-gantt.

### DHTMLX Vue Gantt

Освещает интеграцию `@dhtmlx/trial-vue-gantt` и `@dhx/vue-gantt` в приложения на Vue 3 — те же паттерны обёртки, дополненные событиями, `@ready`, ref-ссылками и composables.

Ознакомьтесь с правилами в [репозитории GitHub](https://github.com/DHTMLX/skills/tree/main/dhtmlx-vue-gantt).

## Установка

```bash
npx skills add DHTMLX/skills --skill dhtmlx-js-gantt
npx skills add DHTMLX/skills --skill dhtmlx-react-gantt
npx skills add DHTMLX/skills --skill dhtmlx-angular-gantt
npx skills add DHTMLX/skills --skill dhtmlx-vue-gantt
```

### Ручная установка

Клонируйте или загрузите репозиторий [DHTMLX/skills](https://github.com/DHTMLX/skills) и скопируйте соответствующую папку навыков (`dhtmlx-js-gantt`, `dhtmlx-react-gantt`, `dhtmlx-angular-gantt` или `dhtmlx-vue-gantt`) в каталог навыков вашего проекта (например, `.claude/skills/` для Claude Code, `.cursor/skills/` для Cursor).

## Использование навыков с MCP

Навыки и MCP сервер дополняют друг друга. MCP предоставляет вашему помощнику доступ к документации API в реальном времени — сигнатуры методов, значения свойств, параметры конфигурации. Навыки обучают его паттернам интеграции, которые предотвращают распространённые ошибки. Для наилучших результатов используйте оба. См. [DHTMLX MCP Server](integrations/ai-tools/mcp-server.md) для инструкций по настройке.