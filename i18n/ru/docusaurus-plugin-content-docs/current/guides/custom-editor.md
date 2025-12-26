---
title: "Создание пользовательского элемента"
sidebar_label: "Создание пользовательского элемента"
---

# Создание пользовательского элемента

Чтобы добавить собственный контрол в лайтбокс, необходимо определить новый объект следующим образом:

~~~js
gantt.form_blocks["my_editor"]={
    render:function(sns){ //sns - объект конфигурации секции
        return "html code of the editor here";
    },
    set_value:function(node,value,task,section){
        //node - html-элемент, связанный с определённым выше html
        //value - значение, определённое свойством map_to
        //task - объект задачи
        //section- объект конфигурации секции
        ... код установки значения элементу ...
    },
    get_value:function(node,task,section){
        //node - html-элемент, связанный с определённым выше html
        //task - объект задачи
        //section - объект конфигурации секции
        return "current value from editor";
    },
    focus:function(node){
        //node - html-элемент, связанный с определённым выше html
        ...код для установки фокуса на элемент...
    }
}
~~~

Обратите внимание, что **не следует** использовать самозакрывающиеся теги внутри HTML-кода, возвращаемого функцией "render", так как это может вызвать ошибки парсинга в некоторых браузерах:

~~~js
//это НЕПРАВИЛЬНО
render:function(){
    return "<div id='box'/>";
}

//вместо этого используйте открывающий и закрывающий теги:
render:function(){
    return "<div id='box'></div>"; // рекомендуется
}
~~~


[Custom control in the lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/04_custom_editor.html)


Контрол лайтбокса состоит из следующих методов:

- <span class="submethod">**render (sns): string**</span> - возвращает строку с HTML-элементами для секции
    - **_sns_** - (*LightboxSection*) - объект конфигурации секции
- <span class="submethod">**set_value (node, value, task, section): any**</span> - получает значение из объекта **Task** и применяет его к секции
    - **_node_** - (*HTMLElement*) - HTML-элемент, связанный с HTML секции
    - **_value_** - (*any*) - значение, определённое свойством **map_to**
    - **_task_** - (*Task*) - объект задачи
    - **_section_** - (*LightboxSection*) - объект конфигурации секции
- <span class="submethod">**get_value (node, task, section): any**</span> - извлекает значение из секции и сохраняет его обратно в объект **Task**
    - **_node_** - (*HTMLElement*) - HTML-элемент, связанный с HTML секции
    - **_task_** - (*Task*) - объект задачи
    - **_section_** - (*LightboxSection*) - объект конфигурации секции
- <span class="submethod">**focus (node): void**</span> - устанавливает фокус на секцию
    - **_node_** - (*HTMLElement*) - HTML-элемент, связанный с HTML секции

## Пользовательский редактор с двумя полями ввода

Пример создания пользовательского редактора с двумя полями ввода:

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


## Пользовательский редактор на сторонней библиотеке {#customthirdpartyeditor}

Можно создать пользовательский multiselect-контрол для выбора нескольких значений.

