const score=document.querySelector(".score"),
      start=document.querySelector('.start'),
      gameArea=document.querySelector('.gameArea'),
      car=document.createElement('div');
      car.classList.add('car');


start.addEventListener('click', startGame);
   document.addEventListener('keydown',startRun);
   document.addEventListener('keyup',stopRun);

   const keys={
       ArrowUp:false,
       ArrowDown:false,
       ArrowRight:false,
       ArrowLeft:false
   };
   const setting={
       start:false,
       score:0,
       speed:3,
       traffic:3
   };
//функция определяет количество элементов для заполнения страницы ( сколько влезает на экран

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1;
}

//console.log(getQuantityElements(200));

function startGame() {
    start.classList.add('hide');
    // добавляем линии на дороге
    for ( let i =0;i<getQuantityElements(50);i++ ){
       const line=document.createElement('div');
       line.classList.add('line');
       line.style.top=(i*100) + 'px';
       line.y = i*100;
       gameArea.appendChild(line)
       }
    //создаем атомобили на дороге
    for( let i=0; i<getQuantityElements(100 * setting.traffic); i++){
       const enemy = document.createElement('div');
       enemy.classList.add('enemy');
       enemy.y= -100 * setting.traffic *(i +1);
       enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50)) + 'px';
       enemy.style.top = enemy.y + 'px';
       enemy.style.background= 'transparent url("./image/enemy2.png") center / cover no-repeat'

       gameArea.appendChild(enemy);
    }
    setting.start = true;
    // добавляем машинку игрока
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    // условия когда игра начата машинка игрока движется в направлении удерживаемых клавиш клавиш
    if (setting.start) {
        moveRoad();//Движение полос на дороге
        moveEnemy(); //Движение машинок- препятсвий  по дороге 
        if (keys.ArrowLeft && setting.x>0) {
            setting.x -= setting.speed;
        } else if (keys.ArrowRight && setting.x < (gameArea.offsetWidth-car.offsetWidth)) {
            setting.x += setting.speed;
        } else if (keys.ArrowDown && setting.y < (gameArea.offsetHeight-car.offsetHeight) ) {
            setting.y += setting.speed;
        } else if (keys.ArrowUp && setting.y >0) {
            setting.y -= setting.speed;
        }
        // меняем значение  в стилях
        car.style.left = setting.x + "px";
        car.style.top = setting.y + "px";

        requestAnimationFrame(playGame);
    }
}

  function startRun(event) {
       event.preventDefault();
       keys[event.key]=true;
  }

  function stopRun(event) {
       event.preventDefault();
       keys[event.key]=false;
  }
  function moveRoad(){
    let lines=document.querySelectorAll('.line');
    lines.forEach(function (line,i) {
        console.log(line);
        line.y += setting.speed;
        line.style.top =line.y + 'px';
        if(line.y >=document.documentElement.clientHeight){
            line.y = -100;
        }
    });
  }
  function moveEnemy() {
     let enemy = document.querySelectorAll('.enemy');
     enemy.forEach((function (item,i) {
          item.y += setting.speed /2;
          item.style.top = item.y + 'px';
          if( item.y >= document.documentElement.clientHeight){
              item.y = -100 * setting.traffic;
             item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50)) + 'px';
          }
     }));
  }