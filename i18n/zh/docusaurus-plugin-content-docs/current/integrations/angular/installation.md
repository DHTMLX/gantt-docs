--- 
title: 安装 Angular Gantt
sidebar_label: 安装
description: "如何在 Angular 项目中安装 Angular Gantt 的评估版或专业版并配置导入。"
---

# 安装 Angular Gantt

Angular Gantt 提供两种发行版：

1. **评估版**公开在 npm 上提供，包含试用水印，并且可选地配合一个免费评估期，获取技术支持。
2. **专业版（商业版）**可从私有的 DHTMLX npm 仓库获取，面向生产环境使用。

这两个包包含相同的 API。

## 安装评估包（公开 npm）

评估构建在 npm 上可用，形式为 [@dhtmlx/trial-angular-gantt](https://www.npmjs.com/package/@dhtmlx/trial-angular-gantt)：

- npm:

~~~bash
npm install @dhtmlx/trial-angular-gantt
~~~

- Yarn:

~~~bash
yarn add @dhtmlx/trial-angular-gantt
~~~

此构建功能完备，但会显示一条消息，指示库处于评估模式。

### 可选：开始完整评估期（推荐）

尽管试用包安装时没有限制，您也可以通过官方网站开启正式评估，地址为
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-Angular/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-Angular/download.shtml)。

开启正式评估将使您在试用期内获得免费技术支持。

**离线示例（zip）下载**

评估表格还包含可下载的 ZIP 文件，内含离线就绪示例。

您也可以在官方 GitHub 上查看更多示例和演示项目，查看 [Angular Gantt Demos on GitHub](https://github.com/DHTMLX/?q=angular-gantt&type=all&language=&sort=)。

## 安装专业包（私有 npm）

专业版用于生产应用，包含商业许可和对技术支持的全面访问。

获得商业许可后，您可以在 [Client's Area](https://dhtmlx.com/clients/) 生成私有 npm 凭据。

在生成登录名/密码后，配置 npm：

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

Then 安装专业包：

- npm:

~~~bash
npm install @dhx/angular-gantt
~~~

- Yarn:

~~~bash
yarn add @dhx/angular-gantt
~~~

## Angular 项目要求

Wrapper 依赖当前需要：

- `@angular/common >= 19.0.0`
- `@angular/core >= 19.0.0`
- `rxjs >= 6.0.0`


## 导入矩阵

使用与您安装的包通道相匹配的导入。

| Package | Wrapper import | CSS import |
| --- | --- | --- |
| `@dhtmlx/trial-angular-gantt` | `import { DhxGanttComponent } from "@dhtmlx/trial-angular-gantt";` | `@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";` |
| `@dhx/angular-gantt` | `import { DhxGanttComponent } from "@dhx/angular-gantt";` | `@import "@dhx/angular-gantt/dist/angular-gantt.css";` |

将 CSS 导入添加到全局 Angular 样式中（例如 `src/styles.css`）。

这是 Angular 应用的推荐默认，因为 Gantt 样式是库范围的样式，不需要 Angular 组件作用域。

## 全局 vs 组件 CSS 导入

- **全局导入：** 在 `src/styles.css` 中从上面的矩阵中导入包装 CSS 路径（或在 `angular.json` 的 `styles` 中注册）。不需要任何特殊的组件封装设置。
- **组件样式表导入：** 你也可以在组件的 `styleUrl` 中导入相同的 CSS，但此时 Angular 的默认 `ViewEncapsulation.Emulated` 可能会对选择器进行作用域化，导致 Gantt 内部 `.dhx-*` 样式/覆盖无法按预期生效。

如果你在组件样式表中导入 Gantt CSS，或在该样式表中为内部 Gantt 类（例如 `.dhx-gantt-root`）定义覆盖样式，请设置：

~~~ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  // ...
  encapsulation: ViewEncapsulation.None,
})
export class GanttPageComponent {}
~~~

将组件导入模式主要用于独立演示/示例。对于生产应用，优先使用全局导入。

## Standalone vs NgModule 项目

该包装器同时支持两种 Angular 风格：

- **Standalone 组件**：在组件的 `imports` 数组中导入 `DhxGanttComponent`。
- **基于 NgModule 的应用**：在你的 Angular 模块中导入 `DhxGanttModule`。

Standalone 示例：

~~~ts
import { Component } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>`,
})
export class GanttPageComponent {
  tasks = [];
  links = [];
}
~~~

NgModule 示例：

~~~ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DhxGanttModule } from '@dhtmlx/trial-angular-gantt';

@NgModule({
  imports: [BrowserModule, DhxGanttModule],
})
export class AppModule {}
~~~

## 从 trial 包迁移到商业包

大多数项目先使用 trial 包，待原型通过并获得商业许可后再切换。两者共享相同的 API，因此迁移大多是机械性的：替换包名、替换 CSS 导入，并重新安装。

在上面配置私有注册表后，更新代码中的每个导入：

~~~ts
// 之前
import { DhxGanttComponent } from "@dhtmlx/trial-angular-gantt";

// 之后
import { DhxGanttComponent } from "@dhx/angular-gantt";
~~~

并在 `src/styles.css` 中更新 CSS 导入：

~~~css
/* 之前 */
@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";

/* 之后 */
@import "@dhx/angular-gantt/dist/angular-gantt.css";
~~~

在项目中搜索仍然包含 `@dhtmlx/trial-angular-gantt` 的引用（包括 CSS 导入路径）——这是最容易被忽略的。替换 `package.json` 中的依赖，然后 `npm install` 并运行应用。如果水印消失且其余 UI 行为完全一致，则迁移完成。

### 通过 CI 或共享构建环境使用注册表

`npm login` 在开发机器上可以正常工作，但 CI 运行器和其他共享构建环境通常无法进行交互式登录。对于这些环境，请在已登录的机器上生成一个非交互式访问令牌：

~~~bash
npm token create --registry=https://npm.dhtmlx.com
~~~

令牌只会在终端输出中打印一次——在结束会话前请复制，因为之后无法再次检索。然后通过一个构建能够读取的 `.npmrc` 文件暴露令牌：

~~~ini
@dhx:registry=https://npm.dhtmlx.com
//npm.dhtmlx.com/:_authToken=${DHTMLX_NPM_TOKEN}
~~~

将 `DHTMLX_NPM_TOKEN` 设置为 CI 提供商（GitHub Actions、GitLab 等）的机密信息，以免令牌被提交到代码库。相同的做法也适用于 Docker 构建——在构建时注入令牌，而不是将其写入镜像。

如果在 CI 上执行 `npm install` 时对 `npm.dhtmlx.com` 返回 401 或 403，说明机密信息缺失、过期，或 `.npmrc` 文件不在 npm 期望的位置（项目根目录是最安全的位置）。

## 下一步阅读

- [Angular Gantt 快速入门](integrations/angular/quick-start.md)
- [Angular Gantt 概览](integrations/angular/overview.md)
- [配置参考](integrations/angular/configuration-props.md)