---
title: "Integration mit Lovable AI"
sidebar_label: "Lovable AI"
description: "Anleitung zur Integration von DHTMLX React Gantt in eine Lovable AI-generierte Anwendung"
---

# Integration mit Lovable AI

Dieser Artikel beschreibt, wie man DHTMLX React Gantt zu einem Lovable-Projekt hinzufügt und genau generierten Code erhält.

## Wie Lovable DHTMLX Gantt handhabt

Lovable erzeugt React-Apps aus Prompts in natürlicher Sprache. Es beherrscht gängige UI-Muster gut – Layouts, Routen, Standardkomponenten – weil das Modell während des Trainings genügend Beispiele gesehen hat. DHTMLX Gantt ist eine spezialisierte Komponente mit eigener Konfigurations-API, Eigenschaftsnamen und Datenformaten. Das Modell hat hier weniger Vorlagen, daher rät es. Manchmal korrekt, oft nicht.

Die Lösung liegt im Kontext. Drei Mechanismen ermöglichen es, Lovable genaue API-Informationen zuzuführen, jeweils auf unterschiedlicher Ebene:

| Method | Best for | Scope |
|---|---|---|
| **Inline prompts** | Einzelne Anpassungen, bei denen Sie die genaue Eigenschaft kennen | Einzelner Prompt |
| **Knowledge Base** | Wiederverwendbare Regeln über mehrere Prompts hinweg | Projektweiter |
| **MCP** | Vollständige API-Abdeckung ohne Copy-Paste | Externer Server verbunden |

Diese Mechanismen schließen sich nicht aus. Knowledge Base und MCP arbeiten gut zusammen – verwenden Sie die Knowledge Base für projekt­spezifische Konventionen, MCP für allgemeine API-Genauigkeit.

Die folgenden Abschnitte erläutern den vollständigen Workflow: Eine App scaffolden, Gantt hinzufügen und dann die Ausgabequalität mit jeder Methode verbessern.

## Featured starter: React Gantt + Supabase project planner
Wenn Sie eine komplette, funktionsreiche Referenz statt beim Aufbau von Grund auf neu zu arbeiten wünschen, ist der [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter) ein Mehrprojekt-Planer, der End-to-End in Lovable generiert wird, mit einem Supabase-Backend, Aufgaben- und Link-CRUD, Rückgängig/Wiederherstellen, funktionsfähigem Kalender, Ressourcen-Auslastung und einem Demo-Rollenmodell.

