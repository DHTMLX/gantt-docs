---
title: React Gantt und Firebase-Integration
sidebar_label: Firebase Schnellstart
description: "Erstellen Sie ein Echtzeit-kollaboratives React Gantt, synchronisiert über Firebase Firestore"
---

# React Gantt und Firebase-Integration

Dieses Tutorial beschreibt, wie man ein [React Gantt](integrations/react.md) Diagramm baut, das Aufgaben- und Verknüpfungsdaten über mehrere Clients in Echtzeit mit Firebase Firestore synchronisiert. Diese Funktion ist besonders nützlich für:

- Projektmanagement-Tools
- Team-Kollaborations-Apps
- Planungsplattformen, bei denen Multi-User-Synchronisation kritisch ist

Sie lernen, wie man:

- Firebase für Echtzeit-Updates einrichtet
- das Gantt-Diagramm initialisiert und rendert
- CRUD-Operationen (Erstellen, Lesen, Aktualisieren, Löschen) mit Live-Synchronisation durchführt
- Echtzeit-Änderungen im Gantt-Zustand effizient verarbeitet

Sie können das entsprechende Beispiel auf GitHub prüfen: [DHTMLX React Gantt mit Firebase Firestore Demo](https://github.com/DHTMLX/firebase-react-gantt-demo).

## Schritt 1: Projektsetup

Starten Sie damit, ein React + Vite-Projekt zu erstellen. 

Um ein React-Projekt zu erstellen und in das Projektverzeichnis zu wechseln, führen Sie die folgenden Befehle aus:

~~~bash
npm create vite@latest react-gantt-firebase -- --template react-ts
cd react-gantt-firebase
~~~

Installieren Sie die erforderlichen Abhängigkeiten wie folgt:

~~~js
npm install firebase
~~~

### Installation von React Gantt

Installieren Sie React Gantt wie im [React Gantt Installationsleitfaden](integrations/react/installation.md).

In diesem Tutorial verwenden wir das Evaluierungspaket:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

oder

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-gantt` durch `@dhx/react-gantt` in den Befehlen und Importen.

## Schritt 2: Firebase konfigurieren

Erstellen Sie zunächst ein Firebase-Projekt, indem Sie die folgenden Schritte durchführen:

- Gehen Sie zur Firebase Console
- Klicken Sie auf **Create a project**
- Geben Sie den Projektnamen ein (z. B. `react-gantt-firebase`) und folgen Sie den Anweisungen

Dann richten Sie Firestore ein, indem Sie die folgenden Schritte ausführen:

- Navigieren Sie zur **Firestore Database** im Dashboard Ihres Firebase-Projekts
- Klicken Sie auf **Create database**
- Wählen Sie Ihren bevorzugten Standort
- Starten Sie im **test mode** zur leichten Entwicklung (denken Sie daran, die Sicherheitsregeln vor der Produktion zu konfigurieren)
- Klicken Sie auf **Create**

Registrieren Sie anschließend Ihre Web-App wie folgt:

- Wählen Sie **Project Overview** in der linken Seitenleiste der Firebase Console
- Klicken Sie auf das Web-App-Symbol `</>`, um eine neue Web-App zu registrieren
- Geben Sie den App-Spitznamen ein (z. B. `react-gantt-firebase`)
- Aktivieren Sie Firebase Hosting
- Klicken Sie auf **Register app**
- Kopieren Sie die generierte Firebase-Konfiguration (Sie verwenden sie in Ihrem Projekt)

Schlussendlich konfigurieren Sie Firebase in Ihrem Projekt wie unten beschrieben:

- Fügen Sie Ihre Firebase-Konfiguration in die Datei `.env` wie folgt ein:

~~~js
VITE_FIREBASE_CONFIGURATION = {
    "apiKey": "YOUR_API_KEY",
    "authDomain":"react-gantt-firebase.firebaseapp.com",
    "projectId": "react-gantt-firebase",
    "storageBucket": "react-gantt-firebase.firebasestorage.app",
    "messagingSenderId": "693536970600",
    "appId": "1:693536970600:web:1b3fa4e4b032acaab368dd"
}
~~~

:::note
 Ersetzen Sie den Platzhalter `YOUR_API_KEY` durch Ihre tatsächlichen Firebase-Projektdaten.
:::

- Erstellen Sie eine neue Datei **firebase.ts** und initialisieren Sie Firebase und Firestore. Exportieren Sie außerdem Referenzen zu Sammlungen, wie unten gezeigt:


~~~js title=firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query } from "firebase/firestore";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIGURATION);

initializeApp(firebaseConfig);
const db = getFirestore();
const tasksCollection = collection(db, "tasks");
const linksCollection = collection(db, "links");
const tasksQuery = query(tasksCollection);
const linksQuery = query(linksCollection);

export { db, tasksQuery, linksQuery, tasksCollection, linksCollection };
~~~

## Schritt 3: Erstellung der Gantt-Komponente

Zu Beginn richten Sie die Kern-Gantt-Komponente mit [**React-State** für Tasks und Links](integrations/react/overview.md#bindingdata) mit der folgenden Konfiguration ein: 

~~~js
const [tasks, setTasks] = useState<Task[]>([]);
const [links, setLinks] = useState<Link[]>([]);

const templates: GanttTemplates = {
    parse_date: (date) => new Date(date),
    format_date: (dateString) => dateString.toISOString(),
};

const config: GanttConfig = {
    auto_scheduling: true,
};
~~~

Im obigen Snippet:

- **Templates**

Templates ermöglichen es uns, zu steuern, wie Daten in der Gantt-Komponente geparst und formatiert werden. 
Da Firestore Daten als Strings speichert, müssen wir sie wieder in `Date`-Objekte konvertieren ([parse_date](api/template/parse_date.md)) und korrekt für die Speicherung formatieren ([format_date](api/template/format_date.md)).

- **Config**

Die `auto_scheduling`-Option ermöglicht eine automatische Neuberechnung abhängiger Aufgaben, wenn eine übergeordnete Aufgabe verschoben oder geändert wird.
Dies ist nützlich für Szenarien im Projektmanagement.

Erstellen Sie nun **State-Handler**, um den internen Zustand der Gantt-Komponente wie folgt zu verwalten: 

~~~js
const createStateHandlers = <T extends { id: string | number }>(
    setState: React.Dispatch<React.SetStateAction<T[]>>
): EntityHandler<T> => ({
    added: (item) => setState((prev) => (prev.find((i) => i.id === item.id) ? prev : [...prev, item])),
    modified: (item) => setState((prev) => prev.map((i) => (i.id === item.id ? { ...i, ...item } : i))),
    removed: (item) => setState((prev) => prev.filter((i) => i.id !== item.id)),
});

const taskHandlers = createStateHandlers<Task>(setTasks);
const linkHandlers = createStateHandlers<Link>(setLinks);
~~~

Dies bietet eine einheitliche Methode, den lokalen Zustand zu aktualisieren, wenn Firebase-Daten sich ändern.

Da wir mit zwei Entitätstypen arbeiten – Tasks und Links – können wir eine einheitliche Konfigurationsstruktur erstellen, um beide zu handhaben, statt den Code zu duplizieren. 
Dieses Objekt ordnet jeden Entitätstyp seiner Firestore-Sammlung, dem API-Pfad und den State-Handlern zu. Unten sehen Sie den Codeausschnitt:

~~~js
const entityConfig = {
    task: {
        collection: tasksCollection,
        path: "tasks",
        handlers: taskHandlers,
    },
    link: {
        collection: linksCollection,
        path: "links",
        handlers: linkHandlers,
    },
};
~~~

### Projektstruktur-Übersicht

Sie können die Übersicht der resultierenden Projektstruktur in folgendem Scheme prüfen:

~~~
src/
├── App.tsx                 # Einstiegspunkt
├── App.css                 # Stile
├── components/
│   └── Gantt/
│       ├── Gantt.tsx       # Hauptlogik
│       └── types.ts        # Typdeklarationen
├── config/
│   └── firebase.ts         # Firebase-Setup
└── main.tsx                # React-Wurzel
~~~

## Schritt 4: Laden von Initialdaten

Wenn die Komponente gemountet wird, sollten Sie alle Tasks und Links wie folgt laden:

~~~js
useEffect(() => {
    let unsubscribeTasks: () => void;
    let unsubscribeLinks: () => void;

    (async () => {
        const tasksSnap = await getDocs(tasksQuery);
        const bulkTasks = tasksSnap.docs.map(processEntity) as Task[];
        const linksSnap = await getDocs(linksQuery);
        const bulkLinks = linksSnap.docs.map(processEntity) as Link[];

        setTasks(bulkTasks);
        setLinks(bulkLinks);

        const unsubscribers = watchRealtime();
        unsubscribeTasks = unsubscribers.unsubscribeTasks;
        unsubscribeLinks = unsubscribers.unsubscribeLinks;
    })();

    return () => {
        if (unsubscribeTasks) unsubscribeTasks();
        if (unsubscribeLinks) unsubscribeLinks();
    };
}, []);
~~~

Um Firebase-Dokumente in Gantt-kompatible Objekte umzuwandeln, verwenden Sie `processEntity` wie unten angegeben:

~~~js
const processEntity = (docSnapshot: QueryDocumentSnapshot): Task | Link => {
    return { ...docSnapshot.data(), id: docSnapshot.id };
};
~~~

## Schritt 5: Echtzeit-Synchronisierung einrichten

Verwenden Sie die Firebase-Funktion `onSnapshot`, um Änderungen in beiden Sammlungen zu abonnieren und sich abzumelden, wenn die Komponente entmountet wird:
  
~~~js  
function watchRealtime() {
    let tasksLoaded = false;
    let linksLoaded = false;

    const unsubscribeTasks = onSnapshot(tasksQuery, (querySnapshot) => {
        if (!tasksLoaded) {
            tasksLoaded = true;
            return;
        }

        handleRealtimeUpdates(querySnapshot, "task");
    });

    const unsubscribeLinks = onSnapshot(linksQuery, (querySnapshot) => {
        if (!linksLoaded) {
            linksLoaded = true;
            return;
        }
        handleRealtimeUpdates(querySnapshot, "link");
    });

    return { unsubscribeTasks, unsubscribeLinks };
}
~~~

Der erste `onSnapshot`-Aufruf liefert die anfänglichen Daten, Änderungen werden nicht geliefert. Deshalb ignorieren wir im `watchRealtime` den ersten Aufruf (da wir bereits die anfänglichen Daten geladen haben).

### Verarbeitung von Echtzeit-Updates

Verarbeiten Sie die Echtzeit-Updates mit der Funktion aus dem folgenden Code-Beispiel:

~~~js
function handleRealtimeUpdates(querySnapshot: QuerySnapshot, type: GanttEntityType) {
    const config = entityConfig[type];
    if (!config) throw new Error(`Unknown entity type: ${type}`);
    const { handlers } = config;
    querySnapshot.docChanges().forEach((change) => {
        if (change.doc.metadata.hasPendingWrites) return;
        const handler = handlers[change.type];
        if (!handler) {
            throw new Error(`Unknown change type: ${change.type}`);
      }
      const data = processEntity(change.doc);
      (handler as (data: Task | Link) => void)(data);
    });
}
~~~

Diese Methode stellt sicher, dass nur serverbestätigte Änderungen verarbeitet werden und so lokale Duplikationen vermieden werden.

`docChanges()` gibt die Liste der Änderungen (added, modified, removed) zurück, die seit dem letzten Snapshot in der Firestore-Sammlung vorgenommen wurden. Firestore liefert den Typ der Änderung (`added`, `modified`, `removed`), und wir leiten ihn an den entsprechenden Handler weiter, um den React-Zustand zu aktualisieren.

## Schritt 6: CRUD-Operationen mit Firebase implementieren

Um die Create-/Update-/Delete-Anfragen der Gantt-Komponente zu verarbeiten, verwenden Sie die Logik der `data.save`-Methode, die unten angegeben ist:

~~~js
const data = {
    save: async (
        entity: GanttEntityType, 
        action: GanttActionType, 
        raw: any, id: string | number
    ) => {
        try {
            const config = entityConfig[entity];
            if (!config) throw new Error(`Unknown entity type: ${entity}`);

            const { collection, path, handlers } = config;
            const ref = doc(db, path, id.toString());

            switch (action) {
                case "create": {
                    const addedDoc = await addDoc(collection, raw);
                    handlers.added({ ...raw, id: addedDoc.id });
                    break;
                }
                case "update": {
                    await updateDoc(ref, raw);
                    handlers.modified(raw);
                    break;
                }
                case "delete": {
                    await deleteDoc(ref);
                    handlers.removed(raw);
                    break;
                }
                default:
                    throw new Error(`Unknown action type: ${action}`);
            }
        } catch (err) {
            console.error(`Failed to ${action} ${entity}:`, err);
        }
    },
};
~~~

Firebase wird diese Änderungen automatisch an alle verbundenen Clients über die Snapshot-Listener weitergeben.

Dann rendern Sie das Gantt-Diagramm mit folgendem Code:

~~~js
return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <ReactGantt 
            tasks={tasks} 
            links={links} 
            templates={templates} 
            config={config} 
            data={data} 
        />
    </div>
);
~~~

Die `data`-Eigenschaft verbindet die integrierte Bearbeitung von Gantt mit der oben bereitgestellten Firebase-save-Logik.

## Schritt 7: Bereitstellung des Projekts für Firebase

Sobald Ihr Projekt vollständig funktioniert und die Echtzeit-Synchronisierung korrekt läuft, können Sie es bereitstellen, damit es öffentlich im Web zugänglich ist. Es gibt zwei Deploy-Optionen: über die Firebase CLI und über die Firebase Console.

### Bereitstellung über die Firebase CLI (Empfohlen)

Dies ist die effizienteste Methode, insbesondere wenn Sie Ihr Projekt regelmäßig aktualisieren möchten. Folgen Sie den untenstehenden Schritten:

1\. Wenn Sie die Firebase CLI noch nicht installiert haben, installieren Sie sie mit folgendem Befehl:

~~~
npm install -g firebase-tools
~~~ 

2\. Melden Sie sich bei Firebase an, mit dem folgenden Befehl:

~~~
firebase login
~~~

3\. Initialisieren Sie Firebase in Ihrem Projekt mit folgendem Befehl:

~~~
firebase init
~~~

Während der Initialisierung führen Sie die untenstehenden Schritte aus:

- Hosting auswählen (Sie können auch Firestore auswählen, falls Sie es noch nicht konfiguriert haben)
- Legen Sie den Build-Ordner fest (z. B. `dist` oder `build`, abhängig von Ihrer `vite.config.ts` oder `package.json`-Config)
- Wenn Sie gefragt werden, ob es sich um eine Single Page App (SPA) handelt, wählen Sie Yes, damit alle Routen über `index.html` bedient werden

4\. Bauen Sie das Projekt nun mit folgendem Befehl:

~~~
npm run build
~~~

Es generiert die produktionsbereiten Dateien im Ordner `dist` (oder `build`).

5\. Schließlich können Sie über folgenden Befehl zu Firebase deployen:

~~~
firebase deploy
~~~

Nach Abschluss der Bereitstellung stellt Firebase Ihnen einen Link zu Ihrem gehosteten Projekt bereit.

### Schnelle Bereitstellung über die Firebase Console

Wenn Sie die Veröffentlichung ohne CLI schnell durchführen möchten, können Sie dies direkt über die Firebase Console tun.
Folgende Schritte sind zu erledigen:

1\. Bauen Sie das Projekt mit dem untenstehenden Befehl:

~~~
npm run build
~~~

2\. Gehen Sie zu Firebase Hosting → Ihr Projekt → Hosting

3\. Klicken Sie auf "Get Started" oder "Upload"

4\. Laden Sie den Inhalt des Ordners `dist` (oder `build`) hoch

5\. Bestätigen Sie den Upload – Firebase stellt Ihnen eine öffentliche URL für Ihre Seite bereit

## Fazit

In diesem Tutorial haben wir ein Echtzeit-Gantt-Diagramm mit Firebase-Synchronisation erstellt. Sie haben gelernt, wie man:

- React Gantt mit Firebase Firestore verbindet
- Echtzeit-Abonnements für Firestore einrichtet
- Erstellen-, Aktualisieren- und Löschen-Ereignisse mit sofortiger Multi-Client-Synchronisation verarbeitet

Dieser Ansatz eignet sich perfekt für kollaborative Projektmanagement-Tools, bei denen alle Nutzer Live-Updates sehen müssen, ohne die Seite neu zu laden.