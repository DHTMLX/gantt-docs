---
sidebar_label: Agenten-Fähigkeiten
title: Agenten-Fähigkeiten
description: "Agenten-Fähigkeiten für KI-Assistenten installieren, die mit DHTMLX Gantt arbeiten"
---

# Agenten-Fähigkeiten

KI-Code-Assistenten wie Claude Code oder Codex können DHTMLX Gantt-Code erzeugen, aber sie machen häufig Fehler bei spezialisierten APIs: falsche Eigenschaftsnamen, fehlende CSS-Importe, inkorrekte Callback-Signaturen oder das Vermischen inkompatibler Datenmuster. Agenten-Fähigkeiten adressieren dies, indem sie dem Assistenten die richtigen Muster und bekannte Fallstricke beibringen, bevor er Code schreibt.

Im Gegensatz zum [MCP-Server](integrations/ai-tools/mcp-server.md), der eine API-Referenz in Echtzeit bereitstellt, konzentrieren sich die Skills auf Integrationsmuster, Entscheidungspunkte und Fehlerprävention.

**GitHub:** [DHTMLX/skills](https://github.com/DHTMLX/skills)

## Verfügbare Fähigkeiten

### DHTMLX React Gantt

Beinhaltet die Integration von `@dhtmlx/trial-react-gantt` und `@dhx/react-gantt` in React-Anwendungen. Die Skill-Datei hilft dem Assistenten, Gantt zu einem Projekt hinzuzufügen und es korrekt einzurichten, CRUD-Operationen zu verbinden und das Theming so zu handhaben, dass Gantt das eigene Theme der App wiederverwendet, statt aus dem Gleichgewicht zu geraten. Sie enthält außerdem bekannte Fallstricke, die aus realen Projekten entnommen wurden, und weist den Assistenten an, unbekannte APIs über den [DHTMLX MCP-Server](integrations/ai-tools/mcp-server.md) zu überprüfen, statt zu raten.

Die Skill-Dateien sind lesbares Markdown – Sie können genau nachsehen, welche Regeln Ihr Assistent befolgen wird, im [GitHub-Repository](https://github.com/DHTMLX/skills/tree/main/dhtmlx-react-gantt).

## Installation

```bash
npx skills add DHTMLX/skills --skill dhtmlx-react-gantt
```

### Manuelle Installation

Klonen oder laden Sie das [DHTMLX/skills](https://github.com/DHTMLX/skills) Repository herunter und kopieren Sie den Ordner `dhtmlx-react-gantt` in das Skills-Verzeichnis Ihres Projekts (z. B. `.claude/skills/` für Claude Code, `.cursor/skills/` für Cursor).

## Verwendung von Skills mit MCP

Skills und der MCP-Server ergänzen sich. MCP gibt Ihrem Assistenten Zugriff auf Echtzeit-API-Dokumentation – Methodensignaturen, Eigenschaftswerte, Konfigurationsoptionen. Skills vermitteln ihm die Integrationsmuster, die gängige Fehler verhindern. Für beste Ergebnisse verwenden Sie beide. Siehe [DHTMLX MCP Server](integrations/ai-tools/mcp-server.md) für Installationsanweisungen.