function initialization(){
	player1.drawX = 575 / 2 - 22;
	player1.drawY = 550;

	width = 575;
	height = 800;

	bg2.drawY = -800;
	bg1.drawY = 0;
	
	$(document).keydown(function(e){
		pressedKeys[e.which] = true;	});
	$(document).keyup(function(e){
		pressedKeys[e.which] = false;	});	

	bulletDelay = bd;
	bulletDelay3 = bd3;

	score = 0;

	playerHealth = 6;
	healthBarCount = 1;

	enemyCount1 = 4;
	//clear enemy 1
	enemyList1.splice(0, enemyList1.length);
	bulletEnemyList.splice(0, bulletEnemyList.length);

	//clear boss 1
	bossEnemyList1.splice(0, bossEnemyList1.length);
	bulletBossEnemyList1.splice(0, bulletBossEnemyList1.length);

	//clear boss 2
	bossEnemyList2.splice(0, bossEnemyList2.length);
	bulletBossEnemyList2.splice(0, bulletBossEnemyList2.length);
	bulletBossEnemyListt2.splice(0, bulletBossEnemyListt2.length);

	dead = false;
}

function init() {	
	game.state = game.STATE_STARTING_SCREEN;
	//document.removeEventListener('click', playGame1Player, false);
	document.removeEventListener('click', playGame2Player, false);
	document.addEventListener('click', playGame1Player, false);	
	document.addEventListener('click', helpScreen, false);

	introSound.loop = true;
	introSound.play();
	
	initialization();
}

function menuScreenTwo() {
	$('#game').removeClass().addClass('menuScreen2');
	if(game.state == game.STATE_STARTING_SCREEN2)
	{
		document.addEventListener('click', backHelp2, false);
		document.addEventListener('click', playGame1Player, false);
		document.addEventListener('click', playGame2Player, false);
	}
}

function helpScreenOne() {

	$('#game').removeClass().addClass('helpScreen');

	document.addEventListener('click', backHelp, false);
}

function Dead(boolean) {
	if(boolean)
	{
		$('#game').addClass('deadScreen');
	}else{
		$('#game').addClass('winScreen');
	}
	ctxGame.clearRect(0,0, width, height);
	//ctxPlayer1.clearRect(0,0, width, height);
	ctxHUD.clearRect(0,0, width, height);
	initialization();	
	document.addEventListener('click', tryAgain, false);
	document.addEventListener('click', mainMenu, false);
	if(!boolean)
	{
		document.addEventListener('click', continueGame, false);
	}
}

function checkIfDead() {
	if((dead) && (timer <= 7))
	{
		timer--;
	}
	if(timer <= 2)
	{
		game.state = game.STATE_DEAD_SCREEN;
		Dead(true);
		clearInterval(drawInterval);
		clearInterval(updateInterval);
		isPlaying = false;
	}

	if(!dead)
	{
		timer = 7;
	}
}


function checkIfWin() {
	if(score > 320)
	{
		healthBarList.length = 1
		game.state = game.STATE_DEAD_SCREEN;
		Dead(false);
		clearInterval(drawInterval);
		clearInterval(updateInterval);
		isPlaying = false;
	}
}

function Update() {
	$("#score").html("Axe: " + (score));
	plane1Movement();
	player1ScreenBoundary();
	
	if(pressedKeys[KEY.C])
	{
		shootBulletsPlayer1();
		bulletPlayer1Sound.play();			
	}
	else
	{
		bulletDelay = 1.0;
	}
	updateBulletsPlayer1();

	loadEnemies1();

	document.addEventListener('mousedown', mouseDownListener, false);
	updateHomingMissile();
	shootBulletsEnemy1();
	updateBulletsEnemy1();
	updateCollision();
	updateHealthBar();
	checkPlayerHit();
	checkIfDead();
	checkIfWin();
}

function Draw() {
	drawBackgrounds();
	drawPlayer1();
	drawBulletPlayer1();
	drawEnemies1();
	drawBulletEnemy1();
	drawExplosion();
	drawHealthBar();
	drawItem();	
	drawHomingMissile();
}



