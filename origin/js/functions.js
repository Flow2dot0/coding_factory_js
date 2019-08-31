//GESTION DU JOUR ET DE LA NUIT
function switchDay()
{
    var night = false;
    window.setInterval(function() {
        if(night == false)
        {
            document.getElementById("game").classList.remove("day");
            document.getElementById("game").classList.add("night");
            night = true;
        }
        else if(night == true)
        {
            document.getElementById("game").classList.remove("night");
            document.getElementById("game").classList.add("day");
            night = false;
        }
    },45000);
}
//ENTRER NOM DE JOUEUR
function enterName() {
    let playerName = prompt("VEUILLEZ RENSEIGNER UN PSEUDO POUR COMMENCER LA PARTIE : ");
    if(playerName == null || playerName == '') {
        enterName();
    }
    else
    {
        Player.name = playerName;
        console.log(Player);
    }
}
//GENERER NOM DE MONSTRE
function generateMonster() {
    let name = ["Pikachu", "Roundoudou", "Dracofeu", "Mew", "Leviathor", "Tortank"];
    let suffix = ["démoniaque", "enragé", "mutant", "vicieux", "pervers"];

    Monster.name =  name[Math.floor(Math.random() * (name.length))] + " " + suffix[Math.floor(Math.random() * (suffix.length))];
    return name[Math.floor(Math.random() * (name.length))] + " " + suffix[Math.floor(Math.random() * (suffix.length))];
}
//COMBAT
function battle()
{
        generateMonster();

        firstAttack();
        if(firstAttack() == true)
        {
            //Tant que le player n'est pas mort
            while(Player.hp > 0)
            {
                //Attaquer le monstre
                window.setTimeout("attackPlayerVsTarget()",2000);
                //Si le monstre est en vie
                if(Monster.hp > 0)
                {
                    //Attaquer le player
                    window.setTimeout("attackTargetVsPlayer()",2000);
                    //Si le player meurt
                    if(Player.hp <= 0)
                    {
                        window.setTimeout("looseBattle()",2000);
                        window.setTimeout(function() {
                            document.getElementById("fightPlayer").classList.add("display");
                            document.getElementById("playerBar").classList.add("display");
                            document.getElementById("restart").classList.remove("display");
                            document.getElementById("goaventure").classList.add("display");
                        },2000);
                        document.getElementById("restart").addEventListener("click", function() {
                            script();
                        },50);
                        break;
                    }
                    //Si le monstre meurt
                    else
                    {
                        window.setTimeout("winBattle()",2000);
                        window.setTimeout(function() {
                            document.getElementById("fightMonster").classList.add("display");
                            document.getElementById("monsterBar").classList.add("display");
                        },2000);
                        break;
                    }  
                }
            }
        }
        else if(firstAttack() == false)
        {
            //Tant que le joueur n'est pas mort
            while(Player.hp > 0)
            {
                //Attaquer le player
                window.setTimeout("attackTargetVsPlayer()",1000);
                //Si le player est en vie
                if(Player.hp > 0)
                {
                    //Attaquer le monstre
                    window.setTimeout("attackPlayerVsTarget()",1000);
                    //Si le player meurt
                    if(Player.hp <= 0)
                    {
                        window.setTimeout("looseBattle()",2000);
                        window.setTimeout(function() {
                            document.getElementById("fightPlayer").classList.add("display");
                            document.getElementById("playerBar").classList.add("display");
                            document.getElementById("restart").classList.remove("display");
                            document.getElementById("goaventure").classList.add("display");
                        },2000);
                        document.getElementById("restart").addEventListener("click", function() {
                            script();
                        },50);
                        break;
                    }
                    //Si le monstre meurt
                    else
                    {
                        window.setTimeout("winBattle()",1000);
                        window.setTimeout(function() {
                            document.getElementById("fightMonster").classList.add("display");
                            document.getElementById("monsterBar").classList.add("display");
                        },2000);
                        break;
                    }
                    
                }

            }
        }
        window.setTimeout(function() {
            document.getElementById("goaventure").classList.add("display");
            document.getElementById("goshop").classList.remove("display");
        },2000);
}
//JOUEUR ATTAQUE MONSTRE
function attackPlayerVsTarget()
{
    document.getElementById('box').innerHTML = '<p>' + Player.name + " attaque " + Monster.name + " et lui inflige " + Player.strength + " points de dégats </p>";
    Monster.hp = Monster.hp - Player.strength;
    document.getElementById('box').innerHTML += '<p>' + Monster.name + " perds " + Player.strength + " de points de vie, " + Monster.hp + " points de vie restants </p>";
}
//MONSTRE ATTAQUE JOUEUR
function attackTargetVsPlayer()
{
    document.getElementById('box').innerHTML += '<p>' + Monster.name + " attaque " + Player.name + " et lui inflige " + Monster.strength + " points de dégats </p>";
    Player.hp = Player.hp - Monster.strength;
    document.getElementById('box').innerHTML += '<p>' + Player.name + " perds " + Monster.strength + " de points de vie, " + Player.hp + " points de vie restants </p>";
}
//JOUEUR GAGNE
function winBattle()
{
    document.getElementById('box').innerHTML += '<p>Félicitations ! ' + Player.name + " a remporté la victoire. Butin remporté : </p>";
    highscore++;
    loot();
    return true;
}
//JOUEUR PERDS
function looseBattle()
{
    document.getElementById('box').innerHTML = '<p>Défaite ! vous avez été vaincu par ' + Monster.name + "</p>";
    endGame();
    return true;
}


