--- 
title: "皮肤自定义"
sidebar_label: "皮肤自定义"
--- 

# 皮肤自定义

从 v9.0 开始，Gantt 的皮肤使用 CSS 变量，您可以使用它们进行自定义和样式设置。

[动态更换皮肤](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)

关键 CSS 变量：

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

所有变量都可以在包的 codebase/sources/less/src/themes/variables.less 文件中找到。

## 如何自定义皮肤

最简单的自定义 Gantt 外观的方法是通过在您的样式表中覆盖相关的 CSS 变量。以下是一个示例：

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

[动态更换皮肤](https://docs.dhtmlx.com/gantt/samples/06_skins/06_dynamic_skin.html)

通过以上方式定义变量，您可以重新定义默认样式，确保您的自定义样式应用到 Gantt 上。

:::note
为了在整个主题中正确继承值，请在 :root 元素中定义变量。
::: 

在确保正确继承和应用于组件的前提下，将值重新定义会影响到与之相关的样式。

例如，变量 `--dhx-gantt-scale-color` 会从主文本颜色变量 `--dhx-gantt-container-color` 继承。

- 如果在 **:root** 级别重新定义 `--dhx-gantt-container-color`，就能确保 `--dhx-gantt-scale-color` 反映此更改。

~~~html
<style>
:root {
    /* --dhx-gantt-scale-color 及其它
  继承自 `--dhx-gantt-container-color` 的变量
  将会受到影响
  */
  --dhx-gantt-container-color: #222;

}
</style>
~~~

- 如果在文档树的较低层级重新定义，例如在 **.gantt_container** 中，那么不会影响 `--dhx-gantt-scale-color` 变量。

~~~html
<style>
.gantt_container {
    /* 只有直接使用 --dhx-gantt-container-color 的元素才会受到影响
  */
  --dhx-gantt-container-color: #222;
}
</style>
~~~

## 如何使用源代码

dhtmlxGantt 随附以下形式的样式文件：

- **codebase/dhtmlxgantt.css** - 已预先构建的压缩 CSS 文件用于皮肤，适用于生产环境；
- **codebase/sources/dhtmlxgantt.css** - 预构建的可读 CSS 文件；
- **codebase/sources/less/** - Gantt 皮肤的源 Less 文件。

后者可用于对现有皮肤进行深度自定义或创建新皮肤。

## 如何开始

您可以将 **codebase/sources/less** 初始化为一个 NPM 包。
源文件将包含两种类型的文件：

- 样式表；
- 带微变量声明的文件，您可以用来微调 gantt 视图或创建新皮肤。

## 如何构建皮肤

在 **codebase/sources/less/** 运行：

~~~ 
> npm install
~~~

安装完成后，您可以使用以下命令重新构建 CSS 文件：

~~~ 
> npm run build
~~~

或者

~~~ 
> npm run watch
~~~

该脚本将从源文件重新构建 CSS 文件并将它们放入 gantt 包的 *codebase* 文件夹中，替换现有文件。

## 结构

版本 9.0 的 **less** 文件夹结构（未来版本可能更改）如下：

### 图像

- **./src/imgs** - 所有皮肤使用的 svg 图标
- **./src/iconfont** - 预构建到网页字体中的图标

### 皮肤定义

默认变量集合在 terrace 皮肤中定义，其他皮肤重新定义相应变量并添加样式。

- **./src/themes**
  - *./src/themes/variables.less* - 所有皮肤通用的变量，`terrace` 皮肤
  - *./src/themes/contrast_black* - 对比黑皮肤变量
  - *./src/themes/contrast_white* - 对比白皮肤变量
  - *./src/themes/material* - material 皮肤变量
  - *./src/themes/dark* - 暗黑皮肤变量
  - *./src/themes/flat* - 平面皮肤变量

### 构建皮肤的入口

- theme.less
- package.json

## 创建自定义皮肤

若要创建一个新的皮肤，您可以从 **sources/less/src/themes** 文件夹中复制并重命名现有皮肤之一。请按以下步骤进行：

1) 复制并重命名来自 **sources/less/src/themes** 文件夹的现有文件，例如：

~~~ 
-> copy:
codebase/sources/less/src/themes/material.less

-> rename to:
codebase/sources/less/src/themes/custom.less
~~~

2) 在 **sources/less/src/themes/index.less** 中导入新文件，如下所示：

~~~ 
@import "./custom";
~~~

并按如下内容添加：

~~~css
:root[data-gantt-theme='custom'] {
    --dhx-gantt-theme: custom;
    --dhx-gantt-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-gantt-base-colors-primary: #0288D1;

}
~~~

请注意，皮肤变量应在 `:root` 元素下定义，使用 `data-gantt-there` 选择器。

新主题必须包含带有主题名称的 **--dhx-gantt-theme** 变量。

3) 通过运行以下命令重新构建皮肤：

~~~ 
npm run build
~~~

:::note
请注意，Gantt 可能会根据所应用的皮肤对日历应用一些预定义设置。
当您通过复制现有皮肤来创建新皮肤时，您可能需要手动将相应设置应用到 Gantt。
:::

## JS 样式设置

请注意，并非 Gantt 的所有样式方面都通过 CSS 控制，一些参数由 JavaScript 配置定义，例如以下属性：

- [link_line_width](api/config/link_line_width.md)
- [link_radius](api/config/link_radius.md)
- [link_arrow_size](api/config/link_arrow_size.md)
- [scale_height](api/config/scale_height.md)
- [row_height](api/config/row_height.md)