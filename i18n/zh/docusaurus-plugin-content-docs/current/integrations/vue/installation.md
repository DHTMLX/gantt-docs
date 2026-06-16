---
title: 安装 Vue Gantt
sidebar_label: 安装
description: "如何通过 npm 或 yarn 安装 Vue Gantt 的评估版或专业版。"
---

# 安装 Vue Gantt

Vue Gantt 提供两种发行版本：

1. **评估版本** 公開在 npm 上，包含试用水印，并且可以可选地搭配一个免费评估期，提供技术支持。
2. **专业（商业）版本** 可从私有 DHTMLX npm 仓库获取，面向生产使用。

两个包包含相同的 API。

## 前提条件

- Vue 3 项目（或计划添加 Vue 3 的项目）
- 已安装 Node.js
- 可用的 npm 或 Yarn
- DHTMLX 私有 npm 访问权限（仅专业包）

## 安装评估包（公共 npm）

评估构建在 npm 上可用，名称为 [@dhtmlx/trial-vue-gantt](https://www.npmjs.com/package/@dhtmlx/trial-vue-gantt)：

- npm：

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

- Yarn：

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

此构建功能完备，但会显示“库在评估模式下运行”的消息。

### 可选：启动完整评估期（推荐）

尽管试用包可以不受限制地安装，但您也可以通过以下网站开始正式评估：
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-Vuejs/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-Vuejs/download.shtml)。

正式评估将为您在试用期内提供免费的技术支持。

**下载离线示例（zip）**

评估表单还包含包含离线就绪示例的可下载 ZIP 文件。

您也可以通过检查 [Vue Gantt Demos on GitHub](https://github.com/DHTMLX/?q=vue-gantt&type=all&language=&sort=) 在官方 GitHub 上查看更多示例和演示项目。

## 安装专业包（私有 npm）

专业版本用于生产应用，包含商业授权并可全面获取技术支持。

获得商业许可证后，您可以在 [Client's Area](https://dhtmlx.com/clients/) 生成私有 npm 凭据。

生成登录名/密码后，配置 npm：

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
~~~

然后安装专业包：

- npm：

~~~bash
npm install @dhx/vue-gantt
~~~

- Yarn：

~~~bash
yarn add @dhx/vue-gantt
~~~

## 使用匹配的导入

使用与所安装包匹配的导入。

| 包 | 组件导入 | CSS 导入 |
| --- | --- | --- |
| `@dhtmlx/trial-vue-gantt` | `import VueGantt from "@dhtmlx/trial-vue-gantt";` | `import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";` |
| `@dhx/vue-gantt` | `import VueGantt from "@dhx/vue-gantt";` | `import "@dhx/vue-gantt/dist/vue-gantt.css";` |

## 检查版本要求

Wrapper 对等依赖：

- `vue >= 3.2.25`

## 从试用包迁移到商业版

大多数项目最初使用试用包，获得原型批准并获得商业许可证后再切换。两个包共享相同的 API，因此迁移大多是机械性的：替换包名，替换 CSS 导入，并重新安装。

在像上面所示配置私有注册表后，更新代码中的每个导入：

~~~ts
// before
import VueGantt from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

// after
import VueGantt from "@dhx/vue-gantt";
import "@dhx/vue-gantt/dist/vue-gantt.css";
~~~

在项目中搜索所有剩余的 `@dhtmlx/trial-vue-gantt` 引用，包括 CSS 导入路径——那是最容易忘记的。替换 `package.json` 中的依赖，然后运行 `npm install` 并启动应用程序。如果水印消失且其余 UI 表现完全相同，则完成切换。

### 通过 CI 或共享构建环境使用注册表

在开发者机器上执行 `npm login` 没有问题，但 CI 运行器和其他共享构建环境通常不能进行交互式登录。对于这些环境，请从已登录的机器生成一个非交互式访问令牌：

~~~bash
npm token create --registry=https://npm.dhtmlx.com
~~~

令牌在终端输出中只会显示一次——在结束会话前请复制，因为之后无法再次检索。然后通过一个构建可以读取的 `.npmrc` 文件暴露它：

~~~ini
@dhx:registry=https://npm.dhtmlx.com
//npm.dhtmlx.com/:_authToken=${DHTMLX_NPM_TOKEN}
~~~

将 `DHTMLX_NPM_TOKEN` 设为 CI 提供商中的秘密（GitHub Actions、GitLab 等），以确保令牌不会被提交到代码库中。相同的模式也适用于 Docker 构建——在构建时注入令牌，而不是将其写入镜像。

如果在 CI 上执行 `npm install` 时对 `npm.dhtmlx.com` 返回 401 或 403，则秘密变量可能缺失、过期，或 `.npmrc` 文件并非 npm 所期望的位置（项目根目录是最安全的位置）。

## 下一步阅读

- [Quick Start with Vue Gantt](integrations/vue/quick-start.md)
- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)