---
title: Vue Gantt Überblick
sidebar_label: Überblick
description: "Architekturüberblick über Vue Gantt: Fähigkeiten, Datenfluss, Ereignisse, Lebenszyklus und Erweiterungspunkte zur Anpassung."
---

# Vue Gantt Überblick

Vue Gantt ist der offizielle Vue-Wrapper für DHTMLX Gantt. Er kombiniert Vue-freundliche Kompositionsmuster mit vollem Zugriff auf die zugrunde liegende Gantt-Engine.

Wenn Sie zuerst Setup-Anweisungen benötigen, beginnen Sie mit [Quick Start with Vue Gantt](integrations/vue/quick-start.md).

## Mentales Modell

Vue Gantt ist eine Wrapper-Schicht um die DHTMLX Gantt-Engine. Die Wrapper-Schicht bietet Ihnen eine Vue-Komponenten-API, aber die zugrunde liegende Engine bleibt die Quelle für Chart-Verhalten und Low-Level-Methoden.

Die Wrapper-Ebene übernimmt drei Hauptaufgaben:

- Initialisiert und zerstört die Gantt-Instanz entsprechend dem Vue-Lifecycle
- Synchronisiert ausgewählte Vue-Props in die aktuelle Gantt-Instanz
- Stellt wrapper-spezifische Erweiterungspunkte bereit (`events`, `@ready`, `customLightbox`, `inlineEditors`, Composables)

Das bedeutet, dass Sie für die meiste Integrationsarbeit deklarativ bleiben können und bei Bedarf dennoch auf `instance` zugreifen können.

## Kernfunktionen

Der Wrapper deckt sowohl einfache als auch fortgeschrittene Integrationsszenarien ab:

- Deklarierte Einrichtung mit Props (`config`, `templates`, `plugins`, `theme`, `locale`)
- Datensynchronisation für `tasks`, `links` und fortgeschrittene Stores (`resources`, `resourceAssignments`, `baselines`)
- Ereignisverkabelung über die `events`-Map
- Einmaliger Lifecycle-Hook über `@ready`
- Vue-basierte Anpassungspunkte (`customLightbox`, `inlineEditors`, `modals`)
- Typisierte Helfer und Composables für wiederverwendbare Muster

## Szenario: Grundlegende Wrapper-Einrichtung

Verwenden Sie Props zur Diagrammkonfiguration und Template-Anpassung.

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  defineGanttConfig,
  defineGanttTemplates,
  type SerializedLink,
  type SerializedTask
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

const tasks = ref<SerializedTask[]>([
  {
    id: 1,
    text: "Project",
    start_date: new Date(2026, 0, 5),
    duration: 5,
    open: true,
    parent: 0
  }
]);
const links = ref<SerializedLink[]>([]);

const config = defineGanttConfig({
  scales: [
    { unit: "month", step: 1, format: "%F, %Y" },
    { unit: "day", step: 1, format: "%d %M" }
  ]
});

const templates = defineGanttTemplates({
  task_text: (_start, _end, task) => `#${task.id}: ${task.text}`
});
</script>

<template>
  <div style="height: 520px;">
    <VueGantt :tasks="tasks" :links="links" :config="config" :templates="templates" />
  </div>
</template>
~~~

Für die vollständige Prop-Liste verwenden Sie [Configuration Reference](integrations/vue/configuration-props.md).

## Wählen Sie ein Datenbesitzmodell

Der Wrapper synchronisiert eingehende Props in die aktuelle Instanz. Die zentrale Entscheidung ist, wo Ihre Anwendung Daten als maßgeblich ansieht.

- **Vue-Zustand/Store als Quelle der Wahrheit**: Wrapper-Callbacks (`data.save` / `data.batchSave`) aktualisieren Ihren Zustand, dann fließen die aktualisierten Props zurück in den Wrapper.
- **Gantt als Quelle der Wahrheit**: Gantt und Backend besitzen den Hauptdatenlebenszyklus; Vue-Props werden weniger häufig für den Live-Chart-Zustand verwendet.

Wenn Vue die Daten besitzt, bevorzugen Sie `SerializedTask[]` und `SerializedLink[]` für reaktiven Zustand und Payload-Typisierung.

Zusammenfassung des Synchronisierungsverhaltens:

