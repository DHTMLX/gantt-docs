---
sidebar_label: DHTMLX Gantt Überblick
title: DHTMLX Gantt Überblick
slug: /
description: "Entdecken Sie DHTMLX Gantt-Funktionen, Editionen, Installationsoptionen, Framework-Integrationen, API-Dokumentation, Beispiele und KI-Werkzeuge zur Erstellung von Anwendungen zur Projektplanung."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';
 
**DHTMLX Gantt** ist das anpassungsfähigste JavaScript-Gantt-Diagramm, komplett mit TypeScript-Definitionen. Es ist für den Aufbau fortgeschrittener Planungs- und Zeitplanungsoberflächen konzipiert. Es integriert sich mit React, Angular, Vue und anderen Frontend-Frameworks. DHTMLX Gantt unterstützt auch AI-unterstützte Entwicklung durch den DHTMLX MCP Server, Agent Skills und eine strukturierte API. 

Sie können es in Projektmanagement, ERP, Bauwesen, Fertigung, Field Service, SaaS und anderen geschäftlichen Anwendungen einsetzen, die eine konfigurierbare visuelle Timeline erfordern.

## Schneller Einstieg je Framework

Sie können DHTMLX Gantt als Vanilla-JavaScript-Widget verwenden oder in ein modernes Framework integrieren. Beginnen Sie mit einer Schritt-für-Schritt-Anleitung, die zu Ihrer bevorzugten Technologie passt:

<div className="framework-grid">

  <a className="framework-card" href="guides/initializing-gantt-chart/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
  </a>

  <a className="framework-card" href="integrations/angular/quick-start/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
  </a>

  <a className="framework-card" href="integrations/vue/quick-start/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
  </a>

</div>

React, Angular und Vue unterstützen zwei Integrationsansätze:

- Offizielle [React Gantt](integrations/react/quick-start.md), [Angular Gantt](integrations/angular/quick-start.md) und [Vue Gantt](integrations/vue/quick-start.md) Wrappers (empfohlen für PRO- und Evaluierungsprojekte)
- Direkte Integration der Kern-JavaScript-Gantt-Komponente mit [React](integrations/react/js-gantt-react.md), [Angular](integrations/angular/js-gantt-angular.md), [Vue](integrations/vue/js-gantt-vue.md) (Community-Edition)

## Live-Demos

Um DHTMLX Gantt in Aktion zu sehen, erkunden Sie einige der beliebtesten Demos:

- [Grundlegendes Gantt-Diagramm mit Aufgaben und Verknüpfungen.](https://docs.dhtmlx.com/gantt/demos/enterprise-demo/)
- Beispiele für [Auto-Scheduling](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/12_auto_scheduling.html%27&filter=%27%27) und [kritischen Pfad](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/03_critical_path.html%27&filter=%27%27).
- Ressourcenmanagement: [Diagramm](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/04_resource_usage_diagram.html%27&filter=%27%27) und [Histogramm](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/09_resource_histogram.html%27&filter=%27%27).
- [Alle Beispiele durchsuchen](https://docs.dhtmlx.com/gantt/demos/) für den kompletten Funktionsumfang.

![gantt_overview](/img/gantt_sample.png)

View [Alle Beispiele](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27) to check the full range of Gantt features. 

Für Framework-orientierte Einstiegspunkte siehe die Beispiel-Repositories für [React](https://github.com/DHTMLX/react-gantt-examples), [Angular](https://github.com/DHTMLX/angular-gantt-examples), and [Vue](https://github.com/DHTMLX/vue-gantt-examples).

:::note
Einige Beispiele demonstrieren PRO-Funktionalität, prüfen Sie daher vor der erneuten Verwendung in einem Community-Edition-Projekt den [Community vs PRO-Vergleich](guides/editions-comparison.md).
:::

## Entwicklerressourcen

- [Installationsanleitung](guides/installation.md) für Community-, Test- und PRO-Einrichtungsabläufe
- [Community vs PRO-Vergleich](guides/editions-comparison.md) für Funktionsunterschiede zwischen Editionen
- Öffentliches [npm-Paket](https://www.npmjs.com/package/dhtmlx-gantt) des JavaScript-Gantt unter der Community-Edition
- [GitHub-Repository](https://github.com/DHTMLX/gantt) für den Quellcode der Community-Edition und das Issue-Tracking
- [API-Referenz](api/api-overview.md) und [Beispiele](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27) für Implementierungsdetails
- [Was gibt's Neues](whats-new.md) für Releases und Migrationshinweise

## Gantt-Funktionen im Überblick

DHTMLX Gantt umfasst eine Planungs-Engine, eine flexible Timeline und Ressourcenwerkzeuge.

### Projektplanung

Im Kern kümmert sich die Planungs-Engine um die Projektstruktur und die Arbeitszeit. Sie deckt ab:

- [Aufgabentypen und Abhängigkeiten](guides/task-types.md).
- [Arbeitszeit-Konfiguration](guides/working-time.md) mit Aufgaben- und Projektkalendern sowie ressourcen-spezifischen Kalendern (PRO-Version).
- [Automatische Planung](guides/auto-scheduling.md) zur Neuberechnung von Plänen (PRO-Version).
- [Kritischer Pfad](guides/critical-path.md) zur Hervorhebung der Aufgaben, die das Projektfinish bestimmen (PRO-Version).

### Gitter und Zeitachse

Die Komponente kombiniert ein Datenraster links mit einer zoombaren Zeitachse rechts. Beide Teile sind umfangreich konfigurierbar:

- [Flexible Layout](guides/layout-config.md) mit zusätzlichen Gittern, Spalten auf der rechten Seite und benutzerdefinierten Panels.
- [Konfigurierbare Spalten](guides/specifying-columns.md) mit Inline-Bearbeitung, Drag-and-Drop und Tastaturnavigation, plus [Mehrfachauswahl](guides/multiselection.md) (PRO-Version).
- [Anpassbare Zeitachse](guides/configuring-time-scale.md) mit Markern und hervorgehobenen Zeitfenstern.

### Erweiterte Projektkontrollen (PRO)

Für Teams, die mehr als eine einfache Timeline benötigen, bietet die PRO-Edition Werkzeuge für eine detaillierte Projektverfolgung:

- [Grundlinien](guides/inbuilt-baselines.md#baselines) und [Fristen](guides/inbuilt-baselines.md#deadlines-and-constraints) zum Vergleich geplanter Daten mit aktuellen.
- [Nicht geplante Aufgaben](guides/unscheduled-tasks.md) und [Aufgaben-Teilung](guides/split-tasks.md) für unvollständige, unterbrochene oder gestaffelte Arbeiten.

### Ressourcen- und Auslastungsmanagement (PRO)

Die PRO-Edition ergänzt eine dedizierte Ressourcenschicht, die das Gantt-Diagramm zu einer Planungsoberfläche macht, die sowohl Aufgabenplanung als auch Auslastungssichtbarkeit abdeckt. Sie enthält:

- [Ressourcen-Zuweisungen](guides/resource-management.md#assigningresources), die Ressourcen präzise Aufgaben zuweisen.
- [Ressourcen-Histogramme](guides/resource-management.md#resource-histogram) und [Ressourcenauslastungsdiagramme](guides/resource-management.md#resourceloaddiagram) zur Visualisierung der Team-Auslastung.
- [Aufgaben nach Ressource gruppieren](guides/resource-management.md#balancingresourceload), um Auslastungen zu verfolgen, Konflikte zu erkennen und das Team zu balancieren.

### Export und Ökosystem

Teams migrieren oft zwischen Plattformen, behalten lokale Backups oder führen Analysen anderswo durch. DHTMLX Gantt lässt sich mit externen Tools und Ausgabeformaten integrieren, indem es Folgendes unterstützt:

- Export nach [PDF/PNG](guides/export.md) und [Excel](guides/excel.md), einschließlich eines [Node.js-Exportmoduls](guides/export-requirements.md).
- Export/Import nach [MS Project](guides/export-msproject.md) und [Primavera](guides/export-primavera.md) über den unterstützten Export-Service.

### Interaktivität und Bearbeitung

Benutzende können Daten direkt im Diagramm bearbeiten, nicht nur ansehen. Dies wird unterstützt durch:

- Einen konfigurierbaren [Lightbox-Editor](guides/default-edit-form.md) zum Anzeigen und Bearbeiten von Aufgabendetails, mit Unterstützung für benutzerdefinierte Felder und Buttons.
- [Schnellinfo-Popups](guides/quick-info.md) und [Tooltips](guides/tooltips.md), die Aufgabendetails sichtbar machen, ohne ein vollständiges Formular zu öffnen.
- [Drag-and-Drop-Erstellung und -Auswahl von Aufgaben](guides/advanced-dnd.md), plus [Maus-Drag-Scrollen der Timeline](api/config/drag_timeline.md).
- [Tastatur-Navigation](guides/keyboard-navigation.md) und [Unterstützung für Barrierefreiheit](guides/accessibility.md).
- [Rückgängig/Wiederherstellen](guides/undo-redo.md)-Verlauf für sicheres Bearbeiten.

### Anpassung und Styling

Das Erscheinungsbild des Diagramms lässt sich auf jeder Ebene anpassen – vom gesamten Design bis hin zu einzelnen Vorgangsbalken –, und zwar durch:

- Eine Reihe integrierter [Skins](guides/skins.md) auf Basis von CSS-Variablen, die umfassende [individuelle Anpassungen](guides/custom-skins.md) sowie die Erstellung neuer Designs ermöglichen.
- [Vorlagen](guides/common-configuration.md#gantttemplatesobject), mit denen sich die Darstellung von Vorgängen, Verbindungen und Rasterzellen individuell anpassen lässt.
- Differenzierte Möglichkeiten zur [Farbgebung von Vorgängen](guides/colouring-tasks.md) und zur [Gestaltung von Verbindungen](guides/colouring-lines.md), um bestimmte Elemente optisch hervorzuheben.
- Unterstützung für die [Lokalisierung](guides/localization.md) von Benutzeroberflächensprache sowie Datums- und Zeitformaten.

## Editionen und Lizenzierung 

DHTMLX Gantt ist in zwei Editionen erhältlich: Community und PRO. Sie können mit der kostenlosen Community-Edition beginnen und später auf die PRO-Edition upgraden, wenn Sie mehr Funktionen, offiziellen Support und eine vollständig gepflegte Gantt-Grundlage benötigen. Sie können auch direkt mit der PRO-Edition beginnen, entweder über ein offizielles Trial oder mit einer kostenpflichtigen Lizenz. Wählen Sie eine der folgenden Optionen, um mit DHTMLX Gantt zu starten:

- **[Community Edition](https://dhtmlx.com/docs/products/dhtmlxGantt/open-source/).** Kostenlos und MIT-lizenziert, deckt die Kernfunktionen des interaktiven Gantt-Diagramms für DHTMLX Gantt v10+ ab.
- **[Offizielles Trial](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml).** Ermöglicht Ihnen, das volle PRO-Funktionspaket zu evaluieren und während der Testphase technischen Support zu erhalten.
- **[PRO-Edition](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing).** Für produktive Umgebungen konzipiert, umfasst er fortgeschrittene Planungsfunktionen, offiziellen Support und kommerzielle Lizenzierung.

Um die genauen Funktionsunterschiede zwischen Editionen zu sehen, prüfen Sie den [Community vs PRO-Vergleich](guides/editions-comparison.md). Für den Installationsablauf jeder Option siehe die [Installationsanleitung](guides/installation.md).

:::note
Wenn Sie von einer früheren GPL-Version migrieren, verwenden Sie den [Migrationsleitfaden](migration.md). DHTMLX Gantt v10 und später werden nicht mehr unter GPL veröffentlicht; GPL v2 gilt nur für frühere Versionen.
:::

## KI-Codierwerkzeuge

Für AI-unterstützte Entwicklung beginnen Sie mit den speziell für Codierassistenten erstellten DHTMLX Gantt-Guides:

- [Leitfaden zu KI-Werkzeugen](integrations/ai-tools.md)
- [DHTMLX MCP-Server Leitfaden](integrations/ai-tools/mcp-server.md)
- [Agentenfähigkeiten Leitfaden](integrations/ai-tools/agent-skills.md)
- [Lovable AI-Integrationsleitfaden](integrations/ai-tools/lovable-ai.md)

## Backend-Integration

Mit DHTMLX Gantt können Sie eine Verbindung zu jedem beliebigen Backend herstellen, indem Sie eine RESTful API auf dem Server implementieren:

- Daten für [Vorgänge](guides/loading.md), [Verknüpfungen](guides/loading.md), [Ressourcen](guides/resource-management.md) und [Zuweisungen](guides/resource-management.md#connecting-resources-to-tasks) werden typischerweise im JSON-Format geladen und gespeichert.
- Der integrierte [DataProcessor](guides/server-side.md) unterstützt die Weiterleitung von Erstellungs-, Aktualisierungs- und Löschvorgängen an Ihren Server.
- Es stehen Tutorials für gängige Backend-Plattformen und -Frameworks ([Node.js](integrations/node/howtostart-nodejs.md), [.NET Core](integrations/dotnet/howtostart-dotnet-core.md), [Laravel](integrations/php/howtostart-php-laravel.md) usw.) zur Verfügung, die CRUD-Operationen sowie bewährte Verfahren für die Synchronisierung des Gantt-Diagramms mit Ihrer Datenbank behandeln.


## Was kommt als Nächstes

Wenn Sie gerade erst beginnen, gehen Sie wie folgt vor:

1. Konsultieren Sie den [Leitfaden für den Einstieg](integrations/howtostart-guides.md) für Ihr bevorzugtes Frontend-Framework oder für reines JavaScript.
2. Konfigurieren Sie [Rasterspalten](guides/specifying-columns.md), [Arbeitszeitkalender](guides/working-time.md), [Zeitskalen](guides/configuring-time-scale.md) und das [Bearbeitungsverhalten](guides/default-edit-form.md).
3. Stellen Sie die Verbindung zu Ihrem Backend her und richten Sie den [DataProcessor](guides/server-side.md) sowie die Anwendungsendpunkte für Aufgaben, Verknüpfungen und Ressourcen ein.
4. Nutzen Sie die [Anleitungen](guides.md) und die [API-Referenz](api/api-overview.md) für weitergehende Anpassungen, wie z. B. Vorlagen, Ereignisse und Erweiterungen.

Wenn Sie DHTMLX Gantt bereits verwenden und auf eine neuere Version aktualisieren, informieren Sie sich im Bereich [What's New](whats-new.md) über die Release-Notes sowie eine Zusammenfassung der neuesten Funktionen und Migrationsanleitungen.