function checkEnemyHit() {
	var x = Math.floor((Math.random() * 99) + 1);

	//Small Enemies
	for(var i = 0; i < enemyList1.length; i++)
	{
		for(var j = 0; j < bulletList.length; j++)
		{
			if(checkIfHit(bulletList[j], enemyList1[i]))
			{
				var explosion = new Explosion(enemyList1[i].drawX, enemyList1[i].drawY);
				var healthItem = new Item(enemyList1[i].drawX, enemyList1[i].drawY);
				var coinItem = new Item(enemyList1[i].drawX, enemyList1[i].drawY);
				coinItem.width = 80;
				coinItem.height = 80;
				coinItem.img = coinItemImg;

				explosion.hasHit = true;
				explosionList.push(explosion);

				if(x > 85)
				{
					healthItemList.push(healthItem);
				}
				if(x < 90)
				{
					coinItemList.push(coinItem);
				}

				score += 20;
				enemyList1.splice(i, 1);
				bulletList.splice(j, 1);
				explosionSound.play();						
			}
		}
	}

	//Boss1
	for(var i = 0; i < bossEnemyList1.length; i++)
	{
		for(var j = 0; j < bulletList.length; j++)
		{
			if(checkIfHit(bulletList[j], bossEnemyList1[i]))
			{
				var explosion = new Explosion(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);
				var healthItem = new Item(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);
				var coinItem = new Item(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);
				coinItem.width = 10;
				coinItem.height = 20;
				coinItem.img = coinItemImg;

				bossHealth1--;
				if(bossHealth1 == 0)
				{
					explosion.hasHit = true;
					explosionList.push(explosion);

					if(x > 85)
					{
						healthItemList.push(healthItem);
					}
					if(x < 90)
					{
						coinItemList.push(coinItem);
					}
					explosionSound.play();
					score += 100;
					
					bossEnemyList1.splice(i, 1);
					bossHealth1 = 6;
				}

				bulletList.splice(j, 1);
										
			}
		}
	}

	//Boss 2
	for(var i = 0; i < bossEnemyList2.length; i++)
	{
		for(var j = 0; j < bulletList.length; j++)
		{
			if(checkIfHit(bulletList[j], bossEnemyList2[i]))
			{
				var explosion = new Explosion(bossEnemyList2[i].drawX + 50, bossEnemyList2[i].drawY + 50);
				var healthItem = new Item(bossEnemyList2[i].drawX + 50, bossEnemyList2[i].drawY + 50);
				var coinItem = new Item(bossEnemyList2[i].drawX + 50, bossEnemyList2[i].drawY + 50);
				coinItem.width = 10;
				coinItem.height = 20;
				coinItem.img = coinItemImg;

				bossHealth2--;
				if(bossHealth2 == 0)
				{
					explosion.hasHit = true;
					explosionList.push(explosion);

					if(x > 85)
					{
						healthItemList.push(healthItem);
					}
					if(x < 90)
					{
						coinItemList.push(coinItem);
					}
					explosionSound.play();
					score += 100;
					
					bossEnemyList2.splice(i, 1);
					bossHealth2 = 6;
				}

				bulletList.splice(j, 1);
										
			}
		}
	}
}

function drawItem() {
	for(var i = 0; i < healthItemList.length; i++)
	{
		healthItemList[i].drawY += 3;
		healthItemList[i].draw();

		if(healthItemList[i].drawY >= 800)
		{
			healthItemList.splice(i, 1);
		}
	}

	for(var i = 0; i < coinItemList.length; i++)
	{
		coinItemList[i].drawY += 3;
		coinItemList[i].draw();

		if(coinItemList[i].drawY >= 800)
		{
			coinItemList.splice(i, 1);
		}
	}	
}

