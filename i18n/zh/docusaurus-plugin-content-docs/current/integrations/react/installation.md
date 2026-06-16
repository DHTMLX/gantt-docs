---
title: 安装 React Gantt
sidebar_label: 安装
description: "如何通过 npm 安装 React Gantt 的评估版或商业版。"
---

# 安装 React Gantt

React Gantt 提供两种发行版本：

1. **评估版**（Evaluation version）公开在 npm 上提供，包含试用水印，并可选配一个免费评估期，获得技术支持。  
2. **专业版（商业版本）** 通过私有的 DHTMLX npm 仓库提供，面向生产使用。

两个包包含相同的 API。

## 安装评估版本（公共 npm）

评估构建在 npm 上可用，作为 [@dhtmlx/trial-react-gantt](https://www.npmjs.com/package/@dhtmlx/trial-react-gantt):

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

或使用 Yarn：

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

该构建功能完备，但会显示一条消息，指示库处于评估模式。

### 可选：开启完整评估期（推荐）

尽管试用包安装时没有限制，您也可以通过官方网站启动正式评估，地址在
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml)。

开启正式评估可让您在试用期内获得免费技术支持。

**下载离线示例（zip）**

评估表单还包含一个可下载的 ZIP，其中包含离线就绪的示例。

您也可以在官方 GitHub 上查看更多示例和演示项目，检阅 [React Gantt Demos on GitHub](https://github.com/DHTMLX/?q=react-gantt&type=all&language=&sort=)。

## 专业版本（私有 npm）

专业版本用于生产应用，包含商业许可并可获得全面的技术支持。

获取商业许可后，您可以在 [Client's Area](https://dhtmlx.com/clients/) 生成私有 npm 凭据。

生成登录名/密码后，配置 npm：

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

然后安装专业包：

~~~bash
npm install @dhx/react-gantt
~~~

或，使用 Yarn：

~~~bash
yarn add @dhx/react-gantt
~~~

## 从试用包切换到商业版

大多数项目最初使用试用包，待原型获得批准并获得商业许可后再切换。两者具有相同的 API，因此切换大多是机械性的：更换包名、替换 CSS 导入、重新安装。

在如上所述配置私有仓库后，更新代码中的所有导入：

~~~ts
// before
import Gantt from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

// after
import Gantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
~~~

在项目中搜索还残留有 `@dhtmlx/trial-react-gantt` 的引用，包括 CSS 导入路径——这是最容易忘记的一个。替换 `package.json` 中的依赖项，然后执行 `npm install` 并运行应用程序。如果水印不再出现，且其余 UI 行为相同，则切换完成。

### 通过 CI 或共享构建环境使用注册表

`npm login` 在开发者机器上工作良好，但 CI 运行程序和其他共享构建环境通常无法执行交互式登录。对于这些环境，请从已登录的机器生成一个非交互式访问令牌：

~~~bash
npm token create --registry=https://npm.dhtmlx.com
~~~

令牌只在终端输出中打印一次——在结束会话前请复制，因为稍后无法检索。然后通过一个构建可读取的 `.npmrc` 文件暴露它：

~~~ini
@dhx:registry=https://npm.dhtmlx.com
//npm.dhtmlx.com/:_authToken=${DHTMLX_NPM_TOKEN}
~~~

将 `DHTMLX_NPM_TOKEN` 设置为 CI 提供商（GitHub Actions、GitLab 等）的机密，以确保令牌不会被提交。相同的模式也适用于 Docker 构建——在构建时注入令牌，而不是写入镜像中。

如果在 CI 上对 `npm.dhtmlx.com` 的 `npm install` 因 401 或 403 失败，说明机密要么缺失、已过期，或 `.npmrc` 文件的位置不是 npm 期望的位置（项目根目录是最安全的位置）。

### AI 应用构建器（Lovable 等）

类似 Lovable 的 AI 应用构建器会运行它们自己的构建环境，一旦切换到 `@dhx/react-gantt`，它们运行的每次 `npm install` 都需要对 `https://npm.dhtmlx.com` 进行身份验证。

包切换后有两条较为合理的路径：

- **继续在 Lovable 中构建。** 将 DHTMLX 注册表凭据绑定到 Lovable 的构建环境，通常作为一个在安装时写入 `.npmrc` 的秘密，使用上方相同的 `${DHTMLX_NPM_TOKEN}` 模式。存储构建秘密的确切机制是 Lovable 平台相关的，可能会随时间改变——在设置时请查阅 Lovable 的当前文档。  
- **将构建迁移到你们自己的 CI。** 许多团队使用 Lovable 进行原型设计，并从 Vercel、Netlify、GitHub Actions 或类似平台执行生产构建，这些平台都支持将 npm 令牌作为秘密附加。在这种设定下，试用到商业的切换通常在你连接部署管线时完成，Lovable 不再需要凭据，因为不再执行安装。

如果 Lovable 构建在对 `npm.dhtmlx.com` 出现 40x 的错误且你无法顺利获取秘密，迁移到 CI 的路径是可靠的回退方案。

## 下一步

安装后，继续：

- [](integrations/react/quick-start.md)
- [](integrations/react/overview.md)
- [](integrations/react/state/state-management-basics.md)
- [Framework Guides](/category/framework-integrations/)