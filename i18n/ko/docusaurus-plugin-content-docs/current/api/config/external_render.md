---
sidebar_label: external_render
title: external_render config
description: "외부 컴포넌트를 DOM에 렌더링합니다"
---

# external_render

### Description

@short: 외부 컴포넌트를 DOM에 렌더링합니다

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

- **isElement (element): boolean** - 제공된 element를 검증하는 데 사용되는 함수입니다. 다음 인수를 사용합니다:
    - **_element_** - (*any*) - **onrender* 함수에 의해 반환되는 객체.
- **renderElement (element, container): void** - 네이티브 컴포넌트를 렌더링하기 위해 네이티브 메서드를 적용하는 데 사용되는 함수입니다. 다음 인수를 사용합니다:
    - **_element_** - (*any*) - **onrender* 함수에 의해 반환되는 객체.
    - **_container_** - (*HTMLElement*) - 네이티브 컴포넌트가 연결될 DOM 요소.

### Change log
- v7.1에서 추가되었습니다