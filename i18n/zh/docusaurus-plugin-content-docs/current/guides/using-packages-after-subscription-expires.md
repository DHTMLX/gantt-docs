---
title: "订阅过期后的软件包使用"
sidebar_label: "订阅过期后"
description: "订阅结束后如何备份并继续使用付费的 DHTMLX @dhx Gantt npm 包。"
---

# 订阅过期后的软件包使用

付费的 Gantt 软件包——商业 JavaScript 库（`@dhx/gantt`）以及框架封装（`@dhx/react-gantt`、`@dhx/angular-gantt`、`@dhx/vue-gantt`）——托管在位于 `https://npm.dhtmlx.com` 的私有注册表中。对该注册表的访问与你的订阅绑定：一旦订阅到期，你将无法再从 npm 安装或重新安装这些软件包。

根据您的许可证，您有权使用的版本仍归您所有。为了在订阅结束后继续安装它们，请在订阅到期前进行本地备份 **在订阅到期前**。

:::tip
请在订阅仍然有效时执行此操作——一旦无法访问 `npm.dhtmlx.com`，您将无法再拉取这些软件包。
:::

:::note
这仅适用于付费的 `@dhx` 软件包。公开的 `dhtmlx-gantt`（社区版）和 `@dhtmlx/trial-*`（评估版）软件包位于公共 npm 注册表中，不受影响。
:::

## 备份您的软件包

### 1. 将软件包安装到一个临时项目中

~~~bash
mkdir dhtmlx-backup
cd dhtmlx-backup
npm init -y
npm install <your-dhtmlx-packages>   # e.g. npm install @dhx/gantt @dhx/react-gantt
~~~

### 2. 打包每个库

已安装的库位于 `node_modules/@dhx`。对于您要保留的每个包，运行 `npm pack`：

~~~bash
cd node_modules/@dhx/<package-name>
npm pack
~~~

这会在当前目录生成一个 `.tgz` 文件（例如 `dhx-gantt-9.0.10.tgz`）。将生成的 `.tgz` 文件复制到一个安全的位置，例如项目中的 `./lib/` 文件夹。

## 使用备份的软件包

在项目的 `package.json` 中引用本地的 `.tgz` 文件，而不是注册表：

~~~json
"dependencies": {
  "@dhx/gantt": "file:./lib/dhx-gantt-9.0.10.tgz"
}
~~~

然后像往常一样运行 `npm install`。npm 将从本地文件解析依赖，因此无需访问注册表。

## 发布到您自己的私有注册表

如果您维护自己的 npm 注册表，您可以将备份的软件包重新发布到那里，而不是引用本地文件。将软件包提取到一个新文件夹中（或从 `node_modules/@dhx/<package-name>` 复制），打开其 `package.json`，并将 `publishConfig` 指向您的注册表：

~~~json
"publishConfig": {
  "registry": "https://your.registry.example.com"
}
~~~

然后发布它：

~~~bash
npm publish
~~~

## 如果错过了备份窗口

如果您无法在订阅到期前完成备份，请通过 [info@dhtmlx.com](mailto:info@dhtmlx.com) 给我们发送电子邮件，我们将向您提供您有权获取的最新版本。