---
title: "dhtmlxGantt с dhtmlxConnector"
sidebar_label: "dhtmlxConnector"
---

# dhtmlxGantt с dhtmlxConnector

В этом руководстве описано, как создать простой Gantt на веб-странице с возможностью сохранения и обновления задач в базе данных (на сервере).


Здесь основное внимание уделяется созданию Gantt с помощью [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html).
Если вы предпочитаете другую серверную технологию, ниже вы найдете руководства по различным вариантам интеграции:

- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim3](integrations/php/howtostart-php.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

![gantt_basic](/img/gantt_basic.png)


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## Шаг 1. Загрузка пакета dhtmlxGantt

<div>
<p>

Для начала скачайте пакет библиотеки на свой компьютер.

<div>![finger](/img/finger.png) <span>Выполните следующие шаги:</span></div>

<ul>
  <li>Скачайте пакет dhtmlxGantt <a href='https://github.com/DHTMLX/connector-php' title='dhtmlxConnector for PHP repository' target='_blank'>здесь</a>, если вы еще этого не сделали. </li>
  <li>Распакуйте архив в корневую директорию вашего локального веб-сервера. Извлечённые файлы будут размещены в папке с именем пакета - dhtmlxGantt.</li>
</ul>
</p>
</div>

## Шаг 2. Подключение файлов dhtmlxGantt

<div>
<p>
Далее подключите файлы dhtmlxGantt в ваш HTML-файл, чтобы использовать возможности библиотеки.

Необходимые файлы dhtmlxGantt:

<ul>
  <li>dhtmlxgantt.js</li>
  <li>dhtmlxgantt.css</li>
</ul> 

<div>![finger](/img/finger.png) <span>Выполните следующие шаги:</span></div>

<ul>

- Создайте HTML-файл внутри папки 'dhtmlxGantt' (где находятся файлы dhtmlxGantt). Например, назовите его 'myGantt.html'.
- Подключите файлы dhtmlxGantt в <b>myGantt.html</b> (оба файла находятся в папке 'codebase').

**myGantt.html**
~~~html
<!DOCTYPE html>
<html>
<head>
   <title>How to Start with dhtmlxGantt</title>
   <script src="codebase/dhtmlxgantt.js"></script> /*!*/  
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet"> /*!*/  
</head>
<body>
       //ваш код будет здесь
</body>
</html>
~~~

</ul> 

</p>
</div>

## Шаг 3. Инициализация dhtmlxGantt

<div>
<p>

Далее создайте контейнер DIV и инициализируйте dhtmlxGantt внутри него.

 Учтите, что dhtmlxGantt - это статический объект, и его можно создать только один раз на странице.
Обращаться к экземпляру dhtmlxGantt можно через <b>dhtmlxGantt</b> или просто <b>gantt</b>.

<div>![finger](/img/finger.png) <span>Выполните следующие шаги:</span></div>

<ul>

- Добавьте контейнер DIV в файл <b>myGantt.html</b>.
- Инициализируйте dhtmlxGantt командой <code>gantt.init("gantt_here")</code>. Этот метод принимает ID HTML-контейнера, в котором будет отображаться Gantt.
  


**myGantt.html**
~~~html
<!DOCTYPE html>
<html>
<head>
   <title>How to Start with dhtmlxGantt</title>
   <script src="codebase/dhtmlxgantt.js"></script>
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">
</head>
<body>
    <div id="gantt_here" style='width:1000px; height:400px;'></div>
    <script type="text/javascript">
        gantt.init("gantt_here"); /*!*/  
    </script>
</body>
</html>
~~~    

</ul> 

</p>
</div>

Если вы используете полноэкранный режим, обязательно добавьте этот CSS, чтобы все отображалось корректно:

~~~html
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

## Шаг 4. Загрузка данных в Gantt

<div>

<p>
Теперь заполним Gantt данными из простого источника. Для простоты используем встроенный объект в качестве источника данных. 

Для загрузки данных используется метод 
[parse](api/method/parse.md), который принимает источник данных в качестве параметра. 


Свойства объекта:

<ul>
  <li><b>data</b> - содержит задачи Gantt</li>
  <ul>
  <li><b>id</b> - (<i>string, number</i>) уникальный идентификатор задачи.</li>
  <li><b>start_date</b> - (<i>Date</i>) дата начала задачи. </li>
  <li><b>text</b> - (<i>string</i>) описание задачи.</li>
  <li><b>progress</b> - (<i>number</i>) значение от 0 до 1, указывающее процент выполнения задачи. </li>
  <li><b>duration</b> - (<i>number</i>) длительность задачи в единицах текущей шкалы времени. </li>
  <li><b>parent</b> - (<i>number</i>) ID родительской задачи, если есть. </li>
  </ul>
  <li><b>links</b> - определяет зависимости между задачами</li>
  <ul>
  <li><b>id</b> - (<i>string, number</i>) уникальный идентификатор связи.</li>
  <li><b>source</b> - (<i>number</i>) ID исходной задачи. </li>
  <li><b>target</b> - (<i>number</i>) ID целевой задачи. </li>
  <li><b>type</b> - (<i>string</i>) тип зависимости: 0 - 'finish to start', 1 - 'start to start', 2 - 'finish to finish'. </li>
  </ul>
</ul> 

<div>![finger](/img/finger.png) <span>Выполните следующие шаги:</span></div>

<ul>

- Объявите переменную 'tasks' в файле <b>myGantt.html</b>: 

**myGantt.html**
~~~js
var tasks = {
    data:[
        {id:1, text:"Project #1",start_date:"01-04-2013", duration:11,
        progress: 0.6, open: true},
        {id:2, text:"Task #1",     start_date:"03-04-2013", duration:5, 
        progress: 1,   open: true, parent:1},
        {id:3, text:"Task #2",   start_date:"02-04-2013", duration:7, 
        progress: 0.5, open: true, parent:1},
        {id:4, text:"Task #2.1", start_date:"03-04-2013", duration:2, 
        progress: 1,   open: true, parent:3},
        {id:5, text:"Task #2.2", start_date:"04-04-2013", duration:3, 
        progress: 0.8, open: true, parent:3},
        {id:6, text:"Task #2.3", start_date:"05-04-2013", duration:4, 
        progress: 0.2, open: true, parent:3}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:1, target:3, type:"1"},
        {id:3, source:3, target:4, type:"1"},
        {id:4, source:4, target:5, type:"0"},
        {id:5, source:5, target:6, type:"0"}
    ]
};
~~~
- Добавьте команду <code>gantt.parse(tasks)</code> сразу после <code>gantt.init("gantt_here")</code>:


**myGantt.html**
~~~js
gantt.init("gantt_here"); 
gantt.parse (tasks);/*!*/  
~~~

</ul>

</p>
</div>

[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## Шаг 5. Создание базы данных

:::note
Этот и следующие шаги применимы, если вы хотите загружать данные из базы данных, а не использовать встроенные данные.
:::
<div>

<p>
Теперь создайте базу данных с двумя таблицами для хранения задач и связей.

![/img/tutorial_db_tables.png](/img/tutorial_db_tables.png)

<i><b>sortorder</b> - это свойство используется только при загрузке данных из базы данных. Оно определяет порядок задач среди "соседей".</i>

<div>![finger](/img/finger.png) <span>Выполните следующие шаги:</span></div>

<ul>

- Создайте новую базу данных с именем <i>gantt</i>. 
- Выполните следующий SQL-код для создания таблиц <i>gantt_tasks</i> и <i>gantt_links</i>:

~~~js
CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL DEFAULT 0,
  `progress` float NOT NULL DEFAULT 0,
  `sortorder` int(11) NOT NULL DEFAULT 0,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);
~~~

</ul> 

</p>
</div>

Чтобы задачи сохранялись корректно даже при отсутствии некоторых полей, добавьте этот код в ваш **myGantt.html**:

**myGantt.html**
~~~js 
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    task.sortorder = 0;
    return true;
});
~~~

## Шаг 6. Загрузка данных из базы данных

:::note
В следующих двух шагах для интеграции клиент-сервер будет использоваться PHP.

 Если вы используете другую платформу, смотрите статью [Загрузка данных](guides/loading.md) для примера реализации собственного серверного скрипта.
:::

<div>

<p>
Теперь подключим загрузку данных из базы данных в диаграмму. Для этого используется метод [load](api/method/load.md), который принимает URL источника данных.
Для доступа к базе этот URL указывает на PHP-файл, реализующий серверную логику.


Мы будем использовать PHP и библиотеку [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html), которая упрощает серверную интеграцию для dhtmlxGantt.

<div>![finger](/img/finger.png) <span>Выполните следующие шаги:</span></div>

<ul>

- Создайте PHP-файл в папке 'dhtmlxGantt', например, <b>data.php</b>
- Отредактируйте <b>data.php</b> и добавьте следующий серверный код:

**data.php**
~~~php
<?php

include ('codebase/connector/gantt_connector.php');

