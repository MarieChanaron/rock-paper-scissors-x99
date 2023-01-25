// All code should be written in this file.

let playerOneMoveOneType,
    playerOneMoveTwoType,
    playerOneMoveThreeType,
    playerTwoMoveOneType,
    playerTwoMoveTwoType,
    playerTwoMoveThreeType,
    playerOneMoveOneValue,
    playerOneMoveTwoValue,
    playerOneMoveThreeValue,
    playerTwoMoveOneValue,
    playerTwoMoveTwoValue,
    playerTwoMoveThreeValue;

let playerOnePoints = 0;
let playerTwoPoints = 0;


function isValidMoveType(moveType) {
    return (moveType === 'rock') || (moveType === 'paper') || (moveType === 'scissors');
}


function isValidMoveValue(moveValue) {
    return (1 <= moveValue) && (moveValue <= 99);
}


function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) {
   
    if (!moveOneType || !moveTwoType || !moveThreeType || !moveOneValue || !moveTwoValue || !moveThreeValue) {
        return;
    }
    if (!isValidMoveType(moveOneType) || !isValidMoveType(moveTwoType) || !isValidMoveType(moveThreeType)) {
        return;
    }  
    if (!isValidMoveValue(moveOneValue) || !isValidMoveValue(moveTwoValue) || !isValidMoveValue(moveThreeValue)) {
        return;
    }
    if (moveOneValue + moveTwoValue + moveThreeValue > 99) {
        return;
    }

    if (player === 'Player One') {
        playerOneMoveOneType = moveOneType;
        playerOneMoveOneValue = moveOneValue;
        playerOneMoveTwoType = moveTwoType;
        playerOneMoveTwoValue = moveTwoValue;
        playerOneMoveThreeType = moveThreeType;
        playerOneMoveThreeValue = moveThreeValue;
    } 
    else if (player === 'Player Two') {
        playerTwoMoveOneType = moveOneType;
        playerTwoMoveOneValue = moveOneValue;
        playerTwoMoveTwoType = moveTwoType;
        playerTwoMoveTwoValue = moveTwoValue;
        playerTwoMoveThreeType = moveThreeType;
        playerTwoMoveThreeValue = moveThreeValue;
    }

}


function getWinner(typeOne, typeTwo, valOne, valTwo) {

    if (!typeOne || !typeTwo || !valOne || !valTwo) {
        return null;
    }

    if (typeOne === typeTwo) {
        if (valOne === valTwo) {
            return 'Tie';
        } else {
            return valOne > valTwo ? 'Player One' : 'Player Two';
        }
    }

    switch (typeOne) {
        case 'rock':
            return typeTwo === 'paper' ? 'Player Two' : 'Player One';
        case 'paper':
            return typeTwo === 'scissors' ? 'Player Two' : 'Player One';
        case 'scissors':
            return typeTwo === 'rock' ? 'Player Two' : 'Player One';
    }
}


function getRoundWinner(round) {
    
    switch (round) {
        case 1:
            return getWinner(playerOneMoveOneType, playerTwoMoveOneType, playerOneMoveOneValue, playerTwoMoveOneValue);
        case 2:
            return getWinner(playerOneMoveTwoType, playerTwoMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoValue);
        case 3:
            return getWinner(playerOneMoveThreeType, playerTwoMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeValue);
        default:
            return null;
    }
    
}


function getGameWinner() {
    
    const winnerRoundOne = getRoundWinner(1);
    const winnerRoundTwo = getRoundWinner(2);
    const winnerRoundThree = getRoundWinner(3);

    if (!winnerRoundOne || !winnerRoundTwo || !winnerRoundThree) {
        return null;
    }

    const countPoints = player => {
        return (winnerRoundOne === player ? 1 : 0) + (winnerRoundTwo === player ? 1 : 0) + (winnerRoundThree === player ? 1 : 0);
    }

    const playerOnePoints = countPoints('Player One'),
          playerTwoPoints = countPoints('Player Two');

    if (playerOnePoints === playerTwoPoints) {
        return 'Tie';
    } else {
        return playerOnePoints > playerTwoPoints ? 'Player One' : 'Player Two';
    }

}


function setComputerMoves() {

    const getType = () => {
        const n = Math.floor(Math.random() * 3);
        switch (n) {
            case 0:
                return 'rock';
            case 1:
                return 'paper';
            case 2:
                return 'scissors';
        }
    }

    const getValue = max => {
        return Math.floor(Math.random() * (max - 1) + 1);
    }

    moveOneType = getType();
    moveOneValue = getValue(97);

    moveTwoType = getType();
    moveTwoValue = getValue(98 - moveOneValue);

    moveThreeType = getType();
    moveThreeValue = 99 - moveOneValue - moveTwoValue;

    setPlayerMoves('Player Two', moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue);

}