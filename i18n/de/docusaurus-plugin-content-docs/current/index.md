---
sidebar_label: DHTMLX Gantt Überblick
title: DHTMLX Gantt Überblick
slug: /
description: "Überblick über die DHTMLX Gantt JavaScript-Komponente. Starten Sie mit Quick-Start-Guides, entdecken Sie detaillierte Anleitungen und API-Referenzen und probieren Sie Live-Demos aus."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';


**DHTMLX Gantt** ist eine JavaScript-Komponente zur Anzeige und Bearbeitung von Projektzeitplänen im Browser.  
Sie kombiniert ein konfigurierbares Grid, eine zoombare Zeitskala und eine Scheduling-Engine, die Arbeitszeiten, Abhängigkeiten und Einschränkungen versteht.

Sie können damit Projekt- und Ressourcenplanungsansichten für Projektmanagement-Tools, Bau- und Produktionspläne, Einsatzplanung im Außendienst und jede andere Anwendung erstellen, die eine visuelle Projektzeitleiste benötigt.

DHTMLX Gantt ist in den Editionen Standard und PRO verfügbar. Die PRO-Edition umfasst Funktionen wie Auto-Scheduling, kritischen Pfad, Ressourcenmanagement, dynamisches Laden und mehr.

---

## Schnellstart nach Framework

Sie können DHTMLX Gantt als Vanilla-JavaScript-Widget verwenden oder in moderne Frameworks integrieren. Starten Sie mit einer Schritt-für-Schritt-Anleitung für Ihren Stack:

<div className="framework-grid">

  <a className="framework-card" href="guides/initializing-gantt-chart/">
  <FrameworkIcon name="javascript" className="framework-icon" />
  <div className="framework-title">JavaScript</div>
  <div className="framework-desc">
  Minimales Setup über Script-Tags oder Bundler. Ideal für einfache Seiten oder nicht-frameworkbasierte Apps.
  </div>
  </a>

  <a className="framework-card" href="integrations/react/">
  <FrameworkIcon name="react" className="framework-icon" />
  <div className="framework-title">React</div>
  <div className="framework-desc">
  Verwenden Sie die fertige <code>ReactGantt</code>-Komponente mit Props und Events.
  </div>
  </a>

  <a className="framework-card" href="integrations/angular/howtostart-angular/">
  <FrameworkIcon name="angular" className="framework-icon" />
  <div className="framework-title">Angular</div>
  <div className="framework-desc">
  Integrieren Sie Gantt in Angular-Projekte mit einem schlanken Wrapper.
  </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
  <FrameworkIcon name="vue" className="framework-icon" />
  <div className="framework-title">Vue</div>
  <div className="framework-desc">
  Fügen Sie Vue-Apps ein Gantt-Diagramm mit einem kleinen Wrapper und reaktiven Props hinzu.
  </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
  <FrameworkIcon name="svelte" className="framework-icon" />
  <div className="framework-title">Svelte</div>
  <div className="framework-desc">
  Nutzen Sie Gantt in Svelte mit einer einfachen Komponente, die Konfiguration und Events bindet.
  </div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
  <FrameworkIcon name="react" className="framework-icon" />
  <div className="framework-title">React (Integration)</div>
  <div className="framework-desc">
  Betten Sie das Kern-Gantt-Widget in eigene Komponenten ein, um den Lebenszyklus und Datenfluss vollständig zu kontrollieren.
  </div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
  <FrameworkIcon name="salesforce" className="framework-icon" />
  <div className="framework-title">Salesforce</div>
  <div className="framework-desc">
  Binden Sie Gantt in Salesforce-Apps ein, verbinden Sie es mit Ihren Org-Daten und verwalten Sie Projektzeitpläne im CRM.
  </div>
  </a>

</div>

---

## Live-Demos

Um DHTMLX Gantt in Aktion zu sehen, besuchen Sie die Online-Demos:

