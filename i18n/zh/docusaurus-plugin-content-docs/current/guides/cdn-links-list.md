---
title: "CDN 链接完整列表"
sidebar_label: "CDN 链接"
---

# CDN 链接完整列表

本文列出了在您的应用中引入 **dhtmlxGantt** 所需的 CDN 链接。

Gantt 由两个核心文件组成：

- **JavaScript：** `dhtmlxgantt.js`
- **样式：** `dhtmlxgantt.css`


## 最新版本的 Gantt（edge）

使用：

`https://cdn.dhtmlx.com/gantt/edge/...`

### 核心文件

- JS: https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js
- CSS: https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css



## 最新版本的 Gantt（edge），未压缩版本

使用：

`https://cdn.dhtmlx.com/gantt/edge/sources/...`

### 核心文件

- JS: https://cdn.dhtmlx.com/gantt/edge/sources/dhtmlxgantt.js
- CSS: https://cdn.dhtmlx.com/gantt/edge/sources/dhtmlxgantt.css


## 指定版本的 Gantt

使用：

`https://cdn.dhtmlx.com/gantt/[version_number]/...`

其中 `[version_number]` 表示包的 `major.minor` 版本号，例如 **9.0**、**8.0**、**7.1** 等。我们的 CDN 会为每个 major/minor 版本始终提供最新的 patch 版本。

### 核心文件

- JS: https://cdn.dhtmlx.com/gantt/9.0/dhtmlxgantt.js
- CSS: https://cdn.dhtmlx.com/gantt/9.0/dhtmlxgantt.css

### 皮肤（仅适用于 v8.0 及更早版本）

在 v8.0 及更早版本中，皮肤（skin）以独立的 CSS 文件形式提供。  
从 v9.0 开始，所有皮肤都包含在 `dhtmlxgantt.css` 中，并通过 `gantt.skin`/`gantt.setSkin()` 进行选择。更多信息请参阅 [迁移指南](migration.md#single-css-file)。

- Terrace: https://cdn.dhtmlx.com/gantt/8.0/skins/dhtmlxgantt_terrace.css
- Meadow: https://cdn.dhtmlx.com/gantt/8.0/skins/dhtmlxgantt_meadow.css
- Skyblue: https://cdn.dhtmlx.com/gantt/8.0/skins/dhtmlxgantt_skyblue.css
- Broadway: https://cdn.dhtmlx.com/gantt/8.0/skins/dhtmlxgantt_broadway.css
- Contrast Black: https://cdn.dhtmlx.com/gantt/8.0/skins/dhtmlxgantt_contrast_black.css
- Contrast White: https://cdn.dhtmlx.com/gantt/8.0/skins/dhtmlxgantt_contrast_white.css
- Material: https://cdn.dhtmlx.com/gantt/8.0/skins/dhtmlxgantt_material.css

## 指定版本的 Gantt，未压缩版本

使用：

`https://cdn.dhtmlx.com/gantt/[version_number]/sources/...`

其中 `[version_number]` 表示包的 `major.minor` 版本号，例如 **9.0**、**8.0**、**7.1** 等。我们的 CDN 会为每个 major/minor 版本始终提供最新的 patch 版本。

### 核心文件

- JS: https://cdn.dhtmlx.com/gantt/9.0/sources/dhtmlxgantt.js
- CSS: https://cdn.dhtmlx.com/gantt/9.0/sources/dhtmlxgantt.css


### 皮肤（仅适用于 v8.0 及更早版本）

在 v8.0 及更早版本中，皮肤（skin）以独立的 CSS 文件形式提供。  
从 v9.0 开始，所有皮肤都包含在 `dhtmlxgantt.css` 中，并通过 `gantt.skin`/`gantt.setSkin()` 进行选择。更多信息请参阅 [迁移指南](migration.md#single-css-file)。

未压缩的皮肤文件：

- Terrace: https://cdn.dhtmlx.com/gantt/8.0/sources/skins/dhtmlxgantt_terrace.css
- Meadow: https://cdn.dhtmlx.com/gantt/8.0/sources/skins/dhtmlxgantt_meadow.css
- Skyblue: https://cdn.dhtmlx.com/gantt/8.0/sources/skins/dhtmlxgantt_skyblue.css
- Broadway: https://cdn.dhtmlx.com/gantt/8.0/sources/skins/dhtmlxgantt_broadway.css
- Contrast Black: https://cdn.dhtmlx.com/gantt/8.0/sources/skins/dhtmlxgantt_contrast_black.css
- Contrast White: https://cdn.dhtmlx.com/gantt/8.0/sources/skins/dhtmlxgantt_contrast_white.css
- Material: https://cdn.dhtmlx.com/gantt/8.0/sources/skins/dhtmlxgantt_material.css