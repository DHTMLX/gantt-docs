---
sidebar_label: external_render
title: external_render config
description: "Отрисовывает внешний компонент в DOM"
---

# external_render

### Description

@short: Отрисовывает внешний компонент в DOM

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

Объект **external_render** имеет следующие свойства:

- **isElement (element): boolean** - функция, которая используется для проверки предоставленного элемента. Использует следующий аргумент:
    - **_element_** - (*any*) - объект, возвращаемый функцией **onrender**.
- **renderElement (element, container): void** - функция, используемая для применения нативных методов по рендерингу нативных компонентов. Использует следующие аргументы:
    - **_element_** - (*any*) - объект, возвращаемый функцией **onrender**.
    - **_container_** - (*HTMLElement*) - DOM-элемент, к которому будет присоединён нативный компонент.

### Change log
- Добавлено в v7.1