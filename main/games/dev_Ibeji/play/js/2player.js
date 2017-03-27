
function shootBulletsPlayer123() {
	if(bulletDelay3 >= 0)
	{
		bulletDelay3--;
	}

	if(bulletDelay3 <= 0)
	{
		var newBulletPlayer1 = new Bullet(player1.drawX + 14, player1.drawY + 32);
		bullet1IsVisible = true;

		if(bulletList.length < 20)
		{
			bulletList.push(newBulletPlayer1);
		}
	}

	if (bulletDelay3 == 0)
		bulletDelay3 = bd3;
}



//Player 2 Mode

function Update2() {

	$("#score").html("Score: " + (score));
	//plane movement
	plane2Movement();
	player2ScreenBoundary();
	
	if(pressedKeys[KEY.C])
	{
		shootBulletsPlayer1();
		//bulletPlayer1Sound.play();
	}
	else
	{
		bulletDelay = 1.0;
	}
	updateBulletsPlayer1();

	if(pressedKeys[KEY.ZERO])
	{
		shootBulletsPlayer2();
	}
	updateBulletsPlayer2();

	loadEnemies1();

	shootBulletsEnemy1();
	updateBulletsEnemy1();
	updateCollision2();
	updateHealthBar2();
	checkPlayerHit2();
	checkEnemyHit2();
}

function Draw2() {
	drawBackgrounds();
	drawPlayer2();
	drawBulletPlayer1();
	drawBulletPlayer2();
	drawEnemies1();
	drawBulletEnemy1();
	drawExplosion();
	drawHealthBar2();
	drawItem();			
}

function drawPlayer2(){
	ctxPlayer1.clearRect(0, 0, 575, 800);
	player1.draw();

	if(pressedKeys[KEY.D])
	{
		player1.srcY = 0;
		frameCount++;

	    player1.srcX = (frameCount * player1.width);

	    if (frameCount >= 1) {
	        frameCount = 1;
	    }    
	}	
	if((!pressedKeys[KEY.D]) && (!pressedKeys[KEY.A]))
	{
		frameCount = 0;
		player1.srcX = (frameCount * player1.width);
	}
	if(pressedKeys[KEY.A])
	{
		frameCount++;

	    player1.srcX = (frameCount * player1.width);

	    if (frameCount >= 1) {
	        frameCount = 1;
	    }

	    player1.srcY = 64;
	}

	//player 2
	
	player2.img = planeImage2;
	player2.draw();

	if(pressedKeys[KEY.RIGHT])
	{
		player2.srcY = 0;
		frameCount++;

	    player2.srcX = (frameCount * player2.width);

	    if (frameCount >= 1) {
	        frameCount = 1;
	    }    
	}	
	if((!pressedKeys[KEY.RIGHT]) && (!pressedKeys[KEY.LEFT]))
	{
		frameCount = 0;
		player2.srcX = (frameCount * player2.width);
	}
	if(pressedKeys[KEY.LEFT])
	{
		frameCount++;

	    player2.srcX = (frameCount * player2.width);

	    if (frameCount >= 1) {
	        frameCount = 1;
	    }

	    player2.srcY = 64;
	}
}

function plane2Movement() {
	if(pressedKeys[KEY.D])
	{
		player1.drawX += spd;
	}
	if(pressedKeys[KEY.A])
	{
		player1.drawX -= spd;
	}
	if(pressedKeys[KEY.W])
	{
		player1.drawY -= spd;
	}
	if(pressedKeys[KEY.S])
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

	if(pressedKeys[KEY.RIGHT])
	{
		player2.drawX += spd;
	}
	if(pressedKeys[KEY.LEFT])
	{
		player2.drawX -= spd;
	}
	if(pressedKeys[KEY.UP])
	{
		player2.drawY -= spd;
	}
	if(pressedKeys[KEY.DOWN])
	{
		player2.drawY += spd;
	}
}

function player2ScreenBoundary() {
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

	if (player2.drawX <= 0 - 2) {
		player2.drawX = 0 - 2;
	}
	if (player2.drawX >= width - 42) {
		player2.drawX = width - 42;	
	}
	if (player2.drawY <= 0) {
		player2.drawY = 0;
	}
	if (player2.drawY >= height - 64) {
		player2.drawY = height - 64;
	}
}

function shootBulletsPlayer2() {
	if(bulletDelay2 >= 0)
	{
		bulletDelay2--;
	}

	if(bulletDelay2 <= 0)
	{
		var newBulletPlayer2 = new Bullet(player2.drawX + 14, player2.drawY + 32);	

		if(bulletList2.length < 20)
		{
			bulletList2.push(newBulletPlayer2);
		}
	}

	if (bulletDelay2 == 0)
		bulletDelay2 = bd2;
}

