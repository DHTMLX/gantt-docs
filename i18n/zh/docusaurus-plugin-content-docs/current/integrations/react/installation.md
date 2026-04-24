--- 
title: 安装 React Gantt
sidebar_label: 安装
description: "如何通过 npm 安装 React Gantt 的评估版或商业版。"
---

# 安装 React Gantt

React Gantt 共有两种发行版： 

1. **评估版** 在公开 npm 上提供，包含试用水印，并且可选择配合免费评估期以获取技术支持。  
2. **专业版（商业版）** 可从私有 DHTMLX npm 仓库获取，面向生产环境使用。

两种包都包含相同的 API。

## 安装评估版（公开 npm）

评估构建在 npm 上的可用作为 [@dhtmlx/trial-react-gantt](https://www.npmjs.com/package/@dhtmlx/trial-react-gantt)：

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

或使用 Yarn：

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

该构建功能完备，但会显示一条消息，指示库正在以评估模式运行。

### 可选：开始完整评估期（推荐）

尽管评估包可以不受限制地安装，您也可以通过官方网站开启正式评估，网址为
[https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml](https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/download.shtml)。

开启正式评估在试用期内可获得免费的技术支持。

**下载离线示例（zip）**

评估表单还包含可下载的 ZIP，其中包含离线就绪示例。

您也可以在官方 GitHub 上浏览更多示例和演示项目，查看 [GitHub 上的 React Gantt 演示](https://github.com/DHTMLX/?q=react-gantt&type=all&language=&sort=)。

## 专业版（私有 npm 仓库）

专业版用于生产应用，并包含商业许可以及对技术支持的完整访问权限。

获得商业许可后，您可以在 [客户端区域](https://dhtmlx.com/clients/) 生成私有 npm 凭据。

生成登录名/密码后，配置 npm：

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

然后安装 Professional 包：

~~~bash
npm install @dhx/react-gantt
~~~

或者，使用 Yarn：

~~~bash
yarn add @dhx/react-gantt
~~~

## 下一步

安装后，继续进行：

- [](integrations/react/quick-start.md)
- [](integrations/react/overview.md)
- [](integrations/react/state/state-management-basics.md)
- [Framework Guides](/category/framework-integrations/)