- Aufgaben-/Link-Updates basieren in der Regel auf Differenzen
- Der Wrapper kann bei größeren Änderungen auf Reset/Neu-Parsing umschalten
- Fortgeschrittene Stores (`resources`, `resourceAssignments`, `baselines`) werden über deren Datenspeicher synchronisiert

Verwenden Sie [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md) für Vor- und Nachteile sowie Callback-Verträge.

## Ereignisse behandeln und Startlogik

Verwenden Sie die `events`-Map für Gantt-Ereignisse und `@ready` für einmalige Setup-Schritte nach der Initialisierung.

~~~vue
<script setup lang="ts">
import { defineGanttEvents, type GanttStatic } from "@dhtmlx/trial-vue-gantt";

const events = defineGanttEvents({
  onTaskCreated: task => {
    console.log("task created", task);
    return true;
  },
  onBeforeLightbox: taskId => {
    console.log("before lightbox", taskId);
    return true;
  }
});

const onReady = (instance: GanttStatic) => {
  console.log("ready", instance);
};
</script>

<template>
  <VueGantt :events="events" @ready="onReady" />
</template>
~~~

Verwenden Sie `events` für Interaktionsverhalten. Verwenden Sie `@ready` für Initialisierungslogik, die eine Live-Instanz benötigt.

## Jenseits der imperativen Grenze

Verwenden Sie eine Komponenten-Referenz, wenn Sie Methoden benötigen, die sich nicht praktikabel über Props modellieren lassen.

~~~vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import VueGantt, { type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);

onMounted(() => {
  const gantt = ganttRef.value?.instance;
  if (!gantt) return;
  gantt.showDate(new Date());
});
</script>

<template>
  <VueGantt ref="ganttRef" />
</template>
~~~

Wenn Sie Task/Link-Daten über `instance` mutieren, halten Sie den externen Zustand synchron. Andernfalls kann das nächste Prop-Update diese Änderungen überschreiben.

## Fortgeschrittene Erweiterungspunkte

### Benutzerdefinierte Lightbox-Komponente

Ersetzen Sie das integrierte Aufgabenformular durch eine Vue-Komponente:

~~~vue
<VueGantt :tasks="tasks" :links="links" :customLightbox="CustomLightbox" :data="data" />
~~~

### Benutzerdefinierte Inline-Editoren

Ordnen Sie die Namen der Gantt-Inline-Editoren Vue-Komponenten zu:

~~~vue
<VueGantt :config="config" :inlineEditors="inlineEditors" :data="data" />
~~~

### Benutzerdefinierter Ablauf für Löschbestätigungen

Überschreiben Sie Löschbestätigungen mit `modals`:

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete ${task.text}?`)) callback();
  }
};
~~~

### Aufgaben- und Ressourcenfilterung

Verwenden Sie `filter` zur Task-Filterung und `resourceFilter` zur Filterung des Ressourcenpanels.

## Öffentliche Beispiel-Szenariokarte

Diese Wrapper-Funktionen werden in öffentlichen Muster-Routen behandelt. Führen Sie sie lokal aus von [`vue-gantt-examples` auf GitHub](https://github.com/DHTMLX/vue-gantt-examples) oder probieren Sie die [Live-Demo](https://dhtmlx.github.io/vue-gantt-examples/).

- `basic-init`: Baseline-Props, Config und Templates
- `templates`: Theme-/Locale-Wechsel, Vue `h()`-basierte Spaltentemplates, gridseitige Filterung, Expand/Collapse über Instanz
- `custom-form`: `customLightbox`
- `custom-edit-view`: ereignisgesteuerter externer Editorfluss
- `inline-editors`: Vue Inline-Editor-Mapping
- `auto-scheduling`: `plugins.auto_scheduling` + `critical_path` mit `useWorkTime`
- `resource-panel`: Ressourcen + `resourceFilter`
- `state-management`: Von Pinia Store getrieben Updates
- `export-data`: imperative Aktionen mit Export-Plugin

## Zugehörige Artikel

- [Konfigurationsreferenz](integrations/vue/configuration-props.md)
- [Anpassungsmuster](integrations/vue/customization-patterns.md)
- [Datenbindung und Grundlagen der Zustandsverwaltung](integrations/vue/state/state-management-basics.md)
- [Vue Gantt mit Pinia verwenden](integrations/vue/state/pinia.md)
- [DHTMLX Gantt Leitfäden](guides.md)