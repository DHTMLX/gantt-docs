---
sidebar_label: DHTMLX MCP Server
title: DHTMLX MCP Server
description: "Verbinden Sie KI-Coding-Assistenten mit der DHTMLX-Dokumentation über den MCP-Server"
---

# DHTMLX MCP Server

KI-Coding-Assistenten wie Claude, Cursor oder ChatGPT können veralteten oder fehlerhaften Code erzeugen, wenn sie mit bibliotheksspezifischen APIs arbeiten. Der DHTMLX MCP-Server geht dieses Problem durch direkten Zugriff auf die aktuelle Dokumentation und API-Referenz an.

## Was ist MCP

Model Context Protocol (MCP) ist ein Standard, der KI-Assistenten externen Kontext zu bestimmten Tools und Bibliotheken bereitstellt.

Große Sprachmodelle werden auf Daten bis zu einem bestimmten Datum trainiert und spiegeln aktuelle API-Änderungen oder neue Funktionen nicht automatisch wider. Der DHTMLX MCP-Server überbrückt diese Lücke, indem er die vollständige und aktuelle Dokumentation über ein RAG-System (Retrieval-Augmented Generation) zugänglich macht.

**Server URL:** `https://docs.dhtmlx.com/mcp`

:::note
Der DHTMLX MCP-Server ist ein gemeinsamer Dienst, der alle großen DHTMLX-Produkte abdeckt, nicht nur Gantt. Die Konfigurationsanweisungen in diesem Abschnitt gelten unabhängig davon, mit welcher DHTMLX-Komponente Sie arbeiten.
:::

Koppeln Sie MCP mit der passenden Agenten-Fähigkeit: die [JS Gantt skill](integrations/ai-tools/agent-skills.md#available-skills) für Vanilla JavaScript- oder TypeScript-Projekte, die [React Gantt skill](integrations/ai-tools/agent-skills.md#available-skills) für [React Gantt](integrations/react.md)-Projekte.

Für ein Praxisbeispiel von MCP + Lovable in der Anwendung siehe den [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter) und dessen [Walkthrough](integrations/ai-tools/lovable-starter-walkthrough.md).

## Supported Products

Bei der Verbindung kann das KI-Tool Dokumentation abrufen, Code-Snippets basierend auf aktuellen APIs generieren und Konfigurationsfragen für folgende Produkte beantworten:

- Gantt
- Scheduler
- Suite (Grid, Form, TreeGrid und mehr)
- Kanban
- Pivot
- Spreadsheet
- Diagram
- RichText

## Privacy

Der MCP-Server ist ein gehosteter Dienst. Er läuft nicht lokal und greift nicht auf Ihre Dateien zu. Es werden keine personenbezogenen Daten von Nutzern gespeichert. Anfragen können zu Debugging- und Service-Verbesserungszwecken protokolliert werden. Für kommerzielle Optionen mit strengen No-Logging-Richtlinien kontaktieren Sie `info@dhtmlx.com`.

## Einrichtung

Wählen Sie unten Ihr KI-Tool aus und folgen Sie den entsprechenden Anweisungen.

### Claude Code

Der empfohlene Weg führt über die CLI:

```bash
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
```

Alternativ fügen Sie Folgendes manuell zu Ihrer `mcp.json` hinzu:

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

1. Öffnen Sie die Einstellungen (Cmd+Shift+J auf Mac, Ctrl+Shift+J auf Windows/Linux)
2. Gehen Sie zu **Tools & MCP**
3. Klicken Sie auf **Add Custom MCP**
4. Fügen Sie die folgende Konfiguration ein:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

Nach dem Verbinden können Sie Abfragen wie "Check DHTMLX docs for how to add a custom column to Gantt" direkt im Chat verwenden.

### Gemini CLI

Öffnen Sie die Konfigurationsdatei unter `~/.gemini/settings.json` und fügen Sie hinzu:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

Starten Sie Gemini CLI neu, um die Änderungen anzuwenden.

### Antigravity (Google)

1. Öffnen Sie die Befehls-Palette
2. Geben Sie "mcp add" ein
3. Wählen Sie "HTTP"
4. URL eingeben: `https://docs.dhtmlx.com/mcp`
5. Name eingeben: `dhtmlx-mcp`

### Andere Tools

Die meisten modernen KI-Coding-Tools unterstützen MCP über deren Einstellungen. Suchen Sie nach "Model Context Protocol", "Context Sources" oder einer ähnlichen Option und fügen Sie `https://docs.dhtmlx.com/mcp` als benutzerdefinierte Quelle hinzu.

### ChatGPT

Beachten Sie, dass die MCP-Integration mit ChatGPT zu langsameren Reaktionszeiten führen kann (etwa 20 Sekunden pro Abfrage). Für eine schnellere Erfahrung erwägen Sie die oben genannten Tools zu verwenden.

So konfigurieren Sie ChatGPT:

1. Öffnen Sie **Settings** → **Apps & Connectors**
2. Klicken Sie auf **Advanced settings**
3. Aktivieren Sie **Developer mode**
4. Kehren Sie zum Connectors-Bildschirm zurück und klicken Sie auf die **Create**-Schaltfläche
5. Füllen Sie Folgendes aus:
   - Name: `dhtmlx-mcp`
   - URL: `https://docs.dhtmlx.com/mcp`
   - Authentication: `No authentication`
6. Klicken Sie auf **Create**

Nach der Einrichtung können Sie ChatGPT bitten, den DHTMLX MCP-Server zu konsultieren, wenn Sie mit jeder DHTMLX-Komponente arbeiten.

## Tipps für beste Ergebnisse

Wenn Sie prompts formulieren, beziehen Sie sich ausdrücklich auf die DHTMLX-Dokumentation, um genauere Ergebnisse zu erhalten. Zum Beispiel:

- "Using DHTMLX docs, how do I change the row height in Gantt?"
- "Check DHTMLX MCP for Gantt task editing configuration"

Je spezifischer der Prompt, desto genauer wird die Ausgabe sein.