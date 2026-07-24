---
title: Vue Gantt Anpassung
sidebar_label: Anpassung
description: "Anpassungsmuster für Vue Gantt: Vorlagen, benutzerdefinierte Lightbox, Inline-Editoren, Modale Fenster, Ereignisse, Bereit-Hook und Template-Wrapping."
---

# Vue Gantt Anpassung

Diese Anleitung behandelt die wichtigsten Anpassungsebenen im Vue-Wrapper und wann man welche verwendet. Verwenden Sie sie, nachdem Sie den Wrapper rendern können und eine anwendungsspezifische UI oder Verhalten benötigen.

Verwenden Sie diese Seite zusammen mit:

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)

## Wählen Sie die richtige Anpassungsebene

Beginnen Sie mit der kostengünstigsten Option, die die Aufgabe löst:

- Verwenden Sie `config` und `templates` für visuelle Ausgabe und eingebaute Verhaltensänderungen
- Verwenden Sie `theme` und `locale` für chart-weite Optik- und Sprachumschaltungen
- Geben Sie eine Vue `VNode` aus `h()` in jeder Template-Funktion zurück - `templates.task_text`, `templates.tooltip_text`, Skalierungs-/Timeline-Zellen-Templates und Spalten-`template`/`label` - wann immer Sie ein interaktives oder zusammensetzbares Vue-Element statt eines Strings benötigen
- Verwenden Sie `events` und `@ready` für Interaktionsregeln und Start-Orchestrierung
- Verwenden Sie `modals` für eine Delete-Bestätigungssteuerung
- Verwenden Sie `customLightbox`, wenn die Bearbeitungsoberfläche anwendungsspezifisch sein muss und in ein Modal passt
- Verwenden Sie `events.onBeforeLightbox` mit Rückgabewert `false` + `vue-router`, wenn der Editor eine eigene Route oder eine Vollbild-UI benötigt
- Verwenden Sie `inlineEditors`, wenn Rasterzellen benutzerdefinierte Editier-Widgets benötigen

Behalten Sie ein einziges Daten-Ownership-Modell bei, während Sie die UI anpassen. Falls das Diagramm Daten bearbeitet, stellen Sie sicher, dass Ihre Vue-State-Strategie dazu passt.

## Template-Driven Visual Customization

Verwenden Sie `templates` für Aufgabentext, CSS-Klassen, Skalenbeschriftungen und Rasterausgabe.

~~~vue
<script setup lang="ts">
const templates = {
  task_text: (_start, _end, task) => `#${task.id}: ${task.text}`,
  task_class: (_start, _end, task) => (task.priority === "high" ? "task--high" : "")
};
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :templates="templates" />
</template>
~~~

Verwenden Sie dies, wenn Ihre Änderungen sauber auf die nativen Gantt-Template-APIs abbilden.

## Themen, Lokalisierungen, und Vue-Komponenten innerhalb von Templates

Verwenden Sie die Props `theme` und `locale` für chart-weite Skin- und Sprachwechsel. Verwenden Sie `h()`, um Vue `VNode`s aus jeder Template-Funktion zurückzugeben – sowohl die timeline-seitige `templates`-Eigenschaft (`task_text`, `tooltip_text`, `timeline_cell_content`, ...) als auch Spalten-`template`/`label`. Der Wrapper montiert das Ergebnis an der richtigen Stelle – der Timeline-Leiste, der Skalen-Zelle, der Raster-Zelle oder dem Tooltip.

- `theme` akzeptiert die eingebauten Skin-Namen (zum Beispiel `"terrace"`, `"dark"`)
- `locale` akzeptiert einen Locale-Code (`"en"`, `"es"`, `"de"`, `"cn"`, ...) oder ein vollständiges Locale-Objekt
- Jede Template-Funktion kann entweder eine einfache Zeichenkette/HTML (die native Gantt-Template-Form) oder `h(Component, props)` für eine Vue-Komponente zurückgeben
- Verknüpfen Sie Interaktionen (`onToggle`, `onClick`, ...) über Vue-Event-Props am gerenderten Component, genauso wie Sie es in einer Template tun würden

~~~vue
<script setup lang="ts">
import { computed, h, ref } from "vue";
import {
  VueGantt,
  type GanttConfigOptions,
  type Task,
  type VueGanttRef
} from "@dhtmlx/trial-vue-gantt";
import DoneToggleButton from "./components/DoneToggleButton.vue";
import FilterDropdown from "./components/FilterDropdown.vue";
import TaskTextBadge from "./components/TaskTextBadge.vue";

const ganttRef = ref<VueGanttRef | null>(null);
const theme = ref<"terrace" | "dark">("terrace");
const locale = ref<"en" | "es" | "de" | "cn">("en");
const filterMode = ref<"all" | "done" | "notDone">("all");

