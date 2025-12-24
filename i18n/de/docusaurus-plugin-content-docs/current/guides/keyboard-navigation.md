---
title: "Tastaturnavigation"
sidebar_label: "Tastaturnavigation"
---

# Tastaturnavigation


Das Gantt-Diagramm und seine Elemente können mithilfe von Tasten oder Tastenkombinationen bedient werden. Dieser Artikel behandelt die Grundlagen der Tastaturnavigation im Gantt-Diagramm, einschließlich des Fokusverhaltens, der Verwendung von integrierten Shortcuts und wie Sie eigene Shortcuts erstellen können.

## Aktivierung der Funktionalität

Um die Tastaturnavigation im Gantt-Diagramm zu aktivieren, schalten Sie das **keyboard_navigation**-Plugin mit der [gantt.plugins](api/method/plugins.md)-Methode ein.

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

Details zur **gantt.ext.keyboardNavigation** API finden Sie im Artikel [Keyboard Navigation Extension](guides/keynav-ext.md).

Es gibt zwei Arten der Tastaturnavigation:

- Navigation über Aufgabenzeilen

Aktivieren Sie dies, indem Sie die [keyboard_navigation](api/config/keyboard_navigation.md)-Eigenschaft auf *true* setzen.

- Navigation über Aufgabenzellen  

Aktivieren Sie dies, indem Sie die [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)-Eigenschaft auf *true* setzen.

## Fokusverhalten während der Tastaturnavigation

### Fokus auf Gantt

Durch Drücken der Tabulatortaste wird der Fokus auf das Gantt-Diagramm gesetzt, wie bei jedem Standard-Element. Sobald der Fokus gesetzt ist, können Pfeiltasten und andere Tasten verwendet werden, um im Gantt-Diagramm zu navigieren.

Durch erneutes Drücken von Tab springt der Fokus vom Gantt-Diagramm zu einem anderen Bereich der Seite.

### Fokus auf ein modales Fenster

Wenn ein modales Fenster (wie ein Lightbox- oder Bestätigungsfenster) geöffnet wird, verschiebt sich der Fokus vom Gantt-Diagramm auf das Modal und die Navigation erfolgt darin wie in einem typischen Formular. Nach dem Schließen des Fensters kehrt der Fokus zum Gantt-Diagramm zurück.

Um den Fokus wieder auf das Gantt-Diagramm zu setzen, verwenden Sie die [focus](api/method/focus.md)-Methode. Wenn das Gantt-Diagramm den Fokus zurückerhält, wird er entweder auf das aktive Element im Diagramm, die erste Zeile oder das zuletzt ausgewählte Element gesetzt.

Standardaktionen für die Navigation in einem modalen Fenster umfassen:

- *Enter* - bestätigen und schließen
- *Escape* - schließen ohne Änderungen

Wenn der Fokus auf einem Formular-Button liegt, aktiviert das Drücken von *Leertaste* oder *Enter* diesen Button, anstatt die Standardaktion des Modals auszulösen.


:::note
Wenn der Fokus auf einer Gitterzelle oder -zeile liegt und dann ein benutzerdefiniertes HTML-Element im Gantt-Diagramm angeklickt wird, kehrt der Fokus zur Gitterzelle oder -zeile zurück.

Ab Version v7.1.13 verhindert das Hinzufügen der Klasse *'no_keyboard_navigation'* zu einem benutzerdefinierten Element, dass der Fokus zur Gitterzelle oder -zeile zurückkehrt.
:::

## Geltungsbereiche (Scopes) {#scopes}

Die durch einen Tastendruck ausgelöste Aktion hängt vom Kontext (Scope) ab. Verschiedene Shortcuts können unterschiedlichen Elementen (Scopes) im Gantt-Diagramm zugewiesen werden:

- **"gantt"** - Das gesamte Gantt-Diagramm
- **"taskRow"** - Eine Zeile, die eine Aufgabe darstellt
- **"taskCell"** - Eine Zelle innerhalb einer Aufgabenzeile
- **"headerCell"** - Eine Zelle in der Kopfzeile

Wenn derselbe Shortcut mehreren Scopes zugewiesen ist, hat der spezifischere Vorrang. Wenn z. B. ein Shortcut sowohl dem Gantt-Diagramm als auch einem Element zugewiesen ist, wird der Shortcut des Elements ausgelöst.

### Hinzufügen eines Shortcuts

Um einen neuen Tastatur-Shortcut hinzuzufügen, verwenden Sie die [addShortcut](api/method/addshortcut.md)-Methode mit drei Parametern:

- **shortcut** - (*string*) die Tastenkombination
- **handler** - (*function*) Funktion, die beim Auslösen des Shortcuts aufgerufen wird
- **scope** - (*string*) optional, das Kontextelement für den Handler; Standard ist "gantt"

~~~js
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");
~~~

### Entfernen eines Shortcuts

Um einen Shortcut aus einem Scope zu entfernen, verwenden Sie die [removeShortcut](api/method/removeshortcut.md)-Methode mit zwei Parametern:

