//SCRIPT
switchDay();
//Initie le jour et la nuit
script();
//Lancement du script du programme RPG
function script() {
enterName();
//Insérer son pseudo tant qu'il n'est pas initialisé
//Récupérer le pseudo et initier un nouvel Player avec ce pseudo (newPlayer = Player)

    document.getElementById("goaventure").addEventListener("click", function() {
        document.getElementById("fightPlayer").classList.remove("display");
        document.getElementById("fightMonster").classList.remove("display");
        document.getElementById("playerBar").classList.remove("display");
        document.getElementById("monsterBar").classList.remove("display");
        battle();
    })
    //Afficher le design de la page principale
    
//Log combat win ou loose avec affichage des boutons en conséquence
    document.getElementById("goshop").addEventListener("click", function() {
        document.getElementById('box').innerHTML = ''; // vider le chatbox
        document.getElementById("shop").classList.remove("display"); // afficher la boutique
        document.getElementById("leaveshop").classList.remove("display"); // afficher la boutique
        window.setTimeout(function() {
            document.getElementById("goshop").classList.add("display");
        },50);
    })
//Cliquer sur le bouton aller a la boutique et ouvrir la boutique
    document.getElementById("leaveshop").addEventListener("click", function() {
        document.getElementById("inventory").classList.remove("display");
        window.setTimeout(function() {
            document.getElementById("shop").classList.add("display");
            document.getElementById("goaventure").classList.remove("display");
            document.getElementById("leaveshop").classList.add("display")
        },50);
        document.getElementById("nbItem1").innerHTML = Player.inventory.strengthPotion;
        document.getElementById("nbItem2").innerHTML = Player.inventory.agilityPotion;
        document.getElementById("nbItem3").innerHTML = Player.inventory.staminaPotion;
        document.getElementById("nbItem4").innerHTML = Player.inventory.hpPotion;
    })
//Cliquer sur le bouton ouvrir l'inventaire, refermer la boutique et afficher partir à l'aventure puis cacher ouvrir l'inventaire
    document.getElementById("goaventure").addEventListener("click", function() {
        document.getElementById("leaveshop").classList.add("display");
    })
}