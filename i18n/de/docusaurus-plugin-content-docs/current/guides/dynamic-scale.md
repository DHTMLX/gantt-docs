---
title: "Dynamische Änderung der Skaleneinstellungen"
sidebar_label: "Dynamische Änderung der Skaleneinstellungen"
---

# Dynamische Änderung der Skaleneinstellungen

Die Änderung der Skala im laufenden Betrieb hilft Ihnen, ein Gantt-Diagramm flexibel zu gestalten – es an die Bedürfnisse des Benutzers anzupassen.

Beispielsweise hat ein Manager ein einjähriges Projekt. Um das Gesamtbild des Projekts zu erfassen, ist es besser, das Projekt in Monaten anzuzeigen. Um jedoch die Details einer bestimmten Aufgabe zu kennen, ist es sinnvoller, das Projekt nach Wochen oder Tagen zu planen.

Welche Einheit soll gewählt werden? Alle! Und geben Sie den Benutzern die Möglichkeit, selbst zu entscheiden, welche Einheit sie anwenden möchten.

## Konfigurationseinstellungen

Um eine Skaleneinstellung (z. B. Schritt, Unter-Skala) dynamisch zu ändern (nach der Initialisierung von dhtmlxGantt), verwenden Sie die folgende Vorgehensweise:

1. Weisen Sie neue Werte für die entsprechenden Konfigurationsoptionen zu.

 *Zum Beispiel, um die Skaleneinheit von "month" nach "day" zu ändern, verwenden Sie die **unit**-Eigenschaft der [scales](api/config/scales.md) Eigenschaft*.
2. Definieren Sie ggf. das zugehörige Template neu.

 *Beispielweise, um [Wochenenden im Maßstab hervorzuheben](guides/highlighting-time-slots.md), verwenden Sie das Template [scale_cell_class](api/template/scale_cell_class.md).*.
2. Zeichnen Sie das Gantt-Diagramm mit der [render](api/method/render.md) Methode neu.

**Dynamische Änderung der Skaleneinstellungen**
~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
];

gantt.init("gantt_here");


gantt.config.scales = [                            /*!*/
    {unit: "day", step: 1, format: "%d %M, %D"} /*!*/
];                                                /*!*/
gantt.templates.scale_cell_class = function(date){/*!*/
    if(date.getDay()==0||date.getDay()==6){/*!*/
        return "weekend";/*!*/
    }/*!*/
};/*!*/
gantt.render(); /*!*/
~~~