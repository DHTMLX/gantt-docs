---
title: "Erstellen eines benutzerdefinierten Elements"
sidebar_label: "Erstellen eines benutzerdefinierten Elements"
---

Erstellen eines benutzerdefinierten Elements
===================================

Um ein benutzerdefiniertes Steuerelement zum Lightbox-Dialog hinzuzufügen, definieren Sie ein neues Objekt wie folgt:

~~~js
gantt.form_blocks["my_editor"]={
    render:function(sns){ //sns - das Konfigurationsobjekt des Abschnitts
        return "html code of the editor here";
    },
    set_value:function(node,value,task,section){
        //node - ein HTML-Element, das mit dem oben definierten HTML verbunden ist
        //value - ein Wert, der durch die Eigenschaft map_to definiert ist
        //task - das Aufgabenobjekt
        //section- das Konfigurationsobjekt des Abschnitts
        ... code to set value to the element ...
    },
    get_value:function(node,task,section){
        //node - ein HTML-Element, das mit dem oben definierten HTML verbunden ist
        //task - das Aufgabenobjekt
        //section - das Konfigurationsobjekt des Abschnitts
        return "current value from editor";
    },
    focus:function(node){
        //node - ein HTML-Element, das mit dem oben definierten HTML verbunden ist
        ...code to set focus to the element...
    }
}
~~~

Beachten Sie, dass Sie **keine** selbstschließenden Tags im HTML-Code verwenden sollten, der von der "render"-Funktion zurückgegeben wird, da dies in einigen Browsern zu Parsing-Problemen führen kann:

~~~js
//DAS IST FALSCH
render:function(){
    return "<div id='box'/>";
}

//Stattdessen Öffnungs- und Schließ-Tags verwenden:
render:function(){
    return "<div id='box'></div>"; // empfohlen
}
~~~


[Custom control in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/04_custom_editor.html)


Das Lightbox-Steuerelement besteht aus folgenden Methoden:

- <span class="submethod">**render (sns): string**</span> - gibt einen String mit den HTML-Elementen für den Abschnitt zurück
    - **_sns_** - (*LightboxSection*) - das Konfigurationsobjekt des Abschnitts
- <span class="submethod">**set_value (node, value, task, section): any**</span> - übernimmt den Wert aus dem **Task**-Objekt und wendet ihn auf den Abschnitt an
    - **_node_** - (*HTMLElement*) - ein HTML-Element, das mit dem HTML des Abschnitts verbunden ist
    - **_value_** - (*any*) - ein Wert, der durch die Eigenschaft **map_to** definiert ist
    - **_task_** - (*Task*) - das Aufgabenobjekt
    - **_section_** - (*LightboxSection*) - das Konfigurationsobjekt des Abschnitts
- <span class="submethod">**get_value (node, task, section): any**</span> - liest den Wert aus dem Abschnitt aus und speichert ihn zurück im **Task**-Objekt
    - **_node_** - (*HTMLElement*) - ein HTML-Element, das mit dem HTML des Abschnitts verbunden ist
    - **_task_** - (*Task*) - das Aufgabenobjekt
    - **_section_** - (*LightboxSection*) - das Konfigurationsobjekt des Abschnitts
- <span class="submethod">**focus (node): void**</span> - setzt den Fokus auf den Abschnitt
    - **_node_** - (*HTMLElement*) - ein HTML-Element, das mit dem HTML des Abschnitts verbunden ist


## Benutzerdefinierter Editor mit zwei Eingabefeldern

Hier ein Beispiel für die Erstellung eines benutzerdefinierten Editors mit zwei Eingabefeldern:

![custom_lightbox_editor](/img/custom_lightbox_editor.png)
  

