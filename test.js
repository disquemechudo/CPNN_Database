//my variabales
var CPNN_data;
var match_data;
var projects = [];
var idea_button;
var match_button;
var goback;
var goback1;
var tag;

//the spreadsheet where I am getting the data
var url = 'https://docs.google.com/spreadsheets/d/1AW-1RVY9xTH04iqrVlmojtlBfpDOCFHUulGVbvReNRo/pubhtml?gid=1759587475&single=true';
var connect_url = 'https://docs.google.com/spreadsheets/d/1KbzS2b5cTt1QXSh416Nd1WYxSLCJ_R5tO-PXMm16ra4/pubhtml?gid=1253544198&single=true';

//Initializing Tabletop and the settings to get the data
    var settings = {
    key: url,            
    callback: gotData,  
    simpleSheet: true   
  }
 
  Tabletop.init(settings);
  

//Defining the data and calling the function that populates it within the constructor function
function gotData(data) {
  CPNN_data = data;
  dataLength = CPNN_data.length 
  // print(data[0].Topics);
    // Look at the data in the console
  loadThem();
}

    var match_settings = {
    key: connect_url,            
    callback: connectData,  
    simpleSheet: true   
  }
 
  Tabletop.init(match_settings);
  

//Defining the data and calling the function that populates it within the constructor function
function connectData(data) {
  match_data = data;
  match_dataLength =  match_data.length;
  //thisMatch();
}





/*function thisMatch(){
    for (var i=0; i < match_dataLength; i++){
    if (match_data[i].Engagement === match_data[i].Engagement2 && match_data[i].Topic === match_data[i].Topic2){
    alert(connected);
    } else {
    alert(not);  
    }
  }
}*/



function setup() {
  noCanvas();
}

//Getting all the data into the constructor function
function loadThem() {

  for (var i=0; i < dataLength; i++){
    
    var p = new Project(CPNN_data[i].Image, CPNN_data[i].Project, CPNN_data[i].URL, CPNN_data[i].Description, CPNN_data[i].Topics, CPNN_data[i].Organization);
    projects[i] = p;
  }
  
  
}

//Calling the functions from the constructor function
function selection() {
    for (var i =0; i < projects.length; i++){
    projects[i].display();
    projects[i].category();
  }
  
//Initializing Isotope AFTER loading the data in the page (so it recognizes it)
  initiso();
}

//Some new info to appear in the page after the intro
function next () {
  selection();
  document.getElementById("intro").style.display = "none";
  var apply_button = createButton("Apply to CPNN");
  apply_button.parent('buttons');
  apply_button.mousePressed(apply);
  var QA_button = createButton("Pitch a Q&A about a project");
  QA_button.parent('buttons');
  QA_button.mousePressed(QA);
  idea_button = createButton("Submit your own crowd-powered news idea!");
  idea_button.parent('buttons');
  idea_button.mousePressed(ideas);
  match_button = createButton("Connect!");
  match_button.parent('buttons');
  match_button.mousePressed(connection);
  nominate_button = createButton("Nominate a project!");
  nominate_button.parent('buttons');
  nominate_button.mousePressed(nomination);
}

//Idea form. Inspiration: http://ilivehere.latimes.com/koreatown/
function ideas(){
  document.getElementById("ideas").style.display = "block";
  idea_button.hide();
  document.getElementById("filters").style.display = "none";
  document.getElementById("tata").style.display = "none";
  goback = createButton("Go back to the projects!");
  goback.parent('buttons');
  goback.mousePressed(again);
}

function connection(){
  document.getElementById("match").style.display = "block";
  match_button.hide();
  document.getElementById("filters").style.display = "none";
  document.getElementById("tata").style.display = "none";
  document.getElementById("ideas").style.display = "none";
  goback1 = createButton("Go back to the projects!");
  goback1.parent('buttons');
  goback1.mousePressed(again2);
}

//Allows to go back to the project page
function again(){
  goback.hide();
  idea_button.show();
  document.getElementById("ideas").style.display = "none";
  document.getElementById("filters").style.display = "block";
  document.getElementById("tata").style.display = "block";
  document.getElementById("this_idea").style.display = "none";
}

function again2(){
  goback1.hide();
  match_button.show();
  document.getElementById("match").style.display = "none";
  document.getElementById("filters").style.display = "block";
  document.getElementById("tata").style.display = "block";
  document.getElementById("this_idea").style.display = "none";
}

