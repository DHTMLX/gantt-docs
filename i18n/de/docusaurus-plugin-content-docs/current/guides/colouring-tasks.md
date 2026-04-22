--- 
title: "Aufgaben-Färbung"
sidebar_label: "Aufgaben-Färbung"
---

# Aufgaben-Färbung

Die farbliche Kennzeichnung von Aufgaben ermöglicht es Ihnen, bestimmte Aufgaben hervorzuheben, um die Aufmerksamkeit der Benutzer zu lenken.

![coloring_tasks](/img/coloring_tasks.png)

Um einen benutzerdefinierten Stil für Aufgaben festzulegen, können Sie eine der folgenden Ansätze verwenden:

1. [Um die Standardaufgaben-Vorlage neu zu definieren](guides/colouring-tasks.md#redefiningthetaskstemplate)
2. [Um Stilwerte in den Eigenschaften des Aufgaben-Objekts festzulegen](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)
3. [Um Stile aus Daten zu generieren](guides/colouring-tasks.md#loadingcolorswithdata)

## Neudefinition der Aufgaben-Vorlage {#redefiningthetaskstemplate}

Um einen benutzerdefinierten Stil für die Aufgabe über eine Vorlage festzulegen, verwenden Sie die [task_class](api/template/task_class.md) Vorlage. Zum Beispiel, Aufgaben je nach Priorität zu färben, verwenden Sie den Code wie folgt:

**Aufgaben je nach Priorität färben**
~~~css
<style>

    /* hoch */
    .gantt_task_line.high {
        --dhx-gantt-task-background: #d96c49;
        --dhx-gantt-task-color: #fff;
    }

    /* mittel */
    .gantt_task_line.medium {
        --dhx-gantt-task-background: #f57730;
        --dhx-gantt-task-color: #fff;
    }

    /* niedrig */
    .gantt_task_line.low {
        --dhx-gantt-task-background: #fff;
        --dhx-gantt-task-color: #fff;
    }

</style>
~~~

~~~js
gantt.templates.task_class = (start, end, task) => {
    switch (task.priority) {
        case "1":
            return "high";
        case "2":
            return "medium";
        case "3":
            return "low";
        default:
            return "";
    }
};
~~~

**Zugehöriges Beispiel**: [Task styles](https://docs.dhtmlx.com/gantt/samples/04_customization/04_task_styles.html)

:::note
Um andere Aspekte von Aufgaben zu stylen, verwenden Sie die in dem Artikel [Templates of the Timeline Area](guides/timeline-templates.md) aufgeführten Vorlagen.
 :::

Eine ähnliche Vorgehensweise kann auch auf Links angewendet werden. Leset hierzu [hier](guides/colouring-lines.md#redefiningthelinkstemplate).

## Spezifikation des Stils in den Eigenschaften eines Aufgaben-Objekts {#specifyingstyleinthepropertiesofataskobject}

Um einen benutzerdefinierten Stil für eine Aufgabe festzulegen, können Sie dem Datenobjekt 3 zusätzliche Eigenschaften hinzufügen (oder nur einige von ihnen):

- **color** - die Hintergrundfarbe der Aufgabenleiste
- **textColor** - die Textfarbe innerhalb der Aufgabenleiste (beeinträchtigt nicht Aufgaben des Typs "Meilenstein")
- **progressColor** - die Farbe der Fortschrittsleiste (standardmäßig macht es sie nur etwas dunkler als die Farbe der Aufgabe mit dem folgenden Stil `background-color: rgb(54, 54, 54); opacity: 0.2`)

![task_color_properties](/img/task_color_properties.png)

:::note
Hinweis, dass dies spezielle Eigenschaften sind.
Standardmäßig prüft Gantt, ob eine Aufgabe diese besitzt und wendet bei Vorliegen die entsprechenden Werte auf die Leiste und den Text der Aufgabe an. Andernfalls werden die vordefinierten Farben angewendet.
:::

**Festlegen der Farbe der Aufgabe im Aufgabenobjekt**
~~~js
const data = {
    tasks: [
        { id: 1, text: "Project #1", start_date: "01-04-2013", duration: 18, color: "red" },
        { id: 2, text: "Task #1", start_date: "02-04-2013", duration: 8, color: "blue", parent: 1 },
        { id: 3, text: "Task #2", start_date: "11-04-2013", duration: 8, color: "blue", parent: 1 }
    ]
};

gantt.init("gantt_here");
gantt.parse(data);

gantt.getTask(1).color = "red";
~~~

**Zugehöriges Beispiel**: [Inline colors for Tasks and Links](https://docs.dhtmlx.com/gantt/samples/04_customization/16_inline_task_colors.html)

:::note
Das Hinzufügen einer benutzerdefinierten Farbe über die **color**-Eigenschaft wird durch das Hinzufügen eines Inline-Stils gefolgt, der die höchste Priorität unter allen anderen Stilen hat. Infolgedessen wird der kritische Pfad nicht hervorgehoben, und jeder benutzerdefinierte Stil, mit dem Sie den Hintergrund oder die Farbe der Aufgabe ändern möchten, wird nicht angewendet.
:::

Um die Aufgaben kritisch wirken zu lassen, können Sie folgenden Code verwenden:

~~~css
.gantt_critical_task {
    --dhx-gantt-task-background: #e63030 !important;
}
~~~

**Zugehöriges Beispiel**: [Coloring critical tasks and links](https://snippet.dhtmlx.com/xipdml7a)

Wenn mindestens eine der Eigenschaften eines Aufgaben-Objekts zugewiesen ist, erhält die Aufgabe die zusätzliche Klasse **"gantt_task_inline_color"**.

Sie können diese Klasse verwenden, um einige andere Stile für die Aufgabe zu überschreiben (verwenden Sie den Selektor "*.gantt_task_line.gantt_task_inline_color*" für diese Klasse):

~~~css
.gantt_task_line.gantt_task_inline_color .gantt_task_progress {
    background-color: rgb(54, 54, 54);
    opacity: 0.2;
}
~~~

Die Eigenschaften können jeden gültigen CSS-Farbwert haben, z.B. alle folgenden Notationen sind gültig:

~~~js
task.color = "#FF0000";
task.color = "red";
task.color = "rgb(255,0,0)";
~~~

Eine ähnliche Vorgehensweise kann auch auf Links angewendet werden. Lesen Sie mehr darüber [hier](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject).

## Farben mit Daten laden {#loadingcolorswithdata}

Wenn Farben Teil Ihrer Daten sind, die vom Backend kommen, z.B. wenn die Farbe einer Aufgabe mit einer Phase oder einer dem Aufgabe zugewiesenen Ressource verbunden ist, die nicht direkt auf der Seite fest codiert werden kann, kann es sinnvoll sein, Stile manuell aus Ihren Daten zu generieren.

Nehmen wir an, Sie haben die folgende Sammlung von Benutzern, die Aufgaben zugewiesen werden können. Die Stile der Aufgaben sollten durch die Eigenschaften der Benutzeraufzeichnungen definiert werden:

~~~js
[
    { "key": 1, "label": "John", "backgroundColor": "#03A9F4", "textColor": "#FFF" },
    { "key": 2, "label": "Mike", "backgroundColor": "#f57730", "textColor": "#FFF" },
    { "key": 3, "label": "Anna", "backgroundColor": "#e157de", "textColor": "#FFF" },
    { "key": 4, "label": "Bill", "backgroundColor": "#78909C", "textColor": "#FFF" },
    { "key": 7, "label": "Floe", "backgroundColor": "#8D6E63", "textColor": "#FFF" }
]
~~~ 

In diesem Anwendungsfall werden Benutzer und ihre Farben von verschiedenen Teilen der Anwendung erstellt und verwaltet, und gantt kennt in der Regel die Benutzer-IDs und deren Farben nicht im Voraus.

Folgendes können Sie in diesem Fall tun:

- Definieren Sie eine benannte serverList für diese Sammlung

~~~js
gantt.serverList("people");
~~~

- Laden Sie Optionen auf die Seite, entweder über [das gantt-Datenformat verwenden](guides/supported-data-formats.md#jsonwithcollections) oder manuell über ein benutzerdefiniertes xhr

- Sobald Optionen geladen sind, können Sie CSS-Stile aus den Daten generieren:

~~~js
gantt.attachEvent("onLoadEnd", () => {
    // verwenden Sie eine willkürliche ID für das Style-Element
    const styleElementId = "dynamicGanttStyles";

    // falls Sie Optionen mit Farben neu laden - 
    // verwenden Sie ein zuvor erstelltes Style-Element erneut

    let styleElement = document.getElementById(styleElementId);
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = styleElementId;
        document.head.appendChild(styleElement);
    }
    const cssRules = [];
    const peopleOptions = gantt.serverList("people");

    // generieren Sie CSS-Stile für jede Option und schreiben Sie CSS in das Style-Element

    peopleOptions.forEach((personOption) => {
        if (personOption.backgroundColor && personOption.textColor) {
            cssRules.push(
                `.gantt_task_line.gantt_resource_${personOption.key}{` +
                `--dhx-gantt-task-background: ${personOption.backgroundColor}; ` +
                `--dhx-gantt-task-color: ${personOption.textColor}; ` +
                `}`
            );
        }
    });
    styleElement.innerHTML = cssRules.join("");
});
~~~

Wenn Sie Ressourcen aus dem [Resource Store](api/config/resource_store.md) erhalten, müssen Sie für die Ressourcen-ID `personOption.id` statt `personOption.key` verwenden.

- Danach können Sie verwandte Klassen zuweisen, die Sie aus den Task-Vorlagen generiert haben:

~~~js
gantt.templates.task_class = (start, end, task) => {
    const taskCssClasses = [];

    if (task.owner_id) {
        taskCssClasses.push(`gantt_resource_${task.owner_id}`);
    }

    return taskCssClasses.join(" ");
};
~~~

**Zugehöriges Beispiel**: [Zuordnung von Eigentümern zu Aufgaben](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)