function checkPlayerHit() {
	for(var i = 0; i < bulletEnemyList.length; i++)
	{
		if(checkIfHit(bulletEnemyList[i], player1))
		{
			var explosion = new Explosion(player1.drawX, player1.drawY);
			playerHealth--;
			if(healthBarList.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead = true;
			}
			
			healthBarList.pop();
			bulletEnemyList.splice(i, 1);	
		}
	}

	for(var i = 0; i < healthItemList.length; i++) 
	{
		if(checkIfHit(healthItemList[i], player1))
		{
			
			if (healthBarList.length < playerHealth && playerHealth < 6)
			{
				playerHealth++;
				var healthBar = new Health((playerHealth * 30) - 50);
				healthBarList.push(healthBar);
			}
			score += 20;
			healthItemList.splice(i, 1);
		}
	}

	for(var i = 0; i < coinItemList.length; i++) 
	{
		if(checkIfHit(coinItemList[i], player1))
		{
			score += 20;
			coinItemList.splice(i, 1);
		}
	}

	for(var i = 0; i < bulletBossEnemyList1.length; i++)
	{
		if(checkIfHit(bulletBossEnemyList1[i], player1))
		{
			var explosion = new Explosion(player1.drawX, player1.drawY);
			playerHealth -= 2;

			if(healthBarList.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead = true;
			}
			
			healthBarList.pop();
			healthBarList.pop();
			bulletBossEnemyList1.splice(i, 1);	
		}
	}

	//boss 2 bullet 1
	for(var i = 0; i < bulletBossEnemyList2.length; i++)
	{
		if(checkIfHit(bulletBossEnemyList2[i], player1))
		{
			var explosion = new Explosion(player1.drawX, player1.drawY);
			playerHealth -= 1;

			if(healthBarList.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead = true;
			}
			
			healthBarList.pop();
			bulletBossEnemyList2.splice(i, 1);	
		}
	}

	//boss 2 bullet 2
	for(var i = 0; i < bulletBossEnemyListt2.length; i++)
	{
		if(checkIfHit(bulletBossEnemyListt2[j], player1))
		{
			var explosion = new Explosion(player1.drawX, player1.drawY);
			playerHealth -= 2;

			if(healthBarList.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead = true;
			}
			
			healthBarList.pop();
			healthBarList.pop();
			bulletBossEnemyListt2.splice(i, 1);	
		}
	}
}

function drawExplosion () {
	for(var i = 0; i < explosionList.length; i++)
	{			
			explosionList[i].draw();
			explosionList[i].update();
	}
}

function updateCollision() {
	for(var i = 0; i < explosionList.length; i++)
	{	
		if(!explosionList[i].hasHit)
		{		
			explosionList.splice(i, 1);
		}
	}
	checkEnemyHit();
}

function updateHealthBar() {
	if (healthBarCount < playerHealth)
	{
		healthBarCount++;
		var healthBar = new Health((healthBarCount * 30) - 50);
		healthBarList.push(healthBar);
	}	
}

function drawHealthBar() {
	ctxHUD.clearRect(0,0,575,800);
	for(var i = 0; i < healthBarList.length; i++)
	{
		healthBarList[i].draw();
	}	
}
//Background functions
function drawBackgrounds() {
	ctxGame.clearRect(0,0,575,800);	
	bg1.draw();
	bg2.draw();
	if(bg1.drawY >= height)
	{
		bg1.drawY = 0;
		bg2.drawY = -height;
	}
}
//Player1 Functions
function plane1Movement() {
	if(pressedKeys[KEY.RIGHT])
	{
		player1.drawX += spd;
	}
	if(pressedKeys[KEY.LEFT])
	{
		player1.drawX -= spd;
	}
	if(pressedKeys[KEY.UP])
	{
		player1.drawY -= spd;
	}
	if(pressedKeys[KEY.DOWN])
	{
		player1.drawY += spd;
	}
	if(pressedKeys[KEY.SHIFT])
	{
		spd = 13;
	}
	else
	{
		spd = 8;
	}
}

