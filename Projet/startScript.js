
function display(id) {    
    if (id == 0) {
        $("#connectDisplayed").hide();
        $("#inscrDisplayed").show();
    }
    if (id == 1) {
        $("#inscrDisplayed").hide();
        $("#connectDisplayed").show();
    }
}
function createAccount() {
    var nomCompte = $("#login").val();
    var motDePasse1 = $("#password").val();
    var motDePasse2 = $("#password2").val();
    var test = checkPassword(motDePasse1, motDePasse2);
    var test2 = checkAccName(nomCompte);
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
    if (acc.length < 4) {
        $("#erreurInfos").html("Le nom de compte doit poss&egraveder au moins 4 lettres.");
        $("#login").addClass("error");
        return false;
    }
}