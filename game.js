//     ______          ___                ______           __
//   / ________  ____/ (_____  ____ _   / ________ ______/ /_____  _______  __
//  / /   / __ \/ __  / / __ \/ __ `/  / /_  / __ `/ ___/ __/ __ \/ ___/ / / /
// / /___/ /_/ / /_/ / / / / / /_/ /  / __/ / /_/ / /__/ /_/ /_/ / /  / /_/ /
// \____/\____/\__,_/_/_/ /_/\__, /  /_/    \__,_/\___/\__/\____/_/   \__, /
//                          /____/                                   /____/

/*************************
 *                       *
 *  Variables & Objets   *
 *                       *
 *************************/

var isAttack = true; // Bloquer le changement de background lorsqu'on est pas en aventure

const params = {
    name : null,
    strength: 10,
    agility: 10,
    stamina: 100,
    hp: 100,
    po: 0,
    inventory: {
        strengthPotion: 0,
        agilityPotion: 0,
        staminaPotion: 0,
        hpPotion: 0,
        monsterHpPotion: 0
    }
};

var player = params;

const paramsMonster = {
    name: null,
    strength: 5,
    stamina: 7,
    hp: 7
}

var monster = paramsMonster;


var shop = {
    strengthPotion: {
        price: 2,
        strength: 1
    },
    agilityPotion: {
        price: 2,
        agility: 1
},
    staminaPotion: {
        price: 2,
        stamina: 1
    },
    hpPotion: {
        price: 5,
        hp: 20
    }
};


var switch_page; // passation intro --> aventure

var playerIsInventory = false; // Bloqué achat lorsque joueur est dans son inventaire

var night = false;
var timer;
var highscore = 0;

var scoring = [];

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

// Introduction
function start () {
    let insert = prompt("Entrez votre nom pour debuter la partie .");
    if(insert == null || insert == ''){
        start();
    }
    else {
        player.name = insert;
        console.log(player.name);
        timer = setInterval(function(){
            if(night == true) {
                night = false;
            }else {
                night = true;
            }
        
            if(isAttack == true) {
                updateBackground(night);
            }
        
        }, 45000);
        //on lancera la grosse fonction aventure
    }
}


/*************************
 *                       *
 *  Gestion de la nuit   *
 *                       *
 *************************/



if(timer){
    clearInterval(timer);
}

function updateBackground(variable) {
    if(isAttack == true){
        if(variable) {
            document.getElementById("game").style.background = "url(assets/night_battle.jpg)";
        }else {
            document.getElementById("game").style.background = "url(assets/day_battle.png)";
        }
    }else {
        document.getElementById("game").style.background = "url("+variable+")";
    }
}

/*************************
 *                       *
 *  AVENTURE             *
 *                       *
 *************************/


function generateMonster() {
    let name = ["Rat", "Loup", "Tauren", "Aigle", "Ananas", "Cactus"];
    let suffix = ["de la nuit", "mutant", "affamé", "assassin"];

    

    console.log(Math.floor(Math.random() * (name.length) + 1));
    console.log(Math.floor(Math.random() * (suffix.length)) + 1);

    monster.name =  name[Math.floor(Math.random() * (name.length))] + " " + suffix[Math.floor(Math.random() * (suffix.length))];
    return name[Math.floor(Math.random() * (name.length))] + " " + suffix[Math.floor(Math.random() * (suffix.length))];
}

