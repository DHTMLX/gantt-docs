external_render
=============


@short: renders an external component into the DOM
	

@type: object
@example:
import ReactDOM from 'react-dom';
import React from 'react';

gantt.config.columns = [
	{name:"text",       label:"Task name",  tree:true, width:"*"},
	{name:"start_date", label:"Start time", align: "center"},
	{name:"duration",   label:"Duration",   align: "center"},
	{ 
		name:"external", label:"Element 1", align: "center",
		onrender: (item, node) => {
			return <DemoButton
					text="Edit 1"
					onClick={() => alert("Element as React Component")}
					/>
		}
	}
];

gantt.config.external_render = { 
	// checks the element is a React element
	isElement: (element) => {
		return React.isValidElement(element);
	},
	// renders the React element into the DOM
	renderElement: (element, container) => {
		ReactDOM.render(element, container);
	}
};

@template:	api_config
@descr:

@changelog: added in v7.1
