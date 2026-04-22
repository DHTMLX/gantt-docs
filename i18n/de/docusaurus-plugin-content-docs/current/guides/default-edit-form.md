---
title: "Konfiguration der Lightbox-Elemente"
sidebar_label: "Konfiguration der Lightbox-Elemente"
---

# Konfiguration der Lightbox-Elemente

Lightbox ist ein Bearbeitungsformular zur Änderung von Aufgabendetails.

Die Standard-Lightbox wird im unten gezeigten Bild dargestellt.

![lightbox](/img/lightbox.png)

Die Lightbox-Konfiguration kann je nach Aufgabentyp variieren. Die Einstellungen für jeden Typ werden im [lightbox](api/config/lightbox.md)-Objekt gespeichert:

- **gantt.config.lightbox.sections** - für reguläre Aufgaben.
- **gantt.config.lightbox.project_sections** - für Projektaufgaben.
- **gantt.config.lightbox.milestone_sections** - für Meilensteine.

Sie können auch [einen benutzerdefinierten Typ hinzufügen](guides/task-types.md#creating-a-custom-type) und eine Lightbox-Struktur dafür definieren. 
Für Details siehe [Task Types](guides/task-types.md#specificlightboxpertasktype).

Die allgemeine Typ-Struktur sieht folgendermaßen aus:

- <span class="subproperty">**sections?**</span> - (*LightboxSection[]*) - optional, das Lightbox-Abschnitts-Array für reguläre Aufgaben
- <span class="subproperty">**project_sections?**</span> - (*LightboxSection[]*) - optional, das Lightbox-Abschnitts-Array für Projektaufgaben
- <span class="subproperty">**milestone_sections?**</span> - (*LightboxSection[]*) - optional, das Lightbox-Abschnitts-Array für Meilensteine
- <span class="subproperty">**[lightboxType: string]**</span> - (*LightboxSection[] | undefined*) - das Lightbox-Abschnitts-Array für den benutzerdefinierten Typ


:::note
Ab Version v7.1.13 gilt: Wenn entweder [gantt.config.csp](api/config/csp.md) auf *true* gesetzt ist oder Gantt in der Salesforce-Umgebung läuft, wird die Lightbox innerhalb des Gantt-Containers gerendert.
:::

## Lightbox-Struktur

### Abschnitte

Die Struktur der Lightbox wird durch die **sections**-Eigenschaft des Lightbox-Objekts festgelegt:

~~~js
// Standard-Lightbox-Definition
gantt.config.lightbox.sections = [
    { name: 'description', height: 70, map_to: 'text', type: 'textarea', focus: true },
    { name: 'time', height: 72, map_to: 'auto', type: 'duration' }
];
~~~

Jeder Eintrag im **sections**-Array ist ein Objekt, das einen einzelnen Abschnitt in der Lightbox definiert.
Siehe [lightbox config](api/config/lightbox.md) für verfügbare Abschnittseigenschaften.


### Abschnittsteuerungen {#lightboxcontrols}

Jeder Abschnitt der Lightbox basiert auf einem Steuerelement. Die folgenden Typen von Steuerelementen stehen in der Lightbox zur Verfügung:

- [Textarea] - ein mehrzeiliges Texteingabefeld
- [Time] - ein Paar Auswahlelemente zur Festlegung der Aufgabendauer durch Angabe des Start- und Enddatums der Aufgabe
- [Duration] - eine Gruppe von Auswahlelementen zur Festlegung der Aufgabendauer durch Angabe des Startdatums der Aufgabe und der Anzahl der Tage
- [Select] - eine einfache Auswahlliste
- [Typeselect] - eine Auswahlliste zur Änderung des Aufgabentyps
- [Parent] - eine Auswahlliste zum Ändern des übergeordneten Elements einer Aufgabe
- [Template] - ein Container mit etwas HTML-Inhalt darin
- [Checkbox] - ein Kontrollkästchen zum Ein-/Aus-Schalten einer Option oder mehrerer Werte
- [Radio button] - ein Optionsknopf zur Auswahl genau einer Option aus einem festgelegten Optionssatz
- [Resources] - eine komplexe Steuerung zur Zuweisung mehrerer Ressourcen zu einer Aufgabe
- [Resource Assignments] - eine erweiterte Steuerung zur Zuweisung von Ressourcen zu einer Aufgabe
- [Constraint] - eine komplexe Steuerung zum Festlegen von Beschränkungen für eine Aufgabe
- [Baselines] - eine komplexe Steuerung zum Festlegen von Basislinien für eine Aufgabe

~~~js
const opts = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Normal' },
    { key: 3, label: 'Low' }
];

gantt.config.lightbox.sections = [
    { name: 'description', height: 38, map_to: 'text', type: 'textarea', focus: true },
    { name: 'priority', height: 22, map_to: 'priority', type: 'select', options: opts },
    { name: 'time', height: 72, map_to: 'auto', type: 'duration' }
];
~~~

