--- 
sidebar_label: DHTMLX MCP Server
title: DHTMLX MCP Server
description: "Подключайте AI-помощников по кодированию к документации DHTMLX с использованием MCP-сервера"
---

# DHTMLX MCP Server

ИИ-помощники по кодированию, такие как Claude, Cursor или ChatGPT, могут генерировать устаревший или неточный код при работе с API конкретных библиотек. MCP сервер DHTMLX устраняет эту проблему, предоставляя прямой доступ к актуальной документации и справке по API.

## Что такое MCP

Model Context Protocol (MCP) — это стандарт, который предоставляет ИИ-помощникам внешний контекст об отдельных инструментах и библиотеках.

Большие языковые модели обучаются на данных до определённой даты и не отражают автоматически недавние изменения API или новые функции. MCP сервер DHTMLX закрывает этот разрыв, предоставляя полную и актуальную документацию через систему RAG (Retrieval-Augmented Generation).

**Server URL:** `https://docs.dhtmlx.com/mcp`

:::note
DHTMLX MCP сервер — это общий сервис, охватывающий все основные продукты DHTMLX, а не только Gantt. Инструкции по настройке в этом разделе применимы независимо от того, с каким компонентом DHTMLX вы работаете.
:::

Свяжите MCP с соответствующим навыком агента: навык [JS Gantt] для проектов на чистом JavaScript или TypeScript, навык [React Gantt] для проектов [React Gantt].

Для примера использования MCP + Lovable в реальной работе смотрите [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter) и его [пошаговое руководство](integrations/ai-tools/lovable-starter-walkthrough.md).

## Поддерживаемые продукты

При подключении инструмент ИИ может получать документацию, генерировать фрагменты кода на основе текущих API и отвечать на вопросы конфигурации для следующих продуктов:

- Gantt
- Scheduler
- Suite (грид, Form, TreeGrid и другие)
- Kanban
- Pivot
- Spreadsheet
- Diagram
- RichText

## Конфиденциальность

 MCP сервер — это размещаемый сервис. Он не запускается локально и не получает доступ к вашим файлам. Личная информация пользователей не хранится. Запросы могут быть залогированы для отладки и улучшения сервиса. Для коммерческих вариантов с строгой политикой отсутствия логирования свяжитесь по адресу `info@dhtmlx.com`.

## Настройка

Выберите ваш AI-инструмент ниже и следуйте соответствующим инструкциям.

### Claude Code

Рекомендуемый способ — через CLI:

```bash
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
```

Либо вручную добавьте следующее в ваш `mcp.json`:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "type": "http",
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

### Cursor

1. Откройте настройки (Cmd+Shift+J на Mac, Ctrl+Shift+J на Windows/Linux)
2. Перейдите в **Инструменты и MCP**
3. Нажмите **Добавить пользовательский MCP**
4. Вставьте следующую конфигурацию:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

После подключения можно использовать запросы, например: "Check DHTMLX docs for how to add a custom column to Gantt" прямо в чате.

### Gemini CLI

Откройте файл конфигурации по пути `~/.gemini/settings.json` и добавьте:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

Перезапустите Gemini CLI, чтобы применить изменения.

### Antigravity (Google)

1. Откройте палитру команд
2. Введите "mcp add"
3. Выберите "HTTP"
4. Введите URL: `https://docs.dhtmlx.com/mcp`
5. Введите имя: `dhtmlx-mcp`

### Другие инструменты

Большинство современных инструментов AI для кодирования поддерживают MCP через их настройки. ищите варианты вроде "Model Context Protocol" (протокол контекста модели) или "Context Sources" (источники контекста) и добавьте `https://docs.dhtmlx.com/mcp` в качестве пользовательского источника.

### ChatGPT

Обратите внимание: интеграция MCP с ChatGPT может приводить к более медленной реакции (около 20 секунд на запрос). Для более быстрого опыта рассмотрите использование одного из перечисленных выше инструментов.

Чтобы настроить ChatGPT:

1. Перейдите в **Settings** → **Apps & Connectors**
2. Нажмите **Advanced settings**
3. Включите **Developer mode**
4. Вернитесь к экрану Connectors и нажмите кнопку **Create**
5. Заполните следующее:
   - Name: `dhtmlx-mcp`
   - URL: `https://docs.dhtmlx.com/mcp`
   - Authentication: `No authentication`
6. Нажмите **Create**

После настройки вы можете попросить ChatGPT обратиться к серверу DHTMLX MCP при работе с любым компонентом DHTMLX.

## Советы для наилучших результатов

При формулировании подсказок явно указывайте на документацию DHTMLX для повышения точности результатов. Например:

- "Using DHTMLX docs, how do I change the row height in Gantt?"
  (Используя документацию DHTMLX, как изменить высоту строки в Gantt?)
- "Check DHTMLX MCP for Gantt task editing configuration"
  (Проверьте DHTMLX MCP для конфигурации редактирования задач в Gantt)

Чем конкретнее запрос, тем точнее будет результат.