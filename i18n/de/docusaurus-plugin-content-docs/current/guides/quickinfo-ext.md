---
title: "quickInfo Erweiterung"
sidebar_label: "quickInfo Erweiterung"
---

quickInfo Erweiterung
=======================

Weitere Informationen zur quickInfo-Erweiterung finden Sie im Artikel [Quick Info (Touch Support)](guides/quick-info.md).


Das *quickInfo*-Objekt stellt folgende API bereit:

Methoden
----------------

- <span class="submethod">**show (id): void**</span> - öffnet das Quick Info Popup für ein bestimmtes Element
    - **_id_** - (*number | string*) - die Aufgaben-ID
 
~~~js
gantt.ext.quickInfo.show("1");
~~~

- <span class="submethod">**show (x, y): void**</span> - öffnet das Quick Info Popup an den angegebenen Koordinaten
    - **_x_** - (*number | string*) - horizontale Koordinate
    - **_y_** - (*number | string*) - vertikale Koordinate

~~~js
gantt.ext.quickInfo.show(10,30);
~~~

- <span class="submethod">**hide (force): HTMLElement**</span> - schließt das Quick Info Popup. Wenn **gantt.config.quick_info_detached** auf *false* gesetzt ist, verschwindet das Popup nach einer kurzen Animation. Wird *true* als Argument übergeben, wird die Animation übersprungen und das Popup sofort entfernt.
    - **_force?_** - (*boolean*) - bestimmt, ob das Popup sofort ohne Animation ausgeblendet wird

~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");
 
// Popup mit kurzer Animation ausblenden
gantt.ext.quickInfo.hide();
 
// Popup sofort ausblenden
gantt.ext.quickInfo.hide(true);
~~~

- <span class="submethod">**setContainer (container): void**</span> - legt den Container fest, in dem das Quick Info angezeigt wird. Wenn kein Container angegeben wird, wird QuickInfo in den ersten verfügbaren Knoten eingefügt: **gantt.$task, gantt.$grid, gantt.$root**
    - **_container_** - (*HTMLElement | string*) - Containerelement oder dessen ID

~~~js
gantt.ext.quickInfo.setContainer(document.body);
gantt.ext.quickInfo.show(1300,100);

~~~

- <span class="submethod">**getNode (): HTMLElement | null**</span> - ruft das HTMLElement des Quick Info Popups ab. Gibt *null* zurück, wenn Quick Info nicht initialisiert wurde

~~~js
const node = gantt.ext.quickInfo.getNode();
~~~

Das DOM-Element des angezeigten Quick Info sieht folgendermaßen aus:

![quick_node](/img/quick_node.png)

- <span class="submethod">**setContent (config): void**</span> - füllt das Quick Info mit Inhalt
    - **_config?_** - (*object*) - optionales Konfigurationsobjekt für das Quick Info, das folgende Eigenschaften enthalten kann:
        - **_taskId?_** - (*string | number*) - optional, die ID der Aufgabe, die mit den Aktionsschaltflächen des Quick Info verknüpft ist
        - **_header?_** - (*object*) - optional, der Header des Popup-Bearbeitungsformulars, der enthalten kann:
            - **_title?_** - (*string*) - optional, der Titel des Popup-Bearbeitungsformulars
            - **_date?_** - (*string*) - optional, das Datum des Popup-Bearbeitungsformulars
        - **_content?_** - (*string*) - optional, der Inhalt des Popup-Bearbeitungsformulars
        - **_buttons?_** - (*string[]*) - optional, Schaltflächen, die im Popup-Bearbeitungsformular angezeigt werden sollen
  


Wenn sowohl Header als auch Buttons weggelassen werden, werden die entsprechenden Bereiche des Quick Info Popups ausgeblendet.

Ein Beispiel für ein Konfigurationsobjekt für die **setContent**-Methode:

~~~js
const quickInfo = gantt.ext.quickInfo;
var task = gantt.getTask(10);
quickInfo.show(task.id);
quickInfo.setContent({
    taskId: task.id,
    header: {
        title: gantt.templates.quick_info_title(task.start_date, task.end_date, task),
        date: gantt.templates.quick_info_date(task.start_date, task.end_date, task)
    },
    content: gantt.templates.quick_info_content(task.start_date, task.end_date, task),
    buttons: gantt.config.quickinfo_buttons
});
~~~

Alternativ

Ein benutzerdefiniertes Popup kann ohne Header und Buttons erstellt werden:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.show(100, 100);
quickInfo.setContent({
    content: "my custom html",
    buttons: []
});
~~~
