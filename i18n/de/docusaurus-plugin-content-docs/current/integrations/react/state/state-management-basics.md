--- 
title: Grundlagen der Datenbindung und Zustandsverwaltung in React Gantt
sidebar_label: Grundlagen
description: "Überblick über die zwei Modelle der Datenbindung in React Gantt und das Basismuster zur Verwendung von React-Zustand als Quelle der Wahrheit, bevor Redux, Zustand, MobX, Jotai, XState oder Valtio integriert werden."
---

# Datenbindung & Zustandsverwaltung in React Gantt

React Gantt unterstützt **zwei Muster der Datenbindung**:

1. **React-Zustand als Quelle der Wahrheit** - _empfohlen für die meisten React-Apps_.  
2. **Gantt als Quelle der Wahrheit** - _nützlich für spezialisierte Anwendungsfälle_.  

Beide Ansätze sind gültig, aber wählen Sie eines aus und folgen Sie ihm konsequent, um unerwartetes Verhalten zu vermeiden.

Dieser Artikel erklärt beide Modi und zeigt grundlegende Beispiele für jeden.

Wenn Sie noch kein einfaches Diagramm rendert haben, beginnen Sie mit dem [Quick Start](integrations/react/quick-start.md).

## Datenmodelle

### React-Zustand als Quelle der Wahrheit (empfohlen)

In diesem Modell:

- bewahren Sie `tasks`, `links`, `resources`, `resourceAssignments` im React-Zustand oder in einer Zustand-Bibliothek auf
- übergeben Sie sie als Props an `<Gantt>`
- wenn ein Benutzer etwas ändert, ruft ReactGantt Ihren Callback `data.save` oder `data.batchSave` auf
- Sie aktualisieren den React-Zustand -> React rendert erneut -> ReactGantt liest die neuen Props erneut

Das ist die richtige Wahl, falls Ihre Seite weitere React-UI enthält, die dieselben Daten wie Gantt sehen muss, und wenn Ihre Anwendung zusätzliche React-Komponenten enthält oder einen State-Manager verwendet, der auf denselben Daten basiert.

Allerdings erfordert es eine häufigere Neuberechnung oder Neurenderung des Gantt.

### Gantt als Quelle der Wahrheit

In diesem Ansatz behandeln Sie ReactGantt und Ihr Backend als Hauptdatenhalter:

- ReactGantt lädt den anfänglichen Datensatz über `data.load`, über Props oder über einen imperativen API-Aufruf
- ReactGantt wendet Benutzereingriffe intern an und/oder sendet sie an den Server
- Sie **führen nicht** eine gespiegelte Kopie aller Tasks/Links im React-State, die ständig wieder in Props eingespeist wird

Der wesentliche Unterschied ist das Fehlen einer vollständigen Schleife - Benutzeränderungen aktualisieren den React-State nicht und React wendet nach jeder Änderung nicht erneut die aktualisierten Props an.

Dieses Modell ist sinnvoll, wenn Datensätze sehr groß sind, da es den Overhead reduziert, ständig React-State zu aktualisieren, wenn sich Gantt-Daten ändern, und große Stapeloperationen (wie Auto-Scheduling) vereinfacht, ohne wiederholte Neurenderungen.

Auf der anderen Seite geht die direkte Synchronisierung zwischen Gantt-Daten und Ihrem React-State verloren. Und wenn Sie Tasks/Links trotzdem in einem React-State speichern, müssen Sie sicherstellen, dass Sie Gantt's internen Zustand nicht versehentlich überschreiben.

## React-Zustand als Quelle der Wahrheit {#reactstateasthesourceoftruth}

In diesem Muster halten Sie alle Kerndatensammlungen im State und übergeben sie als Props (`tasks`, `links`, `resources`, `resourceAssignments`). Jedes Mal, wenn der Benutzer Tasks oder Links innerhalb des Gantt ändert (z. B. durch Erstellen oder Löschen eines Tasks), löst das Gantt einen Callback aus. In diesem Callback aktualisieren Sie Ihren React-State mit den neuen bzw. entfernten Daten. Sobald der State aktualisiert ist, rendert React die **ReactGantt**-Komponente erneut, die daraufhin die aktualisierten Props aus dem neuesten State liest.

