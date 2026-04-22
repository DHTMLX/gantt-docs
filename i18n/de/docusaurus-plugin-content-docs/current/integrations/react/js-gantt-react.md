---
title: dhtmlxGantt mit React
sidebar_label: Niedrigstufige Integration
description: "Schritt-für-Schritt-Anleitung zur Verwendung von Gantt in React ohne Wrapper"
---

# dhtmlxGantt mit React

:::note
Dieses Tutorial behandelt die Verwendung des JS DHTMLX Gantt in React-Apps. Wenn Sie die offizielle React Gantt-Komponente verwenden möchten, lesen Sie bitte den [React Gantt](integrations/react.md)-Artikel.
:::

Sie sollten mit den grundlegenden Konzepten und Mustern von [React](https://react.dev/) vertraut sein, um diese Dokumentation zu verwenden. Falls Sie nicht vertraut sind, lesen Sie bitte die [React-Dokumentation](https://react.dev/learn) für ein Schnellstart-Tutorial.

DHTMLX Gantt ist mit React kompatibel. Sie können das entsprechende Beispiel auf GitHub einsehen: [DHTMLX Gantt mit React Demo](https://github.com/DHTMLX/react-gantt-demo). 

## Erstellung eines Projekts

Bevor Sie ein neues Projekt erstellen, installieren Sie [Node.js](https://nodejs.org/en/).

Sie können ein grundlegendes React-Projekt mit dem folgenden Befehl erstellen:

~~~ 
npx create-vite my-react-gantt-app --template react
~~~

### Installation der Abhängigkeiten

Als Nächstes wechseln Sie in das App-Verzeichnis. Wir nennen unser Projekt **my-react-gantt-app** und führen Folgendes aus:

~~~ 
cd my-react-gantt-app
~~~

Anschließend sollten Sie Abhängigkeiten installieren und den Entwickl-Server starten. Dafür verwenden Sie einen Paketmanager:

- falls Sie **yarn** verwenden, führen Sie die folgenden Befehle aus:

~~~ 
yarn install
yarn dev
~~~

- falls Sie **npm** verwenden, führen Sie die folgenden Befehle aus:

~~~ 
npm install
npm run dev
~~~

Sie sollten Ihr React-Projekt nun unter **http://localhost:5173** laufen sehen.

![Gantt React app running](/img/gantt_react_app_run.png)

## Erstellung des Gantt

Nun sollten wir den DHTMLX Gantt-Code erhalten. Zunächst müssen wir die Anwendung durch Drücken von **Ctrl+C** in der Befehlszeile stoppen. Danach können wir mit der Installation des Gantt-Pakets fortfahren.

## Schritt 1. Paketinstallation

Die PRO-Versionen der Bibliothek sind für die **npm/yarn**-Installation aus unserem privaten Repository verfügbar. Bitte folgen Sie [dieser Anleitung](guides/installation.md#npmevaluationandproversions), um Zugriff darauf zu erhalten.

Sobald Sie die Evaluierungsversion des Gantt erhalten haben, können Sie sie mit den folgenden Befehlen installieren:

- für npm:

~~~ 
npm install @dhx/trial-gantt
~~~

- für yarn:

~~~ 
yarn add @dhx/trial-gantt
~~~

Alternativ, da das Zip-Paket der Bibliothek als **npm**-Modul strukturiert ist, können Sie es [von einem lokalen Ordner installieren](guides/installation.md#installfromlocalfolder).

## Schritt 2. Komponentenerstellung

Nun sollten wir eine React-Komponente erstellen, um ein Gantt in die Anwendung einzufügen. Erstellen Sie die ***Gantt.jsx***-Datei im ***src/*** Verzeichnis.

### Importieren der Quelldateien

Öffnen Sie die neu erstellte ***Gantt.jsx***-Datei und importieren Sie die Gantt-Quelldateien. Beachten Sie Folgendes:

- Wenn Sie das Gantt-Paket aus einem lokalen Ordner installiert haben, sehen Ihre Importpfade wie folgt aus:

~~~js title="Gantt.jsx"
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- Wenn Sie die Trial-Version installiert haben, sollten die Importpfade wie folgt aussehen:

~~~js title="Gantt.jsx"
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~ 

In diesem Tutorial verwenden wir die **trial** Version von Gantt.

### Festlegen des Containers und Hinzufügen von Gantt

Um Gantt auf der Seite anzuzeigen, müssen wir den Container festlegen, in dem die Komponente gerendert wird. Die ***Gantt.jsx***-Datei sollte den folgenden Code enthalten:

~~~js title="Gantt.jsx"
import { useEffect, useRef } from "react"; /*!*/
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default function GanttView() { /*!*/
  let container = useRef(); /*!*/

  useEffect(() => { /*!*/
    let gantt = Gantt.getGanttInstance(); /*!*/
    gantt.init(container.current); /*!*/

    return () => { /*!*/
      gantt.destructor(); /*!*/
      container.current.innerHTML = ""; /*!*/
    }; /*!*/
  }, []); /*!*/

  return <div ref="{container}" style="{" {width: "100%", height: "100%"} }></div>; /*!*/
} /*!*/
~~~ 

## Schritt 3. Gantt in die App einfügen

Nun ist es Zeit, die Komponente in unsere App einzufügen. Öffnen Sie ***src/app.jsx*** und verwenden Sie die Gantt-Komponente anstelle des Standardinhalts, indem Sie den folgenden Code einfügen:

~~~js title="src/app.jsx"
import Gantt from "./Gantt";

function App() {
  return <Gantt/>;
}

export default App;
~~~

Damit der Gantt-Container den gesamten Bereich des Bodys ausfüllt, entfernen Sie die Standardstilregeln aus der ***index.css***-Datei im ***src/*** Ordner und fügen Sie die folgende hinzu:

~~~css title="src/index.css"
html,
body,
#root {
  height: 100%;
  padding: 0;
  margin: 0;
}
~~~

Danach sollten wir beim Start der App ein leeres Gantt auf der Seite sehen:

![Gantt React init](/img/gantt_init.png)

## Schritt 4. Bereitstellung von Daten

Um Daten in das Gantt einzufügen, müssen wir einen Datensatz bereitstellen. Erstellen Sie die Datei ***data.js*** im ***src/***-Verzeichnis und fügen Sie einige Daten hinzu:

~~~js title="src/data.js"
export function getData() {
  const tasks = {
    data: [
      {
        id: "10",
        text: "Project #1",
        start_date: "01-04-2025",
        duration: 3,
        order: 10,
        progress: 0.4,
        open: true,
      },
      {
        id: "1",
        text: "Task #1",
        start_date: "01-04-2025",
        duration: 1,
        order: 10,
        progress: 0.6,
        parent: "10",
      },
      {
        id: "2",
        text: "Task #2",
        start_date: "02-04-2025",
        duration: 2,
        order: 20,
        progress: 0.6,
        parent: "10",
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
  };
  return tasks;
}
~~~

Wir sollten [Props übergeben (unsere Daten)](https://react.dev/learn/passing-props-to-a-component) zu einer Gantt-Komponente in ***App.jsx***:

~~~js title="Gantt.jsx"
import Gantt from "./Gantt";
import { getData } from "./data.js";

function App() {
  return <Gantt tasks="{getData()}" />;
}

export default App;
~~~

Und verwenden Sie die Props in der **gantt.parse()**-Methode der Gantt-Komponente:

~~~js title="Gantt.jsx"
import { useEffect, useRef } from "react";
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default function GanttView(props) {
  let container = useRef();

  useEffect(() => {
    let gantt = Gantt.getGanttInstance();
    gantt.init(container.current);
    gantt.parse(props.tasks); /*!*/

    return () => {
      gantt.destructor();
      container.current.innerHTML = "";
    };
  }, []);

  return <div ref="{container}" style="{" {width: "100%", height: "100%"} }></div>;
}
~~~ 

