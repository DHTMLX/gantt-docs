---
title: "内容安全策略合规性"
sidebar_label: "内容安全策略合规性"
---

# 内容安全策略合规性

Content Security Policy（CSP）是一种网络标准，用于防止未授权的 JavaScript 执行并提升所创建应用的安全性 [所创建应用的安全性](guides/app-security.md)。

**自 7.0 版本起，CSP 支持已包含在 Gantt 包中**。该库提供一个 [特殊配置](api/config/csp.md)（特定配置），使您能够调整用 dhtmlxGantt 创建的应用程序的代码，以符合 CSP（Content Security Policy，内容安全策略）标准。

~~~js
// the defult value is "auto"
gantt.config.csp = true;
...
gantt.init("gantt_here");
~~~

CSP 功能是在基础的 gantt 之上应用，并重新定义不安全的代码（日期格式化器和解析器，主要是解析器）。
然而，内联样式应被允许，因为组件的许多部分都使用了内联样式。

**在 v7.0 之前**，CSP (*ext/dhtmlxgantt_csp.js*) 扩展需要单独引入，以便在应用程序启用 Content Security Policy（CSP）时，使 dhtmlxGantt 正常工作。

~~~html
<!-- 在 *dhtmlxgantt.js* 之后包含 *dhtmlxgantt_csp.js* -->
<script src="../codebase/ext/dhtmlxgantt_csp.js"></script>
~~~