---
title: "React Gantt"
sidebar_label: "Übersicht"
---

React Gantt
==================

:::note
React Gantt ist verfügbar unter [Commercial, Enterprise und Ultimate licenses](https://dhtmlx.com/docs/products/licenses.shtml).
Für Benutzer der Individual- oder GPL-Editionen von Gantt beachten Sie bitte die Anleitung [How to Start](integrations/react/quick-start.md) für React.
:::

Überblick
--------------------

DHTMLX Gantt ist eine reine JavaScript-Komponente, die mit jeder Browserumgebung kompatibel ist. Die Commercial- und höherwertigen Editionen beinhalten eine **React Gantt**-Komponente, die DHTMLX Gantt umschließt und so eine einfache native Integration in React-Anwendungen ermöglicht.

Dieser Wrapper erlaubt es, ein voll funktionsfähiges Gantt-Diagramm mit dem bekannten Props- und State-Modell von React zu erstellen. Intern verwaltet er eine Standard-Instanz von DHTMLX Gantt und wandelt React-Props (wie tasks und config) in die entsprechenden Gantt-Initialisierungen und Datenstrukturen um.

**Hauptfunktionen**

- Deklaratives Datenmanagement: Übergeben Sie Arrays von tasks, links, resources und mehr als Props.
- Konfigurierbar: Ordnet React-Props *gantt.config*, *gantt.templates*, *gantt.plugins* usw. zu.
- Vollständiger Gantt-API-Zugriff: Verwenden Sie ein Ref, um Methoden wie [getTask](api/method/gettask.md), [updateTask](api/method/updatetask.md) oder [addTaskLayer](api/method/addtasklayer.md) aufzurufen.
- Einfache Anpassung: Implementieren Sie React-Komponenten für Templates, Lightbox-Formulare oder Inline-Editoren.

Für Einsteiger in DHTMLX Gantt bietet die [DHTMLX Gantt Dokumentation](guides.md) einen Überblick über Funktionen wie [Work Time Calculation](guides/working-time.md), [Auto Scheduling](guides/auto-scheduling.md), [Resource Management](guides/resource-management.md) und mehr.

Installation und NPM-Zugang
-------------------

**Installation der Testversion der React Gantt-Komponente**

:::note
Um die Testversion der React Gantt-Komponente auszuprobieren, laden Sie das DHTMLX Gantt-Testpaket von [hier](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) herunter und folgen Sie den Anweisungen in der README-Datei. Das Paket enthält auch React Gantt-Beispiele.
Beachten Sie, dass die Testversion nur 30 Tage gültig ist.
:::

**Installation der PRO-Version der React Gantt-Komponente**

:::note
Der Zugang zum privaten DHTMLX npm ist über den [Client's Area](https://dhtmlx.com/clients/) verfügbar, wo Sie Ihren npm-Login und Ihr Passwort generieren können. Dort finden Sie eine ausführliche Installationsanleitung. Beachten Sie, dass der Zugriff auf das private npm eine aktive proprietäre Gantt-Lizenz erfordert.
:::

Versionsanforderungen
--------------------

- React `v18.0.0` oder höher

Grundlegende Verwendung
-------------------

Nachfolgend ein einfaches Beispiel, das zeigt, wie das Gantt-Diagramm importiert und gerendert wird:

~~~js
import { useState } from 'react';
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
import { demoData } from './DemoData'

export default function BasicGantt() {
  const [theme, setTheme] = useState("terrace");
  const [tasks, setTasks] = useState(demoData.tasks);
  const [links, setLinks] = useState(demoData.links);

  return (
    <div style={{height: '500px' }}>
      <ReactGantt
        tasks="{tasks}"
        links="{links}"
        theme="{theme}"
      />
    </div>
  );
}
~~~

Das **demoData**-Objekt folgt diesem [Format](guides/loading.md):

~~~
const demoData = {
  tasks: [
    { id: 1, text: "Product Launch", type: "project", open: true, parent: 0},
    { id: 2, text: "Planning Phase", type: "project", open: true, parent: 1},
    { id: 3, text: "Requirement Gathering", type: "task", progress: 0.2, 
      start_date: "2025-06-01", duration: 3, parent: 2},
    { id: 4, text: "Technical Feasibility", type: "task", progress: 0.4, 
      start_date: "2025-06-04", duration: 2, parent: 2},
    { id: 5, text: "Implementation Phase", type: "project", progress: 0.1, 
      open: true, start_date: "2025-06-08", duration: 10, parent: 1},
    { id: 6, text: "Prototype Development", type: "task", progress: 0.0, 
     start_date: "2025-06-08", duration: 4, parent: 5},
    { id: 7, text: "Feature Testing", type: "task", progress: 0.0, 
     start_date: "2025-06-12", duration: 4, parent: 5},
    { id: 8, text: "Go-Live Milestone", type: "milestone", progress: 0, 
     start_date: "2025-06-18", duration: 0, parent: 1}
  ],
  links: [
    { id: 1, source: 3, target: 4, type: "0" },
    { id: 2, source: 4, target: 5, type: "0" },
    { id: 3, source: 6, target: 7, type: "0" },
    { id: 4, source: 7, target: 8, type: "0" }
  ]
};
export demoData;
~~~

Datenbindung
--------------------

Der **ReactGantt**-Wrapper unterstützt flexible Optionen zum Laden und Speichern von Daten. Es gibt zwei Hauptmethoden, um Änderungen an Ihren Gantt-Daten zu verwalten:

1. Verwendung des React-States als Hauptquelle der Wahrheit
2. Gantt als Hauptquelle der Wahrheit verwenden

Beide Methoden funktionieren gut, aber es ist ratsam, sich für eine zu entscheiden und dabei zu bleiben, um unerwartete Probleme zu vermeiden.

### React-State als Quelle der Wahrheit

Bei diesem Ansatz liest **ReactGantt** alle Aufgaben- und Linkdaten aus Ihrem React-State. Wenn Benutzer Aufgaben oder Links im Gantt bearbeiten (z. B. Hinzufügen oder Löschen einer Aufgabe), wird ein Callback ausgelöst. In diesem Callback aktualisieren Sie Ihren React-State mit den Änderungen. Sobald sich der State ändert, rendert React **ReactGantt** neu, das dann die neuesten Daten aus dem State lädt.

~~~js
function MyGanttApp() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const data = {
    save: (entity: string, action: string, raw: any, id: string | number) => {
      if (entity === 'task') {
        if (action === 'create') {
          setTasks((prev) => [...prev, item]);
        } ...
      }
      ...
    }
  };

  return (
    <ReactGantt
      tasks="{tasks}"
      links="{links}"
      data="{data}"
      // ...other props
    />
  );
}
~~~

In diesem Beispiel ruft **ReactGantt** den **save**-Callback auf, wenn eine Aufgabe erstellt wird, und der React-State wird entsprechend aktualisiert. Die Änderung des States führt dazu, dass ReactGantt die Gantt-Daten neu initialisiert.

Dieses Muster hält den React-State als einzige Quelle der Wahrheit für UI- und Server-Updates und passt sich natürlich der Logik von React oder Redux an.

Beachten Sie, dass dies zu häufigeren Parsings oder Neurenderings des Gantt führen kann.

### Gantt als Quelle der Wahrheit

Hier finden Änderungen direkt in der Gantt-Instanz statt, ohne dass sie zwingend mit dem React-State synchronisiert werden müssen. Sie können Aufgaben und Links initial laden (über Props oder den eingebauten Data Processor von Gantt), aber nach dem Start verwaltet Gantt die Daten intern. Wenn Sie einen Update-Callback einrichten oder den integrierten Transport verwenden, sendet Gantt Änderungen an einen Server oder eine benutzerdefinierte Funktion, aktualisiert oder setzt den React-State jedoch nicht automatisch nach Änderungen zurück.

~~~js
<ReactGantt
  data="{" {
    load: "/api/data",     // gantt lädt die initialen tasks/links von hier
    save: "/api/data"      // gantt sendet Updates hierhin zurück
  } }
