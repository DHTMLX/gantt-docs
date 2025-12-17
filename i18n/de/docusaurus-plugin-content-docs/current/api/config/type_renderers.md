---
sidebar_label: type_renderers
title: type_renderers config
description: "Definiert Funktionen neu, die für die Anzeige verschiedener Aufgabentypen verantwortlich sind"
---

# type_renderers
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Definiert Funktionen neu, die für die Anzeige verschiedener Aufgabentypen verantwortlich sind

@signature: type_renderers: CustomTypeRenderers["type_renderers"]

### Example

~~~jsx
gantt.config.type_renderers[gantt.config.types.project] = function(task,defaultRender){
    var main_el = document.createElement("div");
      var size = gantt.getTaskPosition(task);
      main_el.innerHTML = [
        "<div class='project-left'></div>",
        "<div class='project-right'></div>"
      ].join('');
      main_el.className = "custom-project";

      main_el.style.left = size.left + "px";
      main_el.style.top = size.top + 7 + "px";
      main_el.style.width = size.width + "px";

      return main_el;
};
~~~

**Default value:** \{\}

### Related samples
- [Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)

### Details


Dieses Feature ermöglicht es Ihnen, die Darstellung verschiedener Aufgabentypen anzupassen, indem Sie eigene Rendering-Funktionen definieren.

Eine Rendering-Funktion erhält zwei Argumente:

- **typeRenderer (task, defaultRender): HTMLElement | boolean | void | undefined** - eine Funktion, die ein Task-Objekt entgegennimmt und ein DOM-Element zurückgibt, das die Standard-Aufgabenleiste ersetzt.
    - **_task_** - (*Task*) - das Task-Objekt
    - **_defaultRender?_** - (*TaskLayerRender*) - optional, die Standard-Rendering-Funktion, die von dhtmlxGantt bereitgestellt wird

Die verfügbaren type_renderers umfassen:

- **type_renderers** - (*object*) - benutzerdefinierte Renderfunktionen für verschiedene Aufgabentypen
    - **_task?_** - (*typeRenderer*) - optional, benutzerdefinierte Renderfunktion für Standardaufgaben
    - **_project?_** - (*typeRenderer*) - optional, benutzerdefinierte Renderfunktion für Projektaufgaben
    - **_milestone?_** - (*typeRenderer*) - optional, benutzerdefinierte Renderfunktion für Meilensteine
    - **_[typeName: string]_** - (*typeRenderer | undefined*) - optional, benutzerdefinierte Renderfunktion für beliebige benutzerdefinierte Aufgabentypen


Diese Option erlaubt es Ihnen, ein maßgeschneidertes Aussehen für spezifische Aufgabentypen zu erstellen. Zum Beispiel können Sie ein traditionelleres Erscheinungsbild für Projekt- oder Zusammenfassungsaufgaben gestalten.


![custom_look](/img/custom_look.png)


:::note
sample
[Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)
 
:::

### Related API
- [getTaskPosition](api/method/gettaskposition.md)

