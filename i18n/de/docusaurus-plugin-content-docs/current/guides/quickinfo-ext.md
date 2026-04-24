---
title: "quickInfo-Erweiterung"
sidebar_label: "quickInfo-Erweiterung"
---

# quickInfo-Erweiterung

Lesen Sie Details zur quickInfo-Erweiterung im Artikel [Quick Info (Touch Support)](guides/quick-info.md).


Das *quickInfo*-Objekt besitzt die folgende API:

## Methoden

- <span class="submethod">**show (id): void**</span> - zeigt das Quick Info-Popup für ein angegebenes Element
    - **_id_** - (*number | string*) - die Aufgaben-ID
 
~~~js
gantt.ext.quickInfo.show("1");
~~~

- <span class="submethod">**show (x, y): void**</span> - zeigt das Quick Info-Popup an bestimmten Koordinaten
    - **_x_** - (*number | string*) - horizontale Koordinate
    - **_y_** - (*number | string*) - vertikale Koordinate

~~~js
gantt.ext.quickInfo.show(10,30);
~~~

- <span class="submethod">**hide (force): HTMLElement**</span> - versteckt das Quick Info-Popup. Wenn **gantt.config.quick_info_detached** auf *false* gesetzt ist, verschwindet das Quick Info nicht sofort, sondern nach einer kurzen Animation. Die Angabe eines Werts von *true* als Argument wird die Animation abbrechen und das Popup sofort entfernen.
    - **_force?_** - (*boolean*) - definiert, ob das Quick Info-Popup sofort ohne Animation versteckt wird


~~~js
gantt.config.quick_info_detached = false;
gantt.init("gantt_here");
 
// verstecke das Popup nach einer kurzen Animation
gantt.ext.quickInfo.hide();
 
// verstecke das Popup sofort
gantt.ext.quickInfo.hide(true);
~~~

- <span class="submethod">**setContainer (container): void**</span> - setzt einen Container, in dem das Quick Info angezeigt wird. Falls kein benutzerdefinierter Container angegeben ist, wird QuickInfo in dem ersten der gefundenen Knoten platziert: **gantt.$task, gantt.$grid, gantt.$root**
    - **_container_** - (*HTMLElement | string*) - Containelement oder dessen ID

~~~js
gantt.ext.quickInfo.setContainer(document.body);
gantt.ext.quickInfo.show(1300,100);

~~~

- <span class="submethod">**getNode (): HTMLElement | null**</span> - gibt das HTMLElement des Quick Info-Popups zurück. Gibt *null* zurück, wenn das Quick Info nicht initialisiert ist

~~~js
const node = gantt.ext.quickInfo.getNode();
~~~

Das zurückgegebene DOM-Element des angezeigten Quick Info sieht wie folgt aus:

![quick_node](/img/quick_node.png)

- <span class="submethod">**setContent (config): void**</span> - setzt den Inhalt in das Quick Info
    - **_config?_** - (*object*) - optional, das Konfigurationsobjekt einer Quick Info, das die folgenden Attribute enthalten kann:
        - **_taskId?_** - (*string | number*) - optional, die ID der Aufgabe, mit der die Aktions-Schaltflächen der Quick Info verbunden werden
        - **_header?_** - (*object*) - optional, der Header des Pop-up-Edit-Formulars, der Folgendes umfassen kann:
            - **_title?_** - (*string*) - optional, der Titel des Pop-up-Edit-Formulars
            - **_date?_** - (*string*) - optional, das Datum des Pop-up-Edit-Formulars
        - **_content?_** - (*string*) - optional, der Inhalt des Pop-up-Edit-Formulars
        - **_buttons?_** - (*string[]*) - optional, Buttons, die im Pop-up-Edit-Formular platziert werden sollen
   


Wenn weder Header noch Buttons angegeben sind, werden die entsprechenden Bereiche des Quick Info-Popups versteckt.

Hier ist, wie das Konfigurationsobjekt der **setContent**-Methode aussehen kann:

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

oder

Sie können ein benutzerdefiniertes Pop-up ohne Header und Buttons erstellen:

~~~js
const quickInfo = gantt.ext.quickInfo;
quickInfo.show(100, 100);
quickInfo.setContent({
    content: "my custom html",
    buttons: []
});
~~~