~~~js
gantt.form_blocks["my_editor"] = {
    render: function (sns) {
        return "<div class='dhx_cal_ltext' style='height:60px;'>"+
            "Text&nbsp;<input class='editor_description' type='text'>"+
            "

Holders&nbsp;<input class='editor_holders' type='text'>"+
            "</div>";
    },
    set_value: function (node, value, task) {
        node.querySelector(".editor_description").value = value || "";
        node.querySelector(".editor_holders").value = task.users || "";
    },
    get_value: function (node, task) {
        task.users = node.querySelector(".editor_holders").value;
        return node.querySelector(".editor_description").value;
    },
    focus: function (node) {
        var a = node.querySelector(".editor_description");
        a.select();
        a.focus();
    }
};
gantt.config.lightbox.sections = [
    { name:"description", height:200, map_to:"text", type:"my_editor", focus:true},
    { name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~


[Custom control in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/04_custom_editor.html)


## Benutzerdefiniertes Drittanbieter-Editorfeld {#customthirdpartyeditor}

Es ist möglich, ein benutzerdefiniertes Multiselect-Steuerelement zu erstellen, um mehrere Werte auszuwählen.

Zum Beispiel kann ein Steuerelement auf Basis des [jQuery Chosen Plugins](https://harvesthq.github.io/chosen/) verwendet werden, um mehreren Ressourcen eine Aufgabe zuzuweisen. Im Gegensatz zum Standard-Gantt-[Ressourcen-Steuerelement](guides/resources.md) weist dieses Steuerelement nur Ressourcen zu, ohne Mengen anzugeben. Es ist eine einfache Option, wenn ein unkompliziertes Steuerelement bevorzugt wird.

![Custom resources control](/img/custom_resources_control.png)


[3rd party multiselect control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/14_jquery_multiselect.html)


Um ein auf jQuery Chosen basierendes Steuerelement im Gantt-Diagramm zu integrieren:

- Binden Sie die benötigten Quell-Dateien auf Ihrer Seite ein

~~~html
<script
    src="https://code.jquery.com/jquery-3.3.1.min.js?v="5.2.4""
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.js?v="5.2.4""></script>
<link rel="stylesheet" type="text/css" 
    href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.css?v="5.2.4"">
~~~

- Definieren Sie die Logik des Steuerelements

~~~js
gantt.form_blocks["multiselect"] = {
 render: function (sns) {
  var height = (sns.height || "23") + "px";
  var html = "<div class='gantt_cal_ltext gantt_cal_chosen gantt_cal_multiselect'"+
     "style='height:"+ height + ";'><select data-placeholder='...'"+
        "class='chosen-select' multiple>";
  if (sns.options) {
   for (var i = 0; i < sns.options.length; i++) {
    if(sns.unassigned_value !== undefined && sns.options[i].key==sns.unassigned_value){
        continue;
    }
    html+="<option value='" +sns.options[i].key+ "'>"+sns.options[i].label+"</option>";
  }
}
  html += "</select></div>";
  return html;
},

set_value: function (node, value, ev, sns) {
    node.style.overflow = "visible";
    node.parentNode.style.overflow = "visible";
    node.style.display = "inline-block";
    var select = $(node.firstChild);

    if (value) {
        value = (value + "").split(",");
        select.val(value);
    }
    else {
        select.val([]);
    }

    select.chosen();
    if(sns.onchange){
        select.change(function(){
            sns.onchange.call(this);
        })
    }
    select.trigger('chosen:updated');
    select.trigger("change");
},

get_value: function (node, ev) {
    var value = $(node.firstChild).val();
    //value = value ? value.join(",") : null
    return value;
},

focus: function (node) {
    $(node.firstChild).focus();
 }
};
~~~

- Fügen Sie das Steuerelement als Lightbox-Abschnitt mit *type:"multiselect"* hinzu

~~~js
gantt.config.lightbox.sections = [
    {name:"description",height:38,map_to:"text",type:"textarea",focus: true},
    {name:"owner",height:60, type:"multiselect", options:gantt.serverList("people"), 
        map_to:"owner_id", unassigned_value:5 },
    {name: "time", type: "duration", map_to: "auto"}
];
~~~

Die *unassigned_value*-Eigenschaft blendet Ressourcen aus, die nicht zur Auswahl stehen sollen. Setzen Sie diese auf die ID der Ressource, die ausgeschlossen werden soll. Im obigen Beispiel wird die Ressource mit id="5" nicht im Steuerelement angezeigt.

## Benutzerdefinierter Drittanbieter-Datepicker

Es ist ebenfalls möglich, ein benutzerdefiniertes Datepicker-Steuerelement zur Lightbox hinzuzufügen, um die Aufgabendauer durch Angabe von Start- und Enddatum festzulegen.


### jQuery Datepicker in der Lightbox

Ein Datepicker-Steuerelement kann beispielsweise mit jQuery UI Datepicker erstellt werden.

![Custom Datepicker control](/img/custom_datepicker.png)

**Related example:** [3rd party Datepicker control](https://snippet.dhtmlx.com/ux7u9fqp)

Um ein jQuery Datepicker-Steuerelement im Gantt-Diagramm zu verwenden:

- Binden Sie die jQuery-Bibliotheken auf Ihrer Seite ein:

~~~html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<link  rel="stylesheet" type="text/css" 
    href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
~~~

- Implementieren Sie die Logik für das Steuerelement:

~~~js
(function () {
    function startDatepicker(node){
        return $(node).find("input[name='start']");
    }
    function endDateInput(node){
        return $(node).find("input[name='end']");
    }
          
    gantt.form_blocks["datepicker"] = {
        render: function (sns) { //sns - das Konfigurationsobjekt des Abschnitts
            return "<div class='gantt-lb-datepicker'>"+
                "<input type='text' name='start'>"+
                "<input type='text' name='end'>"+
                "</div>";;
        },
        set_value: function (node, value, task, section) {
            //node - ein HTML-Element, das mit dem oben definierten HTML verbunden ist
            //value - ein Wert, der durch die Eigenschaft map_to definiert ist
            //task - das Aufgabenobjekt
            //section- das Konfigurationsobjekt des Abschnitts
          
            startDatepicker(node).datepicker({
                dateFormat: "yy-mm-dd",
                onSelect: function (dateStr) {
                    var endValue = endDateInput(node).datepicker('getDate');
                    var startValue = startDatepicker(node).datepicker('getDate');
                  
                    if(startValue && endValue){
                        if(endValue.valueOf() <= startValue.valueOf()){
                            endDateInput(node).datepicker("setDate", 
                                gantt.calculateEndDate({
                                    start_date: startValue, duration: 1, task:task
                                  })
                            );
                           }
                    }
                }
            });

            startDatepicker(node).datepicker("setDate", task.start_date);

            endDateInput(node).datepicker({
                dateFormat: "yy-mm-dd",
                onSelect: function (dateStr) {
                    //    gantt.ext.inlineEditors.save()
                }
            });
            endDateInput(node).datepicker("setDate", task.end_date);
        },
        get_value: function (node, task, section) {
          
            if(task.start_date && task.end_date) {
                var start = startDatepicker(node).datepicker('getDate');
                var end =  endDateInput(node).datepicker('getDate');
              
                   if(end.valueOf() <= start.valueOf()){
                       end = gantt.calculateEndDate({
                        start_date: start, duration: 1, task:task
                    });
                  }
                  task.start_date = start;
                  task.end_date = end;                 
            }

            task.duration = gantt.calculateDuration(task);
        },
        focus: function (node) {

        }
    }
})();
~~~

- Verwenden Sie das Steuerelement dann als Lightbox-Abschnitt mit *type:"datepicker"*:

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
  { name: "time", height: 72, map_to: "auto", type: "datepicker" }
];
~~~


### Bootstrap Datepicker im Lightbox

Das Hinzufügen eines Bootstrap Datepickers innerhalb des Lightbox funktioniert ähnlich wie die Integration des jQuery Datepickers.

![Bootstrap Datepicker control](/img/bootstrap_datepicker.png)

**Related example:** [Bootstrap Datepicker control](https://snippet.dhtmlx.com/azx7vhli)

So integrieren Sie ein Bootstrap Datepicker Control in das Gantt Chart:

- Binden Sie die Quell-Dateien der Bootstrap-Bibliothek auf der Seite ein;

- Definieren Sie die Logik für das Steuerelement:

~~~js
(function () {
    const startDatepicker = (node) => $(node).find("input[name='start']");
    const endDateInput = (node) => $(node).find("input[name='end']");
          
    gantt.form_blocks["datepicker"] = {
        render: (sns) => {
          const height = sns.height || 45;
            return "<div class='gantt-lb-datepicker' style='height:" + height + "px;'>"+
                        "<input type='text' name='start'> - "+
                        "<input type='text' name='end'>"+
                    "</div>";;
        },
        set_value: (node, value, task, section) => {
              const datepickerConfig = { 
                  format: 'yyyy-mm-dd',
                  autoclose: true,
                   container: gantt.$container
            };
            startDatepicker(node).datepicker(datepickerConfig);
              startDatepicker(node).datepicker('setDate', 
                  value ? value.start_date : task.start_date
            );
          
            endDateInput(node).datepicker(datepickerConfig);
              endDateInput(node).datepicker('setDate', 
                  value ? value.end_date : task.end_date
            );
          
            startDatepicker(node).datepicker().on('changeDate', function(e) {
                const endValue = endDateInput(node).datepicker('getDate');
                const startValue = startDatepicker(node).datepicker('getDate');

                if (startValue && endValue) {
                    if (endValue.valueOf() <= startValue.valueOf()) {
                        endDateInput(node).datepicker('setDate', 
                            gantt.calculateEndDate({
                                start_date: startValue, duration: 1, task:task
                            })
                        );
                    }
                }
            });
        },
        get_value: (node, task, section) => {
            const start = startDatepicker(node).datepicker('getDate');
            let end =  endDateInput(node).datepicker('getDate');

            if (end.valueOf() <= start.valueOf()) {
                end = gantt.calculateEndDate({
                    start_date: start,
                    duration: 1,
                    task:task
                });
            }
            if (task.start_date && task.end_date) {
                  task.start_date = start;
                  task.end_date = end;                 
            }
            
            task.duration = gantt.calculateDuration(task);
              
              return {
                start_date: start,
                  end_date: end,
                  duration: task.duration
            };
        },
        focus: (node) => {
        }
    }
})();
~~~

- Verwenden Sie dieses Steuerelement dann als Lightbox-Abschnitt, indem Sie type:"datepicker" angeben:

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
  { name: "time", height: 45, map_to: "auto", type: "datepicker" }
];
~~~

## Benutzerdefiniertes Drittanbieter-Dauer-Steuerelement

Es ist auch möglich, ein benutzerdefiniertes Dauer-Steuerelement zur Lightbox hinzuzufügen, mit dem das Startdatum der Aufgabe zusammen mit der Dauer in Tagen festgelegt werden kann.

![Custom Duration control](/img/custom_duration_control.png)

**Related example:** [3rd party Duration control](https://snippet.dhtmlx.com/snb64bz6)

So fügen Sie ein benutzerdefiniertes Dauer-Steuerelement auf Basis von jQuery hinzu:

- Binden Sie zunächst die Quell-Dateien der jQuery-Bibliothek auf der Seite ein:

~~~html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<link  rel="stylesheet" type="text/css" 
    href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
~~~

- Definieren Sie dann die Logik für das Steuerelement:

~~~js
(function () {
    function startDatepicker(node){
        return $(node).find("input[name='start']");
    }
    function durationInput(node){
        return $(node).find("input[name='duration']");
    }
    function endDateLabel(node){
        return $(node).find("span.gantt-lb-datepicker-label");
    }

    var formatter = gantt.ext.formatters.durationFormatter({
        enter: "day",
        store: "day",
        format: "auto"
    });

    gantt.form_blocks["datepicker_duration"] = {
        render: function (sns) { //sns - the section's configuration object
            return "<div class='gantt-lb-datepicker'>"+
                "<label>Start:<input type='text' name='start'></label>"+
                "<label>Duration: <input type='text' name='duration'></label>"+
                "<span class='gantt-lb-datepicker-label'></span>"
                "</div>";
        },
        set_value: function (node, value, task, section) {
            //node - an html object related to the html defined above
            //value - a value defined by the map_to property
            //task - the task object
            //section- the section's configuration object

            startDatepicker(node).datepicker({
                dateFormat: "yy-mm-dd",
                onSelect: function (dateStr) {
                    var endValue = durationInput(node).datepicker('getDate');
                    var startValue = startDatepicker(node).datepicker('getDate');

                    if(startValue && endValue){
                        if(endValue.valueOf() <= startValue.valueOf()){
                            durationInput(node).datepicker("setDate",
                                gantt.calculateEndDate({
                                    start_date: startValue, duration: 1, task:task
                                })
                            );
                        }
                    }
                }
            });

            startDatepicker(node).datepicker("setDate", task.start_date);

            durationInput(node).val(formatter.format(task.duration));
            endDateLabel(node).text(
                "Ends: " + gantt.templates.task_date(task.end_date)
            );
        },
        get_value: function (node, task, section) {

            if(task.start_date && task.end_date) {
                var start = startDatepicker(node).datepicker('getDate');
                var end = task.end_date;
                var duration = formatter.parse(durationInput(node).val());

                if(duration && !isNaN(Number(duration))){
                    end = gantt.calculateEndDate({
                        start_date: start, duration: duration, task:task
                    });
                }
                task.start_date = start;
                task.duration = duration;
                task.end_date = end;
            }

            task.duration = gantt.calculateDuration(task);
            return {
                start_date: task.start_date,
                end_date: task.end_date,
                duration: task.duration
            }
        },
        focus: function (node) {

        }
    }
})();
~~~

- Verwenden Sie dieses Steuerelement abschließend als Lightbox-Abschnitt mit type:"datepicker_duration":

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
  { name: "time", height: 72, map_to: "auto", type: "datepicker_duration" }
];
~~~
