---
sidebar_label: external_render
title: external_render config
description: "외부 컴포넌트를 DOM에 삽입합니다"
---

# external_render

### Description

@short: 외부 컴포넌트를 DOM에 삽입합니다

@signature: external_render: \{ isElement(element: any): boolean; renderElement(element: any, container: HTMLElement): void; \}

### Example

~~~jsx
import ReactDOM from 'react-dom';
import React from 'react';

gantt.config.columns = [
    {name:"text",       label:"작업 이름",  tree:true, width:"*"},
    {name:"start_date", label:"시작 시간", align: "center"},
    {name:"duration",   label:"기간",   align: "center"},
    { 
        name:"external", label:"요소 1", align: "center",
        onrender: (item, node) => {
            return <DemoButton
                    text="수정 1"
                    onClick={() => alert("React 컴포넌트로서의 요소")}
                    />
        }
    }
];

gantt.config.external_render = { 
    // 요소가 React element인지 확인합니다
    isElement: (element) => {
        return React.isValidElement(element);
    },
    // React element를 DOM에 렌더링합니다
    renderElement: (element, container) => {
        ReactDOM.render(element, container);
    }
};
~~~

### Details

**external_render** 객체는 다음과 같은 프로퍼티를 포함합니다:

- **isElement (element): boolean** - 전달된 요소가 유효한지 검증하는 함수입니다. 다음 인자를 받습니다:
    - **_element_** - (*any*) - **onrender** 함수가 반환한 객체입니다.
- **renderElement (element, container): void** - 네이티브 메서드를 사용하여 컴포넌트를 렌더링하는 함수입니다. 다음 인자를 받습니다:
    - **_element_** - (*any*) - **onrender** 함수가 반환한 객체입니다.
    - **_container_** - (*HTMLElement*) - 네이티브 컴포넌트를 삽입할 DOM 요소입니다.

### Change log
- v7.1에 추가됨
