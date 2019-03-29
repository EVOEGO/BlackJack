var cards = [];
var x;
var pot;
var usersbet;

function currentpot(){
    usersbet = document.getElementById("userbet");
    pot = usersbet * 2;
    document.getElementById("thepot").innerHTML = "The Pot: " + pot;
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
}
function showDealercards() {
    document.getElementById('card4text').style.display = "block";
    sleep(1000);
    rules(cards[0], cards[1]);
    rules(cards[2], cards[3]);
    var usertotal = cards[0] + cards[1];
    var dealertotal = cards[2] + cards[3];

    if(usertotal < dealertotal){
        alert("Dealer wins");
    } else {
        alert("You win");
    }
}
function checkifAce(number){
    if(cards[number] == 0){
        cards[number] = 11;
    } else if(cards[number] == 1){
        cards[number] = 11;
    }
}
function checkifRoyal(number){
    if(cards[number] > 10){
        cards[number] = 10;
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
    checkifBust(number1, number2);
    if(checkifBust(number1, number2) == true){
        alert("You have gone bust");
    }
}