/>
~~~

In diesem Setup übernimmt Gantt das Laden und Speichern der Daten eigenständig, wobei die lokale Gantt-Instanz als Hauptdatenquelle dient.

Dies reduziert den Overhead durch ständige React-State-Updates während Gantt-Änderungen und vereinfacht Massenoperationen wie Auto Scheduling, ohne wiederholte Neurenderings.

Der Nachteil ist der Verlust der direkten Synchronisation zwischen Gantt-Daten und React-State. Wenn Sie tasks/links dennoch im React-State halten, achten Sie darauf, die internen Daten von Gantt nicht versehentlich zu überschreiben.

### Daten laden

Wenn die Daten im Code verfügbar sind, können sie Gantt über State-Variablen und die entsprechenden Props übergeben werden:

~~~js
export default function GanttTemplatesDemo() {
  const [tasks, setTasks] = useState(projectData.tasks);
  const [links, setLinks] = useState(projectData.links);
  const [resources, setResources] = useState(projectData.resources);
  const [resourceAssignments, setResourceAssignments] = 
      useState(projectData.resourceAssignments);

  return (
    <div style="{" {height: '100vh'} }>
      <ReactGantt
        tasks="{tasks}"
        links="{links}"
        resources="{resources}"
        resourceAssignments="{resourceAssignments}"
      />
    </div>
  );
};
~~~

