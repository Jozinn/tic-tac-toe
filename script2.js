const Board = (player1, player2) => {
    const players = [player1('X', this), player2('O', this)];
    let fields = new Array(9).fill(null);
    const winVectors = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    let currentPlayerId = 0;

    const chechFull = () => {
        emptyFields = fields.filter(field => field == null);
        if (emptyFields.length == 0) return true;
        return false;
    }

    const checkWinner = () => {
        winVectors.forEach(vector => {
            fieldsToCheck = [fields[vector[0]], fields[vector[1]], fields[vector[2]]];
            if (fieldsToCheck.filter(field => field == null).length) {
                return false;
            }

            if (fieldsToCheck[0] == fieldsToCheck[1] && fieldsToCheck[1] == fieldsToCheck[2]) {
                return true;
            }

            return false;
        });
    }

    const play = (position) => {
        this.fields[position] = currentPlayer().marker;
        if (checkWinner()) {
            currentPlayer().score++;
            console.log(`${currentPlayer()} wins`)
            return;
        }

        if (chechFull()) {
            console.log('Draw!');
            fields = fields.map(field => field = null);
            return;
        }

        switchPlayers();
    }

    const currentPlayer = () => {
        return players[currentPlayerId];
    }

    const switchPlayers = () => {
        const otherPlayer = 1 - currentPlayerId;
        this.currentPlayerId = otherPlayer;
    }

    return {fields, winVectors, currentPlayerId, players, play};
}

const Player = (game, marker) => {
    return {game, marker, score}
}

const game = Board(Player, Player);

const boardEl = document.getElementById('board');
boardEl.addEventListener('click', e => {
    e.target.textContent = game.currentPlayer().marker;
    game.play(e.target.id);
    updateDOM();
});

const updateDOM = () => {
    const cells = [...document.querySelectorAll('.cell')];
    for (let i=0; i<cells.length; i++) {
        cells[i].textContent = game.fields[i];
    }
}