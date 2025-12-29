---
title: "dhtmlxGantt mit Vue.js"
sidebar_label: "Vue.js"
---

# dhtmlxGantt mit Vue.js

Diese Anleitung setzt Grundkenntnisse in [Vue](https://vuejs.org/) voraus. Falls Sie neu bei Vue sind, empfehlen wir Ihnen die [Vue 3 Dokumentation](https://vuejs.org/guide/introduction.html) für einen schnellen Einstieg.

DHTMLX Gantt funktioniert gut mit Vue. Ein passendes Beispiel finden Sie auf GitHub: [DHTMLX Gantt mit Vue Demo](https://github.com/DHTMLX/vue-gantt-demo).

## Ein Projekt erstellen

Stellen Sie sicher, dass [Node.js](https://nodejs.org/en/) installiert ist, bevor Sie ein neues Projekt starten.

Um ein Vue-Projekt zu erstellen, führen Sie folgenden Befehl aus:

~~~
npm create vue@latest
~~~

Dieser Befehl installiert und startet **create-vue**, das offizielle Tool zum Erstellen von Vue-Projekten. Weitere Informationen finden Sie im [Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application).

### Installation der Abhängigkeiten

Navigieren Sie anschließend in Ihr App-Verzeichnis. Nennen wir das Projekt **gantt-vue**:

~~~
cd gantt-vue
~~~

Installieren Sie dann die Abhängigkeiten und starten Sie den Entwicklungsserver mit Ihrem Paketmanager:

- Für **yarn**:

~~~
yarn install
yarn dev
~~~

- Für **npm**:

~~~
npm install
npm run dev
~~~

Ihr Vue-Projekt sollte jetzt unter [http://localhost:5173](http://localhost:5173) laufen.

![Gantt Vue App läuft](/img/gantt_vue_app_run.png)

## Gantt erstellen

Um DHTMLX Gantt zum Projekt hinzuzufügen, stoppen Sie zunächst die laufende App mit **Strg+C** im Terminal. Installieren Sie dann das Gantt-Paket.

## Schritt 1. Paketinstallation

Die PRO-Versionen der Bibliothek können über **npm/yarn** aus unserem privaten Repository installiert werden. Folgen Sie 
[dieser Anleitung](guides/installation.md#npmevaluationandproversions), um Zugriff zu erhalten.

Sobald Sie die Evaluierungsversion haben, installieren Sie sie mit einem der folgenden Befehle:

- Mit npm:

~~~
npm install @dhx/trial-gantt
~~~

- Mit yarn:

~~~
yarn add @dhx/trial-gantt
~~~

Alternativ können Sie, da das Zip-Paket der Bibliothek als **npm**-Modul strukturiert ist, 
[es aus einem lokalen Ordner installieren](guides/installation.md#installfromlocalfolder).

## Schritt 2. Komponentenerstellung

Erstellen Sie eine Vue-Komponente, um Gantt in Ihre App einzubetten. Legen Sie eine neue Datei namens ***Gantt.vue*** im Verzeichnis ***src/components/*** an.

### Importieren der Quelldateien

Öffnen Sie ***Gantt.vue*** und importieren Sie die Gantt-Quelldateien. Beachten Sie den Unterschied je nach Installationsmethode:

- Wenn Sie aus einem lokalen Ordner installiert haben, verwenden Sie:

**Gantt.vue**
~~~
import { Gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
~~~ 

- Wenn Sie die Trial-Version installiert haben, verwenden Sie:

**Gantt.vue**
~~~
import { Gantt} from "@dhx/trial-gantt";
import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

Diese Anleitung verwendet die **Trial**-Version.

### Container festlegen und Gantt hinzufügen

Um Gantt auf der Seite anzuzeigen, geben Sie das Containerelement an. So sieht es aus:

**Gantt.vue**
~~~html
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

Damit der Gantt-Container den gesamten Body ausfüllt, entfernen Sie die Standard-Styles aus ***main.css*** in ***src/assets*** und fügen Sie Folgendes hinzu:

**src/assets/main.css**
~~~
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
~~~

## Schritt 3. Gantt in die App einbinden

Fügen Sie als Nächstes die Gantt-Komponente in Ihre App ein. Öffnen Sie ***src/App.vue*** und ersetzen Sie den Standardinhalt durch:

**src/App.vue**
~~~html
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

Nach dem Starten der App sollte ein leerer Gantt angezeigt werden:

![Gantt Vue Init](/img/gantt_init.png)

## Schritt 4. Daten bereitstellen

Um Aufgaben im Gantt anzuzeigen, stellen Sie einen Datensatz bereit. Erstellen Sie eine Datei ***data.js*** im Verzeichnis ***src/*** mit folgenden Daten:

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

Übergeben Sie diese Daten als Props an die Gantt-Komponente in ***App.vue***:

**App.vue**
~~~html
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

Verwenden Sie dann diese Props mit **gantt.parse()** in der Gantt-Komponente:

**Gantt.vue**
~~~html
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

Wenn Sie die App neu laden, wird Gantt nun mit Aufgaben angezeigt:

![Gantt Aufgaben](/img/gantt_tasks.png)

## Schritt 5. Daten speichern

Um Änderungen im Gantt zu verfolgen, verwenden Sie einen [dataProcessor](api/method/dataprocessor.md)-Handler, der die Kommunikation mit Ihrem Backend verwaltet. Dieser Handler kann eine Funktion oder ein Router-Objekt sein. dhtmlxGantt unterstützt Promise-Antworten vom Handler, was eine ordnungsgemäße Verarbeitung von Aktionen gewährleistet.

Erstellen Sie einen **DataProcessor** mit **createDataProcessor()** und erfassen Sie Änderungen wie folgt:

~~~
gantt.createDataProcessor(function(entity, action, data, id) {​
    gantt.message(`${​entity} ${​action}`);
});
~~~

Falls Ihr Backend beim Erstellen neuer Datensätze die Task-IDs ändert (was in vielen Systemen üblich ist), stellen Sie sicher, dass Ihr Promise ein Objekt mit **(id: databaseId)** oder **(tid: databaseId)** zurückgibt. So kann Gantt den Datensatz mit der neuen Datenbank-ID aktualisieren. Weitere Informationen finden Sie unter [server side integration](guides/server-side.md).

Damit ist Ihr Vue Gantt-Setup abgeschlossen. Sie können das vollständige Demo auf GitHub erkunden: [https://github.com/DHTMLX/vue-gantt-demo](https://github.com/DHTMLX/vue-gantt-demo).

## XSS-, CSRF- und SQL-Injection-Angriffe

Beachten Sie, dass Gantt selbst keinen Schutz vor Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffen bietet. Die Sicherheit Ihrer Anwendung liegt in der Verantwortung der Backend-Entwickler.

Lesen Sie den Artikel [Application Security](guides/app-security.md), um mehr über gängige Schwachstellen zu erfahren und wie Sie Ihre App absichern können.