function drawPlayer1(){
	if(!dead)
	{
		player1.draw();
	}
	/*
	if(pressedKeys[KEY.RIGHT])
	{
		player1.srcY = 0;
		frameCount++;

	    player1.srcX = (frameCount * player1.width);

	    if (frameCount >= 1) {
	        frameCount = 1;
	    }    
	}
	*/
	if((!pressedKeys[KEY.C]))
	{
		frameCount = 0;
		player1.srcX = (frameCount * player1.width);
	}
	
	if(pressedKeys[KEY.C])
	{
		frameCount++;

	    player1.srcX = (frameCount * player1.width);

	    if (frameCount >= 1) {
	        frameCount = 1;
	    }

	    player1.srcY = 128;
	}
	
}

function player1ScreenBoundary() {
	if (player1.drawX <= 0 - 2) {
		player1.drawX = 0 - 2;
	}
	if (player1.drawX >= width - 42) {
		player1.drawX = width - 42;	
	}
	if (player1.drawY <= 0) {
		player1.drawY = 0;
	}
	if (player1.drawY >= height - 64) {
		player1.drawY = height - 64;
	}
}

function shootHomingMissile() {
	var count = 0;
	for(var i = 0; i < enemyList1.length; i++) {
		if(enemyList1[i].onScreen == true)
			count++;

	}
	console.log(count);
	if(!missileOut && count >= 1) {
		hMissile = new Missile(player1.drawX + 22, player1.drawY + 32);
		missileOut = true;
	}	
}

function updateHomingMissile() {
	if(missileOut) {
		var target;
		for(var i = 0; i < enemyList1.length; i++) {
			if(enemyList1[i].onScreen == true) {
				target = enemyList1[i];
			}
		}
		var targetX = (target.drawX + (target.height/ 2)) - hMissile.drawX;
		var targetY = (target.drawY + target.height) - hMissile.drawY;
		var spdHM = 30;
		//The atan2() method returns the arctangent of the quotient of its arguments, as a numeric value between PI and -PI radians.
		//The number returned represents the counterclockwise angle in radians (not degrees) between the positive X axis and the point (x, y)
		var rotations = Math.atan2(targetY, targetX) * 180 / Math.PI;
		hMissile.rotation = Math.atan2(targetY, targetX);

		var vx = spdHM * (90 - Math.abs(rotations)) / 90;
        var vy;
        if (rotations < 0)
            vy = -spdHM + Math.abs(vx);
        else
            vy = spdHM - Math.abs(vx);
        
        hMissile.drawX += vx;   
        hMissile.drawY += vy;   
	}
}

function drawHomingMissile() {
	ctxHM.clearRect(0,0,575,800);
	hMissile.draw();
}

function shootBulletsPlayer1() {
	if(bulletDelay >= 0)
	{
		bulletDelay--;
	}

	if(bulletDelay <= 0)
	{
		var newBulletPlayer1 = new Bullet(player1.drawX + 14, player1.drawY + 32);
		bullet1IsVisible = true;

		if(bulletList.length < 20)
		{
			bulletList.push(newBulletPlayer1);
		}
	}

	if (bulletDelay == 0)
		bulletDelay = bd;
}

function updateBulletsPlayer1() {
	for(var i = 0; i < bulletList.length; i++)
	{
		bulletList[i].drawY -= bulletSpd;

		if(bulletList[i].drawY <= -10)
		{
			bulletList.splice(i, 1);
		}
		
	}
}

function drawBulletPlayer1(){	
	for(var i = 0; i < bulletList.length; i++) {
		bulletList[i].draw();	
	}		
}