- **shortcut** - (*string*) die zu entfernende Tastenkombination
- **scope** - (*string*) das Kontextelement, aus dem der Shortcut entfernt werden soll

~~~js
gantt.removeShortcut("shift+w","taskRow");
~~~

### Abrufen eines Shortcut-Handlers

Sie können die Handler-Funktion für einen Shortcut mit der [getShortcutHandler](api/method/getshortcuthandler.md)-Methode abrufen, die folgende Parameter erwartet:

- **shortcut** - (*string*) die Tastenkombination
- **scope** - (*string*) das Kontextelement, an das der Shortcut gebunden ist

~~~js
var shortcut_handler = gantt.getShortcutHandler("shift+w","taskRow");
~~~

Diese Methode gibt die Funktion zurück, die den Shortcut verarbeitet.

## Shortcut-Syntax

Tastatur-Shortcuts können enthalten:

- eine Modifikatortaste plus eine Zeichentaste (z. B. "ctrl+a");
- eine Modifikatortaste plus eine Nicht-Zeichentaste (z. B. "ctrl+space");
- eine einzelne Zeichentaste (z. B. "a");
- eine einzelne Nicht-Zeichentaste (z. B. "space")

Mehrere Tastenkombinationen für eine Aktion können durch Kommas getrennt aufgelistet werden, z. B. "ctrl+a, ctrl+space".

### Unterstützte Tasten für Shortcuts

- Modifikatortasten: **shift**, **alt**, **ctrl**, **meta**
- Nicht-Zeichentasten: **backspace**, **tab**, **enter**, **esc**, **space**, **up**, **down**, **left**, **right**, **home**, **end**, **pageup**, **pagedown**, **delete**, **insert**, **plus**, **f1-f12**

## Vorhandene Shortcuts 

Es gibt mehrere integrierte Shortcuts zur Navigation im Gantt-Diagramm:

### Allgemeine Tastatur-Shortcuts:

- **Tab** - Fokus auf Gantt-Diagramm setzen
- **Alt+Auf/Ab** - vertikal scrollen
- **Alt+Links/Rechts** - horizontal scrollen
- **Ctrl+Enter** - neue Aufgabe erstellen
- **Ctrl+Z** - letzte Aktion rückgängig machen
- **Ctrl+R** - rückgängig gemachte Aktion wiederherstellen

### Shortcuts für Kopfzellen

- **Links/Rechts-Pfeil** - zwischen Kopfzellen wechseln
- **Home/End** - zur ersten/letzten Spalte springen
- **Ab** - zu Aufgabenzeilen wechseln
- **Leertaste/Enter** - Kopfzelle aktivieren (z. B. zum Sortieren)

### Shortcuts für Aufgabenzeilen

- **Auf/Ab** - durch Zeilen navigieren
- **PageDown/PageUp** - zur letzten/ersten Aufgabe springen
- **Leertaste** - eine Aufgabe auswählen
- **Ctrl+Enter** - neue Aufgabe erstellen
- **Delete** - ausgewählte Aufgabe löschen
- **Enter** - Lightbox öffnen
- **Ctrl+Links/Rechts** - Baum ein-/ausklappen
- **Shift+Links/Rechts** - Aufgabe ein-/ausrücken
- **Shift+Ab/Auf** - Zweig ein-/ausklappen


[Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)


:::note
Ein Beispiel, wie Sie das Kopieren/Einfügen von Aufgaben mit den Shortcuts **Ctrl+C/Ctrl+V** umsetzen können, finden Sie im [zugehörigen](guides/how-to.md#howtocopyandpastetasks) Artikel.
:::

### Shortcuts für Aufgabenzellen

- **Auf/Ab/Links/Rechts-Pfeil** - zwischen Aufgabenzellen navigieren
- **PageDown/PageUp** - zur ersten/letzten Zelle einer Spalte springen
- **Home/End** - zur ersten/letzten Zelle einer Spalte springen
- **Leertaste** - eine Aufgabe auswählen
- **Ctrl+Enter** - neue Aufgabe erstellen
- **Delete** - ausgewählte Aufgabe löschen
- **Enter** - Lightbox öffnen
- **Ctrl+Links/Rechts** - Baum ein-/ausklappen


[Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)


## Integrierter Shortcut für horizontales Scrollen der Zeitleiste


Seit Version 4.2 unterstützt das Gantt-Diagramm das horizontale Scrollen der Zeitleiste mittels:

-> **Shift**-Taste + **Mausradbewegung**.

Ab Version 6.3 können Sie die Modifikatortaste von der Standard-**Shift**-Taste auf **Alt** oder **Meta** mit der [horizontal_scroll_key](api/config/horizontal_scroll_key.md)-Eigenschaft ändern:

~~~js
gantt.config.horizontal_scroll_key = "altKey";
~~~

Um das horizontale Scrollen mit dem Mausrad zu deaktivieren, setzen Sie die Eigenschaft auf *false*:

~~~js
gantt.config.horizontal_scroll_key = false;
~~~

