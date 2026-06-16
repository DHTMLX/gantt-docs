---
title: "Vue Gantt"
sidebar_label: Vue Gantt
description: "在 Vue 中安装、配置并使用 DHTMLX Gantt，使用官方封装。"
image: /img/frameworks/vue.png
---

Vue Gantt 是 DHTMLX Gantt 的官方 Vue 封装。它面向 Vue 3，并在保留对 Gantt API 的完整访问的同时，增加了 Vue 友好的 props、events 和组合式函数。

## 封装器带来的好处

- 通过 prop (`config`, `templates`, `plugins`, `theme`, `locale`) 进行声明式设置
- 任务/链接的数据同步以及高级数据集
- 通过 `events` 映射实现 Gantt 事件的绑定
- 通过 `@ready` 提供 Vue 生命周期入口点
- 对底层 `instance` 的组件引用访问
- 面向常见封装器工作流的类型化辅助工厂和组合式函数

~~~vue
<script setup lang="ts">
import VueGantt from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";
</script>

<template>
  <div style="height: 520px;">
    <VueGantt :tasks="tasks" :links="links" />
  </div>
</template>
~~~

如果你想先了解架构和能力地图，请阅读 [Vue Gantt Overview](integrations/vue/overview.md)。

## 推荐学习路径

如果你是第一次使用该封装器，请按以下顺序学习：

1. [安装](integrations/vue/installation.md)，用于选择包通道和导入
2. [快速入门](integrations/vue/quick-start.md) 来渲染你的第一个图表
3. [配置参考](integrations/vue/configuration-props.md) 了解 prop 和回调的详细信息
4. [数据绑定与状态管理基础](integrations/vue/state/state-management-basics.md) 以选择数据拥有权模型
5. [Pinia 集成教程](integrations/vue/state/pinia.md) 用于基于 Pinia 的实现
6. [自定义模式](integrations/vue/customization-patterns.md) 用于模板、灯箱、内联编辑器和模态框

## 封装器 vs 低级 JS 集成

根据你想自行管理多少生命周期和同步逻辑来选择集成路径。

- 使用官方封装器（`@dhtmlx/trial-vue-gantt` 或 `@dhx/vue-gantt`）来处理 Vue 的 props/events、封装器管理的同步，以及类型化辅助 API。
- 仅在你希望对实例生命周期和手动 API 编排拥有直接控制时，才使用低级 JS 集成。

对于低级路径，请使用 [dhtmlxGantt with Vue.js (Low-Level Integration)](integrations/vue/js-gantt-vue.md)。

## 数据与状态管理入口点

如果你已经知道需要与存储/后端同步，请从 state 部分开始：

- [数据与状态管理](integrations/vue/state.md)
- [数据绑定与状态管理基础](integrations/vue/state/state-management-basics.md)
- [在 Pinia 中使用 Vue Gantt](integrations/vue/state/pinia.md)

## 示例与评估资源

浏览公开的 Vue Gantt 示例，以获取可运行的封装器演示：

- [现场演示](https://dhtmlx.github.io/vue-gantt-examples/) - 所有封装器特性在浏览器中运行
- [GitHub 仓库](https://github.com/DHTMLX/vue-gantt-examples) - 概览中引用的每个示例的源代码

最小化入门项目（每个仅包含一个封装器特性）：

- [vue-gantt-quick-start](https://github.com/DHTMLX/vue-gantt-quick-start) - 最小可行的设置，符合 [快速入门](integrations/vue/quick-start.md)
- [vue-gantt-pinia-starter](https://github.com/DHTMLX/vue-gantt-pinia-starter) - 带有 `batchSave` 的 Pinia 存储和存储级撤销/重做，符合 [Pinia 教程](integrations/vue/state/pinia.md)

如果你正在评估 Vue Gantt，评估页在评估期间提供技术支持。请参阅 [安装](integrations/vue/installation.md)。