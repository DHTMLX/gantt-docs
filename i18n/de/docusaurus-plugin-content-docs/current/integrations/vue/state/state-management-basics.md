---
title: Datenbindung & Zustandsverwaltung in Vue Gantt
sidebar_label: Grundlagen
description: "Wählen Sie ein Datenbesitz-Modell für Vue Gantt, richten Sie Save-Callbacks ein und vermeiden Sie Fallstricke bei der Zustandssynchronisierung."
---

# Datenbindung & Zustandsverwaltung in Vue Gantt

Diese Anleitung hilft Ihnen dabei zu entscheiden, wo Ihre Anwendung die Gantt-Daten besitzt und wie Sie Diagrammbearbeitungen synchronisieren. Wählen Sie pro Seite ein Eigentumsmodell und bleiben Sie konsistent.

Vue Gantt unterstützt zwei gängige Modelle:

1. **Vue-Zustand/Store als Quelle der Wahrheit** (Standardempfehlung für die meisten Apps)  
2. **Gantt als Quelle der Wahrheit** (leistungsorientiert für diagrammlastige Seiten)

## Mentales Modell

Der Wrapper synchronisiert Eigenschaften (props) mit einer Live-Gantt-Instanz. Wenn Benutzer Daten im Diagramm bearbeiten, entscheiden Sie, ob:

- der Wrapper-Callback den Vue-Zustand aktualisiert (Vue-eigenes Modell), oder
- der Diagramm- bzw. Backend-Teil Änderungen direkt behandelt (Gantt-eigenes Modell)

Die größte Fallgrube ist gemischte Eigentümerschaft. Wenn Vue und die Gantt-Instanz beide als Quelle der Wahrheit fungieren, ist es wahrscheinlich, dass veraltete Daten überschreiben.

## Vue State Or Store As Source Of Truth

In diesem Modell:

- Vue-Zustand (oder Pinia) besitzt `tasks` und `links`
- der Wrapper empfängt Arrays über Props
- Diagrammbearbeitungen werden über `data.save` oder `data.batchSave` erfasst
- Callback-Handler aktualisieren den Zustand
- der aktualisierte Zustand fließt wieder in den Wrapper

Type-Empfehlung für dieses Modell: Verwenden Sie `SerializedTask[]` und `SerializedLink[]` für reaktive Zustandsarrays.

### Best For

- Seiten mit einer umgebenden Vue-Oberfläche, die den Diagrammzustand widerspiegeln muss
- Apps, die bereits Pinia oder eine zentrale Zustandslage verwenden
- Teams, die einen vorhersehbaren unidirektionalen Datenfluss wünschen

### Tradeoffs

- mehr Aktualisierungen des Anwendungszustands bei schweren Operationen
- mehr Synchronisationsaufwand, wenn viele Bearbeitungen in einer Diagrammaktion auftreten

### Vermeiden Sie Folgende Muster

- Mutieren von Task-/Link-Daten über `instance`, während weiterhin veraltete Arrays aus dem Vue-Zustand übergeben werden
- Wrapper-Callbacks zu ignorieren und darauf zu hoffen, dass Diagrammbearbeitungen automatisch im Vue-Zustand bestehen bleiben

### Example: Store/Vue-Owned Flow

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  type SerializedLink,
  type SerializedTask,
  type VueGanttDataConfig
} from "@dhtmlx/trial-vue-gantt";

const tasks = ref<SerializedTask[]>([]);
const links = ref<SerializedLink[]>([]);

const data: VueGanttDataConfig = {
  save: (entity, action, item, id) => {
    if (entity === "task") {
      if (action === "create") tasks.value = [...tasks.value, item as SerializedTask];
      if (action === "update") tasks.value = tasks.value.map(t => String(t.id) === String(id) ? item as SerializedTask : t);
      if (action === "delete") tasks.value = tasks.value.filter(t => String(t.id) !== String(id));
    }

    if (entity === "link") {
      if (action === "create") links.value = [...links.value, item as SerializedLink];
      if (action === "update") links.value = links.value.map(l => String(l.id) === String(id) ? item as SerializedLink : l);
      if (action === "delete") links.value = links.value.filter(l => String(l.id) !== String(id));
    }
  }
};
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :data="data" />
</template>
~~~

