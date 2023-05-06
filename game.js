let winSound = new Audio("Sounds/win.mp3");
let lossSound = new Audio("Sounds/loss.mp3");
let tieSound = new Audio("Sounds/tie.mp3");
let clickSound = new Audio("Sounds/click.mp3");
let backgroundMusic = new Audio("Sounds/backgroundMusic.mp3");
backgroundMusic.loop = true;

let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let dealerCards = [];

let hidden;
let deck = [];

function load() {
    if (bet == 0) {
        alert("Make a bet!");
        return;
    }
    document.getElementById("bet").className = "hidden";
    document.getElementById("game").className = "game";
    document.getElementById("deal").disabled = true;
    buildDeck();
    shuffleDeck();
    document.getElementById("stay").disabled = false;
    document.getElementById("hit").disabled = false;
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame() {
    hidden = deck.pop();
    dealerCards.push(hidden);
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    while (dealerSum < 17) {
        let card = deck.pop();
        dealerCards.push(card);
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        DealerReduceAce();
    }

    let img = document.createElement("img");
    img.src = "Cards/" + dealerCards[1] + ".png";
    document.getElementById("dealer-cards").append(img);
    document.getElementById("dealer-sum").innerText = getValue(dealerCards[1]);

    for (let i = 0; i < 2; i++) {
        let img = document.createElement("img");
        let card = deck.pop();
        img.src = "Cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("player-cards").append(img);
        PlayerReduceAce();
        document.getElementById("player-sum").innerText = yourSum;
    }

    if (yourSum == 21) {
        stay();
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "Cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if (yourSum > 21) {
        let currentYourSum = yourSum;
        PlayerReduceAce();
        if (currentYourSum == yourSum || yourSum == 21) {
            stay();
        }
    } else if (yourSum == 21) {
        stay();
    }

    document.getElementById("player-sum").innerText = yourSum;
}

function stay() {
    document.getElementById("hidden").src = "Cards/" + hidden + ".png";
    for (let i = 2; i < dealerCards.length; i++) {
        let img = document.createElement("img");
        img.src = "Cards/" + dealerCards[i] + ".png";
        document.getElementById("dealer-cards").append(img);
    }

    let messege = "";
    if (yourSum > 21) {
        messege = "You Lose!";
        loss();
    } else if (dealerSum > 21) {
        messege = "You Win!";
        win();
    } else if (yourSum == dealerSum) {
        messege = "Tie!";
        tie();
    } else if (yourSum > dealerSum) {
        messege = "You Win!";
        win();
    } else if (yourSum < dealerSum) {
        messege = "You Lose!";
        loss();
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = yourSum;
    document.getElementById("results").innerText = messege;

    document.getElementById("stay").disabled = true;
    document.getElementById("hit").disabled = true;

    document.getElementById("reset").disabled = false;
    document.getElementById("reset").addEventListener("click", reset);
}

function win() {
    winSound.volume = 0.2;
    winSound.play();
    bet *= 2;
    bank += bet;
    bet = 0;
    document.getElementById("spBank").innerText = "$" + bank;
    document.getElementById("spBet").innerText = "$" + bet;
}

function loss() {
    lossSound.volume = 0.2;
    lossSound.play();
    bet = 0;
    document.getElementById("spBet").innerText = "$" + bet;
}

function tie() {
    tieSound.play();
    bank += bet;
    bet = 0;
    document.getElementById("spBank").innerText = "$" + bank;
    document.getElementById("spBet").innerText = "$" + bet;
}

function reset() {
    dealerSum = 0;
    yourSum = 0;

    dealerAceCount = 0;
    yourAceCount = 0;

    dealerCards = [];

    hidden;
    deck = [];

    document.getElementById("dealer-sum").innerText = "";
    document.getElementById("player-sum").innerText = "";
    document.getElementById("results").innerText = "";

    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("player-cards").innerHTML = "";

    let img = document.createElement("img");
    img.src = "Cards/BACK.png";
    img.id = "hidden";
    document.getElementById("dealer-cards").append(img);

    document.getElementById("deal").disabled = false;
    document.getElementById("reset").disabled = true;
    document.getElementById("game").className = "hidden";
    document.getElementById("bet").className = "bet";
}

function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function PlayerReduceAce() {
    while (yourSum > 21 && yourAceCount > 0) {
        yourSum -= 10;
        yourAceCount -= 1;
    }
}

function DealerReduceAce() {
    while (dealerSum > 21 && dealerAceCount > 0) {
        dealerSum -= 10;
        dealerAceCount -= 1;
    }
}

function Music() {
    backgroundMusic.volume = 0.1;
    backgroundMusic.play();
}

function Click() {
    clickSound.volume = 0.3;
    clickSound.play();
}