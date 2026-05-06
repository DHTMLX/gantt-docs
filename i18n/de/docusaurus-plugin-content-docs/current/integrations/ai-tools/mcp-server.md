--- 
sidebar_label: DHTMLX MCP-Server
title: DHTMLX MCP-Server
description: "Verbinde KI-Coding-Assistenten mit der DHTMLX-Dokumentation über den MCP-Server"
---

# DHTMLX MCP-Server

KI-Coding-Assistenten wie Claude, Cursor oder ChatGPT können veralteten oder ungenauen Code liefern, wenn sie mit bibliotekenspezifischen APIs arbeiten. Der DHTMLX MCP-Server schafft Abhilfe, indem er direkten Zugriff auf die aktuelle Dokumentation und API-Referenz bietet.

## Was ist MCP

Model Context Protocol (MCP) ist ein Standard, der KI-Assistenten externen Kontext zu bestimmten Werkzeugen und Bibliotheken bereitstellt.

Große Sprachmodelle werden auf Daten bis zu einem bestimmten Datum trainiert und spiegeln jüngste API-Änderungen oder neue Funktionen nicht automatisch wider. Der DHTMLX MCP-Server schließt diese Lücke, indem er die vollständige und aktuelle Dokumentation über ein RAG (Retrieval-Augmented Generation) System zugänglich macht.

**Server-URL:** `https://docs.dhtmlx.com/mcp`

:::note
Der DHTMLX MCP-Server ist ein gemeinsamer Dienst, der alle wichtigen DHTMLX-Produkte abdeckt, nicht nur Gantt. Die Konfigurationsanweisungen in diesem Abschnitt gelten unabhängig davon, mit welcher DHTMLX-Komponente Sie arbeiten.
:::

Wenn Sie [React Gantt](integrations/react.md) verwenden, kombinieren Sie MCP mit dem [React Gantt agent skill](integrations/ai-tools/agent-skills.md#available-skills).

## Unterstützte Produkte

Nach der Verbindung kann das KI-Tool Dokumentationen abrufen, Code-Snippets basierend auf aktuellen APIs generieren und Konfigurationsfragen zu folgenden Produkten beantworten:

- Gantt
- Scheduler
- Suite (Grid, Form, TreeGrid und mehr)
- Kanban
- Pivot
- Spreadsheet
- Diagram
- RichText

## Datenschutz

Der MCP-Server ist ein gehosteter Dienst. Er läuft nicht lokal und greift nicht auf Ihre Dateien zu. Es werden keine personenbezogenen Informationen über Nutzer gespeichert. Anfragen können zu Debugging- und Verbesserungszwecken protokolliert werden. Für kommerzielle Optionen mit strengen No-Logging-Richtlinien kontaktieren Sie `info@dhtmlx.com`.

## Einrichtung

Wählen Sie unten Ihr KI-Tool aus und folgen Sie den entsprechenden Anweisungen.

### Claude Code

Der empfohlene Weg erfolgt über die CLI:

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

1. Öffnen Sie die Einstellungen (Mac: Cmd+Shift+J, Windows/Linux: Ctrl+Shift+J)
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

Nach der Verbindung können Sie Abfragen wie „Check DHTMLX docs for how to add a custom column to Gantt“ direkt im Chat verwenden.

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
2. Tippen Sie „mcp add“
3. Wählen Sie „HTTP“
4. Geben Sie URL ein: `https://docs.dhtmlx.com/mcp`
5. Geben Sie Name ein: `dhtmlx-mcp`

### Andere Tools

Die meisten modernen KI-Coding-Tools unterstützen MCP über ihre Einstellungen. Suchen Sie nach „Model Context Protocol“, „Context Sources“ oder einer ähnlichen Option und fügen Sie `https://docs.dhtmlx.com/mcp` als benutzerdefinierte Quelle hinzu.

### ChatGPT

Beachten Sie, dass die MCP-Integration mit ChatGPT zu langsameren Reaktionszeiten führen kann (ca. 20 Sekunden pro Abfrage). Für eine schnellere Erfahrung verwenden Sie eines der oben genannten Tools.

Zum Konfigurieren von ChatGPT:

1. Gehen Sie zu **Settings** → **Apps & Connectors**
2. Klicken Sie auf **Advanced settings**
3. Aktivieren Sie **Developer mode**
4. Kehren Sie zum Connectors-Bildschirm zurück und klicken Sie auf den **Create**-Button
5. Füllen Sie Folgendes aus:
   - Name: `dhtmlx-mcp`
   - URL: `https://docs.dhtmlx.com/mcp`
   - Authentication: `No authentication`
6. Klicken Sie auf **Create**

Nach der Einrichtung können Sie ChatGPT bitten, den DHTMLX MCP-Server zu konsultieren, wenn Sie mit einer beliebigen DHTMLX-Komponente arbeiten.

## Tipps für beste Ergebnisse

Beim Prompting beziehen Sie sich explizit auf die DHTMLX-Dokumentation für genaueres Ergebnis. Zum Beispiel:

- „Unter Verwendung der DHTMLX-Dokumente, wie ändere ich die Zeilenhöhe in Gantt?“
- „Check DHTMLX MCP for Gantt task editing configuration“

Je spezifischer der Prompt, desto genauer wird die Ausgabe.