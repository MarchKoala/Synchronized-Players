// ゲームの状態
var state = {
    characters: [],
    walls: [],
    gridSize: {n: 0, m: 0},
    moveCount: 0,  // 操作回数
    isCleared: false  // ゲームがクリアされたかどうか
};

// ゲームの初期化
function init() {
    var mapInput = document.getElementById('mapInput').value.split('\n');
    //state.gridSize.n = mapInput[0].length;
    //state.gridSize.m = mapInput.length;
	state.gridSize.n = Number(mapInput[0]);
	state.gridSize.m = Number(mapInput[0]);
    state.characters = [];
    state.walls = [];
	state.moveCount = 0;
    for (var y = 0; y < state.gridSize.m; y++) {
        for (var x = 0; x < state.gridSize.n; x++) {
            switch (mapInput[y+1][x]) {
                case 'P':
                    state.characters.push({x: x, y: y});
                    break;
                case '#':
                    state.walls.push({x: x, y: y});
                    break;
            }
        }
    }
	document.getElementById('grid').style.gridTemplateRaws = `repeat(${state.gridSize.m}, 20px)`;
    document.getElementById('grid').style.gridTemplateColumns = `repeat(${state.gridSize.n}, 20px)`;
    render();
	state.isCleared = false;  // ゲームがクリアされていない
	document.getElementById('clearMessage').textContent = '';  // クリアメッセージをクリアする
}

// キャラクターの移動
function move(direction) {
    for (var i = 0; i < state.characters.length; i++) {
        var character = state.characters[i];
        switch (direction) {
            case 'up':
                if (character.y > 0 && !isWall(character.x, character.y - 1)) {
                    character.y--;
                }
                break;
            case 'down':
                if (character.y < state.gridSize.m - 1 && !isWall(character.x, character.y + 1)) {
                    character.y++;
                }
                break;
            case 'left':
                if (character.x > 0 && !isWall(character.x - 1, character.y)) {
                    character.x--;
                }
                break;
            case 'right':
                if (character.x < state.gridSize.n - 1 && !isWall(character.x + 1, character.y)) {
                    character.x++;
                }
                break;
        }
    }
	if (!state.isCleared) {  // ゲームがクリアされていない場合にのみ操作回数を増やす
        state.moveCount++;
    }
    render();
    checkWin();
}

// 壁があるかどうかをチェック
function isWall(x, y) {
    for (var i = 0; i < state.walls.length; i++) {
        var wall = state.walls[i];
        if (wall.x === x && wall.y === y) {
            return true;
        }
    }
    return false;
}

// ゲームの状態を描画
function render() {
    var grid = document.getElementById('grid');
    grid.innerHTML = '';
    for (var y = 0; y < state.gridSize.m; y++) {
        for (var x = 0; x < state.gridSize.n; x++) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            if (isWall(x, y)) {
                cell.classList.add('wall');
            } else if (isCharacter(x, y)) {
                cell.classList.add('character');
            }
            grid.appendChild(cell);
        }
        //grid.appendChild(document.createElement('br'));
    }
	document.getElementById('moveCount').textContent = '操作回数: ' + state.moveCount;  // 操作回数を表示する
}

// キャラクターがいるかどうかをチェック
function isCharacter(x, y) {
    for (var i = 0; i < state.characters.length; i++) {
        var character = state.characters[i];
        if (character.x === x && character.y === y) {
            return true;
        }
    }
    return false;
}

// 勝利条件をチェック
function checkWin() {
    if (state.characters[0].x === state.characters[1].x && state.characters[0].y === state.characters[1].y && state.isCleared == false) {
        state.isCleared = true;  // ゲームがクリアされた
        document.getElementById('clearMessage').textContent = 'クリア！'; //操作回数: ' + state.moveCount + '回';  // クリアメッセージを表示する
    }
}

// 初期描画
render();
