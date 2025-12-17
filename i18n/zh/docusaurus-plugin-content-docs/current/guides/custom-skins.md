---
title: "皮肤自定义"
sidebar_label: "皮肤自定义"
---

皮肤自定义
========================

从 9.0 版本开始，Gantt 皮肤采用了 CSS 变量，使您可以轻松地自定义和美化组件的样式。


[Change skin dynamically](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)


主要 CSS 变量:

~~~css
:root {
    --dhx-gantt-theme: terrace;
    --dhx-gantt-font-family: Inter, Helvetica, Arial, sans-serif;
    --dhx-gantt-font-size: 14px;

    --dhx-gantt-base-colors-white: #FFFFFF;
    --dhx-gantt-base-colors-select: #EFF3FF;
    --dhx-gantt-base-colors-hover-color: #e0e0e0;
    --dhx-gantt-base-colors-border-light: #F0F0F0;
    --dhx-gantt-base-colors-border: #DFE0E1;

    --dhx-gantt-base-colors-icons: #A1A4A6;
    --dhx-gantt-base-colors-disabled: #E9E9E9;
    --dhx-gantt-base-colors-select: #E0E5F3;
    --dhx-gantt-base-colors-text-light: #555D63;
    --dhx-gantt-base-colors-text-base: #23272A;
    --dhx-gantt-base-colors-text-on-fill: rgba(255, 255, 255, 0.90);
    --dhx-gantt-base-colors-background: #FFFFFF;
    --dhx-gantt-base-colors-background-alt: #F2F2F2;

    --dhx-gantt-base-colors-primary: #537CFA;
    --dhx-gantt-base-colors-warning: #FAB936;
    --dhx-gantt-base-colors-error: #E3334E;
    --dhx-gantt-base-colors-success: #1BC297;

    --dhx-gantt-container-background: var(--dhx-gantt-base-colors-background);
    --dhx-gantt-container-color: var(--dhx-gantt-base-colors-text-base);
    --dhx-gantt-offtime-background: var(--dhx-gantt-base-colors-background-alt);

    --dhx-gantt-scale-background: var(--dhx-gantt-container-background);
    --dhx-gantt-scale-border-vertical: 1px solid var(--dhx-gantt-base-colors-border-light);
    --dhx-gantt-scale-border-horizontal: 1px solid var(--dhx-gantt-base-colors-border);

    --dhx-gantt-scale-color: var(--dhx-gantt-base-colors-text-light);

    --dhx-gantt-grid-body-background: transparent;
    --dhx-gantt-grid-scale-background: var(--dhx-gantt-scale-background);
    --dhx-gantt-grid-scale-color: var(--dhx-gantt-scale-color);
    --dhx-gantt-grid-scale-border-vertical: var(--dhx-gantt-scale-border-vertical);
    --dhx-gantt-timeline-scale-background: var(--dhx-gantt-scale-background);
    --dhx-gantt-timeline-scale-color: var(--dhx-gantt-scale-color);
    --dhx-gantt-timeline-scale-border-vertical:  var(--dhx-gantt-scale-border-vertical);

    /* tasks */

    --dhx-gantt-task-blue: linear-gradient(180deg, #527CFF 0%, #9751FC 100%);
    --dhx-gantt-task-green: linear-gradient(180deg, #12D979 0%, #1ECDEB 100%);
    --dhx-gantt-task-violet: linear-gradient(180deg, #D071EF 0%, #EE71D5 100%);
    --dhx-gantt-task-yellow: linear-gradient(180deg, #FFB725 0%, #FFBB25 31.25%, #FAEA27 100%);

    --dhx-gantt-task-background: var(--dhx-gantt-task-blue);
    --dhx-gantt-task-border: none;
    --dhx-gantt-task-color: var(--dhx-gantt-base-colors-text-on-fill);
    --dhx-gantt-project-color: var(--dhx-gantt-task-color);
    --dhx-gantt-task-line-text: var(--dhx-gantt-container-color);

    --dhx-gantt-task-row-border: 1px solid var(--dhx-gantt-base-colors-border);
    --dhx-gantt-task-row-background: var(--dhx-gantt-container-background);
    --dhx-gantt-task-row-background--odd: var(--dhx-gantt-container-background);

    --dhx-gantt-project-background: var(--dhx-gantt-task-green);
    --dhx-gantt-milestone-background: var(--dhx-gantt-task-violet);

    --dhx-gantt-task-marker-color: var(--dhx-gantt-task-background);

    --dhx-gantt-popup-background: var(--dhx-gantt-container-background);
    --dhx-gantt-popup-color: var(--dhx-gantt-container-color);

    --dhx-gantt-tooltip-background: var(--dhx-gantt-base-colors-text-base);
    --dhx-gantt-tooltip-color: var(--dhx-gantt-container-background);

    --dhx-gantt-link-background: var(--dhx-gantt-base-colors-icons);
    --dhx-gantt-link-background-hover: var(--dhx-gantt-base-colors-icons-hover);
    --dhx-gantt-link-critical-background: var(--dhx-gantt-base-colors-error);

}
~~~

所有这些变量都位于包内的 **codebase/sources/less/src/themes/variables.less** 文件中。

如何自定义皮肤
-----------------

最简单的更改 Gantt 外观的方法是在您的样式表中覆盖 CSS 变量。例如:

~~~html
<style>
:root {
 /* scales */
  --dhx-gantt-scale-background: #8E8E8E;
  --dhx-gantt-base-colors-border-light: #C5C5C5;
  --dhx-gantt-base-colors-border: #DFE0E1;
  --dhx-gantt-scale-color: #FFF;
  --dhx-gantt-base-colors-icons: #00000099;
  
  /* tasks */
  --dhx-gantt-task-background: #3db9d3;
  --dhx-gantt-task-color: #FFFFFF;
  --dhx-gantt-project-background: #6AA84F;
  --dhx-gantt-project-color: #FFFFFF;

  /* links */
  --dhx-gantt-link-background: #ffa011;
  --dhx-gantt-link-background-hover: #ffa011;

}
</style>
~~~


[Change skin dynamically](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)


通过这种方式设置变量，默认样式将被您的自定义样式替换，Gantt 组件将采用您偏好的外观。

:::note
为了确保整个主题变量的正确继承，请在 :root 元素上定义变量。
:::

在 **:root** 层级定义这些样式，可以确保它们在整个组件中被正确继承。这样，如果更改了某个被其他变量依赖的变量，所有相关样式都会自动更新。

例如，变量 `--dhx-gantt-scale-color` 继承自主文本颜色变量 `--dhx-gantt-container-color`。

- 当您在 **:root** 层级重新定义 `--dhx-gantt-container-color` 时，`--dhx-gantt-scale-color` 也会自动反映此更改。

~~~html
<style>
:root {
    /* --dhx-gantt-scale-color 及其他
  继承自 --dhx-gantt-container-color 的变量
  都会受到影响
  */
  --dhx-gantt-container-color: #222;

}
</style>
~~~

- 但如果您在 DOM 更深层级（如 **.gantt_container** 内部）重新定义 `--dhx-gantt-container-color`，则不会影响 `--dhx-gantt-scale-color`。

~~~html
<style>
.gantt_container {
    /* 只有直接使用 --dhx-gantt-container-color 的元素会受到影响 */
  --dhx-gantt-container-color: #222;
}
</style>
~~~

如何使用源码
------------

dhtmlxGantt 提供了多种格式的样式文件:

- **codebase/dhtmlxgantt.css** - 适用于生产环境的压缩皮肤 CSS 文件；
- **codebase/sources/dhtmlxgantt.css** - 可读性较好的预构建 CSS 文件；
- **codebase/sources/less/** - Gantt 皮肤的原始 less 文件。

如果您希望深度自定义现有皮肤或从零创建新皮肤，可以使用 less 文件。

如何开始
------------

您可以将 **codebase/sources/less** 视为一个 NPM 包。该目录包含两类文件:

- 样式表；
- 用于微调 Gantt 视图或构建新皮肤的变量声明文件。

如何构建皮肤
--------------------

在 **codebase/sources/less/** 目录下运行:

~~~
> npm install
~~~

安装完成后，可通过以下命令重新构建 CSS 文件:

~~~
> npm run build
~~~

或者，监听文件变更并自动重建:

~~~
> npm run watch
~~~

这些脚本会从源码编译 CSS 文件，并将其放入 Gantt 包的 *codebase* 文件夹，覆盖原有文件。

结构说明
------------

以下是 9.0 版本 **less** 文件夹的目录结构（未来版本可能会有变动）:

### 图片

- **./src/imgs** - 所有皮肤共用的 svg 图标
- **./src/iconfont** - 预制为 web 字体的图标

### 皮肤定义

默认变量在 `terrace` 皮肤中设置，其他皮肤通过覆盖这些变量并添加样式实现自定义。

- **./src/themes**
  - *./src/themes/variables.less* - 所有皮肤（包括 terrace）共用的通用变量
  - *./src/themes/contrast_black* - 黑色高对比度皮肤变量
  - *./src/themes/contrast_white* - 白色高对比度皮肤变量
  - *./src/themes/material* - material 皮肤变量
  - *./src/themes/dark* - 暗色皮肤变量
  - *./src/themes/flat* - 扁平皮肤变量

### 构建皮肤入口

- theme.less
- package.json

创建自定义皮肤
-------------------

要创建新皮肤，可以从 **sources/less/src/themes** 复制并重命名一个现有皮肤。步骤如下:

1) 复制并重命名现有文件，例如:

~~~
-> 复制：
codebase/sources/less/src/themes/material.less

-> 重命名为：
codebase/sources/less/src/themes/custom.less
~~~

2) 在 **sources/less/src/themes/index.less** 中导入您的新文件:

~~~
@import "./custom";
~~~

然后添加如下内容:

~~~css
:root[data-gantt-theme='custom'] {
    --dhx-gantt-theme: custom;
    --dhx-gantt-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-gantt-base-colors-primary: #0288D1;

}
~~~

请注意，皮肤变量应在带有 `data-gantt-theme` 属性选择器的 `:root` 下定义。

每个新主题必须包含 **--dhx-gantt-theme** 变量，并指定主题名称。

3) 重新构建皮肤，运行:

~~~
npm run build
~~~


:::note
请注意，Gantt 可能会根据所用皮肤对日历应用一些预设配置。如果您通过复制现有皮肤创建新皮肤，可能需要在 Gantt 中手动调整这些设置。
:::

JS 样式设置
---------------------

Gantt 的某些样式方面是通过 JavaScript 配置控制的，而不是 CSS。例如:

- [link_line_width](api/config/link_line_width.md)
- [link_radius](api/config/link_radius.md)
- [link_arrow_size](api/config/link_arrow_size.md)
- [scale_height](api/config/scale_height.md)
- [row_height](api/config/row_height.md)

