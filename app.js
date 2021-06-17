if (typeof jQuery == 'undefined'){
    console.log('oops! I still have to link my jQuery properly!');
  } else {console.log('I did it! I linked jQuery and this js file!')};

const P1 = 1;
const P2 = 2;
let yMoveSpeed = 2;
let xMoveSpeed = 2;
let rotationSpeed = 1;

const game = {
        //player: ["P0","P1", "P2"],
        size: 3, //Size x Size
        player: [{name:"Dummy",score:0},{name: "X", score: 0}, {name:"O", score: 0}],
        turn: 0,
        winner: 0,
        // 0: empty, 1: P1, 2: P2
        // table : [0,0,0,
        //         0,0,0,
        //        0,0,0],
        table: [],
        numOfBoxClicked: 0,
        boardPosition: {x:10,y:200},
        boardRotate: 0,
        start() {
            this.turn = P1;
            for(let i=0;i<this.table.length;i++) {
                this.table[i] = 0;
            }
            console.log(this.table)
            this.winner = 0;
            this.numOfBoxClicked = 0;
            this.totalBox = this.size*this.size;
        }
}

const renderWinner = () => {
    if(game.winner !== 0) {
        
        console.log(`THE WINNER IS ${game.player[game.winner].name}`)
        game.player[game.winner].score++;
        $('#p1Score').text(game.player[1].score)
        $('#p2Score').text(game.player[2].score)
        
        setTimeout(function(){
            alert(`THE WINNER IS ${game.player[game.winner].name}`)
        }, 300); 
        
    } else if(game.numOfBoxClicked === game.totalBox ) {
        setTimeout(function(){
            alert("IT IS A TIE BRO. YOU LOUSY BAM BAM. PLEASE TRY AGAIN")
        }, 500); 
    }

}

const isAllSame = (char,str) => {

    console.log(str)
    console.log(char)
    //console.log("length", strToChk.length)
    for(let i=0;i<game.size;i++) {
          if(char !== str.charAt(i)) {
            console.log("xxx",str.charAt(i))
            return false;
         }
    }
    console.log("true")
    return true;
}

const checkRow = () => {
    let concatRow=[];
    let str = ""
    for(let i=0;i<game.size;i++) {
        for(let j=0;j<game.size;j++)
            str += game.table[j+i*game.size].toString()
        concatRow.push(str)
        console.log("total",concatRow)
        str = ""
        if(isAllSame("1",concatRow[i]))
             return 1;
        if(isAllSame("2",concatRow[i]))
            return 2;
    }
 
    return 0;
    
    // const num1 = game.table[0]
    // const num2 = game.table[3]
    // const num3 = game.table[6]
    // if(num1 !== 0 && game.table[1] === num1 && game.table[2] == num1)
    //     return num1;
    // if(num2 !== 0 && game.table[4] === num2 && game.table[5] == num2)
    //     return num2;
    // if(num3 !== 0 && game.table[7] === num3 && game.table[8] == num3)
    //     return num3;
    // return 0;
    
}

const checkCol = () => {
    //let concatCol=[];
    let str = ""
    for(let i=0;i<game.size;i++) {
        for(let j=0;j<game.size;j++)
            str += game.table[j*game.size+i].toString()
        //concatCol.push(str)
        console.log("total",str)
       
        if(isAllSame("1",str))//concatCol[i]))
             return 1;
        if(isAllSame("2",str))//concatCol[i]))
            return 2;
        str = ""
    }
 
    return 0;

    // const num1 = game.table[0]
    // const num2 = game.table[1]
    // const num3 = game.table[2]
    // if(num1 !== 0 && game.table[3] === num1 && game.table[6] == num1)
    //     return num1;
    // if(num2 !== 0 && game.table[4] === num2 && game.table[7] == num2)
    //     return num2;
    // if(num3 !== 0 && game.table[5] === num3 && game.table[8] == num3)
    //     return num3;
    // return 0;
    
}

const checkDiag = () => {
    let concatDiag="";
    let str = ""
 
    for(let j=0;j<game.size;j++)
        str += game.table[(j*game.size+j)].toString()
    concatDiag = str
    console.log("total",concatDiag)
    if(isAllSame("1",concatDiag))
        return 1;
    if(isAllSame("2",concatDiag))
        return 2;
    str = ""
 
    for(let j=1;j<=game.size;j++)
        str += game.table[(j*(game.size-1))].toString()
    concatDiag = str
    console.log("total",concatDiag)

    if(isAllSame("1",concatDiag))
        return 1;
    if(isAllSame("2",concatDiag))
        return 2;
    return 0;

    // const num1 = game.table[0]
    // const num2 = game.table[2]
    // if(num1 !== 0 && game.table[4] === num1 && game.table[8] == num1)
    //     return num1;
    // if(num2 !== 0 && game.table[4] === num2 && game.table[6] == num2)
    //     return num2;
    // return 0;
    
}

