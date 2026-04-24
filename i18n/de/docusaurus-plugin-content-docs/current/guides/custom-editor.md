---
title: "Erstellen eines benutzerdefinierten Elements"
sidebar_label: "Erstellen eines benutzerdefinierten Elements"
---

# Erstellen eines benutzerdefinierten Elements

Um eine benutzerdefinierte Steuerung für das Lightbox-Fenster zu erstellen, definieren Sie ein neues Objekt folgendermaßen:

~~~js
gantt.form_blocks["my_editor"]={
    render:function(sns){ //sns - das Abschnitts-Konfigurationsobjekt
        return "html code of the editor here";
    },
    set_value:function(node,value,task,section){
        //node - ein HTML-Objekt, das sich auf das oben definierte HTML bezieht
        //value - ein Wert, definiert durch die map_to-Eigenschaft
        //task - das Task-Objekt
        //section- das Abschnitts-Konfigurationsobjekt
        ... code to set value to the element ...
    },
    get_value:function(node,task,section){
        //node - ein HTML-Objekt, das sich auf das oben definierte HTML bezieht
        //task - das Task-Objekt
        //section - das Abschnitts-Konfigurationsobjekt
        return "current value from editor";
    },
    focus:function(node){
        //node - ein HTML-Objekt, das sich auf das oben definierte HTML bezieht
        ...code to set focus to the element...
    }
}
~~~

Stellen Sie sicher, dass Sie die kurze Schließ-Syntax für Tags im HTML-Code, der von der "render"-Funktion zurückgegeben wird, nicht verwenden, da dies Parsing-Probleme im Browser verursachen könnte:

~~~js
//dieses ist FALSCH
render:function(){
    return "<div id='box'/>";
}

//stattdessen Öffnungs- und Schließ-Tags-Syntax verwenden:
render:function(){
    return "<div id='box'></div>";// empfohlen
}
~~~


[Custom control in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/04_custom_editor.html)


Die Lightbox-Steuerung hat die folgenden Typen:

- <span class="submethod">**render (sns): string**</span> - eine Funktion, die eine Zeichenkette mit den HTML-Elementen des Abschnitts zurückgibt
    - **_sns_** - (*LightboxSection*) - das Abschnitts-Konfigurationsobjekt
- <span class="submethod">**set_value (node, value, task, section): any**</span> - eine Funktion, die den Wert aus dem **Task**-Objekt entnimmt und dem Abschnitt zuweist
    - **_node_** - (*HTMLElement*) - ein HTML-Objekt, das sich auf das oben definierte HTML bezieht
    - **_value_** - (*any*) - ein Wert, definiert durch die **map_to**-Eigenschaft
    - **_task_** - (*Task*) - das Task-Objekt
    - **_section_** - (*LightboxSection*) - das Abschnitts-Konfigurationsobjekt
- <span class="submethod">**get_value (node, task, section): any**</span> - eine Funktion, die den Wert aus dem Abschnitt entnimmt und im **Task**-Objekt speichert
    - **_node_** - (*HTMLElement*) - ein HTML-Objekt, das sich auf das oben definierte HTML bezieht
    - **_task_** - (*Task*) - das Task-Objekt
    - **_section_** - (*LightboxSection*) - das Abschnitts-Konfigurationsobjekt
- <span class="submethod">**focus (node): void**</span> - eine Funktion, um den Fokus auf den Abschnitt zu setzen
    - **_node_** - (*HTMLElement*) - ein HTML-Objekt, das sich auf das oben definierte HTML bezieht


## Benutzerdefinierter Editor mit zwei Eingaben

Betrachten wir, wie der folgende benutzerdefinierte Editor erstellt wird:

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


## Custom Drittanbieter-Editor {#customthirdpartyeditor}

Sie können eine benutzerdefinierte Multiselect-Steuerung zum Auswählen mehrerer Werte erstellen. 

