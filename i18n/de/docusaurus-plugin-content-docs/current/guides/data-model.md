---
title: "Datenmodell"
sidebar_label: "Datenmodell"
description: "Überblick über das Gantt-Datenmodell: serialisierte Typen zum Laden und Speichern, Laufzeittypen, die innerhalb des Diagramms verwendet werden, und Legacy-Kompatibilitätsaliases."
---

# Datenmodell

Gantt arbeitet mit zwei Hauptrepräsentationen von Aufgaben- und Verknüpfungsdaten:

- **Serialisierte**: JSON-kompatible Strukturen mit Datumsangaben als Strings, verwendet in Serverantworten, gespeicherten JSON-Dateien und DataProcessor-Austausch
- **Laufzeit**: client-seitige Objekte mit `Date`-Feldern und berechneten `$`-präfixierten Eigenschaften, zurückgegeben von Methoden wie [gantt.getTask()](api/method/gettask.md) und [gantt.getLink()](api/method/getlink.md)

Wenn Sie Gantt Daten *bereitstellen* (statt sie zurückzulesen), können Datumsfelder entweder ein `Date`-Objekt oder einen `string` enthalten. Der Typ [`TaskInput`](#taskinput) erfasst diese nachsichtige Eingabeform, damit Sie sich nicht auf `Task` oder `SerializedTask` festlegen müssen für Daten, die Sie erstellen oder im Anwendungszustand halten.

Das kanonische Top-Level-Payload, das an [gantt.parse()](api/method/parse.md) übergeben wird, ist `GanttData`.

Zentrale Laufzeit- und serialisierte Typen werden von `@dhx/gantt` exportiert. Wrapper-Pakete exportieren und verwenden diese Typen in ihren öffentlichen APIs erneut, aber die genaue API-Oberfläche der Eigenschaften unterscheidet sich je nach Wrapper.

## Datenlebenszyklus

Daten durchlaufen zwei Transformationen:

1. **Laden**: serialisierte Aufgaben- und Link-Daten werden an `gantt.parse()` oder `gantt.load()` übergeben. Gantt wandelt Datumsstrings in `Date`-Objekte um und fügt berechnete `$`-präfixierte Felder hinzu, wodurch Laufzeit-Objekte `Task` und `Link` entstehen.
2. **Speichern**: wenn Änderungen über den DataProcessor an den Server gesendet werden, werden Datumsangaben wieder in Strings serialisiert und temporäre `$`-präfixierte Felder entfernt.

Siehe [Data Loading](guides/loading.md) und [Server-Side Integration](guides/server-side.md) für Verhaltensdetails.

## SerializedTask

Die JSON-kompatible Task-Form. Datumsfelder sind Strings, sodass dieses Objekt sicher durch `JSON.stringify()` / `JSON.parse()` durchlaufen werden kann.

~~~ts
interface SerializedTask {
    id?: string | number;
    start_date?: string;
    end_date?: string;
    duration?: number;
    text?: any;
    type?: string;
    parent?: string | number;
    progress?: number;
    open?: boolean;

    auto_scheduling?: boolean;
    unscheduled?: boolean;
    constraint_date?: string;
    constraint_type?: string;
    deadline?: string;

    color?: string;
    textColor?: string;
    progressColor?: string;
    bar_height?: number;
    row_height?: number;
    hide_bar?: boolean;

    baselines?: SerializedBaseline[];
    calendar_id?: string | number;
    editable?: boolean;
    readonly?: boolean;
    render?: string;
    resource?: string[];
    rollup?: boolean;
    target?: string;

    [customProperty: string]: any;
}
~~~

Für eine sinnvolle geplante Aufgabe in serialized JSON geben Sie eine der gültigen Planungskombinationen an:

- `start_date` + `duration`
- `start_date` + `end_date`
- `duration` + `end_date`

Wenn `unscheduled: true`, können Datumsangaben weggelassen werden.

Für detaillierte Beschreibungen der Eigenschaften siehe [Task Properties](guides/task-properties.md).

## SerializedLink

~~~ts
interface SerializedLink {
    id: string | number;
    source: string | number;
    target: string | number;
    type: string;
    lag?: number;
    readonly?: boolean;
    editable?: boolean;

    [customProperty: string]: any;
}
~~~

Für detaillierte Beschreibungen der Eigenschaften siehe [Link Properties](guides/link-properties.md).

## Laufzeit Task und Link

Nach dem Laden speichert Gantt Aufgaben als Laufzeit-Objekte `Task`.

Haupthinweise zu Unterschieden zu `SerializedTask`:

- Task-Datumsfelder wie `start_date`, `end_date`, `constraint_date` und `deadline` sind JavaScript-`Date`-Objekte
- berechnete `$`-präfixierte Felder werden hinzugefügt und auf dem Client gepflegt

Gemeinsame Laufzeit-Felder für Tasks:

| Property | Type | Description |
|----------|------|-------------|
| `$index` | number | Globale Vertikalposition in der sichtbaren Liste |
| `$level` | number | Nesting-Tiefe in der Aufgaben-Hierarchie |
| `$open` | boolean | Ob der Branchn aktuellerweise erweitert ist |
| `$source` | Array | IDs der Links, die von der Aufgabe ausgehen |
| `$target` | Array | IDs der Links, die in die Aufgabe hineinführen |
| `$has_child` | boolean | Ob die Aufgabe Unteraufgaben hat |

Das Laufzeit-`Link`-Objekt besitzt denselben Feldsatz wie `SerializedLink`, ist jedoch das clientseitige Objekt, das von Methoden wie `gantt.getLink()` zurückgegeben wird.

Für die vollständigen Laufzeit-Listen siehe [Task Properties](guides/task-properties.md#dynamic-properties) und [Link Properties](guides/link-properties.md).

## TaskInput

Wenn Sie Task-Daten an Gantt *bereitstellen* – [gantt.parse()](api/method/parse.md), [gantt.addTask()](api/method/addtask.md), die `tasks`-Konfiguration/Prop oder Ihren eigenen Anwendungszustand – verwenden Sie `TaskInput`. Es ist die tolerante Eingabeform: Datumsfelder akzeptieren entweder ein `Date`-Objekt oder einen `string`, und jedes Feld (einschließlich `id`) ist optional, da Gantt eine ID generiert, wenn keine angegeben wird.

~~~ts
type TaskInput = Partial<SerializedTask> | Partial<Task>;
~~~

Verwenden Sie `TaskInput` für Daten, die Sie erstellen oder im Anwendungszustand halten. Verwenden Sie `Task` (Laufzeit, `Date`-Datumsangaben, `$`-präfixierte Felder), wenn Sie Gantts eigene Objekte über Methoden wie `gantt.getTask()` lesen, und `SerializedTask` (nur String-Datumsangaben) für JSON, das Sie mit einem Server austauschen.

~~~ts
// Anwendungseigene Aufgabendaten, die an Gantt übergeben werden - beide Datumsformen werden akzeptiert:
const tasks: TaskInput[] = [
    { id: 1, text: "Task #1", start_date: new Date(2026, 3, 1), duration: 5 },
    { id: 2, text: "Task #2", start_date: "2026-04-02", duration: 3 }
];
~~~

Das Speichern des Anwendungszustands als `TaskInput[]` ist vorzuziehen gegenüber der Typisierung als `SerializedTask[]` oder `Task[]`: Es vermeidet Inkonsistenzen, wenn Ihre Seed-Daten `Date`-Objekte verwenden, der Typ jedoch Strings erwartet (oder umgekehrt). Wählen Sie `Task` / `SerializedTask` nur für die spezifischen Grenzfälle, in denen die Datumsdarstellung fest ist.

## Unterstützende Typen

### Baseline und SerializedBaseline

~~~ts
interface Baseline {
    id: string | number;
    task_id: string | number;
    start_date: Date;
    duration: number;
    end_date: Date;
    [customProperty: string]: any;
}

interface SerializedBaseline {
    id?: string | number;
    task_id?: string | number;
    start_date?: string;
    duration?: number;
    end_date?: string;
    [customProperty: string]: any;
}
~~~

### ResourceAssignment und SerializedResourceAssignment

~~~ts
interface ResourceAssignment {
    id: string | number;
    task_id: string | number;
    resource_id: string | number;
    value: number | string;
    delay: number;
    start_date: Date;
    end_date: Date;
    duration: number;
    mode: string;
    [customProperty: string]: any;
}

interface SerializedResourceAssignment {
    id?: string | number;
    task_id: string | number;
    resource_id: string | number;
    value?: number | string;
    mode?: string;
    delay?: number;
    start_date?: string;
    duration?: number;
    end_date?: string;
    [customProperty: string]: any;
}
~~~

### ResourceItem

~~~ts
interface ResourceItem {
    id: string | number;
    text?: string;
    parent?: string | number;
    open?: boolean;
    unit?: string | number;
    default_value?: string | number;
    [customProperty: string]: any;
}
~~~

Siehe [Inbuilt Baselines](guides/inbuilt-baselines.md) und [Resource Management](guides/resource-management.md) für funktionsspezifische Details.

## GanttData

Das Objekt, das an [gantt.parse()](api/method/parse.md) übergeben wird:

~~~ts
type GanttData =
  | {
      data: (SerializedTask | Task)[];
      tasks?: undefined;
      links?: (SerializedLink | Link)[];
      resources?: Partial<ResourceItem>[];
      assignments?: (SerializedResourceAssignment | ResourceAssignment)[];
      baselines?: (SerializedBaseline | Baseline)[];
      collections?: Record<string, Array<Record<string, unknown>>>;
    }
  | {
      tasks: (SerializedTask | Task)[];
      data?: undefined;
      links?: (SerializedLink | Link)[];
      resources?: Partial<ResourceItem>[];
      assignments?: (SerializedResourceAssignment | ResourceAssignment)[];
      baselines?: (SerializedBaseline | Baseline)[];
      collections?: Record<string, Array<Record<string, unknown>>>;
    };
~~~

Sowohl `tasks` als auch `data`-Schlüssel werden für das Aufgabenarray akzeptiert. In neuem Code wird `tasks` bevorzugt.

~~~js
gantt.parse({
    tasks: [
        { id: 1, text: "Project #1", start_date: "2026-04-01", duration: 18 },
        { id: 2, text: "Task #1", start_date: "2026-04-02", duration: 8, parent: 1 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "0" }
    ]
});
~~~

## Legacy-Kompatibilitätsaliases

Ältere API-Dokumentationen und Typings verwenden nach wie vor mehrere Kompatibilitäts-Namen:

- `DataToLoad1`, `DataToLoad2`: veraltete schlüsselbasierte Varianten von `GanttData`
- `NewTask`: Legacy-Alias von [`TaskInput`](#taskinput) (definiert als `TaskInput | string | {}`), aus Abwärtskompatibilitätsgründen beibehalten. In neuem Code `TaskInput` bevorzugen.
- `NewResourceItem`: veralteter Kompatibilitätsalias für `Partial<ResourceItem>`
- `NewAssignmentItem`: veralteter Kompatibilitätsalias für `SerializedResourceAssignment | ResourceAssignment`

Diese Namen bleiben aus Gründen der Abwärtskompatibilität erhalten, aber `GanttData`, `TaskInput`, `SerializedTask`, `SerializedLink`, `Task` und `Link` sind die kanonischen Konzepte, die in diesem Leitfaden verwendet werden.

## Datumregeln

- Beim Austausch von JSON mit dem Server verwenden Sie Datumsfelder als Strings
- Wenn Sie direkt ein JavaScript-Objekt erstellen und an `gantt.parse()` übergeben, können Laufzeit-Objekte `Task` und `Assignment` `Date`-Objekte enthalten
- Nach dem Laden speichert Gantt Task-Daten als `Date`-Objekte im Laufzeit-`Task`
- Seit v9.1.3 erkennt Gantt automatisch ISO-8601-Datumsstrings

Für Details und Beispiele siehe [Data Loading - Loading Task Dates](guides/loading.md#loadingtaskdates).

## Benutzerdefinierte Eigenschaften {#custom-properties}

Alle Datentypen unterstützen benutzerdefinierte Eigenschaften über `[customProperty: string]: any`. Benutzerdefinierte Eigenschaften bleiben auf der Client-Seite nach dem Laden erhalten und können in Vorlagen, Spalten, Editoren und Backend-Speicher verwendet werden.

~~~js
gantt.parse({
    tasks: [
        {
            id: 1,
            text: "Task #1",
            start_date: "2026-04-01",
            duration: 10,
            priority: "high",
            owner: "John"
        }
    ],
    links: []
});

const task = gantt.getTask(1);
console.log(task.priority); // "high"
~~~

## Aufgabenreihenfolge

Gantt zeigt Aufgaben in der Reihenfolge an, in der sie im `tasks`-Array erscheinen. Die Position jedes Elements im Array – zusammen mit der `parent`-Hierarchie – ist das Einzige, was die visuelle Reihenfolge auf dem Client bestimmt. Die Laufzeit-Eigenschaft `$index` wird aus dieser Array-Position berechnet und wird nicht dauerhaft gespeichert.

Damit kontrolliert die Datenquelle die Anzeigenreihenfolge. Wenn Benutzer Aufgaben per Drag-and-Drop neu anordnen können, muss die Datenquelle eine Möglichkeit bieten, die neue Reihenfolge zu speichern, damit bei weiteren Ladevorgängen Aufgaben in der richtigen Reihenfolge zurückgegeben werden.

Der Standardansatz ist eine numerische `sortorder`-Spalte in der Backend-Speicherung. Die Datenquelle sortiert Aufgaben nach dieser Spalte, bevor sie zurückgegeben werden. `sortorder` ist ein Backend-Konzept – Gantt liest oder interpretiert es nicht clientseitig. Es reist als [custom property](#custom-properties), falls es im Payload enthalten ist, hat aber keine integrierte Wirkung.

Wenn ein Benutzer eine Aufgabe in der UI neu ordeniert, füllt Gantt die `target`-Eigenschaft des an den Server via DataProcessor gesendeten Aufgaben-Objekts aus. Der Wert gibt an, wo die Aufgabe relativ zu ihren Geschwistern verschoben wurde:

- `target="taskId"` – Platziere diese Aufgabe **vor** der Aufgabe mit der angegebenen ID
- `target="next:taskId"` – Platziere diese Aufgabe **nach** der Aufgabe mit der angegebenen ID

Der Backend verwendet diesen Wert, um die `sortorder` für die betroffenen Aufgaben neu zu berechnen.

Für das vollständige Implementierungsmuster – Datenbankschema, Initialwerte und Neuordnungslogik – siehe [Storing the Order of Tasks](guides/server-side.md#storingtheorderoftasks) im Server-Side-Integration Leitfaden. Für client-seitige Drag-and-Drop-Konfiguration siehe [Reordering Tasks](guides/reordering-tasks.md).