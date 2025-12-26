---
title: "dhtmlxGantt mit Svelte"
sidebar_label: "Svelte"
---

# dhtmlxGantt mit Svelte

Diese Anleitung setzt grundlegende Kenntnisse der Svelte-Konzepte und -Muster voraus. Falls nicht, findest du ein hilfreiches Einstiegs-Tutorial in der [Svelte-Dokumentation](https://svelte.dev/).

DHTMLX Gantt funktioniert gut mit Svelte. Ein funktionierendes Beispiel findest du auf GitHub: [DHTMLX Gantt mit Svelte Demo](https://github.com/DHTMLX/svelte-gantt-demo).

## Projekt erstellen

Bevor du ein neues Projekt startest, solltest du idealerweise [Vite](https://vite.dev/) (optional) und [Node.js](https://nodejs.org/en/) installiert haben.

Um ein Svelte-Projekt einzurichten, verwenden wir Vite. Führe diesen Befehl aus:

~~~
npm create vite@latest
~~~

Weitere Details findest du im [entsprechenden Artikel](https://svelte.dev/docs/introduction#start-a-new-project-alternatives-to-sveltekit).

### Installation der Abhängigkeiten

Navigiere anschließend in dein App-Verzeichnis. Wir nennen das Projekt **gantt-svelte** und wählen die Option **svelte** aus. Dann führe aus:

~~~
cd gantt-svelte
~~~

Nun installiere die Abhängigkeiten und starte die App mit deinem bevorzugten Paketmanager:

- Für **yarn**, führe aus:

~~~
yarn install
yarn dev
~~~

- Für **npm**, führe aus:

~~~
npm install
npm run dev
~~~

Dein Svelte-Projekt sollte jetzt unter [http://localhost:5173](http://localhost:5173) laufen.

![Gantt Svelte App läuft](/img/gantt_svelte_app_run.png)

## Gantt erstellen

Um DHTMLX Gantt hinzuzufügen, stoppe zunächst die App mit **Strg+C** im Terminal. Fahre dann mit der Installation des Gantt-Pakets fort.

## Schritt 1. Paketinstallation

Die PRO-Versionen der Bibliothek sind über **npm/yarn** aus unserem privaten Repository verfügbar. Bitte folge 
[dieser Anleitung](guides/installation.md#npmevaluationandproversions), um Zugriff zu erhalten.

Sobald du die Evaluierungsversion hast, installiere sie mit:

- Für npm:

~~~
npm install @dhx/trial-gantt
~~~

- Für yarn:

~~~
yarn add @dhx/trial-gantt
~~~

Alternativ, da das ZIP-Paket der Bibliothek als **npm**-Modul strukturiert ist, kannst du sie auch 
[aus einem lokalen Ordner installieren](guides/installation.md#installfromlocalfolder).

## Schritt 2. Komponentenerstellung

Erstelle als Nächstes eine Svelte-Komponente, um Gantt in deiner App einzubinden. Lege eine neue Datei namens ***Gantt.svelte*** im ***src/***-Ordner an.

### Quell-Dateien importieren

Öffne ***Gantt.svelte*** und importiere die Gantt-Quelldateien. Beachte dabei:

- Wenn du das Gantt-Paket aus einem lokalen Ordner installiert hast, sehen deine Importe so aus:

**Gantt.svelte**
~~~
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~

- Wenn du die Trial-Version installiert hast, verwende diese Importe:

**Gantt.svelte**
~~~
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

Diese Anleitung verwendet die **Trial**-Version.

### Container festlegen und Gantt hinzufügen

Um Gantt auf der Seite anzuzeigen, definiere einen Container für die Komponente. Hier ein Beispiel:

**Gantt.svelte**
~~~html
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

Damit der Gantt-Container den gesamten Body ausfüllt, entferne Standard-Styles aus ***app.css*** im ***src/***-Ordner und füge Folgendes hinzu:

**src/app.css**
~~~
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## Schritt 3. Gantt zur App hinzufügen

Füge nun die Gantt-Komponente in die App ein. Öffne ***src/App.svelte*** und ersetze den Standardinhalt mit:

**src/App.svelte**
~~~
<script>
  import Gantt from "./Gantt.svelte";
</script>

<Gantt/>
~~~

Nach dem Starten der App sollte nun ein leerer Gantt-Chart angezeigt werden:

![Gantt Svelte Init](/img/gantt_init.png)

## Schritt 4. Daten bereitstellen

Um den Gantt zu befüllen, stelle Daten bereit. Erstelle eine Datei ***data.js*** in ***src/*** und füge Folgendes hinzu:

**src/data.js**
~~~js
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

Übergebe diese Daten als Props an die Gantt-Komponente in **App.svelte**:

**App.svelte**
~~~html
<script>
  import Gantt from "./Gantt.svelte";
  import { getData } from "./data.js";
</script>

<Gantt tasks="{getData()}" />
~~~

Nutze dann die Props innerhalb der Gantt-Komponente mit **gantt.parse()**:

**Gantt.svelte**
~~~html
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

Nach dem Neuladen der App sollte nun ein Gantt-Chart mit Aufgaben angezeigt werden:

![Gantt Aufgaben](/img/gantt_tasks.png)

## Schritt 5. Daten speichern

Um Änderungen im Gantt zu verfolgen, kannst du einen [dataProcessor](api/method/dataprocessor.md)-Handler verwenden. Dieser erleichtert die Kommunikation mit dem Backend und kann als Funktion oder Router-Objekt definiert werden. dhtmlxGantt unterstützt Promise-Antworten, um Aktionen korrekt zu verarbeiten.

Erstelle einen **DataProcessor** mit **createDataProcessor()**, um Änderungen wie folgt abzufangen:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Falls dein Backend nach dem Erstellen neuer Datensätze die Task-IDs ändert, stelle sicher, dass das Promise ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** zurückgibt, damit Gantt den Datensatz entsprechend aktualisieren kann. Weitere Details zur Server-seitigen Integration findest du [hier](guides/server-side.md).

Damit ist dein Svelte Gantt-Setup bereit. Du kannst das vollständige Demo auf GitHub erkunden: [https://github.com/DHTMLX/svelte-gantt-demo](https://github.com/DHTMLX/svelte-gantt-demo).

## XSS-, CSRF- und SQL-Injection-Angriffe

Es ist wichtig zu beachten, dass Gantt keinen eingebauten Schutz gegen Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffe bietet. Die Absicherung deiner Anwendung gegen solche Risiken liegt in der Verantwortung der Backend-Entwickler.

Weitere Informationen zu potenziellen Schwachstellen und empfohlenen Sicherheitspraktiken findest du im Artikel [Application Security](guides/app-security.md).