$res = new PDO("mysql:host=localhost;dbname=gantt", "root", "");

$gantt = new JSONGanttConnector($res);
$gantt->render_links("gantt_links","id","source,target,type");
$gantt->render_table(
    "gantt_tasks",
    "id",
    "start_date,duration,text,progress,sortorder,parent"
);
?>
~~~
- В файле <b>myGantt.html</b> установите свойство <code>gantt.config.date_format</code> в значение <i> "%Y-%m-%d %H:%i"</i>, чтобы формат даты соответствовал ожидаемому формату dhtmlxGantt.

**myGantt.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";/*!*/ 
gantt.init("gantt_here");
~~~

- Вызовите <code>gantt.load('data.php')</code> для загрузки данных из базы в Gantt.

**myGantt.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";
gantt.init("gantt_here");
gantt.load('data.php');//загружает данные в Gantt из базы данных /*!*/  
~~~

</ul> 

</p>
</div>

### Маппинг столбцов базы данных

Имейте в виду, что порядок столбцов в **$connector->render_table** имеет значение. Первые три столбца в списке всегда будут соответствовать свойствам *start_date/duration/text* или *start_date/end_date/text* клиентского объекта задачи, независимо от используемых вами названий столбцов. Логика маппинга объяснена ниже.

Второй столбец назначается свойству *task.duration*, если в конфигурации указано 'duration':

~~~js
$gantt->render_table("gantt_tasks","id","Start,duration,Name,progress,parent","");
~~~

Также можно использовать псевдоним:

~~~js
$gantt->render_table("gantt_tasks","id","Start,Length(duration),Name,progress,parent","");
// JS: task.start_date, task.duration, task.text, task.progress, task.parent
~~~

Если используется другое имя столбца, второй столбец будет связан со свойством *end_date*:

~~~js
$gantt->render_table("gantt_tasks","id","Start,End,Name,progress,parent","");
// JS: task.start_date, task.end_date, task.text, task.progress, task.parent
~~~

#### Маппинг остальных столбцов

Все остальные столбцы маппируются напрямую по их именам без изменений:

~~~js
$gantt->render_table("gantt_tasks","id","start_date,duration,text,custom,parent","");
// JS: task.start_date, task.duration, task.text, task.custom, task.parent
~~~

Псевдонимы также могут применяться к другим столбцам:

~~~js
$gantt->render_table("gantt_tasks","id",
    "start_date,duration,text,custom_column(customProperty),parent","");
// JS: task.start_date, task.duration, task.text, task.customProperty, task.parent
~~~


## Шаг 7. Обновление данных в базе данных

<div>

<p>

Далее важно включить возможность сохранения изменений, сделанных в диаграмме Gantt, обратно в базу данных. Для этого будет использоваться вспомогательная библиотека [dataProcessor](api/method/dataprocessor.md). Процесс включает инициализацию DataProcessor и его привязку к экземпляру dhtmlxGantt.

<div>![finger](/img/finger.png) <span>Действуйте следующим образом:</span></div>

<ul>

- Откройте файл <b>myGantt.html</b> и создайте новый экземпляр dhtmlxDataProcessor с помощью команды <code>dataProcessor("data.php")</code>.
- Свяжите объект dhtmlxDataProcessor с экземпляром dhtmlxGantt с помощью <code>dp.init(gantt)</code>.

**myGantt.html**
~~~js
gantt.init("gantt_here");
gantt.load('data.php');
        
var dp="new" gantt.dataProcessor("data.php"); /*!*/ 
dp.init(gantt); /*!*/ 
~~~
</ul>
</p>
</div>

## Логирование ошибок

Если все настроено, но проблемы сохраняются, включение логирования в Gantt поможет выявить их причины.

Сначала убедитесь, что директория, содержащая HTML-файл, имеет права на запись. Затем добавьте эту строку в файл **data.php**:

**data.php**
~~~php
$gantt = new JSONGanttConnector($res);

$gantt->enable_log("log.txt"); /*!*/
~~~

Теперь вы можете проверить файл **log.txt** для просмотра записанной информации.

## Что дальше?

Готово! Теперь у вас есть базовая диаграмма Gantt, способная загружать данные из базы и сохранять изменения обратно.
Далее вы можете настраивать и расширять её под ваши задачи.

Для дальнейшего изучения рекомендуем ознакомиться со следующими статьями:

- [Конфигурация](guides/common-configuration.md)
- [Обработка событий](guides/handling-events.md)
- [Загрузка данных](guides/loading.md)

