Application Security
=======================

DHTMLX Gantt is a client-side JavaScript library designed for smooth integration of the Gantt functionality into various web apps.
Therefore, we do not limit the functional capabilities of our Gantt, which could enhance the security of the app, but decrease the available possibilities at the same time. 
Thus, you can customize most of the Gantt features according to your project requirements.

However, you must bear in mind that DHTMLX Gantt doesn't provide any means for protecting your app from various threats such as SQL injections or XSS and CSRF 
attacks on its own. So it is up to you to ensure the safety of your project by providing the necessary configuration settings.
In this article you will find some relevant information and recommendations on HTML sanitization.

## Basic security steps

While cybersecurity is a complex discipline, and can't really be covered with a single step of instructions, 
we recommend following the practicle steps that will cover the basics and help mitigating most frequent threats.

**1\. Use Content Security Policy (CSP) in your application**

Adding a CSP header as simple as the following one will prevent XSS code from being executed in your application:

~~~
Content-Security-Policy: script-src 'self'
~~~

Your app might require a more complex policy, but disabling the inline script execution would prevent a large number of XSS and CSRF attacks.

**2\. Sanitize user input on the backend before saving it to the database**

When you inserting a new record, instead of saving values as is:

~~~
db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
	+ " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent])
~~~

You may want to ensure they are in the expected format and remove a potentially malicious content.
If you use Node.js this can be done with any of numerous available libraries, for example, [DOMPurify](https://www.npmjs.com/package/dompurify):

~~~
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

...

db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
	+ " VALUES (?,?,?,?,?)",
    [task.text, task.start_date, task.duration, task.progress, task.parent]
    	.map((input) => DOMPurify.sanitize(input))
~~~

**3\. Escape HTML entities before rendering data**

If you don't want displayable values to contain HTML markup that will be executed during rendering, make sure to escape HTML characters that
users might have entered before feeding data into Gantt. Here is an example of using the [validator](https://www.npmjs.com/package/validator) library:

~~~
const validator = require('validator');
...

// GET /data

Promise.all([
  db.query("SELECT * FROM gantt_tasks"),
  db.query("SELECT * FROM gantt_links")
]).then(results => {
    let tasks = results[0],
        links = results[1];
 
    tasks.forEach((task) => {
        Object.entries(task).forEach(([key, value]) => {
            if(typeof value === "string") {
                task[key] = validator.escape(value); //#!
            }
        });
        task.open = true;
        task.start_date = task.start_date.format("YYYY-MM-DD hh:mm:ss");
    });

    links.forEach((link) => {
        Object.entries(link).forEach(([key, value]) => {
            if(typeof value === "string") {
                link[key] = validator.escape(value); //#!
            }
        });
    });
    
 
    res.send({
        tasks,
        links 
   });
~~~

**4\. If you work with SQL database, avoid creating SQL queries by concatenating string values. Use parametrized queries, ORM or Query Builders instead**

This item concerns SQL injection types of attacks. As a rule, you should never use an unescaped or unvalidated user input in your SQL queries. If
you found yourself doing it, consider rewriting your code using parametrized queries or use escape functions supported by the SQL provider that you use.

**5\. Last but not least: consult with a cybersecurity expert and follow the security policies accepted by your company**

The security work is never fully complete, but by implementing these steps, following your company policies and having your work reviewed by a security
specialist, you will avoid the majority of threats that can find you in the web.

Now, when basics are covered, let's proceed to the things specific to Gantt.

## Vulnerable Gantt areas on the client side

First of all, let us highlight three points when integrating complex functionalities like Gantt on the client side:

- DHTMLX Gantt is a client-side library, so all the data loaded from the server gets into Gantt in its original form.
Since the data set is saved and stored on the server side, the main threat to your app comes from there. But protecting the backend goes beyond DHTMLX Gantt
- Cybercriminals may trick end-users into executing some malicious code using DevTools (self-XSS attacks), thereby bypassing any security mechanisms. Any code
pasted into the text of the task will work the same as if the DevTools are used
- If an attacker gets access to the Gantt instance object, any protective measures will be ineffective. 
In this case attackers can change the Gantt configuration in the desired way and fully control it

Now we get to the list of vulnerable areas of DHTMLX Gantt, where you can expect potential security issues:

- the data entered and saved by end-users
- the displayed Gantt data (textual content, various visual elements)
- [custom HTML elements](desktop/export.md#exportinghtmlelements) that somehow interact with Gantt data
- the access to the Gantt object

Let's proceed to practical consideration of these potential issues.

## Isolating access to Gantt 

When talking about possible measures for protecting Gantt, the first thing that you need to do is to isolate Gantt from being illegally accessed
via other cracked components or by misguided users (self-XSS attack).

{{note If an attacker gains access to the app's configuration files (including the Gantt configuration file),
any protective measures against XSS attacks (if taken) can be ineffective, so we won't consider this scenario. 
}}

When the application is fully loaded and the Gantt instance object is accessed by attackers, 
they can change literally everything in Gantt and redefine all functions. Therefore, you should know how to isolate Gantt in your project. 

To do this, you need to create a separate Gantt instance in a function. The goal here is to make code that runs within the function inaccessible outside of it. 

What is more, by default Gantt creates a new instance in the *gantt* object. It is important to add a new variable inside the function 
using either the *const* or the *let* keyword to make it inaccessible outside the function and safely put the Gantt instance inside this variable. 

~~~js
function addGantt(){
  const gantt = Gantt.getGanttInstance();
}
addGantt()
~~~

You can also use a different name for a Gantt instance to avoid any confusion with the gantt object:

~~~js
function addGantt(){
  const protectedGantt = Gantt.getGanttInstance();
}
addGantt()
~~~

After ensuring that Gantt is protected from an unwanted access, you should pay attention to entering and displaying data in the Gantt chart.

## Entering data in the Gantt 

This is a sensitive spot that can be used by cybercriminals to compromise the Gantt security in your app.

Data entry areas are considered to be the main targets for XSS attacks. In our Gantt component, it is possible to change data via:

- lightbox
- inline editors
- modalbox with custom elements
- third-party libraries
- resource assignments in the resource load timeline
- additional layers (if they have custom elements in which you can enter data)
- any custom solutions that use the Gantt API and require data entry (e.g. a toolbar or a custom form for editing tasks)

The task object has [many different parameters](desktop/task_properties.md) that are used depending on the activated functions.
The more parameters are editable, the more parameters should be sanitized on entering data.

### Considering an example

We have prepared an example to demonstrate various steps you can take to enhance protection against XSS attacks via HTML sanitization when using DHTMLX Gantt. 

{{editor	https://snippet.dhtmlx.com/cdy9p0yl		Example to prevent XSS attacks (security, csp)}}

In our example you can edit the name of the task, change its date and duration, modify resource assignments, and add text notes. 
You can change the start date and duration only via the lightbox and inline editors. In inline editors the **date** and **number** types are explicitly specified.
In the lightbox you can specify only the duration, while the date must be selected from the drop-down list.

In both cases it is impossible to insert text containing malicious code into these UI elements. 
If you try to change the type of elements through the DOM element inspector, you will get invalid values for the date or duration.
It will cause an error and Gantt won't be able to continue working until the page is reloaded. At the same time, the data won't be sent to the server since it won't be redrawn.

However, we use the **string** value type for task names and it can be a soft spot for XSS attacks.
Therefore, you need to sanitize the value input. In our example, you can see only one variant of an XSS attack and one way to prevent it. 

![](desktop/preventing_xss_attack.png)

When it comes to a real project, you need to add all possible data sanitization options. 
In our case, we simply replace the "\<" and "\>" symbols with the corresponding HTML entities - **`&lt;`** and **`&gt;`**.
Thus, we exclude the possibility of displaying HTML elements inside the task text.

The above described replacement of symbols is implemented in the **sanitizeText()** function as in:

~~~js
function sanitizeText(text){
	// uncomment to test XSS
    // return text

    // prevent XSS by disabling HTML elements
    return text.split("<").join("&lt;").split(">").join("&gt;");
}
~~~

This function is called in event handlers: in the **onLightboxSave** for the lightbox and in the **onBeforeSave** for inline editors.

In our sample, you can also add text notes to a task using either a custom inline editor or a custom lightbox section.
In both cases sanitization can be implemented inside the functions of these custom objects
(before the values are rendered and the changes are taken from the DOM elements):

~~~js
// for an inline editor:
set_value: function(value, id, column, node){
	node.firstChild.value = sanitizeText(value || "");
},
get_value: function(id, column, node){
	return sanitizeText(node.firstChild.value);
},

// for the lightbox:
set_value: function(node, value, task){
	node.value = sanitizeText(value || "");
},
get_value: function(node, task){
    return sanitizeText(node.value);
},
~~~

But it's easier to control the work with text notes using the **onLightboxSave** and **onBeforeSave** event handlers: 

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new){
	if (task.notes) {
    	task.notes = sanitizeText(task.notes);
    }
    return true;
});

protectedGantt.ext.inlineEditors.attachEvent("onBeforeSave", function(state){
    if (state.columnName == "notes") {
    	state.newValue = sanitizeText(state.newValue);
    }
    return true;
});
~~~

You can also make resource assignments in the lightbox. Since Gantt does not limit entered values only to the **number** type,
the use of string values is also available, which opens up the possibility of XSS attacks.

Resource values are written into the property of a task, so the **sanitizeResourceValues()** function iterates through all these values
and sanitizes the resource assignment value using the **sanitizeText()** function:

~~~js
function sanitizeResourceValues(task){
	const resources = task[protectedGantt.config.resource_property];
    if (resources && resources.length) {
    	resources.forEach(function (resource) {
       		if (typeof resource.value == "string") {
            	resource.value = sanitizeText(resource.value);
            }
        })
   	}
}
~~~

The **sanitizeResourceValues()** is called in the **onLightboxSave** event handler:

~~~js
protectedGantt.attachEvent("onLightboxSave", function(id, task, is_new) {
	sanitizeResourceValues(task)
    return true;
});
~~~

*If you use any other string parameters in your Gantt configuration, they also should be sanitized*.

In our example, if you try to insert unwanted content into resource assignments in the resource timeline, 
only numeric values will be accepted. In the case of using other value types, the changes won't be saved.

### Entering data via third-party tools

Our Gantt component gives many opportunities for customization, including the ability to edit tasks with the help of third-party forms, tools, and libraries.
In this case the Gantt API is used for working with tasks. In such scenarios, it is hard to give any universal advice on 
sanitizing data, because everything depends on the way customizations are implemented.

In our example there is a custom form for editing the task name. The form also includes the **sanitizeText()** function for escaping a text: 

~~~js
document.body.querySelector("[name='save']").onclick = function(){
	const newTaskName = document.body.querySelector("[name='text']").value;
    task.text = sanitizeText(newTaskName);
    protectedGantt.updateTask(task.id);
}
~~~

These are pretty much all categories for data entry. If data is sanitized when being entered into Gantt, it is kind of filtered.
As a result, XSS attacks will be ineffective within the Gantt chart and, definitely, unable to reach the server.

## Displaying data in Gantt

The next vulnerable area that we should mention is displaying data in the Gantt chart. 
Although not so efficient as with data entry, sanitizing the displayed data still will help to stop or interrupt the XSS attack chain.
For instance, if the server with data has been attacked, but there is no access to Gantt, the XSS attack will be interrupted on Gantt.

The most secure approach will be to sanitize all Gantt areas, where data is displayed.
It presupposes the [usage of templates in the configuration of each grid column](desktop/specifying_columns.md#datamappingandtemplates). 
The use of [all possible templates](api/refs/gantt_templates.md) will be required to prevent the display of the content with possible XSS attacks.

However, there is a simpler solution for potential issues with displaying data in the Gantt chart. 
As data can be uploaded in the Gantt chart via a user input or from the server, we can limit these two data flows.
Then there won't be any chance to affect the Gantt content and embed malicious code into data.

It is possible to protect the properties of tasks while loading them from the server. It can be done in the **onTaskLoading** event handler:

~~~js
protectedGantt.attachEvent("onTaskLoading", function (task) {
	task.text = sanitizeText(task.text);
    if (task.notes) {
    	task.notes = sanitizeText(task.notes);
    }
    sanitizeResourceValues(task);
    return true;
});
~~~

There may be some other ways to load data into the Gantt chart. For instance, a task object
may come separately from the server and being processed by some function. After that, a new task is added to the Gantt chart or an existing task is updated.
In this case, you need to sanitize the task inside this function before data is loaded into Gantt.

It might look like this:

~~~js
let newTask = await loadFromServer(23);
sanitizeTaskProperties(newTask);
gantt.addTask(newTask);
~~~

If a cybercriminal tricks a user into employing the element inspector in a given web browser and inserting malicious code into Gantt DOM elements, 
you can't avoid that. But at the same time, all the applied changes will be lost next time the Gantt is re-rendered and won't be saved on the server.

## Server side issues

Please note that the client-side validation can be easily compromised or bypassed completely, thus it can't be relied on as a security means. It is aimed to give a user an immediate feedback in case of an erroneous input, without having to wait a server response, while the final validation should be done on the server.

The backend must properly validate/escape/cleanse incoming data, user access rules, etc.

### SQL Injections

dhtmlxGantt is a 100% client-side component, thus SQL injections have to be prevented on the backend by the developer.

There are two points to consider:

- the lightbox doesn't have any default validation, which, if not handled, allows the user to enter any values into editable inputs
- your backend API can be called by a PUT/POST request containing dangerous values manually, bypassing the client-side UI

Thus you'll need to have some kind of SQL injections escaping on your backend. If you use [dhtmlxConnector](desktop/howtostart_connector.md) and specify a table configuration as shown in the related [documentation](https://docs.dhtmlx.com/connector__php__basis.html#loadingfromdatabase), all values will be escaped automatically. Otherwise, you'll have to use a safe CRUD implementation, according to the good practices of the platform you use. Implementations shown in the [how to start guides](desktop/howtostart_guides.md) should be safe in terms of SQL injections.

### CSRF Attacks

Please check [this article](desktop/server_side.md#customrequestheadersandparameters) for adding custom authorization tokens of headers to a request sent by Gantt to the backend.

## Content Security Policy

The library provides a special config that allows you to adjust the code of your application created with dhtmlxGantt to comply with the CSP (Content Security Policy) standard. 
It helps preventing various code injection attacks and improve the safety of application. 

[Read more about applying the CSP standard to a dhtmlxGantt application](api/gantt_csp_config.md).


@linkclass:hidden