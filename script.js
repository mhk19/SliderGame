function startGame() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var squareRowCount = 3;
    var squareColumnCount = 3;
    var squareWidth = 160;
    var squareHeight = 160;


    var rightpressed = false;
    var leftpressed = false;
    var downpressed = false;
    var uppressed = false;

    var noOfMoves = 0;
    var success = false;
    var blankSquare = { id: 9, c: 2, r: 2 };
    var squares = [];



    var temp = 1;
    for (c = 0; c < squareColumnCount; c++) {
        squares[c] = [];
        for (r = 0; r < squareRowCount; r++) {
            squares[c][r] = { x: 0, y: 0, id: 0, value: 0 }
            squares[c][r].id = temp;
            squares[c][r].value = temp;
            temp++;
        }
    }




    function swapSquares() {
        for (i = 0; i <= 30; i++) {
            var swap = false;
            while (!swap) {
                temp = Math.floor(Math.random() * 4);
                if (temp == 0 && (blankSquare.id - 1) % 3 != 0) {
                    var tempValue = squares[blankSquare.c][blankSquare.r].value;
                    squares[blankSquare.c][blankSquare.r].value = squares[blankSquare.c][blankSquare.r - 1].value;
                    squares[blankSquare.c][blankSquare.r - 1].value = tempValue;
                    blankSquare.id--;
                    blankSquare.r--;
                    swap = true;
                } else if (temp == 1 && (blankSquare.id - 3) > 0) {
                    var tempValue = squares[blankSquare.c][blankSquare.r].value;
                    squares[blankSquare.c][blankSquare.r].value = squares[blankSquare.c - 1][blankSquare.r].value;
                    squares[blankSquare.c - 1][blankSquare.r].value = tempValue;
                    blankSquare.id -= 3;
                    blankSquare.c--;
                    swap = true;
                } else if (temp == 2 && blankSquare.id % 3 != 0) {
                    var tempValue = squares[blankSquare.c][blankSquare.r].value;
                    squares[blankSquare.c][blankSquare.r].value = squares[blankSquare.c][blankSquare.r + 1].value;
                    squares[blankSquare.c][blankSquare.r + 1].value = tempValue;
                    blankSquare.id++;
                    blankSquare.r++;
                    swap = true;
                } else if (temp == 3 && (blankSquare.id + 3) <= 9) {
                    var tempValue = squares[blankSquare.c][blankSquare.r].value;
                    squares[blankSquare.c][blankSquare.r].value = squares[blankSquare.c + 1][blankSquare.r].value;
                    squares[blankSquare.c + 1][blankSquare.r].value = tempValue;
                    blankSquare.id += 3;
                    blankSquare.c++;
                    swap = true;
                }
            }
            for (c = 0; c < squareColumnCount; c++) {
                for (r = 0; r < squareRowCount; r++) {
                    console.log(squares[c][r].value);
                }
            }
        }

    }

    swapSquares();

    function fillSquares() {
        for (c = 0; c < squareColumnCount; c++) {
            for (r = 0; r < squareRowCount; r++) {
                ctx.beginPath();
                var squareX = r * squareWidth;
                var squareY = c * squareHeight;
                ctx.font = "50px Arial"
                ctx.strokeRect(squareX, squareY, squareWidth, squareHeight);
                ctx.fillStyle = "#0066FF";
                ctx.fill();
                console.log(blankSquare.c, blankSquare.r);
                ctx.strokeText(squares[c][r].value, squareX + 80, squareY + 80, squareHeight);
                ctx.closePath();
            }
        }
        ctx.beginPath();
        ctx.fillRect(blankSquare.r * squareWidth, blankSquare.c * squareHeight, squareWidth, squareHeight);
        ctx.fillStyle = "#0066FF";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        if (rightpressed && (blankSquare.id - 1) % 3 != 0) {
            console.log("rightpressed");
            var tempValue = squares[blankSquare.c][blankSquare.r].value;
            squares[blankSquare.c][blankSquare.r].value = squares[blankSquare.c][blankSquare.r - 1].value;
            squares[blankSquare.c][blankSquare.r - 1].value = tempValue;
            blankSquare.id--;
            blankSquare.r--;
            noOfMoves++;
        }
        if (leftpressed && blankSquare.id % 3 != 0) {
            console.log("leftpressed");
            var tempValue = squares[blankSquare.c][blankSquare.r].value;
            squares[blankSquare.c][blankSquare.r].value = squares[blankSquare.c][blankSquare.r + 1].value;
            squares[blankSquare.c][blankSquare.r + 1].value = tempValue;
            blankSquare.id++;
            blankSquare.r++;
            noOfMoves++;
        }
        if (downpressed && (blankSquare.id - 3) > 0) {
            var tempValue = squares[blankSquare.c][blankSquare.r].value;
            squares[blankSquare.c][blankSquare.r].value = squares[blankSquare.c - 1][blankSquare.r].value;
            squares[blankSquare.c - 1][blankSquare.r].value = tempValue;
            blankSquare.id -= 3;
            blankSquare.c--;
            noOfMoves++;
        }
        if (uppressed && (blankSquare.id + 3) <= 9) {
            var tempValue = squares[blankSquare.c][blankSquare.r].value;
            squares[blankSquare.c][blankSquare.r].value = squares[blankSquare.c + 1][blankSquare.r].value;
            squares[blankSquare.c + 1][blankSquare.r].value = tempValue;
            blankSquare.id += 3;
            blankSquare.c++;
            noOfMoves++;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log("canvas height is " + canvas.height);
        successChecker();
        if (success) {
            window.removeEventListener("keydown", keyDownHandler, false);
            window.removeEventListener("keyup", keyUpHandler, false);
            endgame(noOfMoves);
        } else {
            fillSquares();
        }

    }
    draw();



    function successChecker() {
        for (c = 0; c < squareColumnCount; c++) {
            var flag = 0;
            for (r = 0; r < squareRowCount; r++) {
                if (squares[c][r].id != squares[c][r].value) {
                    flag = 1;
                    break;
                }
                if (c == 2 && r == 2) {
                    success = true;
                }
            }
            if (flag == 1) {
                break;
            }
        }
    }

    function keyDownHandler(e) {
        console.log("hello")
        if (e.keyCode == 37) {
            console.log(e.keyCode);
            leftpressed = true;
            draw();
        } else if (e.keyCode == 39) {
            rightpressed = true;
            console.log(rightpressed);
            draw();
        } else if (e.keyCode == 38) {
            uppressed = true;
            draw();
        } else if (e.keyCode == 40) {
            downpressed = true;
            draw();
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode == 37) {
            leftpressed = false;
        } else if (e.keyCode == 39) {
            rightpressed = false;
        } else if (e.keyCode == 38) {
            uppressed = false;
        } else if (e.keyCode == 40) {
            downpressed = false;
        }
    }
    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);

}





function loadGame() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("myGame").innerHTML = this.responseText;
            var highscore = window.localStorage.getItem("highscore");
            document.getElementById("highscore").innerHTML = "Your best number of moves are: " + highscore;
            startGame();
        }
    };
    xhttp.open("GET", "game.html", true);
    xhttp.send();
}

function endgame(noOfMoves) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("myGame").innerHTML = this.responseText;
            var highscore = window.localStorage.getItem("highscore");
            if (highscore == null || highscore > noOfMoves) {
                document.getElementById("highscore").innerHTML = "Congratulations! New Highscore:" + noOfMoves;
                window.localStorage.setItem("highscore", noOfMoves);
            } else {
                document.getElementById("highscore").innerHTML = "Best no. of moves were:" + highscore;
            }
        }
    };
    xhttp.open("GET", "gameover.html", true);
    xhttp.send();
}