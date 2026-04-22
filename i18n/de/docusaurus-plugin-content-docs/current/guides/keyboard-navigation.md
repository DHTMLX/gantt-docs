--- 
title: "Tastaturnavigation"
sidebar_label: "Tastaturnavigation"
---

# Tastaturnavigation

Sie können über Tastenkombinationen auf Gantt und seine Elemente zugreifen. Dieser Artikel bietet Ihnen alle notwendigen Informationen zu den Besonderheiten der Tastaturnavigation mit Gantt, einschließlich Fokusverhalten, der Nutzung bereits vorhandener Shortcuts und der Erstellung eigener Shortcuts.

## Aktivierung der Funktionalität

Um die Tastaturnavigation im Gantt-Diagramm zu verwenden, müssen Sie das **keyboard_navigation**-Plugin über die Methode [gantt.plugins](api/method/plugins.md) aktivieren.

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

Die API des Objekts **gantt.ext.keyboardNavigation** wird im Artikel [Keyboard Navigation Extension](guides/keynav-ext.md) beschrieben.

Es gibt zwei Varianten der Tastaturnavigation:

- Navigation nach Aufgabenzeilen

Um dies zu aktivieren, setzen Sie die Eigenschaft [keyboard_navigation](api/config/keyboard_navigation.md) auf *true*.

- Navigation nach Aufgabenzellen  

Um diese Art der Navigation zu verwenden, setzen Sie die Eigenschaft [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md) auf *true*.

## Fokusverhalten während der Tastaturnavigation

### Fokus auf Gantt

Wenn die Tab-Taste gedrückt wird, erhält Gantt den Fokus wie jedes andere Element. Anschließend können Sie Gantt mit den Pfeiltasten und anderen Tasten navigieren.

Wenn die Tab-Taste ein zweites Mal gedrückt wird, verlässt der Fokus Gantt und wird an eine andere Stelle auf der Seite verschoben.

### Fokus auf ein Modalfenster

Wenn ein Modalfenster (eine Lightbox, ein Bestätigungsfenster) geöffnet wird, verschiebt sich der Fokus von Gantt auf dieses Fenster und die Navigation erfolgt innerhalb dieses Fensters wie in einem einfachen Formular. Wenn das Fenster geschlossen wird, kehrt der Fokus zu Gantt zurück.

Um den Fokus wieder auf Gantt zu setzen, verwenden Sie die [focus](api/method/focus.md) Methode. Wenn Gantt erneut den Fokus erhält, wird der Fokus auf das aktive Element innerhalb von Gantt gesetzt, oder auf die erste Zeile bzw. das zuletzt ausgewählte Element.

Die Standard-Navigationsaktionen in einem Modalfenster lauten wie folgt:

- *Enter* - bestätigen und schließen
- *Escape* - schließt ohne Änderungen

Wenn der Fokus auf einem Button des Formulars liegt, bewirkt das Drücken von *Space* oder *Enter*, dass der Button mit Fokus ausgelöst wird und nicht die Aktion.

:::note
Wenn Sie den Fokus auf eine Grid-Zelle/eine Grid-Zeile setzen und anschließend auf ein benutzerdefiniertes HTML-Element innerhalb des Gantt klicken, wird der Fokus wieder auf die Grid-Zelle/die Grid-Zeile zurückgesetzt.

Ab Version 7.1.13 können Sie der benutzerdefinierten Elementklasse *'no_keyboard_navigation'* hinzufügen, damit der Fokus nicht auf die Grid-Zelle/die Grid-Zeile wiederhergestellt wird.
:::

## Bereiche (Scopes)

Eine durch einen Tastendruck ausgelöste Aktion hängt vom Kontext ab. Das bedeutet, dass unterschiedliche Aktionen an verschiedene Elemente (Bereiche) gebunden werden können. Es gibt die folgenden Kontext-Elemente (Bereiche) im Gantt-Diagramm:

- "**gantt**" - Das gesamte Gantt-Diagramm
- "**\"taskRow\"**" - Eine Zeile mit einer Aufgabe
- "**\"taskCell\"**" - Eine Zelle der Zeile mit einer Aufgabe
- "**\"headerCell\"**" - Eine Zelle der Kopfzeile

Wenn derselbe Shortcut an mehrere Bereiche gebunden ist, wird der spezifischere Shortcut ausgelöst. Das bedeutet, dass, wenn derselbe Shortcut an Gantt und an sein Element gebunden ist, der an einem Element gebundene Shortcut aufgerufen wird, statt des Shortcuts, der dem gesamten Gantt zugeordnet ist.

### Hinzufügen eines Shortcuts

Um einen neuen Tastenkürzel zu erstellen, verwenden Sie die Methode [addShortcut](api/method/addshortcut.md) und übergeben drei Parameter:

- **shortcut** - (*string*) ein neuer Schlüssel oder Name der Tastenkombination
- **handler** - (*function*) eine Handler-Funktion, die beim Aufruf des Shortcuts ausgeführt wird
- **scope** - (*string*) optional, der Name des Kontext-Elements, an das die Handler-Funktion angehängt wird; standardmäßig **"gantt"**

~~~js
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");
~~~

### Entfernen eines Shortcuts

Um einen Shortcut aus dem Scope zu entfernen, verwenden Sie die Methode [removeShortcut](api/method/removeshortcut.md). Die Methode nimmt zwei Parameter entgegen:

- **shortcut** - (*string*) der Name der Taste oder der Tastenkombination für den Shortcut 
- **scope** - (*string*) der Name des Kontext-Elements, an das der Shortcut angehängt ist

~~~js
gantt.removeShortcut("shift+w","taskRow");
~~~

### Abrufen eines Shortcut-Handlers

Sie können den Handler des Shortcuts mithilfe der Methode [getShortcutHandler](api/method/getshortcuthandler.md) abrufen. Sie nimmt zwei Parameter entgegen:

- **shortcut** - (*string*) der Name der Taste oder der Tastenkombination für den Shortcut 
- **scope** - (*string*) der Name des Kontext-Elements, an das der Shortcut angehängt ist

~~~js
var shortcut_handler = gantt.getShortcutHandler("shift+w","taskRow");
~~~

Die Methode gibt eine Funktion zurück, die den Handler des Shortcuts beim Aufruf darstellt.

## Shortcut-Syntax {#shortcutsyntax}

Eine Tastenkombination kann aus den folgenden Tasten oder Tastenkombinationen bestehen:

- eine Modifikatortaste + eine Zeichen-Taste ("ctrl+a");
- eine Modifikatortaste + eine Nicht-Zeichen-Taste ("ctrl+space");
- eine Zeichen-Taste ("a");
- eine Nicht-Zeichen-Taste ("space")

Es kann mehrere Tastenkombinationen für eine Aktion geben. In diesem Fall werden alle Kombinationen durch ein Komma getrennt aufgelistet: "ctrl+a, ctrl+space".

### Die Liste der unterstützten Tasten für Shortcuts

- Modifikatortasten: **shift**, **alt**, **ctrl**, **meta**;
- Nicht-Zeichen-Tasten: **backspace**, **tab**, **enter**, **esc**, **space**, **up**, **down**, **left**, **right**, **home**, **end**, **pageup**, **pagedown**, **delete**,
**insert**, **plus**, **f1-f12**.

## Vorhandene Shortcuts {#existingshortcuts}

Es gibt eine Reihe fertiger Shortcuts, mit denen Sie durch das Gantt-Diagramm navigieren können:

### Allgemeine Tastenkombinationen:

- **Tab** - Fokus auf Gantt setzen
- **Alt+Up/Down** - Gantt vertikal scrollen
- **Alt+Left/Right** - Gantt horizontal scrollen
- **Ctrl+Enter** - Neue Aufgabe erstellen
- **Ctrl+Z** - Aktion rückgängig machen
- **Ctrl+R** - Aktion wiederherstellen

### Shortcuts für Headerzellen

- **Left/Right Arrow Keys** - über Headerzellen navigieren
- **Home/End** - zur ersten/letzten Spalte navigieren
- **Down** - zu den Zeilen mit Aufgaben wechseln
- **Space/Enter** - auf die Kopfzeile klicken (zum Sortieren)

### Shortcuts für Aufgabenzeilen

- **Up/Down** - durch die Zeilen navigieren
- **PageDown/PageUp** - zur ersten/letzten Aufgabe navigieren
- **Space** - eine Aufgabe auswählen
- **Ctrl+Enter** - Neue Aufgabe erstellen
- **Delete** - die ausgewählte Aufgabe entfernen
- **Enter** - Lightbox öffnen
- **Ctrl+Left/Right** - Baum erweitern/verkleinern
- **Shift+Left/Right** - Aufgabe einrücken/ausrücken
- **Shift+Down/Up** - Zweig erweitern/einklappen

[Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)

:::note
Sie finden ein Beispiel, wie Sie das Kopieren/Einfügen von Aufgaben über die Tastenkombinationen **Ctrl+C/Ctrl+V** implementieren können, im [verwandten](guides/how-to.md#how-to-copy-and-paste-tasks) Artikel.
:::

### Shortcuts für Aufgabenzellen

- **Up/Down/Left/Right Arrow Keys** - über Aufgabenzellen navigieren
- **PageDown/PageUp** - zur ersten/letzten Zelle in einer Spalte navigieren
- **Home/End** - zur ersten/letzten Zelle in einer Spalte navigieren
- **Space** - eine Aufgabe auswählen
- **Ctrl+Enter** - Neue Aufgabe erstellen
- **Delete** - die ausgewählte Aufgabe entfernen
- **Enter** - Lightbox öffnen
- **Ctrl+Left/Right** - Baum erweitern/verkleinern

[Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

## Eingebauter Shortcut für horizontales Timeline-Scrolling {#builtinshortcutforhorizontaltimelinescrolling}

Ab Version 4.2 bietet das Gantt-Diagramm die Möglichkeit, die Timeline horizontal zu scrollen, und zwar mit der folgenden Kombination:

- → **Shift**-Taste + **Mausrad-Bewegung**.

Ab Version 6.3 können Sie alternativ die **Alt**- oder **Meta**-Taste in der Kombination mit dem Mausrad statt der standardmäßigen **Shift**-Taste über die Eigenschaft [horizontal_scroll_key](api/config/horizontal_scroll_key.md) festlegen:

~~~js
gantt.config.horizontal_scroll_key = "altKey";
~~~

oder das horizontale Scrollen deaktivieren, indem Sie die Eigenschaft [horizontal_scroll_key](api/config/horizontal_scroll_key.md) auf *false* setzen:

~~~js
gantt.config.horizontal_scroll_key = false;
~~~