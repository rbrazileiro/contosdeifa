function Player() {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 88;
    this.height = 128;
    this.drawX = 0;
    this.drawY = 0;
    this.img = planeImage1;
}

Player.prototype.draw = function() {

	ctxGame.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

function Item(drawX, drawY) {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 20;
    this.height = 20;
    this.drawX = drawX;
    this.drawY = drawY;
    this.img = healthItemImg;
}

Item.prototype.draw = function() {

	ctxGame.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

function Health(drawX) {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 30;
    this.height = 30;
    this.drawX = drawX;
    this.drawY = 10;
    this.img = healthBarImg;
}

Health.prototype.draw = function() {

	ctxHUD.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

function Enemy(drawX, drawY) {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 70;
    this.height = 189;
    this.drawX = drawX;
    this.drawY = drawY;
    this.img = enemyImage1;
    this.hasHit = false;
    this.onScreen = false;
}

Enemy.prototype.draw = function() {
	//ctxEnemy1.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	ctxGame.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

function Bullet(drawX, drawY) {

	this.srcX = 0;
    this.srcY = 0;
    this.width = 40;
    this.height = 40;

    this.drawX = drawX;
    this.drawY = drawY;
    this.img = planeBullet1;  
}

Bullet.prototype.draw = function() {

	ctxGame.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

function Missile(drawX, drawY) {
    this.srcX = 0;
    this.srcY = 0;
    this.width = 16;
    this.r = this.width * 0.5;
    this.height = 10;
    this.drawX = drawX;
    this.drawY = drawY;
    this.img = planeHomingMissile;
    this.hasHit = true;
    this.rotation = 0;
}

Missile.prototype.draw = function() {
    ctxHM.save();
    ctxHM.translate(this.drawX, this.drawY);
    ctxHM.rotate(this.rotation + (Math.PI / 2)); 
    ctxHM.drawImage(this.img, -this.r, -this.r);
    ctxHM.restore();
} 

//Background
function Background() {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 575;
    this.height = 800;
    this.drawX = 0;
    this.drawY = 0;
    this.spd = 3;
}

Background.prototype.draw = function() {

	ctxGame.drawImage(img, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY += this.spd, this.width, this.height);
}

function Explosion(drawX, drawY) {
	this.srcX = 0;
    this.srcY = 0;
    this.width = 45;
    this.height = 45;
    this.drawX = drawX;
    this.drawY = drawY;
    this.frameCount = 0;
    this.hasHit = false;
}

Explosion.prototype.update = function() {
		if(this.frameCount < 25)
		{
			this.frameCount++;

			if(frameCount % 5 == 0)
			{
				this.srcY += 45;
			}
			if(this.frameCount == 25)
			{
				this.frameCount = 0;
				this.hasHit = false;
			}

		}
}

Explosion.prototype.draw = function() {
	if(this.hasHit)
	{
		ctxGame.drawImage(explosionImg, this.srcX = (this.frameCount * this.width), this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
		
	}			
}

function Button(left, right, top, bottom){
    this.l = left;
    this.r = right;
    this.t = top;
    this.b = bottom;
}

Button.prototype.ButtonClicked = function () {
    if(this.l <= mouseX && mouseX <= this.r && this.t <= mouseY && mouseY <= this.b)
        return true;
}
