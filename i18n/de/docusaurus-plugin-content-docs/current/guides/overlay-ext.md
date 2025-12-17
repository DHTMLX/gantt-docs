---
title: "Overlay-Erweiterung"
sidebar_label: "Overlay-Erweiterung"
---

Overlay-Erweiterung
======================

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Die **overlay**-Erweiterung stellt eine Sammlung von API-Methoden bereit, die die Arbeit mit Overlays vereinfachen. Ausführlichere Informationen finden Sie im Artikel [Custom Elements in Timeline Area](guides/baselines.md#extraoverlayforthechart).

Methoden
------------

Die folgenden Methoden sind über das Objekt **gantt.ext.overlay** zugänglich:

### addOverlay

- <span class="submethod">**addOverlay (render, id): string | number**</span> - fügt dem Gantt-Diagramm ein neues Overlay hinzu und gibt dessen ID zurück
    - **_render_** - (*Function*): HTMLElement - die Funktion, die für das Rendering verantwortlich ist. Sie erhält einen Container mit benutzerdefiniertem Inhalt als Parameter
        - **_container_** - (*HTMLElement*) - der Container für das Overlay
    - **_id?_** - (*number | string*) - optional, gibt die ID des Overlays an


~~~js
var overlay = gantt.ext.overlay.addOverlay(function(container){});
~~~

### deleteOverlay

- <span class="submethod">**deleteOverlay (id): boolean**</span> - entfernt ein Overlay anhand seiner ID
    - **_id_** - (*number | string*) - die ID des Overlays

~~~js
gantt.ext.overlay.deleteOverlay(id);
~~~

### getOverlaysIds 

- <span class="submethod">**getOverlaysIds (): Array&lt;string&gt;**</span> - gibt ein Array mit den IDs der dem Diagramm hinzugefügten Overlays zurück

~~~js
var ids = gantt.ext.overlay.getOverlaysIds();
~~~

### refreshOverlay

- <span class="submethod">**refreshOverlay (id): void**</span> - zeichnet das angegebene Overlay neu.
    - **_id_** - (*number | string*) - die ID des Overlays

~~~js
gantt.ext.overlay.refreshOverlay(id);
~~~

### showOverlay

- <span class="submethod">**showOverlay (id): void**</span> - macht ein Overlay anhand seiner ID sichtbar.
    - **_id_** - (*number | string*) - die ID des Overlays

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

### hideOverlay

- <span class="submethod">**hideOverlay (id): void**</span> - blendet ein Overlay anhand seiner ID aus
    - **_id_** - (*number | string*) - die ID des Overlays

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

### isOverlayVisible

- <span class="submethod">**isOverlayVisible (id): boolean**</span> - prüft, ob das angegebene Overlay sichtbar ist. Gibt *true* zurück, falls ja.
    - **_id_** - (*number | string*) - die ID des Overlays

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~