### Daten mit eingebautem Transport laden

Sie können eine URL angeben, von der Gantt Daten lädt, sowie eine weitere URL, an die Updates gesendet werden:

~~~js
import React from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: "/api/data"
    }
  }

  return (
    <ReactGantt ...{props} />
  );
}
~~~

Intern wird die **load**-URL an die Methode [load](api/method/load.md) übergeben. Die Endpoint-Antwort sollte wie im Artikel [Data Loading](guides/loading.md) beschrieben formatiert sein.

### Änderungen speichern

Die **save**-URL erhält Updates im in diesem [Artikel](guides/server-side.md#requestresponsedetails)" beschriebenen Format.

Alternativ können Sie eine Funktion als **save**-Eigenschaft des **data**-Objekts bereitstellen. Diese Funktion wird immer dann aufgerufen, wenn sich Gantt-Daten ändern, und dient als Routing-Handler für den internen [DataProcessor](guides/server-side.md#customrouting):

~~~js
import React from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: (entity, action, data, id) => {
          console.log(`${entity} - ${action} - ${id}`, data);
      }
    }
  };

  return (
    <ReactGantt ...{props} />
  );
}
~~~

### Batch-Speichermodus

In früheren Modi löste React Gantt den Callback für jede geänderte Entität einzeln aus. Dies entspricht dem Standardverhalten der zugrunde liegenden Gantt-Bibliothek. Dies kann jedoch zu Performance-Einbußen in React führen, insbesondere bei Massenoperationen wie Auto Scheduling, bei denen Dutzende oder sogar Hunderte von Aufgaben gleichzeitig aktualisiert werden. Das Verarbeiten von State-Updates für jede Änderung einzeln ist in solchen Fällen nicht effizient.

Um dies zu verbessern, bietet React Gantt einen speziellen **data.batchSave**-Handler für Massenupdates. 
Dieser Handler wird einmalig mit allen vorgenommenen Änderungen der Gantt-Instanz aufgerufen:

~~~

const [tasks, setTasks] = useState(data.tasks);
const [links, setLinks] = useState(data.links);

return <ReactGantt
  ref="{ganttRef}"
  tasks="{tasks}"
  links="{links}"

  data="{" {
    batchSave: (updates) => {
      if (updates.task) {
        setTasks(tasks => updateTasks(tasks, updates.task));
      }
      if (updates.link) {
        setLinks(links => updateLinks(links, updates.link));
      }

    }
  } }
/>
~~~

Das `updates`-Objekt, das an den **batchSave**-Callback übergeben wird, sieht folgendermaßen aus:

~~~js
{
  tasks: DataCallbackChange<Task>[],
  links: DataCallbackChange<Link>[],
  resources: DataCallbackChange<Resource>[],
  resourceAssignments: DataCallbackChange<ResourceAssignment>[],
}

interface DataCallbackChange<T> {
  entity: string;
  action: string;
  data: T;
  id: number | string;
}
~~~

Konfiguration & Props
-------------------

Der React-Wrapper akzeptiert eine `config`-Prop (die auf [gantt.config](api/overview/properties-overview.md) abbildet) und eine `templates`-Prop (die auf [gantt.templates](api/overview/templates-overview.md) abbildet).


~~~js
<ReactGantt
  tasks="{tasks}"
  links="{links}"
  config= { {
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
        template: (task) => <AlertButton task="{task}" onClick="{handleButtonClick}" />,
        resize: true,
      },
      { name: "add", width: 44 },
    ],
  } }
  templates= { {
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
    task_class: (start, end, task) => {
      return task.priority === 'high' ? 'highlight-task' : '';
    },
  } }
