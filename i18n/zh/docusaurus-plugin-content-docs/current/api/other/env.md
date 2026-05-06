---
sidebar_label: env
title: env config
description: "描述当前环境的一组标志"
---

# env

### Description

@short: 描述当前环境的一组标志

@signature: env: any

### Example

~~~jsx
if (gantt.env.isEdge) {
    // your code
}
~~~

### Details

The possible flags are:

- isChrome    - 当浏览器为 Chrome 时设为 true
- isSafari    - 当浏览器为 Safari 时设为 true
- isEdge    - 当浏览器为 Edge 时设为 true
- isSalesforce - 当 Gantt 在 SalesForce 应用内运行时设为 true
- isFF        - 当浏览器为 Firefox 时设为 true
- isIE        - 当浏览器为 Internet Explorer 时设为 true
- isOpera    - 当浏览器为 Opera 时设为 true
- isIPad    - 当浏览器是在 IPad 上的 Safari 时设为 true

### Change log
- 新增于版本 4.0
- 更新于 9.0.11