const toggleTheme = () => (theme.value = theme.value === "terrace" ? "dark" : "terrace");

// Vue-Komponente innerhalb eines Timeline-Templates (task_text):
const templates = {
  task_text: (_start: Date, _end: Date, task: Task) =>
    h(TaskTextBadge, { task, onToggle: () => toggleCompleted(task.id) })
} as any;

// Vue-Komponenten innerhalb von Spalten-Templates/Labels:
const config = computed<Partial<GanttConfigOptions>>(() => ({
  columns: [
    { name: "text", tree: true, width: 220 },
    {
      name: "status",
      width: 180,
      label: h(FilterDropdown, {
        modelValue: filterMode.value,
        "onUpdate:modelValue": (next: typeof filterMode.value) => (filterMode.value = next)
      }),
      template: (task: Task) =>
        h(DoneToggleButton, { task, onToggle: () => toggleCompleted(task.id) })
    }
  ]
}));
</script>

<template>
  <button @click="toggleTheme">Theme wechseln</button>
  <VueGantt
    ref="ganttRef"
    :tasks="tasks"
    :links="links"
    :theme="theme"
    :locale="locale"
    :config="config"
    :templates="templates"
  />
</template>
~~~

:::note
Der native `GanttTemplates`-Typ deklariert Timeline-Template-Rückgaben als `string | number | void`. Der Wrapper akzeptiert zur Laufzeit eine Vue `VNode`, aber aktuell ist eine `as any`-Umwandlung (oder eine Funktions-spezifische Umwandlung) erforderlich, um TypeScript zufrieden zu stellen. Templates, die einfache Strings zurückgeben, können weiterhin `defineGanttTemplates(...)` für vollständige Typinferenz verwenden.
:::

Für Bulk-Operationen am Live-Dantt (Alle aus- oder einklappen, ein Flag bei jeder Aufgabe umschalten), greifen Sie auf die Instanz zu und rufen Sie anschließend `render()` auf:

~~~ts
const collapseAll = () => {
  const gantt = ganttRef.value?.instance;
  if (!gantt) return;
  gantt.eachTask((task: Task & { $open?: boolean }) => {
    task.$open = false;
  });
  gantt.render();
};
~~~

Kombinieren Sie dies mit der `filter`-Eigenschaft für grid-seitige Filterung, gesteuert durch den Toolbar-Status.

## Ersetzen Sie die Aufgaben-Formular (`customLightbox`) {#replace-the-task-form-customlightbox}

Verwenden Sie `customLightbox`, wenn die integrierte Lightbox nicht ausreicht und Sie eine Vue-Komponente zum Task-Editing benötigen.

~~~vue
<script setup lang="ts">
import CustomLightbox from "./CustomLightbox.vue";

const data = {
  batchSave: changes => {
    console.log(changes);
  }
};
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :customLightbox="CustomLightbox" :data="data" />
</template>
~~~

Ihre benutzerdefinierte Komponente erhält:

- `data`
- `onSave(updatedTask)`
- `onCancel()`
- `onDelete()`
- `ganttInstance`

~~~vue title='CustomLightbox.vue'
<script setup lang="ts">
import { ref, watch } from "vue";

interface CustomLightboxProps {
  data?: any;
  onSave?: (updatedTask: any) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const props = defineProps<CustomLightboxProps>();

const text = ref("");

watch(
  () => props.data,
  nextValue => {
    text.value = String(nextValue?.text ?? "");
  },
  { immediate: true }
);

const save = () => {
  props.onSave?.({ ...props.data, text: text.value });
};
</script>

<template>
  <div class="lightbox-backdrop" data-cy="custom-lightbox">
    <div class="lightbox-panel" role="dialog" aria-modal="true">
      <h3>Aufgabe bearbeiten</h3>
      <label class="field">
        <span>Aufgabentext</span>
        <input data-cy="custom-lightbox-text" type="text" v-model="text" />
      </label>
      <div class="actions">
        <button data-cy="custom-lightbox-save" type="button" @click="save">Speichern</button>
        <button data-cy="custom-lightbox-cancel" type="button" @click="props.onCancel?.()">Abbrechen</button>
        <button data-cy="custom-lightbox-delete" type="button" @click="props.onDelete?.()">Löschen</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 27, 38, 0.45);
  z-index: 1000;
}

.lightbox-panel {
  width: min(420px, calc(100vw - 24px));
  background: #fff;
  border: 1px solid #cfd8e2;
  border-radius: 8px;
  padding: 14px;
}

h3 {
  margin: 0 0 12px;
}

.field {
  display: block;
}

.field span {
  display: inline-block;
  font-size: 12px;
  margin-bottom: 4px;
  color: #455a6f;
}