/*************************
 *                       *
 *  Start Page           *
 *                       *
 *************************/


if(switch_page){
    clearTimeout(switch_page);
}
switch_page = setTimeout(function(){
    if(player.name == null)
    {
        document.getElementById("startlogo").classList.remove("display");
        document.getElementById("startText").classList.add("display");
    }

},16500);

document.addEventListener("keypress", function() {
    if(player.name == null) {
        start();
        document.getElementById("startPage").remove();
        document.getElementById("start").classList.remove("display");
    } 

})
document.removeEventListener("keypress", function(){ return; });




/*************************
 *                       *
 *  AVENTURE             *
 *                       *
 *************************/








//QUI ATTAQUE EN PREMIER
function firstAttack() {
    if(Player.agility / 100 > Math.random().toFixed(2)) {
        return true;
    }
    else{
        return false;
    }
}

// Fonction loot
function loot(){  
    Player.po += 3;
    dropPourcentage();
    if(dropPourcentage() == true){
     Player.inventory.monsterHpPotion + 1;
      }
 }
 
// Le pourcentage de chance pour drop une potion de soin
 
function dropPourcentage() {
     var resultPlayer = 0.1;
     var resultIA = Math.random();
     if(resultPlayer > resultIA ) {
         return true;
     }
     else{
         return false;
     }
 }

 
 /*************************
 *                       *
 * Fonction d'achat      *
 *                       *
 *************************/

 // Génération des events Listener en fonction des items
 for(let i = 1; i <= 4; i++){
     console.log("ok");
     document.getElementById("buy"+i).addEventListener("click", function(){
        if(!playerIsInventory)
        {
            buy(i);
        }
        playerIsInventory = false;
     })
 }



// Acheter une potion

function buy (id) {

    if (id == 1 && player.po >= shop.strengthPotion.price){
       message("Vous avez acheté une potion de force");
       player.po = player.po - shop.strengthPotion.price;
       player.inventory.strengthPotion += 1;
   }else if (id == 2 && player.po >= shop.agilityPotion.price){
       message("Vous avez acheté une potion de force");
       player.po = player.po - shop.agilityPotion.price;
       player.inventory.agilityPotion += 1;
   }else if (id == 3 && player.po >= shop.staminaPotion.price){
       message(" Vous avez acheté une potion d'endurance");
       player.po = player.po - shop.staminaPotion.price;
       player.inventory.staminaPotion += 1;
   }else if (id == 4 && player.po >= shop.hpPotion.price){
       message(" Vous avez acheté une potion de vie");
       player.po = player.po - shop.hpPotion.price;
       player.inventory.hpPotion += 1; 
   }else {
       message("Vous n'avez pas assez de pièces d'or");
   }
   
   }
   
   
   document.getElementById("goshop").addEventListener("click", function() {
       isAttack = false;
       document.getElementById("leaveshop").disabled = false;
       document.getElementById("shop").classList.remove("display");
       document.getElementById("goshop").disabled = true;
   
       document.getElementById("imgPlayer").classList.add("display");
       document.getElementById("imgPlayerCenter").classList.add("display");
       document.getElementById("imgDragonCenter").classList.add("display");
       document.getElementById("imgDragon").classList.add("display");
   
       updateBackground("assets/tavern.jpg");
   
   })
   

/*************************
 *                       *
 * Fonction inventaire   *
 *                       *
 *************************/


 // Utiliser une potion
// On reprend la clé du modèle

