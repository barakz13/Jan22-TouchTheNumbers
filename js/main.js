'use strict';

var gFirstClick = false;
var gNextNum = 1;
var gTimerStart;
var gTimerInterval;
var gGameTime;
var gSize;
var gNums;

// git test

function init() {
  var elTimer = document.querySelector('.timer');
  elTimer.innerText = '';
  var elBtn = document.querySelector('.again');
  elBtn.style.visibility = 'hidden';
  var elBtn1 = document.querySelector('.easy');
  var elBtn2 = document.querySelector('.normal');
  var elBtn3 = document.querySelector('.hard');
  elBtn1.style.visibility = 'visible';
  elBtn2.style.visibility = 'visible';
  elBtn3.style.visibility = 'visible';
  var elTable = document.querySelector('table');
  elTable.style.visibility = 'hidden';
  var elBoard = document.querySelector('.board');
  elBoard.innerHTML = '';
  elBoard.style.backgroundColor = 'white';
}

// something !

function getSize(elSize) {
  switch (elSize.innerText) {
    case 'Easy':
      gSize = 4;
      break;
    case 'Normal':
      gSize = 5;
      break;
    case 'Hard':
      gSize = 6;
  }
  renderBoard();
}

function renderBoard() {
  var elTable = document.querySelector('table');
  elTable.style.visibility = 'visible';
  gNums = shuffleNums();
  var randNum;
  var strHTML = '';
  for (var i = 0; i < gSize; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < gSize; j++) {
      randNum = gNums.pop();
      strHTML += `<td onclick="cellClicked(${randNum},this)">${randNum}</td>`;
    }
    strHTML += '</tr>';
  }
  var elBoard = document.querySelector('.board');
  elBoard.innerHTML = strHTML;
}

function cellClicked(cellValue, elCell) {
  if (!gFirstClick) {
    var elBtn = document.querySelector('.again');
    var elBtn1 = document.querySelector('.easy');
    var elBtn2 = document.querySelector('.normal');
    var elBtn3 = document.querySelector('.hard');
    elBtn.style.visibility = 'hidden';
    elBtn1.style.visibility = 'hidden';
    elBtn2.style.visibility = 'hidden';
    elBtn3.style.visibility = 'hidden';
    startTimer();
    gFirstClick = true;
  }
  if (cellValue !== gNextNum) return;
  elCell.style.backgroundColor = 'yellow';
  gNextNum++;
  if (gNextNum === gSize * gSize + 1) {
    endGame();
  }
}

function endGame() {
  clearInterval(gTimerInterval);
  alert('YOU FINISHED THE GAME IN ' + gGameTime + ' SECONDS! NICE!');
  var elBtn = document.querySelector('.again');
  elBtn.style.visibility = 'visible';
  gFirstClick = false;
  gNextNum = 1;
}

function startTimer() {
  gTimerStart = Date.now();
  gTimerInterval = setInterval(showTimer, 1);
}

function showTimer() {
  gGameTime = (Date.now() - gTimerStart) / 1000;
  var elTimer = document.querySelector('.timer');
  elTimer.innerText = `${gGameTime}`;
}

function shuffleNums() {
  gNums = generateNums();
  for (var i = gNums.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = gNums[i];
    gNums[i] = gNums[j];
    gNums[j] = temp;
  }
  return gNums;
}

function generateNums() {
  var gNums = [];
  for (var i = 1; i < gSize * gSize + 1; i++) {
    gNums.push(i);
  }
  return gNums;
}