.field input {
  width: 100%;
  border: 1px solid #cfd8e2;
  padding: 8px;
  font-size: 14px;
}

.actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.actions button {
  border: 1px solid #cfd8e2;
  background: #fff;
  padding: 6px 10px;
  cursor: pointer;
}

.actions button:hover {
  border-color: #91abd0;
}
</style>

~~~


## Ersetzen Sie die Lightbox durch eine Route

Verwenden Sie dieses Muster, wenn der Editor eine eigene Seite, eine tief verlinkbare URL oder ein Layout benötigt, das in einem Modal nicht passt. Anstatt `customLightbox` zu liefern, fangen Sie Lightbox-Ereignisse ab und leiten zu einer separaten Vue Router-Ansicht weiter.

Zwei Ereignisse erledigen die Arbeit:

- `onBeforeLightbox(taskId)` - feuert, bevor der integrierte Editor geöffnet wird. Geben Sie `false` zurück, um ihn zu unterdrücken und zu Ihrer Editor-Route zu navigieren.
- `onTaskCreated(task)` - feuert, wenn der Benutzer eine neue Zeile hinzufügt. Legen Sie den neuen Task im Store ab (damit die Editor-Route ihn lesen kann), navigieren Sie und geben Sie `false` zurück.

~~~vue title="GanttView.vue"
<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from "vue-router";
import { defineGanttEvents, VueGantt, type Task } from "@dhtmlx/trial-vue-gantt";

const router = useRouter();
const context = inject(CUSTOM_EDIT_VIEW_CONTEXT_KEY)!; // tasks, links, upsertTask, applyBatch, ...

const events = defineGanttEvents({
  onBeforeLightbox: (taskId: string | number) => {
    router.push(`/editor/${taskId}`);
    return false;
  },
  onTaskCreated: (task: Task) => {
    context.upsertTask({ ...(task as any), $new: true });
    router.push(`/editor/${task.id}`);
    return false;
  }
});

const data = {
  batchSave: (changes) => context.applyBatch(changes)
};
</script>

<template>
  <VueGantt :tasks="context.tasks.value" :links="context.links.value" :events="events" :data="data" />
</template>
~~~

Der Editorpfad liest und verändert denselben Store, mit dem das Diagramm verbunden ist (typischerweise geteilt über `provide`/`inject` oder Pinia), sodass das Diagramm nach `save`/`delete` automatisch neu gerendert wird.

Verwenden Sie dies anstelle von `customLightbox`, wenn:

- Der Editor mehr Platz benötigt, als ein Modal bietet (Multi-Panel-Layout, eingebettete Medien)
- Sie Tiefverlinkungen und Browser-Back/Forward zum Navigieren zwischen Bearbeitungen wünschen
- Der Editor auch nach der Navigation gemountet bleiben soll (z. B. Flows mit ungespeicherten Änderungen)

