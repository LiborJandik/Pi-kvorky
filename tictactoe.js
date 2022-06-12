const container = document.querySelector("#container");
const boardElements = document.querySelectorAll("#myBoard");
const showWinner = document.querySelector("#winner");
const resetButon = document.querySelector("#resetButton");
const player1Skore = document.querySelector("#player1Score");
const player2Skore = document.querySelector("#player2Score");
const nameButton = document.querySelector("#nameButton");
const dropdown = document.querySelector("#dropdown");
const submitButton = document.querySelector("#submit");
const player1Name = document.querySelector("#player1Name");
const player2Name = document.querySelector("#player2Name")


const randomNameList = ["Kůzle", "Rajče", "Marmeláda", "Slepičí vajíčko", "Vývar", "Majonéza", 
"Krkovice", "Salám", "Osel", "Kozel", "Žirafa", "Pakůň", "Kaktus", "Pu*sy Master 69",
"Lávová lampa", "Karamel", "Jed na krysy", "Taťka Šmoula", "Flek od kávy", "Šalamounova koule", 
"Parní lokomotiva", "Závodní automobilový transportér", "Stresový průjem", "Čarodějnice", 
"Dycky Most", "Crying Emoji", "Šalina", "Paní učitelka z první třídy", "Dramaqueen", "Ropucha",
"Vaječný koňak a jiné lihoviny", "Kníráč", "Drdol", "Koblížek", "Dračice", "Lahůdka", "Kondom"]
let randomName1 = Math.floor(Math.random() * randomNameList.length);
let randomName2 = Math.floor(Math.random() * randomNameList.length);


const Player = (name, shape, value, score) => {
    return {name, shape, value, score}
}

let player1 = Player(randomNameList[randomName1], "X", [], 0);
let player2 = Player(randomNameList[randomName2], "O", [], 0);
player1Skore.innerHTML = player1.name + ": " + player1.score;
player2Skore.innerHTML = player2.name + ": " + player2.score;
let winner = "";


let counter = 0;
nameButton.addEventListener("click", () => {
    if(counter === 0) {
        dropdown.style.display = "block";
        counter = 1;
    } else {
        dropdown.style.display = "none";
        counter = 0;
    }
})

submitButton.addEventListener("click", () => {
    player1.name = player1Name.value;
    player2.name = player2Name.value;
    player1Skore.innerHTML = player1.name + ": " + player1.score;
    player2Skore.innerHTML = player2.name + ": " + player2.score;
    dropdown.style.display = "none";
    counter = 0;
})



const playRound = function() {
    let player = 1;
    for(let i = 0; i < boardElements.length; i++) {
        let element = boardElements[i];
        element.addEventListener("click", () => {
            if(player === 1) {
                if(winner !== "") {return} //end the game, if a player won
                if(element.innerHTML !== "") {return}; //cannot place shape on non-empty spot
                element.innerHTML = player1.shape;
                player1.value.push(element.getAttribute("value"))
                player = 2;
            }else {
                if(winner !== "") {return}
                if(element.innerHTML !== "") {return};
                element.innerHTML = player2.shape;
                player2.value.push(element.getAttribute("value"))
                player = 1;
            }

            resetButon.addEventListener("click", () => {
                element.innerHTML = "";
                showWinner.innerHTML = "AND THE WINNER IS...";
                player1.value = [];
                player2.value = [];
                winner = "";
            })
        chooseWinner();
        })
    }
}

const chooseWinner = function() {
    if(player1.value.includes("1") && player1.value.includes("2") && player1.value.includes("3") ||
    player1.value.includes("1") && player1.value.includes("4") && player1.value.includes("7") ||
    player1.value.includes("1") && player1.value.includes("5") && player1.value.includes("9") ||
    player1.value.includes("2") && player1.value.includes("5") && player1.value.includes("8") ||
    player1.value.includes("3") && player1.value.includes("5") && player1.value.includes("7") ||
    player1.value.includes("3") && player1.value.includes("6") && player1.value.includes("9") ||
    player1.value.includes("4") && player1.value.includes("5") && player1.value.includes("6") ||
    player1.value.includes("7") && player1.value.includes("8") && player1.value.includes("9")) {
        console.log(player1.name +" WON");
        winner = "Player 1";
        player1.score++;
        player1Skore.innerHTML = player1.name + ": " + player1.score;
        showWinner.innerHTML = "AND THE WINNER IS... " + player1.name;
    }else if(player2.value.includes("1") && player2.value.includes("2") && player2.value.includes("3") ||
    player2.value.includes("1") && player2.value.includes("4") && player2.value.includes("7") ||
    player2.value.includes("1") && player2.value.includes("5") && player2.value.includes("9") ||
    player2.value.includes("2") && player2.value.includes("5") && player2.value.includes("8") ||
    player2.value.includes("3") && player2.value.includes("5") && player2.value.includes("7") ||
    player2.value.includes("3") && player2.value.includes("6") && player2.value.includes("9") ||
    player2.value.includes("4") && player2.value.includes("5") && player2.value.includes("6") ||
    player2.value.includes("7") && player2.value.includes("8") && player2.value.includes("9")) {
        console.log(player2.name +" WON");
        winner = "Player 2";
        player2.score++;
        player2Skore.innerHTML = player2.name + ": " + player2.score;
        showWinner.innerHTML = "AND THE WINNER IS... "+ player2.name;
    } else if(player1.value.length === 5 && player2.value.length === 4) {
        winner = "TIE";
        console.log("TIE");
        showWinner.innerHTML = "AND THE WINNER IS... NO ONE"
    }
}


playRound()