//Enemy Functions
function loadEnemies1() {
	
	var x = Math.floor((Math.random() * 525) + 25);
	var y = Math.floor((Math.random() * -400) - 100);

	var newEnemy1 = new Enemy(x, y);

	var bossImage1 = new Image();
	bossImage1.src = "images/EnemyOwn2.png";
	var newBoss1 = new Enemy(Math.floor((Math.random() * 350) + 75), y);
	newBoss1.width = 32;
	newBoss1.height = 240;
	newBoss1.img = bossImage1;

	var newBoss2 = new Enemy(Math.floor((Math.random() * 150) + 100), y);
	newBoss2.width = 300;
	newBoss2.height = 367;
	newBoss2.img = enemyImage3;

	if(enemyList1.length < enemyCount1)
	{
		enemyList1.push(newEnemy1);		
	}

	//boss 1 logic
	//so when the score is 160 or 180, boss one will appear
	//will keep on respawn on every 300 score
	if ((score % factor == 10) || (score % factor == 30))
	{
		enemyCount1++;
		factor += 300;
		bossEnemyList1.push(newBoss1);
	}

	//boss 2 logic
	if(score % factor2 == 10)
	{
		factor2 += 600;
		bossEnemyList2.push(newBoss2);
	}

	//movement
	for (var i = 0; i < enemyList1.length; i++)
	{
		enemyList1[i].drawY += enemySpd;

		if(enemyList1[i].drawY >= 800)
		{
			enemyList1.splice(i, 1);
		}

		if(enemyList1[i].drawY > 0) {
				enemyList1[i].onScreen = true;
		}
	}

	for (var i = 0; i < bossEnemyList1.length; i++)
	{
		bossEnemyList1[i].drawY += enemySpd;

		if(bossEnemyList1[i].drawY >= 800)
		{
			bossEnemyList1.splice(i, 1);
		}
	}

	for (var i = 0; i < bossEnemyList2.length; i++)
	{
		bossEnemyList2[i].drawY += enemySpd;

		if(bossEnemyList2[i].drawY >= 800)
		{
			bossEnemyList2.splice(i, 1);
		}
	}
}

function drawEnemies1() {
	for(var i = 0; i < enemyList1.length; i++) {
		enemyList1[i].draw();
	}
	for (var i = 0; i < bossEnemyList1.length; i++) {
		bossEnemyList1[i].draw();
	}
	for (var i = 0; i < bossEnemyList2.length; i++) {
		bossEnemyList2[i].draw();
	}
}

function shootBulletsEnemy1() {
	if(bulletDelayEnemy > 0)
	{
		bulletDelayEnemy--;
	}

	if(bossBulletDelay > 0)
	{
		bossBulletDelay--;
	}

	for (var i = 0; i < enemyList1.length; i++)
	{	
		var newBulletEnemy1 = new Bullet(enemyList1[i].drawX + 3, enemyList1[i].drawY + 11);
		newBulletEnemy1.width = 28;
		newBulletEnemy1.img = enemyBullet1;

		if(bulletDelayEnemy <= 0)
		{
			if(bulletEnemyList.length < 5)
			{
				bulletEnemyList.push(newBulletEnemy1);
			}
		}
	}
	for (var i = 0; i < bossEnemyList1.length; i++)
	{
		var newBulletBoss1 = new Bullet(bossEnemyList1[i].drawX + 12, bossEnemyList1[i].drawY + 100);
		newBulletBoss1.width = 68;
		newBulletBoss1.height = 50;
		newBulletBoss1.img = bossEnemyBullet1;

		if(bulletDelayEnemy <= 0)
		{
			if(bulletBossEnemyList1.length < 3)
			{
				bulletBossEnemyList1.push(newBulletBoss1);
			}
		}
	}

	for (var i = 0; i < bossEnemyList2.length; i++)
	{
		var newBulletBoss1 = new Bullet(bossEnemyList2[i].drawX + 53, bossEnemyList2[i].drawY + 90);
		newBulletBoss1.width = 15;
		newBulletBoss1.height = 10;
		newBulletBoss1.img = enemyBullet3;

		var newBulletBoss2 = new Bullet(bossEnemyList2[i].drawX + 225, bossEnemyList2[i].drawY + 90);
		newBulletBoss2.width = 15;
		newBulletBoss2.height = 10;
		newBulletBoss2.img = enemyBullet3;

		if(bossBulletDelay <= 0)
		{
			if(bulletBossEnemyList2.length < 16)
			{
				bulletBossEnemyList2.push(newBulletBoss1);
				bulletBossEnemyList2.push(newBulletBoss2);
			}
		}
	}

	for (var i = 0; i < bossEnemyList2.length; i++)
	{
		var newBulletBoss1 = new Bullet(bossEnemyList2[i].drawX + 123, bossEnemyList2[i].drawY + 98);
		newBulletBoss1.width = 8;
		newBulletBoss1.height = 24;
		newBulletBoss1.img = enemyBullett3;

		var newBulletBoss2 = new Bullet(bossEnemyList2[i].drawX + 170, bossEnemyList2[i].drawY + 98);
		newBulletBoss2.width = 8;
		newBulletBoss2.height = 24;
		newBulletBoss2.img = enemyBullett3;

		if(bulletDelayEnemy <= 0)
		{
			if(bulletBossEnemyListt2.length < 4)
			{
				bulletBossEnemyListt2.push(newBulletBoss1);
				bulletBossEnemyListt2.push(newBulletBoss2);
			}
		}
	}

	if (bulletDelayEnemy == 0)
		bulletDelayEnemy = ebd;

	if (bossBulletDelay == 0)
		bossBulletDelay = bbd;
}

