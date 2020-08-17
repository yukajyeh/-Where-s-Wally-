var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
const xPosition = document.getElementById('x-position');
const yPosition = document.getElementById('y-position');
const popUp = document.getElementById('pop-up');
const closeBtn = document.getElementById('close-btn');
const waldoFace = document.getElementById('waldo-head');



let imgArray = [
   { name:'Wally1',
    url:'./Image/Waldo-Easy1.jpg',
    positionX: 703,
    positionY: 5534
  },  

 { name:'Wally2',
  url:'./Image/Waldo-Easy2.jpg',
  positionX: 1071,
  positionY: 174,
  waldaPX:1174,
  waldaPY:334
  },  

  { name:'Wally3',
  url:'./Image/Waldo-3.jpg',
  positionX: 1064,
  positionY: 499,
  waldaPX:700,
  waldaPY:351
  },

  { name:'Wally4',
  url:'./Image/Waldo-5.jpg',
  positionX: 313,
  positionY: 514
  }, 
]

let game;

window.onload = () => {
    document.getElementById("pick-button").onclick = () => {
      if(game != null){
        game.clearCountdown();
      }
        game = new Game();
        //console.log(game)
        game.pickRandom()
        //game.getCursorPosition()
        game.timer()
        game.findWally()
    };
}


class Game {
constructor(){
    this.images = imgArray;
    this.pickedImage;
    this.timeLeft = 60;
    this.countDown;

}

//pick random image from an array
pickRandom(){
  let randomImg = this.images[Math.floor(Math.random() * this.images.length)];
  let wallyImage = new Image ()
  wallyImage.src = randomImg.url;
  this.pickedImage = randomImg;
  ctx.clearRect(0,0,1300,1200)
  wallyImage.onload= function () {
  ctx.drawImage(wallyImage,200,0)
  }
}

//mouse click event on Wally's whereabouts
findWally(){
  canvas.addEventListener('click', event => {
    console.log(event)
    let imgX = this.pickedImage.positionX
    let imgY = this.pickedImage.positionY
    let waldaX = this.pickedImage.waldaPX
    let userX = event.clientX
    let userY = event.clientY
    const errorMargin = 10
    
    if(userX < imgX + errorMargin && userX > imgX - errorMargin){
      this.popUpWindow()
      this.closeWindow()
      this.foundWally()
      
    } else {
      this.popUpWindow()
      this.closeWindow()
      this.tryAgain()
   } 
   
   if(userX < waldaX + errorMargin && userX > waldaX - errorMargin){
     console.log('Hi')
     this.popUpWindow()
     this.closeWindow()
     this.foundWalda()
   }

  })
}

//notification boxes
foundWally() {
  document.getElementById("ta-da").innerHTML = 'You Found Me';
  popUp.style.backgroundColor = '#00BFFF';
  waldoFace.src='./Image/Waldo Head .png';
}

tryAgain(){
  document.getElementById("ta-da").innerHTML = 'Try Again';
  popUp.style.backgroundColor = 'red';
  waldoFace.src='./Image/sad waldo.png';
}

foundWalda(){
  document.getElementById("ta-da").innerHTML = 'Oh hi Walda!';
  popUp.style.backgroundColor = '#ffbf00';
  waldoFace.src='./Image/Walda.png';
}

//Confirm Player if it's Wally
popUpWindow(){
  canvas.addEventListener('click',e =>{
    popUp.classList.remove('hide')
    popUp.classList.add('active')
  })
}

closeWindow(){
   closeBtn.addEventListener('click',e =>{
    popUp.classList.remove('active')
    popUp.classList.add('hide')
})
}

//countdown from 60s
timer(){
  let gameOver = new Image
  gameOver.src='./Image/social-distancing.jpg'
  clearInterval(this.countDown);
  this.countDown = setInterval(() => {
    console.log(this.timeLeft);
    document.getElementById('timer').innerHTML = this.timeLeft;
    this.timeLeft--;
    if (this.timeLeft == 0) {
      document.getElementById('timer').innerHTML = "Time's Up"
      ctx.clearRect(200,0,canvas.height,canvas.width);
      ctx.drawImage(gameOver,200,0)
      clearInterval(this.countDown);
  }
},1000)
}    

clearCountdown = () =>{
  clearInterval(this.countDown);
};


getCursorPosition(){
   canvas.addEventListener("mousemove", function(e) { 
    var cRect = canvas.getBoundingClientRect();        
    var canvasX = Math.round(e.clientX - cRect.left); 
    var canvasY = Math.round(e.clientY - cRect.top);
    xPosition.innerHTML = canvasX
    yPosition.innerHTML = canvasY
  }); 
}   


}

