var cards = [];
var x;
var totalpot;
var userbet;
var previousbet = 0;
var playerswinnings = 100;
var preivouswinnings = 0;

function reloadPage(){
    document.location.reload();
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
function setupcards(){
    for(x = 0; x < 4; x++){
        cards[x] = Math.floor(Math.random() * 13);

    }
}
function sortCard(number, cardnumber){
    if(cards[number] == 0 || cards[number] == 1){
        document.getElementById(cardnumber).innerHTML = "ACE";
    }else if(cards[number] == 11){
        document.getElementById(cardnumber).innerHTML = "Jack";
    } else if(cards[number] == 12){
        document.getElementById(cardnumber).innerHTML = "Queen";
    } else if(cards[number] == 13){
        document.getElementById(cardnumber).innerHTML = "King";
    } else {
        document.getElementById(cardnumber).innerHTML = cards[number];
    }
}
function setcard1(){
    setupcards();
    sortCard(0, "card1text");
}
function setcard2(){
    sortCard(1, "card2text");
}
function setcard3(){
    sortCard(2, "card3text");
}
function setcard4(){
    sortCard(3, "card4text");
}
function setCards(){
    setcard1();
    setcard2();
    setcard3();
    setcard4();
    document.getElementById('card4text').style.display = "none";
    document.getElementById("thepot").innerHTML = "The Pot: $" + localStorage.getItem("pot");
    document.getElementById("winnings").innerHTML = "Your Winnings: $" + localStorage.getItem("playerswinnings");
}
function showDealercards() {
    document.getElementById('card4text').style.display = "block";
    document.getElementById('card4text').style.marginTop = "-20px";
    sleep(1000);
    rules(cards[0], cards[1]);
    rules(cards[2], cards[3]);
    if(checkifBust(cards[0], cards[1]) == true){
        alert("Player has gone bust, better next time.");
        subtractplayerswinnings();
        clearpot();
        reloadPage();
        return;
    } else if(checkifBust(cards[2], cards[3]) == true){
        alert("Dealer has gone bust, player wins.");
        addtoplayerswinnings();
        clearpot();
        reloadPage();
        return;
    }

    var usertotal = cards[0] + cards[1];
    var dealertotal = cards[2] + cards[3];

    if(usertotal == 21){
        alert("BLACKJACK!!! PLAYER WINS");
        addtoplayerswinnings();
        clearpot();
        reloadPage();
    }
    else if(usertotal < dealertotal){
        alert("Dealer wins");
        subtractplayerswinnings();
        clearpot();
        reloadPage();
    } else {
        alert("You win");
        addtoplayerswinnings();
        clearpot();
        reloadPage();
    }
}
function checkifAce(number){
    if(number == 0){
        return true;
    } else if(number == 1){
        return true;
    } else {
        return false;
    }
}
function checkifRoyal(number){
    if(number > 10){
        return true;
    } else {
        return false;
    }
}
function checkifBust(number1, number2){
    var total = number1 + number2;
    if(total > 21){
        return true;
    }
}

function rules(number1, number2){
    checkifRoyal(number1);
    checkifRoyal(number2);
    checkifAce(number1);
    checkifAce(number2);
}
function clearpot(){
    localStorage.setItem("pot", '0');
    document.getElementById("thepot").innerHTML = "The Pot: $";
}
function addtopot(){
    userbet = document.getElementById("userbet").value;
    calculatepot();
    localStorage.setItem("pot", totalpot);
    document.getElementById("thepot").innerHTML = "The Pot: $" + totalpot;
    previousbet = userbet;
    userbet = 0;
    document.getElementById("userbet").value = "'";
}
function calculatepot(){
    userbet = (parseInt(userbet) + previousbet);
    totalpot = userbet;
}
function addtoplayerswinnings(){
    playerswinnings = playerswinnings + totalpot;
    localStorage.setItem("playerswinnings", playerswinnings);
    document.getElementById("winnings").innerHTML = "Your Winnings: $" + playerswinnings;
    preivouswinnings = playerswinnings;
}
function subtractplayerswinnings(){
    playerswinnings = playerswinnings - totalpot;
    localStorage.setItem("playerswinnings", playerswinnings);
    document.getElementById("winnings").innerHTML = "Your Winnings: $" + playerswinnings;
}
function clearallpots(){
    playerswinnings = 100;
    localStorage.setItem("playerswinnings", playerswinnings);
    localStorage.setItem("pot", totalpot);
    location.reload();
}
