---
title: "Konfiguration der Lightbox-Elemente"
sidebar_label: "Konfiguration der Lightbox-Elemente"
---

# Konfiguration der Lightbox-Elemente 


Die Lightbox dient als Bearbeitungsformular zur Aktualisierung von Aufgabendetails. 

 Nachfolgend ist das Standardlayout der Lightbox dargestellt.

![lightbox](/img/lightbox.png)

Lightboxen können je nach Aufgabentyp und dessen spezifischen Eigenschaften variieren. Die Konfigurationseinstellungen für jeden Aufgabentyp finden Sie im Objekt [lightbox](api/config/lightbox.md). Dazu gehören:

- **gantt.config.lightbox.sections** - für Standardaufgaben.
- **gantt.config.lightbox.project_sections** - für Projektaufgaben.
- **gantt.config.lightbox.milestone_sections** - für Meilensteine.

Es ist außerdem möglich, [einen benutzerdefinierten Typ hinzuzufügen](guides/task-types.md#creatingacustomtype) und die Struktur der Lightbox entsprechend festzulegen.
Weitere Details finden Sie unter [Task Types](guides/task-types.md#specificlightboxpertasktype).

Die generelle Struktur der Typen ist wie folgt:

- <span class="subproperty">**sections?**</span> - (*LightboxSection[]*) - optional, Array von Lightbox-Abschnitten für reguläre Aufgaben
- <span class="subproperty">**project_sections?**</span> - (*LightboxSection[]*) - optional, Array von Lightbox-Abschnitten für Projektaufgaben
- <span class="subproperty">**milestone_sections?**</span> - (*LightboxSection[]*) - optional, Array von Lightbox-Abschnitten für Meilensteine
- <span class="subproperty">**[lightboxType: string]**</span> - (*LightboxSection[] | undefined*) - Array von Lightbox-Abschnitten für benutzerdefinierte Typen


:::note
Ab Version v7.1.13, wenn entweder [gantt.config.csp](api/config/csp.md) auf *true* gesetzt ist oder Gantt in einer Salesforce-Umgebung ausgeführt wird, wird die Lightbox innerhalb des Gantt-Containers gerendert.
:::

## Lightbox-Struktur


### Abschnitte

Das Layout der Lightbox wird durch die Eigenschaft **sections** im Lightbox-Objekt definiert:

~~~js
// Standarddefinition der Lightbox   
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",          height:72, map_to:"auto", type:"duration"}
];
~~~

Jeder Eintrag im **sections**-Array stellt einen Abschnitt der Lightbox dar, der durch ein Objekt mit verfügbaren Abschnittseigenschaften beschrieben wird.


### Abschnitts-Steuerelemente {#lightboxcontrols}

Jeder Abschnitt in der Lightbox basiert auf einem bestimmten Steuerelementtyp. Die folgenden Steuerelemente stehen zur Verfügung:

- [Textarea](guides/textarea.md) - ein mehrzeiliges Texteingabefeld
- [Time](guides/time.md) - Auswahlelemente zur Einstellung von Start- und Enddatum der Aufgabe
- [Duration](guides/duration.md) - Auswahlelemente zur Einstellung des Startdatums und der Dauer in Tagen
- [Select](guides/select.md) - ein Dropdown-Auswahlfeld
- [Typeselect](guides/typeselect.md) - ein Dropdown zur Änderung des Aufgabentyps
- [Parent](guides/parent.md) - ein Dropdown zur Auswahl des übergeordneten Elements der Aufgabe
- [Template](guides/template.md) - ein Container zur Anzeige von benutzerdefiniertem HTML-Inhalt
- [Checkbox](guides/checkbox.md) - ein Kontrollkästchen zum Aktivieren oder Deaktivieren von Optionen
- [Radio button](guides/radio.md) - Optionsfelder zur Auswahl einer einzigen Option aus einer Gruppe
- [Resources](guides/resources.md) - ein komplexes Steuerelement zur Zuweisung mehrerer Ressourcen zu einer Aufgabe
- [Constraint](guides/constraint.md) - ein komplexes Steuerelement zum Festlegen von Aufgabenbeschränkungen
- [Baselines](guides/baseline.md) - ein komplexes Steuerelement zur Verwaltung von Aufgaben-Baselines

~~~js
var opts = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Normal' },
    { key: 3, label: 'Low' }
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority",      height:22, map_to:"priority", type:"select", options:opts},
    {name:"time",          height:72, map_to:"auto", type:"duration"}
];
~~~

