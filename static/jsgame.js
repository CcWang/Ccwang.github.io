var myGamePiece;
var myObstacle=[];
var myScore;
var go;
// myObstacle.push('hellp')

function startGame(){
  myGamePiece=new component(30,30,'red',10,120);
  myScore = new component('30px','Consolas','black',280,40,'text');
  go = new component('50px','Consolas','red',80,150,'text');
  myGameArea.start();

}
var myGameArea = {
  canvas:document.createElement('canvas'),
  start:function(){
    this.canvas.width=480;
    this.canvas.height=300;
    this.context=this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas,document.body.childNodes[0]);
    // adding multiple obstacles? need a property for counting frames, and a method for execute something at a given frame rate.
    this.frameNo=0;
    // the smaller, the harder
    this.hardLevel=10;
    this.interval=setInterval(updateGameArea,this.hardLevel);
    // add event listerner to bind with keybaord
    // if more than one key is pressed, created a keys array(key:value)
    window.addEventListener('keydown',function(e){
      myGameArea.keys=(myGameArea.keys || [])
      myGameArea.keys[e.keyCode] = true;
    })
    window.addEventListener('keyup',function(e) {
      myGameArea.keys[e.keyCode]=false;
    })
  },

  clear:function(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  },
  stop:function(){
    go.text='Game Over'
    go.update()
    clearInterval(this.interval);
    if (go.text=='Game Over') {
      console.log('go')
    }
  }
}
/*The everyinterval function returns true if the current framenumber corresponds with the given interval.

To define multiple obstacles, first declare the obstacle variable as an array.

Second, we need to make some changes in the updateGameArea function.*/
function everyInterval(n){
  return (myGameArea.frameNo /n %1 ==0);
}

function component(width,height,color,x,y,type){
  // console.log(width,height,color,x,y)
  this.type=type;
  this.width=width;
  this.height=height;
  this.speedX=0;
  this.speedY=0;
  this.x=x;
  this.y=y;
  this.update =function () {
    ctx=myGameArea.context;
    if(this.type=='text'){
      ctx.font=this.width + ' '+this.height;
      ctx.fillStyle=color;
      ctx.fillText(this.text,this.x,this.y);
    }else{
      ctx.fillStyle=color;
      ctx.fillRect(this.x,this.y,this.width,this.height);
    }
  };
  this.newPos=function(){
    this.x+=this.speedX;
    this.y+=this.speedY;
  };
  // check if two component hit
  this.crashWith = function(otherobj){
    var myleft=this.x;
    var myright=this.x+(this.width);
    var mytop=this.y;
    var mybottom = this.y+(this.height);
    var otherleft=otherobj.x;
    var otherright=otherobj.x+(otherobj.width);
    var othertop=otherobj.y;
    var otherbottom=otherobj.y+(otherobj.height);
    var crash = true;
    if (mybottom < othertop || mytop > otherbottom || myleft > otherright || myright < otherleft){
      crash = false;
    }
    return crash;
  }
}

// make it move
function updateGameArea() {
  var x,height,gap,minHeight,maxHeight,minGap,maxGap;
  // check if two component hitted if true, stop, else continue move
  for (i=0;i<myObstacle.length;i+=1){
    if(myGamePiece.crashWith(myObstacle[i])){
      myGameArea.stop();
      return;
    }
  }

  // clear canvas
  // if we leave out the clear() method, all movements of the component will leave a trail of where it was positioned in the last frame:
  // if make a snake game, than remove the clear() function
  myGameArea.clear();
  myGameArea.frameNo +=1;
  if (myGameArea.frameNo == 1 || everyInterval(150)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight=200;
    height=Math.floor(Math.random()*(maxHeight - minHeight + 1)+ minHeight);
    minGap = 50;
    maxGap=200;
    gap=Math.floor(Math.random()*(maxGap - minGap + 1)+ minGap);
    myObstacle.push(new component(10,height,'green',x,0));
    myObstacle.push(new component(10, x - height - gap, "green", x, height + gap));
}
  for(i=0;i<myObstacle.length;i+=1){
    // make obstacle move constantly
    myObstacle[i].x-=1;
    myObstacle[i].update();

  }
  // set speedX and speedY to 0, so the oject will stop move
  stopMove()
  if(myGameArea.keys && myGameArea.keys[37]){myGamePiece.speedX =-1;};
  if(myGameArea.keys && myGameArea.keys[39]){myGamePiece.speedX=1;};
  if(myGameArea.keys && myGameArea.keys[38]){myGamePiece.speedY = -1;};
  if(myGameArea.keys && myGameArea.keys[40]){myGamePiece.speedY = 1;};
  // update score
  myScore.text='Score:' + 100*myGameArea.frameNo;
  myScore.update();
  // make it move
  myGamePiece.newPos();
  // update
  myGamePiece.update();


}

// move and button
function moveup() {
  myGamePiece.speedY -=1;
}
function movedown(){
  myGamePiece.speedY +=1;
}

function moveleft(){
  myGamePiece.speedX-=1;
}
function moveright() {
  myGamePiece.speedX +=1;
}
// stop move
function stopMove(){
  myGamePiece.speedX =0;
  myGamePiece.speedY = 0;
  // alert('Game Over');
}
// replaced by myGameArea eventlinster
// window.onkeydown =function (e) {
//   // 38 ->up
//   // 40 ->down
//   // 37 ->left
//   // 39->right
//   // 32->space
//
//   if (e.keyCode === 38){
//     moveup();
//   }else if (e.keyCode === 40) {
//     movedown();
//   }else if (e.keyCode === 37) {
//     moveleft();
//   }else if (e.keyCode === 39) {
//     moveright();
//   }
// }
// window.onkeyup =function (e) {
//   stopMove();
// }
