const maxSquare = 48;
const maxPlayable = 41;
const minPlayable = 0;
const tk = "taken";
let currentSquare = 0;
let won = false;

const players = [ "player-one",  "player-two"];
let player = 1;
let currentPlayer = players[player-1];

const grid = document.querySelector('.grid');
const squares = createDivs();
const resultDisplay = document.querySelector('#result');
const currentPlayerDisplay = document.getElementById('current-player');

squares.forEach((square, i) => {
    const invalid = "Can't play in square # " + i;

    square.onclick = () => {
        if(won) return true;
        if(!square.classList.contains(tk)){
            if(squares[i+7].classList.contains(tk)){
                currentPlayerDisplay.classList.remove(currentPlayer);
                currentSquare = i;
                if(addClass(square, tk, true)) return true;
                currentPlayerDisplay.textContent =  player;
                currentPlayerDisplay.classList.add(currentPlayer);
            }
            else
                alert(invalid + " yet!");
        }
        else
            alert(invalid);
    }
})

function addClass(div, tk, aP = false){
    div.classList.add(tk);

    if(aP){
        div.classList.add(currentPlayer);
         if(checkForWin()) return true;
        if(player > players.length-1){player=0;}
        currentPlayer = players[++player-1];
    }
}

function createDivs(){

    for(let i = minPlayable; i <= maxSquare; i++){    
        const div = document.createElement('div');
        
        if(i > maxPlayable && i <= maxSquare){ addClass(div, tk); }
 //       else div.textContent = i;

        grid.appendChild(div);
    }
    
    return document.querySelectorAll('.grid div');
}

function checkForWin(){
    if(won) return true;

    console.clear()
    if(won = checkSouth());
    else if(won = checkEastWest());
    else if(won = checkNESW());
    else if(won = checkNWSE());
    else { return false;}
    
    resultDisplay.textContent = "Player " + player + " Wins!";
}

function checkSouth(){
    const connectFour = [currentPlayer + " has " + currentSquare];
    console.log("South");
    return check(south = 7, connectFour, left = false, southOnly = true) ?  true : false;
}

function checkEastWest(){
    const connectFour = [currentPlayer + " has " + currentSquare];
    console.log("EastWest");
    return check(east = 1, connectFour, left = false) ?  true : check(west = -1, connectFour);
}

function checkNESW(){
    const connectFour = [currentPlayer + " has " + currentSquare];
    console.log("NESW");
    return check(nE = -6, connectFour, left = false) ?  true : check(sW = 6, connectFour);
}

function checkNWSE(){
    const connectFour = [currentPlayer + " has " + currentSquare];
    console.log("NWSE");
    return check(sE = 8, connectFour, left = false) ?  true : check(nW = -8, connectFour);
}

function check(direction, connectFour, left = true, southOnly = false){
    for(let c = 1, higher = 1; c <= 4; c++, higher++){
        if((next = currentSquare+(direction*higher)) > maxPlayable || next < minPlayable) return false;

        if( !southOnly && next % 7 == (left ? 6 : 0) ) return false;
    
        if(!squares[next].classList.contains(currentPlayer)) return false;

        connectFour.push(say = currentPlayer + " has " + next);

        console.log(connectFour);

        if(connectFour.length >= 4) return true;
    }
}
