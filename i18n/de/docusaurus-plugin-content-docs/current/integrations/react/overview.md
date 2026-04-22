--- 
title: React Gantt Überblick
sidebar_label: Überblick
description: "Übersicht der offiziellen React-Hülle: Funktionen, Props, Thematisierung, Ereignisse und Zugriff auf die zugrunde liegende Gantt-API" 
--- 

# React Gantt Überblick

:::note
React Gantt ist unter [Commercial, Enterprise und Ultimate-Lizenzen](https://dhtmlx.com/docs/products/licenses.shtml) erhältlich.
Falls Sie die Individual- oder GPL-Ausgaben von Gantt verwenden, verweisen Sie bitte auf den [How to Start](integrations/react/js-gantt-react.md)-Artikel für React.
::: 

## Übersicht

DHTMLX Gantt ist eine reine JavaScript-Komponente, die in jeder Browserumgebung funktionieren kann. Die kommerzielle und höherwertige Editionen von Gantt beinhalten eine **React Gantt**-Komponente, die DHTMLX Gantt kapselt und Ihnen erlaubt, sie nativ mit React zu verwenden.

Der Wrapper ermöglicht es, ein voll funktionsfähiges Gantt-Diagramm in Ihren React-Anwendungen zu erstellen, basierend auf dem vertrauten Props/State-Modell. Hinter den Kulissen verwaltet er eine Standard-DHTMLX-Gantt-Instanz und übersetzt Ihre React-Props (wie Tasks und Config) in die entsprechenden Gantt-Initialisierungs- und Datenstrukturen.

**Kernfunktionen**

- Deklarative Datenverwaltung: Übergeben Sie ein Array von Tasks, Verbindungen, Ressourcen usw. als Props.
- Konfigurierbar: Ordnen Sie React-Props dem zugrunde liegenden *gantt.config*, *gantt.templates*, *gantt.plugins* usw. zu.
- Zugriff auf die vollständige Gantt-API: Verwenden Sie eine Ref, um Methoden wie [getTask](api/method/gettask.md), [updateTask](api/method/updatetask.md) oder [addTaskLayer](api/method/addtasklayer.md) aufzurufen.
- Einfache Anpassung: Verwenden Sie React-Komponenten für Templates, Lightbox-Formulare oder Inline-Editoren.

Wenn Sie neu bei DHTMLX Gantt sind, sehen Sie sich die [DHTMLX Gantt-Dokumentation](guides.md) an, um einen Überblick über Funktionen wie [Work Time Calculation](guides/working-time.md), [Auto Scheduling](guides/auto-scheduling.md), [Resource Management](guides/resource-management.md) und mehr zu erhalten.

:::tip AI-gestützte Entwicklung
Wenn Sie einen KI-Codierungsassistenten verwenden, kann die [DHTMLX React Gantt-Agentenkompetenz](integrations/ai-tools/agent-skills.md#available-skills) dabei helfen, korrekte Integrationsmuster zu befolgen und häufige Fehler zu vermeiden. Für eine Echtzeit-API-Referenz verbinden Sie den [DHTMLX MCP-Server](integrations/ai-tools/mcp-server.md).
:::

## Installation und NPM-Zugang

Für aktuelle Installationsanweisungen sowohl für die Evaluations- als auch die Professional-Builds, einschließlich der Konfiguration des npm-Registrys und Offline-Beispielen, siehe die [Installationsanleitung](integrations/react/installation.md).

Sobald Sie das Paket installiert haben, können Sie den Wrapper in Ihrem React-Code wie folgt importieren:

~~~ts
// Evaluation build (public npm)
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

// Professional build (private npm)
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
~~~

## Versionsanforderungen

- React `v18.0.0` oder neuer

## Grundlegende Verwendung

Hier ist ein minimales Beispiel, das zeigt, wie man den Gantt-Diagramm importiert und rendert:

~~~jsx
import { useState } from 'react';
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
import { demoData } from './DemoData'

export default function BasicGantt() {
  const [theme, setTheme] = useState("terrace");
  const [tasks, setTasks] = useState(demoData.tasks);
  const [links, setLinks] = useState(demoData.links);

  return (
    <div style={ { height: '500px' }}>
      <ReactGantt
        tasks={tasks}
        links={links}
        theme={theme}
      />
    </div>
  );
}
~~~

Beachten Sie, dass das obige Snippet zeigt, wie man die kommerzielle Gantt-Version einbindet. Um die Trial-Quellcodes zu verwenden, fügen Sie das Paket wie folgt hinzu:

~~~js
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
~~~

Wobei **demoData** folgendes [Format](guides/loading.md) hat:

~~~js
export const demoData = {
  tasks: [
    { id: 1, text: "Product Launch", type: "project", open: true, parent: 0},
    { id: 2, text: "Planning Phase", type: "project", open: true, parent: 1},
   	{ id: 3, text: "Requirement Gathering", type: "task", progress: 0.2, 
      start_date: "01-06-2025", duration: 3, parent: 2},
    { id: 4, text: "Technical Feasibility", type: "task", progress: 0.4, 
      start_date: "04-06-2025", duration: 2, parent: 2},
    { id: 5, text: "Implementation Phase", type: "project", progress: 0.1, 
      open: true, start_date: "08-06-2025", duration: 10, parent: 1},
    { id: 6, text: "Prototype Development", type: "task", progress: 0.0, 
     start_date: "08-06-2025", duration: 4, parent: 5},
    { id: 7, text: "Feature Testing", type: "task", progress: 0.0, 
     start_date: "12-06-2025", duration: 4, parent: 5},
    { id: 8, text: "Go-Live Milestone", type: "milestone", progress: 0, 
     start_date: "18-06-2025", duration: 0, parent: 1}
  ],
  links: [
    { id: 1, source: 3, target: 4, type: "0" },
    { id: 2, source: 4, target: 5, type: "0" },
    { id: 3, source: 6, target: 7, type: "0" },
    { id: 4, source: 7, target: 8, type: "0" }
  ]
};
export {demoData};
~~~ 

## Bindung von Daten {#bindingdata}

Der **React Gantt**-Wrapper bietet flexible Wege zum Laden und Speichern von Daten. Grundsätzlich gibt es zwei primäre Ansätze, um Änderungen an Ihren Gantt-Daten zu verwalten:

- **React (oder ein Zustandsmanager) als Quelle der Wahrheit**
- **Gantt als Quelle der Wahrheit**

Beide Ansätze sind gültig, aber wählen Sie einen aus und verfolgen Sie ihn konsequent, um unerwartetes Verhalten zu vermeiden.

:::info Auf der Suche nach einer tieferen Erklärung?

Dieser Abschnitt bietet eine grobe Übersicht über die beiden Bindungsmodelle.
Für eine detailliertere Anleitung, einschließlich vollständiger Beispiele, siehe [React state as the source of truth](integrations/react/state/state-management-basics.md#reactstateasthesourceoftruth).
:::

### React (oder ein Zustandsmanager) als Quelle der Wahrheit

In diesem Muster erhält **ReactGantt** alle Task-/Link-Daten über Props (aus `useState`, Redux, Zustand, usw.). Jedes Mal, wenn der Benutzer Tasks oder Links im Diagramm ändert, ruft Gantt den Callback `data.save` auf. In diesem Callback aktualisieren Sie Ihren Anwendungszustand. Wenn sich der Zustand ändert, rendert React **ReactGantt** neu, und die Gantt-Instanz wird mit den neuesten Daten synchronisiert.

~~~tsx
import { useMemo, useState } from 'react';
import ReactGantt, { type Task, type Link } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

export function MyGanttApp({ initialTasks, initialLinks }: {
  initialTasks: Task[];
  initialLinks: Link[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const data = useMemo(
    () => ({
      save: (entity: string, action: string, item: any, id: string | number) => {
        if (entity === 'task') {
          setTasks((prev) => {
            if (action === 'create') return [...prev, item as Task];
            if (action === 'update') return prev.map((task) =>
              task.id === id ? (item as Task) : task
            );
            if (action === 'delete') return prev.filter((task) => task.id !== id);
            return prev;
          });
        }

        if (entity === 'link') {
          setLinks((prev) => {
            if (action === 'create') return [...prev, item as Link];
            if (action === 'update') return prev.map((link) =>
              link.id === id ? (item as Link) : link
            );
            if (action === 'delete') return prev.filter((link) => link.id !== id);
            return prev;
          });
        }
      },
    }),
    []
  );

  return (
    <ReactGantt
      tasks={tasks}
      links={links}
      data={data}
    />
  );
}
~~~

Diese Vorgehensweise macht Ihren React-(oder globalen) Zustand zur einzigen Quelle der Wahrheit. Er funktioniert natürlich mit Zustandsmanagern wie Redux Toolkit, Zustand, MobX, Jotai, XState oder Valtio – Sie ersetzen einfach `useState` durch Ihre Store-Hooks/Selectoren und verlagern die Aktualisierungslogik in den Store.

Für weitere Beispiele (einschließlich Integrationen mit bestimmten Managern) siehe [React state as the source of truth](integrations/react/state/state-management-basics.md#reactstateasthesourceoftruth).

### Gantt als Quelle der Wahrheit

In diesem Ansatz behält **Gantt selbst** die autoritative Kopie der Daten. Sie initialisieren oder laden Tasks und Links weiterhin (über Props oder URLs), doch sobald das Diagramm läuft, kümmert sich Gantt intern um Änderungen und leitet Aktualisierungen an Ihr Backend oder einen benutzerdefinierten Handler weiter, ohne bei jedem Bearbeiten den React-State zu durchlaufen.

~~~tsx
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

export function GanttTransportExample() {
  return (
    <ReactGantt
      data={{
        load: '/api/gantt/data',  // Gantt lädt Aufgaben/Verbindungen von diesem Endpunkt
        save: '/api/gantt/data',  // Gantt sendet Änderungen hierher zurück
      }}
    />
  );
}
~~~

In diesem Modus:

- die lokale Gantt-Instanz bleibt der primäre Inhaber der aktuellen Daten
- React rendert nicht bei jeder Änderung von Tasks/Links neu
- Bulk-Operationen wie Auto Scheduling sind kostengünstiger, weil sie keine wiederholten React-Updates auslösen.

Wenn Sie dennoch eine Representation von Tasks/Links in React-State halten, seien Sie vorsichtig, Gantts interne State nicht mit veralteten Daten zu überschreiben.

Für weitere Details siehe [Gantt als Quelle der Wahrheit](integrations/react/state/state-management-basics.md#ganttasthesourceoftruth).

## Konfiguration & Props

Der React-Wrapper akzeptiert die `config`-Prop (zu [gantt.config](api/overview/properties-overview.md) gemappt) und die `templates`-Prop (zu [gantt.templates](api/overview/templates-overview.md) gemappt).

~~~js
<ReactGantt
  tasks={tasks}
  links={links}
  config= {{
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "day", step: 1, format: "%d %M" },
    ],
    columns: [
      { name: "text", tree: true, width: "*", resize: true },
      { name: "start_date", align: "center", resize: true },
      { name: "duration", align: "center", resize: true },
      {
        name: "custom",
        align: "center",
        template: (task) => <AlertButton task={task} onClick={handleButtonClick} />,
        resize: true,
      },
      { name: "add", width: 44 },
    ],
  }}
  templates= {{
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
    task_class: (start, end, task) => {
      return task.priority === 'high' ? 'highlight-task' : '';
    },
  }}
/>
~~~

### Verwendung von React-Komponenten in Templates

Wenn Sie Templates in Props angeben, können Sie React-Elemente aus Ihren Template-Funktionen zurückgeben:

~~~js
function PriorityBadge({ priority }) {
  return <span style={{color: 'red' }}>{priority}</span>;
}

<ReactGantt
  templates={{
    task_text: (start, end, task) => {
      return <PriorityBadge priority={task.priority} />;
    }
  }}
/>
~~~

:::note
Internally manipuliert DHTMLX Gantt das DOM auf nicht-React-Weise. Wenn Sie React-Komponenten aus Templates zurückgeben, werden sie über Portale in Hindernissen von Gantt in das HTML eingebettet. Beachten Sie, dass bei großen Datensätzen das Rendern komplexer React-Komponenten die Leistung beeinflussen kann.
:::

Sie können viele Aspekte mithilfe von Templates überschreiben:

- [task_text](api/template/task_text.md), [task_class](api/template/task_class.md) für die Balken
- [Formatierung der Skala](guides/configuring-time-scale.md#dateformat) für Timeline-Header
- [Spalten-Templates](guides/specifying-columns.md#datamappingandtemplates) für die linken Grid-Zellen
- und vieles mehr. Bitte beachten Sie die verfügbaren Guides (guides.md) zu Gantt

Die vollständige Liste der von React Gantt unterstützten Props finden Sie im folgenden Artikel: [](integrations/react/configuration-props.md)

## Themen & Styling

Gantt wird mit mehreren integrierten Themen ausgeliefert, die über die **theme**-Prop aktiviert werden können und dynamisch gewechselt werden können:

~~~jsx
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {
  const [theme, setTheme] = useState("terrace"); 
  const tasks = [...];
  const links = [...];

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "terrace" ? "dark" : "terrace"));
  };

  return (
    <div style={{height: '600px'}}>
      <div>
        <button onClick={switchTheme}>Theme wechseln</button>
      </div>
      <ReactGantt
        tasks={tasks}
        links={links}
        theme={theme}  /*!*/
      />
    </div>
  );
}
~~~

Detailbeschreibungen der vorhandenen Themen finden Sie in diesem Artikel (this article) [this article](guides/skins.md).

Themen können zusätzlich mit benutzerdefinierten Stilen und durch Überschreiben von CSS-Variablen angepasst werden:

~~~css
:root {
    --dhx-gantt-task-background: #d96c49;
    --dhx-gantt-task-color: #fff;
    --dhx-gantt-task-border-radius: 8px;
}
~~~

Für weitere Konfigurationen lesen Sie bitte den Guide [Skins Customization](guides/custom-skins.md).

## Ersatz des Lightbox

DHTMLX Gantt wird mit einem integrierten, konfigurierbaren Task-Editor namens [Lightbox](guides/default-edit-form.md) geliefert.

Falls nötig, können Sie ihn durch ein React-basiertes Modal oder eine andere Komponente ersetzen, und zwar auf eine der folgenden Arten:

### Durch Bereitstellen einer benutzerdefinierten Komponente über die `customLightbox`-Prop

Dazu übergeben Sie eine Komponente über die **customLightbox**-Prop:

~~~js
import React, { useState } from 'react';

export interface CustomLightboxProps {
  data: any;
  onSave: (task: any) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const CustomLightbox: React.FC<CustomLightboxProps> = ({
  data,
  onSave,
  onCancel,
  onDelete
}) => {
  const [description, setDescription] = useState<string>(data.text || '');

  const handleSaveClick = () => {
    onSave({ ...data, text: description });
  };

  const modalStyles = {
   ...
  };

  return (
    <div>
      <div style={modalStyles.overlay} onClick={onCancel} />
      <div style={modalStyles.content}>
        <h3>Edit Task</h3>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{width: '100%', padding: '8px', marginTop: '10px' }}
          />
        </div>
        <div style={modalStyles.buttonGroup}>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CustomLightbox;
~~~

Danach können Sie die hinzugefügte Komponente wie folgt verwenden:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
import CustomLightbox from "./EditorModal";

export default function BasicInitDemo() {
  const ganttRef = useRef(null);

  const tasks = [...];
  const links = [...];

  useEffect(() => {
    //const gantt = ganttRef.current?.instance;
    
  }, []);

  return (
    <ReactGantt 
      ref={ganttRef}
      tasks={tasks}
      links={links}
      customLightbox={<CustomLightbox />} />
  );
}
~~~

### Durch Verwendung des onBeforeLightbox-Ereignisses

Für komplexere Szenarien können Sie das [onBeforeLightbox](api/event/onbeforelightbox.md)-Ereignis erfassen (ausgelöst, wenn Lightbox aufgerufen wird) und das Standardverhalten überschreiben:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
import { useNavigate } from 'react-router-dom';

export default function BasicInitDemo() {
  const ganttRef = useRef<any>(null);

  const tasks = [...];
  const links = [...];
  const navigate = useNavigate();

  const handleTaskEdit = (id: any) => {
    const ganttInstance = ganttRef.current?.instance;
    navigate(`/editor/${id}`, { state: { task: ganttInstance.getTask(id) } });
  };

  return (
    <ReactGantt 
      ref={ganttRef}
      tasks={tasks}
      links={links}
      onBeforeLightbox={handleTaskEdit} />
  );
}
~~~

### Durch die Verwendung der JS Gantt-API

Bitte beziehen Sie sich auf [Custom Lightbox](guides/custom-edit-form.md) für weitere Details zum Überschreiben oder Erweitern des integrierten Lightbox.

## Ersatz integrierter Modals

Die Standard-UI enthält zwei modale Popups:

- der Bestätigungsdialog vor dem Löschen einer Aufgabe
- der Bestätigungsdialog vor dem Löschen einer Verknüpfung

Beide können über die `modals`-Prop von ReactGantt überschrieben werden:

~~~js
<ReactGantt
  ...
  modals={{
    onBeforeTaskDelete: ({
      task,
      callback,
      ganttInstance,
    }: {
      task: Task;
      callback: () => void;
      ganttInstance: GanttStatic;
    }) => void,
    onBeforeLinkDelete: ({
      link,
      callback,
      ganttInstance,
    }: {
      link: Link;
      callback: () => void;
      ganttInstance: GanttStatic;
    }) => void,
  }}
  ...
/>
~~~

Sie können diese Props verwenden, um Ihre benutzerdefinierten Modals zu aktivieren, wann immer Gantt einen Bestätigungsdialog aufruft.
Durch Aufrufen von `callback()` in den Argumenten wird die Löschung der entsprechenden Aufgabe oder Verknüpfung abgeschlossen. Um die Löschung abzubrechen, schließen Sie einfach das Modal, ohne den Callback aufzurufen.

## Verwendung von React-Komponenten im Grid

### In den Headers

Die Eigenschaft `label` einer Grid-Spalte kann entweder ein `string` oder ein `ReactElement` sein. Dadurch können Sie React-basierte Filter, Buttons oder andere UI direkt in den Spaltenkopf einbetten:

~~~js
const config: GanttConfig = {
  columns: [
    { name: "text", label: "Name", tree: true, width: 180, 
        resize: true },
    // Einbettung eines React-Elements direkt
    { name: "start_date", label: <DateFilter />, width: 150, 
        align: "center", resize: true },
    // Alternativ, eine Funktion, die ein React-Element zurückgibt:
    { name: "end_date", label: () => <DateFilter />, width: 150, 
        align: "center", resize: true },
    ...
  ],
  row_height: 40,
  grid_width: 550,
};
~~~

Wenn der Wrapper ein React-Element im Label oder in einer anderen Template-Eigenschaft erkennt, wird dieses Element mithilfe eines React-Portals in der Header-Zelle des Grids gerendert.

### In Zellen

Grid-Zellen werden durch die Eigenschaft **template** der Spalte definiert. Diese Template-Funktion erhält ein Task-Objekt und muss entweder einen reinen `string` oder ein `ReactElement` zurückgeben:

~~~jsx
import { useRef } from 'react';

function AlertButton({ task, onClick }) {
  return <button onClick={onClick}>{`Task ID: ${task.id}`}</button>;
}

export default function GanttWithGridCells({ handleButtonClick, ganttRef }) {
  const config = {
    columns: [
      { name: "text", tree: true, width: 180, resize: true },
      { name: "start_date", width: 150, align: "center", resize: true },
      { name: "duration", width: 80, align: "center", resize: true },
      {
        name: "custom",
        align: "center",
        label: <span>My Column</span>,
        width: 140,
        // Rückgabe eines React-Elements
        template: (task) => (
          <AlertButton
            task={task}
            onClick={() => {
              handleButtonClick(task);
              // Erzwinge ggf. Neurendern der Aufgabe
              ganttRef.current?.instance.updateTask(task.id);
            }}
          />
        ),
        resize: true,
      },
      { name: "add", width: 44 },
    ],
    row_height: 40,
    grid_width: 550,
  };

  return <ReactGantt ref={ganttRef} config={config} /* ...andere Props */ />;
}
~~~

Indem Sie ein React-Element aus Ihrer Column-Template-Funktion zurückgeben, können Sie in jeder Zelle des Gantt-Grids vollständig interaktive Inhalte erstellen (Buttons, Dropdowns, Badges usw.). Intern wird der Wrapper diese Elemente per Portals in die DOM-Knoten injizieren, die Gantt verwaltet.

### In Inline-Editoren

DHTMLX Gantt unterstützt [Inline-Editing für Grid-Zellen](guides/inline-editing.md). In diesem React-Wrapper können Sie eigene benutzerdefinierte React-Editoren bereitstellen, indem Sie ein Editor-Objekt in der **column**-Config angeben und dann einem Editor-Namen in der `inlineEditors`-Prop eine React-Komponente zuordnen. Siehe das Beispiel unten.

Definieren Sie eine React-basierte Inline-Editor-Komponente:

~~~jsx
import React, {
    useState,
    forwardRef,
    useImperativeHandle
} from 'react';
import { InlineEditorMethods, InlineEditorProps } from '@dhx/react-gantt';

const MyInlineEditor = forwardRef<InlineEditorMethods, InlineEditorProps>(
    ({ initialValue, task, save, cancel, ganttInstance }, ref) => {
        const [value, setValue] = useState(initialValue || "");

        useImperativeHandle(ref, (): InlineEditorMethods => ({
            getValue: () => value,
            setValue: (val: any) => setValue(val),
            isValid: () => true, 
            focus: () => {

            },
            isChanged: (originalValue: any) => {
                return originalValue !== value;
            },

            save: () => {  }
        }));

        return (
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                autoFocus
            />
        );
    }
);

export default MyInlineEditor;
~~~

Verwenden Sie den benutzerdefinierten Editor in Ihrer Gantt-Konfiguration:

~~~jsx
import ReactGantt from "@dhx/react-gantt";
import MyInlineEditor from "./CustomInlineEditor";

function Demo() {
  const config = {
    columns: [
      { name: "text", tree: true, width: 180, resize: true },
      {
        name: "duration",
        width: 80,
        align: "center",
        editor: { type: "customInputEditor", map_to: "text" }, /*!*/
        resize: true
      },
      { name: "start_date", width: 150 },
      { name: "add", width: 44 }
    ]
  };

  return (
    <ReactGantt
      config={config}
      inlineEditors={{
        customInputEditor: MyInlineEditor  /*!*/
      } }
      tasks={[/*...*/]}
      links={[/*...*/]}
    />
  );
}
~~~

Wenn der Benutzer eine Spaltenzelle doppelt anklickt, zeigt Gantt Ihren Editor-Komponenten direkt an Ort und Stelle an. Der Wrapper ruft intern die Methoden (getValue, setValue, etc.) auf, die Sie über `useImperativeHandle(ref, ...)` freigeben, um sicherzustellen, dass die Gantt-Instanz mit den Änderungen in Ihrer Komponente synchron bleibt.

Der Wert von `type` des Editor-Objekts muss mit dem Schlüssel in `inlineEditors` übereinstimmen.

Die Eigenschaft `map_to` gibt die Eigenschaft des Task-Objekts an, aus der der Editor Werte liest und schreibt. Bitte lesen Sie den Artikel zu [Inline Editing](guides/inline-editing.md) für weitere Details.

Wenn Sie einen Editor implementieren, der mehr als das Speichern eines Wertes in einer Task-Eigenschaft macht – müssen Sie eine erforderliche Logik im **save**-Funktion implementieren und die `map_to`-Option des Eingabefelds auf **"auto"** setzen. In diesem Fall wird die Gantt-Instanz das Task-Objekt nicht ändern, sondern ruft die **save**-Funktion auf, wenn es Zeit ist, die im Editor vorgenommenen Änderungen anzuwenden. Der `initialValue` des Editors wird als `null` übergeben.

:::note
Beachten Sie, dass Sie Nicht-React-Inline-Editoren über die Eigenschaft [`editor_types`](guides/inline-editing.md#custominlineeditor) der **config**-Eigenschaft definieren können.
 :::

#### Editor-Komponenten-Eigenschaften

- <span class="subproperty">**initialValue**</span> - (*any*) - der anfängliche Wert des Editors
- <span class="subproperty">**task**</span> - (*Task*) - der Task, der bearbeitet wird
- <span class="subproperty">**save**</span> - (*function*) - teilt dem gantt mit, zu speichern und den Editor zu schließen
- <span class="subproperty">**cancel**</span> - (*function*) - teilt dem gantt mit, den Editor ohne Speichern zu schließen
- <span class="subproperty">**ganttInstance**</span> - (*GanttStatic*) - die aktuelle Instanz des zugrunde liegenden Gantt-Objekts

## Filtering

Verwenden Sie die `filter`-Prop, um einen Filter für die Tasks festzulegen, die angezeigt werden sollen:

~~~jsx
const [filter, setFilter] = useState<((task: Task) => boolean) | null>(null);

function showCompleted() {
  setFilter(() => (task: Task) => task.progress === 1);
}
function resetFilter() {
  setFilter(null);
}

return (
  <ReactGantt
    ...
    filter={filter}
    ...
  />
);
~~~

Um Ressourcen im [Resource Panel](guides/resource-management.md) zu filtern, verwenden Sie die `resourceFilter`-Prop:

~~~js
function handleResourceSelectChange(resourceId: string | null) {
  setSelectedResource(resourceId);
  if (resourceId === null) {
    setResourceFilter(null);
  } else {
    setResourceFilter(
      () => (resource: ResourceItem) => String(resource.id) === String(resourceId)
    );
  }
}

return (
  <ReactGantt
    ref={ganttRef}
    tasks={tasks}
    links={links}
    resources={resources}
    resourceFilter={resourceFilter}
    config={config}
    templates={templates}
    plugins={{auto_scheduling: true }}
  />
);
~~~

## Arbeitskalender

Um Arbeitszeitberechnungen in **ReactGantt** zu ermöglichen, stellen Sie sicher, dass Sie [work_time](api/config/work_time.md) aktivieren:

~~~js
  const config: GanttConfig = {
    ...
    work_time: true
  };
~~~

Arbeitskalender können über die `calendars`-Prop an **ReactGantt** übergeben werden:

~~~jsx
const calendars: Calendar[] = [
  {
    id: "global",
    hours: ["8:00-12:00", "13:00-17:00"], // globale Arbeitszeiten für Werktage
    days: {
      weekdays: {
        0: false, // 0 = Sonntag, 6 = Samstag
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: false
      },
      dates: {
        "2025-04-06": true,  // Arbeitszeiten für ein bestimmtes Datum überschreiben
        "2025-04-08": false
      }
    }
  }
];

return (
  <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
    <ReactGantt
      ...
      calendars={calendars}
      ...
    />
  </div>
);
~~~

Um Arbeitszeit im Gantt-Timeline hervorzuheben oder Arbeitszeitberechnungen durchzuführen, können Sie den bereitgestellten Hook `useWorkTime` verwenden:

~~~jsx
import ReactGantt, { useWorkTime, Calendar } from "@dhx/react-gantt";

export default function GanttTemplatesDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);

  const { isWorkTime } = useWorkTime(ganttRef);
  const templates: GanttTemplates = {
    timeline_cell_class: (task: Task, date: Date) => {
      return isWorkTime({ date, task }) ? "" : "weekend";
    }
  };

  const calendars: Calendar[] = [
    {
      id: "global",
      hours: ["8:00-12:00", "13:00-17:00"], // globale Arbeitszeiten für Werktage
      days: {
        weekdays: {
          0: false, // 0 = Sonntag, 6 = Samstag
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: false
        },
        dates: {
          "2025-04-06": true,  // überschreibt Arbeitszeiten für ein bestimmtes Datum
          "2025-04-08": false
        }
      }
    }
  ];

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGantt
        ...
        calendars={calendars}
        templates={templates}
        config={config}
        ref={ganttRef}
      />
    </div>
  );
};

~~~

Alternativ können Sie auf das [innere Gantt-Objekt](#accessingtheunderlyingganttapi) zugreifen und direkt die [Arbeitszeit](guides/working-time.md)-Methoden verwenden.

## Gruppierung von Aufgaben {#groupingtasks}

Verwenden Sie die `groupTasks`-Prop, um Aufgaben nach einer der Eigenschaften der Aufgabe zu gruppieren:

~~~js
  const [grouping, setGrouping] = useState<GroupConfig | boolean>({
    relation_property: 'status',
    groups:[
      {id: 1, name: "Neu"},
      {id: 2, name: "In Bearbeitung"},
      {id: 3, name: "Fertig"}
    ],
    group_id: "key",
    group_text: "label"
  });

  return (
  <ReactGantt
    ref={ganttRef}
    tasks={tasks}
    links={links}
    groupTasks={grouping}
  />
);
~~~

Um die Gruppierung zu deaktivieren, setzen Sie `groupTasks` auf `false`:

~~~js
setGrouping(false);
~~~

## Vertikale Marker im Timeline-Bereich

[Vertikale Marker](guides/markers.md) können zu **ReactGantt** über die `markers`-Eigenschaft hinzugefügt werden:

~~~jsx
  const projectStartMarker = {
    id: "marker1",
    start_date: new Date(2025, 3, 2),
    text: "Projektstart!",
    css: "project-start"
  };
  const projectEndMarker = {
    id: "marker2",
    start_date: new Date(2025, 3, 16),
    text: "Projektende",
    css: "project-end"
  };

  const [markers, setMarkers] = useState<Marker[]>([
    projectStartMarker,
    projectEndMarker
  ]);

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGantt
        ...
        markers={markers}
        ...
      />
    </div>
  );
~~~

:::note
Hinweis: Die **text**-Eigenschaft des Marker-Objekts akzeptiert entweder HTML-String oder React-Element
:::

## Zugriff auf die zugrunde liegende Gantt-API {#accessingtheunderlyingganttapi}

In den meisten Fällen reichen die Props von ReactGantt aus, um Ihre Grafik zu konfigurieren. Manchmal benötigen Sie jedoch direkten Zugriff auf die DHTMLX Gantt-API für fortgeschrittene Operationen (z. B. Arbeitszeitberechnungen, gantt.showDate, gantt.unselectTask oder benutzerdefinierte Zoomstufen).

### Verwendung eingebauter Hooks

ReactGantt bietet sofort einsatzbereite Hooks, die einige Methoden der Gantt-API freischalten. Bitte prüfen Sie den zugehörigen Artikel [](integrations/react/configuration-props.md).

### Verwendung eines Refs

Für Fälle, in denen deklarative Props und integrierte Hooks nicht ausreichen, ermöglicht der Wrapper den Zugriff auf die interne Gantt-Instanz über `ref`:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // hier können Sie jede Gantt-API-Methode aufrufen
    console.log('Alle Tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
    />
  );
}
~~~ 

Siehe die DHTMLX Gantt [API-Referenz](api/overview/methods-overview.md) für die vollständige Liste der Methoden.

#### Konflikte mit React-Props vermeiden

- Wenn Sie manuell `gantt.parse({ tasks, links })` oder `gantt.addTask()` in Ihrem Code aufrufen, achten Sie darauf, die React-Props synchron zu halten. Ansonsten könnte beim nächsten Rendern durch React Ihre manuelle Änderung überschrieben werden.
- Der empfohlene Ansatz ist, sich auf die Wrapper-Props für Tasks und Links zu verlassen oder diese in Ihrem React-State zu verwalten. Lassen Sie dann den Wrapper erneut parsen.

## Kompatibilität mit SSR-Frameworks (Next.js, Remix)

:::note
Ab ReactGantt v9.0.12 ist der Wrapper SSR-ready. Sie können ihn in Next.js oder Remix importieren, ohne SSR zu deaktivieren. Falls Sie ältere Versionen verwenden – Sie müssen SSR für jede Route oder Komponente, die ReactGantt verwendet, deaktivieren oder verzögert ausführen.
:::

:::note
Während des Server-Side-Renderings gibt die Komponente lediglich einen Platzhalter `<div>` aus; das eigentliche Gantt-Markup wird während der clientseitigen Hydration erzeugt.
:::

#### Next.js

ReactGantt ist SSR-kompatibel, aber Ihre eigene Komponente muss in den meisten realen Szenarien eine Client-Komponente sein.

Sie müssen am Anfang Ihrer Komponente `"use client"` hinzufügen, wann immer Sie einen `ref` verwenden, um auf die Gantt-Instanz zuzugreifen, Ereign handler oder Callbacks zu übergeben, React-Elemente aus Templates zurückzugeben,

Dies ist typischerweise so konfiguriert:

~~~jsx
'use client';

import "@dhx/react-gantt/dist/react-gantt.css";
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <ReactGantt tasks={/* ... */} links={/* ... */} />
    </div>
  );
}
~~~

Wenn Sie legacy-Versionen (v9.0.11 oder älter) verwenden, müssen Sie Ihre ReactGantt-Komponente dynamisch importieren und SSR deaktivieren:

~~~jsx
import dynamic from 'next/dynamic';

const GanttDemo = dynamic(() => import('../components/GanttDemo'), {
  ssr: false
});

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <GanttDemo />
    </div>
  );
}
~~~

#### Remix

Ab v9.0.12 ist kein `<ClientOnly>`-Wrapper mehr nötig:

~~~js

import "@dhx/react-gantt/dist/react-gantt.css";
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <ReactGantt tasks={/* ... */} links={/* ... */} />
    </div>
  );
}
~~~

Wenn Sie ältere Versionen (v9.0.11 oder älter) verwenden, müssen Sie die Gantt-Komponente nur auf dem Client bedingt rendern:

~~~jsx
import { ClientOnly } from 'remix-utils/client-only';
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {

  return (
    <div style={{height: '100vh' }}>
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => <ReactGantt
          tasks={/* ... */}
          links={/* ... */}
        />}
      </ClientOnly>
    </div>
  );
}
~~~

## Nächste Schritte

- Für weitere Informationen zur Konfiguration von ReactGantt siehe [dieser Artikel](integrations/react/configuration-props.md)
- Für fortgeschrittene Nutzung siehe [DHTMLX Gantt-Dokumentation](guides.md)