function updateBulletsEnemy1() {

	for(var i = 0; i < bulletEnemyList.length; i++)
	{
		bulletEnemyList[i].drawY += 10;

		if(bulletEnemyList[i].drawY >= 800)
		{
			bulletEnemyList.splice(i, 1);
		}
	}

	for (var i = 0; i < bulletBossEnemyList1.length; i++)
	{
		bulletBossEnemyList1[i].drawY += 8;

		if(bulletBossEnemyList1[i].drawY >= 800)
		{
			bulletBossEnemyList1.splice(i, 1);
		}
	}

	for (var i = 0; i < bulletBossEnemyList2.length; i++)
	{
		bulletBossEnemyList2[i].drawY += 8;

		if(bulletBossEnemyList2[i].drawY >= 800)
		{
			bulletBossEnemyList2.splice(i, 1);
		}
	}

	for (var i = 0; i < bulletBossEnemyListt2.length; i++)
	{
		bulletBossEnemyListt2[i].drawY += 15;

		if(bulletBossEnemyListt2[i].drawY >= 800)
		{
			bulletBossEnemyListt2.splice(i, 1);
		}
	}
}

function drawBulletEnemy1(){
	for(var i = 0; i < bulletEnemyList.length; i++) {
		bulletEnemyList[i].draw();
	}

	for(var i = 0; i < bulletBossEnemyList1.length; i++) {
		bulletBossEnemyList1[i].draw();
	}

	for(var i = 0; i < bulletBossEnemyList2.length; i++) {
		bulletBossEnemyList2[i].draw();
	}

	for(var i = 0; i < bulletBossEnemyListt2.length; i++) {
		bulletBossEnemyListt2[i].draw();
	}
}

//Classes
//Player1




//Event Functions
function menuScreen2(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(playButton.ButtonClicked())
	{
		if(game.state == game.STATE_STARTING_SCREEN)
		{			
			game.state = game.STATE_STARTING_SCREEN2;
			menuScreenTwo();
			//setInterval(Draw, fps);
			//setInterval(Update, fps);
			
		}		
	}
}

function helpScreen(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(helpButton.ButtonClicked())
	{
		if(game.state == game.STATE_STARTING_SCREEN)
		{			
			game.state = game.STATE_HELP_SCREEN;
			helpScreenOne();
			//setInterval(Draw, fps);
			//setInterval(Update, fps);
		}		
	}
}

function backHelp(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(backHelpButton.ButtonClicked())
	{
		if(game.state == game.STATE_HELP_SCREEN)
		{			
			game.state = game.STATE_STARTING_SCREEN;
			$('#game').removeClass().addClass('menuScreen');
			//setInterval(Draw, fps);
			//setInterval(Update, fps);
		}		
	}
}

