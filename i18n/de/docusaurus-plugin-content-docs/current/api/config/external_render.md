---
sidebar_label: external_render
title: external_render config
description: "Fügt eine externe Komponente in das DOM ein"
---

# external_render

### Description

@short: Fügt eine externe Komponente in das DOM ein

@signature: external_render: \{ isElement(element: any): boolean; renderElement(element: any, container: HTMLElement): void; \}

### Example

~~~jsx
import ReactDOM from 'react-dom';
import React from 'react';

gantt.config.columns = [
    {name:"text",       label:"Task name",  tree:true, width:"*"},
    {name:"start_date", label:"Start time", align: "center"},
    {name:"duration",   label:"Duration",   align: "center"},
    { 
        name:"external", label:"Element 1", align: "center",
        onrender: (item, node) => {
            return <DemoButton
                    text="Edit 1"
                    onClick={() => alert("Element as React Component")}
                    />
        }
    }
];

gantt.config.external_render = { 
    // checks the element is a React element
    isElement: (element) => {
        return React.isValidElement(element);
    },
    // renders the React element into the DOM
    renderElement: (element, container) => {
        ReactDOM.render(element, container);
    }
};
~~~

### Details

Das **external_render** Objekt enthält folgende Eigenschaften:

- **isElement (element): boolean** - eine Funktion zur Überprüfung des übergebenen Elements. Sie erhält folgendes Argument:
    - **_element_** - (*any*) - das von der **onrender** Funktion zurückgegebene Objekt.
- **renderElement (element, container): void** - eine Funktion, die native Methoden verwendet, um Komponenten zu rendern. Sie akzeptiert folgende Argumente:
    - **_element_** - (*any*) - das von der **onrender** Funktion zurückgegebene Objekt.
    - **_container_** - (*HTMLElement*) - das DOM-Element, in das die native Komponente eingefügt wird.

### Change log
- hinzugefügt in v7.1
