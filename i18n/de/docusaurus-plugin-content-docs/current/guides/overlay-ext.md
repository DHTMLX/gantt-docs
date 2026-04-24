---
title: "Overlay-Erweiterung"
sidebar_label: "Overlay-Erweiterung"
---

# Overlay-Erweiterung

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Die **overlay**-Erweiterung enthält eine Reihe von API-Methoden, um die Arbeit mit Overlays zu vereinfachen. Details zur Overlay-Erweiterung finden Sie im Artikel [Benutzerdefinierte Elemente im Timeline-Bereich](guides/baselines.md#extra-overlay-for-the-chart).

## Methoden

Die folgenden Methoden sind über das Objekt **gantt.ext.overlay** verfügbar:

### addOverlay

- <span class="submethod">**addOverlay (render, id): string | number**</span> - fügt ein neues Overlay in das Gantt-Diagramm ein und gibt dessen ID zurück
    - **_render_** - (*Function*): HTMLElement - die Render-Funktion. Nimmt einen Container mit benutzerdefiniertem Inhalt als Parameter
        - **_container_** - (*HTMLElement*) - der Overlay-Container
    - **_id?_** - (*number | string*) - optional, die ID des Overlays


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

- <span class="submethod">**showOverlay (id): void**</span> - zeigt ein Overlay anhand seiner ID an.
    - **_id_** - (*number | string*) - die ID des Overlays

~~~js
gantt.ext.overlay.showOverlay(id);
~~~

### hideOverlay

- <span class="submethod">**hideOverlay (id): void**</span> - versteckt ein Overlay anhand seiner ID
    - **_id_** - (*number | string*) - die ID des Overlays

~~~js
gantt.ext.overlay.hideOverlay(id);
~~~

### isOverlayVisible

- <span class="submethod">**isOverlayVisible (id): boolean**</span> - prüft die Sichtbarkeit des angegebenen Overlays. Gibt *true* zurück, wenn das Overlay sichtbar ist.
    - **_id_** - (*number | string*) - die ID des Overlays

~~~js
var isVisible = gantt.ext.overlay.isOverlayVisible(id);
~~~