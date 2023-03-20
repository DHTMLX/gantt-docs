emptyStateElement Extension
======================

Read details about the emptyStateElement extension in the desktop/empty_state_screen.md article.

## Methods

The following methods are available via the **gantt.ext.emptyStateElement** object:

- <span class=submethod>**isGanttEmpty (): boolean**</span> - returns *true* if there is no data loaded into the Gantt chart, otherwise - returns *false*. The extension uses the method to define whether to display the "empty state" on the page. You can redefine the method if you need to change the default behavior.
- <span class=submethod>**renderContent (container): void**</span> - puts an HTML content into the empty state element. The method can be redefined.
    - **_container_** - (*HTMLElement*) - the container element
- <span class=submethod>**getContainer (): HTMLElement**</span> - returns the DOM element of the empty state. By default, returns the grid element (the "empty state" will be displayed in the grid). If there is no grid, returns the timeline element (the "empty state" will be displayed in the timeline). The method can be redefined.
- <span class=submethod>**show (): undefined**</span> - displays the "empty state". The extension calls the method by itself
- <span class=submethod>**hide (): undefined**</span> - hides the "empty state". The extension calls the method by itself
