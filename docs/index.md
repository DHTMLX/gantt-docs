---
sidebar_label: DHTMLX Gantt overview
title: DHTMLX Gantt overview
slug: /
description: "Explore DHTMLX Gantt features, editions, installation options, framework integrations, API docs, samples, and AI tools for building project planning apps."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';
 

**DHTMLX Gantt** is a JavaScript Gantt chart component with included TypeScript type definitions that helps developers add advanced planning and scheduling tools to their web applications. It integrates with React, Angular, Vue, and other frontend frameworks and stacks. DHTMLX Gantt also supports AI‑assisted development through the DHTMLX MCP Server, Agent Skills, and by exposing a predictable, structured API to coding assistants. 

Teams use DHTMLX Gantt to build planning interfaces inside project management tools, ERP and operations systems, construction and manufacturing software, field service solutions, SaaS products, and internal business applications that need a configurable visual timeline.

![gantt_overview](/img/gantt_sample.png)

At a high level, DHTMLX Gantt consists of a project data model (tasks, links, resources, assignments, calendars), a scheduling layer that applies dependencies and working time rules, and a UI layer that renders this data in a synchronized grid and timeline with support for inline editing and event-driven customization.

DHTMLX Gantt works in modern browsers, supports touch interaction and keyboard navigation, can be styled with built‑in and custom themes, and fits accessibility‑focused, localized user interfaces.

## Quick start and developer resources

