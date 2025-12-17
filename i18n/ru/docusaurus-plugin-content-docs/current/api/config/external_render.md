---
sidebar_label: external_render
title: external_render config
description: "вставляет внешний компонент в DOM"
---

# external_render

### Description

@short: Вставляет внешний компонент в DOM

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
    // проверяет, является ли элемент React элементом
    isElement: (element) => {
        return React.isValidElement(element);
    },
    // рендерит React элемент в DOM
    renderElement: (element, container) => {
        ReactDOM.render(element, container);
    }
};
~~~

### Details

Объект **external_render** включает в себя следующие свойства:

- **isElement (element): boolean** - функция для проверки переданного элемента. Принимает следующий аргумент:
    - **_element_** - (*any*) - объект, возвращаемый функцией **onrender**.
- **renderElement (element, container): void** - функция, использующая нативные методы для рендера компонентов. Принимает следующие аргументы:
    - **_element_** - (*any*) - объект, возвращаемый функцией **onrender**.
    - **_container_** - (*HTMLElement*) - DOM-элемент, в который будет вставлен нативный компонент.

### Change log
- добавлено в v7.1