Nun, wenn Sie die App-Seite erneut öffnen, sollten Sie ein Gantt mit Aufgaben sehen:

![Gantt tasks](/img/gantt_tasks.png)

## Schritt 5. Speichern von Daten

Um Änderungen im Gantt zu erfassen, können Sie einen [dataProcessor](api/method/dataprocessor.md)-Handler verwenden, der eine Kommunikation mit dem serverseitigen Backend ermöglicht. Der Handler kann entweder als Funktion oder als Router-Objekt deklariert werden. dhtmlxGantt akzeptiert eine Promise-Antwort vom Handler, sodass Ihr Gantt die Ausführung einer Aktion korrekt verarbeitet.

Sie können einen **DataProcessor** über die API-Methode **createDataProcessor()** erstellen und Änderungen so erfassen:

~~~ 
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Falls Ihr Service die Aufgaben-ID nach dem Anlegen eines neuen Datensatzes ändert (was üblicherweise der Fall ist), stellen Sie sicher, dass Ihre Promise ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** als Ergebnis zurückgibt, damit Gantt die neue Datenbank-ID dem Datensatz zuweisen kann. Erfahren Sie [weitere Informationen zur Server-Seite](guides/server-side.md).

Nun ist React Gantt bereit. Sie können sich die vollständige Demo auf GitHub ansehen: [DHTMLX Gantt mit React Demo](https://github.com/DHTMLX/react-gantt-demo).

## XSS-, CSRF- und SQL-Injektionsangriffe

Achten Sie darauf, dass Gantt keine Mittel zur Verhinderung von Bedrohungen in einer Anwendung bietet, wie SQL-Injektionen oder XSS- und CSRF-Angriffe. Es ist wichtig, dass die Verantwortung für die Sicherheit einer Anwendung von den Entwicklern getragen wird, die das Backend implementieren.

Lesen Sie den Artikel [Anwendungssicherheit](guides/app-security.md), um die verwundbarsten Punkte der Komponente zu erfahren und die Maßnahmen zu lernen, die Sie ergreifen können, um die Sicherheit Ihrer Anwendung zu verbessern.