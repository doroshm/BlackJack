let bank = 10000;
let bet = 0;

window.onload = () => {
    document.getElementById("spBet").innerText = "$" + bet;
    document.getElementById("spBank").innerText = "$" + bank;
}

function addBet(x) {
    if (bank - x >= 0) {
        bet += x;
        bank -= x;
        document.getElementById("spBet").innerText = "$" + bet;
        document.getElementById("spBank").innerText = "$" + bank;
    }
}

function allin() {
    bet += bank;
    bank -= bank;
    document.getElementById("spBet").innerText = "$" + bet;
    document.getElementById("spBank").innerText = "$" + bank;
}

function clearBet() {
    bank += bet;
    bet = 0;
    document.getElementById("spBet").innerText = "$" + bet;
    document.getElementById("spBank").innerText = "$" + bank;
}