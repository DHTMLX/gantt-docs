---
sidebar_label: type_renderers
title: type_renderers Konfiguration
description: "definiert Funktionen neu, die unterschiedliche Typen von Aufgaben anzeigen"
--- 

# type_renderers
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Definiert Funktionen neu, die verschiedene Typen von Aufgaben anzeigen

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
- [Klassischer Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)

### Details

Eine Funktion, die Aufgaben rendert, nimmt 2 Parameter:

- **type_renderers** - (*object*) - eine benutzerdefinierte Render-Funktion für den *task*-Typ
    - **_task_** - (*Task*) - das Task-Objekt
    - **_defaultRender?_** - (*TaskLayerRender*) - optional, die Standard-Render-Funktion, die im dhtmlxGantt verwendet wird

Hier sind die möglichen type_renderers Typen:

- **type_renderers** - (*object*) - eine benutzerdefinierte Render-Funktion für den *task*-Typ
- **_task?_** - (*typeRenderer*) - optional, eine benutzerdefinierte Render-Funktion für den *task*-Typ
- **_project?_** - (*typeRenderer*) - optional, eine benutzerdefinierte Render-Funktion für den *project*-Typ
- **_milestone?_** - (*typeRenderer*) - optional, eine benutzerdefinierte Render-Funktion für den *milestone*-Typ
- **_[typeName: string]_** - (*typeRenderer | undefined*) - optional, eine benutzerdefinierte Render-Funktion für den benutzerdefinierten Task-Typ


You can use this option to define a custom display for certain types of tasks.
Beispielsweise ermöglicht diese Einstellung eine konservativere Ansicht für den Typ Projekt oder Summary-Aufgaben.


:::note
Beispiel [Klassischer Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)
:::

### Related API
- [getTaskPosition](api/method/gettaskposition.md)