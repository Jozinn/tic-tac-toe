class Board {
    constructor(player1, player2) {
        this.players = [new player1('X', this), new player2('O', this)];
    }

    fields = new Array(9).fill(null);
    winVectors = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [0,4,8], [2,4,6]];
    currentPlayerId = 0;

    checkFull() {
        const emptyFields = this.fields.filter(field => field == null);
        if (!emptyFields.length) return true;
        return false;
    }

    checkWinner() {
        this.winVectors.forEach(vector => {
            const fieldsToCheck = [this.fields[vector[0]], this.fields[vector[1], this.fields[vector[2]]]];
            if (fieldsToCheck.filter(field => field == null).length) {
                return false;
            }

            if (fieldsToCheck[0] == fieldsToCheck[1] && fieldsToCheck[1] == fieldsToCheck[2]) {
                return true;
            }

            return false;
        });
    }

    play(position) {
        if (this.fields[position]) return;

        this.fields[position] = this.currentPlayer().marker;

        if(this.checkWinner()) {
            this.currentPlayer().score++;
            console.log(`${this.currentPlayer()} wins!`);
            return;
        }

        if (this.checkFull()) {
            console.log('Draw!');
            this.fields = this.fields.map(field => field = null);
            return;
        }

        this.switchPlayers();
    }

    currentPlayer() {
        return this.players[this.currentPlayerId];
    }

    switchPlayers() {
        const otherPlayer = 1 - this.currentPlayerId;
        this.currentPlayerId = otherPlayer;
    }
}

class Player {
    constructor(marker, game) {
        this.marker = marker;
        this.game = game;
        this.score = 0;
    }
}

const game = new Board(Player, Player);

const cells = [...document.querySelectorAll('.cell')];
cells.forEach(cell => {
    cell.addEventListener('click', e => {
        game.play(e.target.id);
        updateDOM()
    });
});

function updateDOM() {
    for (let i=0; i<cells.length; i++) {
        cells[i].textContent = game.fields[i];
    }
}