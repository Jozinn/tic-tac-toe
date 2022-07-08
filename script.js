const GameBoard = (function () {
    let gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
    const fill = (player, i, j) => {
        gameBoard[i][j] = player;
        _checkWinner();
        renderDOM();
    };
    const _checkWinner = () => {
        for(let i=0; i<3; i++) {
            if(gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][0] == gameBoard[i][2] && gameBoard[i][0] != "") {
                gameBoard[i][0].score++;
                _clear();
                return;
            }
            if(gameBoard[0][i] == gameBoard[1][i] && gameBoard[0][i] == gameBoard[2][i] && gameBoard[0][i] != "") {
                gameBoard[0][i].score++;
                _clear();
                return;
            }
            for(let j=0; j<3; j++) {
                if(gameBoard[i][j] == "") break;
                _clear();
                return;
            }
        }
        if((gameBoard[0][0] == gameBoard[1][1] && gameBoard[0][0] == gameBoard[2][2]) || (gameBoard[0][2] == gameBoard[1][1] && gameBoard[0][2] == gameBoard[2][0]) && gameBoard[1][1] != "" ) {
            gameBoard[1][1].score++;
            _clear();
            return;
        }
    }
    const _clear = () => {
        gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
        renderDOM();
    };
    return {gameBoard, fill,};
})();

const Player = (signn, namee) => {
    let score = 0;
    let sign = signn;
    let name = namee;
    return {score, sign, name};
}

(function Game() {
    const player1 = Player("O", "player1");
    const player2 = Player("X", "player2");
    const board = document.getElementById("board");
    let flag = true;
    board.addEventListener("click", e => {
        const x = +e.target.getAttribute("data-cell")[1];
        const y = +e.target.getAttribute("data-cell")[0];
        if(flag) {
            if(GameBoard.gameBoard[x][y] == "") {
                e.target.textContent = player1.sign; 
                GameBoard.fill(player1, x, y);
            } else return;
            flag = !flag;
        } else {
            if(GameBoard.gameBoard[x][y] == "") {
                e.target.textContent = player2.sign;
                GameBoard.fill(player2, x, y);
            } else return;
            flag = !flag;
        }
        console.log(player1.score + " " + player2.score);
    });
})();

function renderDOM() {
    const cells = [...document.getElementsByClassName("cell")];
    for(let i=0; i<GameBoard.gameBoard.length; i++) {
        let k = 0;
        for(let j=0; j<GameBoard.gameBoard[i].length; j++) {
            cells[k].textContent = GameBoard.gameBoard[i][j].sign;
            console.log(GameBoard.gameBoard[i][j]);
            console.log(cells[k]);
            k++;
        }
    }
}