function backHelp2(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(backHelpButton.ButtonClicked())
	{
		if(game.state == game.STATE_STARTING_SCREEN2)
		{			
			game.state = game.STATE_STARTING_SCREEN;
			init();
			$('#game').removeClass().addClass('menuScreen');
			//setInterval(Draw, fps);
			//setInterval(Update, fps);

			document.removeEventListener('click', playGame1Player, false);
			document.removeEventListener('click', playGame2Player, false);
		}		
	}
}

function playGame1Player(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	
	if(!isPlaying)
	{
		if(playButton.ButtonClicked())
		{
			if(game.state == game.STATE_STARTING_SCREEN)
			{			
				game.state = game.STATE_PLAYING;
				$('#game').removeClass();
				drawInterval = setInterval(Draw, fps);
				updateInterval = setInterval(Update, fps);
				introSound.pause();
				gameSound.loop = true;
				gameSound.play();
			}		
		}
	}
}

function playGame2Player(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	
	if(!isPlaying)
	{
		if(player2Button.ButtonClicked())
		{
			if(game.state == game.STATE_STARTING_SCREEN2)
			{			
				game.state = game.STATE_PLAYING;
				$('#game').removeClass().addClass('playGame1');
				setInterval(Draw2, fps);
				setInterval(Update2, fps);

				player1.drawX = 575 / 4 - 22;
				player1.drawY = 550;

				player2.drawX = (((575 / 2) + (575 / 4)) + 22);
				player2.drawY = 550;

				bulletDelay2 = bd2;

				introSound.pause();
				gameSound.loop = true;
				gameSound.play();
			}		
		}
	}
}

function tryAgain(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(!isPlaying)
	{
		if(tryAgainButton.ButtonClicked())
		{
			if(game.state == game.STATE_DEAD_SCREEN)
			{			
				game.state = game.STATE_PLAYING;
				$('#game').removeClass();
				drawInterval = setInterval(Draw, fps);
				updateInterval = setInterval(Update, fps);
				introSound.pause();
				gameSound.loop = true;
				gameSound.play();
				isPlaying = true;
			}		
		}
	}
}

function continueGame(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(!isPlaying)
	{
		if(continueButton.ButtonClicked())
		{
			if(game.state == game.STATE_DEAD_SCREEN)
			{			
				alert("Continue Buttton!!");
			}		
		}
	}
}

function mainMenu(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	if(mainMenuButton.ButtonClicked())
	{
		if(game.state == game.STATE_DEAD_SCREEN)
		{			
			init();
			dead = false;
			$('#game').removeClass().addClass('menuScreen');
		}		
	}
}

//try only
//if u click the player it follows the mouse and shoots
function mouseDownListener(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	
	if(player1.drawX <= mouseX && mouseX <= player1.drawX + player1.width && player1.drawY <= mouseY && mouseY <= player1.drawY + player1.height)
	{
		if(game.state == game.STATE_PLAYING)
		{			
			dragging = true;
		}		
	}

	if(dragging)
	{
		document.addEventListener('mousemove', mouseMoveListener, false);
	}
	document.removeEventListener('mousedown', mouseDownListener, false);
	document.addEventListener('mouseup', mouseUpListener, false);
}

function mouseMoveListener(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	
	if(player1.drawX <= mouseX && mouseX <= player1.drawX + player1.width && player1.drawY <= mouseY && mouseY <= player1.drawY + player1.height)
	{
		if(game.state == game.STATE_PLAYING)
		{			
			player1.drawX = mouseX - (player1.width / 2);
			player1.drawY = mouseY - (player1.height / 2);
			shootBulletsPlayer123();
		}		
	}
}

function mouseUpListener(e) {
	var bgCanvas = document.getElementById('game');
	mouseX = e.pageX - bgCanvas.offsetLeft;
	mouseY = e.pageY - bgCanvas.offsetTop;	

	document.addEventListener("mousedown", mouseDownListener, false);
	document.removeEventListener("mouseup", mouseUpListener, false);
	if (dragging) {
		dragging = false;
		document.removeEventListener("mousemove", mouseMoveListener, false);
	}
}
