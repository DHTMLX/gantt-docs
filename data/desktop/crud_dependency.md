Adding/Updating/Deleting Links
=========================================
In this chapter you'll learn how to do basic operations with dependency links: to create or delete a link, 
to dynamically update a link's property. 


Adding a new link
----------------------------
To add a new link to the Gantt chart, use the api/gantt_addlink.md method:

~~~js
var linkId = gantt.addLink({
	id:1,
    source:1,
    target:2,
    type:"1"
});
~~~

Updating a link's property
------------------------------
To dynamically update a property of a link object, use the api/gantt_refreshlink.md method:

~~~js
var links= gantt.config.links;
var link = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}

if (link.type == links.finish_to_start){/*!*/ 
	link.type = links.finish_to_finish;/*!*/ 
    gantt.refreshLink(1); /*!*/ 
}/*!*/ 
~~~

Note, to update all links in the Gantt chart at once, use the api/gantt_refreshdata.md method:

~~~js
var links= gantt.config.links;

var link1 = gantt.getLink(1);//->{id:1,source:1, target:2, type:"1"}
var link2 = gantt.getLink(2);//->{id:2,source:4, target:5, type:"0"}

if (link1.type == links.finish_to_finish){/*!*/ 
	gantt.refreshData()/*!*/ 
}/*!*/ 
~~~

{{note
Note, all types of links' dependencies are stored in the api/gantt_links_config.md object
}}

Deleting a link
-------------------------------
To delete a link, use the api/gantt_deletelink.md method:

~~~js
gantt.deleteLink(linkId);
~~~

Removing all links from the Gantt chart
-------------------------------------------
To clear the Gantt chart from all tasks and links, call the api/gantt_clearall.md method:


~~~js
gantt.clearAll();
~~~

Editing link values from UI
------------------------------

There is no built-in UI for the user to edit lag or any other properties of the link. So if you need some UI, you have to implement it manually.

A common approach presupposes following the steps below:

- capture the api/gantt_onlinkdblclick_event.md event; 
- cancel the default handler; 
- display a popup from the event handler.

On the last step you can either use [built-in popups ](desktop/message_boxes.md) or implement some custom solution.

Here is a sample code of the edit-lag popup implementation:

~~~js
(function(){
	var modal;
	var editLinkId;

	function endPopup(){
		modal = null;
		editLinkId = null;
	}
	function cancelEditLink(){
		endPopup();
	}

	function deleteLink(){
		gantt.deleteLink(editLinkId);
		endPopup();
	}

	function saveLink(){
		var link = gantt.getLink(editLinkId);

		var lagValue = modal.querySelector(".lag-input").value;
		if(!isNaN(parseInt(lagValue, 10))){
			link.lag = parseInt(lagValue, 10);
		}

		gantt.updateLink(link.id);
		if(gantt.autoSchedule){
			gantt.autoSchedule(link.source);
		}
		endPopup();
	}
	gantt.attachEvent("onLinkDblClick", function(id,e){
		editLinkId = id;
		var link = gantt.getLink(id);
		var linkTitle = gantt.getTask(link.source).text + " -> " + 
        	gantt.getTask(link.target).text;

		modal = gantt.modalbox({
			title: linkTitle,
			text: "<div>" +
					"<label>Lag <input type='number' class='lag-input' /></label>" +
				"</div>",
			buttons: [
				{label:"Save", value:"save"},
				{label:"Cancel", value:"cancel"},
				{label:"Delete", value:"delete"}
			],
			width: "500px",
			callback: function(result){
				switch(result){
					case "save":
						saveLink();
						break;
					case "cancel":
						cancelEditLink();
						break;

					case "delete":
						deleteLink();
						break;
				}
			}
		});

		modal.querySelector(".lag-input").value = link.lag || 0;

		return false;
	});
})();
~~~

{{editor	https://snippet.dhtmlx.com/5/7c812e5bd		 Edit-lag Popup}}
