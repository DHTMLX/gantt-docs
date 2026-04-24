--- 
title: "dhtmlxGantt mit Svelte"
sidebar_label: "Svelte"
---

# dhtmlxGantt mit Svelte

Sie sollten mit den grundlegenden Konzepten und Mustern von Svelte vertraut sein, um diese Dokumentation zu verwenden. Wenn Sie damit nicht vertraut sind, lesen Sie bitte die [Svelte-Dokumentation](https://svelte.dev/) für ein Einsteiger-Tutorial.

DHTMLX Gantt ist mit Svelte kompatibel. Sie können das entsprechende Beispiel auf GitHub überprüfen: [DHTMLX Gantt mit Svelte Demo](https://github.com/DHTMLX/svelte-gantt-demo).

## Ein Projekt erstellen

Bevor Sie ein neues Projekt erstellen, installieren Sie [Vite](https://vite.dev/) (optional) und [Node.js](https://nodejs.org/en/).

Um ein Svelte-Projekt zu erstellen, verwenden wir Svelte mit Vite und führen den folgenden Befehl aus:

~~~ 
npm create vite@latest
~~~

Details finden Sie im entsprechenden Artikel.

### Installation der Abhängigkeiten

Als Nächstes wechseln Sie in das App-Verzeichnis. Wir benennen unser Projekt **gantt-svelte** und wählen die **svelte**-Option, dann führen Sie Folgendes aus:

~~~ 
cd gantt-svelte
~~~

Anschließend installieren Sie die Abhängigkeiten und starten die App. Dazu verwenden Sie einen Paketmanager:

- wenn Sie **yarn** verwenden, rufen Sie die folgenden Befehle auf:

~~~ 
yarn install
yarn dev
~~~

- wenn Sie **npm** verwenden, rufen Sie die folgenden Befehle auf:

~~~ 
npm install
npm run dev
~~~

Sie sollten jetzt Ihr Svelte-Projekt unter **http://localhost:5173** laufen sehen.

![Gantt Svelte app running](/img/gantt_svelte_app_run.png)

## Gantt erstellen

Nun sollten wir den DHTMLX Gantt-Code erhalten. Zuerst müssen Sie die App durch Drücken von **Ctrl+C** in der Kommandozeile stoppen. Dann können wir mit der Installation des Gantt-Pakets fortfahren.

## Schritt 1. Paketinstallation

Die PRO-Versionen der Bibliothek sind für die Installation über **npm/yarn** aus unserem privaten Repository verfügbar. Bitte folgen Sie [dieser Anleitung](guides/installation.md#npmevaluationandproversions), um Zugriff dazu zu erhalten.

Nachdem Sie die Evaluationsversion von Gantt erhalten haben, können Sie sie mit den folgenden Befehlen installieren:

- für npm:

~~~ 
npm install @dhx/trial-gantt
~~~

- für yarn:

~~~ 
yarn add @dhx/trial-gantt
~~~

Alternativ, da das Zip-Paket der Bibliothek als **npm**-Modul strukturiert ist, können Sie es [aus einem lokalen Ordner installieren](guides/installation.md#installfromlocalfolder).

## Schritt 2. Komponenten-Erstellung

Nun sollten wir eine Svelte-Komponente erstellen, um einen Gantt in die Anwendung einzufügen. Erstellen Sie eine neue Datei im Verzeichnis ***src/*** und benennen Sie sie ***Gantt.svelte***.

### Importieren von Quellcode-Dateien

Öffnen Sie die neu erstellte ***Gantt.svelte***-Datei und importieren Sie Gantt-Quellcode-Dateien. Beachten Sie, dass:

- Wenn Sie das Gantt-Paket aus einem lokalen Ordner installiert haben, sehen Ihre Importpfade so aus:

~~~js title="Gantt.svelte"
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- Wenn Sie sich entschieden haben, die Trial-Version zu installieren, sollten die Importpfade wie folgt lauten:

~~~js title="Gantt.svelte"
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

In diesem Tutorial verwenden wir die **trial**-Version von Gantt.

### Festlegen des Containers und Hinzufügen von Gantt

Um Gantt auf der Seite anzuzeigen, müssen wir den Container festlegen, in dem die Komponente gerendert wird. Siehe den Code unten:

~~~html title="Gantt.svelte"
<script>
    import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
    import { onMount } from "svelte";
    import { Gantt } from "@dhx/trial-gantt";
      
    let container;
    onMount(() => {
        let gantt = Gantt.getGanttInstance();
        gantt.init(container);

        return () => {
            gantt.destructor();
        };
    });
</script>

<div bind:this="{container}" style="width: 100%; height: 100%;"></div>
~~~

Damit der Gantt-Container den gesamten Platz des Bodys einnimmt, entfernen Sie die Standard-Stile aus der ***app.css***-Datei im ***src/***-Verzeichnis und fügen Sie Folgendes hinzu:

~~~css title="src/app.css"
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## Schritt 3. Hinzufügen von Gantt in die App

Nun ist es Zeit, die Komponente in unsere App einzufügen. Öffnen Sie ***src/App.svelte*** und verwenden Sie die Gantt-Komponente statt des Standardinhalts, indem Sie den untenstehenden Code einfügen:


~~~js title="src/App.svelte"
<script>
  import Gantt from "./Gantt.svelte";
</script>

<Gantt/>
~~~

Nachdem Sie die App gestartet haben, sollten Sie ein leeres Gantt auf der Seite sehen:

![Gantt Svelte init](/img/gantt_init.png)

## Schritt 4. Bereitstellung von Daten

Um Daten in das Gantt zu übernehmen, müssen wir einen Datensatz bereitstellen. Erstellen Sie die Datei ***data.js*** im ***src/***-Verzeichnis und fügen Sie einige Daten hinzu:


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

Wir sollten [Props übergeben (unsere Daten)](https://svelte.dev/tutorial/svelte/declaring-props) an die Gantt-Komponente in der **App.svelte**-Datei:


~~~html title="App.svelte"
<script>
  import Gantt from "./Gantt.svelte";
  import { getData } from "./data.js";
</script>

<Gantt tasks="{getData()}" />
~~~


Und verwenden Sie die Props in der **gantt.parse()**-Methode in der Gantt-Komponente:

~~~html title="Gantt.svelte"
<script>
    import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
    import { onMount } from "svelte";
    import { Gantt } from "@dhx/trial-gantt";
    
    export let tasks;
    
    let container;
    onMount(() => {
        let gantt = Gantt.getGanttInstance();
        gantt.init(container);
        gantt.parse(tasks);

        return () => {
            gantt.destructor();
        };
    });
</script>

<div bind:this="{container}" style="width: 100%; height: 100%;"></div>
~~~

Jetzt, wenn Sie die App-Seite erneut öffnen, sollten Sie eine Gantt mit Aufgaben sehen:

![Gantt tasks](/img/gantt_tasks.png)

## Schritt 5. Speichern von Daten

Um Änderungen, die im Gantt vorgenommen werden, zu erfassen, können Sie einen [dataProcessor](api/method/dataprocessor.md) Handler verwenden, der eine „Kommunikation“ mit dem serverseitigen Backend ermöglicht. Der Handler kann entweder als Funktion oder als Router-Objekt deklariert werden. dhtmlxGantt akzeptiert eine Promise-Antwort vom Handler, sodass Ihr Gantt die Beendigung einer Aktion korrekt verarbeitet. 

Sie können einen **DataProcessor** über die API-Methode **createDataProcessor()** erstellen und Änderungen wie folgt erfassen:

~~~ 
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Wenn Ihr Service die Task-ID nach dem Erstellen eines neuen Datensatzes ändert (was er üblicherweise tut), stellen Sie sicher, dass Ihre Promise ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** als Ergebnis zurückgibt, damit Gantt die neue Datenbank-ID dem Datensatz zuordnen kann. Mehr Informationen über die Serverseite finden Sie unter [Server-Seite](guides/server-side.md).

Nun ist Svelte Gantt bereit, Sie können gerne [die vollständige Demo auf GitHub](https://github.com/DHTMLX/svelte-gantt-demo) ansehen.

## XSS-, CSRF- und SQL-Injektion-Angriffe

Beachten Sie, dass Gantt keine Mittel bereitstellt, um eine Anwendung vor verschiedenen Bedrohungen zu schützen, wie z. B. SQL-Injektionen oder XSS- und CSRF-Angriffe. Es ist wichtig, dass die Verantwortung für die Sicherheit der Anwendung von den Entwicklern getragen wird, die das Backend implementieren.

Lesen Sie den Artikel [Anwendungssicherheit](guides/app-security.md), um die verwundbarsten Punkte der Komponente kennenzulernen und die Maßnahmen zu verstehen, die Sie ergreifen können, um die Sicherheit Ihrer Anwendung zu verbessern.