/>
~~~

### Verwendung von React-Komponenten in Templates

Wenn Templates in Props definiert werden, können React-Elemente von den Template-Funktionen zurückgegeben werden:

~~~js
function PriorityBadge({ priority }) {
  return <span style={{color: 'red' }}>{priority}</span>;
}

<ReactGantt
  templates="{" {
    task_text: (start, end, task) => {
      return <PriorityBadge priority="{task.priority}" />;
    }
  } }
/>
~~~

:::note
Intern arbeitet DHTMLX Gantt mit dem DOM auf eine Weise, die React nicht direkt verwendet. Wenn React-Komponenten von Templates zurückgegeben werden, werden sie mithilfe von Portalen in das HTML von Gantt eingebettet. Beachten Sie, dass das Rendern komplexer React-Komponenten bei großen Datenmengen die Performance beeinflussen kann.
:::

Templates können zur Anpassung vieler Bereiche verwendet werden:

- [task_text](api/template/task_text.md), [task_class](api/template/task_class.md) für Task-Balken
- [Formatierung der Zeitskala](guides/configuring-time-scale.md#dateformat) für Zeitachsen-Köpfe
- [Spaltentemplates](guides/specifying-columns.md#datamappingandtemplates) für die Zellen im linken Grid
- und mehr. Details finden Sie in den [verfügbaren Anleitungen](guides.md) für Gantt.

Die vollständige Liste der von React Gantt unterstützten Props finden Sie unter: [Verwendung von DHTMLX Gantt Properties in ReactGantt](integrations/react/configuration-props.md)

Themes & Styling
-----------------

Gantt enthält mehrere eingebaute Themes, die über die **theme**-Prop gesetzt und dynamisch gewechselt werden können:

~~~js
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
    <div style="{" {height: '600px'} }>
      <div>
        <button onClick="{switchTheme}">Switch Theme</button>
      </div>
      <ReactGantt
        tasks="{tasks}"
        links="{links}"
        theme="{theme}"  /*!*/
      />
    </div>
  );
};
~~~

Ausführliche Beschreibungen der verfügbaren Themes finden Sie in [diesem Artikel](guides/skins.md).

Themes können zusätzlich durch eigene Styles oder das Überschreiben von CSS-Variablen angepasst werden:

~~~css
:root {
    --dhx-gantt-task-background: #d96c49;
    --dhx-gantt-task-color: #fff;
    --dhx-gantt-task-border-radius: 8px;
}
~~~

Weitere Konfigurationsmöglichkeiten finden Sie im Leitfaden [Skins Customization](guides/custom-skins.md).

Austausch des Lightbox-Editors
------------------

DHTMLX Gantt enthält einen eingebauten, konfigurierbaren Task-Editor namens [Lightbox](guides/default-edit-form.md).

Falls gewünscht, kann dieser durch ein React-Modal oder eine andere Komponente auf folgende Weisen ersetzt werden:

### Durch Bereitstellung einer eigenen Komponente via `customLightbox` Prop

Sie können eine Komponente über die **customLightbox**-Prop übergeben:

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
      <div style="{modalStyles.overlay}" onClick="{onCancel}" />
      <div style="{modalStyles.content}">
        <h3>Edit Task</h3>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value="{description}"
            onChange="{(e)" => setDescription(e.target.value)}
            style={{width: '100%', padding: '8px', marginTop: '10px' } }
          />
        </div>
        <div style="{modalStyles.buttonGroup}">
          <button onClick="{handleSaveClick}">Save</button>
          <button onClick="{onCancel}">Cancel</button>
          <button onClick="{onDelete}">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CustomLightbox;
~~~

Sie können diese Komponente dann wie folgt verwenden:

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
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
      customLightbox="{<CustomLightbox" />} />
  );
}
~~~

### Über das onBeforeLightbox Event-Prop

Für fortgeschrittene Fälle können Sie das [onBeforeLightbox](api/event/onbeforelightbox.md) Event abfangen (wird ausgelöst, wenn die Lightbox geöffnet wird) und das Standardverhalten überschreiben:

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
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
      onBeforeLightbox="{handleTaskEdit}" />
  );
}
~~~

### Über die JS Gantt API

Weitere Informationen zum Überschreiben oder Erweitern der eingebauten Lightbox finden Sie unter [Custom Lightbox](guides/custom-edit-form.md).

