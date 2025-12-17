---
sidebar_label: external_render
title: external_render config
description: "renders an external component into the DOM"
---

# external_render

### Description

@short: Renders an external component into the DOM

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

The **external_render** is an object with the following properties:

- **isElement (element): boolean** - a function that is used to validate the provided element. Uses the following argument:
    - **_element_** - (*any*) - an object that is returned by the **onrender* function.
- **renderElement (element, container): void** - a function used to apply the native methods to render native components. Uses the following arguments:
    - **_element_** - (*any*) - an object that is returned by the **onrender* function.
    - **_container_** - (*HTMLElement*) - a DOM element the native component will be attached to.

### Change log
- added in v7.1
