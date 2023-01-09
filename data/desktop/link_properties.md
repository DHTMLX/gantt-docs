Link Properties 
=======================================

Required properties
-------------------

<table>
	<tbody>
        <tr>
            <th>Name</th><th>Type</th><th>Description</th>
        </tr>
        <tr>
			<td><b>id</b></td>
            <td><i>string | number</i></td>
			<td>the link id</td>
		</tr>
        <tr>
			<td><b>source</b></td>
            <td><i>number</i></td>
			<td>the id of a task that the dependency will start from</td>
		</tr>
        <tr>
			<td><b>target</b></td>
            <td><i>number</i></td>
			<td>the id of a task that the dependency will end with.</td>
		</tr>
        <tr>
			<td><b>type</b></td>
            <td><i>string</i></td>
			<td>the dependency type. The available values are stored in the api/gantt_links_config.md object. By default, they are:</li>
            <ul>
				<li><b>"0"</b> -  'finish_to_start'.</li>
				<li><b>"1"</b> -  'start_to_start'.</li>
				<li><b>"2"</b> -  'finish_to_finish'.</li>
                <li><b>"3"</b> -  'start_to_finish'.</li>
			</ul>
            </td>
		</tr>
    </tbody>
</table>

If you want to store the dependency types in some way other than the default values('0','1','2'), you may change values of the related properties of the api/gantt_links_config.md object. For example:

~~~js
gantt.config.links.start_to_start = "start2start";
~~~

Note, these values affect only the way the dependency type is stored, not the behaviour of visualization. 

Optional properties
------------------

<table>
    <tbody>
        <tr>
            <th>Name</th><th>Type</th><th>Description</th>
        </tr>
        <tr>
			<td><b>lag</b></td>
            <td><i>number</i></td>
			<td><a href="desktop/auto_scheduling.md#settinglagandleadtimesbetweentasks">the task's lag</a>
        </tr>
        <tr>
			<td><b>readonly</b></td>
            <td><i>boolean</i></td>
			<td>can mark link as <a href="desktop/readonly_mode.md">readonly</a>
        </tr>
        <tr>
			<td><b>editable</b></td>
            <td><i>boolean</i></td>
			<td>can mark link as <a href="desktop/readonly_mode.md">editable</a>
        </tr>
    </tbody>
</table>

## Example

~~~js
var data = {
    tasks: [
        {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
     	{id:2, text:"Task #1", start_date:"02-04-2020", duration:8, parent:1},
     	{id:3, text:"Task #2", start_date:"11-04-2020", duration:8, parent:1}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:2, target:3, type:"0"}
    ]
};
~~~