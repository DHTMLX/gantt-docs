export type MonthLabelList = [string, string, string, string, string, string, string, string, string, string, string, string];
export type WeekDayLabelList = [string, string, string, string, string, string, string];

export interface GanttLocaleDate {
	month_full: MonthLabelList;
	month_short: MonthLabelList;
	day_full: WeekDayLabelList;
	day_short: WeekDayLabelList;
}

export interface GanttLocaleLabels {
	new_task: string;
	icon_save: string;
	icon_cancel: string;
	icon_details: string;
	icon_edit: string;
	icon_delete: string;
	confirm_closing: string;
	confirm_deleting: string;
	section_description: string;
	section_time: string;
	section_type: string;

	/* grid columns */
	column_wbs: string;
	column_text: string;
	column_start_date: string;
	column_duration: string;
	column_add: string;

	/* link confirmation */
	link: string;
	confirm_link_deleting: string;
	link_start: string;
	link_end: string;

	type_task: string;
	type_project: string;
	type_milestone: string;

	minutes: string;
	hours: string;
	days: string;
	weeks: string;
	months: string;
	years: string;

	/* message popup */
	message_ok: string;
	message_cancel: string;

	/* constraints */
	section_constraint: string;
	constraint_type: string;
	constraint_date: string;
	asap: string;
	alap: string;
	snet: string;
	snlt: string;
	fnet: string;
	fnlt: string;
	mso: string;
	mfo: string;

	/* resource control */
	resources_filter_placeholder: string;
	resources_filter_label: string;

	[customLabel: string]: any;
}

export interface GanttLocale {
	date: GanttLocaleDate;
	labels: GanttLocaleLabels;
}

export interface GanttPlugins {
	auto_scheduling?: boolean;
	click_drag?: boolean;
	critical_path?: boolean;
	drag_timeline?: boolean;
	fullscreen?: boolean;
	keyboard_navigation?: boolean;
	quick_info?: boolean;
	tooltip?: boolean;
	undo?: boolean;
	grouping?: boolean;
	marker?: boolean;
	multiselect?: boolean;
	overlay?: boolean;
}

export interface GanttInitializationConfig {
	container?: string|HTMLElement;
	config?: any;
	templates?: any;
	events?: any;
	data?: any;
	plugins?: GanttPlugins;
	locale?: any;
}

export interface GanttInternationalization {
	setLocale(locale: any): void;
	getLocale(language: string): GanttLocale;
	addLocale(language: string, locale: GanttLocale): void;
}