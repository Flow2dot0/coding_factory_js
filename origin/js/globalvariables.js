
//OBJET PLAYER
var newPlayer = {
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
var Player = newPlayer;
//OBJET MONSTER
var newMonster = {
    name: null,
    strength: 5,
    stamina: 7,
    hp: 7
}
var Monster = newMonster;
//OBJET SHOP
var Shop = {
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
//TABLEAU DES SCORES
var scoring = [];
//COMPTEUR POUR LE TABLEAU DES SCORES (BEST SCORE1 > BEST SCORE2 > .. )
var highscore = 0;

