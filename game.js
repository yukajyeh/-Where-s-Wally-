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
    positionX: 714,
    positionY: 584
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

  { name:'Wally5',
  url:'./Image/Waldo-5.jpg',
  positionX: 313,
  positionY: 514
  }, 
]


window.onload = () => {
    document.getElementById("pick-button").onclick = () => {
        const game = new Game();
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
}

//pick random image from an array
pickRandom(){
  let randomImg = this.images[Math.floor(Math.random() * this.images.length)];
  let wallyImage = new Image ()
  wallyImage.src = randomImg.url;
  this.pickedImage = randomImg;
  ctx.clearRect(0,0,1300,1200)
  wallyImage.onload= function () {
  ctx.drawImage(wallyImage,200,-10)
  }
}

//mouse click event on Wally's whereabouts
findWally(){
  //console.log(this.pickedImage)
  canvas.addEventListener('click', event => {
    console.log(event)
    let imgX = this.pickedImage.positionX
    let imgY = this.pickedImage.positionY
    let waldaX = this.pickedImage.waldaPX
    let userX = event.clientX
    let userY = event.clientY
    const errorMargin = 10
    
    function foundWally() {
      document.getElementById("ta-da").innerHTML = 'You Found Me';
      popUp.style.backgroundColor = '#00BFFF';
      waldoFace.src='./Image/Waldo Head .png';
    }
    function tryAgain(){
      document.getElementById("ta-da").innerHTML = 'Try Again';
      popUp.style.backgroundColor = 'red';
      waldoFace.src='./Image/sad waldo.png';
    }

    function foundWalda(){
      document.getElementById("ta-da").innerHTML = 'Oh hi Walda!';
      popUp.style.backgroundColor = '#ffbf00';
      waldoFace.src='./Image/Walda.png';
    }

    if(userX < imgX + errorMargin && userX > imgX - errorMargin){
      this.popUpWindow()
      this.closeWindow()
      foundWally()
      
    } else {
      this.popUpWindow()
      this.closeWindow()
      tryAgain()
   } 
   
   if(userX < waldaX + errorMargin && userX > waldaX - errorMargin){
     console.log('Hi')
     this.popUpWindow()
     this.closeWindow()
     foundWalda()
   }

  })
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


//countdown from 30s
 timer(){
  let sec = 60
  let countDown = setInterval(function(){
    document.getElementById('timer').innerHTML = sec;
    sec--;
    if(sec == 0){
      clearInterval(countDown)
      document.getElementById('timer').innerHTML = "Time's Up"
    }
  },1000);
} 

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

