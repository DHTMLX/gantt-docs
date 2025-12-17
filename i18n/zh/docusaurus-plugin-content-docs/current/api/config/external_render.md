---
sidebar_label: external_render
title: external_render config
description: "将外部组件插入到 DOM 中"
---

# external_render

### Description

@short: 将外部组件插入到 DOM 中

@signature: external_render: \{ isElement(element: any): boolean; renderElement(element: any, container: HTMLElement): void; \}

### Example

~~~jsx
import ReactDOM from 'react-dom';
import React from 'react';

gantt.config.columns = [
    {name:"text",       label:"任务名称",  tree:true, width:"*"},
    {name:"start_date", label:"开始时间", align: "center"},
    {name:"duration",   label:"持续时间", align: "center"},
    { 
        name:"external", label:"元素 1", align: "center",
        onrender: (item, node) => {
            return <DemoButton
                    text="编辑 1"
                    onClick={() => alert("作为 React 组件的元素")}
                    />
        }
    }
];

gantt.config.external_render = { 
    // 检查元素是否为 React 元素
    isElement: (element) => {
        return React.isValidElement(element);
    },
    // 将 React 元素渲染到 DOM 中
    renderElement: (element, container) => {
        ReactDOM.render(element, container);
    }
};
~~~

### Details

**external_render** 对象包含以下属性:

- **isElement (element): boolean** - 用于验证传入元素的函数。它接收以下参数:
    - **_element_** - (*any*) - 由 **onrender** 函数返回的对象。
- **renderElement (element, container): void** - 使用原生方法渲染组件的函数。它接收以下参数:
    - **_element_** - (*any*) - 由 **onrender** 函数返回的对象。
    - **_container_** - (*HTMLElement*) - 将插入原生组件的 DOM 元素。

### Change log
- v7.1 中新增
