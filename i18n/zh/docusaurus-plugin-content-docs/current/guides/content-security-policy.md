---
title: "内容安全策略（Content Security Policy）合规性"
sidebar_label: "内容安全策略（Content Security Policy）合规性"
---

# 内容安全策略（Content Security Policy）合规性


内容安全策略（CSP）是一项Web标准，旨在阻止未经授权的JavaScript运行，并提升[应用程序的安全性](guides/app-security.md)。

**从7.0版本开始，Gantt包内置了CSP支持**。该库提供了一个[专用配置](api/config/csp.md)，帮助您调整基于dhtmlxGantt的应用程序以满足CSP（内容安全策略）的要求。

~~~js
// 默认值为 "auto"
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

CSP功能是在gantt核心基础上工作的，会更新任何不安全的代码（主要是日期格式化和解析器）。不过，仍然需要允许内联样式，因为组件内部大量使用了内联样式。

**在v7.0之前**，需要单独添加CSP扩展（*ext/dhtmlxgantt_csp.js*），以便在应用程序启用内容安全策略（CSP）时，dhtmlxGantt能够正常运行。

~~~html
<!-- 在*dhtmlxgantt.js*之后引入*dhtmlxgantt_csp.js* -->
<script src="../codebase/ext/dhtmlxgantt_csp.js"></script>
~~~

