--- 
title: "Создание пользовательского элемента управления" 
sidebar_label: "Создание пользовательского элемента управления" 
---

# Создание пользовательского элемента управления

Чтобы создать пользовательский элемент управления для лайтбокса, определите новый объект следующим образом:

~~~js
gantt.form_blocks["my_editor"]={
    render:function(sns){ //sns - the section's configuration object
        return "html code of the editor here";
    },
    set_value:function(node,value,task,section){
        //node - an html object related to the html defined above
        //value - a value defined by the map_to property
        //task - the task object
        //section- the section's configuration object
        ... code to set value to the element ...
    },
    get_value:function(node,task,section){
        //node - an html object related to the html defined above
        //task - the task object
        //section - the section's configuration object
        return "current value from editor";
    },
    focus:function(node){
        //node - an html object related to the html defined above
        ...code to set focus to the element...
    }
}
~~~

Убедитесь, что вы **не** используете короткий синтаксис закрывающих тегов внутри HTML-кода, возвращаемого функцией "render", так как это может вызвать проблемы парсинга в браузере:

~~~js
//это НЕПРАВИЛЬНО
render:function(){
    return "<div id='box'/>";
}

//вместо этого используйте синтаксис открывающих и закрывающих тегов:
render:function(){
    return "<div id='box'></div>";// рекомендуется
}
~~~

