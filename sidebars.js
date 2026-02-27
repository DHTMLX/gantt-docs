module.exports = {
    docs: [
        {
            type: "doc",
            id: "index"
        },
        {
            type: "category",
            label: "What's New & Migration",
            collapsible: true,
            collapsed: true,
            link: {
                type: 'generated-index',
                title: "What's New & Migration",
            },
            items: [
                {
                    type: "doc",
                    id: "whats-new"
                },
                {
                    type: "doc",
                    id: "migration"
                },
            ]
        },

        // how to start
        {
            type: "category",
            label: "Getting Started",
            collapsible: true,
            collapsed: false,
            link: {
                type: 'doc',
                id: "integrations/howtostart-guides",
            },
            items: [
                "guides/installation",
                "guides/cdn-links-list",
                "guides/initializing-gantt-chart"
                
               
            ]
        },

        // frameworks
        {
            type: "category",
            label: "Integrations",
            collapsible: true,
            collapsed: false,
            link: {
                type: 'doc',
                id: "integrations/howtostart-guides",
            },
            items: [
                {
                    type: "category",
                    label: "React",
                    link: {
                        type: 'doc',
                        id: 'integrations/react/index'
                    },
                    items: [
                        "integrations/react/overview",
                        "integrations/react/installation",
                        "integrations/react/quick-start",
                        "integrations/react/configuration-props",

                        // Data & State Management
                        {
                            type: "category",
                            label: "Data & State Management",
                            link: {
                                type: "doc",
                                id: "integrations/react/state/index"
                            },
                            items: [
                                "integrations/react/state/state-management-basics",
                                "integrations/react/state/redux-toolkit",
                                "integrations/react/state/zustand",
                                "integrations/react/state/mobx",
                                "integrations/react/state/xstate",
                                "integrations/react/state/jotai",
                                "integrations/react/state/valtio",
                                "integrations/react/firebase-integration",
                            ],
                        },
                        // Frameworks
                        {
                            type: "category",
                            label: "Framework Integrations",
                            link: {
                                type: "generated-index",
                                title: "React Gantt - Framework Integrations",
                            },
                            items: [
                                "integrations/react/nextjs",
                                "integrations/react/remix",
                            ],
                        },
                        // JS Gantt path
                        {
                            type: "category",
                            label: "Using JS Gantt in React",
                            link: {
                                type: "generated-index",
                                title: "Using dhtmlxGantt JS in React",
                            },
                            items: [
                                "integrations/react/js-gantt-react",
                            ],
                        },

                        {
                            type: 'doc',
                            id: "integrations/react/copyright"
                        },
                    ]
                },
               {
                    type: "category",
                    label: "Vue",
                    link: {
                        type: "doc",
                        id: "integrations/vue/index"
                    },
                    items: [
                        "integrations/vue/overview",
                        "integrations/vue/installation",
                        "integrations/vue/quick-start",
                        "integrations/vue/configuration-props",
                        "integrations/vue/customization-patterns",
                        {
                            type: "category",
                            label: "Data & State Management",
                            key: "vue-data-&-state",
                            link: {
                                type: "doc",
                                id: "integrations/vue/state/index"
                            },
                            items: [
                                "integrations/vue/state/state-management-basics",
                                "integrations/vue/state/pinia",
                            ],
                        },
                        {
                            type: "category",
                            label: "Using JS Gantt in Vue",
                            link: {
                                type: "generated-index",
                                title: "Using dhtmlxGantt JS in Vue",
                            },
                            items: [
                                "integrations/vue/howtostart-vue",
                            ],
                        },
                    ]
                }, 
                {
                    type: "category",
                    label: "Angular",
                    link: {
                        type: "doc",
                        id: "integrations/angular/index"
                    },
                    items: [
                        "integrations/angular/overview",
                        "integrations/angular/installation",
                        "integrations/angular/quick-start",
                        "integrations/angular/configuration-props",
                        {
                            type: "category",
                            label: "Data & State Management",
                            key: "angular-data-&-state",
                            link: {
                                type: "doc",
                                id: "integrations/angular/state/index"
                            },
                            items: [
                                "integrations/angular/state/state-management-basics",
                                "integrations/angular/state/rxjs",
                            ],
                        },
                        {
                            type: "category",
                            label: "Using JS Gantt in Angular",
                            link: {
                                type: "generated-index",
                                title: "Using dhtmlxGantt JS in Angular",
                            },
                            items: [
                                "integrations/angular/js-gantt-angular",
                            ],
                        },
                    ]
                },
                "integrations/svelte/howtostart-svelte",
                "integrations/salesforce/howtostart-salesforce",
                {
                    type: "category",
                    label: "AI Tools",
                    link: {
                        type: "doc",
                        id: "integrations/ai-tools/index"
                    },
                    items: [
                        "integrations/ai-tools/lovable-ai",
                        "integrations/ai-tools/mcp-server"
                    ]
                },
                "guides/using-gantt-on-server",
                {
                    type: "category",
                    label: "Backends",
                    link: {
                        type: 'generated-index',
                        title: 'Backend integrations',
                        keywords: ['Implementing CRUD in different backends', 'dhtmlxGantt backend integration'],
                        image: '/img/docusaurus.png',
                    },
                    items: [
                        "integrations/node/howtostart-nodejs",
                        "integrations/dotnet/howtostart-dotnet-core",
                        "integrations/php/howtostart-php-laravel",
                        "integrations/dotnet/howtostart-dotnet",
                        
                        
                        "integrations/php/howtostart-php-slim4",
                        
                        "integrations/other/howtostart-ruby",
                        "integrations/php/howtostart-php",
                        "integrations/other/howtostart-python",
                    ]
                },
            ]
        },
        // API
        {
            type: "category",
            label: "Gantt API",
            collapsible: true,
            collapsed: true,
            link: {
                type: 'doc',
                id: "api/api-overview"
            },
            items: [
                // Gantt methods
                {
                    type: "category",
                    label: "Methods",
                    collapsible: true,
                    collapsed: true,
                    link: {
                        type: 'doc',
                        id: "api/overview/methods-overview"
                    },
                    items: [
                        "api/method/promise",
                        "api/method/addcalendar",
                        "api/method/addlink",
                        {
                            type: "doc",
                            id: "api/method/addlinklayer",
                            className: "pro-version"
                        },
                        "api/method/addmarker",
                        "api/method/addshortcut",
                        "api/method/addtask",
                        {
                            type: "doc",
                            id: "api/method/addtasklayer",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/method/adjusttaskheightforbaselines",
                            className: "pro-version"
                        },
                        "api/method/alert",
                        "api/method/assert",
                        "api/method/attachevent",
                        {
                            type: "doc",
                            id: "api/method/autoschedule",
                            className: "pro-version"
                        },
                        "api/method/batchupdate",
                        "api/method/bind",
                        "api/method/calculateduration",
                        "api/method/calculateenddate",
                        "api/method/calculatetasklevel",
                        "api/method/callevent",
                        "api/method/changelightboxtype",
                        "api/method/changelinkid",
                        "api/method/changetaskid",
                        "api/method/checkevent",
                        "api/method/clearall",
                        "api/method/clearredostack",
                        "api/method/clearundostack",
                        "api/method/close",
                        "api/method/collapse",
                        "api/method/columnindexbydate",
                        "api/method/confirm",
                        "api/method/copy",
                        "api/method/correcttaskworktime",
                        "api/method/createcalendar",
                        "api/method/createdataprocessor",
                        "api/method/createdatastore",
                        "api/method/createtask",
                        "api/method/dataprocessor",
                        "api/method/datefrompos",
                        "api/method/defined",
                        "api/method/deletecalendar",
                        "api/method/deletelink",
                        "api/method/deletemarker",
                        "api/method/deletetask",
                        "api/method/destructor",
                        {
                            type: "doc",
                            id:                         "api/method/detachallevents",
                            className: "deprecated"
                        },
                        "api/method/detachevent",
                        "api/method/eachparent",
                        "api/method/eachselectedtask",
                        "api/method/eachtask",
                        "api/method/event",
                        "api/method/eventremove",
                        "api/method/expand",
                        "api/method/exporttoexcel",
                        "api/method/exporttoical",
                        "api/method/exporttojson",
                        "api/method/exporttomsproject",
                        "api/method/exporttopdf",
                        "api/method/exporttopng",
                        "api/method/exporttoprimaverap6",
                        {
                            type: "doc",
                            id: "api/method/findcycles",
                            className: "pro-version"
                        },
                        "api/method/focus",
                        "api/method/getcalendar",
                        "api/method/getcalendars",
                        "api/method/getchildren",
                        "api/method/getclosestworktime",
                        "api/method/getcolumnindex",
                        "api/method/getconnectedgroup",
                        {
                            type: "doc",
                            id: "api/method/getconstraintlimitations",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/method/getconstrainttype",
                            className: "pro-version"
                        },
                        "api/method/getdatastore",
                        {
                            type: "doc",
                            id: "api/method/getfreeslack",
                            className: "pro-version"
                        },
                        "api/method/getglobaltaskindex",
                        "api/method/getgridcolumn",
                        "api/method/getgridcolumns",
                        "api/method/getlabel",
                        "api/method/getlastselectedtask",
                        "api/method/getlayoutview",
                        "api/method/getlightbox",
                        "api/method/getlightboxsection",
                        "api/method/getlightboxtype",
                        "api/method/getlightboxvalues",
                        "api/method/getlink",
                        "api/method/getlinkcount",
                        "api/method/getlinknode",
                        "api/method/getlinks",
                        "api/method/getmarker",
                        "api/method/getnext",
                        "api/method/getnextsibling",
                        "api/method/getparent",
                        "api/method/getprev",
                        "api/method/getprevsibling",
                        "api/method/getredostack",
                        {
                            type: "doc",
                            id: "api/method/getresourceassignments",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/method/getresourcecalendar",
                            className: "pro-version"
                        },
                        "api/method/getscale",
                        "api/method/getscrollstate",
                        "api/method/getselectedid",
                        "api/method/getselectedtasks",
                        "api/method/getshortcuthandler",
                        "api/method/getsiblings",
                        {
                            type: "doc",
                            id: "api/method/getslack",
                            className: "deprecated"
                        },
                        "api/method/getstate",
                        "api/method/getsubtaskdates",
                        "api/method/getsubtaskduration",
                        "api/method/gettask",
                        {
                            type: "doc",
                            id: "api/method/gettaskassignments",
                            className: "pro-version"
                        },
                        "api/method/gettaskbarheight",
                        {
                            type: "doc",
                            id: "api/method/gettaskbaselines",
                            className: "pro-version"
                        },
                        "api/method/gettaskby",
                        "api/method/gettaskbyindex",
                        "api/method/gettaskbytime",
                        "api/method/gettaskbywbscode",
                        "api/method/gettaskcalendar",
                        "api/method/gettaskcount",
                        "api/method/gettaskheight",
                        "api/method/gettaskindex",
                        "api/method/gettasknode",
                        "api/method/gettaskposition",
                        {
                            type: "doc",
                            id: "api/method/gettaskresources",
                            className: "pro-version"
                        },
                        "api/method/gettaskrownode",
                        "api/method/gettasktop",
                        "api/method/gettasktype",
                        {
                            type: "doc",
                            id: "api/method/gettotalslack",
                            className: "pro-version"
                        },
                        "api/method/getundostack",
                        "api/method/getvisibletaskcount",
                        "api/method/getwbscode",
                        "api/method/getworkhours",
                        {
                            type: "doc",
                            id: "api/method/groupby",
                            className: "pro-version"
                        },
                        "api/method/haschild",
                        "api/method/hidecover",
                        "api/method/hidelightbox",
                        "api/method/hidequickinfo",
                        "api/method/importfromexcel",
                        "api/method/importfrommsproject",
                        "api/method/importfromprimaverap6",
                        "api/method/init",
                        "api/method/ischildof",
                        {
                            type: "doc",
                            id: "api/method/iscircularlink",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/method/iscriticallink",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/method/iscriticaltask",
                            className: "pro-version"
                        },
                        "api/method/islinkallowed",
                        "api/method/islinkexists",
                        "api/method/isreadonly",
                        "api/method/isselectedtask",
                        {
                            type: "doc",
                            id: "api/method/issplittask",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/method/issummarytask",
                            className: "pro-version"
                        },
                        "api/method/istaskexists",
                        "api/method/istaskvisible",
                        "api/method/isunscheduledtask",
                        "api/method/isworktime",
                        "api/method/load",
                        "api/method/locate",
                        "api/method/mergecalendars",
                        "api/method/message",
                        "api/method/mixin",
                        "api/method/modalbox",
                        "api/method/movetask",
                        "api/method/open",
                        "api/method/parse",
                        "api/method/plugins",
                        "api/method/posfromdate",
                        "api/method/redo",
                        "api/method/refreshdata",
                        "api/method/refreshlink",
                        "api/method/refreshtask",
                        {
                            type: "doc",
                            id: "api/method/removelinklayer",
                            className: "pro-version"
                        },
                        "api/method/removeshortcut",
                        {
                            type: "doc",
                            id: "api/method/removetasklayer",
                            className: "pro-version"
                        },
                        "api/method/render",
                        "api/method/rendermarkers",
                        "api/method/resetlayout",
                        "api/method/resetlightbox",
                        {
                            type: "doc",
                            id: "api/method/resetprojectdates",
                            className: "pro-version"
                        },
                        "api/method/resetskin",
                        {
                            type: "doc",
                            id: "api/method/resizelightbox",
                            className: "deprecated"
                        },
                        "api/method/rounddate",
                        "api/method/roundtaskdates",
                        "api/method/scrolllayoutcell",
                        "api/method/scrollto",
                        "api/method/selecttask",
                        "api/method/serialize",
                        "api/method/serverlist",
                        "api/method/setparent",
                        "api/method/setsizes",
                        "api/method/setskin",
                        "api/method/setworktime",
                        "api/method/showcover",
                        "api/method/showdate",
                        "api/method/showlightbox",
                        "api/method/showquickinfo",
                        "api/method/showtask",
                        "api/method/silent",
                        "api/method/sort",
                        "api/method/toggletaskselection",
                        "api/method/uid",
                        "api/method/undo",
                        "api/method/unselecttask",
                        "api/method/unsetworktime",
                        "api/method/updatecollection",
                        "api/method/updatelink",
                        "api/method/updatemarker",
                        "api/method/updatetask",
                        {
                            type: "doc",
                            id: "api/method/updatetaskassignments",
                            className: "pro-version"
                        },
                    ],
                },
                // Gantt properties
                {
                    type: "category",
                    label: "Properties",
                    collapsible: true,
                    collapsed: true,
                    link: {
                        type: 'doc',
                        id: "api/overview/properties-overview"
                    },
                    items: [
                        {
                            type: "doc",
                            id: "api/config/auto_scheduling",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/auto_types",
                            className: "pro-version"
                        },
                        "api/config/autofit",
                        "api/config/autoscroll",
                        "api/config/autoscroll_speed",
                        "api/config/autosize",
                        "api/config/autosize_min_width",
                        "api/config/bar_height",
                        "api/config/bar_height_padding",
                        {
                            type: "doc",
                            id: "api/config/baselines",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/branch_loading",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/branch_loading_property",
                            className: "pro-version"
                        },
                        "api/config/buttons_left",
                        "api/config/buttons_right",
                        "api/config/calendar_property",
                        "api/config/cascade_delete",
                        "api/config/click_drag",
                        "api/config/columns",
                        {
                            type: "doc",
                            id: "api/config/constraint_types",
                            className: "pro-version"
                        },
                        "api/config/container_resize_method",
                        "api/config/container_resize_timeout",
                        "api/config/correct_work_time",
                        "api/config/csp",
                        "api/config/date_format",
                        "api/config/date_grid",
                        {
                            type: "doc",
                            id: "api/config/deadlines",
                            className: "pro-version"
                        },
                        "api/config/deepcopy_on_parse",
                        "api/config/details_on_create",
                        "api/config/details_on_dblclick",
                        "api/config/drag_lightbox",
                        "api/config/drag_links",
                        "api/config/drag_mode",
                        "api/config/drag_move",
                        "api/config/drag_multiple",
                        "api/config/drag_progress",
                        {
                            type: "doc",
                            id: "api/config/drag_project",
                            className: "pro-version"
                        },
                        "api/config/drag_resize",
                        "api/config/drag_timeline",
                        "api/config/duration_step",
                        "api/config/duration_unit",
                        {
                            type: "doc",
                            id: "api/config/dynamic_resource_calendars",
                            className: "pro-version"
                        },
                        "api/config/editable_property",
                        "api/config/editor_types",
                        "api/config/end_date",
                        "api/config/external_render",
                        "api/config/fit_tasks",
                        "api/config/grid_elastic_columns",
                        {
                            type: "doc",
                            id: "api/config/grid_resizer_column_attribute",
                            className: "pro-version"
                        },
                        "api/config/grid_width",
                        {
                            type: "doc",
                            id: "api/config/highlight_critical_path",
                            className: "pro-version"
                        },
                        "api/config/horizontal_scroll_key",
                        {
                            type: "doc",
                            id: "api/config/inherit_calendar",
                            className: "pro-version"
                        },
                        "api/config/inherit_scale_class",
                        "api/config/initial_scroll",
                        "api/config/inline_editors_date_processing",
                        "api/config/inline_editors_multiselect_open",
                        {
                            type: "doc",
                            id: "api/config/keep_grid_width",
                            className: "pro-version"
                        },
                        "api/config/keyboard_navigation",
                        "api/config/keyboard_navigation_cells",
                        {
                            type: "doc",
                            id: "api/config/layer_attribute",
                            className: "pro-version"
                        },
                        "api/config/layout",
                        "api/config/lightbox",
                        "api/config/link_arrow_size",
                        "api/config/link_attribute",
                        "api/config/link_line_width",
                        "api/config/link_radius",
                        "api/config/link_wrapper_width",
                        "api/config/links",
                        "api/config/min_column_width",
                        "api/config/min_duration",
                        "api/config/min_grid_column_width",
                        "api/config/min_task_grid_row_height",
                        "api/config/multiselect",
                        "api/config/multiselect_one_level",
                        "api/config/open_split_tasks",
                        "api/config/open_tree_initially",
                        "api/config/order_branch",
                        "api/config/order_branch_free",
                        "api/config/placeholder_task",
                        "api/config/preserve_scroll",
                        {
                            type: "doc",
                            id: "api/config/process_resource_assignments",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/project_end",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/project_start",
                            className: "pro-version"
                        },
                        "api/config/quick_info_detached",
                        "api/config/quickinfo_buttons",
                        "api/config/readonly",
                        "api/config/readonly_property",
                        "api/config/redo",
                        "api/config/reorder_grid_columns",
                        "api/config/resize_rows",
                        {
                            type: "doc",
                            id: "api/config/resource_assignment_store",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/resource_attribute",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/resource_calendars",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/resource_property",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/resource_render_empty_cells",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/resource_store",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/resources",
                            className: "pro-version"
                        },
                        "api/config/root_id",
                        "api/config/round_dnd_dates",
                        "api/config/row_height",
                        "api/config/rtl",
                        "api/config/scale_height",
                        "api/config/scale_offset_minimal",
                        "api/config/scales",
                        {
                            type: "doc",
                            id: "api/config/schedule_from_end",
                            className: "pro-version"
                        },
                        "api/config/scroll_on_click",
                        "api/config/scroll_size",
                        "api/config/select_task",
                        "api/config/server_utc",
                        "api/config/show_chart",
                        "api/config/show_empty_state",
                        "api/config/show_errors",
                        "api/config/show_grid",
                        "api/config/show_links",
                        "api/config/show_markers",
                        "api/config/show_progress",
                        "api/config/show_quick_info",
                        "api/config/show_task_cells",
                        "api/config/show_tasks_outside_timescale",
                        "api/config/show_unscheduled",
                        {
                            type: "doc",
                            id: "api/config/skip_off_time",
                            className: "pro-version"
                        },
                        "api/config/smart_rendering",
                        "api/config/smart_scales",
                        "api/config/sort",
                        "api/config/start_date",
                        "api/config/start_on_monday",
                        {
                            type: "doc",
                            id: "api/config/static_background",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/static_background_cells",
                            className: "pro-version"
                        },
                        "api/config/task_attribute",
                        "api/config/task_date",
                        "api/config/task_grid_row_resizer_attribute",
                        "api/config/task_scroll_offset",
                        "api/config/time_picker",
                        "api/config/time_step",
                        "api/config/timeline_placeholder",
                        "api/config/tooltip_hide_timeout",
                        "api/config/tooltip_offset_x",
                        "api/config/tooltip_offset_y",
                        "api/config/tooltip_timeout",
                        "api/config/touch",
                        "api/config/touch_drag",
                        "api/config/touch_feedback",
                        "api/config/touch_feedback_duration",
                        {
                            type: "doc",
                            id: "api/config/type_renderers",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/config/types",
                            className: "pro-version"
                        },
                        "api/config/undo",
                        "api/config/undo_actions",
                        "api/config/undo_steps",
                        "api/config/undo_types",
                        "api/config/wai_aria_attributes",
                        "api/config/wheel_scroll_sensitivity",
                        "api/config/wide_form",
                        "api/config/work_time",
                        {
                            type: "doc",
                            id: "api/config/auto_scheduling_compatibility",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/auto_scheduling_descendant_links",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/auto_scheduling_initial",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/auto_scheduling_move_projects",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/auto_scheduling_project_constraint",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/auto_scheduling_strict",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/auto_scheduling_use_progress",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/date_scale",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/grid_resize",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/grid_resizer_attribute",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/lightbox_additional_height",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/prevent_default_scroll",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/scale_unit",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/step",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/task_height",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/config/xml_date",
                            className: "deprecated"
                        },
                    ]
                },
                // Gantt events
                {
                    type: "category",
                    label: "Events",
                    collapsible: true,
                    collapsed: true,
                    link: {
                        type: 'doc',
                        id: "api/overview/events-overview"
                    },
                    items: [
                        {
                            type: "doc",
                            id: "api/event/onafterautoschedule",
                            className: "pro-version"
                        },
                        "api/event/onafterbatchupdate",
                        {
                            type: "doc",
                            id: "api/event/onafterbranchloading",
                            className: "pro-version"
                        },
                        "api/event/onafterlightbox",
                        "api/event/onafterlinkadd",
                        "api/event/onafterlinkdelete",
                        "api/event/onafterlinkupdate",
                        "api/event/onafterquickinfo",
                        "api/event/onafterredo",
                        "api/event/onafterrowresize",
                        "api/event/onaftersort",
                        "api/event/onaftertaskadd",
                        {
                            type: "doc",
                            id: "api/event/onaftertaskautoschedule",
                            className: "pro-version"
                        },
                        "api/event/onaftertaskdelete",
                        "api/event/onaftertaskdrag",
                        "api/event/onaftertaskmove",
                        "api/event/onaftertaskupdate",
                        "api/event/onafterundo",
                        "api/event/onajaxerror",
                        {
                            type: "doc",
                            id: "api/event/onautoschedulecircularlink",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/event/onbeforeautoschedule",
                            className: "pro-version"
                        },
                        "api/event/onbeforebatchupdate",
                        {
                            type: "doc",
                            id: "api/event/onbeforebranchloading",
                            className: "pro-version"
                        },
                        "api/event/onbeforecollapse",
                        "api/event/onbeforedatarender",
                        "api/event/onbeforeexpand",
                        "api/event/onbeforeganttready",
                        "api/event/onbeforeganttrender",
                        "api/event/onbeforelightbox",
                        "api/event/onbeforelinkadd",
                        "api/event/onbeforelinkdelete",
                        "api/event/onbeforelinkdisplay",
                        "api/event/onbeforelinkupdate",
                        "api/event/onbeforemultiselect",
                        "api/event/onbeforeparse",
                        "api/event/onbeforeredo",
                        "api/event/onbeforeredostack",
                        "api/event/onbeforerolluptaskdisplay",
                        "api/event/onbeforerowdragend",
                        "api/event/onbeforerowdragmove",
                        "api/event/onbeforerowresize",
                        "api/event/onbeforerowresizeend",
                        "api/event/onbeforesplittaskdisplay",
                        "api/event/onbeforetaskadd",
                        {
                            type: "doc",
                            id: "api/event/onbeforetaskautoschedule",
                            className: "pro-version"
                        },
                        "api/event/onbeforetaskchanged",
                        "api/event/onbeforetaskdelete",
                        "api/event/onbeforetaskdisplay",
                        "api/event/onbeforetaskdrag",
                        "api/event/onbeforetaskmove",
                        "api/event/onbeforetaskmultiselect",
                        "api/event/onbeforetaskselected",
                        "api/event/onbeforetaskupdate",
                        "api/event/onbeforeundo",
                        "api/event/onbeforeundostack",
                        {
                            type: "doc",
                            id: "api/event/oncircularlinkerror",
                            className: "pro-version"
                        },
                        "api/event/onclear",
                        "api/event/oncollapse",
                        {
                            type: "doc",
                            id: "api/event/oncolumnresize",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/event/oncolumnresizeend",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/event/oncolumnresizestart",
                            className: "pro-version"
                        },
                        "api/event/oncontextmenu",
                        "api/event/ondataprocessorready",
                        "api/event/ondatarender",
                        "api/event/ondestroy",
                        "api/event/onemptyclick",
                        "api/event/onerror",
                        "api/event/onexpand",
                        "api/event/onganttlayoutready",
                        "api/event/onganttready",
                        "api/event/onganttrender",
                        "api/event/onganttscroll",
                        "api/event/ongridheaderclick",
                        {
                            type: "doc",
                            id: "api/event/ongridresize",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/event/ongridresizeend",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/event/ongridresizestart",
                            className: "pro-version"
                        },
                        "api/event/onlightbox",
                        "api/event/onlightboxbutton",
                        "api/event/onlightboxcancel",
                        "api/event/onlightboxchange",
                        "api/event/onlightboxdelete",
                        "api/event/onlightboxsave",
                        "api/event/onlinkclick",
                        "api/event/onlinkcreated",
                        "api/event/onlinkdblclick",
                        "api/event/onlinkidchange",
                        "api/event/onlinkvalidation",
                        "api/event/onloadend",
                        "api/event/onloadstart",
                        "api/event/onmousemove",
                        "api/event/onmultiselect",
                        "api/event/onoptionsload",
                        "api/event/onparse",
                        "api/event/onquickinfo",
                        "api/event/onrowdragend",
                        "api/event/onrowdragstart",
                        "api/event/onrowresize",
                        "api/event/onscaleadjusted",
                        "api/event/onscaleclick",
                        "api/event/ontaskclick",
                        "api/event/ontaskclosed",
                        "api/event/ontaskcreated",
                        "api/event/ontaskdblclick",
                        "api/event/ontaskdrag",
                        "api/event/ontaskidchange",
                        "api/event/ontaskloading",
                        "api/event/ontaskmultiselect",
                        "api/event/ontaskopened",
                        "api/event/ontaskrowclick",
                        "api/event/ontaskselected",
                        "api/event/ontaskunselected",
                        "api/event/ontemplatesready",
                    ]
                },
                // Gantt templates
                {
                    type: "category",
                    label: "Templates",
                    collapsible: true,
                    collapsed: true,
                    link: {
                        type: 'doc',
                        id: "api/overview/templates-overview"
                    },
                    items: [
                        {
                            type: "doc",
                            id: "api/template/baseline_text",
                            className: "pro-version"
                        },
                        "api/template/date_grid",
                        "api/template/drag_link_class",
                        "api/template/drag_link",
                        "api/template/format_date",
                        "api/template/grid_blank",
                        "api/template/grid_date_format",
                        "api/template/grid_file",
                        "api/template/grid_folder",
                        "api/template/grid_header_class",
                        "api/template/grid_indent",
                        "api/template/grid_open",
                        "api/template/grid_row_class",
                        {
                            type: "doc",
                            id: "api/template/histogram_cell_allocated",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/template/histogram_cell_capacity",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/template/histogram_cell_class",
                            className: "pro-version"
                        },
                       {
                            type: "doc",
                            id: "api/template/histogram_cell_label",
                            className: "pro-version"
                        },
                        "api/template/link_class",
                        "api/template/link_description",
                        "api/template/lightbox_header",
                        "api/template/marker_class",
                        "api/template/parse_date",
                        "api/template/progress_text",
                        "api/template/quick_info_class",
                        "api/template/quick_info_content",
                        "api/template/quick_info_date",
                        "api/template/quick_info_title",
                        {
                            type: "doc",
                            id: "api/template/resource_cell_class",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "api/template/resource_cell_value",
                            className: "pro-version"
                        },
                        "api/template/leftside_text",
                        "api/template/rightside_text",
                        "api/template/scale_cell_class",
                        "api/template/scale_row_class",
                        "api/template/task_class",
                        "api/template/task_date",
                        "api/template/task_end_date",
                        "api/template/task_row_class",
                        "api/template/task_text",
                        "api/template/task_time",
                        "api/template/task_unscheduled_time",
                        "api/template/timeline_cell_class",
                        "api/template/timeline_cell_content",
                        "api/template/time_picker",
                        "api/template/tooltip_date_format",
                        "api/template/tooltip_text",
                        {
                            type: "doc",
                            id: "api/template/xml_date",
                            className: "deprecated"
                        },
                        {
                            type: "doc",
                            id: "api/template/xml_format",
                            className: "deprecated"
                        },
                    ]
                },
                // Gantt others
                {
                    type: "category",
                    label: "Others",
                    collapsible: true,
                    collapsed: true,
                    link: {
                        type: 'doc',
                        id: "api/overview/others-overview"
                    },
                    items: [
                        "api/other/click",
                        "api/other/gantt",
                        "api/other/ajax",
                        "api/other/calendar",
                        "api/other/config",
                        "api/other/constants",
                        "api/other/dataprocessor",
                        "api/other/datastore",
                        "api/other/date",
                        "api/other/env",
                        {
                            type: "category",
                            label: "ext",
                            collapsible: true,
                            collapsed: true,
                            link: {
                                type: 'doc',
                                id: "api/other/ext",
                            },
                            items: [
                                "guides/click-drag-ext",
                                "guides/empty-state-element-ext",
                                {
                                    type: "doc",
                                    id: "guides/formatters-ext",
                                    className: "pro-version"
                                },
                                "guides/fullscreen-ext",
                                "guides/inline-editors-ext",
                                "guides/keynav-ext",
                                {
                                    type: "doc",
                                    id: "guides/overlay-ext",
                                    className: "pro-version"
                                },
                                "guides/quickinfo-ext",
                                "guides/tooltips-ext",
                                "guides/undo-ext",
                                "guides/zoom",
                            ]
                        },
                        "api/other/form_blocks",
                        "api/other/i18n",
                        "api/other/ignore_time",
                        "api/other/json",
                        "api/other/keys",
                        "api/other/license",
                        "api/other/locale",
                        "api/other/oldxml",
                        "api/other/skin",
                        "api/other/skins",
                        "api/other/templates",
                        "api/other/treedatastore",
                        "api/other/utils",
                        "api/other/version",
                        "api/other/xml",
                    ]
                },
            ]
        },
        // Guides
        {
            type: "category",
            label: "Guides",
            collapsible: true,
            collapsed: true,
            link: {
                type: 'doc',
                id: "guides/guides"
            },
            items: [
                {
                    type: "category",
                    label: "Configuring Gantt Chart",
                    link: {
                        type: 'generated-index',
                        title: 'Configuring Gantt Chart',
                        keywords: ['Configuring Gantt Chart'],
                        image: '/img/docusaurus.png',
                    },
                    items: [
                        "guides/common-configuration",
                        "guides/layout-config",
                        {
                            type: "doc",
                            id: "guides/resource-management",
                            className: "pro-version"
                        },
                        "guides/handling-events",
                        {
                            type: "doc",
                            id: "guides/multiple-gantts",
                            className: "pro-version"
                        },
                        "guides/gantt-instance",
                        
                    ]
                },
                {
                    type: "category",
                    label: "Loading and Saving Tasks",
                    link: {
                        type: 'generated-index',
                        title: 'Loading and Saving Tasks',
                        keywords: ['Loading and Saving Tasks'],
                        image: '/img/docusaurus.png',
                    },
                    items: [
                        "guides/loading",
                        {
                            type: "doc",
                            id: "guides/dynamic-loading",
                            className: "pro-version"
                        },
                        "guides/supported-data-formats",
                        "guides/server-side",
                        "guides/performance",
                        "guides/troubleshooting",
                        "guides/app-security",
                    ]
                },
                {
                    type: "category",
                    label: "Exporting and Importing Data",
                    link: {
                        type: 'generated-index',
                        title: 'Exporting and Importing Data',
                        keywords: ['Exporting and Importing Data'],
                        image: '/img/docusaurus.png',
                    },
                    items: [
                        "guides/export",
                        "guides/excel",
                        "guides/export-msproject",
                        "guides/export-primavera",
                        "guides/serialization",
                        "guides/export-nodejs",
                        {
                            type: "category",
                            label: "Export Modules",
                            link: {
                                type: 'generated-index',
                                title: 'Export Modules',
                                keywords: ['Export Modules'],
                                image: '/img/docusaurus.png',
                            },
                            items: [
                                "guides/export-requirements",
                                "guides/pdf-export-module-whatsnew",
                                "guides/msp-export-module-whatsnew",
                                "guides/pdf-export-module",
                                "guides/msp-export-module",
                                "guides/tags",
                            ]
                        },
                    ]
                },
                {
                    type: "category",
                    label: "Configuring Grid",
                    link: {
                        type: 'generated-index',
                        title: 'Configuring Grid',
                        keywords: ['Configuring Grid'],
                        image: '/img/docusaurus.png',
                    },
                    items: [
                        "guides/specifying-columns",
                        "guides/resizing-rows",
                        "guides/tree-column",
                        "guides/sorting",
                        {
                            type: "doc",
                            id: "guides/grouping",
                            className: "pro-version"
                        },
                        "guides/filtering",
                        "guides/inline-editing",
                    ]
                },
                {
                    type: "category",
                    label: "Configuring Scales",
                    link: {
                        type: 'generated-index',
                        title: 'Configuring Scales',
                        keywords: ['Configuring Scales'],
                        image: '/img/docusaurus.png',
                    },
                    items: [
                        "guides/configuring-time-scale",
                        "guides/zooming",
                        "guides/highlighting-time-slots",
                        "guides/dynamic-scale",
                        {
                            type: "doc",
                            id:  "guides/custom-scale",
                            className: "pro-version"
                        },
                        "guides/markers",
                        "guides/rtl-mode",
                    ]
                },
                {
                    type: "category",
                    label: "Configuring Edit Form",
                    link: {
                        type: 'generated-index',
                        title: 'Configuring Edit Form',
                        keywords: ['Configuring Edit Form'],
                        image: '/img/docusaurus.png',
                    },
                    items: [
                        {
                            type: "category",
                            label: "Configuring Lightbox Elements",
                            link: {
                                type: 'doc',
                                id: "guides/default-edit-form"
                            },
                            items: [
                                "guides/textarea",
                                "guides/duration",
                                "guides/time",
                                "guides/select",
                                "guides/typeselect",
                                "guides/parent",
                                "guides/template",
                                "guides/checkbox",
                                "guides/radio",
                                "guides/resources",
                                "guides/resource-assignments",
                                "guides/constraint",
                                "guides/baseline",
                            ]
                        },
                        "guides/lightbox-manipulations",
                        "guides/custom-editor",
                        "guides/custom-edit-form",
                        "guides/custom-button",
                    ]
                },
                {
                    type: "category",
                    label: "Configuring Tasks",
                    link: {
                        type: 'generated-index',
                        title: 'Configuring Tasks',
                        keywords: ['Configuring Tasks'],
                        image: '/img/docusaurus.png',
                    },
                    items: [
                        {
                            type: "doc",
                            id: "guides/task-types",
                            className: "pro-version"
                        },
                        "guides/task-properties",
                        "guides/task-object-operations",
                        "guides/task-tree-operations",
                        "guides/crud-task",
                        "guides/unscheduled-tasks",
                        {
                            type: "doc",
                            id: "guides/split-tasks",
                            className: "pro-version"
                        },
                        "guides/multiselection",
                        "guides/working-time",
                        {
                            type: "doc",
                            id: "guides/critical-path",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "guides/inbuilt-baselines",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "guides/baselines",
                            className: "pro-version"
                        },
                        {
                            type: "doc",
                            id: "guides/milestones",
                            className: "pro-version"
                        },
                        "guides/tooltips",
                        "guides/text-block-for-task",
                        "guides/readonly-mode",
                        "guides/validation",
                        "guides/dnd",
                        "guides/advanced-dnd",
                        "guides/custom-projects-dates",
                        "guides/dragging-dependent-tasks",
                    ]
                },
                {
                    type: "category",
                    label: "Configuring Dependency Links",
                    link: {
                        type: 'generated-index',
                        title: 'Configuring Dependency Links',
                        keywords: ['Configuring Dependency Links'],
                        image: '/img/docusaurus.png',
                    },
                    items: [
                        "guides/link-properties",
                        "guides/link-object-operations",
                        "guides/crud-dependency",
                        {
                            type: "doc",
                            id: "guides/auto-scheduling",
                            className: "pro-version"
                        },
                    ]
                },
                {
                    type: "category",
                    label: "Styling",
                    link: {
                        type: 'generated-index',
                        title: 'Styling',
                        keywords: ['Styling'],
                        image: '/img/docusaurus.png',
                    },
                    items: [
                        "guides/css-overview",
                        "guides/skins",
                        "guides/custom-skins",
                        {
                            type: "category",
                            label: "Templates of the Gantt Chart",
                             link: {
                                type: 'doc',
                                id: "guides/templates",
                            },
                            items: [
                                "guides/table-templates",
                                "guides/timeline-templates",
                                "guides/dependency-templates",
                                "guides/lightbox-templates",
                                "guides/touch-templates",
                                "guides/tooltip-templates",
                                "guides/conversion-templates",
                            ]
                        },
                        "guides/colouring-tasks",
                        "guides/colouring-lines",
                        "guides/styling-guide",
                    ]
                },
                {
                    type: "category",
                    label: "Working with Dates",
                    items: [
                        "guides/date-format",
                        "guides/date-operations",
                    ]
                },
                {
                    type: "category",
                    label: "Common Features",
                    link: {
                        type: 'generated-index',
                        title: 'Common Features',
                        keywords: ['Common Features'],
                        image: '/img/docusaurus.png',
                    },
                    items: [
                        "guides/localization",
                        "guides/fullscreen-mode",
                        "guides/empty-state-screen",
                        "guides/undo-redo",
                        "guides/message-boxes",
                        "guides/quick-info",
                        "guides/accessibility",
                        "guides/keyboard-navigation",
                        "guides/content-security-policy",
                        "guides/jquery-integration",
                        "guides/multiuser-live-updates",
                    ]
                },
                "guides/extensions-list",
                "guides/overview"
            ]
        },


        // editions
        {
            type: "doc",
            id: "guides/editions-comparison"
        },



        // how-to
        {
            type: 'doc',
            id: "guides/how-to"
        },
        {
            type: 'doc',
            id: "guides/video-guides"
        },
        {
            type: 'doc',
            id: "guides/copyright"
        },
        {
            type: 'doc',
            id: "faq"
        }
    ]
};