### Minimalbeispiel mit React-Zustand

~~~tsx
import { useState } from 'react';
import Gantt, {
  Task,
  Link
} from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

import { demoData } from "./demoData";

export default function ReactStateGantt() {
  const [tasks, setTasks] = useState<Task[]>(demoData.tasks);
  const [links, setLinks] = useState<Link[]>(demoData.links);


  return (
    <div style={{ height: "100vh" }}>
      <Gantt
        tasks={tasks}
        links={links}
        data={{
          save: (entity, action, item, id) => {
            // Update React state here (see below for patterns)
            console.log("Change:", { entity, action, id, item });
          },
        }}
      />
    </div>
  );
}

~~~


Dies gibt Ihnen einen grundlegenden Startpunkt – React steuert, was über Props gerendert wird, Gantt meldet Änderungen über den `save`-Callback und macht React zum autoritativen Eigentümer der Daten.

Die nächsten Abschnitte zeigen die typischen Muster, die Sie in diesem Callback implementieren.

## Änderungen mit `data.save` behandeln {#handlingchangeswithdatasave}

Wenn Sie `data.save` bereitstellen, ruft ReactGantt diese Funktion bei jeder Änderung auf, die der Benutzer vornimmt:

~~~ts
(entity: string, action: string, item: any, id: string|number) => {...}
~~~

Wo:

- `entity` ist `"task" | "link" | "resource" | "resourceAssignment"`
- `action` ist `"create" | "update" | "delete"`
- `item` ist das erstellte/aktualisierte/gelöschte Objekt
- `id` ist die Objekt-ID

Hier ist ein einfaches Beispiel, das den React-State direkt aktualisiert:

~~~tsx
function handleSave(entity, action, item, id) {
  if (entity === "task") {
    setTasks((prev) => {
      if (action === "create") return [...prev, item];
      if (action === "update") return prev.map((t) => (t.id === id ? item : t));
      if (action === "delete") return prev.filter((t) => t.id !== id);
      return prev;
    });
  }

  if (entity === "link") {
    setLinks((prev) => {
      if (action === "create") return [...prev, item];
      if (action === "update") return prev.map((l) => (l.id === id ? item : l));
      if (action === "delete") return prev.filter((l) => l.id !== id);
      return prev;
    });
  }

  // Sie können dieselbe Idee bei Resources / ResourceAssignments verwenden, falls benötigt
}
~~~

In einer echten Anwendung speichern Sie diese Logik fast nie inline:

- in Redux Toolkit wird dies zu einem Reducer oder Thunk
- in Zustand/Jotai/MobX/Valtio sitzt es im Store
- für Server-Integration können Sie hier auch Ihre API aufrufen

Die Tutorials zum State-Management bauen auf diesem Muster auf; dieses Beispiel demonstriert lediglich den Startpunkt.

## Bulk-Updates mit `data.batchSave`

`data.save` ist der bequemste Einstiegspunkt, um Benutzereingaben abzubilden, aber es hat einen Nachteil – Auto Scheduling. Wenn Sie drag-and-drop vieler Tasks oder andere schwere Operationen in großen Projekten vermuten, können Sie in den **Batch-Modus** wechseln, indem Sie statt `data.save` `data.batchSave` verwenden. In diesem Modus stellt ReactGantt Ihnen gruppierte Änderungen bereit:

~~~ts
type GanttBatchChanges = {
  tasks?: Array<DataCallbackChange<Task>>;
  links?: Array<DataCallbackChange<Link>>;
  resources?: Array<DataCallbackChange<Resource>>;
  resourceAssignments?: Array<DataCallbackChange<ResourceAssignment>>;
};

interface DataCallbackChange<T> {
  entity: string;
  action: string;
  data: T;
  id: number | string;
}