function useItem(potion){

    if(potion == undefined) {
        return false;
    }

    if(potion == "strengthPotion" && player.inventory.strengthPotion > 0) {
        player.strength++;
        player.inventory.strengthPotion = player.inventory.strengthPotion - 1;
        message("<p>Ta force a été augmenté de 1</p><p>Tu as dorénavant " + player.strength +" de force</p>");
    }else if(potion == "agilityPotion" && player.inventory.agilityPotion > 0) {
        player.agility++;
        player.inventory.agilityPotion = player.inventory.agilityPotion - 1;
        message("<p>Ton agilité a été augmenté de 1</p><p>Tu as dorénavant " + player.agility +" d'agilité</p>");
    }else if(potion == "staminaPotion" && player.inventory.staminaPotion > 0) {
        player.stamina++;
        player.inventory.staminaPotion = player.inventory.staminaPotion - 1;
        message("<p>Ton endurance a été augmenté de 1</p><p>Tu as dorénavant " + player.stamina +" d'endurance</p>");
    }else if(potion == "hpPotion" && player.inventory.hpPotion > 0 || 
     potion ==  "monsterHpPotion" && player.inventory.monsterHpPotion > 0) {
        if(player.hp + 20 > player.stamina || player.hp + 10 > player.stamina) {
            player.hp = player.stamina;
        }else {
            if(potion == "hpPotion")
            {
                player.hp += 20;
            }else {
                player.hp += 10;
            }
        }
        player.inventory.hpPotion = player.inventory.hpPotion - 1 ;
        message("<p>Ta santé a été augmenté de 20 points</p><p>Tu as dorénavant " + player.hp +" point(s) de santé</p>");
    }else {
        message("<p>Tu n'as pas assez de " + potion + "</p>");
    }

    document.getElementById("nbItem1").innerHTML = player.inventory.strengthPotion;
    document.getElementById("nbItem2").innerHTML = player.inventory.agilityPotion;
    document.getElementById("nbItem3").innerHTML = player.inventory.staminaPotion;
    document.getElementById("nbItem4").innerHTML = player.inventory.hpPotion;
}

// On génère les clicks des items

for(let i = 1; i <= 4; i++){
    
    let potion;
    switch(i) {
        case 1:
        potion = "strengthPotion";
        document.getElementById("nbItem1").innerHTML = player.inventory.strengthPotion;
        break;
        case 2:
        potion = "agilityPotion";
        document.getElementById("nbItem2").innerHTML = player.inventory.agilityPotion;
        break;
        case 3:
        potion = "staminaPotion";
        document.getElementById("nbItem3").innerHTML = player.inventory.staminaPotion;
        break;
        case 4:
        potion = "hpPotion";
        document.getElementById("nbItem4").innerHTML = player.inventory.hpPotion;
    }

     document.getElementById("item"+i).addEventListener("click", function(){
         console.log(playerIsInventory);
        if(playerIsInventory)
        {
            useItem(potion);
        }
     })
 }

/*************************
 *                       *
 * Fonction restart & hs *
 *                       *
 *************************/


// END GAME

function endGame() {
    updateBackground();
    scoring[scoring.length] = [];
    scoring[scoring.length - 1]["name"] = player.name;
    scoring[scoring.length - 1]["score"] = highscore;

    document.getElementById("ff").classList.add("display");  
    document.getElementById("scoring").classList.remove("display");
    document.getElementById("game").style.backgroundColor = "white";



    // Insérer la mise en page du score
    document.getElementById("list").innerHTML += "<li>"+player.name+" a tué "+highscore+" monstres";

    message("<p>Tu as perdu brave héro</p><p>Tu as " + highscore + " de points de score.<p>Ta mémoire sera gravé dans le Panthéon</p>")
}

// Restart

 document.getElementById("restart").addEventListener('click', function(){
    player = params;
    monster = paramsMonster;
    isAttack = true;
    document.getElementById("game").style.background = "url(assets/day_battle.png)";

    document.getElementById("ff").classList.remove("display");
    document.getElementById("imgDragon").classList.remove("display");
    document.getElementById("scoring").classList.add("display");

    start();
});

/*************************
 *                       *
 * Utilitaire            *
 *                       *
 *************************/

// Afficher un message dans la message box
function message(text) {
    let timer;
    if(timer){
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
    document.getElementById('box').innerHTML = '';
    }, 3000);

    document.getElementById('box').innerHTML += text;
}

function timerFunction() {
    let timer;
    if(timer){
        clearTimeout(timer);
    }
    timer = setTimeout(abc, 3000);
}
