var myGamePiece;
var myObstacle=[];
var myScore;
var go;
var start_over = function(){
  window.location.reload();
}

// myObstacle.push('hellp')

function startGame(){
  // myGamePiece=new component(30,30,'red',10,120);
  myGamePiece=new component(100,100,'static/images/pikachu.png',10,120,'image');
  myScore = new component('30px','Consolas','black',280,40,'text');
  go = new component('50px','Consolas','red',80,150,'text');
  myBackground = new component(660,400,'static/images/background_pokemon.png',0,0,'background');
  myGameArea.start();

}
var myGameArea = {
  canvas:document.createElement('canvas'),
  start:function(){
    this.canvas.width=660;
    this.canvas.height=400;
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
      myGamePiece.image.src='static/images/flying_pikachu.png'
      // myGamePiece.update();
    })
    window.addEventListener('keyup',function(e) {
      myGameArea.keys[e.keyCode]=false;
      myGamePiece.image.src='static/images/pikachu.png'
      // myGamePiece.update()
    })
  },

  clear:function(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  },
  stop:function(){

    clearInterval(this.interval);
    // if (go.text=='Game Over') {
    //   var btn = document.createElement('th')
    //   var t=document.createTextNode('Start Over')
    //   btn.appendChild(t);
    //   btn.style.color='blue';
    //   btn.onclick=function(){
    //     startGame();
    //     this.parentElement.removeChild(this);
    //     go.text=''
    //     go.update()
    //   }
    //   // btn.addEventListener('click',startGame());
    //   document.body.appendChild(btn);
    // }
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
  if(type=='image' || type == 'background'){
    this.image=new Image();
    this.image.src=color;
  }
  this.width=width;
  this.height=height;
  this.speedX=0;
  this.speedY=0;
  this.x=x;
  this.y=y;
  this.gravity = 0.05;
  this.gravitySpeed = 0;
  this.update =function () {
    ctx=myGameArea.context;
    if(this.type=='text'){
      ctx.font=this.width + ' '+this.height;
      ctx.fillStyle=color;
      ctx.fillText(this.text,this.x,this.y);
    }else if (this.type=='image' || type =='background') {
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      // if(this.type=='background'){
      //   ctx.drawImage(this.image,this.x + this.width, this.y, this.width, this.height);
      // }
    }else{
      ctx.fillStyle=color;
      ctx.fillRect(this.x,this.y,this.width,this.height);
    }
  };
  this.newPos=function(){
    this.gravitySpeed +=this.gravity;
    this.x+=this.speedX;
    this.y+=this.speedY+this.gravitySpeed;
    this.hitBottom();
    if(this.type =='background'){
      if(this.x ==-(this.width)){
        this.x=0;
      }
    }
  };
  this.hitBottom = function(){
    var rockBottom = myGameArea.canvas.height - this.height;
    if(this.y>rockBottom){
      this.y=rockBottom;
    }
  }
  // check if two component hit
  this.crashWith = function(otherobj){
    var myleft=this.x-20;
    var myright=myleft+(this.width);
    var mytop=this.y-20;
    var mybottom = mytop+(this.height);
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
  var x,height,gap,minHeight,maxHeight,minGap,maxGap,width_ob;
  // check if two component hitted if true, stop, else continue move
  for (i=0;i<myObstacle.length;i+=1){
    if(myGamePiece.crashWith(myObstacle[i])){
      myGameArea.stop();
      // myGameArea.clear()
      // myGamePiece.image.src='static/images/pikachu_go.png'
      // myGamePiece.update();
      return;
    }
  }

  // clear canvas
  // if we leave out the clear() method, all movements of the component will leave a trail of where it was positioned in the last frame:
  // if make a snake game, than remove the clear() function
  myGameArea.clear();
  // myBackground.speedX =-1;
  myBackground.newPos();
  myBackground.update();
  myGameArea.frameNo +=1;
  if (myGameArea.frameNo == 1 || everyInterval(300)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight=myGameArea.canvas.height/2;
    height=Math.floor(Math.random()*(maxHeight - minHeight + 1)+ minHeight);
    minGap = 130;
    maxGap=myGameArea.canvas.height/3;
    gap=Math.floor(Math.random()*(maxGap - minGap + 1)+ minGap);
    width_ob=Math.floor(Math.random()*(50-20)+20);
    myObstacle.push(new component(width_ob,height,'blue',x,0));
    myObstacle.push(new component(width_ob, x - height - gap, "blue", x, height + gap));
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

// stop move
function stopMove(){
  myGamePiece.speedX =0;
  myGamePiece.speedY = 0;
  // alert('Game Over');
}
