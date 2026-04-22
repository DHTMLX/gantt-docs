---
sidebar_label: external_render
title: external_render config
description: "rendert eine externe Komponente in das DOM"
---

# external_render

### Description

@short: Rendert eine externe Komponente in das DOM

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

Das **external_render** ist ein Objekt mit den folgenden Eigenschaften:

- **isElement (element): boolean** - Eine Funktion, die verwendet wird, um das bereitgestellte Element zu validieren. Verwendet folgendes Argument:
    - **_element_** - (*any*) - ein Objekt, das von der **onrender**-Funktion zurückgegeben wird.
- **renderElement (element, container): void** - Eine Funktion, die verwendet wird, um die nativen Methoden anzuwenden, um native Komponenten zu rendern. Verwendet die folgenden Argumente:
    - **_element_** - (*any*) - ein Objekt, das von der **onrender**-Funktion zurückgegeben wird.
    - **_container_** - (*HTMLElement*) - ein DOM-Element, an das die native Komponente angehängt wird.

### Change log
- hinzugefügt in v7.1