Austausch der eingebauten Modals
------------------

Die Standard-Benutzeroberfläche enthält zwei Modaldialoge:

- einen Bestätigungsdialog vor dem Löschen einer Aufgabe
- einen Bestätigungsdialog vor dem Löschen eines Links

Beide können mit der `modals`-Prop von ReactGantt angepasst werden:

~~~js
<ReactGantt
  ...
  modals="{" {
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
  } }
  ...
/>

~~~

Mit diesen Props können Sie eigene Modals anzeigen, wenn Gantt eine Bestätigung anfordert. 
Das Aufrufen des bereitgestellten `callback()` schließt das Löschen der Aufgabe oder des Links ab. Um abzubrechen, schließen Sie das Modal einfach, ohne den Callback aufzurufen.

Verwendung von React-Komponenten im Grid
-------------------

### In Headern

Die **label**-Eigenschaft einer Grid-Spalte kann ein `string` oder ein `ReactElement` sein. So können Sie React-basierte Filter, Buttons oder andere UI-Elemente direkt in den Spaltenkopf einbetten:

~~~js
const config: GanttConfig = {
  columns: [
    { name: "text", label: "Name", tree: true, width: 180, 
        resize: true },
    // React-Element direkt eingebettet
    { name: "start_date", label: <DateFilter />, width: 150, 
        align: "center", resize: true },
    // Oder als Funktion, die ein React-Element zurückgibt:
    { name: "end_date", label: () => <DateFilter />, width: 150, 
        align: "center", resize: true },
    ...
  ],
  row_height: 40,
  grid_width: 550,
};
~~~

Wenn der Wrapper ein React-Element in einem Label oder einer anderen Template-Eigenschaft findet, rendert er dieses mithilfe eines React-Portals in die Header-Zelle des Grids.

### In Zellen

Grid-Zellen werden von der **template**-Eigenschaft einer Spalte gesteuert. Diese Funktion erhält ein Task-Objekt und sollte entweder einen einfachen `string` oder ein `ReactElement` zurückgeben:

~~~
import { useRef } from 'react';

function AlertButton({ task, onClick }) {
  return <button onClick="{onClick}">{`Task ID: ${task.id}`}</button>;
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
        // Gibt ein React-Element zurück
        template: (task) => (
          <AlertButton
            task="{task}"
            onClick="{()" => {
              handleButtonClick(task);
              // Falls nötig, ein erneutes Rendern der Aufgabe auslösen
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

  return <ReactGantt ref="{ganttRef}" config="{config}" /* ...other props */ />;
}
~~~

Durch das Zurückgeben von React-Elementen aus Ihren Spaltentemplates können Sie vollständig interaktive Inhalte wie Buttons, Dropdowns oder Badges in jede Gantt-Grid-Zelle einbauen. Der Wrapper injiziert diese Elemente über Portale in die vom Gantt verwalteten DOM-Knoten.

### In Inline-Editor

DHTMLX Gantt unterstützt [Inline-Bearbeitung für Rasterzellen](guides/inline-editing.md). Innerhalb dieses React-Wrappers können benutzerdefinierte React-Editoren hinzugefügt werden, indem ein Editor-Objekt in der **Spalten**-Konfiguration definiert und ein Editor-Name über die `inlineEditors`-Prop mit einer React-Komponente verknüpft wird. Das folgende Beispiel zeigt diese Einrichtung.

Definieren Sie eine React-basierte Inline-Editor-Komponente:

~~~js
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
                value="{value}"
                onChange="{e" => setValue(e.target.value)}
                autoFocus
            />
        );
    }
);

export default MyInlineEditor;
~~~

Verwenden Sie den benutzerdefinierten Editor in Ihrer Gantt-Konfiguration:

~~~js
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
      config="{config}"
      inlineEditors="{" {
        customInputEditor: MyInlineEditor  /*!*/
      } }
      tasks="{[/*...*/]}"
      links="{[/*...*/]}"
    />
  );
}
~~~

Wenn ein Benutzer auf eine Spaltenzelle doppelklickt, ersetzt das Gantt-Diagramm diese durch Ihre Editor-Komponente. Der Wrapper ruft intern die von Ihnen bereitgestellten Methoden (getValue, setValue usw.) über `useImperativeHandle(ref, ...)` auf und hält die Gantt-Instanz mit den Änderungen Ihrer Komponente synchron.

