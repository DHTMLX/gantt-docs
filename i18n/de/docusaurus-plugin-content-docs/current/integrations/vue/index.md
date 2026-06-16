--- 
title: "Vue Gantt" 
sidebar_label: Vue Gantt 
description: "Installieren, Konfigurieren und Verwenden von DHTMLX Gantt in Vue mit dem offiziellen Wrapper." 
image: /img/frameworks/vue.png 
--- 

Vue Gantt ist der offizielle Vue-Wrapper für DHTMLX Gantt. Er zielt auf Vue 3 ab und behält vollen Zugriff auf die Gantt-API, während er Vue-freundliche Props, Events und Composable-Funktionen hinzufügt. 

## Was Sie mit dem Wrapper erhalten

- Deklarative Einrichtung über Props (`config`, `templates`, `plugins`, `theme`, `locale`) 
- Daten-Synchronisierung für Aufgaben/Verknüpfungen und erweiterte Datensätze 
- Gantt-Ereignis-Verkabelung durch die `events`-Map 
- Vue-Lebenszyklus-Einstiegspunkt durch `@ready` 
- Zugriff über eine Komponenten-Referenz auf das zugrunde liegende `instance` 
- Typisierte Hilfs-Fabriken und Composables für gängige Wrapper-Workflows 

~~~vue
<script setup lang="ts">
import VueGantt from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";
</script>

<template>
  <div style="height: 520px;">
    <VueGantt :tasks="tasks" :links="links" />
  </div>
</template>
~~~

Wenn Sie zuerst die Architektur- und Fähigkeitsübersicht wünschen, lesen Sie [Vue Gantt Overview](integrations/vue/overview.md). 

## Empfohlener Lernpfad

Verwenden Sie diese Reihenfolge, wenn Sie neu beim Wrapper sind:

1. [Installation](integrations/vue/installation.md) zur Auswahl des Paketkanals und der Importe
2. [Quick Start](integrations/vue/quick-start.md) um Ihr erstes Diagramm zu erstellen
3. [Configuration Reference](integrations/vue/configuration-props.md) zu Details von Props und Callbacks
4. [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md) um ein Datenbesitz-Modell auszuwählen
5. [Pinia Integration Tutorial](integrations/vue/state/pinia.md) für eine store-gesteuerte Implementierung
6. [Customization Patterns](integrations/vue/customization-patterns.md) für Templates, Lightbox, Inline-Editoren und Modale

## Wrapper Vs Low-Level JS-Integration

Wählen Sie den Integrationspfad basierend darauf aus, wie viel Lebenszyklus- und Synchronisierungslogik Sie selbst verwalten möchten.

- Verwenden Sie den **offiziellen Wrapper** (`@dhtmlx/trial-vue-gantt` oder `@dhx/vue-gantt`) für Vue-Props/Events, wrapperverwaltete Synchronisierung und typisierte Hilfs-APIs.
- Verwenden Sie die **Low-Level JS-Integration** nur, wenn Sie direkte Kontrolle über den Instanzlebenszyklus und manuelle API-Orchestrierung wünschen.

Für den Low-Level-Pfad verwenden Sie [dhtmlxGantt with Vue.js (Low-Level Integration)](integrations/vue/js-gantt-vue.md).

## Einstiegspunkt für Daten- und Zustandsverwaltung

Beginnen Sie mit dem State-Abschnitt, wenn Sie bereits wissen, dass Sie Store-/Backend-Synchronisierung benötigen:

- [Data & State Management](integrations/vue/state.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)

## Beispiele und Evaluationsressourcen

Durchstöbern Sie die öffentlichen Vue Gantt-Beispiele für lauffähige Demos des Wrappers:

- [Live demo](https://dhtmlx.github.io/vue-gantt-examples/) - alle wrapper-Funktionen laufen im Browser
- [GitHub repository](https://github.com/DHTMLX/vue-gantt-examples) - Quelle für jedes im Überblick referenzierte Sample

Minimale Starterprojekte (jeweils eine Wrapper-Funktion):

- [vue-gantt-quick-start](https://github.com/DHTMLX/vue-gantt-quick-start) - die kleinstmögliche Einrichtung, entspricht dem [Quick Start](integrations/vue/quick-start.md)
- [vue-gantt-pinia-starter](https://github.com/DHTMLX/vue-gantt-pinia-starter) - Pinia Store mit `batchSave` und Undo/Redo auf Store-Ebene, entspricht dem [Pinia tutorial](integrations/vue/state/pinia.md)

Wenn Sie Vue Gantt evaluieren, bietet die Evaluationsseite technischen Support während der Evaluationsphase. Siehe [Installation](integrations/vue/installation.md).