Например, контрол на основе [jQuery Chosen plugin](https://harvesthq.github.io/chosen/) может использоваться для назначения нескольким ресурсам задачи. В отличие от стандартного Gantt [resource control](guides/resources.md), этот контрол только назначает ресурсы без указания их количества. Это простой вариант, если необходим минималистичный контрол.

![Custom resources control](/img/custom_resources_control.png)


[3rd party multiselect control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/14_jquery_multiselect.html)


Чтобы интегрировать контрол на базе jQuery Chosen в Gantt:

- подключите необходимые исходные файлы на страницу

~~~html
<script
    src="https://code.jquery.com/jquery-3.3.1.min.js?v="5.2.4""
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.jquery.js?v="5.2.4""></script>
<link rel="stylesheet" type="text/css" 
    href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.8.7/chosen.css?v="5.2.4"">
~~~

- реализуйте логику контрола

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

- добавьте контрол как секцию лайтбокса с *type:"multiselect"*

~~~js
gantt.config.lightbox.sections = [
    {name:"description",height:38,map_to:"text",type:"textarea",focus: true},
    {name:"owner",height:60, type:"multiselect", options:gantt.serverList("people"), 
        map_to:"owner_id", unassigned_value:5 },
    {name: "time", type: "duration", map_to: "auto"}
];
~~~

Свойство *unassigned_value* скрывает ресурсы, которые не должны быть доступны для выбора. Укажите здесь id ресурса, который нужно исключить. В примере выше ресурс с id="5" не будет отображаться в контроле.

## Пользовательский сторонний datepicker

Также можно добавить в лайтбокс пользовательский контрол выбора даты для задания длительности задачи через указание даты начала и окончания.


### jQuery Datepicker в лайтбоксе

Например, контрол Datepicker можно реализовать с помощью jQuery UI Datepicker.

![Custom Datepicker control](/img/custom_datepicker.png)


**Related example:** [3rd party Datepicker control](https://snippet.dhtmlx.com/ux7u9fqp)


Для использования jQuery Datepicker в Gantt:

- подключите файлы библиотеки jQuery на страницу:

~~~html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<link  rel="stylesheet" type="text/css" 
    href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
~~~

- реализуйте логику контрола:

~~~js
(function () {
    function startDatepicker(node){
        return $(node).find("input[name='start']");
    }
    function endDateInput(node){
        return $(node).find("input[name='end']");
    }
          
    gantt.form_blocks["datepicker"] = {
        render: function (sns) { //sns - объект конфигурации секции
            return "<div class='gantt-lb-datepicker'>"+
                "<input type='text' name='start'>"+
                "<input type='text' name='end'>"+
                "</div>";;
        },
        set_value: function (node, value, task, section) {
            //node - html-элемент, связанный с определённым выше html
            //value - значение, определённое свойством map_to
            //task - объект задачи
            //section- объект конфигурации секции
          
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

- затем используйте контрол как секцию лайтбокса с *type:"datepicker"*:

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
  { name: "time", height: 72, map_to: "auto", type: "datepicker" }
];
~~~

### Bootstrap Datepicker в lightbox

Добавление Bootstrap Datepicker внутрь lightbox осуществляется аналогично интеграции jQuery Datepicker.

![Bootstrap Datepicker control](/img/bootstrap_datepicker.png)


**Related example:** [Bootstrap Datepicker control](https://snippet.dhtmlx.com/azx7vhli)


Чтобы встроить элемент управления Bootstrap Datepicker в диаграмму Gantt:

- подключите исходные файлы библиотеки Bootstrap на страницу;

- определите логику работы контрола:

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

- затем используйте этот контрол как секцию lightbox, указав type:"datepicker":

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
  { name: "time", height: 45, map_to: "auto", type: "datepicker" }
];
~~~

## Пользовательский сторонний контрол Duration

Также возможно добавить пользовательский контрол Duration в lightbox, который позволяет устанавливать дату начала задачи вместе с длительностью в днях.

![Custom Duration control](/img/custom_duration_control.png)


**Related example:** [3rd party Duration control](https://snippet.dhtmlx.com/snb64bz6)


Вот как добавить пользовательский контрол Duration на основе jQuery:

- сначала подключите исходные файлы библиотеки jQuery на страницу:

~~~html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<link  rel="stylesheet" type="text/css" 
    href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
~~~

- затем определите логику работы контрола:

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
        render: function (sns) { //sns - объект конфигурации секции
            return "<div class='gantt-lb-datepicker'>"+
                "<label>Start:<input type='text' name='start'></label>"+
                "<label>Duration: <input type='text' name='duration'></label>"+
                "<span class='gantt-lb-datepicker-label'></span>"
                "</div>";
        },
        set_value: function (node, value, task, section) {
            //node - html-элемент, соответствующий определённому выше html
            //value - значение, определённое свойством map_to
            //task - объект задачи
            //section - объект конфигурации секции

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

- наконец, используйте этот контрол как секцию lightbox с type:"datepicker_duration":

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
  { name: "time", height: 72, map_to: "auto", type: "datepicker_duration" }
];
~~~
