---
title: "Barrierefreiheit"
sidebar_label: "Barrierefreiheit"
---

Barrierefreiheit
=================

[Barrierefreiheit](https://www.w3.org/WAI/fundamentals/accessibility-intro/) ist ein wichtiger Standard für moderne Webanwendungen.
Es gibt verschiedene Techniken, die darauf abzielen, eine Anwendung oder Website benutzerfreundlicher und zugänglicher zu machen.

Um den Zugang und die Interaktion mit DHTMLX Gantt für Nutzer mit Behinderungen zu verbessern, beinhaltet die Komponente mehrere Funktionen zur Barrierefreiheit:

- WAI-ARIA-Attribute
- Tastaturnavigation
- Hochkontrast-Thema

WAI-ARIA-Attribute
----------------------

DHTMLXGantt unterstützt WAI-ARIA, indem spezielle Attribute in das Markup der Komponente integriert werden.
Diese zusätzlichen Attribute helfen Screenreadern, die Komponente korrekt zu interpretieren.

Weitere Informationen finden Sie in der [offiziellen Spezifikation](https://www.w3.org/WAI/standards-guidelines/aria/) von WAI-ARIA.

WAI-ARIA-Attribute sind in Gantt standardmäßig aktiviert. Um sie zu deaktivieren, setzen Sie die Eigenschaft *wai_aria_attributes* auf *false*:

~~~js
gantt.config.wai_aria_attributes = true;
~~~

Tastaturnavigation
-------------------

Mit dieser Methode wird sichergestellt, dass alle Funktionen der Anwendung über Tasten und Tastenkombinationen zugänglich sind,
sodass die Navigation mit der Maus nicht erforderlich ist.

Weitere Informationen finden Sie im Artikel [Keyboard Navigation](guides/keyboard-navigation.md).

Hochkontrast-Themen
--------------------

DHTMLXGantt bietet ein Thema mit kontrastreichen Farben, die die Benutzeroberfläche klarer und besser sichtbar machen.
Dieses Hochkontrast-Thema ist besonders hilfreich für Nutzer mit speziellen Sehbedürfnissen.

Es stehen zwei Optionen für das Kontrastthema zur Verfügung:

- Kontrast Skin Schwarz

![contrast_black_skin](/img/contrast_black_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_black.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~


[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)


- Kontrast Skin Weiß

![contrast_white_skin](/img/contrast_white_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_white.css" 
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~


[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)
