---
sidebar_label: env
title: env config
description: "一组标志，用于指示当前环境"
---

# env

### Description

@short: 一组标志，用于指示当前环境

@signature: env: any

### Example

~~~jsx
if (gantt.env.isEdge) {
    // your code
}
~~~

### Details

以下是你可能会遇到的标志:

- isChrome    - 如果浏览器是 Chrome，则为 true
- isSafari    - 如果浏览器是 Safari，则为 true
- isEdge    - 如果浏览器是 Edge，则为 true
- isSalesforce - 如果 Gantt 运行在 SalesForce 应用内，则为 true
- isFF        - 如果浏览器是 Firefox，则为 true
- isIE        - 如果浏览器是 Internet Explorer，则为 true
- isOpera    - 如果浏览器是 Opera，则为 true
- isIPad    - 如果浏览器是在 iPad 上的 Safari，则为 true

### Change log
- 版本 4.0 中添加
- 版本 9.0.11 中更新
