var data = 0;
var nbrListes = 0;
function display(id) {    
    if (id == 0) {
        $("#connectDisplayed").hide();
        $("#inscrDisplayed").show();
    }
    if (id ==1) {
        $("#inscrDisplayed").hide();
        $("#connectDisplayed").show();
    }
    if (id == 2) {
        $("#connectDisplayed").hide();
        $("#startButton").hide();
    }
    if (id == 3) {
        $("#listes").empty();
        $("#startButton").show();
    }
}
function createAccount() {
    var nomCompte = $("#login").val();
    var motDePasse1 = $("#password").val();
    var motDePasse2 = $("#password2").val();
    
    var test = checkPassword(motDePasse1, motDePasse2);
    var test2 = checkAccName(nomCompte);
    if (test==true && test2 ==true){
        $.ajax({
            type : "GET",
            url: "http://92.222.69.104:80/todo/create/"+nomCompte+"/"+motDePasse1+ ""
        }).done(function(){
            
        });
    }
}
function connection(){
    var pseudo = $("#pseudo").val();
    var mdp = $("#mdp").val();
    $.ajax({
        type : "GET",
        url: "http://92.222.69.104:80/todo/listes",
        headers : {"login" : pseudo , "password" : mdp}
    }).done(function(d) {
        data = d;
        console.log(data);
        nbrListes = convertList(d);
    });
}
function checkPassword(p1, p2) {
    $("#password").removeClass("error");
    $("#password2").removeClass("error");
    var low = false;
    var up = false;
    var numSymbole = false;  
    if (p1 != p2) {
        $("#password2").addClass("error");
        $("#erreurInfos").text("Confirmez votre mot de passe.");
        return false;
    }
    if (p1.length < 6) {
        return false;
    }
    for (let i = 0; i < p1.length; i++) {
        if (p1[i] >= "A" && p1[i] <= "Z") { 
            up = true;       
        }
        if (p1[i] >= "a" && p1[i] <= "z") {
            low = true;            
        }
        if (p1[i] >= "0" && p1[i] <= "9") {
            numSymbole = true;
        } 
    }
    if (low == false) {
        $("#password2").addClass("error");
        $("#password").addClass("error");
        $("#erreurInfos").html("Le mot de passe doit poss&egraveder au moins une lettre miniscule.");
        return false;
    }
    if (up == false) {
        $("#password2").addClass("error");
        $("#password").addClass("error");
        $("#erreurInfos").html("Le mot de passe doit poss&egraveder au moins une lettre majuscule.");
        return false;
    }
    if (numSymbole == false) {
        $("#password2").addClass("error");
        $("#password").addClass("error");
        $("#erreurInfos").html("Le mot de passe doit poss&egraveder au moins un nombre.");
        return false;
    }
    $("#erreurInfos").html("Compte cr&eacutee !");
    return true;    
}
function checkAccName(acc) {
    $("#login").removeClass("error");
    if (acc.length < 4) {
        $("#erreurInfos").html("Le nom de compte doit poss&egraveder au moins 4 lettres.");
        $("#login").addClass("error");
        return false;
    }
    return true;
}
function convertList (d) {
    display(2);
    var nbrListes = Object.keys(d.todoListes).length;
    $("#listes").append($("<div></div>").attr("id", "listButton"));
    $("#listButton").append($("<button>Se d&eacuteconnecter</button>").attr("onclick", "display(3)"));
    for (let i = 0; i < nbrListes; i++){
        var temp = "liste" + i;
        $("#listes").append($("<div>").attr({"id": "liste"+i+"", "class": "liste"}));
        for (let j=0; j< Object.keys(d.todoListes[i].elements).length + 1;j++){
                if (j==0){
                    $("#"+temp+"").append($("<p>"+d.todoListes[i].name+"</p>").attr("class", "listName"));
                }
                else {
                    $("#" + temp + "").append("<p>"+d.todoListes[i].elements[j-1]+"<img src=\"edit.png\" id=\"edit\"></p>");
                }
        }     
        $("#liste" + i + "").append($("<button>+</button>").attr({"onclick": "newElement("+temp+")", "class": "addElementButton" }));   
    }
    
    $("#listes").after($("<div></div>").attr("id", "newList"));
    $("#newList").append($("<button>Créer une nouvelle liste</button>").attr({ "onclick": "newList()", "id": "create" }));
    $("#newList").append($("<input></input>").attr({ "type": "text", "id": "newListName", "placeholder": "Nom de la nouvelle liste" }));
    return nbrListes;
}

function newList() {
    let temp = "liste" + nbrListes + "";
    if ($("#newListName").val().length == 0) {
        return 1;
    }
    $("#listes").append($("<div></div>").attr({ "id": temp, "class": "liste" }));
    $("#"+temp+"").append($("<p>" + $("#newListName").val() + "</p>").attr("class", "listName"));
    $("#" + temp + "").append($("<button>+</button>").attr({ "onclick": "newElement(" + temp + ")", "class": "addElementButton" })); 
    nbrListes++;
}
function newElement(list) {
    $(list).children("button").before("<p><img src=\"edit.png\" id=\"edit\"></p>");    
}