Der Wert von `type` im Editor-Objekt muss dem Schlüssel in `inlineEditors` entsprechen.

Die Eigenschaft `map_to` gibt an, auf welche Eigenschaft des Task-Objekts der Editor zugreift und in diese schreibt. Weitere Informationen finden Sie im Artikel zur [Inline-Bearbeitung](guides/inline-editing.md).

Wenn Ihr Editor komplexere Operationen als das einfache Aktualisieren einer Task-Eigenschaft ausführt, implementieren Sie die notwendige Logik innerhalb der **save**-Funktion und setzen Sie die Option `map_to` auf **"auto"**. In diesem Modus aktualisiert das Gantt-Diagramm das Task-Objekt nicht automatisch, sondern ruft die **save**-Funktion auf, wenn Änderungen übernommen werden sollen. Der Editor erhält dann `null` als `initialValue`.

:::note
Hinweis: Nicht-React-Inline-Editoren können ebenfalls über die Eigenschaft [editor_types](guides/inline-editing.md#custominlineeditor) innerhalb der **config** definiert werden.
:::

#### Eigenschaften der Editor-Komponente

- <span class="subproperty">**initialValue**</span> - (*any*) - Startwert des Editors
- <span class="subproperty">**task**</span> - (*Task*) - Die aktuell bearbeitete Aufgabe
- <span class="subproperty">**save**</span> - (*function*) - Löst das Speichern und Schließen des Editors im Gantt aus
- <span class="subproperty">**cancel**</span> - (*function*) - Schließt den Editor ohne zu speichern
- <span class="subproperty">**ganttInstance**</span> - (*GanttStatic*) - Die aktuelle Gantt-Instanz


Filtern
-----------------

Mit der `filter`-Prop können Sie eine Funktion angeben, die steuert, welche Aufgaben sichtbar sind:

~~~js
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
    filter="{filter}"
    ...
  />
);

~~~

Um Ressourcen im [Ressourcen-Panel](guides/resource-management.md) zu filtern, verwenden Sie die Prop `resourceFilter`:

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
    ref="{ganttRef}"
    tasks="{tasks}"
    links="{links}"
    resources="{resources}"
    resourceFilter="{resourceFilter}"
    config="{config}"
    templates="{templates}"
    plugins={{auto_scheduling: true } }
  />
);

~~~

Arbeitskalender
------------------

Um Arbeitszeitberechnungen in **ReactGantt** zu ermöglichen, aktivieren Sie die Arbeitszeitfunktion in der Konfiguration:

~~~js
  const config: GanttConfig = {
    ...
    work_time: true
  };
~~~

Arbeitskalender können an **ReactGantt** über die Prop `calendars` übergeben werden:

~~~js
const calendars: Calendar[] = [
  {
    id: "global",
    hours: ["8:00-12:00", "13:00-17:00"], // globale Arbeitszeiten an Wochentagen
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
      calendars="{calendars}"
      ...
    />
  </div>
);

~~~

Um Arbeitszeiten im Gantt-Timeline hervorzuheben oder Arbeitszeitberechnungen durchzuführen, kann der bereitgestellte Hook `useWorkTime` verwendet werden:

~~~js
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
      hours: ["8:00-12:00", "13:00-17:00"], // globale Arbeitszeiten an Wochentagen
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
        calendars="{calendars}"
        templates="{templates}"
        config="{config}"
        ref="{ganttRef}"
      />
    </div>
  );
};

~~~