// Fonction attaquer
function attack(player, target) {
    
    var strengthWinMonster = monster.strength;
    var hpWinMonster = monster.hp;

    

    firstAttack(player);
    generateMonster();
    var monsterStrength;
    if(night == true) {
        monsterStrength = target.strength + 1; 
    }else {
        monsterStrength = target.strength;
    }

    console.log(monsterStrength)

    var transition;
    if(transition){
        clearInterval(transition);
    }


    if(firstAttack(player) == true)
    {

        if(player.hp > 0) {

            if(target.hp > 0)
            {
                var attackPlayerVsTarget = '<p>' + player.name + " attaque " + target.name + " et lui inflige " + player.strength + " points de dégats </p>";
                message(attackPlayerVsTarget);

                target.hp = target.hp - player.strength;

                var textTargetVsPlayer = '<p>' + target.name + " perds " + player.strength + " de points de vie, " + target.hp + " points de vie restants </p>";
                message(textTargetVsPlayer);
                
                if(target.hp > 0) {

                    var attackTargetVsPlayer = '<p>' + target.name + " attaque " + player.name + " et lui inflige " + target.strength + " points de dégats </p>";
                    message(attackTargetVsPlayer);

                    player.hp = player.hp - target.strength;

                    var textPlayerVsTarget = '<p>' + player.name + " perds " + target.strength + " de points de vie, " + player.hp + " points de vie restants </p>";
                    message(textPlayerVsTarget);
                }
                else if(target.hp <= 0) {
                    var victory = '<p>Félicitations ! ' + player.name + " a remporté la victoire. Butin remporté : </p>";
                    message(victory);
                    document.getElementById("imgDragon").classList.add("display");
                    highscore++;
                    loot();
                    monster.strength = strengthWinMonster;
                    monster.hp = hpWinMonster;
                    document.getElementById("goshop").disabled = false;

                }       
                else if(player.hp <= 0) {
                    var gameover = '<p>Défaite ! vous avez été vaincu par ' + target.name + "</p>";
                    message(gameover);
                    document.getElementById("imgPlayer").classList.add("display");
                    endGame();
                }
            }
        }
    }
    else if(firstAttack(player) == false)
    {
        if(player.hp > 0) {
            if(target.hp >= 0)
            {
                var attackTargetVsPlayer = '<p>' + target.name + " attaque " + player.name + " et lui inflige " + target.strength + " points de dégats</p>";
                message(attackTargetVsPlayer);

                player.hp = player.hp - target.strength;

                var textPlayerVsTarget = '<p>' + player.name + " perds " + target.strength + " de points de vie, " + player.hp + " points de vie restants</p>";
                message(textPlayerVsTarget);

                if(target.hp > 0) {
                    var attackPlayerVsTarget = '<p>' + player.name + " attaque " + target.name + " et lui inflige " + monsterStrength + " points de dégats</p>";
                    message(attackPlayerVsTarget);

                    target.hp = target.hp - monsterStrength;

                    var textTargetVsPlayer = '<p>' + target.name + " perds " + monsterStrength + " de points de vie, " + target.hp + " points de vie restants</p>";
                    message(textTargetVsPlayer);
                    
                }
                else if(target.hp <= 0) {
                    var victory = '<p>' + "Félicitations ! " + player.name + " a remporté la victoire. Butin remporté :</p>";
                    message(victory);
                    highscore++;
                    monster.strength = strengthWinMonster;
                    monster.hp = hpWinMonster;
                    loot();

                }       
                else {
                    var gameover = '<p> + "Défaite ! vous avez été vaincu par ' + target.name + '</p>';
                    message(gameover);
                    endGame();

                }
            }
        }
    }
    target.hp = target.stamina;
}


// Qui attaque le premier ? (fonction)
function firstAttack(player) {
    let random = Math.random();
    if(player.agility / 100 < random.toFixed(2)) {
        return true;
    }
    else{
        return false;
    }
}

// Fonction loot
function loot(){  
    player.po += 3;
    dropPourcentage();
    if(dropPourcentage() == true){
     player.inventory.monsterHpPotion + 1;
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

 // Bouton pour aller à l'aventure
document.getElementById("goaventure").addEventListener("click", function() {
    document.getElementById("fight").classList.remove("display");
    document.getElementById("inventory").classList.add("display");
    document.getElementById("shop").classList.add("display");

    document.getElementById("imgPlayer").classList.remove("display");
    document.getElementById("imgDragon").classList.remove("display");
    playerIsInventory = false;



    if(night) {
        document.getElementById("game").style.background = "url(assets/night_battle.jpg)";
    }else {
        document.getElementById("game").style.background = "url(assets/day_battle.png)";
    }
})



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

 document.getElementById("fightMonster").addEventListener("click", function() {
     attack(player, monster);
     playerIsInventory = false;

 })

 // Bouton 
 document.getElementById("leaveshop").addEventListener("click", function() {
    document.getElementById("goaventure").disabled = false;
    document.getElementById("inventory").classList.remove("display");
    document.getElementById("leaveshop").disabled = true;
    document.getElementById("shop").classList.add("display");
    playerIsInventory = true;



    document.getElementById("nbItem1").innerHTML = player.inventory.strengthPotion;
    document.getElementById("nbItem2").innerHTML = player.inventory.agilityPotion;
    document.getElementById("nbItem3").innerHTML = player.inventory.staminaPotion;
    document.getElementById("nbItem4").innerHTML = player.inventory.hpPotion;

})

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
    isAttack = false;
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
