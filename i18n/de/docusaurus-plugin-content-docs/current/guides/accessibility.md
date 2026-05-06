---
title: "Barrierefreiheit"
sidebar_label: "Barrierefreiheit"
---

# Barrierefreiheit

[Barrierefreiheit](https://www.w3.org/WAI/fundamentals/accessibility-intro/) ist ein wichtiger und notwendiger Standard für moderne Webanwendungen.  
Es gibt eine Reihe verschiedener Techniken, die eine Anwendung oder eine Webseite benutzerfreundlicher nutzbar machen.  

Um den Zugriff und die Interaktion mit DHTMLX Gantt für Menschen mit Behinderungen zu erleichtern, enthält die Komponente eine Reihe von Barrierefreiheitsfunktionen:

- WAI-ARIA-Attribute
- Tastaturnavigation
- Kontrastthema

## WAI-ARIA-Attribute

DHTMLXGantt bietet WAI-ARIA-Unterstützung, die die Verwendung spezieller Attribute im Markup der Komponente ermöglicht.  

Dies sind zusätzliche Attribute, die die Komponente für Screen-Reader erkennbar machen. 

Weitere Informationen finden Sie in der [offiziellen Spezifikation](https://www.w3.org/WAI/standards-guidelines/aria/) von WAI-ARIA.

WAI-ARIA-Attribute in Gantt sind standardmäßig aktiviert, um sie zu deaktivieren, können Sie die *wai_aria_attributes*-Eigenschaft mit dem *false*-Wert verwenden:

~~~js
gantt.config.wai_aria_attributes = true;
~~~

## Tastaturnavigation

Diese Technik ermöglicht den Zugriff auf alle Funktionen einer Anwendung über die entsprechenden Tasten und Tastenkombinationen, statt über die Maus durch die Anwendung zu navigieren. 

Detaillierte Informationen finden Sie im Artikel [Tastaturnavigation](guides/keyboard-navigation.md).

## Kontrastthemen {#highcontrastthemes}

DHTMLXGantt unterstützt ein Theme, das kontrastreiche Farben verwendet und die Benutzeroberfläche der Anwendung deutlicher absetzt und besser sichtbar macht.  
Das Kontrast-Thema ist hilfreich für Personen mit speziellen oder besonderen visuellen Anforderungen.

Es gibt zwei Varianten des Kontrast-Themes:

- contrast_black_skin

![contrast_black_skin](/img/contrast_black_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_black.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~


[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


- contrast white skin

![contrast_white_skin](/img/contrast_white_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_white.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~


[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)