Beispielsweise können Sie eine Steuerung basierend auf dem [jQuery Chosen-Plugin](https://harvesthq.github.io/chosen/) verwenden, um mehrere Ressourcen einer Aufgabe zuzuweisen.
Im Gegensatz zur standardmäßigen Gantt [Resource-Kontrolle](guides/resources.md) erlaubt sie lediglich das Zuweisen von Ressourcen zu einer Aufgabe, ohne deren Menge festzulegen. Allerdings kann sie nützlich sein, wenn Sie eine recht einfache Steuerung wünschen.

![Custom resources control](/img/custom_resources_control.png)


[3rd party multiselect control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/14_jquery_multiselect.html)


Um eine jQuery Chosen-basierte Steuerung im Gantt-Diagramm zu verwenden:

- binden Sie deren Quellcode-Dateien in die Seite ein

~~~html
<script
    src="https://code.jquery.com/jquery-3.3.1.min.js?v="5.2.4""
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.js?v="5.2.4""></script>
<link rel="stylesheet" type="text/css" 
    href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.css?v="5.2.4"">
~~~

- die Steuerungslogik beschreiben

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

- verwenden Sie die Steuerung als Lightbox-Abschnitt mit dem Typ *type:"multiselect"*
 
~~~js
gantt.config.lightbox.sections = [
    {name:"description",height:38,map_to:"text",type:"textarea",focus: true},
    {name:"owner",height:60, type:"multiselect", options:gantt.serverList("people"), 
        map_to:"owner_id", unassigned_value:5 },
    {name: "time", type: "duration", map_to: "auto"}
];
~~~

Die Eigenschaft *unassigned_value* im Steuerungsobjekt wird verwendet, um Ressourcen auszublenden, die im Steuerungselement nicht zur Auswahl stehen sollen. Sie müssen die entsprechende Ressourcen-ID als Wert dieser Eigenschaft setzen.
Im obigen Beispiel wird die Ressource mit der ID="5" nicht als Option im Steuerungselement angezeigt.

## Custom Drittanbieter-Datumsauswahl (Datepicker)

Sie können eine benutzerdefinierte Datepicker-Steuerung im Lightbox verwenden, um die Dauer einer Aufgabe durch Angabe von Start- und Enddatum festzulegen.


### jQuery Datepicker im Lightbox

Beispielsweise können Sie eine Datepicker-Steuerung basierend auf dem jQuery UI Datepicker erstellen.

![Custom Datepicker control](/img/custom_datepicker.png)

**Related sample** [3rd party Datepicker control](https://snippet.dhtmlx.com/ux7u9fqp)

So verwenden Sie eine jQuery Datepicker-Steuerung im Gantt-Diagramm:

- binden Sie die Quellcode-Dateien der jQuery-Bibliothek in die Seite ein:

~~~html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<link  rel="stylesheet" type="text/css" 
    href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
~~~

- beschreiben Sie die Steuerungslogik:

~~~js
(function () {
    function startDatepicker(node){
        return $(node).find("input[name='start']");
    }
    function endDateInput(node){
        return $(node).find("input[name='end']");
    }
          
    gantt.form_blocks["datepicker"] = {
        render: function (sns) { //sns - das Abschnitts-Konfigurationsobjekt
            return "<div class='gantt-lb-datepicker'>"+
                "<input type='text' name='start'>"+
                "<input type='text' name='end'>"+
                "</div>";;
        },
        set_value: function (node, value, task, section) {
            //node - ein HTML-Objekt, das sich auf das oben definierte HTML bezieht
            //value - ein Wert, definiert durch die map_to-Eigenschaft
            //task - das Task-Objekt
            //section- das Abschnitts-Konfigurationsobjekt
          
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

- verwenden Sie die Steuerung als Lightbox-Abschnitt mit dem Typ:"datepicker":

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
  { name: "time", height: 72, map_to: "auto", type: "datepicker" }
];
~~~

### Bootstrap Datepicker im Lightbox

Ein Bootstrap Datepicker kann ähnlich wie der jQuery Datepicker in den Lightbox eingefügt werden.

![Bootstrap Datepicker control](/img/bootstrap_datepicker.png)

**Related sample** [Bootstrap Datepicker control](https://snippet.dhtmlx.com/azx7vhli)

So verwenden Sie eine Bootstrap Datepicker-Steuerung im Gantt-Diagramm:

- binden Sie die Quellcode-Dateien der Bootstrap-Bibliothek in die Seite ein;

- beschreiben Sie die Steuerungslogik:

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

- verwenden Sie die Steuerung als Lightbox-Abschnitt mit dem Typ:"datepicker":

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
  { name: "time", height: 45, map_to: "auto", type: "datepicker" }
];
~~~

## Custom Drittanbieter-Dauersteuerung

Sie benötigen möglicherweise eine benutzerdefinierte Dauer-Steuerung im Lightbox-Fenster, um das Startdatum einer Aufgabe und die Anzahl der Tage festzulegen.

![Custom Duration control](/img/custom_duration_control.png)

**Related sample** [3rd party Duration control](https://snippet.dhtmlx.com/snb64bz6)


Betrachten wir, wie man eine benutzerdefinierte Duration-Steuerung auf Basis von jQuery hinzufügt:

- binden Sie die Quellcode-Dateien der jQuery-Bibliothek in die Seite ein:

~~~html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<link  rel="stylesheet" type="text/css" 
    href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
~~~

- beschreiben Sie die Logik der Steuerung:

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
        render: function (sns) { //sns - das Abschnitts-Konfigurationsobjekt
            return "<div class='gantt-lb-datepicker'>"+
                "<label>Start:<input type='text' name='start'></label>"+
                "<label>Duration: <input type='text' name='duration'></label>"+
                "<span class='gantt-lb-datepicker-label'></span>"
                "</div>";
        },
        set_value: function (node, value, task, section) {
            //node - ein HTML-Objekt, das sich auf das oben definierte HTML bezieht
            //value - ein Wert, definiert durch die map_to-Eigenschaft
            //task - das Task-Objekt
            //section- das Abschnitts-Konfigurationsobjekt

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

- verwenden Sie die Steuerung als Lightbox-Abschnitt mit dem Typ:"datepicker_duration":

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
  { name: "time", height: 72, map_to: "auto", type: "datepicker_duration" }
];
~~~