function updateBulletsPlayer2() {
	for(var i = 0; i < bulletList2.length; i++)
	{
		bulletList2[i].drawY -= bulletSpd;

		if(bulletList2[i].drawY <= -10)
		{
			bulletList2.splice(i, 1);
		}	
	}
}

function drawBulletPlayer2(){	

	for(var i = 0; i < bulletList2.length; i++) {
		bulletList2[i].draw();	
	}			
}

function checkEnemyHit2() {
	var x = Math.floor((Math.random() * 99) + 1);

	for(var i = 0; i < enemyList1.length; i++)
	{
		for(var j = 0; j < bulletList.length; j++)
		{
			if(bulletList[j].drawX >= enemyList1[i].drawX - (enemyList1[i].width/2) &&
				bulletList[j].drawX <= enemyList1[i].drawX + enemyList1[i].width &&
				bulletList[j].drawY >= enemyList1[i].drawY &&
				bulletList[j].drawY <= enemyList1[i].drawY + enemyList1[i].height)
			{
				var explosion = new Explosion(enemyList1[i].drawX, enemyList1[i].drawY);
				var healthItem = new Item(enemyList1[i].drawX, enemyList1[i].drawY);
				explosion.hasHit = true;
				explosionList.push(explosion);

				if(x > 85)
				{
					healthItemList.push(healthItem);
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
			if(bulletList[j].drawX >= bossEnemyList1[i].drawX - (bossEnemyList1[i].width/2) &&
				bulletList[j].drawX <= bossEnemyList1[i].drawX + bossEnemyList1[i].width &&
				bulletList[j].drawY >= bossEnemyList1[i].drawY &&
				bulletList[j].drawY <= bossEnemyList1[i].drawY + bossEnemyList1[i].height)
			{
				var explosion = new Explosion(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);
				var healthItem = new Item(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);

				bossHealth1--;
				if(bossHealth1 == 0)
				{
					explosion.hasHit = true;
					explosionList.push(explosion);

					if(x > 85)
					{
						healthItemList.push(healthItem);
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

	//Player 2

	for(var i = 0; i < enemyList1.length; i++)
	{
		for(var j = 0; j < bulletList2.length; j++)
		{
			if(bulletList2[j].drawX >= enemyList1[i].drawX - (enemyList1[i].width/2) &&
				bulletList2[j].drawX <= enemyList1[i].drawX + enemyList1[i].width &&
				bulletList2[j].drawY >= enemyList1[i].drawY &&
				bulletList2[j].drawY <= enemyList1[i].drawY + enemyList1[i].height)
			{
				var explosion = new Explosion(enemyList1[i].drawX, enemyList1[i].drawY);
				var healthItem = new Item(enemyList1[i].drawX, enemyList1[i].drawY);
				explosion.hasHit = true;
				explosionList.push(explosion);

				if(x > 85)
				{
					healthItemList.push(healthItem);
				}

				score += 20;
				enemyList1.splice(i, 1);
				bulletList2.splice(j, 1);
				explosionSound.play();						
			}
		}
	}

	//Boss1
	for(var i = 0; i < bossEnemyList1.length; i++)
	{
		for(var j = 0; j < bulletList2.length; j++)
		{
			if(bulletList2[j].drawX >= bossEnemyList1[i].drawX - (bossEnemyList1[i].width/2) &&
				bulletList2[j].drawX <= bossEnemyList1[i].drawX + bossEnemyList1[i].width &&
				bulletList2[j].drawY >= bossEnemyList1[i].drawY &&
				bulletList2[j].drawY <= bossEnemyList1[i].drawY + bossEnemyList1[i].height)
			{
				var explosion = new Explosion(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);
				var healthItem = new Item(bossEnemyList1[i].drawX + 50, bossEnemyList1[i].drawY + 50);

				bossHealth1--;
				if(bossHealth1 == 0)
				{
					explosion.hasHit = true;
					explosionList.push(explosion);

					if(x > 85)
					{
						healthItemList.push(healthItem);
					}
					explosionSound.play();
					score += 100;
					
					bossEnemyList1.splice(i, 1);
					bossHealth1 = 6;
				}

				bulletList2.splice(j, 1);
										
			}
		}
	}
}

function checkPlayerHit2() {
	for(var i = 0; i < bulletEnemyList.length; i++)
	{
		if(bulletEnemyList[i].drawX >= player1.drawX - (player1.width/2) &&
			bulletEnemyList[i].drawX <= player1.drawX + player1.width &&
			bulletEnemyList[i].drawY >= player1.drawY &&
			bulletEnemyList[i].drawY <= player1.drawY + player1.height)
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
		if(healthItemList[i].drawX >= player1.drawX - (player1.width/2) &&
			healthItemList[i].drawX <= player1.drawX + player1.width &&
			healthItemList[i].drawY >= player1.drawY &&
			healthItemList[i].drawY <= player1.drawY + player1.height)
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

	for(var i = 0; i < bulletBossEnemyList1.length; i++)
	{
		if(bulletBossEnemyList1[i].drawX + bulletBossEnemyList1[i].width / 2 >= player1.drawX - 50 &&
			bulletBossEnemyList1[i].drawX + bulletBossEnemyList1[i].width / 2 <= (player1.drawX + player1.width + 50) &&
			bulletBossEnemyList1[i].drawY + bulletBossEnemyList1[i].height >= player1.drawY &&
			bulletBossEnemyList1[i].drawY + bulletBossEnemyList1[i].height <= player1.drawY + player1.height)
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

	//Player 2
	for(var i = 0; i < bulletEnemyList.length; i++)
	{
		if(bulletEnemyList[i].drawX >= player2.drawX - (player2.width/2) &&
			bulletEnemyList[i].drawX <= player2.drawX + player2.width &&
			bulletEnemyList[i].drawY >= player2.drawY &&
			bulletEnemyList[i].drawY <= player2.drawY + player2.height)
		{
			var explosion = new Explosion(player1.drawX, player2.drawY);
			playerHealth2--;
			if(healthBarList2.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead2 = true;
			}
			
			healthBarList2.pop();
			bulletEnemyList.splice(i, 1);	
		}
	}

	for(var i = 0; i < healthItemList.length; i++) 
	{
		

		if(healthItemList[i].drawX >= player2.drawX - (player2.width/2) &&
			healthItemList[i].drawX <= player2.drawX + player2.width &&
			healthItemList[i].drawY >= player2.drawY &&
			healthItemList[i].drawY <= player2.drawY + player2.height)
		{
			
			if (healthBarList2.length < playerHealth2 && playerHealth2 < 6)
			{
				playerHealth2++;
				var healthBar = new Health((playerHealth2 * 30) + 350);
				healthBar.img = healthBarImg2;
				healthBarList2.push(healthBar);
			}
			score += 20;
			healthItemList.splice(i, 1);
		}
	}

	for(var i = 0; i < bulletBossEnemyList1.length; i++)
	{
		if(bulletBossEnemyList1[i].drawX + bulletBossEnemyList1[i].width / 2 >= player2.drawX - 50 &&
			bulletBossEnemyList1[i].drawX + bulletBossEnemyList1[i].width / 2 <= (player2.drawX + player2.width + 50) &&
			bulletBossEnemyList1[i].drawY + bulletBossEnemyList1[i].height >= player2.drawY &&
			bulletBossEnemyList1[i].drawY + bulletBossEnemyList1[i].height <= player2.drawY + player2.height)
		{
			var explosion = new Explosion(player1.drawX, player1.drawY);
			playerHealth2 -= 2;

			if(healthBarList.length <= 1)
			{	
				explosion.hasHit = true;
				explosionList.push(explosion);
				dead2 = true;
			}
			
			healthBarList2.pop();
			healthBarList2.pop();
			bulletBossEnemyList1.splice(i, 1);	
		}
	}
}

function updateCollision2() {
	for(var i = 0; i < explosionList.length; i++)
	{	
		if(!explosionList[i].hasHit)
		{		
			explosionList.splice(i, 1);
		}
	}
}

function updateHealthBar2() {
	if (healthBarCount < playerHealth)
	{
		healthBarCount++;
		var healthBar = new Health((healthBarCount * 30) - 50);
		healthBarList.push(healthBar);
	}	

	

	if (healthBarCount2 < playerHealth2)
	{
		healthBarCount2++;
		var healthBar2 = new Health((healthBarCount2 * 30) + 350);
		healthBar2.img = healthBarImg2;
		healthBarList2.push(healthBar2);
	}	
}

function drawHealthBar2() {
	ctxHUD.clearRect(0,0,575,800);
	for(var i = 0; i < healthBarList.length; i++)
	{
		healthBarList[i].draw();
	}	
	for(var i = 0; i < healthBarList2.length; i++)
	{
		healthBarList2[i].draw();
	}
}