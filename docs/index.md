---
sidebar_label: DHTMLX Gantt overview
title: DHTMLX Gantt overview
slug: /
description: "Overview of the DHTMLX Gantt JavaScript component. Start with quick-start guides, explore detailed guides and API reference, and try live demos."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';
 

**DHTMLX Gantt** is a JavaScript component for displaying and editing project timelines in the browser. 
It combines a configurable grid, a zoomable time scale, and a scheduling engine that understands working time, dependencies, and constraints.

You can use it to build project and resource planning views for project management tools, construction and manufacturing schedules, field service planning, and any other application that needs a visual project timeline.

DHTMLX Gantt is available in Standard and PRO editions. The PRO edition includes such features as auto scheduling, critical path, resource management, dynamic loading, and more. 


---

## Quick start by framework

You can use DHTMLX Gantt as a vanilla JavaScript widget or integrate it into a modern framework. Start with a step-by-step "How to start" guide suitable for your stack: 

<div className="framework-grid">

  <a className="framework-card" href="guides/initializing-gantt-chart/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
    <div className="framework-desc">
    Minimal setup with script tags or bundlers. Great for simple pages or non-framework apps.
    </div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
    Use the ready-made <code>ReactGantt</code> component with props and events.
    </div>
  </a>


  <a className="framework-card" href="integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
    Integrate Gantt into Angular projects using a thin wrapper.
    </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
    Add a Gantt chart to Vue apps with a small wrapper and reactive props.
    </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
    Use Gantt inside Svelte with a simple component that binds configuration and events.
    </div>
  </a>

  <a className="framework-card" href="integrations/react/js-gantt-react/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React (integration)</div>
    <div className="framework-desc">
    Embed the core Gantt widget into your own components for full control over life cycle and data flow.
    </div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
    <div className="framework-desc">
    Embed Gantt in Salesforce apps, connect to your org data, and keep project timelines in CRM.
    </div>
  </a>

</div>

---


## Live demos

To see DHTMLX Gantt in action, explore the online demos:

- [Basic Gantt chart with tasks and links.](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27)
- [Auto scheduling](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/12_auto_scheduling.html%27&filter=%27%27) and [critical path](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/03_critical_path.html%27&filter=%27%27) examples.
- Resource management [diagram](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/04_resource_usage_diagram.html%27&filter=%27%27) and [histogram](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/09_resource_histogram.html%27&filter=%27%27).
- [Browse all samples](https://docs.dhtmlx.com/gantt/samples/) to check the full range of Gantt features.

---

## Key capabilities

DHTMLX Gantt combines a scheduling engine, a flexible timeline, and resource tools. 
The sections below highlight the main areas and guide you to more detailed chapters.

### Project scheduling

DHTMLX Gantt includes a scheduling engine that comprehends project structure and working time: 

- [Task types](guides/task-types.md) and [dependencies](guides/dependencies.md) - three core task types (task, summary, milestone) linked by dependencies.
- [Working time calendars](guides/working-time/) on project, task, and resource levels.
- [Auto scheduling](guides/auto-scheduling/) and [critical path](guides/critical-path/) to recalculate plans and highlight the tasks that drive the project finish date.

The scheduling behavior is configurable, so you can align it with your internal rules or tools like MS Project.

### Timeline & grid

The component combines a data grid on the left with a zoomable time scale on the right, both parts being highly tunable:

- Flexible [layout](guides/layout-config/) with additional grids, right-side columns, and custom panels.
- Configurable [columns](guides/specifying-columns/) with inline editing, [multi-selection](guides/multiselection/), drag-and-drop, and keyboard navigation.
- A customizable [time scale](guides/configuring-time-scale/) with [markers](guides/markers/), and [highlighted time slots](guides/highlighting-time-slots/).

### Advanced project controls

For more detailed project tracking, Gantt supports such features as: 

- [Baselines](guides/inbuilt-baselines/#baselines) and [deadlines](guides/inbuilt-baselines/#deadlines-and-constraints) to compare planned dates with current ones.
- [Unscheduled tasks](guides/unscheduled-tasks/) and [split tasks](guides/split-tasks/) for incomplete, interrupted, or phased work.
- [Undo/redo](guides/undo-redo) history for safe editing.

### Resource & workload management (PRO)

The PRO edition adds a dedicated resource layer which provides:

- [Resource assignments](guides/resource-management/#assigningresources) attached to tasks.
- [Resource histogram](guides/resource-management/#resource-histogram) and [resource load diagrams](guides/resource-management/#resourceloaddiagram).
- [Grouping tasks](guides/resource-management/#balancingresourceload) by resource to see who is doing what.

This turns the Gantt chart into a basic tool for managing resources without leaving your application.

### Export & ecosystem

DHTMLX Gantt integrates with external tools and output formats ensuring great export/import possibilities: 

- Export to [PDF/PNG](guides/export/) and [Excel](guides/excel/) (including a [Node.js export module](guides/export-requirements/)).
- Export/import to [MS Project](guides/export-msproject/) and [Primavera](guides/export-primavera/) (via export service).

---

## Frameworks and backend integration

### Frontend integration

DHTMLX Gantt is a framework-agnostic, vanilla JavaScript component that works in all modern browsers. It can be used:

- As a standalone JS widget on any page.
- Wrapped into [React](integrations/react), [Angular](integrations/angular/howtostart-angular), [Vue](integrations/vue/howtostart-vue), or [Svelte](integrations/svelte/howtostart-svelte) components. 

For **React** you have two options:

- Use the [official ReactGantt wrapper](integrations/react), which exposes Gantt as a declarative React component with props for configuration and events. This is usually the best choice for new React projects.
- Follow the [low-level React integration guide](integrations/react/js-gantt-react/) if you prefer to embed the core Gantt widget yourself and control initialization, destruction, and data flow manually.

For **Angular**, **Vue**, and **Svelte**, the [How to start](integrations/howtostart-guides) guides show how to build a thin wrapper component that fits your application architecture.

### Backend integration

On the backend side, Gantt communicates with a REST-like API:

- Data is typically loaded and saved as [JSON (tasks, links, resources, assignments)](guides/loading/).
- The built-in [DataProcessor](guides/server-side/) helps routing the create/update/delete operations to your server.
- There are [tutorials](integrations/howtostart-guides/#how-to-start-with-gantt-on-server-side) for popular backend platforms and frameworks ([Node.js](integrations/node/howtostart-nodejs/), [.NET Core](integrations/dotnet/howtostart-dotnet-core/), [Laravel](integrations/php/howtostart-php-laravel/), etc.) that cover CRUD operations and best practices for syncing Gantt with your database.

Thus, it is easy to plug Gantt into existing systems or new micro services.



---

## What's next

If you are just getting started:

1. Follow a [How to start](#quick-start-by-framework) guide for your preferred front-end framework or plain JavaScript. 
2. Adjust [grid columns](guides/specifying-columns/), [working time calendars](guides/working-time/), [scales](guides/configuring-time-scale/), and [editing behavior](guides/default-edit-form/). 
3. [Connect to your backend](integrations/howtostart-guides/#how-to-start-with-gantt-on-server-side) - set up the [DataProcessor](guides/server-side/#customrouting) and REST endpoints for tasks, links, and resources. 
4. Explore [Guides](/guides) and [API reference](api/api-overview/) for deeper customization (templates, events, extensions). 

If you are already using DHTMLX Gantt and upgrading from an earlier version, check the [What's new](whats-new/) for the release notes and a summary of the latest features and migration guides.