~~~

Hier ist ein minimaler Use-Case:

~~~tsx
<ReactGantt
  // ...props mit Tasks/Links/Resources etc.
  data={{
    batchSave: (changes) => {
      console.log("Batch changes:", changes);

      if (changes.tasks) {
        setTasks((prev) => applyTaskBatch(prev, changes.tasks));
      }

      if (changes.links) {
        setLinks((prev) => applyLinkBatch(prev, changes.links));
      }

      // Gleiches gilt für Resources / Assignments, falls erforderlich
    },
  }}
/>

~~~

Wobei `applyTaskBatch`/`applyLinkBatch` kleine Helfer sind, die über `{ action, data, id }` iterieren und das aktualisierte Array zurückgeben.

Als Faustregel gilt:
- Verwenden Sie `batchSave`, wenn Sie viele Änderungen auf einmal erwarten, und/oder wenn Sie alle Änderungen in einer einzigen Backend-Anfrage senden möchten
- Verwenden Sie `save`, wenn die meisten Bearbeitungen einzelne Tasks/Links sind und/oder Sie die einfachste mögliche Integration wollen

## Daten in den React-Zustand laden

Im modellgetriebenen React-Modell erhält Gantt seine Daten über den React-State. Wo dieser Zustand herkommt, hängt vollständig von Ihrer Anwendungsarchitektur ab.

Es gibt drei gängige Wege, wie Entwickler ihren Zustand befüllen:

- [Lokaler Komponenten-Zustand](#localstate)
- [State-Manager (Redux Toolkit, Zustand, MobX, Jotai, XState, Valtio)](#statemanagers)
- [Daten aus einer API laden](#loadingfromapi)

### Lokaler Komponenten-Zustand {#localstate}

Dies ist nützlich für schnelle Demos, Prototypen oder kleine Anwendungen.

Daten stammen oft aus einer lokalen Seed-Datei, können aber auch berechnet oder abgeleitet werden.

~~~jsx
export default function GanttTemplatesDemo() {
  const [tasks, setTasks] = useState(projectData.tasks);
  const [links, setLinks] = useState(projectData.links);
  const [resources, setResources] = useState(projectData.resources);
  const [resourceAssignments, setResourceAssignments] = 
      useState(projectData.resourceAssignments);

  return (
    <div style={{height: '100vh'}}>
      <ReactGantt
        tasks={tasks}
        links={links}
        resources={resources}
        resourceAssignments={resourceAssignments}
      />
    </div>
  );
};
~~~

Dieses Muster ähnelt dem Einsatz eines State-Managers stark – der einzige Unterschied besteht darin, wo der Zustand lebt.

### State-Manager (Redux Toolkit, Zustand, MobX, Jotai, XState, Valtio) {#statemanagers}

In vielen Produktionsanwendungen lebt Gantt-Daten in einem globalen Store statt in einer Komponente.

ReactGantt integriert sich natürlich mit diesen Bibliotheken. Sie lesen Daten aus dem Store über Selektoren oder Store-Hooks und übergeben sie als Props an `<Gantt>`, genauso wie Sie es mit dem lokalen Zustand tun würden.

Hier einige Illustrationen dessen, wie das typischerweise aussieht.

**Redux Toolkit**

~~~ts
const { tasks, links } = useSelector((state: RootState) => state.gantt);
~~~

**Zustand**

~~~ts
const tasks = useGanttStore((state) => state.tasks);
~~~

**MobX**

~~~tsx
<Gantt tasks={store.tasks} links={store.links} />
~~~

Obwohl jede Bibliothek eine eigene API hat, ist das Integrationsmuster identisch – Sie liefern `tasks`, `links`, `resources` usw. als Props, Sie behandeln Benutzeraktualisierungen über `data.save` oder `data.batchSave`, der einzige Unterschied ist, wo der Zustand herkommt.

Die Tutorials zu State-Managern demonstrieren, wie dasselbe Muster in jeder spezifischen Bibliothek implementiert wird:

- [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Using React Gantt with Zustand](integrations/react/state/zustand.md)
- [Using React Gantt with MobX](integrations/react/state/mobx.md)
- [Using React Gantt with XState](integrations/react/state/xstate.md)
- [Using React Gantt with Jotai](integrations/react/state/jotai.md)
- [Using React Gantt with Valtio](integrations/react/state/valtio.md)

### Laden von Daten aus einer API {#loadingfromapi}

In echten Anwendungen laden Sie normalerweise Daten von einem Backend und platzieren sie im React-State (lokal oder global).

Nachfolgend ein ergänzendes, vollständigeres Beispiel, das typischen Einsatz widerspiegelt:

~~~tsx
import { useEffect, useState } from "react";
import Gantt, {
  Task,
  Link,
  Resource,
  ResourceAssignment,
  Calendar,
} from "@dhtmlx/trial-react-gantt";

interface GanttData {
  tasks: Task[];
  links: Link[];
  resources: Resource[];
  resourceAssignments: ResourceAssignment[];
}

export default function GanttWithApi() {
  const [data, setData] = useState<GanttData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/gantt-data");
        const raw = await response.json();

        const nextData: GanttData = {
          tasks: raw.tasks,
          links: raw.links,
          resources: raw.resources ?? [],
          resourceAssignments: raw.resourceAssignments ?? []
        };

        setData(nextData);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  if (isLoading || !data) {
    return <div>Loading Gantt...</div>;
  }

  return (
    <ReactGantt
      tasks={data.tasks}
      links={data.links}
      resources={data.resources}
      resourceAssignments={data.resourceAssignments}
      data={{
        save: (entity, action, item, id) => {
          // Update state and sync with backend here
        },
      }}
    />
  );
}
~~~


Dieser Ansatz lässt sich sauber mit State-Managern integrieren:

- Daten per Effect oder Thunk laden,
- sie in Redux/Zustand/MobX/etc. speichern,
- sie über Props an `<Gantt>` übergeben,
- Updates mit `save`/`batchSave` behandeln.

## Gantt als Quelle der Wahrheit in einer React-App {#ganttasthesourceoftruth}

Der zweite Bindungsmodus ist **Gantt als Quelle der Wahrheit**, bei dem Gantt (und optional Ihr Backend) als primärer Datenhalter behandelt wird.

React rendert die Komponente, hält aber **nicht** Tasks/Links/Resources als kanonischen Zustand, der nach jedem Update in Props fließen muss.

Dieses Modell eliminiert die `React state <-> Gantt`-Schleife vollständig.

### Wann dieses Modell sinnvoll ist

Verwenden Sie **Gantt als Quelle der Wahrheit**, wenn

- Datensätze sehr groß sind (Tausende von Tasks)
- Auto-Planung oder Massendaten-Updates häufig vorkommen
- React nicht bei jeder einzelnen Änderung in Echtzeit reagieren muss
- die Seite primär "Gantt-zentriert" ist

React bleibt verantwortlich für Layout, Routing und umliegende UI, aber Gantt besitzt den Lebenszyklus der Daten.

### Bereitstellung von Anfangsdaten

Auch in diesem Modell können Sie Gantt dennoch einen Anfangsdatensatz geben.
Der wesentliche Unterschied besteht darin, dass Sie Änderungen nicht kontinuierlich wieder in den React-State reflektieren.

Sie können Gantt mit jeder der folgenden Ansätze initialisieren: Daten über URLs laden, Daten über benutzerdefinierte Funktionen laden, einen initialen Schnappschuss über Props übergeben. Siehe unten für Details.

#### Laden von Daten über URLs

Gantt kann alles direkt von Ihrem Backend über REST-Endpunkte laden:

~~~tsx
<Gantt
  data={{
    load: "/api/gantt/load",
    save: "/api/gantt/save",
  }}
/>
~~~

- `data.load` wird einmalig bei der Initialisierung aufgerufen
- `data.save` wird ausgelöst, wann immer der Benutzer Tasks/Links bearbeitet

#### Laden von Daten über benutzerdefinierte Funktionen

Statt URLs können Sie asynchrone Funktionen bereitstellen:

~~~tsx
<Gantt
  data={{
    load: async () => {
      const res = await fetch("/api/gantt/load");
      return res.json();
    },
    save: async (entity, action, item, id) => {
      // siehe das untenstehende Beispiel
    },
  }}
/>
~~~

#### Übermittlung eines initialen Schnapsschusses über Props (one-way)

Sie können auch weiterhin Anfangsdaten über Props bereitstellen:

~~~tsx
<Gantt tasks={initialTasks} links={initialLinks} />
~~~

In diesem Fall sind die Props lediglich ein Startpunkt. Nach der Initialisierung führt Gantt seinen eigenen internen Store weiter. Sie füttern nach jeder Bearbeitung keine neuen Arrays erneut in Props, weil React in diesem Modell nicht als kanonischer Eigentümer der Daten gilt.

### Wie Updates funktionieren

Immer wenn Benutzer Daten erstellen, bearbeiten oder löschen, löst Gantt den Callback `save` (oder `batchSave`) aus.

Gantt weist zunächst temporäre IDs für neu erstellte Datensätze zu. Das Backend muss sie durch reale Datenbank-IDs ersetzen.

Diese Logik spiegelt wider, wie das DataProcessor-Modul im JS Gantt funktioniert (siehe [Server-Side Integration](guides/server-side.md) in den JS-Dokumentationen).

Wenn eine neue Task, ein Link, eine Ressource oder eine Zuordnung erstellt wird, muss der Aufruf von `save` ein Promise zurückgeben, das sich zu Folgendem auflöst:

~~~json
{ "id": "<Datenbank-ID>"}
~~~

Beispielsweise:

~~~ts
data.save = async (entity, action, item, id) => {
  if (action === "create") {
    const response = await fetch(`/api/${entity}`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json(); 
    // result sollte { id: newDatabaseId } enthalten
    return { id: result.id };
  }

  if (action === "update") {
    await fetch(`/api/${entity}/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" }
    });
    return {};
  }

  if (action === "delete") {
    await fetch(`/api/${entity}/${id}`, { method: "DELETE" });
    return {};
  }
};
~~~

Die Rückgabe von `{id: newId}` ermöglicht Gantt, die temporäre ID durch die permanente zu ersetzen. So stellen Sie sicher, dass nachfolgende Update-/Delete-Operationen den richtigen Datensatz in Ihrer Datenbank ansprechen.

#### Verwendung von `batchSave`

`batchSave` gruppiert mehrere Änderungen in einen einzigen Callback.
Da mehrere neue Datensätze möglicherweise zusammen erscheinen, erwartet Gantt nichts von `batchSave` zurückzugeben.

Beim Einsatz von `batchSave` müssen Sie neue Datensätze im Backend erstellen, deren permanente IDs erhalten und Gantt mithilfe imperativer API-Aufrufe aktualisieren, um temporäre IDs zu ersetzen:

~~~ts
gantt.changeTaskId(tempId, realId);
gantt.changeLinkId(tempId, realId);
~~~

## Was kommt als Nächstes

Sobald Sie die zwei Datenmodelle verinnerlicht haben, können Sie zu den spezifischen Tutorials übergehen.

State-Manager:

- [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Using React Gantt with Zustand](integrations/react/state/zustand.md)
- [Using React Gantt with MobX](integrations/react/state/mobx.md)
- [Using React Gantt with XState](integrations/react/state/xstate.md)
- [Using React Gantt with Jotai](integrations/react/state/jotai.md)
- [Using React Gantt with Valtio](integrations/react/state/valtio.md)

Oder erfahren Sie mehr über die Nutzung der imperativen API und serverseitige Kommunikation:

- [React Gantt Configuration](integrations/react/configuration-props.md)
- [Server-Side Integration](guides/server-side.md)