//Constructor function (where the magic happens)
function Project(tempI, tempN, tempU, tempP, tempT, tempO) {
  this.img = tempI;
  this.tag = [];
  var tag = this.tag;
  this.url = tempU;
  this.graph = tempP;
  this.name = tempN;
  this.org = tempO;

//split Topics into 
  var topics = tempT;
  topic = split(topics, ",");
  
//now push each element into the "topic" array
  for (var i = 0; i < topic.length; i++) {
    this.tag.push(topic[i]);
  }
  
//Constructor function that creates buttons
    this.category = function() {
  var buttons = [];
  var string = ".";

//Buttons are created from each separate Topic
    for (var i = 0; i < this.tag.length; i++) {
    var res = this.tag[i];
    var other = string.concat(res);
    buttons = createButton(this.tag[i]);
    buttons.parent('filters');
    buttons.addClass('button');
    buttons.attribute("data-filter",other);
    
    }
    
  //getting rid of buttons that repeat themselves: http://stackoverflow.com/a/2822974
    var seen = {};
    $('.button').each(function() {
    var txt = $(this).text();
    if (seen[txt])
        $(this).remove();
    else
        seen[txt] = true;
        });

}
  
  //Constructor function that displays the images, other info from the data
  this.display = function() {
  //var identification = this.name;
  //identification = identification.replace(/ /g, '_');
  //var identification2 = this.project;
  //identification2 = identification.replace(/ /g, '_');
  var eldiv = createDiv(this.name);
  eldiv.parent('tata');
  eldiv.addClass('item');
  var linx = createA(this.url, '');
  linx.parent(eldiv);
  linx.addClass('looks');
  var other_div = createDiv(this.org);
  other_div.parent(linx);
  other_div.addClass('this_div');
  var description = createP(this.graph);
  description.parent(other_div);
  description.addClass('other_div');
  var ask_button = createButton(this.name);
  ask_button.parent(eldiv);
  ask_button.addClass('ask');
  ask_button.mousePressed(pop_it);
  var visual = createImg(this.img);
  visual.parent(other_div);
  visual.addClass('visual');
  var pop_up = createDiv(this.name);
  pop_up.parent(eldiv);
  pop_up.addClass('pop');
  var close_button = createButton("X");
  close_button.parent(pop_up);
  close_button.addClass('close');
  close_button.mousePressed(close_it);
  var tags = createElement("form", "Add tags:");
  tags.parent(pop_up);
  tags.attribute("onsubmit", '""');
  tags.addClass('tags');
  var your_tag = createInput("");
  your_tag.parent(tags);
  your_tag.attribute("type","text");
  your_tag.attribute("name",this.name);
  your_tag.attribute("id", this.name);
  var your_project = createInput(this.name);
  your_project.parent(tags);
  your_project.attribute("type","text");
  your_project.attribute("name",this.project);
  your_project.attribute("id", this.project);
  your_project.hide();
  var tag_button = createButton("Submit");
  tag_button.parent(tags);
  tag_button.addClass('tagButton');
  tag_button.attribute("type","submit");
  tag_button.mousePressed(close_it);
  
  
    function pop_it(){
   pop_up.show();
   $(tags).tagit({
    fieldName: "Tags"
});
  }
  
  function close_it(){
   pop_up.hide();
  }

  //other_div.addClass('other_div');
  //other_div.hide();
  //description.hide();
  
  //Hover that calls functions to replace divs with each other
  eldiv.mouseOver(rollover);
  eldiv.mouseOut(rollout);

  //Adding classes ty topics so they correspond to the buttons
   for (var i = 0; i < this.tag.length; i++) {
    eldiv.addClass(this.tag[i]);
    }
    
  /*for (var j = 0; j < other_div.length; j++) {
    ask_button.parent(other_div[j]);
  }*/
    
  
  //Tried to make all elements consistent
  /*for (var j = 0; j < visual.length; j++) {
  var imgheight = visual[j].height;
  console.log(imgheight);
  other_div[j].style('height',imgheight);
  visual_div[j].style('height',imgheight);
  eldiv[j].style('height',imgheight);
  var imgwidth = visual[j].width;
  other_div[j].style('width',imgwidth);
  visual_div[j].style('width',imgwidth);
  eldiv[j].style('width',imgwidth);
  }*/
  
  //Functions that replace the image div with the paragraph one
  function rollover() {
  visual.style('opacity', '0');
  description.style('opacity','1');
  eldiv.style('color', 'transparent');
  other_div.style('color', 'transparent');
  ask_button.html('Tag it');
  ask_button.style('opacity','1');
  }
  
  function rollout (){
  visual.style('opacity', '1');
  description.style('opacity','0');
  eldiv.style('color', 'black');
  other_div.style('color', 'black');
  ask_button.style('opacity','0');
  }
  
    function postTagsToGoogle(){
      var id_tag = "#";
      var id_name = this.name;
      var id_name2 = this.project;
      var tag_id = id_tag.concat(id_name);
      var project_id = id_tag.concat(id_name2);
      var project = $(project_id).val();
      var tags = $(tag_id).val();
      
        if ((project !== null) && (tags !== null)) {
            $.ajax({
                url: "https://docs.google.com/forms/d/1sNRfJ9wcA_UzR5BzTOuH80QL83267K2MiRwUNhz_IDk/formResponse",
                data: {"entry.844101404": project,
                      "entry.750469736": tags},
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function (){
                        $(tag_id).val("");
                        $(project_id).val("");
                        //Success message
                    },
                    200: function (){
                        $(tag_id).val("");
                        $(project_id).val("");
                        //Success message
                    }
                }
            });
        }
        else {
            //Error message
            alert("error");
        }
    }
  
  };

  
}

