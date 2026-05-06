---
sidebar_label: DHTMLX MCP Server
title: DHTMLX MCP Server
description: "Подключайте ИИ-помощников по кодированию к документации DHTMLX через MCP-сервер"
---

# DHTMLX MCP Server

ИИ-помощники по кодированию, такие как Claude, Cursor или ChatGPT, могут генерировать устаревший или неточный код при работе с API, характерными для конкретных библиотек. Сервер DHTMLX MCP решает эту проблему, обеспечивая прямой доступ к текущей документации и справке по API.

## Что такое MCP

Model Context Protocol (MCP) — это стандарт, который предоставляет AI-помощникам внешний контекст о конкретных инструментах и библиотеках.

Большие языковые модели обучаются на данных, актуальных до определённой даты, и не автоматически отражают недавние изменения API или новые возможности. Сервер DHTMLX MCP устраняет эту пропасть, публикуя полную и актуальную документацию через систему RAG (Retrieval-Augmented Generation).

**URL сервера:** `https://docs.dhtmlx.com/mcp`

:::note
Сервер DHTMLX MCP является общим сервисом, охватывающим все основные продукты DHTMLX, а не только Gantt. Инструкции по настройке в этом разделе применяются независимо от того, с каким компонентом DHTMLX вы работаете.
:::

Если вы используете [React Gantt](integrations/react.md), сочетайте MCP с [навыком агента React Gantt](integrations/ai-tools/agent-skills.md#available-skills).

## Поддерживаемые продукты

При подключении инструмент ИИ может получать документацию, генерировать фрагменты кода на основе текущих API и отвечать на вопросы по конфигурации для следующих продуктов:

- Gantt
- Scheduler
- Suite (грид, Form, TreeGrid и др.)
- Kanban
- Pivot
- Spreadsheet
- Diagram
- RichText

## Конфиденциальность

Сервер MCP — размещённая услуга. Он не работает локально и не имеет доступа к вашим файлам. Личная информация пользователей не хранится. Запросы могут регистрироваться для отладки и улучшения сервиса. Для коммерческих опций с строгой политикой отсутствия логирования свяжитесь по адресу `info@dhtmlx.com`.

## Настройка

Выберите ваш инструмент ИИ ниже и следуйте соответствующим инструкциям.

### Claude Code

Рекомендуется использовать через CLI:

```bash
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
```

Или вручную добавьте следующее в ваш `mcp.json`:

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
2. Перейдите в **Tools & MCP**
3. Нажмите **Add Custom MCP**
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

После подключения вы можете использовать запросы типа "Check DHTMLX docs for how to add a custom column to Gantt" прямо в чате.

### Gemini CLI

Откройте файл конфигурации по адресу `~/.gemini/settings.json` и добавьте:

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
5. Введите Имя: `dhtmlx-mcp`

### Другие инструменты

Большинство современных инструментов ИИ для кодирования поддерживает MCP через их настройки. Ищите параметры "Model Context Protocol", "Context Sources" или аналогичный пункт и добавьте `https://docs.dhtmlx.com/mcp` в качестве пользовательского источника.

### ChatGPT

Обратите внимание, интеграция MCP с ChatGPT может приводить к более медленным задержкам (примерно 20 секунд на запрос). Для более быстрого опыта рассмотрите использование одного из перечисленных выше инструментов.

Чтобы настроить ChatGPT:

1. Перейдите в **Settings** → **Apps & Connectors**
2. Нажмите **Advanced settings**
3. Включите **Developer mode**
4. Вернитесь на экран Connectors и нажмите кнопку **Create**
5. Заполните следующее:
   - Name: `dhtmlx-mcp`
   - URL: `https://docs.dhtmlx.com/mcp`
   - Authentication: `No authentication`
6. Нажмите **Create**

После настройки вы можете попросить ChatGPT консультироваться с сервером DHTMLX MCP при работе с любым компонентом DHTMLX.

## Советы для наилучших результатов

При запросах явно опирайтесь на документацию DHTMLX для более точных результатов. Например:

- "Using DHTMLX docs, how do I change the row height in Gantt?"
- "Check DHTMLX MCP for Gantt task editing configuration"

Чем точнее запрос, тем точнее будет результат.