- [Grundlegendes Gantt-Diagramm mit Aufgaben und Verknüpfungen.](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27)
- Beispiele für [Auto-Scheduling](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/12_auto_scheduling.html%27&filter=%27%27) und [kritischen Pfad](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/03_critical_path.html%27&filter=%27%27).
- Ressourcenmanagement: [Diagramm](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/04_resource_usage_diagram.html%27&filter=%27%27) und [Histogramm](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/09_resource_histogram.html%27&filter=%27%27).
- [Alle Beispiele durchsuchen](https://docs.dhtmlx.com/gantt/samples/) für den kompletten Funktionsumfang.

---

## Zentrale Funktionen

DHTMLX Gantt kombiniert eine Scheduling-Engine, eine flexible Zeitleiste und Ressourcenwerkzeuge. 
Die folgenden Abschnitte heben die wichtigsten Bereiche hervor und führen zu detaillierten Kapiteln.

### Projektplanung

DHTMLX Gantt enthält eine Scheduling-Engine, die Projektstruktur und Arbeitszeiten versteht:

- [Aufgabentypen](guides/task-types.md) und [Abhängigkeiten](guides/dependencies.md) - drei zentrale Aufgabentypen (Task, Summary, Meilenstein) mit Abhängigkeiten.
- [Arbeitszeitkalender](guides/working-time/) auf Projekt-, Aufgaben- und Ressourcenebene.
- [Auto-Scheduling](guides/auto-scheduling/) und [kritischer Pfad](guides/critical-path/) zur Neuberechnung von Plänen und Hervorhebung der Aufgaben, die das Projektende bestimmen.

Das Scheduling-Verhalten ist konfigurierbar, sodass Sie es an interne Regeln oder Tools wie MS Project anpassen können.

### Zeitleiste & Grid

Die Komponente kombiniert ein Grid links mit einer zoombaren Zeitskala rechts; beide Bereiche sind hochgradig anpassbar:

- Flexible [Layouts](guides/layout-config/) mit zusätzlichen Grids, Spalten rechts und benutzerdefinierten Panels.
- Konfigurierbare [Spalten](guides/specifying-columns/) mit Inline-Editing, [Mehrfachauswahl](guides/multiselection/), Drag-and-Drop und Tastaturnavigation.
- Anpassbare [Zeitskala](guides/configuring-time-scale/) mit [Markern](guides/markers/) und [hervorgehobenen Zeitbereichen](guides/highlighting-time-slots/).

### Erweiterte Projektkontrollen

Für detailliertere Projektverfolgung unterstützt Gantt:

- [Baselines](guides/inbuilt-baselines/#baselines) und [Deadlines](guides/inbuilt-baselines/#deadlines-and-constraints), um geplante und aktuelle Daten zu vergleichen.
- [Nicht terminierte Aufgaben](guides/unscheduled-tasks/) und [Split-Tasks](guides/split-tasks/) für unvollständige oder unterbrochene Arbeit.
- [Undo/Redo](guides/undo-redo) für sicheres Bearbeiten.

### Ressourcen- & Arbeitsbelastungsmanagement (PRO)

Die PRO-Edition bietet eine zusätzliche Ressourcenebene:

- [Ressourcenzuweisungen](guides/resource-management/#assigningresources) zu Aufgaben.
- [Ressourcen-Histogramm](guides/resource-management/#resource-histogram) und [Belastungsdiagramme](guides/resource-management/#resourceloaddiagram).
- [Gruppierung von Aufgaben](guides/resource-management/#balancingresourceload) nach Ressourcen zur Übersicht „Wer macht was".

Damit wird das Gantt-Diagramm zu einem Basiswerkzeug für Ressourcensteuerung in Ihrer Anwendung.

### Export & Ökosystem

DHTMLX Gantt integriert sich in externe Tools und bietet zahlreiche Import-/Exportmöglichkeiten:

- Export nach [PDF/PNG](guides/export/) und [Excel](guides/excel/) (inkl. [Node.js-Exportmodul](guides/export-requirements/)).
- Export/Import zu [MS Project](guides/export-msproject/) und [Primavera](guides/export-primavera/) (über Exportservice).

---

## Framework- und Backend-Integration

### Frontend-Integration

DHTMLX Gantt ist ein Framework-unabhängiges Vanilla-JS-Widget für moderne Browser. Es kann verwendet werden:

- Als eigenständiges JS-Widget auf jeder Seite.
- Eingebettet in [React](integrations/react), [Angular](integrations/angular/howtostart-angular), [Vue](integrations/vue/howtostart-vue) oder [Svelte](integrations/svelte/howtostart-svelte).

Für **React** gibt es zwei Optionen:

- Verwenden Sie den [offiziellen ReactGantt-Wrapper](integrations/react), der Gantt als deklarative React-Komponente mit Props und Events bereitstellt - ideal für neue React-Projekte.
- Oder folgen Sie der [Low-Level-React-Integration](integrations/react/quick-start/) für volle Kontrolle über Initialisierung, Zerstörung und Datenfluss.

Für **Angular**, **Vue** und **Svelte** erklären die jeweiligen [How-to-start](integrations/howtostart-guides)-Guides, wie man einen dünnen Wrapper erstellt, der zur Architektur Ihrer App passt.

### Backend-Integration

Auf Backend-Seite kommuniziert Gantt über eine REST-ähnliche API:

- Daten werden typischerweise als [JSON (Tasks, Links, Ressourcen, Zuordnungen)](guides/loading/) geladen und gespeichert.
- Der integrierte [DataProcessor](guides/server-side/) hilft beim Routing von Create/Update/Delete-Operationen.
- Es gibt [Tutorials](integrations/howtostart-guides/#how-to-start-with-gantt-on-server-side) für populäre Backends ([Node.js](integrations/node/howtostart-nodejs/), [.NET Core](integrations/dotnet/howtostart-dotnet-core/), [Laravel](integrations/php/howtostart-php-laravel/), etc.), die CRUD-Operationen und Best Practices für Datenabgleich abdecken.

So lässt sich Gantt problemlos in bestehende Systeme oder neue Microservices integrieren.

---

## Wie geht es weiter?

Wenn Sie gerade erst beginnen:

1. Folgen Sie einem [How-to-start](#quick-start-by-framework)-Guide für Ihr bevorzugtes Frontend-Framework oder Vanilla JS. 
2. Passen Sie [Grid-Spalten](guides/specifying-columns/), [Arbeitszeitkalender](guides/working-time/), [Skalen](guides/configuring-time-scale/) und [Editierverhalten](guides/default-edit-form/) an. 
3. [Verbinden Sie das Backend](integrations/howtostart-guides/#how-to-start-with-gantt-on-server-side) - richten Sie den [DataProcessor](guides/server-side/#customrouting) und REST-Endpunkte für Tasks, Links und Ressourcen ein. 
4. Erkunden Sie [Guides](/guides) und die [API-Referenz](api/api-overview/) für tiefere Anpassungen (Templates, Events, Erweiterungen).

Wenn Sie DHTMLX Gantt bereits nutzen und von einer früheren Version aktualisieren, finden Sie in [What's new](whats-new/) die Release Notes und einen Überblick über neue Funktionen und Migrationshinweise.
