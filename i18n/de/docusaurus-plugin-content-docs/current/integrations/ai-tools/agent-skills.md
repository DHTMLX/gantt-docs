---
sidebar_label: Agenten-Fähigkeiten
title: Agenten-Fähigkeiten
description: "Installieren Sie Agenten-Fähigkeiten für KI-Assistenten, die mit DHTMLX Gantt arbeiten"
---

# Agenten-Fähigkeiten

KI-Codierassistenten wie Claude Code oder Codex können DHTMLX Gantt-Code generieren, aber sie machen oft Fehler bei spezialisierten APIs: falsche Eigenschaftsnamen, fehlende CSS-Imports, falsche Callback-Signaturen oder das Mischen inkompatibler Datenmuster. Agenten-Fähigkeiten helfen dabei, dem Assistenten die richtigen Muster und bekannte Fallstricke beizubringen, bevor er Code schreibt.

Im Gegensatz zum [MCP-Server](integrations/ai-tools/mcp-server.md), der eine Echtzeit-API-Dokumentation bereitstellt, konzentrieren sich Fähigkeiten auf Integrationsmuster, Entscheidungspunkte und Fehlervermeidung.

**GitHub:** [DHTMLX/skills](https://github.com/DHTMLX/skills)

## Verfügbare Fähigkeiten

### DHTMLX JS Gantt

Beinhaltet die Integration des Kern-JavaScript-Gantt in einfache JavaScript- und TypeScript-Anwendungen. Die Fähigkeit erkennt alle Bereitstellungswege – das kostenlose `dhtmlx-gantt`-Paket (die Community-Edition unter MIT für v10+; die Legacy GPL-Edition für v9.x und älter), das Evaluierungspaket `@dhx/trial-gantt`, das kommerzielle `@dhx/gantt`-Paket und das Laden über `<script>` / CDN – und passt Einrichtung, Daten und Theming-Anleitungen an jeden Fall an.

Überprüfen Sie die Regeln im GitHub-Repository (https://github.com/DHTMLX/skills/tree/main/dhtmlx-js-gantt).

### DHTMLX React Gantt

Beinhaltet die Integration von `@dhtmlx/trial-react-gantt` und `@dhx/react-gantt` in React-Anwendungen. Die Fähigkeit vermittelt dem Assistenten das wrapper-spezifische Setup, Muster zur Datenhoheit und Persistenz sowie den Theming-Ansatz, die leicht falsch umgesetzt werden können – und listet bekannte Fallstricke aus realen Projekten mit konkreten Abhilfen auf.

Überprüfen Sie die Regeln im GitHub-Repository (https://github.com/DHTMLX/skills/tree/main/dhtmlx-react-gantt).

Für ein durchgehendes Beispiel dieser Muster, die End-to-End angewendet werden, siehe den [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter) – einen Mehrprojekt-Planer, der in Lovable erstellt wurde, mit dem vollständigen Build-Rezept im Ordner [`lovable/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/lovable).

### DHTMLX Angular Gantt

Beinhaltet die Integration von `@dhtmlx/trial-angular-gantt` und `@dhx/angular-gantt` in Angular-Anwendungen. Die Fähigkeit vermittelt dem Assistenten das wrapper-spezifische Setup, Muster zur Datenhoheit und Persistenz (`data.save` / `data.batchSave`) sowie den Theming-Ansatz, der leicht falsch umgesetzt werden kann – und listet die bekannten Fehlermodi mit konkreten Abhilfen auf.

Überprüfen Sie die Regeln im GitHub-Repository (https://github.com/DHTMLX/skills/tree/main/dhtmlx-angular-gantt).

## Installation

```bash
npx skills add DHTMLX/skills --skill dhtmlx-js-gantt
npx skills add DHTMLX/skills --skill dhtmlx-react-gantt
npx skills add DHTMLX/skills --skill dhtmlx-angular-gantt
```

### Manuelle Installation

Klonen oder herunterladen Sie das [DHTMLX/skills](https://github.com/DHTMLX/skills)-Repository und kopieren Sie den jeweiligen Skill-Ordner (`dhtmlx-js-gantt`, `dhtmlx-react-gantt` oder `dhtmlx-angular-gantt`) in das Skills-Verzeichnis Ihres Projekts (z. B. `.claude/skills/` für Claude Code, `.cursor/skills/` für Cursor).

## Verwendung von Skills mit MCP

Skills und der MCP-Server ergänzen sich. MCP gibt Ihrem Assistenten Zugriff auf Echtzeit-API-Dokumentation – Methodensignaturen, Eigenschaftswerte, Konfigurationsoptionen. Skills vermitteln ihm die Integrationsmuster, die häufige Fehler verhindern. Für optimale Ergebnisse verwenden Sie beide. Siehe [DHTMLX MCP Server](integrations/ai-tools/mcp-server.md) für Installationsanweisungen.