[Пользовательский контроль в лайтбоксе](https://docs.dhtmlx.com/gantt/samples/05_lightbox/04_custom_editor.html)

Контроль лайтбокса имеет следующие типы:

- <span class="submethod">**render (sns): string**</span> - функция, возвращающая строку с HTML-элементами секции
    - **_sns_** - (*LightboxSection*) - объект конфигурации секции
- <span class="submethod">**set_value (node, value, task, section): any**</span> - функция, которая получает значение из объекта **Task** и устанавливает его в секцию
    - **_node_** - (*HTMLElement*) - HTML-объект, связанный с вышеопределённым HTML
    - **_value_** - (*any*) - значение, определённое свойством **map_to**
    - **_task_** - (*Task*) - объект задачи
    - **_section_** - (*LightboxSection*) - объект конфигурации секции
- <span class="submethod">**get_value (node, task, section): any**</span> - функция, которая получает значение из секции и сохраняет его в объект **Task**
    - **_node_** - (*HTMLElement*) - HTML-объект, связанный с вышеопределённым HTML
    - **_task_** - (*Task*) - объект задачи
    - **_section_** - (*LightboxSection*) - объект конфигурации секции
- <span class="submethod">**focus (node): void**</span> - функция для установки фокуса на секцию
    - **_node_** - (*HTMLElement*) - HTML-объект, связанный с вышеопределённым HTML


## Пользовательский редактор с двумя полями ввода

Рассмотрим, как создать следующий пользовательский редактор:

![custom_lightbox_editor](/img/custom_lightbox_editor.png)
  

~~~js
gantt.form_blocks["my_editor"] = {
    render: function (sns) {
        return "<div class='dhx_cal_ltext' style='height:60px;'>"+
            "Text&nbsp;<input class='editor_description' type='text'>"+
            

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


[Пользовательский контроль в лайтбоксе](https://docs.dhtmlx.com/gantt/samples/05_lightbox/04_custom_editor.html)


## Пользовательский редактор от сторонних разработчиков {#customthirdpartyeditor}

Вы можете создать пользовательский мультитеговый контрол для выбора нескольких значений. 

Например, можно сделать управление на основе плагина jQuery Chosen, чтобы присваивать несколько ресурсов задаче.
В отличие от стандартного контроля ресурсов в диаграмме Ганта, он позволяет просто назначать ресурсы задаче без указания их количества. Однако он может быть полезен, если нужен довольно простой контрол.

![Custom resources control](/img/custom_resources_control.png)


[3rd party multiselect control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/14_jquery_multiselect.html)


Чтобы использовать управление на основе jQuery Chosen в диаграмме Ганта:

- включите его исходные файлы на страницу

~~~html
<script
    src="https://code.jquery.com/jquery-3.3.1.min.js?v="5.2.4""
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.js?v="5.2.4""></script>
<link rel="stylesheet" type="text/css" 
    href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.css?v="5.2.4"">
~~~

- описать логику управления

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

- используйте управление как секцию лайтбокса с типом *type:"multiselect"*

~~~js
gantt.config.lightbox.sections = [
    {name:"description",height:38,map_to:"text",type:"textarea",focus: true},
    {name:"owner",height:60, type:"multiselect", options:gantt.serverList("people"), 
        map_to:"owner_id", unassigned_value:5 },
    {name: "time", type: "duration", map_to: "auto"}
];
~~~ 

Свойство *unassigned_value* в объекте управления используется для скрытия ресурсов, которые не должны быть доступны для выбора в контроле. Необходимо задать значение соответствующего ресурса как идентификатор этого свойства.
В приведённом выше примере ресурс с id="5" не отображается в качестве варианта в контроле.

## Пользовательский третий сторонний Datepicker

Можно добавить пользовательский Datepicker в лайтбокс для задания продолжительности задачи, указав даты начала и конца задачи.


### jQuery Datepicker в лайтбоксе

Например, можно создать контрол Datepicker на основе jQuery UI Datepicker.

![Custom Datepicker control](/img/custom_datepicker.png)

**Связанный пример** [3rd party Datepicker control](https://snippet.dhtmlx.com/ux7u9fqp)

Чтобы использовать контрол Datepicker jQuery в диаграмме Ганта:

- включите исходные файлы библиотеки jQuery на страницу:

~~~html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<link  rel="stylesheet" type="text/css" 
    href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
~~~

- описать логику управления:

~~~js
(function () {
    function startDatepicker(node){
        return $(node).find("input[name='start']");
    }
    function endDateInput(node){
        return $(node).find("input[name='end']");
    }
          
    gantt.form_blocks["datepicker"] = {
        render: function (sns) { //sns - the section's configuration object
            return "<div class='gantt-lb-datepicker'>"+
                "<input type='text' name='start'>"+
                "<input type='text' name='end'>"+
                "</div>";;
        },
        set_value: function (node, value, task, section) {
            //node - an html object related to the html defined above
            //value - a value defined by the map_to property
            //task - the task object
            //section- the section's configuration object
          
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

- используйте контроль как секцию лайтбокса с типом:"datepicker":

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
  { name: "time", height: 72, map_to: "auto", type: "datepicker" }
];
~~~ 

### Bootstrap Datepicker в лайтбоксе

Bootstrap Datepicker можно добавить в лайтбокс аналогично jQuery Datepicker.

![Bootstrap Datepicker control](/img/bootstrap_datepicker.png)

**Связанный пример** [Bootstrap Datepicker control](https://snippet.dhtmlx.com/azx7vhli)

Чтобы использовать Bootstrap Datepicker в диаграмме Ганта:

- включите исходные файлы библиотеки Bootstrap на страницу;

- описать логику управления:

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

- используйте контроль как секцию лайтбокса с типом:"datepicker": 

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
  { name: "time", height: 45, map_to: "auto", type: "datepicker" }
];
~~~ 

## Пользовательский третий сторонний Duration контроль

Возможно, вам также понадобится добавить пользовательский контроль Duration в лайтбокс для указания даты начала задачи и количества дней.

![Custom Duration control](/img/custom_duration_control.png)

**Связанный пример** [3rd party Duration control](https://snippet.dhtmlx.com/snb64bz6)


Рассмотрим, как добавить пользовательский контроль Duration на основе jQuery:

- включите исходные файлы библиотеки jQuery на страницу:

~~~html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<link  rel="stylesheet" type="text/css" 
    href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
~~~ 

- описать логику управления:

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

- используйте контроль как секцию лайтбокса с типом:"datepicker_duration":

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
  { name: "time", height: 72, map_to: "auto", type: "datepicker_duration" }
];
~~~