- [Installation guide](guides/installation.md) for Community, trial, and PRO setup flows
- [Community vs PRO comparison](guides/editions-comparison.md) for feature differences between editions
- [npm package](https://www.npmjs.com/package/dhtmlx-gantt) for the public JavaScript package of the Community edition
- [GitHub repository](https://github.com/DHTMLX/gantt) for the source code of the Community edition and issue tracking
- [API reference](api/api-overview.md) and [samples](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27) for implementation details
- [What's New](whats-new.md) for releases and migration notes

## Gantt feature highlights

DHTMLX Gantt includes a scheduling engine, a flexible timeline, and resource tools.

### Project scheduling

The scheduling engine handles project structure and working time. It covers:

- [Task types and dependencies](guides/task-types.md), namely regular tasks, project tasks and milestones linked by dependencies;
- [Working-time configuration](guides/working-time.md) with project-, task-, and resource-specific calendars (*available in the PRO edition*);
- [Auto scheduling](guides/auto-scheduling.md) to recalculate plans (*available in the PRO edition*);
- [Critical path](guides/critical-path.md) to highlight the tasks that drive the project finish date (*available in the PRO edition*).

The scheduling behavior is configurable, so you can align it with your internal rules or tools like MS Project.

### Timeline and grid

The component combines a data grid on the left with a zoomable time scale on the right. Both parts are extensively configurable:

- [Flexible layout](guides/layout-config.md) with additional grids, right-side columns, and custom panels;
- [Configurable columns](guides/specifying-columns.md) with inline editing, drag-and-drop, and keyboard navigation, plus [multi-selection](guides/multiselection.md) available in the PRO edition;
- [Customizable time scale](guides/configuring-time-scale.md) with markers and highlighted time slots.

### Advanced project controls

For more detailed project tracking, the PRO edition of DHTMLX Gantt supports such features as:

- [Baselines](guides/inbuilt-baselines.md#baselines) and [deadlines](guides/inbuilt-baselines.md#deadlines-and-constraints) to compare planned dates with current ones;
- [Unscheduled tasks](guides/unscheduled-tasks.md) and [split tasks](guides/split-tasks.md) for incomplete, interrupted, or phased work;
- [Undo/redo history](guides/undo-redo.md) for safe editing.

### Resource and workload management

The PRO edition also adds a dedicated resource layer, turning the Gantt chart into a planning interface that covers both task scheduling and workload visibility. This includes:

- [Resource assignments](guides/resource-management.md#assigningresources) attached to tasks;
- [Resource histogram](guides/resource-management.md#resource-histogram) and [resource load diagrams](guides/resource-management.md#resourceloaddiagram) to visualize resource workload;
- [Grouping tasks by resource](guides/resource-management.md#balancingresourceload) to track workloads, spot conflicts, and balance the team.

### Interactivity and editing

The chart is designed to be edited directly by the end user, not just displayed. This is made possible by:

- A configurable [edit form (lightbox)](guides/default-edit-form.md) for viewing and editing task details, with support for custom fields and buttons;
- [Quick info](guides/quick-info.md) popups and [tooltips](guides/tooltips.md) that surface task details without opening a full form, including touch-friendly templates;
- [Drag-and-drop task creation and selection](guides/advanced-dnd.md), plus [mouse-drag scrolling of the timeline](api/config/drag_timeline.md);
- [Keyboard navigation](guides/keyboard-navigation.md) and [accessibility](guides/accessibility.md) support for screen readers and non-mouse input.

### Customization and styling

The look of the Gantt chart can be adjusted at every level, from a full theme to a single task bar, through:

- A set of built-in [skins](guides/skins.md) built on CSS variables, with support for [deep customization](guides/custom-skins.md) and creating new themes;
- [Templates](guides/common-configuration.md#gantttemplatesobject) to override how tasks, links, and grid cells are rendered;
- Fine-grained [task coloring](guides/colouring-tasks.md) and [link styling](guides/colouring-lines.md) to visually highlight specific items;
- [Localization](guides/localization.md) support for interface language and date/time formats.

For the full list of CSS selectors and styling examples for the grid, timeline and resource panel, see the [CSS documentation](guides/css-overview.md).

### Export and ecosystem

DHTMLX Gantt integrates with external tools and output formats, including:

- Export to [PDF/PNG](guides/export.md) and [Excel](guides/excel.md), including a [Node.js export module](guides/export-requirements.md);
- Export/import to [MS Project](guides/export-msproject.md) and [Primavera](guides/export-primavera.md) via the supported export service.

## Live demos

To see DHTMLX Gantt in action, explore the online demos:

- [Basic Gantt chart with tasks and links](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27)
- [Auto scheduling](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/12_auto_scheduling.html%27&filter=%27%27) and [critical path](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/03_critical_path.html%27&filter=%27%27) examples
- Resource management: [diagram](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/04_resource_usage_diagram.html%27&filter=%27%27) and [histogram](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/09_resource_histogram.html%27&filter=%27%27)

View [all samples](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27) to check the full range of Gantt features. 

For framework-oriented starting points, see the example repositories for [React](https://github.com/DHTMLX/react-gantt-examples), [Angular](https://github.com/DHTMLX/angular-gantt-examples), and [Vue](https://github.com/DHTMLX/vue-gantt-examples).

Some samples demonstrate PRO functionality, so check the [Community vs PRO comparison](guides/editions-comparison.md) before reusing them in a Community edition project.

## Editions and licensing 

DHTMLX Gantt is available in two editions: **Community** and **PRO**. You can start with the free Community edition and upgrade to the PRO version later if you need more features. You may also start directly with the PRO edition either through an **official trial** or with a paid license. Choose one of the following options to get started with DHTMLX Gantt:

- **[Community edition](https://dhtmlx.com/blog/meet-dhtmlx-gantt-community-edition-mit-license/).** Free and MIT-licensed, it covers the core interactive Gantt features for DHTMLX Gantt v10+.
- **[Official trial](https://dhtmlx.com/docs/download/).** It lets you evaluate the full PRO feature set and receive technical support during the trial period.
- **[PRO edition](https://dhtmlx.com/docs/products/licenses.shtml).** Built for production environments, it includes advanced planning features, official support and commercial licensing.

To see the exact feature differences between editions, check the [Community vs PRO comparison](guides/editions-comparison.md). For the setup flow of each option, see the [installation guide](guides/installation.md). 

If you are migrating from an earlier GPL version, use the [migration guide](migration.md). GPL v2 applies only to previous DHTMLX Gantt versions before v10 released under GPL.

## Quick start by framework

You can use DHTMLX Gantt as a vanilla JavaScript widget or integrate it into a modern framework. Start with a step-by-step guide suitable for your preferred technology:

<div className="framework-grid">
  <div className="framework-card">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
    <div className="framework-desc">
      Minimal setup with script tags or bundlers. Great for simple pages or non-framework apps. Start with the <a href="guides/installation/">installation guide</a>.
    </div>
  </div>

  <div className="framework-card">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      For evaluation and PRO, use the official <a href="integrations/react/quick-start/"><code>ReactGantt</code> wrapper</a>. For Community, integrate the core JavaScript Gantt component using the <a href="integrations/react/js-gantt-react/">React integration guide</a>.
    </div>
  </div>

  <div className="framework-card">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      For evaluation and PRO, use the official <a href="integrations/angular/quick-start/"><code>Angular</code> wrapper</a>. For Community, integrate the core JavaScript Gantt component using the documented <a href="integrations/angular/js-gantt-angular/">Angular integration path</a>.
    </div>
  </div>

  <div className="framework-card">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      For evaluation and PRO, use the official <a href="integrations/vue/quick-start/"><code>VueGantt</code> wrapper</a>. For Community, integrate the core JavaScript Gantt component using the <a href="integrations/vue/js-gantt-vue/">How to Start with Vue</a> guide.
    </div>
  </div>

  <div className="framework-card">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      Use Gantt inside Svelte with a simple component that binds configuration and events. Start with the <a href="integrations/svelte/howtostart-svelte/">Svelte guide</a>.
    </div>
  </div>

  <div className="framework-card">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
    <div className="framework-desc">
      Embed Gantt in Salesforce apps, connect to your org data, and keep project timelines in CRM. Start with the <a href="integrations/salesforce/howtostart-salesforce/">Salesforce guide</a>.
    </div>
  </div>
</div>

## AI coding tools

For AI-assisted development, start with the DHTMLX Gantt guides created specifically for coding assistants:

- [AI Tools guide](integrations/ai-tools.md)
- [DHTMLX MCP Server guide](integrations/ai-tools/mcp-server.md)
- [Agent Skills guide](integrations/ai-tools/agent-skills.md)
- [Lovable AI integration guide](integrations/ai-tools/lovable-ai.md)

## Backend integration

DHTMLX Gantt lets you connect to any backend by implementing a RESTful API on the server:

- Data is typically loaded and saved as JSON for [tasks](guides/loading.md), [links](guides/loading.md), [resources](guides/resource-management.md), and [assignments](guides/resource-management.md#connecting-resources-to-tasks).
- The built-in [DataProcessor](guides/server-side.md) helps route create, update, and delete operations to your server.
- There are tutorials for popular backend platforms and frameworks ([Node.js](integrations/node/howtostart-nodejs.md), [.NET Core](integrations/dotnet/howtostart-dotnet-core.md), [Laravel](integrations/php/howtostart-php-laravel.md), etc.) that cover CRUD operations and best practices for syncing Gantt with your database.

## What's next

If you are just getting started, proceed as follows:

1. Refer to the [How to start guide](integrations/howtostart-guides.md) for your preferred front-end framework or plain JavaScript.
2. Configure [grid columns](guides/specifying-columns.md), [working time calendars](guides/working-time.md), [scales](guides/configuring-time-scale.md), and [editing behavior](guides/default-edit-form.md).
3. Connect to your backend, set up the [DataProcessor](guides/server-side.md) and application endpoints for tasks, links, and resources.
4. Explore [Guides](guides.md) and [API reference](api/api-overview.md) for deeper customization such as templates, events, and extensions.

If you are already using DHTMLX Gantt and upgrading from an earlier version, check [What's New](whats-new.md) for the release notes and a summary of the latest features and migration guides.