Alternativ kann das [interne Gantt-Objekt](#accessingtheunderlyingganttapi) für die direkte Nutzung von [Arbeitszeit-Methoden](guides/working-time.md) verwendet werden.

Gruppierung von Aufgaben
-----------------

Das Gruppieren von Aufgaben nach beliebigen Task-Eigenschaften ist über die Prop `groupTasks` möglich:

~~~js
  const [grouping, setGrouping] = useState<GroupConfig | boolean>({
    relation_property: 'status',
    groups:[
      {id: 1, name: "New"},
      {id: 2, name: "In Progress"},
      {id: 3, name: "Done"}
    ],
    group_id: "key",
    group_text: "label"
  });

  return (
  <ReactGantt
    ref="{ganttRef}"
    tasks="{tasks}"
    links="{links}"
    groupTasks="{grouping}"
  />
);
~~~

Um die Gruppierung zu deaktivieren, setzen Sie `groupTasks` auf `false`:

~~~js
setGrouping(false);
~~~


Vertikale Marker im Timeline-Bereich
-----------------

Vertikale Marker können in **ReactGantt** über die Eigenschaft `markers` hinzugefügt werden:

~~~js
  const projectStartMarker = {
    id: "marker1",
    start_date: new Date(2025, 3, 2),
    text: "Project start!",
    css: "project-start"
  };
  const projectEndMarker = {
    id: "marker2",
    start_date: new Date(2025, 3, 16),
    text: "Project end",
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
        markers="{markers}"
        ...
      />
    </div>
  );
~~~

:::note
Hinweis: Die Eigenschaft **text** des Marker-Objekts unterstützt sowohl einen HTML-String als auch ein React-Element.
:::

Zugriff auf die zugrunde liegende Gantt-API
------------------

Während die Props von ReactGantt die meisten Konfigurationsanforderungen abdecken, ist für fortgeschrittene Funktionen wie Arbeitszeitberechnungen, gantt.showDate, gantt.unselectTask oder benutzerdefiniertes Zoomen manchmal der direkte Zugriff auf die DHTMLX Gantt API notwendig.

### Verwendung integrierter Hooks

ReactGantt bietet Hooks, die Teile der Gantt-API zugänglich machen. Weitere Details finden Sie im zugehörigen Artikel [Artikel](integrations/react/configuration-props.md)

### Verwendung eines Refs

Wenn deklarative Props und Hooks nicht ausreichen, kann auf die interne Gantt-Instanz über `ref` zugegriffen werden:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // Hier können Sie JEDE Gantt-API-Methode aufrufen
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
    />
  );
}
~~~

Eine vollständige Liste der Methoden finden Sie in der DHTMLX Gantt [API Reference](api/overview/methods-overview.md).

#### Konflikte mit React-Props vermeiden

- Wenn Sie `gantt.parse({ tasks, links })` oder `gantt.addTask()` manuell aufrufen, beachten Sie, dass React-Props aus dem Takt geraten können. Andernfalls könnten die nächsten Renderings von React Ihre manuellen Änderungen überschreiben.
- Es ist am besten, Aufgaben und Verknüpfungen über die Wrapper-Props oder den React-Status zu verwalten und das Wrapper-Handling für das erneute Parsen zu überlassen.


Kompatibilität mit SSR-Frameworks (Next.js, Remix)
--------------

:::note
Da DHTMLX Gantt ein reines Browser-Widget ist, das direkt mit dem DOM interagiert, kann es nicht in Node/SSR-Umgebungen gerendert werden. Daher muss das serverseitige Rendering für alle Routen oder Komponenten, die ReactGantt verwenden, deaktiviert oder verzögert werden.
:::

#### Next.js

Für Next.js-Nutzer empfiehlt es sich, die ReactGantt-Komponente dynamisch mit deaktiviertem SSR zu importieren:

~~~js
import dynamic from 'next/dynamic';

const GanttDemo = dynamic(() => import('../components/GanttDemo'), {
  ssr: false
});

export default function GanttPage() {
  return (
    <div style={{height: '100vh' }}>
      <GanttDemo />
    </div>
  );
}
~~~
Dadurch wird sichergestellt, dass das Gantt-Diagramm nur im Browser geladen wird und Server-Rendering-Fehler vermieden werden.

#### Remix

In Remix empfiehlt es sich, die Gantt-Komponente clientseitig bedingt zu rendern:

~~~js
import { ClientOnly } from 'remix-utils/client-only';
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {

  return (
    <div style={{height: '100vh' }}>
      <ClientOnly fallback="{<p">Loading...</p>}>
        {() => <ReactGantt
          tasks={{/* ... */]}
          links={{/* ... */]}
        />}
      </ClientOnly>
    </div>
  );
}
~~~

Dieses Muster verzögert das Rendering, bis die Komponente im Browser geladen ist, und verhindert SSR-Probleme.

Nächste Schritte
-------------------

- Weitere Details zur Konfiguration von ReactGantt finden Sie in [diesem Artikel](integrations/react/configuration-props.md)
- Für fortgeschrittene Nutzungsmöglichkeiten siehe die [DHTMLX Gantt Dokumentation](guides.md) 