const checkWinner = () => {
        console.log("THE WINNER IS ME")
        const rowVal = checkRow();
        const colVal = checkCol();
        const diagVal = checkDiag();
        if(rowVal !== 0)
            game.winner = rowVal;
        if(colVal !== 0)
            game.winner = colVal
        if(diagVal !== 0)
            game.winner = diagVal;
        renderWinner();
        //render(game.table);
}
    
const playFunction = (event) => {
    console.log(event.target.id)

    if(game.winner !== 0 || game.numOfBoxClicked === game.totalBox) {
        alert("RESET AND PLAY AGAIN")
        return;
    }
    //const $target = $(event.target)
    if(game.table[event.target.id-1] !== 0) {
        console.log("THE BOX ALREADY TAKEN")
        return;
    }
 

    game.numOfBoxClicked++;
    if(game.turn == P1) {
        game.table[event.target.id-1] = 1;
        game.turn = P2;
    }
    else {
        game.table[event.target.id-1] = 2;
        game.turn = P1;
    }
    render(game.table)
    checkWinner();
}

const resetPlay = () => {

    game.start();
    render(game.table);
}

const createEventHandler = (table) => {
    for(let i=0;i<table.length;i++) {
        $(`#${i+1}`).on('click',playFunction)
    }

    $('#resetButton').on('click', resetPlay)
}

const render = (table) => {
        for(let i=0;i<table.length;i++) {
             if(table[i] === 0) {
                $(`#${i+1}`).children().remove()
                 $(`#${i+1}`).css("background-color","#faf489")
             }
             else if(table[i] === 1) {
                $(`#${i+1}`).css("background-color","blue")
                // $(`#${i+1}`).children().remove()
                // $(`#${i+1}`).append($('<tick>').text("X"))
             }
             else if(table[i] === 2) {
                // $(`#${i+1}`).children().remove()
                // $(`#${i+1}`).append($('<tick>').text("O"))
                $(`#${i+1}`).css("background-color","red")
             }
        }
}

const generateGameBoard = (size) => {

    const $gameBoard = $('#gameBoard') 
    const $h1 = $('<h1>').text("TIC TAC TOE")
    $gameBoard.append($h1)
    for(let i=0;i<size;i++) {
        const $div = $('<div>').attr("id",`row${i+1}`).css("display","flex")
        for(let j=0;j<size;j++) {
            const $divInner= $('<div>').addClass("box").attr("id",(j+1)+i*size).css("justify-content","center").css("display","flex").css("align-items","center")
            $div.append($divInner)
        }
        $gameBoard.append($div)
    }

    // $gameBoard.append($('<button>').attr("id","resetButton").text("RESET"))
    // $gameBoard.append($('<h2>').text("SCORE"))
    // let $h3 = $('<h3>').text("Player X: ")
    // $h3.append($('<span>').attr("id","p1Score").text("0"))
    // $gameBoard.append($h3)
    // $h3 = $('<h3>').text("Player O: ")
    // $h3.append($('<span>').attr("id","p2Score").text("0"))
    // $gameBoard.append($h3)

    // Initialize table to 0
    for(let i=0;i<size*size;i++) {
        game.table.push(0);
    }
    console.log(game.table)

}
let num = 0;
const updateBoard = () => {
    
    game.boardPosition.x += xMoveSpeed;
    game.boardPosition.y += yMoveSpeed;
    game.boardRotate += rotationSpeed;

    if(game.boardRotate === 360)
    game.boardRotate = 0;

    if(game.boardPosition.y >= 600)
        yMoveSpeed = - yMoveSpeed

    if(game.boardPosition.x >= 1200)
        xMoveSpeed = - xMoveSpeed

    if(game.boardPosition.x <= 0)
        xMoveSpeed = - xMoveSpeed

    if(game.boardPosition.y <= 0)
        yMoveSpeed = - yMoveSpeed
    // const $rotateNum = $('#rotate')
    // num = num+1
    // $rotateNum.text(num)
    // console.log("rotating", num)
}

const drawBoard = () => {
    const $gameBoard = $('#gameBoard') 
    // $gameBoard.css("transform",`translate\(${game.boardPosition.x}%,${game.boardPosition.y}%\)`)
    $gameBoard.css("left",`${game.boardPosition.x}px`)
    $gameBoard.css("top",`${game.boardPosition.y}px`)
    $gameBoard.css("transform",`rotate\(${game.boardRotate}deg\)`)
}
main = () => {

    generateGameBoard(game.size);
    game.start();
    render(game.table);
    createEventHandler(game.table);


    const gameLoop = () => {
   
        updateBoard();
        drawBoard();
        requestAnimationFrame(gameLoop);
    }
    gameLoop();
}

$(main());