Für Mehrfachänderungen wechseln Sie zu `data.batchSave` und wenden Änderungen in gruppierten Chargen an.

## Gantt Als Quelle Der Wahrheit

In diesem Modell besitzen Diagramm und Backend die meisten Datenlifecycles-Operationen. Vue führt weniger Live-Mirroring durch.

### Best For

- sehr große Datensätze
- schwere Automatisierungs- oder Massenaktualisierungsflüsse
- Diagramm-fokussierte Seiten, bei denen externe UI nicht jede Live-Änderung sofort benötigt

### Tradeoffs

- geringere Sichtbarkeit des Live-Diagrammzustands im Vue-Zustand/Store
- mehr Disziplin erforderlich, wenn Sie gelegentlich Snapshots der Props wieder in den Wrapper zurückführen

### Vermeiden Sie Folgende Muster

- partielles Vue-Mirroring ohne eine Abgleich-Strategie
- erneutes Einlesen veralteter Server-Snapshots nach Bearbeitung des Diagramms

### Beispiel: Gantt-Eigenes Transport

~~~vue
<script setup lang="ts">
import VueGantt from "@dhtmlx/trial-vue-gantt";

const data = {
  load: "/api/gantt/load",
  save: async (entity: string, action: string, payload: any, id: string | number) => {
    const response = await fetch(`/api/gantt/${entity}`, {
      method: action === "delete" ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload, id })
    });

    // Create-Handler sollten die persistente ID zurückgeben, wenn das Backend sie neu zuordnet.
    return await response.json();
  }
};
</script>

<template>
  <VueGantt :data="data" />
</template>
~~~

## Callback Contracts

In diesem Abschnitt finden Sie die Wrapper-Callback-Strukturen, die Sie in beiden Eigentumsmodellen verwenden.

### `data.save`

`save` wird an `gantt.createDataProcessor(save)` übergeben und empfängt jeweils eine Änderung.

Typische Funktionssignatur:

~~~ts
(entity: string, action: string, data: any, id: string | number) => any
~~~

Verwenden Sie dies, wenn Änderungen größtenteils singulär sind und sich einzeln gut verarbeiten lassen.

### `data.batchSave` {#databatchsave}

`batchSave` empfängt Änderungen, gruppiert in vier Buckets, je einer pro Datentyp:

~~~ts
interface BatchChanges {
  tasks?: DataCallbackChange[];
  links?: DataCallbackChange[];
  resources?: DataCallbackChange[];
  resourceAssignments?: DataCallbackChange[];
}
~~~

Iterieren Sie über die Buckets, die Sie benötigen – der Wrapper füllt sie automatisch aus Gantts Änderungsereignissen.

Verhalten der Warteschlange:

- Kurzfristiges Flush-Batching
- `create` + `update` können zu einem einzelnen `create` mit dem neuesten Payload zusammengeführt werden
- `create` + `delete` können aus dem Batch entfernt werden
- internes `!nativeeditor_status` wird aus Payloads entfernt

Verwenden Sie dies, wenn eine Benutzeraktion viele Aktualisierungen erzeugen kann (z. B. automatische Terminplanung).

## ID-Remapping Und Backend-Verantwortung

Erstellungen beginnen oft mit temporären clientseitigen IDs.

- Im `save`-Modus sollten Backend-Antworten persistente IDs zurückgeben, damit Gantt Datensätze neu zuordnen kann.
- Im `batchSave`-Modus gibt es keinen Rückgabepfad pro Item. Wenn der Server IDs zuweist, behandeln Sie das Remapping ausdrücklich in Ihrem Persistenz-Workflow.

Die Backend-Verantwortlichkeiten bleiben in beiden Modi gleich:

- Eingehende Payloads validieren
- Berechtigungen durchsetzen
- maßgebliche IDs persistieren
- Datenstrukturen zurückgeben, die der gewählte Transportmodus erwartet

## Was Als Nächstes Gelesen Werden Soll

- [Vue Gantt mit Pinia verwenden](integrations/vue/state/pinia.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)