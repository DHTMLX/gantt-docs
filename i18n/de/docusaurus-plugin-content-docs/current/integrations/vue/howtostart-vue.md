---
title: "dhtmlxGantt mit Vue.js"
sidebar_label: "Vue.js"
---

# dhtmlxGantt mit Vue.js

Sie sollten mit den grundlegenden Konzepten und Mustern von [Vue](https://vuejs.org/) vertraut sein, um diese Dokumentation zu verwenden. Falls nicht, lesen Sie bitte die [Vue 3-Dokumentation](https://vuejs.org/guide/introduction.html) für eine Einführung.

DHTMLX Gantt ist mit Vue kompatibel. Das entsprechende Beispiel finden Sie auf GitHub: [DHTMLX Gantt with Vue Demo](https://github.com/DHTMLX/vue-gantt-demo).

## Erstellen eines Projekts

Bevor Sie ein neues Projekt erstellen, installieren Sie [Node.js](https://nodejs.org/en/).

Um ein Vue-Projekt zu erstellen, führen Sie folgenden Befehl aus:

~~~
npm create vue@latest
~~~

Dieser Befehl installiert und führt **create-vue** aus, das offizielle Vue-Projekt-Scaffolding-Tool. Details finden Sie im [Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).

### Installation der Abhängigkeiten

Als Nächstes wechseln Sie in das App-Verzeichnis. Benennen wir unser Projekt **gantt-vue** und führen Sie Folgendes aus:

~~~
cd gantt-vue
~~~

Anschließend installieren Sie die Abhängigkeiten und starten den Entwicklungsserver. Dafür verwenden Sie einen Paketmanager:

- Wenn Sie **yarn** verwenden, führen Sie die folgenden Befehle aus:

~~~
yarn install
yarn dev
~~~

- Wenn Sie **npm** verwenden, führen Sie die folgenden Befehle aus:

~~~
npm install
npm run dev
~~~

Ihr Vue-Projekt läuft jetzt unter **http://localhost:5173**.

![Gantt Vue app running](/img/gantt_vue_app_run.png)

## Erstellen von Gantt

Jetzt sollten wir den DHTMLX Gantt-Code erhalten. Zunächst müssen wir die Anwendung durch Drücken von **Ctrl+C** in der Kommandozeile stoppen. Dann können wir mit der Installation des Gantt-Pakets fortfahren.

## Schritt 1. Paketinstallation

Die PRO-Versionen der Bibliothek sind für die **npm/yarn**-Installation aus unserem privaten Repository verfügbar. Bitte folgen Sie [dieser Anleitung](guides/installation.md#npmevaluationandproversions), um Zugriff darauf zu erhalten.

Nachdem Sie die Evaluation-Version des Gantt erhalten haben, können Sie sie mit den folgenden Befehlen installieren:

- für npm:

~~~
npm install @dhx/trial-gantt
~~~

- für yarn:

~~~
yarn add @dhx/trial-gantt
~~~

Alternativ, da das ZIP-Paket der Bibliothek als **npm**-Modul strukturiert ist, können Sie es [aus einem lokalen Ordner installieren](guides/installation.md#installfromlocalfolder).

## Schritt 2. Erstellung der Komponente

Nun sollten wir eine Vue-Komponente erstellen, um ein Gantt in die Anwendung einzufügen. Erstellen Sie eine neue Datei im Verzeichnis ***src/components/*** und benennen Sie sie ***Gantt.vue***.

### Importieren der Quelldateien

Öffnen Sie die neu erstellte Datei ***Gantt.vue*** und importieren Sie die Gantt-Quelldateien. Beachten Sie, dass:

- Wenn Sie das Gantt-Paket aus einem lokalen Ordner installiert haben, sehen Ihre Importpfade so aus:

~~~js title="Gantt.vue"
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- Wenn Sie sich entschieden haben, die Trial-Version zu installieren, sollten die Importpfade wie folgt aussehen:

~~~js title="Gantt.vue"
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

In diesem Tutorial verwenden wir die **trial**-Version von Gantt.

### Festlegen des Containers und Hinzufügen von Gantt

Um Gantt auf der Seite anzuzeigen, müssen wir den Container festlegen, in dem die Komponente gerendert wird. Siehe unten stehenden Code:

~~~js title="Gantt.vue"
<script>
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default {
  mounted() {
    let gantt = Gantt.getGanttInstance();
    gantt.init(this.$refs.cont);

    this.gantt = gantt;
  },
  unmounted() {
    this.gantt.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont" style="width: 100%; height: 100%"></div>
</template>
~~~

Um den Gantt-Container dazu zu bringen, den gesamten Raum des Bodys einzunehmen, entfernen Sie die Standardstile aus der ***main.css***-Datei im Ordner ***src/assets*** und fügen Sie Folgendes hinzu:

~~~js title="src/assets/main.css"
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## Schritt 3. Gantt in die App einfügen

Nun ist es Zeit, die Komponente in unsere App einzufügen. Öffnen Sie ***src/App.vue*** und verwenden Sie die Gantt-Komponente statt des Standardinhalts, indem Sie den untenstehenden Code einfügen:

~~~js title="Gantt.vue"
<script>
import Gantt from "./components/Gantt.vue";

export default {
  components: { Gantt }
};
</script>

<template>
  <Gantt/>
</template>
~~~

Wenn Sie die App starten, sollten Sie nun ein leeres Gantt auf einer Seite sehen:

![Gantt Vue init](/img/gantt_init.png)

## Schritt 4. Bereitstellung von Daten

Um Daten in das Gantt einzufügen, müssen wir ein Datenset bereitstellen. Erstellen Sie die ***data.js***-Datei im ***src/***-Verzeichnis und fügen Sie einige Daten hinzu:

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

Wir sollten [Props (unsere Daten)](https://vuejs.org/guide/components/props.html) an die Gantt-Komponente in der ***App.vue***-Datei übergeben:

~~~html title="Gantt.vue"
<script>
import Gantt from "./components/Gantt.vue";
import { getData } from "./data";

export default {
  components: { Gantt },
  data() {
    return {
      tasks: getData(),
    };
  },
};
</script>

<template>
  <Gantt :tasks="tasks" />
</template>
~~~

Und verwenden Sie die Props in der **gantt.parse()**-Methode in der Gantt-Komponente:

~~~html title="Gantt.vue"
<script>
import { Gantt } from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

export default {
  props: ["tasks"],

  mounted() {
    let gantt = Gantt.getGanttInstance();
    gantt.init(this.$refs.cont);
    gantt.parse(this.tasks);

    this.gantt = gantt;
  },
  unmounted() {
    this.gantt.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont" style="width: 100%; height: 100%"></div>
</template>
~~~  

Nun, wenn Sie die App erneut öffnen, sollten Sie ein Gantt mit Aufgaben sehen:

![Gantt tasks](/img/gantt_tasks.png)

## Schritt 5. Speichern von Daten

Um Änderungen im Gantt zu erfassen, können Sie einen [dataProcessor](api/method/dataprocessor.md) Handler verwenden, der es ermöglicht, mit dem serverseitigen Backend zu kommunizieren. Der Handler kann entweder als Funktion oder als Router-Objekt deklariert werden. dhtmlxGantt akzeptiert eine Promise-Antwort vom Handler, sodass Ihr Gantt die Beendigung einer Aktion korrekt verarbeitet.

Sie können einen **DataProcessor** über die API-Methode **createDataProcessor()** erstellen und Änderungen wie folgt erfassen:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Wenn Ihr Dienst die Aufgaben-ID nach dem Erstellen eines neuen Datensatzes ändert (was normalerweise der Fall ist), stellen Sie sicher, dass Ihre Promise ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** als Ergebnis zurückgibt, damit Gantt die neue Datenbank-ID dem Datensatz zuweisen kann. Erfahren Sie [mehr Informationen zur Serverseite](guides/server-side.md).

Nun ist Vue Gantt einsatzbereit. Sie können sich [die vollständige Demo auf GitHub](https://github.com/DHTMLX/vue-gantt-demo) ansehen.

## XSS-, CSRF- und SQL-Injektionsangriffe

Beachten Sie, dass Gantt keine Mittel bietet, um eine Anwendung vor verschiedenen Bedrohungen zu schützen, wie z.B. SQL-Injektionen oder XSS- und CSRF-Angriffe. Es ist wichtig, dass die Verantwortung für die Sicherheit der Anwendung bei den Entwicklern liegt, die das Backend implementieren.

Lesen Sie den [Bereich Anwendungssicherheit](guides/app-security.md), um die am stärksten gefährdeten Punkte der Komponente und die Maßnahmen zur Verbesserung der Sicherheit Ihrer Anwendung kennenzulernen.