//Calls the idea madlibs
function awesomeIdea() {
    document.getElementById("ideas").style.display = "none";
    document.getElementById("this_idea").style.display = "block";
    var brief = document.getElementById("brief").value;
    var community = document.getElementById("community").value;
    var location = document.getElementById("location").value;
    var engagement_type = document.getElementById("engagement-type").value;
    var example = document.getElementById("example").value;
    var words = "My idea involves " + brief + " with " + community + " in " + location + ". My community will be able to " 
    + engagement_type + ", like how it was done in " + example + ".";

//Alerts users if they haven't filled all the fields
    if (!brief || !community || !location || !engagement_type || !example) {      
    document.getElementById("this_idea").style.display = "none"; 
    document.getElementById("ideas").style.display = "block";
    alert("You are not done yet!");
    } else {
          document.getElementById('show-idea').innerHTML = words;
    }
}

//Function to resets the form
function resetform() {
  document.getElementById("CPNN-form").reset();
}

//Functions that are called to open pop-up windows
function share(){
    window.open("https://groups.google.com/a/propublica.org/forum/#!newtopic/crowd-powered", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
}

function apply() {
    window.open("http://propub.ca/crowdpowered", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
}

function QA(){
    window.open("https://docs.google.com/forms/d/1i1TR64IQHUVa_dLMqYtj8G7xHn-vxvzipI3K-jBaVA4/viewform", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
}

function nomination(){
    window.open("mailto:ericfrenchmonge@gmail.com?Subject=I%20nominate%20");
}


    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    function postHelpToGoogle(){
      var help = $('#help').val();
      var engagement = $('#engagement').val();
      var topic = $('#topic').val();
      
        if ((help !== null) && (engagement !== null) && (topic !== null)) {
            $.ajax({
                url: "https://docs.google.com/forms/d/1WPgvX2I7DWU__bLRgB2lEdMGb0CAn8rFcDoVTEQgRLM/formResponse",
                data: {"entry.1610230995": help,
                      "entry.910619174": engagement,
                      "entry.513895682": topic},
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function (){
                        $('#help').val("");
                        $('#engagement').val("");
                        $('#topic').val("");
                        //Success message
                        helping(); 
                    },
                    200: function (){
                        $('#help').val("");
                        $('#engagement').val("");
                        $('#topic').val("");
                        //Success Message
                    }
                }
            });
        }
        else {
            //Error message
            alert("error");
        }
    }

    function postOfferToGoogle(){
      var help2 = $('#help2').val();
      var engagement2 = $('#engagement2').val();
      var topic2 = $('#topic2').val();
      var your_name = $('#your_name').val();
      var email = $('#email').val();
      
        if ((help2 !== null) && (engagement2 !== null) && (topic2 !== null)) {
            $.ajax({
                url: "https://docs.google.com/forms/d/1WPgvX2I7DWU__bLRgB2lEdMGb0CAn8rFcDoVTEQgRLM/formResponse",
                data: {"entry.2003593002": help2,
                      "entry.743980922": engagement2,
                      "entry.667103439": topic2},
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function (){
                         $('#help2').val("");
                        $('#engagement2').val("");
                        $('#topic2').val("");
                        //Success message
                        offer();
          
                    },
                    200: function (){
                         $('#help2').val("");
                        $('#engagement2').val("");
                        $('#topic2').val("");
                        //Success Message
                    }
                }
            });
        }
        else {
            //Error message
            alert("error");
        }
    }
  
     function postPersonalToGoogle(){
      var name = $('#your_name').val();
      var email = $('#email').val();
      
        if ((name !== null) && (email !== null) && (validateEmail(email))) {
            $.ajax({
                url: "https://docs.google.com/forms/d/1WPgvX2I7DWU__bLRgB2lEdMGb0CAn8rFcDoVTEQgRLM/formResponse",
                data: {"entry.483413932": name,
                      "entry.2110360915": email},
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function (){
                        $('#email').val("");
                         $('#your_name').val("");
                        //Success message
                        message();
          
                    },
                    200: function (){
                        $('#email').val("");
                         $('#your_name').val("");
                        //Success Message
                    }
                }
            });
        }
        else {
            //Error message
            alert("error");
        }
    }
    
 $(document).on('click', '#submit_help', function() {
                          help();
                           }); 


function helping(){
  document.getElementById("helping").style.display = "none";
  document.getElementById("offer").style.display = "block";
}

function offer(){
  document.getElementById("offer").style.display = "none";
  document.getElementById("personal").style.display = "block";
}

function message(){
  document.getElementById("personal").style.display = "none";
  var message = createP("Thank you for participating. You will get an e-mail if there is a match.");
  message.parent('match');
  message.style('text-align', 'center');
}