Für eine Modal-ähnliche Ersetzung bevorzugen Sie [`customLightbox`](#replace-the-task-form-customlightbox).

## Custom Grid Inline Editors

Verwenden Sie `inlineEditors`, wenn Benutzer benutzerdefinierte Bearbeitungs-Widgets für Rasterzellen benötigen.

~~~vue
<script setup lang="ts">
import TextEditor from "./editors/TextEditor.vue";

const config = {
  columns: [
    {
      name: "text",
      tree: true,
      width: 220,
      editor: { type: "TextEditor", map_to: "text" }
    }
  ]
};

const inlineEditors = {
  TextEditor
};
</script>

<template>
  <VueGantt
    :tasks="tasks"
    :links="links"
    :config="config"
    :inlineEditors="inlineEditors"
    :data="data" />
</template>
~~~

~~~vue title='TextEditor.vue'
<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";

interface TextEditorProps {
  initialValue: any;
  save: () => void;
  cancel: () => void;
}

const props = defineProps<TextEditorProps>();

const inputRef = ref<any>(null);
const value = ref("");

const normalize = (nextValue: any) => String(nextValue ?? "");

watch(
  () => props.initialValue,
  nextValue => {
    value.value = normalize(nextValue);
  },
  { immediate: true }
);

const getInputElement = () => {
  const candidate = inputRef.value?.$el ?? inputRef.value;
  if (!candidate || typeof candidate.querySelector !== "function") {
    return null;
  }
  return candidate.querySelector("input") as HTMLInputElement | null;
};

const focus = () => {
  inputRef.value?.focus?.();
  getInputElement()?.focus();
};

const setValue = (nextValue: any) => {
  value.value = normalize(nextValue);
};

const getValue = () => value.value;
const isChanged = (rawValue: any) => normalize(rawValue) !== value.value;
const isValid = () => value.value.trim().length > 0;
const save = () => props.save();

onMounted(async () => {
  await nextTick();
  focus();
});

defineExpose({
  focus,
  setValue,
  getValue,
  isChanged,
  isValid,
  save
});
</script>

<template>
  <v-sheet class="editor-shell" border elevation="2" rounded="lg">
    <v-text-field
      ref="inputRef"
      v-model="value"
      class="editor-field editor-field-text"
      density="compact"
      hide-details
      type="text"
      variant="outlined"
    />
  </v-sheet>
</template>

<style scoped>
.editor-shell {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
}

.editor-field {
  flex: 0 0 auto;
}

.editor-field-text {
  width: 100%;
  min-width: 100%;
}

</style>
~~~

Verwenden Sie dies, wenn die Rasterbearbeitung zentral für den Arbeitsablauf ist und integrierte Editoren nicht ausreichen.

## Benutzerdefinierte Bestätigungsmodale beim Löschen

Verwenden Sie `modals`, um eingebaute Lösch-Bestätigungen für Aufgaben/Links zu ersetzen.

Der Handler erhält `{ task, callback, message, title, ganttInstance }` für das Löschen von Aufgaben (und `{ link, ... }` für das Löschen von Links). Die Löschung wird erst fortgesetzt, wenn Sie `callback()` aufrufen – überspringen Sie den Aufruf und die Löschung wird abgebrochen.

### Schneller Weg: `window.confirm`

Ausreichend für Prototypen und interne Tools:

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete task ${task.text}?`)) callback();
  },
  onBeforeLinkDelete: ({ link, callback }) => {
    if (window.confirm(`Delete link ${link.id}?`)) callback();
  }
};
~~~

### Produktionsweg: Benutzerdefinierte Vue-Dialog-Komponente

In echten Apps benötigen Sie in der Regel einen gebrandeten Modal, der zum restlichen UI passt. Der Handler kann eine Vue-Komponente nicht synchron anzeigen – der Benutzer muss zuerst klicken – daher erfassen Sie das `callback` im Komponentenzustand, öffnen den Dialog und rufen den Callback (oder nicht) auf, wenn der Benutzer eine Entscheidung trifft.

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import { VueGantt, type OnBeforeTaskDeleteConfirmArgs } from "@dhtmlx/trial-vue-gantt";
import TaskDeleteDialog from "./TaskDeleteDialog.vue";

const showTaskDeleteDialog = ref(false);
const pendingTaskDelete = ref<{ message: string; callback: () => void } | null>(null);

const handleDeleteTaskConfirm = ({ task, callback }: OnBeforeTaskDeleteConfirmArgs) => {
  pendingTaskDelete.value = {
    message: `Delete "${task.text}"?`,
    callback
  };
  showTaskDeleteDialog.value = true;
};

const onDialogConfirm = () => {
  pendingTaskDelete.value?.callback();
  pendingTaskDelete.value = null;
};

const onDialogCancel = () => {
  pendingTaskDelete.value = null;
};

const modals = {
  onBeforeTaskDelete: handleDeleteTaskConfirm
};
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :modals="modals" />

  <TaskDeleteDialog
    v-model="showTaskDeleteDialog"
    :text="pendingTaskDelete?.message ?? ''"
    @confirm="onDialogConfirm"
    @cancel="onDialogCancel"
  />
</template>
~~~

`TaskDeleteDialog.vue` ist eine beliebige Vue-Dialog-Komponente Ihrer Wahl – ein Vuetify-`v-dialog`, ein Element Plus `el-dialog`, ein selbstgebautes `<Teleport>`-Overlay usw. Der Vertrag besteht lediglich aus `modelValue` (oder einer beliebigen offenen/geschlossenen Eigenschaft), einer `confirm`-Aktion und einer `cancel`-Aktion.

Siehe die ausführbare Vue-Version in der Route `templates` von [`vue-gantt-examples`](https://github.com/DHTMLX/vue-gantt-examples).

Die Typen `OnBeforeTaskDeleteConfirmArgs` und `OnBeforeLinkDeleteConfirmArgs` sind in der [Configuration Reference](integrations/vue/configuration-props.md#type-exports) aufgelistet.

## Verhalten orchestrieren mit `events` + `@ready`

Verwenden Sie `events` für Logik der Interaktion und `@ready` für einmalige Setup-Schritte, die eine `instance` benötigen.

~~~vue
<script setup lang="ts">
import { defineGanttEvents, type GanttStatic } from "@dhtmlx/trial-vue-gantt";

const events = defineGanttEvents({
  onBeforeLightbox: taskId => {
    console.log("Open custom editor route", taskId);
    return false;
  }
});

const onReady = (instance: GanttStatic) => {
  instance.showDate(new Date());
};
</script>

<template>
  <VueGantt :events="events" @ready="onReady" />
</template>
~~~

## Continue With

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)