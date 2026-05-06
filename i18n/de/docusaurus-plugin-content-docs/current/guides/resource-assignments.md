---
title: "Ressourcen-Zuweisungssteuerung"
sidebar_label: "Ressourcen-Zuweisungssteuerung"
---

# Ressourcen-Zuweisungssteuerung

:::info
Diese Funktionalität ist nur in der Gantt PRO-Edition verfügbar.
:::

Eine erweiterte Steuerung, mit der mehrere Ressourcen und deren Menge einer Aufgabe zugewiesen werden können ([mehrere Ressourcen und deren Menge einer Aufgabe zuweisen](guides/resource-management.md#assigningresources)).

Hier ist ein Beispiel für die Ressourcenzuweisungssteuerung mit der Standardkonfiguration:

![Ressourcen-Zuweisungssteuerung](/img/resource_assignments_control.png)

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "resource_selector", label: "Resources", type: "resource_selector", map_to: "auto" }, 
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

[Ressourcen-Zuweisungssteuerung](https://docs.dhtmlx.com/gantt/samples/11_resources/07_assign_multiple_resources.html)

Sie können [die Spalten des Ressourcenrasters der Steuerung konfigurieren](#configuring-resource-grid-columns-in-the-lightbox) und die benötigten Ressourcenoptionen bereitstellen:

![Ressourcen-Zuweisungssteuerung Optionen](/img/resource_assignments_control_options.png)

~~~js
// resource options
const usageMap = [
    { key: 1, label: "wood", text: "wood", unit: "box" },
    { key: 2, label: "water", text: "water", unit: "liter" },
    { key: 3, label: "grain", text: "grain", unit: "lbs" }
];

// helper editors
const selectResEditor = { type: "select", map_to: "resource_id", options: usageMap };
const numberEditor = { type: "number", map_to: "value", min: 0, max: 100 };

// resource grid columns config
const resourceLightboxConfig = {
    columns: [
        {
               name: "resource", 
            label: "Resource", 
            editor: selectResEditor
            // more column's options
        },
        {
            name: "units", 
            label: "Units", 
            editor: numberEditor,
            // more column's options
        },
        {
            name: "delete", 
            label: "Delete", 
            // more column's options
        }
    ]
};

gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "time", type: "duration", map_to: "auto" },
    { name: "resource_selector", type: "resource_selector", map_to: "auto", /*!*/
        config: resourceLightboxConfig } /*!*/
];

gantt.locale.labels.section_resource_selector = "Resources";
~~~  
[Ressourcen-Zuweisungssteuerung](https://snippet.dhtmlx.com/id54i1b3)

:::note
 Sie können auch eine benutzerdefinierte Steuerung erstellen, um mehreren Ressourcen eine Aufgabe zuweisen zu können. ([custom editor](guides/custom-editor.md#customthirdpartyeditor))
:::

## Initialisierung

Um die **resource_selector**-Steuerung dem Lightbox hinzuzufügen, führen Sie die folgenden Schritte aus:

1\. Fügen Sie eine Sektion zur Lightbox-Konfiguration hinzu:

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "resource_selector", type: "resource_selector", map_to: "auto" },
    { name: "time", type: "duration", map_to: "auto" }
];
~~~  

:::note
Standardmäßig wird die Resource-Steuerung der Eigenschaft gemappt, die in der [api/config/resource_property.md] Konfiguration angegeben ist, sodass die **map_to**-Option weggelassen werden kann.
:::

2\. Legen Sie eine Bezeichnung für die Sektion fest:

~~~js
gantt.locale.labels.section_resource_selector = "Resources";
~~~

## Eigenschaften

Die folgenden Eigenschaften sind überwiegend wichtig und werden typischerweise für die **resource_selector**-Steuerung gesetzt:

- **name** - (*string*) der Name der Sektion 
- **map_to** - (*string*) der Name einer Dateneigenschaft, die der Sektion zugeordnet wird
- **type** - (*string*) der Typ der [Section-Control](guides/default-edit-form.md#lightboxcontrols)
- **label** - (*string | number | any*) die Beschriftung der Sektion
- **config** - (*object*) die Ressourcenraster-Konfiguration in der Lightbox, um die erforderlichen Spalten anzuzeigen
- **templates** - (*object*) Vorlagen für das Ressourcenraster in der Lightbox
    
:::note
 Die initialen *start_date*, *end_date* und *duration*-Eigenschaften können `null`-Werte haben. Falls ja, werden sie mit den entsprechenden Werten aus dem Aufgabenobjekt initialisiert.
 :::

## Configuring resource grid columns in the lightbox

Die Standardkonfiguration der Spalten des Ressourcenrasters in der Lightbox ist unten angegeben:

~~~js
// helper editors
const selectResEditor = { 
  type: "select", map_to: "resource_id", options: gantt.serverList("resourceOptions")
};
const numberEditor = { type: "number", map_to: "value", min: 0, max: 100 };

const dateToStr = gantt.date.date_to_str("%d-%m-%Y");
const resourceStore = gantt.getDatastore(gantt.config.resource_store);
// default columns definition
const defaultResourceLightboxConfig = {
    scale_height: 35, // height of the grid scale
    row_height: 35, // height of assignment rows
    // configures the columns of the grid
    columns: [
        {
            name: "resource", label: "Resource", align: "center", width: 80, 
            editor: selectResEditor, template: function (assignment) {
            let defaultValue = "Unassigned";
            const resource = resourceStore .getItem(assignment.resource_id);
            return resource ? resource.text : defaultValue;
            }
        },
        {
            name: "hours/Day", label: "Hours/Day", align: "center", width: 70,
            editor: numberEditor, template: function (assignment) {
            return assignment.value ? +assignment.value : ``;
            }
        },
        {
            name: "start", label: "Start", align: "center", width: 100, 
            template: function (assignment) { 
            return assignment.start_date ? dateToStr(assignment.start_date) : ``;
            }
        },
        { 
            name: "end", label: "End", align: "center", width: 100, 
            template: function (assignment) {
            return assignment.end_date ? dateToStr(assignment.end_date) : ``;
            }
        },
        { 
            name: "duration", label: "Duration", align: "center", width: 80, 
            template: function (assignment) {
            if (assignment.duration) {
                return `${assignment.duration} day${assignment.duration == 1 ? '' : 's'}`;
            } else {
                return ``;
            }
            }
        },
        {
            name: "delete", label: "Delete", align: "center", width: 80, 
            template: function (assignment) {
                return `<div
                    data-assignment-id='${assignment.id}'
                    data-assignment-delete='${assignment.id}'
                    class='dhx_gantt_icon dhx_gantt_icon_delete'
                    >
                    </div>`;
            }
        }
    ],
    //Configures the default adding assignment(assignment that will be added by "Add Assignment button")
    resource_default_assignment: {
        duration: null,
        value: 8,
        start_date: null,
        end_date: null,
        mode: "default"
    }
};
~~~

### Details

Jedes Objekt im Array **columns** definiert eine einzelne Spalte. Ein Objekt kann die folgenden Attribute besitzen:

- **name?** - (*string | number*) - definiert die Spalten-ID;
- **align?** - (*string*) - legt die horizontale Ausrichtung des Titels fest. Mögliche Werte: *'left'*, *'center'* oder *'right'*;
- **hide?** - (*boolean*) - versteckt/zeigt eine Spalte (PRO);
- **label?** - (*string | number | any*) - legt den Titel der Spalte fest;
- **max_width?** - (*number*) - setzt die maximale Spaltenbreite;
- **min_width?** - (*number*) - setzt die minimale Spaltenbreite;
- **width?** - (*number | string*) - definiert die Breite der Spalte;
- **template? (assignment): any** - setzt eine Datenvorlage.
    - **assignment** - (*Assignment*) - das Assignment-Objekt;
- **onrender? (assignment, node): any** - optional, eine Callback-Funktion zum Rendern einer Zelle ins DOM. 
Die Funktion nimmt ein Assignment-Objekt und das DOM-Element der Rasterzelle als Parameter entgegen und kann eine Komponente des Frameworks zurückgeben. Siehe Details [hier](guides/specifying-columns.md#modifyingcellsafterrendering);
    - **assignment** - (*Assignment*) - das Assignment-Objekt;
    - **_node_** - (*HTMLElement*) - das HTML-Element der Rasterzelle;
- **editor?** - (*object*) - der angehängte [Inline-Editor](guides/inline-editing.md);
    - **_type_** - (*string*) - der Typ des Inline-Editors;
    - **_map_to_** - (*string*) - gibt an, welche Eigenschaft des Assignments vom Inline-Editor aktualisiert werden soll;
    - **_min?_** - (*Date | number*) - der minimale Wert für die Typen Datum und Dauer;
    - **_max?_** - (*Date | number*) - der maximale Wert für die Typen Datum und Dauer;
    - **_options?_** - (*Array &lt;any&gt;*) - ein Array mit Optionen für die Selekt-Typen;
    - **_formatter?_** - (*DurationFormatter | LinkFormatter*) - Formatter für Datums- und Vorgänger-Typen.

Sie können das standardmäßig hinzugefügte Assignment ändern, indem Sie die folgende Eigenschaft in der Resource-Lightbox-Konfiguration angeben:

- **resource_default_assignment** - (*object*) das Konfigurationsobjekt der Standardzuweisung (die durch den Button "Add Assignment" hinzugefügt wird)
    - **start_date** - (*Date | string | null*) das Datum, an dem die Zuweisung beginnen soll
    - **end_date** - (*Date | string | null*) das Datum, an dem die Zuweisung abgeschlossen sein soll
    - **value** - (*number | string*) die Menge der Ressource, die einer Aufgabe zugewiesen ist
    - **duration** - (*number | null*) die Dauer der Zuweisung
    - **mode** - (*string*) der Berechnungsmodus der Zeit der Ressourcenzuweisung: "default" | "fixedDates" | "fixedDuration"
<br>

:::note
Das **template**-Attribut ist eine Funktion, die ein Data-Item-Objekt als Parameter entgegennimmt und die endgültige Datenvorlage zurückgibt. Die Funktionsdefinition ermöglicht es, nahezu jeden Inhalt darzustellen.
:::

## Befüllung der Steuerung mit Daten

Wenn Sie den standardmäßigen Resource-Datastore verwenden, der von Gantt erstellt wird, ist die **resource_selector**-Steuerung mit der Sammlung **gantt.serverList("resourceOptions")** verbunden. Diese Sammlung wird mit den Ressourcen aus dem Resource-Datastore befüllt. Sie können auf die Optionen zugreifen, indem Sie folgende Codezeile verwenden:

~~~js
const options = gantt.serverList("resourceOptions");
~~~

Beachten Sie, dass das Optionen-Array leer sein wird, bevor die Ressourcen in den Datastore geladen werden.

Sie können diese Sammlung auch mit der benutzerdefinierten Liste von Optionen wie folgt aktualisieren:

~~~js
gantt.updateCollection("resourceOptions", [...]);
~~~

Beachten Sie, dass, falls Sie danach Ressourcen in den Gantt laden, der Gantt diese Sammlung aktualisiert und Ihre Änderungen überschreibt.

## Befüllung der Steuerung mit Daten vom Server

Um die Steuerung vom Server zu befüllen, verwenden Sie die Methode [serverList()](api/method/serverlist.md) in den Optionen des Resource-Editors:

~~~js
const resourceEditor = { 
    type: "select", map_to: "resource_id", options: gantt.serverList("resourceOptions")
};

const defaultResourceLightboxConfig = {
    // other settings
    ...
    // an array with the columns configs
    columns:[
        {
              name: "resource", 
            label: "Resource", 
            align: "center",  
            editor: resourceEditor
        },
        // more columns configs
    ]
}
~~~

Der Inhalt von `gantt.serverList("resourceOptions")` kann definiert werden, sobald die Optionen verfügbar werden, mithilfe der Methode [updateCollection()](api/method/updatecollection.md):

~~~js
gantt.updateCollection("resourceOptions", [
    // resource objects
    { id: 1, text: "QA", parent: null },
    { id: 2, text: "Development", parent: null },
    { id: 3, text: "Sales", parent: null },
    { id: 4, text: "Other", parent: null },
    { id: 5, text: "Unassigned", parent: 4 },
    { id: 6, text: "John", parent: 1 },
    { id: 7, text: "Mike", parent: 2 },
    { id: 8, text: "Anna", parent: 2 },
    { id: 9, text: "Bill", parent: 3 },
    { id: 10, text: "Floe", parent: 3 }
]);
~~~