- **Live-Demo**: [https://react-gantt-lovable-starter.lovable.app](https://react-gantt-lovable-starter.lovable.app)
- **Quelle**: [github.com/DHTMLX/react-gantt-lovable-starter](https://github.com/DHTMLX/react-gantt-lovable-starter)
- **Reproduzierbares Rezept**: Der Ordner [`lovable/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/lovable) enthält die genaue Prompt-Sequenz (11 Schritte), den Knowledge-Base-Inhalt, der während des Builds verwendet wurde, und ein Protokoll jeder manuellen Korrektur, die am generierten Output vorgenommen wurde.

Für eine geführte Übersicht über das Rezept und wie man es in Ihrem eigenen Arbeitsbereich reproduziert, siehe den Lovable Starter Walkthrough (integrations/ai-tools/lovable-starter-walkthrough.md).

Wenn Sie nur einen Gantt in einer generischen Admin-App rendern müssen, fahren Sie mit den untenstehenden Schritten fort.

## Voraussetzungen

- Ein Lovable-Konto

Für die lokale Entwicklung (optional):

- Node.js 18+
- npm

Für plattform­spezifische Details siehe die [Lovable-Dokumentation](https://docs.lovable.dev/).

## Generierung einer Basis-App

Beginnen Sie mit einem standardmäßigen Admin-Layout. Dieser Prompt erzeugt ein Dashboard mit Navigation, KPI-Karten und einem Chart-Bereich:

> Create an admin application.
> Requirements:
> - Each navigation item opens a separate route
> - The Dashboard includes KPI cards and a main content block with a Sales chart.

![Lovable-generiertes Admin-Dashboard-Layout](/img/lovable_admin_dashboard_layout.png)

Nach der Generierung können Sie die Bearbeitung in Lovable fortsetzen oder das Git-Repository klonen und lokal weiterarbeiten. Änderungen synchronisieren in beide Richtungen.

Halten Sie den ersten Prompt fokussiert auf Struktur und Navigation – komponenten­spezifische Konfiguration kommt danach.

## Adding DHTMLX React Gantt
Verweisen Sie auf das Trial-Paket in einem Prompt:

> Replace the Sales chart with a DHTMLX React Gantt chart using @dhtmlx/trial-react-gantt.

![DHTMLX Gantt chart in Lovable dashboard](/img/lovable_gantt_dashboard.png)

Lovable erzeugt React-Apps, daher ist der React-Wraper die natürliche Passform. Die Anleitung verwendet `@dhtmlx/trial-react-gantt` – der Evaluations-Build von [DHTMLX React Gantt](../../react/overview/). Er ist öffentlich auf npm verfügbar, was bedeutet, dass Lovable ihn ohne zusätzliche Einrichtung installieren kann.

Der Trial-Build ist voll funktionsfähig, enthält jedoch ein Evaluations-Wasserzeichen. Für die Produktion wechseln Sie zu `@dhx/react-gantt`, das eine Authentifizierung mit dem [DHTMLX privaten npm-Registry](../../react/installation/) erfordert. Alternativ fügen Sie die Paketdateien lokal in Ihr Projekt ein.

Lovable installiert das Paket, erstellt einen Import und rendert einen grundlegenden Gantt mit Beispielaufgaben und einer Timeline. Die Ausgabe stimmt oft nicht exakt mit der API überein – Spaltenkonfiguration, Skaleneinstellungen und Datenformate werden geraten. Die Abschnitte unten zeigen, wie man diese Lücke schließt.

## Improving output with inline prompts
Wenn Sie den genauen API-Aufruf kennen, geben Sie den Eigenschaftsnamen und einen Code-Schnipsel an, damit Lovable nicht rät:

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

Gute Ergebnisse für isolierte Änderungen. Bei wachsender Konfiguration zersplittert es – Sie fügen am Ende dieselben API-Details in jeden Prompt ein.

## Storing rules in the Knowledge Base
Die Knowledge Base speichert wiederverwendbare Regeln, die in allen Prompts eines Projekts gelten. Definieren Sie API-Spezifika einmal, statt sie zu wiederholen:

> Theme:
> - Gantt unterstützt das Thematisieren über die "theme" Prop.
> - Erlaubte Werte: `"terrace"` (hell) und `"dark"` (dunkel).
> - Wenn die App ein globales Theme hat, mappen Sie:
>   - light -> `"terrace"`
>   - dark  -> `"dark"`
> - Übergeben Sie den gemappten Wert dem Gantt als `theme={ganttTheme}`.
>
> Grid row height:
> - Setzen Sie die Zeilenhöhe über das Gantt-Konfigurationsobjekt.
> - Verwenden Sie `config.row_height` (Zahl, in Pixel).
> - Übergeben Sie die Konfiguration in die ReactGantt-Komponente:
>
>   ```jsx
>   const config = { row_height: 40 };
>
>   <ReactGantt config={config} />
>   ```

![Lovable Knowledge Base with Gantt configuration rules](/img/lovable_knowledge_base_gantt_rules.png)

Mit den Regeln funktionieren Prompts auch kürzer:

> Use the project Knowledge Base. Set the Gantt grid row height to 60.

![Gantt after applying Knowledge Base configuration in Lovable](/img/lovable_gantt_after_kb_update.png)

Die Knowledge Base ist auf ~100k Zeichen begrenzt – ausreichend für eine fokussierte Konfigurationsreferenz, aber nicht für das vollständige [DHTMLX Gantt API](https://github.com/DHTMLX/gantt-docs). Für eine größere Abdeckung verbinden Sie MCP.

## Connecting MCP for full API access
MCP (Model Context Protocol) verbindet Lovable mit einem externen Dokumentationsserver. Es ermöglicht Lovable den vollständigen, aktuellen API-Zugriff, ohne manuelles Copy-Pasting.

Verbinden Sie den [DHTMLX MCP Server](../mcp-server/) in Ihren Lovable-Projekteinstellungen:

![Adding DHTMLX MCP server in Lovable](/img/lovable_mcp_server_setup.png)

Dann referenzieren Sie ihn in Prompts, damit Lovable die relevanten Dokumentationen vor der Codegenerierung abruft:

> Use the DHTMLX MCP server. Set the Gantt grid row height to 60 pixels.

Lovable löst Eigenschaftsnamen, Datenformate und Konfigurationsmuster aus der tatsächlichen API-Referenz statt zu raten.

## Practical tips
- **One change per prompt.** Kleinere Prompts erleichtern die Fehlersuche, wenn das Ergebnis nicht stimmt.
- **Check imports.** Lovable importiert manchmal aus dem falschen Paketpfad oder verwechselt benannte und Standard-Exporte. Überprüfen Sie die Importzeile nach jeder Änderung.
- **Combine Knowledge Base and MCP.** Knowledge Base für projektspezifische Konventionen (Theme-Mapping, Spaltenlayout), MCP für allgemeine API-Genauigkeit. Sie ergänzen sich gegenseitig.
- **Inspect the config object.** Wenn der Gantt nicht wie erwartet gerendert wird, protokollieren Sie das an `<ReactGantt />` übergebene config-Objekt und vergleichen Sie es mit der [configuration props reference](../../react/configuration-props/). Die meisten Probleme ergeben sich aus einer fehlenden oder falsch benannten Eigenschaft.

## What to read next
- [DHTMLX React Gantt overview](../../react/overview/) - component API and features
- [Installation guide](../../react/installation/) - setting up the professional package
- [DHTMLX MCP Server](../mcp-server/) - connecting MCP to other AI tools
- [Lovable Starter Walkthrough](integrations/ai-tools/lovable-starter-walkthrough.md) - reproduce the full project planner reference app
- [Installing React Gantt](../../react/installation/) - includes the trial-to-commercial package swap procedure