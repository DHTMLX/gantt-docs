---
title: "dhtmlxGantt mit React"
sidebar_label: "Low-Level-Integration"
---

# dhtmlxGantt mit React


:::note
Dieses Tutorial zeigt, wie Sie das JS DHTMLX Gantt in React-Anwendungen verwenden. Für die offizielle React Gantt-Komponente lesen Sie bitte den Artikel [React Gantt](integrations/react.md).
:::

Es ist hilfreich, ein grundlegendes Verständnis von [React](https://react.dev/) Konzepten und Mustern zu haben, bevor Sie mit dieser Anleitung arbeiten. Wenn Sie neu bei React sind, empfiehlt es sich, die [React-Dokumentation](https://reactjs.org/docs/getting-started.html) für eine einsteigerfreundliche Einführung zu lesen.

DHTMLX Gantt funktioniert gut mit React. Ein entsprechendes Beispiel finden Sie auf GitHub hier: [DHTMLX Gantt mit React Demo](https://github.com/DHTMLX/react-gantt-demo).

## Projekt erstellen

Bevor Sie ein neues Projekt erstellen, stellen Sie sicher, dass [Node.js](https://nodejs.org/en/) installiert ist.

Um schnell ein grundlegendes React-Projekt einzurichten, führen Sie folgenden Befehl aus:

~~~
npx create-vite my-react-gantt-app --template react
~~~

### Installation der Abhängigkeiten

Navigieren Sie anschließend in Ihren Projektordner. Angenommen, Ihr Projekt heißt **my-react-gantt-app**, führen Sie aus:

~~~
cd my-react-gantt-app
~~~

Installieren Sie dann die Abhängigkeiten und starten Sie den Entwicklungsserver. Je nach Paketmanager verwenden Sie:

- mit **yarn**:

~~~
yarn install
yarn dev
~~~

- mit **npm**:

~~~
npm install
npm run dev
~~~

Ihre React-App sollte jetzt unter [http://localhost:5173](http://localhost:5173) erreichbar sein.

![Gantt React app running](/img/gantt_react_app_run.png)

## Gantt erstellen

Als Nächstes holen wir uns den DHTMLX Gantt-Code. Stoppen Sie zunächst die laufende App durch Drücken von **Strg+C** im Terminal. Installieren Sie dann das Gantt-Paket.

## Schritt 1. Paketinstallation

Die PRO-Versionen der Bibliothek sind über **npm/yarn** aus unserem privaten Repository verfügbar. Bitte folgen Sie 
[dieser Anleitung](guides/installation.md#npmevaluationandproversions), um Zugang zu erhalten.

Sobald Sie die Evaluierungsversion haben, installieren Sie sie mit diesen Befehlen:

- für npm:

~~~
npm install @dhx/trial-gantt
~~~

- für yarn:

~~~
yarn add @dhx/trial-gantt
~~~

Alternativ, da das Bibliotheks-Zip-Paket als **npm**-Modul strukturiert ist, können Sie es auch 
[aus einem lokalen Ordner installieren](guides/installation.md#installfromlocalfolder).

## Schritt 2. Komponentenerstellung

Erstellen Sie nun eine React-Komponente, um Gantt in Ihre App zu integrieren. Fügen Sie eine neue Datei mit dem Namen ***Gantt.jsx*** im Verzeichnis ***src/*** hinzu.

### Importieren der Quelldateien

Öffnen Sie ***Gantt.jsx*** und importieren Sie die Gantt-Quelldateien. Beachten Sie Folgendes:

- Wenn Sie das Gantt-Paket aus einem lokalen Ordner installiert haben, sehen Ihre Imports so aus:

**Gantt.jsx**
~~~
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- Wenn Sie die Trial-Version installiert haben, verwenden Sie diese Importpfade:

**Gantt.jsx**
~~~
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

In dieser Anleitung verwenden wir die **Trial**-Version.

### Container festlegen und Gantt einbinden

Um Gantt auf der Seite darzustellen, wird ein Container-Element benötigt. Die Datei ***Gantt.jsx*** sollte Folgendes enthalten:

**Gantt.jsx**
~~~
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

## Schritt 3. Gantt in die App einbinden

Fügen Sie als Nächstes die Gantt-Komponente in Ihre App ein. Öffnen Sie ***src/app.jsx*** und ersetzen Sie den Standardinhalt durch:

**src/app.jsx**
~~~
import Gantt from "./Gantt";

function App() {
  return <Gantt/>;
}

export default App;
~~~

Um sicherzustellen, dass der Gantt-Container den gesamten Body ausfüllt, entfernen Sie die Standard-Styles aus ***index.css*** in ***src/*** und fügen Sie Folgendes hinzu:

**src/index.css**
~~~
html,
body,
#root {
  height: 100%;
  padding: 0;
  margin: 0;
}
~~~

Wenn Sie die App erneut starten, sollte ein leerer Gantt-Chart auf der Seite erscheinen:

![Gantt React init](/img/gantt_init.png)

## Schritt 4. Daten bereitstellen

Um Aufgaben im Gantt anzuzeigen, stellen Sie einen Datensatz bereit. Erstellen Sie eine Datei ***data.js*** in ***src/*** mit folgendem Inhalt:

**src/data.js**
~~~
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

Übergeben Sie diese Daten als Props an die Gantt-Komponente in ***App.jsx***:

**App.jsx**
~~~
import Gantt from "./Gantt";
import { getData } from "./data.js";

function App() {
  return <Gantt tasks="{getData()}" />;
}

export default App;
~~~

Verwenden Sie dann die Props innerhalb der **gantt.parse()**-Methode in der Gantt-Komponente:

**Gantt.jsx**
~~~
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

Nach dem Neuladen der App sollte das Gantt-Diagramm mit Aufgaben angezeigt werden:

![Gantt tasks](/img/gantt_tasks.png)

## Schritt 5. Daten speichern

Um Änderungen im Gantt zu verarbeiten, können Sie einen [dataProcessor](api/method/dataprocessor.md) verwenden, der die Kommunikation mit Ihrem Backend ermöglicht. Der dataProcessor kann als Funktion oder Router-Objekt definiert werden. dhtmlxGantt unterstützt Promise-Antworten vom Handler und ermöglicht so eine korrekte Verarbeitung von Aktionen.

Erstellen Sie einen **DataProcessor** mit **createDataProcessor()** und hören Sie Änderungen wie folgt ab:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Wenn Ihr Backend nach dem Erstellen eines Eintrags eine neue ID vergibt (übliches Verhalten), stellen Sie sicher, dass das Promise ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** zurückgibt, damit Gantt den Eintrag entsprechend aktualisieren kann. Weitere Details finden Sie unter [server side integration](guides/server-side.md).

Mit dieser Einrichtung ist Ihr React Gantt einsatzbereit. Sie können das vollständige Demo auf GitHub ansehen: [https://github.com/DHTMLX/react-gantt-demo](https://github.com/DHTMLX/react-gantt-demo).

## XSS-, CSRF- und SQL-Injection-Angriffe

Beachten Sie, dass Gantt selbst keinen Schutz gegen Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffe bietet. Die Sicherheit der Anwendung liegt in der Verantwortung der Entwickler, die das Backend verwalten.

Lesen Sie den Artikel [Application Security](guides/app-security.md) für Einblicke in gängige Schwachstellen und Empfehlungen zur Erhöhung der Sicherheit Ihrer App.
