var myGamePiece;
var myObstacle=[];
var myScore;
var game_start=false;
var go;
// var start_over = function(){
//   // window.location.reload();
//   startGame()
// }

// myObstacle.push('hellp')

function startGame(){
  // myGamePiece=new component(30,30,'red',10,120);
  myGamePiece=new component(100,100,'static/images/flying_pikachu.png',10,120,'image');
  myScore = new component('30px','Consolas','#002933',500,40,'text');
  myBackground = new component(660,400,'static/images/background_pokemon.png',0,0,'background');
  myLivePiece = new component(30,30,'static/images/pikachu_live.png',0,0,'image');
  myLiveScore= new component(100,20,'red',30,30);
  myGameArea.start();

}
var myGameArea = {
  canvas:document.createElement('canvas'),
  start:function(){
    console.log('running');
    this.canvas.width=660;
    this.canvas.height=400;
    this.context=this.canvas.getContext('2d');
    document.getElementById('game_area').insertBefore(this.canvas,document.getElementById('game_area').childNodes[0]);
    // adding multiple obstacles? need a property for counting frames, and a method for execute something at a given frame rate.
    this.frameNo=0;
    this.live=10;
    // the smaller, the harder
    this.hardLevel=15;
    this.interval=setInterval(updateGameArea,this.hardLevel);
    // add event listerner to bind with keybaord
    // if more than one key is pressed, created a keys array(key:value)
    window.addEventListener('keydown',function(e){
      myGameArea.keys=(myGameArea.keys || [])
      myGameArea.keys[e.keyCode] = true;
      // myGamePiece.image.src='static/images/flying_pikachu.png'
    })
    window.addEventListener('keyup',function(e) {
      myGameArea.keys[e.keyCode]=false;
      // myGamePiece.image.src='static/images/pikachu.png';
      myGamePiece.gravity=0.1
    })
  },

  clear:function(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  },
  stop:function(){
    window.clearInterval(this.interval);
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
    this.hitTop();
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
      this.gravity=-0.05;
    }
  }
  this.hitTop=function(){
    if(this.y<0){
      this.y=0;
      this.gravity=0.3;
    }
  }
  // check if two component hit
  this.crashWith = function(otherobj){
    var myleft=this.x;
    var myright=myleft+(this.width- 20);
    var mytop=this.y;
    var mybottom = mytop+(this.height-20);
    var otherleft=otherobj.x;
    var otherright=otherobj.x+(otherobj.width);
    var othertop=otherobj.y;
    var otherbottom=otherobj.y+(otherobj.height);
    var crash =true;
    if (mybottom < othertop || mytop > otherbottom || myleft > otherright || myright < otherleft){
      crash = false;
    }else{
      if(myGamePiece.live <=10 && myGamePiece.live >=3){
          myGamePiece.live -=1;
          myLiveScore.width-=10;
          myLiveScore.update();
          myGamePiece.update();
          crash = false;
      }else if (myGamePiece.live < 3) {
        myGamePiece.live -=1;
        myLiveScore.width-=10;
        myLivePiece.image.src='static/images/pikachu_dieing.png';
        myLivePiece.update();
        myGamePiece.update();
        crash = false;
      }else if (myGamePiece.live ==0 ) {
        crash =true;
      }
    }
    return crash;
  }
}
function game_over(score){
  // create game over picture
  var image=document.createElement('img')
  var game_area=document.getElementById('game_area');
  image.src='static/images/catch_p.gif';
  game_area.style.width='400px';
  game_area.style.height='225px';
  game_area.insertBefore(image,game_area.childNodes[0]);
  game_area.removeChild(game_area.childNodes[1]);
  myGameArea.stop();
  // insert Score and start over button
  var div=document.createElement('h1')

  // var game_over=document.getElementById('game_over')
  div.innerHTML='Game Over';
  var score_d = document.createElement('h2')
  // console.log(score);
  score_d.innerHTML='Your Score is: '+ score;
  var btn = document.createElement('input');
  btn.type='button';
  btn.value='Start Over';
  btn.style.width='120px';
  btn.style.height='80px';
  btn.style.color='#FD7222';
  btn.onclick=function(){
    window.location.reload();
  }
  document.getElementById('game_over').appendChild(div);
  document.getElementById('game_over').appendChild(score_d);
  document.getElementById('game_over').appendChild(btn);
  }
// make it move
function updateGameArea() {
  var x,height,gap,minHeight,maxHeight,minGap,maxGap,width_ob;
  // check if two component hitted if true, stop, else continue move
  for (i=0;i<myObstacle.length;i+=1){
    if(myGamePiece.crashWith(myObstacle[i])){
    //   myGamePiece.live -=1;
    //   myLiveScore.width-=10;
    //   myLiveScore.update();
    //   if(myGamePiece.live <3){
    //     myLivePiece.image.src='static/images/pikachu_dieing.png';
    //     myLivePiece.update();
    //     continue;
    //   }else if (myGamePiece.live == 0){
    //
    //   }
        myGameArea.clear()
        game_over(myGameArea.frameNo*10);
        return;
    }
  };

  // clear canvas
  // if we leave out the clear() method, all movements of the component will leave a trail of where it was positioned in the last frame:
  // if make a snake game, than remove the clear() function
  myGameArea.clear();
  // myBackground.speedX =-1;
  myBackground.update();
  myLivePiece.update();
  myLiveScore.update();
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
    // component(100,100,'static/images/flying_pikachu.png',10,120,'image');
    myObstacle.push(new component(50,50,'static/images/ball.png',x-50,width_ob+20,'image'));
    myObstacle.push(new component(50, 50, "static/images/ball.png", x-25, height + gap,'image'));
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
  if(myGameArea.keys && myGameArea.keys[32]){myGamePiece.gravity =-0.2;};

  // update score
  myScore.text='Score:' + 10*myGameArea.frameNo;
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
